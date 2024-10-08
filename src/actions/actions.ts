"use server";

import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { revalidatePath } from "next/cache";
import pdf from "pdf-parse";
import { dbConnect } from "@/lib/mongo";
import { Candidate } from "@/models/candidate-model";
import { inference } from "@/utils/hf"; // Adjust import path as per your project structure
import User from "@/models/user-model";

export default async function uploadResume(data: FormData) {
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  try {
    const file: File | null = data.get("file") as unknown as File;

    if (!file || file.size === 0 || file.name === "undefined") {
      return;
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const pdfData = await pdf(buffer);
    const text = pdfData.text.replace(/[^a-zA-Z0-9\s.,;:&%'"!?()-]/g, "");

    //Extract resume details using huggingface inference and store it in database
    const prompt = `
      From the Resume text for a job aspirant below, extract Entities strictly as instructed below
      1. First, look for the Job Title of the candidate resume.
      2. skills property should be an array of strings. It should be a standalone word or a short phrase. DO NOT REPEAT SKILLS. If a skill is mentioned multiple times, it should be counted only once.
      3. summary property should be a crisp text summary and MUST NOT be more than 200 characters
      4. experience property should be an array of strings. Description should not exceed 100 characters
      5  yearsOfExperience should be a number. If the years of experience is not mentioned or the candidate is a fresher, it should be 0
      6. education property should be an array of strings. DO not repeat values
      7. If you cannot find any information on the entities & relationships above, it is okay to return empty value. DO NOT create fictious data
      8. Do NOT create duplicate entities
      9. NEVER Input missing values
      
      The JSON format for the Candidate entity is as follows:
      {
        title: string,
        skills: string[],
        summary: string,
        experience: [
          {
            description: string,
          },
        ],
        yearsOfExperience: number,
        education: [
          {
            institution: string,
            degree: string,
          },
        ],
      }

      The output should STRICTLY BE in JSON FORMAT as shown above.
      
      Question: Now, extract the details of the Candidate for the text below -
      
      ${text}
      
      Answer:
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

    console.log(out.choices[0].message.content);

    const resumeDetails = JSON.parse(out.choices[0].message.content);
    await dbConnect();

    const userDB = await User.findOne({ kindeAuthId: user.id });
    const candidateId = userDB.candidateId;

    await Candidate.updateOne(
      { _id: candidateId },
      {
        $set: {
          resume_str: text,
          title: resumeDetails.title,
          summary: resumeDetails.summary,
          skills: resumeDetails.skills,
          experience: resumeDetails.experience,
          education: resumeDetails.education,
        },
      }
    );

    revalidatePath("/dashboard/candidate/resume");
  } catch (error) {
    console.error("Error parsing or uploading resume_str:", error);
  }
}
