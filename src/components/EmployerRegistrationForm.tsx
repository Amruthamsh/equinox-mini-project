import React from "react";
import { redirect } from "next/navigation";
import {
  LogoutLink,
  getKindeServerSession,
} from "@kinde-oss/kinde-auth-nextjs/server";
import { dbConnect } from "@/lib/mongo";
import { Employer } from "@/models/employer-model";

const EmployerRegistrationForm = async () => {
  const { getUser, isAuthenticated } = getKindeServerSession();
  const isLoggedIn = await isAuthenticated();

  if (!isLoggedIn)
    redirect("/api/auth/login?post_login_redirect_url=/register/employer");
  const user = await getUser();

  async function handleSubmit(formData: FormData) {
    "use server";

    try {
      await dbConnect();

      const employer = await Employer.findOne({
        kindeAuthId: user?.id,
      });
      if (employer) {
        console.log("Employer already exists");
        return;
      }
      const body = {
        companyName: formData.get("companyName"),
        companyWebsite: formData.get("companyWebsite"),
        companySize: formData.get("companySize"),
        industry: formData.get("industry"),
        location: formData.get("location"),
        kindeAuthId: user?.id,
      };

      const newEmployer = new Employer(body);
      await newEmployer.save();
    } catch (error) {
      console.error("Error in creating employee", error);
    } finally {
      redirect("/dashboard/employer");
    }
  }

  return (
    <>
      <h1>Register for Equinox as an Employer</h1>
      <form action={handleSubmit}>
        <div>
          <label htmlFor="name">Company Name</label>
          <input type="name" name="companyName" id="companyName" />
        </div>
        <div>
          <label htmlFor="url">Company Website</label>
          <input type="url" name="companyWebsite" id="companyWebsite" />
        </div>
        <div>
          <label htmlFor="number">Company Size</label>
          <input type="number" name="companySize" id="companySize" />
        </div>
        <div>
          <label htmlFor="name">Industry</label>
          <input type="name" name="industry" id="industry" />
        </div>
        <div>
          <label htmlFor="name">Location</label>
          <input type="name" name="location" id="location" />
        </div>
        <button type="submit">Register</button>
      </form>
      <LogoutLink>Logout</LogoutLink>
    </>
  );
};

export default EmployerRegistrationForm;
