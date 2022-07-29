import type { NextPage } from "next";
import styles from "../styles/Home.module.css";
import * as React from "react";
import { Input } from "@mui/material";

const Footer: NextPage = () => {
  return (
    <footer className={`${styles.footer} bg-black z-20`}>
      <h2>Be on the email list for more enigneering updates</h2>
      <Input />
    </footer>
  );
};

export default Footer;
