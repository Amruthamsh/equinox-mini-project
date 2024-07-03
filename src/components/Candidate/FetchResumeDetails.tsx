import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { revalidatePath } from "next/cache";
import pdf from "pdf-parse";
import { dbConnect } from "@/lib/mongo";
import { Candidate } from "@/models/candidate-model";

export default async function FetchResumeDetails() {
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  async function uploadResume(data: FormData) {
    "use server";

    try {
      const file: File | null = data.get("file") as unknown as File;

      if (!file || file.size === 0 || file.name === "undefined") {
        return;
      }

      const bytes = await file.arrayBuffer();
      const buffer = Buffer.from(bytes);

      const pdfData = await pdf(buffer);
      const text = pdfData.text.replace(/[^a-zA-Z0-9\s.,;:&%'"!?()-]/g, "");

      await dbConnect();

      await Candidate.updateOne(
        { kindeAuthId: user.id },
        {
          $set: {
            resume_str: text,
          },
        }
      );

      //Extract resume details using huggingface inference and store it in database

      revalidatePath("/dashboard/candidate/resume");
    } catch (error) {
      console.error("Error parsing or uploading resume_str:", error);
    }
  }

  /*

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!file) return;
    if (!user) return;

    try {
      const data = new FormData();
      data.append("file", file);

      const res = await fetch(`/api/upload/${user.id}`, {
        method: "POST",
        body: data,
      });

      if (!res.ok) {
        throw new Error(await res.text());
      }

      const result = await res.json();
      if (result.success) {
        console.log("PDF uploaded successfully");
      } else {
        console.error("Failed to parse PDF");
      }
    } catch (err) {
      console.error("Error:", err);
    }
  };
*/

  /*

  const generateResumeDetails = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!pdfText) return;

    try {
      const res = await fetch("/api/hf", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          type: "resume",
          text: pdfText,
        }),
      });

      if (!res.ok) {
        throw new Error(await res.text());
      }

      const result = await res.json();
      if (result.success) {
        setResumeDetails(result.resumeDetails); // Update resume details state
      } else {
        console.error("Failed to parse PDF");
      }
    } catch (err) {
      console.error("Error:", err);
    }
  };
*/
  return (
    <div className="h-fit">
      <form action={uploadResume} className="mb-4">
        <input type="file" name="file" required={true} className="mb-2" />
        <input
          className="bg-black-300 py-1 px-2 rounded-sm hover:bg-white hover:text-pink-600 cursor-pointer"
          type="submit"
          value="Upload"
        />
      </form>
    </div>
  );
}
/*

      {resumeDetails && (
        <div className="overflow-auto mt-8 max-h-full p-4 border border-gray-400 rounded">
          <h2 className="text-lg font-bold mb-2">Resume Details:</h2>
          <div className="mb-4">
            <h3 className="font-bold">Title:</h3>
            <p>{resumeDetails.title}</p>
          </div>
          <div className="mb-4">
            <h3 className="font-bold">Summary:</h3>
            <p>{resumeDetails.summary}</p>
          </div>
          <div className="mb-4">
            <h3 className="font-bold">Education:</h3>
            <ul>
              {resumeDetails.education.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          </div>
          <div className="mb-4">
            <h3 className="font-bold">Skills:</h3>
            <ul>
              {resumeDetails.skills.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          </div>
          <div className="mb-4">
            <h3 className="font-bold">Experience:</h3>
            <ul>
              {resumeDetails.experience.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          </div>
          <div className="mb-4">
            <h3 className="font-bold">Years of Experience:</h3>
            <p>{resumeDetails.years_of_experience}</p>
          </div>
        </div>
      )}
    </div>
  );
}
  */
