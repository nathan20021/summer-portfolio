import React, { useEffect, useState } from "react";
import type { NextPage } from "next";
// import ProjectCard from "../components/ProjectCard";
import Spline from "@splinetool/react-spline";
import NonSSRWrapper from "../components/no-ssr-wrapper";
import ImageGalary from "../components/ImageGalary";
import TechLink from "../components/TechLink";
import ReactTextTransition, { presets } from "react-text-transition";
import { GoArrowRight } from "react-icons/go";
import {
  SiReact,
  SiRedux,
  SiFlask,
  SiPostgresql,
  SiVercel,
} from "react-icons/si";
import { motion, AnimatePresence } from "framer-motion";

const lol = ["Full-stack Developer", "Cloud-Tech Enthusiast", "AWS Trainee"];

const Home: NextPage = () => {
  const [lolIndex, setIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 3000);
    const timer = setInterval(() => {
      setIndex((lolIndex) => lolIndex + 1);
    }, 3500);
    return () => {
      clearInterval(timer);
    };
  }, []);
  return (
    <main className="z-20 w-screen flex flex-col justify-start items-center">
      <AnimatePresence>
        {loading ? (
          <motion.div
            key="loading-screen"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { duration: 0.5 } }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="absolute h-screen w-screen bg-primary z-50 flex justify-center items-center top-0 left-0"
          >
            <div className="dots">
              <div></div>
              <div></div>
              <div></div>
            </div>
          </motion.div>
        ) : (
          void 0
        )}
      </AnimatePresence>

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
                    <div className="bg-gradient-radial from-[#8a8a8a] to-[#bcbcbc] w-60 h-60 rounded-full absolute top-[-1.7rem] left-[-1.2rem]"></div>
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
                    <motion.button
                      className="transition-all
                      bg-gradient-to-r to-[#5f2387] from-[#1669b2]
                      hover:to-[#7d2bb3] hover:from-[#1b78ca]
                      gap-1 flex items-center justify-center px-5 py-2 rounded-xl
                      shadow-md shadow-[#333333]  
                     "
                    >
                      <h1 className="font-[650] text-[#fcfcfc]">
                        Get in touch
                      </h1>
                      <GoArrowRight />
                    </motion.button>
                  </div>
                </div>
              </div>
            </div>
            <div className="w-[71%] h-full relative hover:cursor-grab">
              <Spline scene="https://prod.spline.design/RwmvyKIRcAII4-yT/scene.splinecode" />
            </div>
          </div>
          <div className="w-[15%]">
            <h1 className="text-3xl font-bold after:content-[''] after:block after:pt-2 after:border-b-[#3BB5DB] after:border-b-4">
              Projects
            </h1>
          </div>
        </section>
      </NonSSRWrapper>
      <section
        id="portfolio"
        className="z-20 flex flex-col items-center justify-start bg-primary h-screen w-screen"
      >
        <div className="w-[80%] h-full">
          <div className="relative h-1/2 w-full flex">
            <div className="h-full w-2/5 flex justify-center items-center">
              <div className=" bg-[#333333] px-6 py-7 rounded-l-xl">
                <div className="w-full h-full flex flex-col gap-6">
                  <div id="logo-header-container" className="flex h-20 gap-4">
                    <div className=" w-20 rounded-lg">
                      <img
                        className="rounded-lg"
                        src="/viz-logo-no-grad.png"
                        alt="Viz Logo"
                        draggable={false}
                      />
                    </div>
                    <div className="flex flex-col justify-center items-start">
                      <h1 className="text-xl font-bold">Viz</h1>
                      <h2 className="text-base text-[#ebebeb]">
                        Diagramming Made Easy
                      </h2>
                    </div>
                  </div>
                  <div className="flex flex-col gap-3 border-t-2 pt-4 border-[#7a7a7a]">
                    <p className="text-[#e4e4e4]">
                      A web-based editor to help backend engineers create, edit,
                      visualize and maitain their cloud infastructure diagrams.
                      | Beta 1.0
                    </p>
                    <div id="tech-link-container" className="w-full">
                      <TechLink
                        links={[
                          {
                            link: "https://reactjs.org/",
                            icon: <SiReact />,
                            name: "React",
                          },
                          {
                            link: "https://redux.js.org/",
                            icon: <SiRedux />,
                            name: "Redux",
                          },
                          {
                            link: "https://flask.palletsprojects.com/en/2.2.x/",
                            icon: <SiFlask />,
                            name: "Flask",
                          },
                          {
                            link: "https://www.postgresql.org/",
                            icon: <SiPostgresql />,
                            name: "PostgreSQL",
                          },
                          {
                            link: "https://vercel.com/",
                            icon: <SiVercel />,
                            name: "Vercel",
                          },
                        ]}
                      />
                    </div>
                  </div>
                  <div
                    id="button-container"
                    className="w-full flex justify-around"
                  >
                    <motion.a
                      whileHover={{ borderColor: "#01629a" }}
                      href="https://github.com/nathan20021/VIZ-PROD"
                      target="_blank"
                      rel="noreferrer"
                      className="w-28 py-2 rounded-xl text-base border-4 border-[#01529a] flex justify-center items-center"
                    >
                      Github
                    </motion.a>
                    <motion.a
                      whileHover={{ backgroundColor: "#01629a" }}
                      href="https://viz.nathanluong.me"
                      target="_blank"
                      rel="noreferrer"
                      className="bg-[#01529a] py-2 w-28 rounded-xl text-base flex justify-center items-center"
                    >
                      Live demo
                    </motion.a>
                  </div>
                </div>
              </div>
            </div>
            <div className="relative w-3/5">
              <ImageGalary
                images={[
                  "viz-screenshot.png",
                  "IOT-Solution-Diagram.jpeg",
                  "ML-in-Swimming.jpeg",
                ]}
              />
            </div>
          </div>
        </div>
        <div></div>
      </section>
    </main>
  );
};

export default Home;
