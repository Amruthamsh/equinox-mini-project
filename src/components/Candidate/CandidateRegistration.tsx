import { dbConnect } from "@/lib/mongo";
import { Candidate } from "@/models/candidate-model";

export const createCandidateProfile = async (kindeId: String) => {
  await dbConnect();
  //check if the user doesn't already have an entry in User Table

  //Create User

  //Create Candidate
  const candidateBody = { kindeAuthId: kindeId };
  const newCandidate = new Candidate(candidateBody);
  await newCandidate.save();
  return newCandidate;
};
