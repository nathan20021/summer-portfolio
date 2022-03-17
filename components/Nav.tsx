import type { NextPage } from "next";
import Link from "next/link";
import styles from "../styles/Home.module.css";
import React from "react";

const Nav: NextPage = () => {
  return (
    <nav className={styles.nav}>
      <h2>Nathan Luong</h2>
      <ul>
        <li>
          <Link href="/">
            <a>Home</a>
          </Link>
        </li>
        <li>
          <Link href="/other">
            <a>Other</a>
          </Link>
        </li>
        <li>
          <Link href="/blogs">
            <a>Blogs</a>
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Nav;
