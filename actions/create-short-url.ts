"use server";
import dbConnect from "@/lib/dbConnect";
import Url from "@/models/Url";
import { z } from "zod";

const schema = z.string().url("Invalid URL.");

type PrevState =
  | { error: string }
  | { success: string }
  | { reset: boolean }
  | undefined;

export async function createShortUrl(prevState: PrevState, formData: FormData) {
  const reset = Boolean(formData.get("reset"));
  if (reset) return { reset: true };

  // await new Promise((res) => setTimeout(res, 500));

  const parsed = schema.safeParse(formData.get("url"));

  if (!parsed.success) {
    const error = parsed.error.flatten().formErrors[0];
    return { error: error || "Oops, something went wrong" };
  }

  const url = parsed.data;

  try {
    await dbConnect();
    const exists = await Url.findOne({ url });

    if (exists) {
      return { success: exists.hash };
    }

    const hash = Math.random().toString(36).substring(7);
    const result = await Url.create({ url, hash });
    return { success: result.hash };
  } catch (e) {
    if (e instanceof Error) {
      console.error("Error: " + e.message);
    }
    console.error("Error: Something went wrong.");
  }
}
