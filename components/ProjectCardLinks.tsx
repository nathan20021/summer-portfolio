import * as React from "react";

type LinkCardProbs = {
  hasDemo: boolean;
  isPrivate: boolean;
  GhLink: string;
  demoLink: string;
};

const LinkCard = ({ hasDemo, isPrivate, GhLink, demoLink }: LinkCardProbs) => {
  return (
    <div className="flex justify-around w-full">
      {hasDemo && (
        <a
          href={demoLink}
          className={`w-1/2 ${isPrivate ? " " : "border-r-2 border-black/90"}`}
        >
          <div className="font-bold">Demo</div>
        </a>
      )}
      {!isPrivate && (
        <a href={GhLink} className="w-1/2">
          <div className="font-bold">Github</div>
        </a>
      )}
    </div>
  );
};

export default LinkCard;
