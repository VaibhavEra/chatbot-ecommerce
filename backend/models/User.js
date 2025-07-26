import { Schema, model } from "mongoose";

const UserSchema = new Schema({
  email: String,
  name: String,
  createdAt: { type: Date, default: Date.now },
});

const User = model("User", UserSchema);
export default User;
