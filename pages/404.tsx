import React from "react";
import type { NextPage } from "next";
import ParticleBg from "../components/particleBg";

// import Image from "next/img"

const _404: NextPage = () => {
  return (
    <div className="flex justify-center items-center w-screen min-h-[80vh] z-50 pt-7">
      <div>
        <ParticleBg />
      </div>
      <div className="z-40 w-full h-full flex items-center justify-center">
        <div className=" transition-opacity px-20 py-10 bg-white/80 backdrop-blur-sm hover:bg-white/90 z-50">
          <h1 className="text-[#000000] font-bold z-50">
            😐 404 | Page Not Found 😐
          </h1>
        </div>
      </div>
    </div>
  );
};
export default _404;
