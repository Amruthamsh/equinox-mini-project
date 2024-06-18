import React from "react";
import {
  getKindeServerSession,
  LogoutLink,
} from "@kinde-oss/kinde-auth-nextjs/server";
import Link from "next/link";
import { redirect } from "next/navigation";

const page = async () => {
  const { getUser, isAuthenticated, getOrganization } = getKindeServerSession();
  const isLoggedIn = await isAuthenticated();

  if (!isLoggedIn) redirect("/api/auth/login");
  const user = await getUser();
  const organization = await getOrganization();
  if (organization?.orgName !== "Candidates") redirect("/");

  return (
    <>
      <div>candidate page</div>
      <div className="text-white">{user?.given_name}</div>
      <LogoutLink>Log Out</LogoutLink>
    </>
  );
};

export default page;
