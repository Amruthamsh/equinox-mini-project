"use client";

import React, { useState } from "react";

export default function Page() {
  const [file, setFile] = useState<File | null>(null);
  const [pdfText, setPdfText] = useState<string | null>(null);

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
      {pdfText && (
        <div className="overflow-auto max-h-full p-4 border border-gray-400 rounded">
          <h2 className="text-lg font-bold mb-2">PDF Text:</h2>
          <pre className="whitespace-pre-wrap text-white-200">{pdfText}</pre>
        </div>
      )}
    </div>
  );
}
