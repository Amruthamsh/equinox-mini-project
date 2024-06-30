import React from "react";
import Link from "next/link";

import {
  getKindeServerSession,
  LogoutLink,
} from "@kinde-oss/kinde-auth-nextjs/server";
import { redirect } from "next/navigation";
import Image from "next/image";
import JobCard from "./components1/JobCard";

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
const page = async ({jobs}) => {
  const { getUser } = getKindeServerSession();

  const user = await getUser();

  const employer = await getEmployerDetails(user?.id!);

  if (!employer) redirect("/register/employer");

  return (
    <>
      <section className="bg-gradient-to-r from-black-100 to-slate-950 pb-[300px] py-2 h-full">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 z-10">
          <div className="flex place-content-between pb-10">
          <img 
          src="/grid.svg" 
          alt="grid"
          className='w-screen h-96 opacity-80 absolute inset-0'
           />
            <h1 className="font-extrabold text-white-100 text-lg">Employer Dashboard</h1>
            <Link href="/dashboard/employer/postjob">
            <button className="relative inline-flex h-8 overflow-hidden rounded-full p-[1px] focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50">
            <span className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#E2CBFF_0%,#393BB2_50%,#E2CBFF_100%)]" />
            <span className="inline-flex h-full w-full z-10 cursor-pointer items-center justify-center rounded-full bg-slate-950 px-3 py-1 text-sm font-medium text-white backdrop-blur-3xl">
              Post new Job
            </span>
           </button>
           </Link>
          </div>
           
          <h1 className="pt-20 text-4xl">Jobs Posted</h1>
          <div className="mt-12 grid grid-cols-2 gap-8 md:grid-cols-2 lg:grid-cols-2 ">
            <JobCard 
            title="Software Engineering"
            text="We are looking for a talented Software Engineer to join our development team. The ideal candidate will have experience in designing, developing, and implementing software solutions.Responsibilities include writing clean and efficient code, debugging programs, and collaborating with other developers to create high-quality products."
            img="/exp2.svg"/>

            <JobCard 
            title="Marketing Manager"
            text="We are seeking an experienced Marketing Manager to develop and implement marketing strategies that will drive growth and brand awareness. The ideal candidate will have a proven track record in marketing, excellent leadership skills, and the ability to work in a fast-paced environment."
            img="/exp2.svg"/>

            <JobCard 
            title="Project Manager"
            text="We are looking for a highly organized and motivated Project Manager to lead and manage projects from inception to completion.The ideal candidate will be responsible for planning, executing,and overseeing projects to ensure they are completed on time and within budget."
            img="/exp2.svg"/>

            <JobCard 
            title="Human Resources Specialist"
            text="We are looking for a dedicated Human Resources Specialist to join our HR team. The ideal candidate will handle recruitment, employee relations, performance management, and compliance with labor laws and regulations."
            img="/exp2.svg"/>
          </div>
        </div>
      </section>

   
    </>
  );
};

export default page;
