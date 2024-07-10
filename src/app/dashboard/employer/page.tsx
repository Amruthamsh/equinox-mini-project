import React from "react";
import Link from "next/link";

import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { redirect } from "next/navigation";

import { dbConnect } from "@/lib/mongo";
import User from "@/models/user-model";
import DisplayJobCards from "@/components/Employer/DisplayJobCards";
import { Employer } from "@/models/employer-model";

/*

const getEmployerDetails = async (kindeId: String) => {
  try {
    const response = await fetch(
      `http://localhost:3000/api/employer/${kindeId}`,
      {
        cache: "no-store",
      }
    );

    if (!response.ok) {
      throw new Error(`Failed to fetch employer details: ${response.status}`);
    }

    const employer = await response.json();

    console.log("Employer details:", employer);

    return employer;
  } catch (error) {
    console.error("Error loading employer details:", error);
    return null; // or throw an error
  }
};
*/

const getEmployerDetails = async (kindeId: String) => {
  try {
    const user = await User.findOne({ kindeAuthId: kindeId });
    if (!user) return null;

    const employer = await Employer.findById(user.employerId);
    if (!employer) return null;

    console.log("Employer Details", employer);
    return employer;
  } catch (error) {
    console.error("Error loading employer details:", error);
    return null; // or throw an error
  }
};

const page = async () => {
  const { getUser } = getKindeServerSession();

  const user = await getUser();

  await dbConnect();
  //check if the user doesn't already have an entry in User Table
  const existingUser = await User.findOne({
    kindeAuthId: user?.id!,
  });

  if (existingUser) {
    if (existingUser.role == "candidate") {
      redirect("/");
    }
  }

  const employer = await getEmployerDetails(user?.id!);

  if (!employer) redirect("/register/employer");

  return (
    <>
      <div className="bg-gradient-to-r from-black-100 to-slate-950 pb-[300px] py-2 h-full">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 z-10">
          <img
            src="/grid.svg"
            alt="grid"
            className="w-screen h-96 opacity-80 absolute inset-0"
          />

          <div className="flex flex-row pt-14 place-content-between">
            <h1 className="text-4xl">Jobs Posted</h1>

            <div className="relative inline-flex h-8 mt-3 overflow-hidden rounded-full p-[1px] focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50">
              <span className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#E2CBFF_0%,#393BB2_50%,#E2CBFF_100%)]" />
              <span className="inline-flex h-full w-full z-10 cursor-pointer items-center justify-center rounded-full bg-slate-950 px-3 py-1 text-lg font-medium text-white backdrop-blur-3xl">
                <Link href={`/dashboard/employer/postjob/${employer._id}`}>
                  Post new Job
                </Link>
              </span>
            </div>
          </div>

          <div className="mt-12 grid grid-cols-2 gap-8 md:grid-cols-2 lg:grid-cols-2 ">
            <DisplayJobCards employerId={employer._id} />
          </div>
        </div>
      </div>
    </>
  );
};

export default page;
