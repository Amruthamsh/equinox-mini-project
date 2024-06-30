import React from "react";
import {
  getKindeServerSession,
  LogoutLink,
} from "@kinde-oss/kinde-auth-nextjs/server";
import { redirect } from "next/navigation";
import { createCandidateProfile } from "@/components/CandidateRegistration";

const getCandidateDetails = async (kindeId: String) => {
  try {
    const response = await fetch(
      `http://localhost:3000/api/candidate/${kindeId}`,
      {
        cache: "no-store",
      }
    );

    if (!response.ok) {
      throw new Error(`Failed to fetch candidate details: ${response.status}`);
    }

    const candidate = await response.json();

    console.log("Candidate details:", candidate);

    return candidate;
  } catch (error) {
    console.error("Error loading candidate details:", error);
    return null;
  }
};

const page = async () => {
  const { getUser, isAuthenticated } = getKindeServerSession();
  const isLoggedIn = await isAuthenticated();

  if (!isLoggedIn) redirect("/api/auth/login");
  const user = await getUser();

  const candidate =
    (await getCandidateDetails(user?.id!)) ||
    (await createCandidateProfile(user?.id!));

  return (
    <>
      <div>Candidate page</div>
      <div className="text-white">{user?.given_name}</div>
      <div></div>
      <LogoutLink>Log Out</LogoutLink>
    </>
  );
};

export default page;
