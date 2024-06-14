//where model and DB is getting connected

import { Candidate } from "@/model/candidate-model";

export async function createCandidate(candidate: any) {
  try {
    const user = await Candidate.create(candidate);
  } catch (e) {
    throw e;
  }
}
