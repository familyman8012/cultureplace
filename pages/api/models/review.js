import mongoose, { Schema } from "mongoose";

const MODEL_NAME = "Review";

const ReviewSchema = new Schema(
  {
    product: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
    userid: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    username: { type: String, required: true },
    title: { type: String, required: true },
    content: { type: String, required: true },
    active: { type: Boolean, default: false }
  },
  {
    timestamps: true
  }
);

export default mongoose.models[MODEL_NAME] ||
  mongoose.model(MODEL_NAME, ReviewSchema, "reviews");
