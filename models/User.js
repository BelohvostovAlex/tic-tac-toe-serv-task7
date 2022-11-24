import { Schema, model } from "mongoose";

const UserSchema = new Schema({
  username: { type: String, unique: true, required: true },
  userId: { type: String, unique: true },
  dateOfLastEnter: { type: Date, default: Date.now },
});

export default model("User", UserSchema);
