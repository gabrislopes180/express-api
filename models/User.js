import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  age: { type: Number, required: true, min: 0 },
  role: { type: String, required: true, enum: ["admin", "user"] },
});

export const User = mongoose.models.User || mongoose.model("User", UserSchema);
