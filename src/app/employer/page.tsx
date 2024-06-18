import { LogoutLink } from "@kinde-oss/kinde-auth-nextjs";
import React from "react";

const page = () => {
  return (
    <>
      <div>employer page</div>
      <LogoutLink>Log Out</LogoutLink>
    </>
  );
};

export default page;
