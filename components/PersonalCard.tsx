import React from "react";
import styles from "../styles/PersonalCard.module.css";
import { Avatar } from "@mui/material";

import {
  FaGithub,
  FaLinkedin,
  FaFacebook,
  FaRegEnvelope,
  FaInstagram,
  FaDiscord,
  FaFileWord,
} from "react-icons/fa";

const PersonalCard: React.FC = () => {
  return (
    <div className={`${styles.personal_card} z-20`}>
      <div className="relative">
        <div>
          <Avatar
            alt="Nathan avatar"
            src="https://github.com/nathan20021.png"
            sx={{ width: "12rem", height: "12rem" }}
          />
        </div>
        <div className={styles.chatBox}>
          <p className={styles.chatText}>
            👋 Hey there!! Thanks for stopping by.
          </p>
        </div>
      </div>

      <div className={styles.intro_content_box}>
        <h1 className={styles.name}>Nathan Luong</h1>
        <p className={styles.bio}>Backend Developer, McMaster S.E &#39; 24</p>
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
          <li>
            <a
              href="https://docs.google.com/document/d/1dsUORWNwj6a6yHRkGZj2_8EQCC5DftGH/edit"
              target="_blank"
              rel="noreferrer"
            >
              <FaFileWord className="" />
            </a>
          </li>
          <li className={`${styles.hover_link} ${styles.email}`} id="email">
            <a href="mailto:nhanto20021@gmail.com">
              <FaRegEnvelope />
            </a>
            <span className={`${styles.email_text} ${styles.text_underneath}`}>
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
