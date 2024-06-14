import mongoose, { Schema, mongo } from "mongoose";

const candidateSchema = new Schema({
  name: {
    required: true,
    type: String,
  },
  password: {
    required: true,
    type: String,
  },
  email: {
    required: true,
    type: String,
  },
});

export const Candidate =
  mongoose.models.Candidate ?? mongoose.model("Candidate", candidateSchema);
