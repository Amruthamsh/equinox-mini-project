import mongoose, { Schema } from "mongoose";
import { StaticImport } from "next/dist/shared/lib/get-img-props";

export interface UserType {
  name: string;
  password: String;
  email: String;
  role: String;
  image: string | StaticImport;
}

const userSchema = new Schema<UserType>({
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
  image: {
    type: String,
  },
  role: {
    required: true,
    type: String,
    enum: ["candidate", "employer"],
  },
});

export const User =
  mongoose.models.User ?? mongoose.model<UserType>("User", userSchema);
