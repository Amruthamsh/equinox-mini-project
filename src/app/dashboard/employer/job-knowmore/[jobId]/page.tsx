import { dbConnect } from "@/lib/mongo";
import React from "react";
import Job from "@/models/job-model";
import Link from "next/link";
import { Candidate } from "@/models/candidate-model";

async function page({ params: { jobId } }) {
  const db = await dbConnect();
  const job = await Job.findById(jobId);

  const agg = [
    {
      $search: {
        index: "candidate_search",
        text: {
          query: "Bachelor Fine Art",
          path: {
            wildcard: "*",
          },
        },
      },
    },
    {
      $project: {
        title: 1,
        score: { $meta: "searchScore" },
      },
    },
  ];

  try {
    const documents = await Candidate.collection.aggregate(agg).toArray();
    documents.forEach((doc) => console.log(doc));
  } catch (error) {
    console.error("Error during aggregation:", error);
  }

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

      <div className="py-2">
        <h1 className="text-4xl pl-6 pb-5">Candidates</h1>
        <div className="text-center flex max-w-5xl mx-auto gap-8">
          <div className="bg-white/10 hover:scale-105 transition duration-300 ease-in-out cursor-pointer p-8 rounded-xl">
            <img src="/exp1.svg" alt="" className="h-20 mx-auto" />
            <h4 className="uppercase text-xl font-bold">John Doe</h4>
            <p className="text-sm leading-7 my-3 font-light opacity-50">
              Hi, I'm John Doe, a full-stack developer with 8 years of
              experience. I specialize in JavaScript, Python, and Java, and have
              a knack for using React and Django to create robust applications.
            </p>
            <button className="bg-violet-400 py-2.5 px-8 rounded-full">
              Get in touch
            </button>
          </div>

          <div className="bg-white/10 hover:scale-105 transition duration-300 ease-in-out cursor-pointer p-8 rounded-xl">
            <img src="/exp4.svg" alt="" className="h-20 mx-auto" />
            <h4 className="uppercase text-xl font-bold">Emily Johnson</h4>
            <p className="text-sm leading-7 my-3 font-light opacity-50">
              My name is Emily Johnson, and I have 6 years of experience in AI
              and machine learning. I’m proficient in Python, TensorFlow, and
              PyTorch, and I love creating AI models that solve real-world
              problems.
            </p>
            <button className="bg-violet-400 py-2.5 px-8 rounded-full">
              Get in touch
            </button>
          </div>

          <div className="bg-white/10 hover:scale-105 transition duration-300 ease-in-out cursor-pointer p-8 rounded-xl">
            <img src="/exp1.svg" alt="" className="h-20 mx-auto" />
            <h4 className="uppercase text-xl font-bold">Michael Brown</h4>
            <p className="text-sm leading-7 my-3 font-light opacity-50">
              I'm Michael Brown, a DevOps-focused software engineer with 7 years
              of experience. I specialize in AWS, Azure, and CI/CD practices to
              ensure efficient software delivery and scalable infrastructure.
            </p>
            <button className="bg-violet-400 py-2.5 px-8 rounded-full">
              Get in touch
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default page;