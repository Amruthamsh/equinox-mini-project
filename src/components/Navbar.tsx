import React from "react";
import Link from "next/link";

import {
  RegisterLink,
  LoginLink,
} from "@kinde-oss/kinde-auth-nextjs/components";

const Navbar = () => {
  return (
    <div className="flex flex-row place-content-between gap-x-96 my-2 z-10">
      <div className="max-w-[70vw] md:max-w-1xl lg:max-w-[40vw] justify-start flex gap-20 cursor-pointer ">
        <div>About us</div>
        <div>Contact us</div>
      </div>
      <div className="max-w-[65vw] md:max-w-1xl lg:max-w-[40vw] flex justify-end gap-20 cursor-pointer pl-24">
        <button className="relative inline-flex h-8 overflow-hidden rounded-full p-[1px] focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50">
          <span className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#E2CBFF_0%,#393BB2_50%,#E2CBFF_100%)]" />
          <span className="inline-flex h-full w-full cursor-pointer items-center justify-center rounded-full bg-slate-950 px-3 py-1 text-sm font-medium text-white backdrop-blur-3xl">
          <LoginLink postLoginRedirectURL="/dashboard/candidate">
          Candidate Sign in
          </LoginLink>
          </span>
        </button>
        <button className="relative inline-flex h-8 overflow-hidden rounded-full p-[1px] focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50">
          <span className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#E2CBFF_0%,#393BB2_50%,#E2CBFF_100%)]" />
          <span className="inline-flex h-full w-full cursor-pointer items-center justify-center rounded-full bg-slate-950 px-3 py-1 text-sm font-medium text-white backdrop-blur-3xl">
          <LoginLink postLoginRedirectURL="/dashboard/employer">
          Employer Sign in
          </LoginLink>
          </span>
        </button>
      </div>
    </div>
  );
};

export default Navbar;
