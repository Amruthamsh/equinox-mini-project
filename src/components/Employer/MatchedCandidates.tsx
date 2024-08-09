import React from "react";
import { dbConnect } from "@/lib/mongo";
import Job from "@/models/job-model";
import { Candidate } from "@/models/candidate-model";
import Image from "next/image";

const MatchedCandidates = async ({ props: jobId }) => {
  await dbConnect();
  const job = await Job.findById(jobId);

  const agg = [
    {
      $search: {
        index: "candidate_search",
        compound: {
          must: [
            {
              text: {
                query: job.keywordString,
                path: "resume_str",
              },
            },
            {
              text: {
                query: job.location,
                path: "location",
                fuzzy: {},
              },
            },
            {
              equals: {
                value: job.jobType,
                path: "preferences.jobType",
              },
            },
            {
              range: {
                gte: job.yearsOfExperience,
                path: "yearsOfExperience",
              },
            },
          ],
        },
      },
    },
    { $limit: 10 },
    {
      $project: {
        _id: 1,
        name: 1,
        email: 1,
        picture: 1,
        title: 1,
        summary: 1,
        skills: 1,
        score: 1,
        maxScore: 1,
        normalizedScore: 1,
      },
    },
    {
      $addFields: {
        score: {
          $meta: "searchScore",
        },
      },
    },
    {
      $setWindowFields: {
        output: {
          maxScore: {
            $max: "$score",
          },
        },
      },
    },
    {
      $addFields: {
        normalizedScore: {
          $divide: ["$score", "$maxScore"],
        },
      },
    },
  ];
  const candidates = await Candidate.aggregate(agg);

  try {
    console.log(candidates);

    // Update the existing job recommendation if it exists
    for (const candidate of candidates) {
      await Candidate.updateOne(
        { _id: candidate._id, "jobsRecommended.jobId": jobId },
        {
          $set: {
            jobId: jobId,
            "jobsRecommended.$.score": candidate.normalizedScore,
          },
        }
      );

      //Push a new job recommendation if it does not exist
      await Candidate.updateOne(
        { _id: candidate._id, "jobsRecommended.jobId": { $ne: jobId } },
        {
          $push: {
            jobsRecommended: {
              jobId: jobId,
              score: candidate.normalizedScore,
            },
          },
        }
      );
    }
  } catch (error) {
    console.error("Error during aggregation:", error);
  }
  if (candidates.length === 0) {
    return (
      <div className="flex justify-center text-lg">
        No Matched Candidates yet!
      </div>
    );
  }

  return (
    <div className="py-2">
      <h1 className="text-4xl pl-6 pb-5">Candidates</h1>
      <div className="text-center grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-5xl mx-auto">
        {candidates.map((candidate, index) => (
          <div
            key={index}
            className="bg-white/10 hover:scale-105 transition duration-300 ease-in-out cursor-pointer p-8 rounded-xl flex flex-col justify-between"
          >
            <div>
              <img
                src={candidate.picture || "/exp1.svg"}
                alt=""
                className="h-20 mx-auto rounded-full mb-2"
              />
              <h4 className="uppercase text-xl font-bold">{candidate.name}</h4>
              <p className="text-sm leading-7 my-3 font-light opacity-50">
                {candidate.summary}
              </p>
              <a href={`mailto:${candidate.email}`}>
                <button className="bg-slate-700 hover:bg-violet-600 py-2.5 px-8 rounded-full">
                  Get in touch
                </button>
              </a>
            </div>
            <p className="mt-4">
              Score: {(candidate.normalizedScore * 100).toPrecision(4) + "%"}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MatchedCandidates;
