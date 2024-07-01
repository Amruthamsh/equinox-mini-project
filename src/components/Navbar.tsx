import React from "react";
import Link from "next/link";
import HomePageSignIn from "./HomePageSignIn";

type Props = {};

const Navbar = ({}: Props) => {
  return (
    <nav className="sticky-navbar top-0 left-0">
      <div className="flex flex-row place-content-between my-4 z-10">
        <div className="max-w-[70vw] md:max-w-1xl lg:max-w-[40vw] justify-start flex gap-20 cursor-pointer ">
          <Link href={"#about"}>About us</Link>
          <Link href={"#contact"}>Contact us</Link>
        </div>
        <HomePageSignIn />
      </div>
    </nav>
  );
};

export default Navbar;
