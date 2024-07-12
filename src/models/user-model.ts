import { Schema, model, models } from "mongoose";

const UserSchema = new Schema({
  role: {
    required: true,
    type: String,
    enum: ["candidate", "employer"],
  },
  kindeAuthId: { type: String, required: true, unique: true },
  candidateId: { type: Schema.Types.ObjectId, ref: "CandidateProfile" },
  employerId: { type: Schema.Types.ObjectId, ref: "EmployerProfile" },
});

const User = models.User || model("User", UserSchema);

export default User;
