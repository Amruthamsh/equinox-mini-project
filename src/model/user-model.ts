import mongoose, { Schema, mongo } from "mongoose";

const userSchema = new Schema({
  name: {
    required: true,
    type: String,
  },
  password: {
    required: true,
    type: String,
  },
  email: {
    required: true,
    type: String,
  },
  role: {
    required: true,
    type: String,
    enum: ["candidate", "employer"],
  },
});

export const User = mongoose.models.User ?? mongoose.model("User", userSchema);
