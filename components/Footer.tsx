import type { NextPage } from "next";
import styles from "../styles/Home.module.css";
import * as React from "react";
import { BiCopyright } from "react-icons/bi";

const Footer: NextPage = () => {
  return (
    <footer className={`${styles.footer} bg-black z-20`}>
      <BiCopyright />
      <p>2021:Nathan Luong</p>
    </footer>
  );
};

export default Footer;
