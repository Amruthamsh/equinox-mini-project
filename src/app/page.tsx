import About from "@/components/Home/About";
import Contact from "@/components/Home/Contact";
import Hero from "@/components/Home/Hero";
import Navbar from "@/components/Home/Navbar";
import Link from "next/link";

export default function Home() {
  return (
    <main
      className="relative bg-black-100 flex justify-center items-center flex-col overflow-hidden
      mx-auto sm:px-10 px-5"
    >
      <div className="max-w-7xl w-full">
        <Navbar />
        <Hero />
        <About />
        <Contact />
      </div>
      <div className="text-center text-xl p-2 pt-4 bg-black w-screen">
        Developed by{" "}
        <Link
          href="https://in.linkedin.com/in/amruthamsh-a-0573a822a"
          className="text-blue-400 hover:text-violet-500 underline underline-offset-2"
        >
          Amruthamsh
        </Link>{" "}
        and{" "}
        <Link
          href="https://in.linkedin.com/in/angelina-denny-1b4a36291"
          className="text-blue-400 hover:text-violet-500 underline underline-offset-2"
        >
          Angelina
        </Link>{" "}
      </div>
    </main>
  );
}
