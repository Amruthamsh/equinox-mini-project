import mongoose, { Schema } from "mongoose";

const employerProfileSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  picture: { type: String },
  companyName: { type: String, required: true },
  companyWebsite: { type: String },
  companySize: { type: Number },
  industry: { type: String },
  location: { type: String },
});

export const Employer =
  mongoose.models.EmployerProfile ??
  mongoose.model("EmployerProfile", employerProfileSchema);
