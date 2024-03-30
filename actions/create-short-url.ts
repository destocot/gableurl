"use server";
import dbConnect from "@/lib/dbConnect";
import Url from "@/models/Url";
import { z } from "zod";

const schema = z.string().refine(
  (input) => {
    const regex = new RegExp(
      "^(https?:\\/\\/)?" + // protocol
        "((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|" + // domain name
        "((\\d{1,3}\\.){3}\\d{1,3}))" + // OR IP (v4) address
        "(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*" + // port and path
        "(\\?[;&a-z\\d%_.~+=-]*)?" + // query string
        "(\\#[-a-z\\d_]*)?$", // fragment locator
      "i"
    );
    return regex.test(input);
  },
  { message: "Invalid URL." }
);

type PrevState =
  | { error: string }
  | { success: string }
  | { reset: boolean }
  | undefined;

export async function createShortUrl(prevState: PrevState, formData: FormData) {
  const reset = Boolean(formData.get("reset"));
  if (reset) return { reset: true };

  let input = formData.get("url") as string;
  const parsed = schema.safeParse(input);

  if (!parsed.success) {
    const error = parsed.error.flatten().formErrors[0];
    return { error: error || "Oops, something went wrong" };
  }

  let url = parsed.data.toLowerCase();
  if (!url.startsWith("http://") && !url.startsWith("https://")) {
    url = "http://" + url;
  }
  const normalizedUrl = url.replace(/^https?:\/\//i, "");

  try {
    await dbConnect();
    const exists = await Url.findOne({
      $or: [
        { url },
        { url: `http://${normalizedUrl}` },
        { url: `https://${normalizedUrl}` },
      ],
    });

    if (exists) return { success: exists.hash };

    const hash = Math.random().toString(36).substring(7);
    const result = await Url.create({ url, hash });
    return { success: result.hash };
  } catch (e) {
    if (e instanceof Error) {
      console.error("Error: " + e.message);
    } else {
      console.error("Error: Something went wrong.");
    }
  }
}
