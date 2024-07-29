import React from "react";
import MagicButton from "../ui/MagicButton";
import { FaLocationArrow } from "react-icons/fa";
import { socialMedia } from "@/data";
import Image from "next/image";

const Contact = () => {
  return (
    <section id="contact">
      <footer className="w-full pt-32 pb-10 relative" id="contact">
        <div className="w-full absolute left-0 bottom-0 min-h-96">
          <img
            src="/footer-grid.svg"
            alt="grid"
            className="w-full h-full opacity-50 z-[1]"
          />
        </div>

        <div className="flex flex-col items-center relative">
          <h1 className="text-5xl">Contact us</h1>
          <p className="text-white-200 md:mt-5 w-3/4 my-5 text-center">
            At Equinox, we're revolutionizing job search with our advanced
            matching algorithm. Using AI and data-driven insights, we connect
            employers with top candidates efficiently. Whether you're a job
            seeker or an employer, our platform is here to help. For questions
            or assistance, contact us today and let us help you find the perfect
            match!
          </p>
          <a href="mailto:equinox@gmail.com">
            <MagicButton
              title="Lets get in touch"
              icon={<FaLocationArrow />}
              position="right"
            />
          </a>
        </div>

        <div className="flex items-center justify-center mt-10 gap-6 relative">
          {socialMedia.map((profile) => (
            <div
              key={profile.id}
              className="w-10 h-10 cursor-pointer flex justify-center items-center backdrop-filter backdrop-blur-lg saturate-180 bg-opacity-75 bg-black-200 rounded-lg border border-black-300"
            >
              <Image
                src={profile.img}
                alt={`${profile.id}`}
                width={20}
                height={20}
              />
            </div>
          ))}
        </div>
      </footer>
    </section>
  );
};

export default Contact;
