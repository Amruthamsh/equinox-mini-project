import React from "react";
import { redirect } from "next/navigation";
import {
  LogoutLink,
  getKindeServerSession,
} from "@kinde-oss/kinde-auth-nextjs/server";
import { dbConnect } from "@/lib/mongo";
import { Employer } from "@/models/employer-model";
import User from "@/models/user-model";

const EmployerRegistrationForm = async () => {
  const { getUser } = getKindeServerSession();

  const user = await getUser();

  if (!user) {
    redirect("/");
  }

  async function handleSubmit(formData: FormData) {
    "use server";

    try {
      await dbConnect();

      //Create Employer
      const body = {
        name: user.given_name,
        email: user.email,
        picture: user.picture,
        companyName: formData.get("companyName"),
        companyWebsite: formData.get("companyWebsite"),
        companySize: formData.get("companySize"),
        industry: formData.get("industry"),
        location: formData.get("location"),
      };

      const newEmployer = new Employer(body);
      await newEmployer.save();

      //Create User
      const userBody = {
        role: "employer",
        kindeAuthId: user?.id!,
        employerId: newEmployer._id,
      };
      const newUser = new User(userBody);
      await newUser.save();
    } catch (error) {
      console.error("Error in creating employee", error);
    }

    redirect("/dashboard/employer");
  }

  return (
    <div className="mx-auto max-w-2xl px-4 my-10">
      <h1 className="text-center text-2xl">
        Register for Equinox as an Employer
      </h1>
      <form action={handleSubmit}>
        <div className="w-full flex flex-col my-4">
          <label htmlFor="name">Company Name</label>
          <input
            type="name"
            name="companyName"
            id="companyName"
            required={true}
            className="bg-white text-black-100 rounded-md p-2"
          />
        </div>
        <div className="w-full flex flex-col my-4">
          <label htmlFor="url">Company Website</label>
          <input
            type="url"
            name="companyWebsite"
            id="companyWebsite"
            required={true}
            className="bg-white text-black-100 rounded-md p-2"
          />
        </div>
        <div className="w-full flex flex-col my-4">
          <label htmlFor="number">Company Size</label>
          <input
            type="number"
            name="companySize"
            id="companySize"
            required={true}
            className="bg-white text-black-100 rounded-md p-2"
          />
        </div>
        <div className="w-full flex flex-col my-4">
          <label htmlFor="name">Industry</label>
          <input
            type="name"
            name="industry"
            id="industry"
            required={true}
            className="bg-white text-black-100 rounded-md p-2"
          />
        </div>
        <div className="w-full flex flex-col my-4">
          <label htmlFor="name">Location</label>
          <input
            type="name"
            name="location"
            id="location"
            required={true}
            className="bg-white text-black-100 rounded-md p-2"
          />
        </div>
        <div className="flex place-content-center gap-5">
          <LogoutLink className="px-4 py-2 w-32 justify-end rounded-md bg-slate-800 text-white text-center font-medium hover:bg-slate-600">
            Cancel
          </LogoutLink>
          <button
            type="submit"
            className="px-4 py-2 w-32 justify-start rounded-md bg-indigo-800 text-white font-medium hover:bg-pink-600"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default EmployerRegistrationForm;
