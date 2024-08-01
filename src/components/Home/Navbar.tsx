import React from "react";
import Link from "next/link";
import HomePageSignIn from "./HomePageSignIn";

type Props = {};

const Navbar = ({}: Props) => {
  return (
    <nav className="sticky-navbar top-0">
      <div className="flex flex-row place-content-between z-10">
        <div className="justify-start w-1/2 flex gap-4 lg:gap-10 my-4">
          <Link href={"#about"} className="hover:underline underline-offset-2 ">
            About us
          </Link>
          <Link
            href={"#contact"}
            className="hover:underline underline-offset-2 "
          >
            Contact us
          </Link>
        </div>
        <div className="w-1/2">
          <div className="flex flex-row gap-1 justify-end align-middle">
            <HomePageSignIn />
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
