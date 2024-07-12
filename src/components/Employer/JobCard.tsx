import React from "react";
import Link from "next/link";

const getIndustryImage = (industry) => {
  const images = {
    Advertising: "/job-card-pics/Advertising_Industry.svg",
    Aerospace: "/job-card-pics/Aerospace_Industry.svg",
    Agriculture: "/job-card-pics/Agriculture_Industry.svg",
    Automotive: "/job-card-pics/Automotive_Industry.svg",
    Banking: "/job-card-pics/Banking_Industry.svg",
    Biotechnology: "/job-card-pics/Biotechnology_Industry.svg",
    Construction: "/job-card-pics/Construction_Industry.svg",
    Defence: "/job-card-pics/Defence_Industry.svg",
    Education: "/job-card-pics/Education_Industry.svg",
    Entertainment: "/job-card-pics/Entertainment_Industry.svg",
    Fashion: "/job-card-pics/Fashion_Industry.svg",
    Financial: "/job-card-pics/Financial_Industry.svg",
    Gaming: "/job-card-pics/Gaming_Industry.svg",
    Healthcare: "/job-card-pics/Healthcare_Industry.svg",
    Info: "/job-card-pics/Info_Industry.svg",
    IT: "/job-card-pics/IT_Industry.svg",
    Telecommunication: "/job-card-pics/Telecommunication_Industry.svg",
    default: "/job-card-pics/default.svg",
  };

  return images[industry] || images["default"];
};

const JobCard = ({ title, text, industry, date, jobId }) => {
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
    <div className="rounded-lg shadow-2xl planet-background-1 cursor-pointer p-6 bg-gradient-to-r from-blue-950 to-indigo-900 flex z-10">
      <div className="flex-grow w-3/4">
        <h3 className="text-lg text-zinc-50 font-bold">{title}</h3>
        <p
          className="mt-2 text-sm text-gray-300 overflow-hidden text-ellipsis"
          style={{
            display: "-webkit-box",
            WebkitBoxOrient: "vertical",
            WebkitLineClamp: 5,
            lineHeight: "1.5em",
            maxHeight: "12em",
          }}
        >
          {text}
        </p>
        <p className="align-bottom mt-6">
          <span className=" text-gray-300">Posted on:</span>{" "}
          <span className=" text-gray-300">{date}</span>
        </p>
      </div>
      <div className="flex flex-col items-center justify-between mx-2 relative">
        <div className="w-full h-full rounded-md brightness-100 invert">
          <img
            src={getIndustryImage(industry)}
            alt={industry}
            className="w-32 h-32 object-cover rounded-md"
          />
        </div>
        <Link
          href={`/dashboard/employer/job-knowmore/${jobId}`}
          className="bg-white text-slate-950 p-2 rounded mt-4 hover:bg-yellow-400"
        >
          Know more
        </Link>
      </div>
    </div>
  );
};

export default JobCard;
