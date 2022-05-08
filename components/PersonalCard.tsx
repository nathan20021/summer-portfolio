import React from "react";
import type { NextPage } from "next";
import styles from "../styles/PersonalCard.module.css";
import { Avatar } from "@mui/material";

import {
  FaGithub,
  FaLinkedin,
  FaFacebook,
  FaEnvelope,
  FaInstagram,
  FaDiscord,
} from "react-icons/fa";

const PersonalCard: NextPage = () => {
  return (
    <div className={styles.personal_card}>
      <Avatar
        alt="Nathan avatar"
        src="https://github.com/nathan20021.png"
        sx={{ width: "12rem", height: "12rem" }}
      />
      <div className={styles.intro_content_box}>
        <h1 className={styles.name}>Nathan Luong</h1>
        <p className={styles.bio}>McMaster Software Engineering &#39; 24</p>
        <ul className={styles.social_links}>
          <li>
            <a
              href="https://github.com/nathan20021"
              target="_blank"
              rel="noreferrer"
            >
              <FaGithub />
            </a>
          </li>
          <li>
            <a
              href="https://www.linkedin.com/in/nathan-luong-303158203/"
              target="_blank"
              rel="noreferrer"
            >
              <FaLinkedin />
            </a>
          </li>
          <li className={styles.hover_link + " " + styles.email} id="email">
            <a href="mailto:nhanto20021@gmail.com">
              <FaEnvelope />
            </a>
            <span className={styles.email_text + " " + styles.text_underneath}>
              nhanto20021@gmail.com
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

          <li className={styles.hover_link + " " + styles.discord}>
            <FaDiscord />
            <span
              className={styles.discord_text + " " + styles.text_underneath}
            >
              Nate_no_Nerd#7154
            </span>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default PersonalCard;
