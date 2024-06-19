"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import clsx from "clsx";
import { FaFontAwesome, FaHome, FaLaptop } from "react-icons/fa";
import { IoDocument, IoSchool } from "react-icons/io5";
import { IconBase } from "react-icons";

const links = [
  { name: "Home", href: "/dashboard/candidate", icon: <FaHome size={24} /> },
  {
    name: "Basic Details",
    href: "/dashboard/candidate/basic-details",
    icon: <IoSchool size={24} />,
  },
  {
    name: "Resume",
    href: "/dashboard/candidate/resume",
    icon: <IoDocument size={24} />,
  },
  {
    name: "Jobs",
    href: "/dashboard/candidate/job-suggestions",
    icon: <FaLaptop size={24} />,
  },
];

export default function SideNav() {
  const pathname = usePathname();

  return (
    <>
      {links.map((link) => {
        const LinkIcon = link.icon;
        return (
          <Link
            key={link.name}
            href={link.href}
            className={clsx(
              "flex m-2 h-[56px] grow items-center justify-center gap-2 rounded-md p-3 text-sm font-medium hover:bg-white hover:text-pink-700 md:flex-none md:justify-start md:p-2 md:px-3",
              {
                "text-pink-700 bg-white": pathname === link.href,
                "bg-slate-700": pathname !== link.href,
              }
            )}
          >
            {LinkIcon}
            <p className="hidden md:block">{link.name}</p>
          </Link>
        );
      })}
    </>
  );
}
