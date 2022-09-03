import * as React from "react";
import Head from "next/head";
import Footer from "./Footer";
import Nav from "./Nav";
import { withRouter } from "next/router";

const Layout = ({ router, children }: any) => {
  return (
    <div>
      <Head>
        <title>Nathan Luong</title>
        <meta name="description" content="Welcome to my portfolio 👀" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Nav router={router} />
      {children}
      <Footer />
    </div>
  );
};

export default withRouter(Layout);
