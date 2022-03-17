import type { NextPage } from "next";
import styles from "../styles/Home.module.css";
import React from "react";
import { BiCopyright } from "react-icons/bi";

const Footer: NextPage = () => {
  return (
    <footer className={styles.footer}>
      <p>
        <BiCopyright />
        2021:Nathan Luong
      </p>
    </footer>
  );
};

export default Footer;
