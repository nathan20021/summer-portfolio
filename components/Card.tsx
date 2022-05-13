import * as React from "react";

type CardProps = {
  Icon: React.ReactNode;
  title: string;
  des: Array<String>;
};

const Card = ({ Icon, title, des }: CardProps) => {
  const stuffs = des.map((element, index) => (
    <li key={index} className="py-1 text-sm">
      {element}
    </li>
  ));
  return (
    <div className="flex flex-col justify-center items-center h-full">
      <i className="text-[#3a4ba8] text-bold text-[3rem] py-3">{Icon}</i>
      <h1 className="font-bold text-black pb-6">{`${title}`}</h1>
      <ul className="text-black flex flex-col items-start list-disc">
        {stuffs}
      </ul>
    </div>
  );
};

export default Card;
