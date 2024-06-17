import React from "react";
import Link from "next/link";
import CandidateRegistrationForm from "@/components/CandidateRegistrationForm";

const Register = () => {
  return (
    <>
      <CandidateRegistrationForm />
      <p>
        Already have an account?
        <Link href="/login">Login</Link>
      </p>
    </>
  );
};

export default Register;
