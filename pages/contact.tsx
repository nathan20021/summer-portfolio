import React from "react";
import type { NextPage } from "next";
import ParticleBg from "../components/particleBg";

// import Image from "next/img"

const Contact: NextPage = () => {
  return (
    <div className="flex w-screen h-[80vh] justify-center items-center text-2xl z-50">
      <div>
        <ParticleBg />
      </div>
      <div className=" transition-colors px-20 py-10 bg-[#aaaaaa] hover:bg-[#ffffff] z-40">
        <h1 className="text-[#2d2d2d] font-bold z-50">Coming Soon 🚀</h1>
      </div>
    </div>
  );
};
export default Contact;
