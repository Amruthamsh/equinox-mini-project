import { Schema, model, models } from "mongoose";

const UserSchema = new Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  role: {
    required: true,
    type: String,
    enum: ["candidate", "employer"],
  },
  kindeAuthID: { type: String, required: true, unique: true },
});

const User = models.User || model("User", UserSchema);

export default User;
