import React from "react";
import Link from "next/link";

import { LoginLink, LogoutLink } from "@kinde-oss/kinde-auth-nextjs/components";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { dbConnect } from "@/lib/mongo";
import User from "@/models/user-model";

const HomePageSignIn = async () => {
  const { isAuthenticated, getUser } = getKindeServerSession();
  const isLoggedIn = await isAuthenticated();

  if (isLoggedIn) {
    const user = await getUser();

    let dashboard_string = "candidate";

    try {
      await dbConnect();

      const user_db = await User.findOne({
        kindeAuthId: user?.id,
      });

      if (user_db.role == "candidate") dashboard_string = "candidate";
      else dashboard_string = "employer";
    } catch (error) {
      console.log(error);
    }

    return (
      <div className="max-w-[65vw] md:max-w-1xl lg:max-w-[40vw] flex justify-end gap-20 cursor-pointer">
        <div className="relative inline-flex h-8 overflow-hidden rounded-full p-[1px] focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50">
          <span className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(at_50%_50%,#E2CBFF_0%,#393BB2_50%,#E2CBFF_100%)]" />
          <span className="inline-flex z-10 h-full w-full cursor-pointer items-center justify-center rounded-full bg-slate-950 px-3 py-1 text-sm font-medium text-white backdrop-blur-3xl">
            <Link href={`/dashboard/${dashboard_string}`}>Dashboard</Link>
          </span>
        </div>
        <LogoutLink postLogoutRedirectURL="/">Log out</LogoutLink>
      </div>
    );
  }
  return (
    <div className="max-w-[65vw] md:max-w-1xl lg:max-w-[40vw] flex justify-end gap-20 cursor-pointer">
      <div className="relative inline-flex h-8 overflow-hidden rounded-full p-[1px] focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50">
        <span className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(at_50%_50%,#E2CBFF_0%,#393BB2_50%,#E2CBFF_100%)]" />
        <span className="inline-flex z-10 h-full w-full cursor-pointer items-center justify-center rounded-full bg-slate-950 px-3 py-1 text-sm font-medium text-white backdrop-blur-3xl">
          <LoginLink postLoginRedirectURL="/dashboard/candidate">
            Candidate Sign in
          </LoginLink>
        </span>
      </div>
      <div className="relative inline-flex h-8 overflow-hidden rounded-full p-[1px] focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50">
        <span className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(at_50%_50%,#E2CBFF_0%,#393BB2_50%,#E2CBFF_100%)]" />
        <span className="inline-flex z-10 h-full w-full cursor-pointer items-center justify-center rounded-full bg-slate-950 px-3 py-1 text-sm font-medium text-white backdrop-blur-3xl">
          <LoginLink postLoginRedirectURL="/dashboard/employer">
            Employer Sign in
          </LoginLink>
        </span>
      </div>
    </div>
  );
};

export default HomePageSignIn;
