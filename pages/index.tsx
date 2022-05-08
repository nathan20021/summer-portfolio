import React from "react";
import type { NextPage } from "next";
import styles from "../styles/Home.module.css";
import PersonalCard from "../components/PersonalCard";

// import Image from "next/img"

const Home: NextPage = () => {
  return (
    <div className="flex justify-center items-center">
      <div className={styles.container}>
        <main className={styles.main}>
          <PersonalCard />
          <section id="intro">
            <div>
              <h1>Hey!! Thanks for stopping by!</h1>
              <p>
                My name is Nathan, an S.E student passionate about back-end
                architecture and development!
              </p>
              <p>Below is my journey and experience in programming.</p>
              <p>Feel free to reach out and keep in touch 😃</p>
            </div>
          </section>
          <section id="resume">
            <button>Resume</button>
          </section>
        </main>
      </div>
    </div>
  );
};

export default Home;
