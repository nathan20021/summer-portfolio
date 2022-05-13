import * as React from "react";
import LinkCard from "./ProjectCardLinks";

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
    <div
      className={`w-1/4 py-2 max-h-max max-w-[269px] my-10 rounded-3xl z-20 flex flex-col items-center`}
      style={style}
    >
      <div className="h-full z-20 text-center flex flex-col justify-around items-center w-[75%] py-3">
        <div id="image-container" className=" w-1/3">
          <img src={imagePath} />
        </div>

        <div id="Project Text Container" className="mt-2">
          <h1 className="font-bold text-2xl">{title}</h1>
          <p className="text-sm py-2 my-3 border-y-[3px] border-black">{des}</p>
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
  );
};

export default ProjectCard;
