import React from "react";
import { Spotlight } from "../ui/Spotlight";
import { SparklesCore } from "../ui/SparclesCore";
import { TextGenerateEffect } from "../ui/TextGenerateEffect";

const Hero = () => {
  return (
    <div className="pb-50 pt-20 relative">
      <div>
        <Spotlight
          className="-top-20 -left-10 md:left-56 md:-top-20 h-screen"
          fill="white"
        />
        <Spotlight
          className="top-20 left-full h-[80vh] w-[50vw]"
          fill="purple"
        />
        <Spotlight
          className="top-10 -right-20 h-[100vh] w-[50vw]"
          fill="blue"
        />
      </div>

      <div className="h-screen w-full dark:bg-black-100 bg-white dark:bg-grid-white/[0.03] bg-grid-black/[0.2] flex items-center justify-center absolute top-0 left-0 pointer-events-none">
        <div className="absolute inset-0 flex items-center justify-center dark:bg-black-100 bg-white [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]" />
      </div>

      <div className="flex justify-center relative my-20 z-10">
        <div className="max-w-[89vw] md:max-w-2xl lg:max-w-[60vw] flex flex-col items-center justify-center">
          <div className=" w-full flex flex-col items-center justify-center overflow-hidden rounded-md">
            <h1 className="uppercase tracking-widest font-semibold text-5xl text-center ml-1 text-blue-100 max-w-80">
              Equinox
            </h1>
            <TextGenerateEffect
              className="text-center text-[20px] md:text-5xl lg:text-6xl"
              words="Balancing Aspirations with Perfect Job Matches"
            />
            <div className="w-[40rem] h-40 relative">
              <div className="absolute inset-x-20 top-0 bg-gradient-to-r from-transparent via-indigo-500 to-transparent h-[2px] w-3/4 blur-md" />
              <div className="absolute inset-x-20 top-0 bg-gradient-to-r from-transparent via-indigo-500 to-transparent h-px w-3/4" />
              <div className="absolute inset-x-60 top-0 bg-gradient-to-r from-transparent via-sky-500 to-transparent h-[5px] w-1/4 blur-md" />
              <div className="absolute inset-x-60 top-0 bg-gradient-to-r from-transparent via-sky-500 to-transparent h-px w-1/4" />
              <SparklesCore
                background="transparent"
                minSize={0.4}
                maxSize={1}
                particleDensity={1200}
                className="w-full h-full"
                particleColor="#FFFFFF"
              />
              <div className="absolute inset-0 w-full h-full dark:bg-black-100 [mask-image:radial-gradient(350px_200px_at_top,transparent_40%,white)]"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
