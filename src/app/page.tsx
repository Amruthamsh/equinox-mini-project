import LoginForm from "@/components/LoginForm";
import Link from "next/link";

export default function Home() {
  return (
    <main>
      <h1 className="text-lg">Login Page</h1>
      <LoginForm />
      <p>
        Don't have an account?
        <Link href="register">Register</Link>
      </p>
    </main>
  );
}
