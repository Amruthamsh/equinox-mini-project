import React from "react";
import Link from "next/link";

function page() {
  return (
    <div className="mx-auto max-w-2xl px-4 my-10">
      <h1 className="text-center text-2xl">New Job Details</h1>
      <form>
        <div className="w-full flex flex-col my-4">
          <label htmlFor="title">Title</label>
          <input
            type="text"
            autoComplete="off"
            id="title"
            className="bg-white text-black-100 rounded-md p-2"
          />
        </div>

        <div className="w-full flex flex-col my-4">
          <label htmlFor="title">Role</label>
          <input
            type="text"
            autoComplete="off"
            id="title"
            className="bg-white text-black-100 rounded-md p-2"
          />
        </div>

        <div className="w-full flex flex-col my-4">
          <label htmlFor="title">Years of Experience</label>
          <input
            type="number"
            autoComplete="off"
            id="title"
            className="bg-white text-black-100 rounded-md p-2"
          />
        </div>

        <div className="w-full flex flex-col row-span-3 my-4">
          <label htmlFor="title">Job Description</label>
          <input
            type="text"
            autoComplete="off"
            id="title"
            className="bg-white text-black-100 rounded-md p-2"
          />
        </div>

        <div className="w-full flex flex-col my-4">
          <label htmlFor="title">Education</label>
          <input
            type="text"
            autoComplete="off"
            id="title"
            className="bg-white text-black-100 rounded-md p-2"
          />
        </div>

        <div className="w-full flex flex-col my-4">
          <label htmlFor="title">Skills Required</label>
          <input
            type="text"
            autoComplete="off"
            id="title"
            className="bg-white text-black-100 rounded-md p-2"
          />
        </div>

        <div className="flex place-content-center gap-5">
          <Link
            href="/dashboard/employer"
            className="px-4 py-2 w-32 justify-end rounded-md bg-slate-800 text-white text-center font-medium"
          >
            Cancel
          </Link>
          <button
            type="submit"
            className="px-4 py-2 w-32 justify-start rounded-md bg-indigo-800 text-white font-medium"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
}

export default page;
