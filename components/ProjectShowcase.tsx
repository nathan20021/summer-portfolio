import * as React from "react";
import { motion } from "framer-motion";
import TechLink from "./TechLink";
import ImageGalary from "./ImageGalary";

type displayIcons = {
  link: string | null;
  name: string;
  icon: React.ReactElement;
};

type props = {
  name: string;
  slogan: string;
  paragraph: string;
  githubLink: string;
  demoLink: string;
  images: Array<string>;
  links: Array<displayIcons>;
  imagePath: string;
  side: "left" | "right";
};

const ProjectShowcase = ({
  name,
  slogan,
  paragraph,
  githubLink,
  demoLink,
  images,
  links,
  imagePath,
  side,
}: props) => {
  return (
    <div className="relative h-1/2 w-full flex">
      {side === "left" ? (
        <div className="relative w-3/5">
          <ImageGalary images={images} />
        </div>
      ) : (
        void 0
      )}
      <div className="h-full w-2/5 flex justify-center items-center">
        <div
          className={
            side === "right"
              ? `bg-[#333333] w-full px-6 py-7 rounded-l-xl`
              : `bg-[#333333] w-full px-6 py-7 rounded-r-xl`
          }
        >
          <div className="w-full h-full flex flex-col gap-6">
            <div id="logo-header-container" className="flex h-20 gap-4">
              {name === "McMaster Rocketry" ? (
                <a href={demoLink} target="_blank" rel="noreferrer">
                  <div className="w-20 h-20 flex justify-center items-center bg-[#e9e9e9] rounded-lg">
                    <img
                      className="rounded-lg w-14"
                      src={imagePath}
                      alt={`${name}-logo`}
                      draggable={false}
                    />
                  </div>
                </a>
              ) : (
                <div className="w-20 rounded-lg">
                  <a
                    href={demoLink}
                    target="_blank"
                    rel="noreferrer"
                    style={{
                      pointerEvents: demoLink === "None" ? "none" : `auto`,
                    }}
                  >
                    <img
                      className="rounded-lg bg-white"
                      src={imagePath}
                      alt={`${name}-logo`}
                      draggable={false}
                    />
                  </a>
                </div>
              )}
              <div className="flex flex-col justify-center items-start">
                <h1 className="text-xl font-bold text-white shadow-sm">
                  {name}
                </h1>
                <h2 className="text-base text-[#ebebeb]">{slogan}</h2>
              </div>
            </div>
            <div className="flex flex-col gap-3">
              <p className="text-[#e4e4e4] border-y-2 border-[#7a7a7a] py-5">
                {paragraph}
              </p>
              <div id="tech-link-container" className="w-full">
                <TechLink links={links} />
              </div>
            </div>
            <div id="button-container" className="w-full flex justify-around">
              {githubLink !== "None" ? (
                <motion.a
                  whileHover={{ borderColor: "#01629a" }}
                  href={githubLink}
                  target="_blank"
                  rel="noreferrer"
                  className="w-28 py-2 rounded-xl text-base border-[3px] bg-[#2a2a2a] border-[#01529a] flex justify-center items-center"
                >
                  Github
                </motion.a>
              ) : (
                void 0
              )}
              {demoLink === "None" ? (
                void 0
              ) : (
                <motion.a
                  whileHover={{
                    backgroundColor:
                      name === "McMaster Rocketry" ? `#8A003C` : "#01629a",
                  }}
                  href={demoLink}
                  target="_blank"
                  rel="noreferrer"
                  style={{
                    backgroundColor:
                      name === "McMaster Rocketry" ? `#7A003C` : `#01529a`,
                  }}
                  className="py-2 w-28 rounded-xl text-base flex justify-center items-center shadow-md"
                >
                  Live demo
                </motion.a>
              )}
            </div>
          </div>
        </div>
      </div>
      {side === "right" ? (
        <div className="relative w-3/5">
          <ImageGalary images={images} />
        </div>
      ) : (
        void 0
      )}
    </div>
  );
};

export default ProjectShowcase;
