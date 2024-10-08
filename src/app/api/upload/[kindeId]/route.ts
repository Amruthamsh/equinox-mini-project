import { revalidatePath } from "next/cache";
import { NextRequest, NextResponse } from "next/server";
import pdf from "pdf-parse";
import { dbConnect } from "@/lib/mongo";
import { Candidate } from "@/models/candidate-model";

export async function POST(
  request: NextRequest,
  { params }: { params: { kindeId: string } }
) {
  const data = await request.formData();
  const file: File | null = data.get("file") as unknown as File;

  if (!file) {
    return NextResponse.json({ success: false });
  }

  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);

  try {
    const pdfData = await pdf(buffer);
    const text = pdfData.text.replace(/[^a-zA-Z0-9\s.,;:&%'"!?()-]/g, "");

    await dbConnect();

    const updateResult = await Candidate.updateOne(
      { kindeAuthId: params.kindeId },
      {
        $set: {
          resume_str: text,
        },
      }
    );

    if (updateResult.modifiedCount === 0) {
      return NextResponse.json({
        success: false,
        message: "No document updated",
      });
    }

    revalidatePath("/dashboard/candidate/resume");
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error parsing PDF:", error);
    return NextResponse.json({ success: false });
  }
}

// Function to parse the resume text
function parseResumeBasic(text: String) {
  const sections = text.split("\n\n");
  const resume = {
    summary: "",
    skills: [],
    experience: [],
    education: [],
  };

  let currentSection = "";

  sections.forEach((section) => {
    if (section.includes("Summary")) {
      currentSection = "summary";
      resume.summary = section.replace("Summary\n", "").trim();
    } else if (section.includes("Skills")) {
      currentSection = "skills";
      resume.skills = section.replace("Skills\n", "").trim().split("\n");
    } else if (section.includes("Experience")) {
      currentSection = "experience";
      resume.experience.push(section.replace("Experience\n", "").trim());
    } else if (section.includes("Education and Training")) {
      currentSection = "education";
      resume.education.push(
        section.replace("Education and Training\n", "").trim()
      );
    } else {
      if (currentSection === "experience") {
        resume.experience.push(section.trim());
      } else if (currentSection === "education") {
        resume.education.push(section.trim());
      }
    }
  });

  return resume;
}
