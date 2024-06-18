import mongoose, { Schema } from "mongoose";

const employerProfileSchema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
  companyName: { type: String, required: true },
  companyWebsite: { type: String },
  companySize: { type: Number },
  industry: { type: String },
  location: { type: String },
});

export const Job =
  mongoose.models.EmployerProfile ??
  mongoose.model("EmployerProfile", employerProfileSchema);
