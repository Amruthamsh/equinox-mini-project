"use client";

import React, { useState } from "react";

interface ResumeDetails {
  title: string;
  summary: string;
  education: string[];
  skills: string[];
  experience: string[];
  years_of_experience: number;
}

export default function Page() {
  const [file, setFile] = useState<File | null>(null);
  const [pdfText, setPdfText] = useState<string | null>(null);
  const [resumeDetails, setResumeDetails] = useState<ResumeDetails | null>(
    null
  );

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!file) return;

    try {
      const data = new FormData();
      data.append("file", file);

      const res = await fetch("/api/upload", {
        method: "POST",
        body: data,
      });

      if (!res.ok) {
        throw new Error(await res.text());
      }

      const result = await res.json();
      if (result.success) {
        setPdfText(result.text); // Store the PDF text in state
      } else {
        console.error("Failed to parse PDF");
      }
    } catch (err) {
      console.error("Error:", err);
    }
  };

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

  return (
    <div className="h-fit">
      <form onSubmit={onSubmit} className="mb-4">
        <input
          type="file"
          name="file"
          onChange={(e) => setFile(e.target.files?.[0] || null)}
          className="mb-2"
        />
        <input
          className="bg-black-300 p-1 rounded-sm"
          type="submit"
          value="Upload"
        />
      </form>

      <form onSubmit={generateResumeDetails}>
        <input
          type="submit"
          value="Generate Resume Details"
          className="bg-black-300 p-1 rounded-sm"
        ></input>
      </form>

      {pdfText && (
        <div className="overflow-auto max-h-full p-4 border border-gray-400 rounded">
          <h2 className="text-lg font-bold mb-2">PDF Text:</h2>
          <pre className="whitespace-pre-wrap text-white-200">{pdfText}</pre>
        </div>
      )}

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
