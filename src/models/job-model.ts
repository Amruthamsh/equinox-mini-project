import mongoose, { Schema } from "mongoose";

const jobSchema = new Schema({
  title: { type: String, required: true },
  role: { type: String, required: true },
  industry: { type: String, required: true },
  yearsOfExperience: { type: Number, required: true },
  jobDescription: { type: String, required: true },
  keywordString: { type: String },
  skillsRequired: [{ type: String }],
  experienceRequired: { type: String },
  educationRequired: { type: String },
  location: { type: String, required: true },
  jobType: {
    type: String,
    enum: ["full-time", "part-time", "contract"],
    required: true,
  },
  employerId: {
    type: Schema.Types.ObjectId,
    ref: "EmployerProfile",
    required: true,
  },
  postedAt: { type: Date, default: Date.now },
});

const Job = mongoose.models.Job ?? mongoose.model("Job", jobSchema);

export default Job;
