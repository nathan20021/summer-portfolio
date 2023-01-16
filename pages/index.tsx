import React, { useEffect, useState, useRef } from "react";
import type { NextPage } from "next";
import ParticleBg from "../components/particleBg";
import ProjectCard from "../components/ProjectCard";
import {
  SiReact,
  SiRedux,
  SiFlask,
  SiPostgresql,
  SiNextdotjs,
  SiGraphql,
  SiFirebase,
} from "react-icons/si";
import { BsThreeDots } from "react-icons/bs";
import Spline from "@splinetool/react-spline";
import NonSSRWrapper from "../components/no-ssr-wrapper";
import ReactTextTransition, { presets } from "react-text-transition";
import { GoArrowRight } from "react-icons/go";
import ProjectShowcase from "../components/ProjectShowcase";

import { motion, AnimatePresence } from "framer-motion";

const lol = ["Full-stack Developer", "Cloud-Tech Enthusiast", "AWS Trainee"];

const Home: NextPage = () => {
  const splineContainer = useRef<HTMLDivElement>(null!);
  const splineMinimumWidth = 1053;
  const [lolIndex, setIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
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
            className="absolute h-screen w-screen bg-primary z-50 flex justify-center items-center top-0 left-0 "
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
        <section className="w-full h-max lg:h-screen flex flex-col justify-center items-center z-40 bg-primary ">
          <div className="min-h-max h-[90%] w-[95%] flex flex-col items-center lg:item-start lg:flex-row max-w-[1400px] gap-6 lg:gap-0">
            <div className="w-full lg:w-[30%] h-full flex flex-col justify-start mt-10 lg:mt-16 items-start">
              <div className="w-full h-full flex justify-center">
                <div className="w-[91%] lg:w-full h-full flex flex-col sm:flex-row lg:flex-col gap-2 lg:gap-6">
                  <div className="inline-block sm:hidden lg:inline-block ">
                    <div
                      className="bg-[#01529a] text-base w-max rounded-2xl"
                      id="welcome-im-box"
                    >
                      <p className="py-1 px-4 font-bold">
                        👋 Welcome , I&rsquo;m
                      </p>
                    </div>
                  </div>
                  <div
                    id="image-thingy"
                    className="flex justify-center items-center relative lg:w-full "
                  >
                    <div className="scale-[0.8] lg:scale-100 relative border-[#526fa9] border-[0.7rem] h-56 w-56 shadow-lg shadow-[#333333]">
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
                  <div
                    id="name-text-button-container"
                    className="grow lg:grow-0"
                  >
                    <div className="hidden sm:inline-block lg:hidden">
                      <div
                        id="welcome-im-box"
                        className="text-base w-max rounded-xl"
                      >
                        <p className="font-bold">👋 Welcome , I&rsquo;m</p>
                      </div>
                    </div>
                    <div id="name-container">
                      <h1
                        className="bg-clip-text text-transparent text-[2.3rem] lg:text-[2.5rem] 
                                xl:text-[2.6rem] font-bold bg-gradient-to-r from-[#09C6F9] 
                                to-[#5472FB] lg:py-2 "
                      >
                        Nathan Luong
                      </h1>
                    </div>
                    <ReactTextTransition springConfig={presets.gentle} inline>
                      <h1 className="text-xl lg:text-2xl">
                        {lol[lolIndex % lol.length]}
                      </h1>
                    </ReactTextTransition>
                    <div
                      id="call-to-action-button"
                      className="flex items-center justify-start lg:justify-center text-base lg:text-xl mt-6 lg:mt-12 w-auto"
                    >
                      <motion.a
                        className="transition-all
                        bg-gradient-to-r to-[#5f2387] from-[#1669b2]
                        hover:to-[#7d2bb3] hover:from-[#1b78ca]
                        gap-1 flex items-center justify-center px-5 py-2 rounded-xl
                        shadow-md shadow-[#333333]  
                        "
                        href="/linktree"
                        target="_blank"
                        rel="noreferrer"
                      >
                        <h1 className="font-[650] text-[#fcfcfc]">
                          Get in touch
                        </h1>
                        <GoArrowRight />
                      </motion.a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div
              ref={splineContainer}
              id="spline-container"
              className="hidden sm:block h-[400px] lg:h-full w-[636px] lg:w-[70%] hover:cursor-grab"
            >
              <Spline
                scene="https://prod.spline.design/RwmvyKIRcAII4-yT/scene.splinecode"
                onLoad={(spline) => {
                  setLoading(false);
                  if (splineContainer.current !== null) {
                    spline.setZoom(
                      splineContainer.current.offsetWidth / splineMinimumWidth
                    );
                  }
                }}
              />
            </div>
          </div>
        </section>
      </NonSSRWrapper>
      <section
        id="portfolio"
        className="flex flex-col items-center justify-start min-h-max w-screen z-40 bg-primary"
      >
        <div className="w-[70%] h-[20vh] flex justify-center items-center">
          <h1 className="text-4xl font-bold after:content-[''] after:block after:pt-2 after:border-b-[#3BB5DB] after:border-b-4">
            Top Projects
          </h1>
        </div>
        <div className="mb-[10vh] max-w-[1400px] md:mb-0 w-[90%] xl:w-[80%] h-[80vh] flex justify-center items-center relative">
          <ProjectShowcase
            side="right"
            name="Viz"
            slogan="Diagramming Made Easy"
            paragraph="A web-based editor to help backend engineers create, edit,
                visualize and maitain their cloud infastructure diagrams."
            githubLink="https://github.com/nathan20021/VIZ-PROD"
            demoLink="https://viz.nathanluong.me"
            imagePath="/viz-logo-no-grad.png"
            images={[
              "viz-screenshot.png",
              "IOT-Solution-Diagram.jpeg",
              "ML-in-Swimming.jpeg",
            ]}
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
            ]}
          />
        </div>
        <div className="mb-[10vh] max-w-[1400px] md:mb-0 w-[90%] xl:w-[80%] h-[80vh] flex justify-center items-center relative">
          <ProjectShowcase
            side="left"
            name="McMaster Rocketry"
            slogan="Fueling Innovation."
            paragraph="A platform for the McMaster Rocketry Team to showcase their advancements, recruiting members, publishing blogs, and seeking external sponsorships."
            githubLink={null}
            demoLink="https://www.macrocketry.ca/"
            imagePath="/rocketry_logo.webp"
            images={[
              "rocketry-landing.png",
              "void-lake-5.png",
              "flight-profile.png",
            ]}
            links={[
              {
                link: "https://reactjs.org/",
                icon: <SiReact />,
                name: "React",
              },
              {
                link: "https://nextjs.org/",
                icon: <SiNextdotjs />,
                name: "Next.js",
              },
              {
                link: "https://graphql.org/",
                icon: <SiGraphql />,
                name: "GraphQL",
              },
              {
                link: "https://firebase.google.com/",
                icon: <SiFirebase />,
                name: "Firebase",
              },
            ]}
          />
        </div>
        <div className="mb-[10vh] max-w-[1400px] md:mb-0 w-[90%] h-[65vh]  md:h-[90vh] flex justify-center items-center relative">
          <ProjectShowcase
            side="right"
            name="Project BPSN"
            slogan="Conencting professionals."
            paragraph="Coming soon ... "
            githubLink={null}
            demoLink={null}
            imagePath="/dotdotdot.webp"
            images={["coming_soon.png"]}
            links={[
              {
                link: "https://reactjs.org/",
                icon: <SiReact />,
                name: "React",
              },
              {
                link: "https://nextjs.org/",
                icon: <SiNextdotjs />,
                name: "Next.js",
              },
              {
                link: null,
                icon: <BsThreeDots />,
                name: "_",
              },
            ]}
          />
        </div>
      </section>

      <section
        id="Honorable Mentions"
        className="z-20 flex flex-col items-center justify-start bg-primary min-h-max w-screen mt-16 relative"
      >
        <ParticleBg />
        <div className="w-full lg:w-[90%] min-h-max flex flex-col justify-center items-center">
          <h1 className="text-center text-3xl font-bold after:content-[''] after:block after:pt-2 after:border-b-[#3BB5DB] after:border-b-4">
            Honorable Mentions
          </h1>

          <div
            id="project-box-container"
            className="w-[85%] min-w-[320px] max-w-[1050px] z-20 flex justify-around gap-[5%] flex-wrap min-h-max"
          >
            <ProjectCard
              imagePath="chess.png"
              title="Online Chess"
              des="A chess.com clone where players can play real-time chess. Created with ReactJS, Flask, nextJS, TailwindCSS, and SocketIO"
              hasDemo={true}
              isPrivate={false}
              GhLink="https://github.com/nathan20021/chess.com-clone"
              demoLink="https://www.youtube.com/watch?v=u94ONgnwnus"
              style={{ backgroundColor: "#11723d" }}
            />
            <ProjectCard
              imagePath="Computer.png"
              title="Personal Blog"
              des="A tech repository aiming to share my personal industry experience via technical blogs. Created with ReactJs and nextJS"
              hasDemo={false}
              isPrivate={false}
              GhLink="https://github.com/nathan20021/summer-portfolio"
              demoLink="#"
              style={{ backgroundColor: "#4f3f89" }}
            />
            <ProjectCard
              imagePath="live.png"
              title="Live Telemetry"
              des="A real-time data visualizer works over LORA. Processing, graphing, and analyzing avionic telemetry on ground."
              hasDemo={true}
              isPrivate={true}
              GhLink="#"
              demoLink="https://www.linkedin.com/feed/update/urn:li:activity:6904194822161461248/"
              style={{ backgroundColor: "#024381" }}
            />
            <ProjectCard
              imagePath="cube.png"
              title="L.E.D Cube"
              des="A programable 3x3x3 Led cube which has multiple pre-set lighting configurations. You can also play 3d snake on this low resolution display!"
              hasDemo={false}
              isPrivate={false}
              GhLink="https://github.com/nathan20021/Complete-LED-Cube-project"
              demoLink="#"
              style={{ backgroundColor: "#0C3B5B" }}
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
              imagePath="minesweeper.png"
              title="Minesweeper"
              des="A desktop minesweeper playgorund where user can enjoy the good-old vibe. Written in Processing."
              hasDemo={false}
              isPrivate={false}
              GhLink="https://github.com/nathan20021/MineSweeper"
              demoLink="#"
              style={{ backgroundColor: "#7f1822" }}
            />
          </div>
        </div>
      </section>
    </main>
  );
};

export default Home;
