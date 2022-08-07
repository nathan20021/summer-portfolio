import React from "react";
import type { NextPage } from "next";
import ParticleBg from "../components/particleBg";

// import Image from "next/img"

const _404: NextPage = () => {
  return (
    <div className="flex w-screen h-[80vh] justify-center items-center text-2xl z-50">
      <ParticleBg />
      <div className=" transition-opacity px-20 py-10 bg-white/70 hover:bg-white/80 z-50">
        <h1 className="text-black font-bold z-50">
          🗿 Error 404 | Page Not Found 🗿
        </h1>
      </div>
    </div>
  );
};
export default _404;
