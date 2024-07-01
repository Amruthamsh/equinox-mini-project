import mongoose, { Schema } from "mongoose";

const employerProfileSchema = new Schema({
  companyName: { type: String, required: true },
  companyWebsite: { type: String },
  companySize: { type: Number },
  industry: { type: String },
  location: { type: String },
  kindeAuthId: { type: String, required: true },
});

export const Employer =
  mongoose.models.EmployerProfile ??
  mongoose.model("EmployerProfile", employerProfileSchema);
