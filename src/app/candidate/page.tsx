import React from "react";
import {
  getKindeServerSession,
  LogoutLink,
} from "@kinde-oss/kinde-auth-nextjs/server";
import { redirect } from "next/navigation";

const page = async () => {
  const { getUser, isAuthenticated } = getKindeServerSession();
  const isLoggedIn = await isAuthenticated();

  if (!isLoggedIn) redirect("/api/auth/login");

  //check if user exists in database, else display a form to fill to register for first time users

  //check if user role from database is Candidate

  const user = await getUser();

  return (
    <>
      <div>candidate page</div>
      <div className="text-white">{user?.given_name}</div>
      <LogoutLink>Log Out</LogoutLink>
    </>
  );
};

export default page;
