import * as React from "react";
import { motion } from "framer-motion";

type displayIcons = {
  link: string | undefined;
  name: string;
  icon: React.ReactElement;
};

type props = {
  links: Array<displayIcons>;
};

const TechLink = ({ links }: props) => {
  return (
    <div className="flex flex-wrap gap-2 overflow-hidden justify-around">
      {links.map((link, index) => {
        return (
          <div key={index}>
            <motion.a
              whileHover={{ color: "#ffffff" }}
              href={link.link}
              style={{ pointerEvents: link.link === "None" ? "none" : `auto` }}
              target="_blank"
              rel="noreferrer"
              className="flex justify-center items-center text-sm gap-1 text-[#eaeaea]"
            >
              {link.icon}
              <p className="text-xs xl:text-sm">{link.name}</p>
            </motion.a>
          </div>
        );
      })}
    </div>
  );
};

export default TechLink;
