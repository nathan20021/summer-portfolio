import React from "react";
import Image from "next/image";
import {
  FaGithub,
  FaLinkedin,
  FaFacebook,
  FaEnvelope,
  FaInstagram,
  FaDiscord,
} from "react-icons/fa";

const PersonalCard = () => {
  return (
    <div id="personal_card">
      <Image
        width={40}
        height={40}
        id="avatar"
        src="https://github.com/nathan20021.png"
        alt="Potrait"
      />
      <div id="intro_content_box" className="bg-black">
        <h1>Nathan Luong</h1>
        <p>McMaster Software Engineering Co-op 2024</p>
        <ul id="social_links" className="flex-col">
          <li>
            <a
              href="https://github.com/nathan20021"
              target="_blank"
              rel="noreferrer"
            >
              <FaGithub />
            </a>
          </li>
          <li className="hover_link" id="linkedin">
            <a
              href="https://www.linkedin.com/in/nathan-luong-303158203/"
              target="_blank"
              rel="noreferrer"
            >
              <FaLinkedin />
            </a>
          </li>
          <li className="hover_link" id="email">
            <a href="mailto:nhanto20021@gmail.com">
              <FaEnvelope />
            </a>
            <span className="text_underneath" id="email_text">
              nhanto20021@gmail.com luongn4@mcmaster.ca
            </span>
          </li>

          <li>
            <a
              href="https://www.facebook.com/trongnhan.luong.965"
              target="_blank"
              rel="noreferrer"
            >
              <FaFacebook />
            </a>
          </li>
          <li>
            <a
              href="https://www.instagram.com/nathan_luonggg_/"
              target="_blank"
              rel="noreferrer"
            >
              <FaInstagram />
            </a>
          </li>

          <li className="hover_link" id="discord">
            <FaDiscord />
            <span className="text_underneath" id="discord_text">
              Nate_no_Nerd#7154
            </span>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default PersonalCard;
