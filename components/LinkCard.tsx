import * as React from "react";
import { LinkCardProps } from "../interfaces/index";

type props = {
  data: LinkCardProps;
  index: number;
};

const LinkCard = ({ data, index }: props) => {
  return (
    <a
      key={index}
      onMouseDown={(e) => e.preventDefault()}
      href={data.link}
      target="_blank"
      rel="noreferrer"
      className="group flex items-center justify-between hover:text-[#353535] hover:bg-[#c7c7c7] py-6 px-4 rounded-sm
                 relative w-full h-full text-base ease-out duration-200 bg-[#353535]
                "
    >
      <h1 className="w-[10%] sm:absolute font-bold xl:text-xl lg:text-lg float-left">
        {data.icon}
      </h1>
      <div className="w-[70%] sm:w-full flex justify-center items-center">
        <div className="text-sm lg:text-base w-full sm:text-center font-medium ease-out duration-100 xl:group-hover:font-bold">
          {data.title}
        </div>
      </div>
    </a>
  );
};

export default LinkCard;
