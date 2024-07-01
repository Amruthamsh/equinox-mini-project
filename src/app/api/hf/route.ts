import { NextResponse, NextRequest } from "next/server";
import { inference } from "@/utils/hf"; // Adjust import path as per your project structure

export async function POST(request: NextRequest) {
  const data = await request.json();

  try {
    const type = data.type;
    const prompt = `
From the Resume text for a job aspirant below, extract Entities strictly as instructed below
1. First, look for the Job Title. The title should be the first line of the resume
2. summary property should be a crisp text summary and MUST NOT be more than 100 characters
3. education property should be an array of strings
4. skills property should be an array of strings
5. experience property should be an array of strings
6. If you cannot find any information on the entities & relationships above, it is okay to return empty value. DO NOT create fictious data
7. Do NOT create duplicate entities
8. NEVER Impute missing values

The JSON format for the Person entity is as follows:
  {
      "title": string,
      "summary": string,
      "education": string[],
      "skills": string[],
      "experience": string[]
      "years_of_experience": integer,
  }

Question: Now, extract the Person for the text below -

${data.text}

Answer:
`;

    if (type === "resume") {
      const out = await inference.chatCompletion({
        model: "mistralai/Mistral-7B-Instruct-v0.3",
        messages: [
          {
            role: "user",
            content: prompt,
          },
        ],
        max_tokens: 1000,
      });

      const resumeDetails = JSON.parse(out.choices[0].message.content);

      return NextResponse.json({ success: true, resumeDetails });
    } else {
      return NextResponse.json({ error: "Invalid type" }, { status: 400 });
    }
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
