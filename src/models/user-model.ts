import { Schema, model, models } from "mongoose";

const UserSchema = new Schema({
  role: {
    required: true,
    type: String,
    enum: ["candidate", "employer"],
  },
  kindeAuthId: { type: String, required: true, unique: true },
});

const User = models.User || model("User", UserSchema);

export default User;
