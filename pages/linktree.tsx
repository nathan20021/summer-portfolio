import React from "react";
import type { NextPage } from "next";
import ParticleBg from "../components/particleBg";
import LinkTree from "../components/LinkTree";
import { LinkCardProps } from "../interfaces";
import { FaGithub, FaLinkedin, FaLink } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { IoMdDocument } from "react-icons/io";
import { MdArticle } from "react-icons/md";
import { HiCode } from "react-icons/hi";

const ContactInfo: Array<LinkCardProps> = [
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
    icon: <MdArticle />,
    title: <p>Blogs</p>,
    link: "/blogs",
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
];

const ResumeLinks: Array<LinkCardProps> = [
  {
    icon: <IoMdDocument />,
    title: <p>DevOps Resume</p>,
    link: "/Nathan_Luong_DevOps.pdf",
  },
  {
    icon: <IoMdDocument />,
    title: <p>Software Engineering Resume</p>,
    link: "/Nathan_Luong_SWE.pdf",
  },
];

const FeaturedPosts: Array<LinkCardProps> = [
  {
    icon: <FaLink />,
    title: <p>The Hamilton Spectator</p>,
    link: "https://www.thespec.com/news/hamilton-region/2022/11/25/mcmaster-rocket-launch.html",
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
            linkCardPropsArray={ContactInfo}
          />
          <LinkTree header={`Resume 📄`} linkCardPropsArray={ResumeLinks} />
          <LinkTree
            header={`Featured articles 🧑🏻‍💻`}
            linkCardPropsArray={FeaturedPosts}
          />
        </div>
      </div>
    </div>
  );
};
export default Contact;
