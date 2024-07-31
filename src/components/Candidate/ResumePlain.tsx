import { dbConnect } from "@/lib/mongo";
import React from "react";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { Candidate } from "@/models/candidate-model";
import User from "@/models/user-model";

const ResumePlain = async () => {
  let pdfText = "";

  try {
    const { getUser } = getKindeServerSession();
    const user = await getUser();

    if (!user) {
      pdfText = "This is a placeholder for the PDF text. User not found";
    } else {
      pdfText = "This is a placeholder for the PDF text. User found";
      await dbConnect();
      const userDB = await User.findOne({ kindeAuthId: user.id });
      const candidate = await Candidate.findById(userDB.candidateId);
      pdfText = candidate.resume_str;
    }
  } catch (error) {
    console.error("Error loading candidate details:", error);
    return null;
  }

  return (
    <>
      {pdfText && (
        <div className="overflow-auto max-h-full p-4 border border-gray-400 rounded">
          <h2 className="text-lg font-bold mb-2">PDF Text:</h2>
          <pre className="whitespace-pre-wrap text-white-200">{pdfText}</pre>
        </div>
      )}
    </>
  );
};

export default ResumePlain;
