import React from "react";
import type { NextPage } from "next";
import styles from "../styles/Home.module.css";
import PersonalCard from "../components/PersonalCard";
import Card from "../components/Card";
import ProjectCard from "../components/ProjectCard";
import { RiCodeSSlashLine } from "react-icons/ri";
import { AiOutlineProject, AiOutlineCloudServer } from "react-icons/ai";

import { BsChevronDoubleDown } from "react-icons/bs";
import { FaBtc } from "react-icons/fa";

// import Image from "next/img"

const Home: NextPage = () => {
  return (
    <main className="min-h-screen z-20 flex flex-col justify-start items-center">
      <div className={styles.container}>
        <PersonalCard />
      </div>
      <section className="bg-white/80 z-20 w-full flex justify-center items-center mt-44">
        <div
          className={`${styles.container} ${styles.intro_text_box} text-center w-full py-10`}
        >
          <h1 className=" font-bold text-xl text-black pb-9">
            I&#39;m learning and improving on:
          </h1>
          <div className="intro_small_box w-full flex justify-around items-start">
            <Card
              Icon={<AiOutlineCloudServer />}
              title="Cloud Architecture"
              des={["Microservices", "System Design", "Integration Patterns"]}
            />
            <Card
              Icon={<RiCodeSSlashLine />}
              title="Back-end Development"
              des={[
                "Apache Projects",
                "Database Engineering",
                "Communication Protocols",
              ]}
            />
            <Card
              Icon={<AiOutlineProject />}
              title="Project Management"
              des={[
                "Dev-Team Scalling",
                "Timeline Management",
                "Managing Methodologies",
              ]}
            />
            <Card
              Icon={<FaBtc className="-rotate-12" />}
              title="Algorithmic Trading"
              des={[
                "Risk Management",
                "Trading Stategies",
                "Portfolio Diversification",
              ]}
            />
          </div>
          <BsChevronDoubleDown className="text-5xl mt-10 text-black" />
        </div>
      </section>

      <section
        id="portfolio"
        className="z-20 flex flex-col items-center justify-center my-20"
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
