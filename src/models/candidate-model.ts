import mongoose, { Schema } from "mongoose";

const candidateProfileSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  picture: { type: String },
  resume_str: { type: String }, // resume in string format
  title: String,
  skills: [{ type: String }],
  summary: String,
  experience: [
    {
      description: String,
    },
  ],
  yearsOfExperience: { type: Number },
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
  jobsRecommended: [
    {
      jobId: { type: Schema.Types.ObjectId, ref: "Job" },
      rank: Number,
    },
  ],
});

export const Candidate =
  mongoose.models.CandidateProfile ??
  mongoose.model("CandidateProfile", candidateProfileSchema);
