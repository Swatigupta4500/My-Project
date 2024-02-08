import { number } from "joi";
import * as mongoose from "mongoose";
import { model } from "mongoose";

const itemSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  rating: { type: Number, required: true },
});

export default model("items", itemSchema);
