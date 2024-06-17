import React from "react";
import Link from "next/link";
import EmployerRegistrationForm from "@/components/EmployerRegistrationForm";

const Register = () => {
  return (
    <>
      <EmployerRegistrationForm />
      <p>
        Already have an account?
        <Link href="/login">Login</Link>
      </p>
    </>
  );
};

export default Register;
