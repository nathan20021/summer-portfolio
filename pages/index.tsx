"use client";
import React, { useEffect, useState } from "react";
import type { NextPage } from "next";
import ParticleBg from "../components/particleBg";
import ProjectCard from "../components/ProjectCard";
import {
  SiReact,
  SiRedux,
  SiPostgresql,
  SiNextdotjs,
  SiGraphql,
  SiFirebase,
  SiExpress,
  SiSqlite,
  SiTailwindcss,
  SiMysql,
  SiVercel,
  SiFlask,
  SiPytorch,
} from "react-icons/si";
import { FaAws } from "react-icons/fa";
import ReactTextTransition, { presets } from "react-text-transition";
import { GoArrowRight } from "react-icons/go";
import ProjectShowcase from "../components/ProjectShowcase";

import { motion } from "framer-motion";

const lol = [
  "Cloud-Tech Enthusiast",
  "Backend/ DevOps Engineer",
  "AWS Certified",
  "GoLang lover",
];

const projects = [
  {
    color: "#52409f",
    name: "☁️ Viz",
    slogan: "Diagramming Made Easy",
    paragraph:
      "A web-based editor to help backend engineers create, edit,visualize and maitain their cloud infastructure diagrams.",
    githubLink: "https://github.com/nathan20021/VIZ-PROD",
    demoLink: "https://viz.nathanluong.me",
    imagePath: "/viz-logo.png",
    images: [
      "viz-screenshot.png",
      "IOT-Solution-Diagram.jpeg",
      "ML-in-Swimming.jpeg",
    ],
    links: [
      {
        link: "https://vercel.com/",
        icon: <SiVercel />,
        name: "Vercel",
      },
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
        link: "https://www.postgresql.org/",
        icon: <SiPostgresql />,
        name: "PostgreSQL",
      },
    ],
  },
  {
    color: "#338cb2",
    name: "🩻 Lung Vision AI",
    slogan: "AI-Powered Lung Disease Detection & Progression.",
    paragraph:
      "Home-made state-of-the-art localized disease classification model to analyze lung CT scans (trained on Oxford's MIMIC dataset: 500GB+ labels). Additional Integration with a intuitive user interface automating doctor and physicians workflow.",
    githubLink: "https://github.com/RezaJodeiri/CXR-Capstone",
    demoLink:
      "https://www.macvideo.ca/media/LungVisionAI+-+CAS/1_cuoc4htg/363742172",
    imagePath: "/n_avatar.png",
    images: ["n1.png", "n2.png", "n3.png", "n4.png"],
    links: [
      {
        link: "https://aws.amazon.com/",
        icon: <FaAws />,
        name: "AWS",
      },
      {
        link: "https://pytorch.org/",
        icon: <SiPytorch />,
        name: "PyTorch",
      },
      {
        link: "https://reactjs.org/",
        icon: <SiReact />,
        name: "React",
      },
      {
        link: "https://flask.palletsprojects.com/en/stable/",
        icon: <SiFlask />,
        name: "Flask",
      },
    ],
  },
  {
    color: "#7a003c",
    name: "McMaster Rocketry",
    slogan: "Fueling Innovation.",
    paragraph:
      "A platform for the McMaster Rocketry Team to showcase their advancements, recruiting members, publishing blogs, and seeking external sponsorships.",
    githubLink: undefined,
    demoLink: "https://www.macrocketry.ca/",
    imagePath: "/rocketry_logo.webp",
    images: ["rocketry-landing.png", "void-lake-5.png", "flight-profile.png"],
    links: [
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
    ],
  },
  {
    color: "#666666",
    name: "🚗 Oober",
    slogan: "Connecting Riders and Drivers.",
    paragraph:
      "A mobile application that connects riders and drivers in a safe and efficient manner.",
    githubLink: "https://github.com/nathan20021/3A04-Project",
    demoLink: undefined,
    imagePath: "/Oober.png",
    images: ["Oober_Auth.png", "Oober_carpool.png", "Oober_end.png"],
    links: [
      {
        link: "https://reactjs.org/",
        icon: <SiReact />,
        name: "React Native",
      },
      {
        link: "https://tailwindcss.com/",
        icon: <SiTailwindcss />,
        name: "Tailwind CSS",
      },
      {
        link: "https://sqlite.org/",
        icon: <SiSqlite />,
        name: "SQLite",
      },
      {
        link: "https://expressjs.com/",
        icon: <SiExpress />,
        name: "Express.js",
      },
    ],
  },
  {
    color: "#01529a",
    name: "Personal Blogs",
    slogan: "A place to share my thoughts",
    paragraph:
      "A place where I can share my thoughts and technical experiences with the world. Aiming to improve my writting, and thought-orginization skills.",
    githubLink: "https://github.com/nathan20021/summer-portfolio",
    demoLink: "https://nathanluong.me/blogs",
    imagePath: "/viz-logo-no-grad.png",
    images: [
      "blog-1.png",
      "blog-3.png",
      "blog-2.png",
      "blog-5.png",
      "blog-4.png",
    ],
    links: [
      {
        link: "https://vercel.com/",
        icon: <SiVercel />,
        name: "Vercel",
      },
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
        link: "https://www.mysql.com/",
        icon: <SiMysql />,
        name: "MySQL",
      },
    ],
  },
];

const Home: NextPage = () => {
  const [titleIndex, setIndex] = useState(0);
  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((lolIndex) => lolIndex + 1);
    }, 3500);
    return () => {
      clearInterval(timer);
    };
  }, []);
  return (
    <div className="z-20 w-screen flex flex-col justify-start items-center">
      <section className="w-full h-max lg:h-[80dvh] flex flex-col justify-center items-center z-40 bg-primary ">
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
                <div id="name-text-button-container" className="grow lg:grow-0">
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
                      {lol[titleIndex % lol.length]}
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
            id="spline-container"
            className="hidden h-full lg:h-full w-[90%] lg:w-[70%] md:flex md:justify-center md:items-start"
          >
            <img
              src="/hero_section.jpg"
              className="h-full lg:h-auto"
              draggable={false}
            />
          </div>
        </div>
      </section>

      <section
        id="portfolio"
        className="flex flex-col items-center justify-start min-h-max w-screen z-40 bg-primary"
      >
        <div className="w-[70%] mt-[10vh] md:mt-0 md:h-[20vh] flex justify-center items-center">
          <h1 className="text-4xl font-bold after:content-[''] after:block after:pt-2 after:border-b-[#3BB5DB] after:border-b-4">
            Projects
          </h1>
        </div>
        {projects.map((project, index) => {
          return (
            <div
              key={index}
              className="mb-[4vh] max-w-[1400px] md:mb-0 w-[90%] xl:w-[80%] h-[80vh] flex justify-center items-center relative"
            >
              <ProjectShowcase
                color={project.color}
                side={index % 2 === 0 ? "right" : "left"}
                name={project.name}
                slogan={project.slogan}
                paragraph={project.paragraph}
                githubLink={project.githubLink}
                demoLink={project.demoLink}
                imagePath={project.imagePath}
                images={project.images}
                links={project.links}
              />
            </div>
          );
        })}
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
              title="Personal Portfolio"
              des="A tech repository aiming to share my personal industry experience. Created with ReactJs and nextJS"
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
    </div>
  );
};

export default Home;
