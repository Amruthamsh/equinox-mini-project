import mongoose, { Schema } from "mongoose";

const jobSchema = new Schema({
  employerId: {
    type: Schema.Types.ObjectId,
    ref: "EmployerProfile",
    required: true,
  },
  title: { type: String, required: true },
  description: { type: String, required: true },
  skillsRequired: [{ type: String }],
  experienceRequired: { type: String },
  educationRequired: { type: String },
  location: { type: String },
  jobType: {
    type: String,
    enum: ["full-time", "part-time", "contract"],
    required: true,
  },
  postedAt: { type: Date, default: Date.now },
});

export const Job = mongoose.models.Job ?? mongoose.model("Job", jobSchema);
