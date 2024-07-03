import mongoose, { Schema } from "mongoose";

const candidateProfileSchema = new Schema({
  resume_str: { type: String }, // resume in string format
  title: String,
  skills: [{ type: String }],
  summary: String,
  experience: [
    {
      description: String,
      startDate: String,
      endDate: String,
    },
  ],
  education: [
    {
      institution: String,
      degree: String,
    },
  ],
  location: { type: String },
  preferences: {
    jobType: { type: String, enum: ["full-time", "part-time", "contract"] },
    industries: [{ type: String }],
  },
  kindeAuthId: { type: String, required: true, unique: true },
});

export const Candidate =
  mongoose.models.CandidateProfile ??
  mongoose.model("CandidateProfile", candidateProfileSchema);
