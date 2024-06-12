"use client";

import SocialLogin from "./SocialLogin";

import { doCredentialLogin } from "@/app/actions";

import { useRouter } from "next/navigation";

import { useState } from "react";

const LoginForm = () => {
  const [error, setError] = useState("");
  const router = useRouter();

  async function handleFormSubmit(event: any) {
    event.preventDefault();

    try {
      const formData = new FormData(event.currentTarget);
      const response = await doCredentialLogin(formData);
      if (!!response.error) {
        setError(response.error.message);
      } else {
        router.push("/candidate");
      }
    } catch (e) {
      console.error(e);
      setError("Check your credentials");
    }
  }

  return (
    <>
      <div className="text-xl text-red-500">{error}</div>
      <form onSubmit={handleFormSubmit}>
        <div>
          <label htmlFor="email">Email Address</label>
          <input type="email" name="email" id="email" />
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input type="password" name="password" id="password" />
        </div>
        <button type="submit">Credential Login</button>
      </form>
      <SocialLogin />
    </>
  );
};

export default LoginForm;
