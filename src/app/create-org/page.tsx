"use client";

import { CreateOrgLink } from "@kinde-oss/kinde-auth-nextjs";
import React, { useState } from "react";

const Page = () => {
  const [companyDetails, setCompanyDetails] = useState({
    name: "",
    numberOfEmployees: "",
  });

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCompanyDetails({
      ...companyDetails,
      [event.target.name]: event.target.value,
    });
  };

  return (
    <div>
      <h1>Create an Organization and Start Hiring</h1>
      <form>
        <label htmlFor="name">Company Name</label>
        <input
          type="text"
          name="name"
          onChange={handleInputChange}
          value={companyDetails.name}
        />
      </form>
      <CreateOrgLink orgName={companyDetails.name}>Create org</CreateOrgLink>
    </div>
  );
};

export default Page;
