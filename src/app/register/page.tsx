import React from "react";
import Link from "next/link";
import RegistrationForm from "@/components/RegistrationForm";

const Register = () => {
  return (
    <>
      <RegistrationForm />
      <p>
        Already have an account?
        <Link href="/">Login</Link>
      </p>
    </>
  );
};

export default Register;
