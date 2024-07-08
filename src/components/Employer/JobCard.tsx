import React from "react";
import Link from "next/link";

const JobCard = ({ title, text, img, jobId }) => {
  const handleMouseMove = (event) => {
    const planetBackground = event.currentTarget;
    const { left, top, width, height } =
      planetBackground.getBoundingClientRect();
    const { clientX, clientY } = event;

    const mouseX = (clientX - left) / width;
    const mouseY = (clientY - top) / height;

    const backgroundPosX = mouseX * 50;
    const backgroundPosY = mouseY * 50;

    planetBackground.style.backgroundPosition = `${backgroundPosX}% ${backgroundPosY}%`;
  };
  return (
    <div className="rounded-lg shadow-2xl planet-background-1 cursor-pointer p-6 bg-gradient-to-r from-blue-950 to-indigo-900 flex z-10 ">
      <div className="flex items-center justify-center w-auto h-8 bg-indigo-800 rounded-md">
        <img src={img} alt="" className="w-[100%] brightness-0 invert" />
      </div>
      <div className="ml-4 flex relative flex-col gap-2 flex-grow h-auto">
        <h3 className="text-lg  text-zinc-50 font-bold">{title}</h3>
        <p className="mt-2 text-sm text-gray-300 ">{text}</p>
        <div className="pt-10 ">
          <Link
            href={`/dashboard/employer/job-knowmore/${jobId}`}
            className="bg-white text-slate-950 p-2 rounded absolute right-0 bottom-0 hover:bg-yellow-400"
          >
            Know more
          </Link>
        </div>
      </div>
    </div>
  );
};

export default JobCard;
