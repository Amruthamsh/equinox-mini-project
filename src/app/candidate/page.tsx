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
      <h1>{session?.user?.name}</h1>
      <Image
        src={session?.user?.image!}
        alt={session?.user?.name!}
        width={72}
        height={72}
        className="rounded-full"
      />
      <Logout />
    </div>
  );
};

export default CandidateDashboard;
