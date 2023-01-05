import * as React from "react";
import { LinkCardProps } from "../interfaces/index";

type props = {
  data: LinkCardProps;
};

const LinkCard = ({ data }: props) => {
  return (
    <a
      onMouseDown={(e) => e.preventDefault()}
      href={data.link}
      target="_blank"
      className="group flex items-center hover:text-[#353535] hover:bg-[#c7c7c7] py-6 px-4 rounded-sm
                 relative w-full h-full text-base ease-out duration-200 bg-[#353535]
                "
    >
      <h1 className="absolute font-bold text-xl">{data.icon}</h1>
      <div className="w-full text-center font-medium ease-out duration-100 group-hover:font-bold">
        <p>{data.title}</p>
      </div>
    </a>
  );
};

export default LinkCard;
