import React, { useEffect, useState } from "react";
import type { NextPage } from "next";
// import ProjectCard from "../components/ProjectCard";
import Spline from "@splinetool/react-spline";
import NonSSRWrapper from "../components/no-ssr-wrapper";
import ReactTextTransition, { presets } from "react-text-transition";
import { BsBoxArrowUpRight } from "react-icons/bs";

const lol = ["Full-stack Developer", "Cloud-Tech Enthusiast", "AWS Trainee"];

const Home: NextPage = () => {
  const [lolIndex, setIndex] = useState(0);
  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((lolIndex) => lolIndex + 1);
    }, 3500);
    return () => {
      clearInterval(timer);
    };
  }, []);
  return (
    <main className="z-20 flex flex-col justify-start items-center">
      <NonSSRWrapper>
        <section className="w-full h-screen flex flex-col justify-start items-center ">
          <div className="container h-[90%] w-[95%] flex">
            <div className="w-[29%] h-full flex flex-col justify-start pt-16 items-start">
              <div className="flex flex-col gap-6">
                <div className="bg-[#01529a] text-base w-max rounded-2xl">
                  <p className="py-1 px-4 font-bold">Welcome , I&rsquo;m</p>
                </div>
                <div className="flex justify-center items-center relative w-full">
                  <div className="relative border-[#526fa9] border-[0.7rem] h-56 w-56 shadow-lg shadow-[#333333]">
                    <div className="absolute h-56 w-56 border-[#526fa9] border-b-[0.7rem] top-[-0.7rem] left-[-0.7rem] z-20"></div>
                    <div className="bg-[#bcbcbc] w-60 h-60 rounded-[1000px] absolute top-[-1.7rem] left-[-1.2rem]"></div>
                    <div id="Image Container" className="absolute">
                      <img
                        className="object-cover"
                        src="avatar.png"
                        alt="Nathan's avatar"
                      />
                    </div>
                  </div>
                </div>
                <div>
                  <div>
                    <h1 className=" bg-clip-text text-transparent text-[3.1rem] font-bold bg-gradient-to-r from-[#09C6F9] to-[#5472FB] py-2 ">
                      Nathan Luong
                    </h1>
                  </div>
                  <ReactTextTransition springConfig={presets.gentle} inline>
                    <h1 className="text-3xl">{lol[lolIndex % lol.length]}</h1>
                  </ReactTextTransition>
                  <div className="flex items-center justify-center text-xl mt-12 w-auto">
                    <button className="bg-gradient-to-r to-[#5f2387] from-[#1669b2] gap-3 flex items-center px-5 py-2 rounded-md">
                      <h1 className="font-[650]">Get in touch</h1>
                      <BsBoxArrowUpRight />
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div className="w-[71%] h-full relative hover:cursor-grab">
              <Spline scene="https://prod.spline.design/RwmvyKIRcAII4-yT/scene.splinecode" />
            </div>
          </div>
        </section>
      </NonSSRWrapper>
      <section
        id="portfolio"
        className="z-20 flex flex-col items-center justify-center my-20 bg-primary"
      >
        <h1 className="text-4xl font-bold after:content-[''] after:block after:pt-2 after:border-b-[#3BB5DB] after:border-b-4">
          Portfolio
        </h1>
        <div>
          
        </div>
      </section>
    </main>
  );
};

export default Home;
