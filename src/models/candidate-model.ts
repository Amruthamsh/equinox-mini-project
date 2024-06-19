import mongoose, { Schema } from "mongoose";

const candidateProfileSchema = new Schema({
  resume: { type: String }, // resume in string format
  skills: [{ type: String }],
  experience: [
    {
      company: String,
      position: String,
      startDate: Date,
      endDate: Date,
    },
  ],
  education: [
    {
      institution: String,
      degree: String,
      startDate: Date,
      endDate: Date,
    },
  ],
  location: { type: String },
  preferences: {
    jobType: { type: String, enum: ["full-time", "part-time", "contract"] },
    industries: [{ type: String }],
  },
  kindeAuthId: { type: String, required: true },
});

export const Candidate =
  mongoose.models.CandidateProfile ??
  mongoose.model("CandidateProfile", candidateProfileSchema);
