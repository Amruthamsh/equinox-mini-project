"use client";

import React from "react";
import { useFormStatus } from "react-dom";
import uploadResume from "@/actions/actions";

function Submit() {
  const { pending } = useFormStatus();
  return (
    <input
      className={
        pending
          ? "bg-black-300 py-1 px-2 rounded-sm text-white cursor-not-allowed"
          : "bg-black-300 py-1 px-2 rounded-sm hover:bg-white hover:text-pink-600 cursor-pointer"
      }
      type="submit"
      value={pending ? "Submitting..." : "Upload"}
      disabled={pending}
    />
  );
}

export default async function FetchResumeDetails() {
  return (
    <div className="h-fit py-4">
      <h1 className="text-xl font-bold mb-4">Upload New Resume</h1>
      <form action={uploadResume} className="mb-1">
        <input type="file" name="file" required={true} className="mb-2" />
        <Submit />
      </form>
    </div>
  );
}
