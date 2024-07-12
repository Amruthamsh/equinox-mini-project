import React from "react";
import Link from "next/link";
import { dbConnect } from "@/lib/mongo";
import Job from "@/models/job-model";
import { redirect } from "next/navigation";
import { inference } from "@/utils/hf";

const industries = [
  "Advertising",
  "Aerospace",
  "Agriculture",
  "Automotive",
  "Banking",
  "Biotechnology",
  "Construction",
  "Defence",
  "Education",
  "Entertainment",
  "Fashion",
  "Financial",
  "Gaming",
  "Healthcare",
  "Info",
  "IT",
  "Telecommunication",
];

function page({ params }) {
  async function handleSubmit(formData: FormData) {
    "use server";

    console.log("Form Data:", formData.get("title"));
    console.log("Employer ID:", params.employerId);

    try {
      const prompt = `
      ${formData.get("jobDescription")}
      From the Job Description above,
      extract keywords relevant to the job role, 
      skills, and experience and return them in an array format.

      The JSON format for the Keywords entity is as follows:
      [
        "keyword1",
        "keyword2",
        "keyword3",
        ...
      ]

      `;

      const out = await inference.chatCompletion({
        model: "mistralai/Mistral-7B-Instruct-v0.3",
        messages: [
          {
            role: "user",
            content: prompt,
          },
        ],
        max_tokens: 4096,
      });

      const keywordsArray = JSON.parse(out.choices[0].message.content);
      const keywordsString = keywordsArray.join(" ");

      console.log("industry:", formData.get("industry"));
      console.log("Keywords:", keywordsString);

      await dbConnect();
      //create new job
      const body = {
        title: formData.get("title"),
        role: formData.get("role"),
        industry: formData.get("industry"),
        yearsOfExperience: formData.get("yearsOfExperience"),
        jobDescription: keywordsString,
        keywordString: formData.get("jobDescription"),
        location: formData.get("location"),
        jobType: formData.get("jobType"),
        employerId: params.employerId,
      };

      const newJob = new Job(body);
      await newJob.save();
    } catch (error) {
      console.error("Error in creating job", error);
    }

    redirect("/dashboard/employer");
  }

  return (
    <div className="mx-auto max-w-2xl px-4 my-10">
      <h1 className="text-center text-2xl">Post New Job</h1>
      <form action={handleSubmit}>
        <div className="w-full flex flex-col my-4">
          <label htmlFor="title">Title</label>
          <input
            type="text"
            autoComplete="off"
            name="title"
            id="title"
            required={true}
            className="bg-white text-black-100 rounded-md p-2"
          />
        </div>

        <div className="w-full flex flex-col my-4">
          <label htmlFor="title">Role</label>
          <input
            type="text"
            autoComplete="off"
            name="role"
            id="role"
            required={true}
            className="bg-white text-black-100 rounded-md p-2"
          />
        </div>

        <div>
          <label>Industry</label>
          <select name="industry" id="industry">
            {industries.map((ind) => (
              <option key={ind} value={ind}>
                {ind}
              </option>
            ))}
          </select>
        </div>

        <div className="w-full flex flex-col my-4">
          <label htmlFor="title">Years of Experience</label>
          <input
            type="number"
            autoComplete="off"
            name="yearsOfExperience"
            id="yearsOfExperience"
            required={true}
            className="bg-white text-black-100 rounded-md p-2"
          />
        </div>

        <div>
          <label htmlFor="title">Job Type</label>
          <select name="jobType" id="jobType">
            <option value="full-time">Full Time</option>
            <option value="part-time">Part Time</option>
            <option value="contract">Contract</option>
          </select>
        </div>

        <div className="w-full flex flex-col row-span-3 my-4">
          <label htmlFor="title">Job Description</label>

          <textarea
            id="jobDescription"
            name="jobDescription"
            rows={10}
            required={true}
            className="bg-white text-black-100 rounded-md p-2"
          />
        </div>

        <div className="w-full flex flex-col my-4">
          <label htmlFor="title">Location</label>
          <input
            type="text"
            autoComplete="off"
            id="location"
            name="location"
            required={true}
            className="bg-white text-black-100 rounded-md p-2"
          />
        </div>

        <div className="flex place-content-center gap-5">
          <Link
            href="/dashboard/employer"
            className="px-4 py-2 w-32 justify-end rounded-md bg-slate-800 text-white text-center font-medium hover:bg-slate-600"
          >
            Cancel
          </Link>
          <button
            type="submit"
            className="px-4 py-2 w-32 justify-start rounded-md bg-indigo-800 text-white font-medium hover:bg-pink-600"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
}

export default page;
