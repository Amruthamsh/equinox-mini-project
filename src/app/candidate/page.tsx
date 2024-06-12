import React from "react";
import { auth } from "@/auth";
import { redirect } from "next/navigation";
import Image from "next/image";
import Logout from "@/components/Logout";

const CandidateDashboard = async () => {
  const session = await auth();

  if (!session?.user) redirect("/");
  return (
    <div>
      {session?.user?.image && session?.user?.name ? (
        <>
          <h1>Hello {session?.user?.name}!</h1>
          <Image
            src={session?.user?.image!}
            alt={session?.user?.name!}
            width={72}
            height={72}
            className="rounded-full"
          />
        </>
      ) : (
        <h1>Welcome, {session?.user?.email}</h1>
      )}

      <Logout />
    </div>
  );
};

export default CandidateDashboard;
