import React from "react";
import Image from "next/image";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { LogoutLink } from "@kinde-oss/kinde-auth-nextjs/components";

const EmployerAuthDetail = async () => {
  const { getUser } = getKindeServerSession();
  const user = await getUser();
  return (
    <div className="flex place-content-between pb-10 mt-4">
      <div className="flex flex-row gap-3 items-center">
        <Image
          src={user?.picture}
          alt="User profile picture"
          width={50}
          height={50}
          className="rounded-full"
        />
        <h1 className="font-extrabold text-white-200 text-lg">
          {user?.given_name} {user?.family_name}
        </h1>
      </div>
      <div className="font-extrabold z-10 text-white-200 text-lg mt-3">
        <LogoutLink postLogoutRedirectURL="/">Log out</LogoutLink>
      </div>
    </div>
  );
};

export default EmployerAuthDetail;
