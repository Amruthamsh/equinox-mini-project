import React from "react";
import Link from 'next/link'

import {
  getKindeServerSession,
  LogoutLink,
} from "@kinde-oss/kinde-auth-nextjs/server";
import { redirect } from "next/navigation";

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
const page = async () => {
  const { getUser, isAuthenticated } = getKindeServerSession();
  const isLoggedIn = await isAuthenticated();

  if (!isLoggedIn) redirect("/api/auth/login");
  const user = await getUser();

  const employer = await getEmployerDetails(user?.id!);

  if (!employer) redirect("/register/employer");

  return (
    <>
     <div className="flex justify-between items-center pl-8 pb-32 pr-8 pt-3">
       <h3 className="font-medium text-lg">Employer Dashboard</h3>
       <Link href="/dashboard/employer/postjob">
         <button className="relative inline-flex h-8 overflow-hidden rounded-full p-[1px] focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50">
           <span className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#E2CBFF_0%,#393BB2_50%,#E2CBFF_100%)]" />
           <span className="inline-flex h-full w-full cursor-pointer items-center justify-center rounded-full bg-slate-950 px-3 py-1 text-sm font-medium text-white backdrop-blur-3xl">
           Post new Job
           </span>
         </button>
        </Link>
     </div>

      <h1 className="text-3xl text-center pb-5">Jobs Posted</h1>
      <div className="grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-2 gap-8 pl-5 pr-5 h-fit pb-10 absolute">

        <div className="grid2-item bg-indigo-950 rounded-xl p-5 flex flex-col justify-between">
          <div>
           <h1 className="text-center pb-2">Software Engineer</h1>
           <p>We are looking for a talented Software Engineer to join our development team. The ideal candidate will have experience in designing, developing, and implementing software solutions. Responsibilities include writing clean and efficient code, debugging programs, and collaborating with other developers to create high-quality products.</p>
          </div>
          <div className="flex justify-end mt-auto">
          <Link href="/dashboard/employer/jobdetails/1">
            <div className="bg-white text-slate-950 p-2 rounded">Know more</div>
          </Link>
          </div>
        </div>

        <div className="grid2-item bg-rose-800 rounded-xl p-5 flex flex-col justify-between">
         <div>
           <h1 className="text-center pb-2">Marketing Manager</h1>
           <p>We are seeking an experienced Marketing Manager to develop and implement marketing strategies that will drive growth and brand awareness. The ideal candidate will have a proven track record in marketing, excellent leadership skills, and the ability to work in a fast-paced environment.</p>
         </div>
         <div className="flex justify-end mt-auto">
           <Link href="/dashboard/employer/jobdetails/2">
             <div className="bg-white text-slate-950 p-2 rounded">Know more</div>
           </Link>
         </div>
        </div>
        
        <div className="grid2-item bg-rose-800 rounded-xl p-5 flex flex-col justify-between">
         <div>
           <h1 className="text-center pb-2">Project Manager</h1>
           <p>We are looking for a highly organized and motivated Project Manager to lead and manage projects from inception to completion. The ideal candidate will be responsible for planning, executing, and overseeing projects to ensure they are completed on time and within budget.</p>
         </div>
         <div className="flex justify-end mt-auto">
          <Link href="/dashboard/employer/jobdetails/3">
            <div className="bg-white text-slate-950 p-2 rounded">Know more</div>
          </Link>
         </div>
        </div>
        
        <div className="grid2-item bg-indigo-950 rounded-xl p-5 flex flex-col justify-between">
         <div>
           <h1 className="text-center pb-2">Human Resources Specialist</h1>
           <p>We are looking for a dedicated Human Resources Specialist to join our HR team. The ideal candidate will handle recruitment, employee relations, performance management, and compliance with labor laws and regulations.</p>
         </div>
         <div className="flex justify-end mt-auto">
          <Link href="/dashboard/employer/jobdetails/4">
            <div className="bg-white text-slate-950 p-2 rounded">Know more</div>
          </Link>
         </div>
        </div>

      </div>

    </>
  );
};

export default page;
