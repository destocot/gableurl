"use server";
import dbConnect from "@/lib/dbConnect";
import Url from "@/models/Url";
import { z } from "zod";

const schema = z.string().refine(
  (input) => {
    const regex =
      /^(https?:\/\/)?(www\.)?([a-z0-9]+(-[a-z0-9]+)*\.)+[a-z]{2,}(\/[a-z0-9_\-\.~]*)?(\?.*)?$/i;
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

  // await new Promise((res) => setTimeout(res, 500));

  let input = formData.get("url") as string;

  const parsed = schema.safeParse(input);

  if (!parsed.success) {
    const error = parsed.error.flatten().formErrors[0];
    return { error: error || "Oops, something went wrong" };
  }

  let url = parsed.data;
  if (!url.startsWith("http://") && !url.startsWith("https://")) {
    url = "http://" + url;
  }

  try {
    await dbConnect();
    const normalizedUrl = url.replace(/^https?:\/\//i, "");
    const urlObject = new URL(`http://${normalizedUrl}`);
    const domain = urlObject.hostname;
    const exists = await Url.findOne({
      $or: [
        { url: `http://${normalizedUrl}` },
        { url: `https://${normalizedUrl}` },
        { url: new RegExp(`^${domain}$`, "i") },
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
