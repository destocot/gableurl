import mongoose from "mongoose";

export type TUrl = mongoose.Document & {
  url: string;
  hash: string;
};

const UrlSchema = new mongoose.Schema<TUrl>(
  {
    url: {
      type: String,
      required: true,
    },
    hash: {
      type: String,
      required: true,
    },
  },
  { timestamps: true, versionKey: false }
);

export default mongoose.models.Url || mongoose.model<TUrl>("Url", UrlSchema);
