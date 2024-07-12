import { dbConnect } from "@/lib/mongo";
import React from "react";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import User from "@/models/user-model";
import { Candidate } from "@/models/candidate-model";
import { redirect } from "next/navigation";

const page = async () => {
  const { getUser } = getKindeServerSession();
  const user = await getUser();
  await dbConnect();
  const userDB = await User.findOne({ kindeAuthId: user.id });
  const candidateId = userDB.candidateId;
  const candidate = await Candidate.findById(candidateId);

  async function handleSubmit(formData: FormData) {
    "use server";
    await dbConnect();
    const userDB = await User.findOne({ kindeAuthId: user.id });
    const candidateId = userDB.candidateId;
    try {
      const body = {
        $set: {
          title: formData.get("title"),
          summary: formData.get("summary"),
          yearsOfExperience: formData.get("yearsOfExperience"),
          location: formData.get("location"),
          preferences: {
            jobType: formData.get("jobType"),
          },
        },
      };

      await Candidate.updateOne({ _id: candidateId }, body);
    } catch (error) {
      console.error("Error in creating job", error);
    }

    redirect("/dashboard/candidate/job-suggestions");
  }

  return (
    <div className="overflow-auto mt-2 max-h-full p-4 border border-gray-400 rounded ">
      <form action={handleSubmit}>
        <div className="flex-col flex relative  mb-5 w-full">
          <label htmlFor="title" className="mr-5 ">
            Title:
          </label>
          <input
            type="text"
            name="title"
            id="title"
            required={true}
            defaultValue={candidate.title}
            contentEditable={true}
            className="lg:w-2/3 sm:w-full  p-1 rounded-md dark:bg-slate-700"
          />
        </div>
        <div className="flex-col row-span-3 my-4 w-full relative mb-5 ">
          <label htmlFor="summary" className="mr-5 flex">
            Summary:
          </label>
          <textarea
            name="summary"
            id="summary"
            required={true}
            contentEditable={true}
            defaultValue={candidate.summary}
            className="rounded-md lg:w-2/3 sm:w-full h-32 p-2 dark:bg-slate-700 resize-none"
          ></textarea>
        </div>
        <div className="mb-5 w-full">
          <label htmlFor="yearsOfExperience" className="mr-5">
            Years of Experience:
          </label>
          <input
            type="number"
            name="yearsOfExperience"
            id="yearsOfExperience"
            required={true}
            defaultValue={candidate.yearsOfExperience}
            contentEditable={true}
            className="w-12 dark:bg-slate-700 pl-2 rounded-md"
          />
        </div>
        <div className="flex-col relative mb-5">
          <label htmlFor="location" className="mr-5">
            Location:
          </label>
          <input
            type="text"
            name="location"
            id="location"
            required={true}
            defaultValue={candidate.location}
            contentEditable={true}
            className="w-72 py-1 px-2 rounded-md dark:bg-slate-700"
          />
        </div>

        <div className="mb-5">
          <label htmlFor="title" className="mr-5">
            Job Type:
          </label>
          <select name="jobType" id="jobType">
            <option value="full-time">Full Time</option>
            <option value="part-time">Part Time</option>
            <option value="contract">Contract</option>
          </select>
        </div>

        <input
          type="submit"
          className="bg-slate-700 px-3 font-semibold hover:text-pink-600 hover:bg-white hover:cursor-pointer rounded-md p-1.5"
          value="Submit"
        />
      </form>
    </div>
  );
};

export default page;
