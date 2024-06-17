import LoginForm from "@/components/LoginForm";
import Link from "next/link";

export default function Page() {
  return (
    <main>
      <h1 className="text-lg">Login Page</h1>
      <LoginForm />
      <p>
        Don't have an account?
        <Link href="register/candidate">Find Jobs. </Link>
        <Link href="register/employer">Hire.</Link>
      </p>
    </main>
  );
}
