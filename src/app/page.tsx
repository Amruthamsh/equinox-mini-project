import About from "@/components/Home/About";
import Contact from "@/components/Home/Contact";
import Hero from "@/components/Home/Hero";
import Navbar from "@/components/Home/Navbar";

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
    </main>
  );
}
