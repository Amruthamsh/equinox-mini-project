"use client";

import { redirect } from "next/navigation";
import React from "react";

interface Props {
  jobId: string;
}

const DeleteJobButton = (props: Props) => {
  console.log("Rendering DeleteJobButton with jobId:", props.jobId);
  const deleteJob = async () => {
    console.log("Deleted ", props.jobId);
  };

  return (
    <button
      onClick={deleteJob}
      className="hover:bg-red-600 hover:cursor-pointer bg-slate-700 absolute p-2 rounded-md "
    >
      Delete Job Posting
    </button>
  );
};

export default DeleteJobButton;
