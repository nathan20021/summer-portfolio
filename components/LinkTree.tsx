import * as React from "react";
import { LinkCardProps } from "../interfaces";
import LinkCard from "./LinkCard";

type LinkTreeProps = {
  header: string;
  linkCardPropsArray: Array<LinkCardProps>;
};

const LinkTree = ({ header, linkCardPropsArray }: LinkTreeProps) => {
  return (
    <>
      <div id="header-container" className="w-full">
        <h1 className="text-center mb-7 mt-14 text-md sm:text-lg lg:text-xl xl:text-2xl lg:text-xl ">
          {header}
        </h1>
      </div>
      <div id="link-container" className="w-[70%] flex flex-col gap-7">
        {linkCardPropsArray.map((data, index) => (
          <div key={index}>
            <LinkCard data={data} index={index} />
          </div>
        ))}
      </div>
    </>
  );
};

export default LinkTree;
