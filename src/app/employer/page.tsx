import React from "react";
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
      <div>Employer page</div>
      <div className="text-white">{user?.given_name}</div>
      <div>{employer.companyName}</div>
      <LogoutLink>Log Out</LogoutLink>
    </>
  );
};

export default page;
