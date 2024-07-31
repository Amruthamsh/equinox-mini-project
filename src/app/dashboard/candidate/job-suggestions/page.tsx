import React from "react";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { dbConnect } from "@/lib/mongo";
import Job from "@/models/job-model";
import { Candidate } from "@/models/candidate-model";
import User from "@/models/user-model";

export default async function Page() {
  let candidate = null;
  try {
    const { getUser } = getKindeServerSession();
    const user = await getUser();
    await dbConnect();
    const userDB = await User.findOne({ kindeAuthId: user.id! });
    candidate = await Candidate.findById(userDB.candidateId);
  } catch (error) {
    console.error("Error fetching user or candidate details:", error);
  }

  // Create a map of job IDs to their scores
  const jobScores = {};
  candidate.jobsRecommended.forEach((rec) => {
    jobScores[rec.jobId.toString()] = (rec.score * 100).toPrecision(4) + "%";
  });

  const jobIds = candidate.jobsRecommended.map((rec) => rec.jobId);
  const jobs = await Job.find({ _id: { $in: jobIds } });

  return (
    <>
      <div className="font-bold text-2xl mb-4">Job Suggestions</div>
      <div className="grid grid-cols-3 gap-4">
        {jobs.map((job) => (
          <div key={job._id} className="p-4 border border-white rounded-md">
            <div className="flex flex-row place-content-between items-center mb-3">
              <h3 className="font-semibold text-xl">{job.title}</h3>
              <p className="font-semibold">
                Score: {jobScores[job._id.toString()]}
              </p>
            </div>

            <p>Role: {job.role}</p>
            <p>Industry: {job.industry}</p>
            <p>Experience Required: {job.yearsOfExperience} years</p>
            <p>Location: {job.location}</p>
            <p>Job Type: {job.jobType}</p>
            <div className="flex justify-end">
              <button className="hover:bg-white hover:text-pink-600 font-semibold p-2 rounded-lg">
                Contact Recruiter
              </button>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
