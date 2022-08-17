import React, { useEffect, useState } from "react";
import type { NextPage } from "next";
import ProjectCard from "../components/ProjectCard";
import Spline from "@splinetool/react-spline";
import NonSSRWrapper from "../components/no-ssr-wrapper";
import ReactTextTransition, { presets } from "react-text-transition";

const lol = [
  "Backend Developer",
  "Cloud-Tech Enthusiast",
  "Engineering III Student",
];

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
                <div className="bg-gradient-to-r from-[#0078DF] to-[#246BAA] text-2xl w-max rounded-2xl">
                  <p className="py-2 px-5 font-bold">Welcome , I&rsquo;m</p>
                </div>
                <div className="flex justify-center items-center relative w-full">
                  <div className="relative border-[#526fa9] border-[0.7rem] h-56 w-56">
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
        className="z-20 flex flex-col items-center justify-center my-20 bg-white"
      >
        <h1 className="text-4xl font-bold after:content-[''] after:block after:pt-2 after:border-b-[#3BB5DB] after:border-b-4">
          Portfolio
        </h1>
        <div
          id="project-box-container"
          className={`w-[80%] z-20 flex justify-center flex-wrap gap-[10%]`}
        >
          <ProjectCard
            imagePath="rocketry.png"
            title="McMaster Rocketry"
            des="A web application which members from the Rocketry Club can manage and visualize their avionic data in a MySQL database."
            hasDemo={true}
            isPrivate={true}
            GhLink="#"
            demoLink="https://macrocketry.ca/"
            style={{ backgroundColor: "#A61C2D" }}
          />
          <ProjectCard
            imagePath="chess.png"
            title="Online Chess"
            des="A chess.com clone where players can play real-time chess. Created with ReactJS, Flask, nextJS, TailwindCSS, and SocketIO"
            hasDemo={true}
            isPrivate={false}
            GhLink="https://github.com/nathan20021/chess.com-clone"
            demoLink="https://www.youtube.com/watch?v=u94ONgnwnus"
            style={{ backgroundColor: "#118748" }}
          />
          <ProjectCard
            imagePath="live.png"
            title="Live Telemetry"
            des="A real-time data visualizer works over LORA. Processing, Graphing, and Analyzing avionic telemetry on ground."
            hasDemo={true}
            isPrivate={true}
            GhLink="#"
            demoLink="https://www.linkedin.com/feed/update/urn:li:activity:6904194822161461248/"
            style={{ backgroundColor: "#0C3B5B" }}
          />
          <ProjectCard
            imagePath="cube.png"
            title="L.E.D Cube"
            des="A programable 3x3x3 Led Cube which has multiple pre-set lighting configurations. You can also play 3d snake on this low resolution display!"
            hasDemo={false}
            isPrivate={false}
            GhLink="https://github.com/nathan20021/Complete-LED-Cube-project"
            demoLink="#"
            style={{ backgroundColor: "#12728B" }}
          />
          <ProjectCard
            imagePath="A_star.png"
            title="A* Visualization"
            des="Visualize the famous A* path finding algorithm with an interactive UI. Written in Java Processing"
            hasDemo={true}
            isPrivate={false}
            GhLink="https://github.com/nathan20021/A_star_visualization"
            demoLink="https://youtu.be/82DPwMUWq1Q"
            style={{ backgroundColor: "#9E6A31" }}
          />
          <ProjectCard
            imagePath="Computer.png"
            title="Personal Blog"
            des="A tech repository aiming to share my personal industry experience/ knowledge via technical blogs. Created with ReactJs and nextJS"
            hasDemo={false}
            isPrivate={false}
            GhLink="https://github.com/nathan20021/summer-portfolio"
            demoLink="#"
            style={{ backgroundColor: "#6951BB" }}
          />
        </div>
      </section>
    </main>
  );
};

export default Home;
