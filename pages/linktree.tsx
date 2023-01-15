import React from "react";
import type { NextPage } from "next";
import ParticleBg from "../components/particleBg";
import LinkTree from "../components/LinkTree";
import { LinkCardProps } from "../interfaces";
import { FaGithub, FaLinkedin, FaLink } from "react-icons/fa";
import { MdEmail, MdLocationOn } from "react-icons/md";
import { HiCode } from "react-icons/hi";

// import Image from "next/img"
const contactInfo: Array<LinkCardProps> = [
  {
    icon: <HiCode />,
    title: <p>Portfolio</p>,
    link: "https://www.nathanluong.me",
  },
  {
    icon: <FaLinkedin />,
    title: <p>LinkedIn Profile</p>,
    link: "https://www.linkedin.com/in/nathan-luongg/",
  },
  {
    icon: <FaGithub />,
    title: <p>Github Profile</p>,
    link: "https://github.com/nathan20021",
  },
  {
    icon: <MdEmail />,
    title: (
      <p>
        nathanluong02<span className="inline-block">@gmail.com</span>
      </p>
    ),
    link: "mailto:nathanluong02@gmail.com",
  },
  {
    icon: <MdLocationOn />,
    title: <p>Eglinton Ave, Mississauga, ON</p>,
    link: "https://goo.gl/maps/JEg13NjyD57TKGXV6",
  },
];

const featuredPosts: Array<LinkCardProps> = [
  {
    icon: <FaLink />,
    title: <p>The Hamilton Spectator</p>,
    link: "https://www.thespec.com/news/hamilton-region/2022/11/25/mcmaster-rocket-launch.html",
  },
  {
    icon: <FaLink />,
    title: <p>Rocketry Leadership Team</p>,
    link: "https://www.macrocketry.ca/members",
  },
  {
    icon: <FaLink />,
    title: <p>McMaster Faculty of Engineering</p>,
    link: "https://www.linkedin.com/feed/update/urn:li:activity:6972576223445090305/",
  },
];

const Contact: NextPage = () => {
  return (
    <div className="flex justify-center items-center w-screen min-h-[80vh] z-50 pt-7">
      <div>
        <ParticleBg />
      </div>
      <div className="z-40 w-full h-full flex items-center justify-center">
        <div
          id="contact-container"
          className="lg:w-[80%] xl:w-[50%] w-[90%] max-h-min min-h-[90%] bg-[#000000] bg-opacity-25 backdrop-blur-sm
                    flex flex-col items-center justify-center pb-[4rem] "
        >
          <LinkTree
            header={`Let's keep in touch 🌱`}
            linkCardPropsArray={contactInfo}
          />
          <LinkTree
            header={`Featured articles 🧑🏻‍💻`}
            linkCardPropsArray={featuredPosts}
          />
        </div>
      </div>
    </div>
  );
};
export default Contact;