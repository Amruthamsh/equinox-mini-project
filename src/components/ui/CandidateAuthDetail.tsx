import React from "react";
import {
  getKindeServerSession,
  LogoutLink,
} from "@kinde-oss/kinde-auth-nextjs/server";
import Image from "next/image";

const CandidateAuthDetail = async () => {
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  return (
    <div className="m-2 flex flex-col items-center gap-1">
      <Image
        src={user?.picture}
        alt="User profile picture"
        width={50}
        height={50}
        className="rounded-full"
      />
      <div className="text-white">Hi, {user?.given_name}</div>

      <div>
        <LogoutLink>Log Out</LogoutLink>
      </div>
    </div>
  );
};

export default CandidateAuthDetail;
