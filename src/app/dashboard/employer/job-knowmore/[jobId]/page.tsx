import { dbConnect } from "@/lib/mongo";
import React from "react";
import Job from "@/models/job-model";
import Link from "next/link";
import MatchedCandidates from "@/components/Employer/MatchedCandidates";

async function page({ params: { jobId } }) {
  const db = await dbConnect();
  const job = await Job.findById(jobId);

  return (
    <div className="font-Poppins bg-black-100 text-white h-full z-10 max-w-7xl mx-auto ">
      <div className="relative">
        <img
          src="/grid.svg"
          alt="grid"
          className="w-full h-full opacity-80 absolute inset-0"
        />
        <Link
          href="/dashboard/employer"
          className="relative z-20 pl-6 text-xl cursor-pointer hover:text-violet-300"
        >
          All Jobs
        </Link>

        <div className="relative z-20 py-10 pl-6">
          <h1 className="text-start text-4xl mb-5">{job.title}</h1>
          <div className="mb-10">
            <div className="pb-5">
              <h2 className="text-xl">Overall description</h2>
              <p>{job.jobDescription}</p>
            </div>
            <div className="pb-5">
              <h2 className="text-xl">Location: {job.location}</h2>
            </div>
            <div className="pb-5">
              <h2 className="text-xl">
                Years of experience: {job.yearsOfExperience}
              </h2>
            </div>
            <div className="pb-5">
              <h2 className="text-xl">Job type: {job.jobType}</h2>
            </div>
          </div>
        </div>
      </div>
      <MatchedCandidates props={jobId} />
    </div>
  );
}

export default page;
