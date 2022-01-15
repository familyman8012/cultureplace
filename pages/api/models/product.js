import mongoose, { Schema } from "mongoose";

const MODEL_NAME = "Product";

const ProductSchema = new Schema(
  {
    imgurl: { type: String, required: true },
    title: { type: String, required: true },
    people: { type: String, required: true },
    genre: { type: String, required: true },
    location: { type: String, required: true },
    meetingcycle: { type: String, required: true },
    meetday: { type: String },
    firstmeet: { type: Date, required: true },
    body: { type: String, required: true },
    price: { type: Number, required: true, default: 35000 },
    saleprice: { type: Number, required: true, default: 0 },
    quanity: { type: Number, required: true, default: 15 },
    islive: { type: Boolean, required: true, default: true },
    joinMembr: [{ type: Schema.Types.ObjectId, ref: "User" }],
    favoriteduser: [{ type: Schema.Types.ObjectId, ref: "User" }]
  },
  {
    timestamps: true
  }
);

// ProductSchema.virtual("reviews", {
//   ref: "Review",
//   localField: "_id",
//   foreignField: "product"
// });

// ProductSchema.set("toObject", { virtuals: true });
// ProductSchema.set("toJSON", { virtuals: true });

export default mongoose.models[MODEL_NAME] ||
  mongoose.model(MODEL_NAME, ProductSchema, "products");
