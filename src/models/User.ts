import * as mongoose from "mongoose";
import { model } from "mongoose";

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone:{ type:String, required:true},
  password: { type: String, required: true },
  verification_token_time:{type:Date, required:true},
  verification_token:{type:Number, required:true},
  type: { type: String, required: true },
  status: { type: String, required: true },
  created_at:{type:Date, required: true, default:new Date()},
  updated_at:{type:Date, required: true, default:new Date()}
});

export default model("users", userSchema);
