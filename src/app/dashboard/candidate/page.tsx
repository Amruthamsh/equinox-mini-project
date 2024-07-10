import React from "react";
import {
  getKindeServerSession,
  LogoutLink,
} from "@kinde-oss/kinde-auth-nextjs/server";
import { redirect } from "next/navigation";
import { dbConnect } from "@/lib/mongo";
import { Candidate } from "@/models/candidate-model";
import User from "@/models/user-model";

/*
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
*/

const getCandidateDetails = async (kindeId: String) => {
  try {
    await dbConnect();
    const user = await User.findOne({ kindeAuthId: kindeId });
    if (!user) {
      return null;
    }
    const candidate = await Candidate.findById(user.candidateId);
    if (!candidate) {
      return null;
    }

    console.log("Candidate details:", candidate);

    return candidate;
  } catch (error) {
    console.error("Error loading candidate details:", error);
    return null;
  }
};

const page = async () => {
  const { getUser } = getKindeServerSession();

  const user = await getUser();

  const createCandidateProfile = async () => {
    await dbConnect();
    //check if the user doesn't already have an entry in User Table
    const existingUser = await User.findOne({
      kindeAuthId: user?.id!,
    });
    if (existingUser || !user?.id) {
      redirect("/");
    }

    //Create Candidate
    const candidateBody = {
      name: user?.given_name,
      email: user?.email,
      picture: user?.picture,
    };
    const newCandidate = new Candidate(candidateBody);
    await newCandidate.save();

    //Create User
    console.log("creating User");
    const userBody = {
      role: "candidate",
      kindeAuthId: user?.id!,
      candidateId: newCandidate._id,
    };
    const newUser = new User(userBody);
    await newUser.save();

    return newCandidate;
  };

  const candidate =
    (await getCandidateDetails(user?.id!)) || (await createCandidateProfile());

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
