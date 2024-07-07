import React from "react";
import JobCard from "./JobCard";
import { dbConnect } from "@/lib/mongo";
import Job from "@/models/job-model";

interface Props {
  employerId: string;
}

const DisplayJobCards = async (props: Props) => {
  let postedJobs;
  try {
    await dbConnect();
    postedJobs = await Job.find({ employerId: props.employerId });
  } catch (error) {
    console.error("Error in fetching jobs", error);
  }

  return (
    <>
      {postedJobs.length === 0 && <p>No jobs posted yet</p>}
      {postedJobs &&
        postedJobs.map((job) => (
          <JobCard
            key={job._id}
            title={job.title}
            text={job.jobDescription}
            img="/exp2.svg"
            jobId={job._id}
          />
        ))}
    </>
  );
};

export default DisplayJobCards;
