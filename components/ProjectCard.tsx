import * as React from "react";
import LinkCard from "./ProjectCardLinks";
import Tilt from "react-parallax-tilt";
type CardProps = {
  imagePath: string;
  title: string;
  des: string;
  hasDemo: boolean;
  isPrivate: boolean;
  GhLink: string;
  demoLink: string;
  style: React.CSSProperties;
};

const ProjectCard = ({
  imagePath,
  title,
  des,
  hasDemo,
  isPrivate,
  GhLink,
  demoLink,
  style,
}: CardProps) => {
  return (
    <Tilt className="z-50 w-1/4 py-2 min-h-max max-w-[269px] my-10">
      <div
        className={` h-[22rem] rounded-3xl z-20 flex flex-col items-center`}
        style={style}
      >
        <div className="h-full z-20 text-center flex flex-col justify-around items-center w-[75%] py-3">
          <div id="image-container" className=" w-1/3">
            <img src={imagePath} draggable={false} />
          </div>

          <div id="Project Text Container" className="mt-2">
            <h1 className="font-bold text-2xl">{title}</h1>
            <p className="text-sm py-2 my-3 border-y-[2px] border-[#d2d2d2]">
              {des}
            </p>
          </div>

          <div id="link-container" className="w-full">
            <LinkCard
              hasDemo={hasDemo}
              isPrivate={isPrivate}
              GhLink={GhLink}
              demoLink={demoLink}
            />
          </div>
        </div>
      </div>
    </Tilt>
  );
};

export default ProjectCard;
