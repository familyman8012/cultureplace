import mongoose, { Schema } from "mongoose";

const MODEL_NAME = "Product";

const schema = new Schema(
  {
    title: { type: String, required: true },
    desc: { type: String, required: true },
    todo: { type: String, required: true },
    people: { type: String, required: true },
    peopleshow: { type: Boolean, required: true },
    imgurl: { type: String, required: true },
    location: { type: String, required: true },
    meetday: { type: String, required: true },
    firstmeet: { type: Date, required: true },
    body: { type: String, required: true },
    genre: { type: String, required: true },
    comment: { type: String, required: true },
    price: { type: Number, required: true, default: 35000 },
    quanity: { type: Number, required: true, default: 15 },
    joinMembr: {
      type: Array,
      default: [],
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.models[MODEL_NAME] ||
  mongoose.model(MODEL_NAME, schema, "products");
