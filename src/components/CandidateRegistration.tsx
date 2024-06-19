import { dbConnect } from "@/lib/mongo";
import { Candidate } from "@/models/candidate-model";

export const createCandidateProfile = async (kindeId: String) => {
  await dbConnect();
  const body = { kindeAuthId: kindeId };
  const newCandidate = new Candidate(body);
  await newCandidate.save();
  return newCandidate;
};
