import mongoose, { Schema } from "mongoose";

const MODEL_NAME = "User";

const schema = new Schema(
  {
    name: String,
    password : String
  },
  {
    timestamps: true,
  }
);

export default mongoose.models[MODEL_NAME] ||
  mongoose.model(MODEL_NAME, schema, "users");
