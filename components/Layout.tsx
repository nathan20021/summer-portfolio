import * as React from "react";
import { useState, useEffect } from "react";
import Head from "next/head";
import Footer from "./Footer";
import Nav from "./Nav";
import { withRouter } from "next/router";
import { TbArrowBarToUp } from "react-icons/tb";

const Layout = ({ router, children }: any) => {
  const [showButton, setShowButton] = useState<boolean>(false);
  const [height, setHeight] = useState(undefined);

  useEffect(() => {
    const buttonVisibleHandler = () => {
      window.scrollY > 400 ? setShowButton(true) : setShowButton(false);
    };
    window.addEventListener("scroll", buttonVisibleHandler);
    setHeight(window.document.body.scrollHeight);

    return () => {
      window.removeEventListener("scroll", buttonVisibleHandler);
    };
  }, [showButton, height]);

  useEffect(() => {
    const handleRouteChange = () => {
      setHeight(window.document.body.scrollHeight);
    };
    router.events.on("routeChangeComplete", handleRouteChange);

    return () => {
      router.events.off("routeChangeComplete", handleRouteChange);
    };
  }, [height]);

  return (
    <div>
      <Head>
        <title>Nathan Luong</title>
        <meta name="description" content="Welcome to my portfolio 👀" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div id="main-layout-container" className="z-[100] w-screen h-fit">
        <div
          id="to-top-button-container"
          className="absolute w-full h-full"
          style={{ height: height }}
        >
          <button
            onClick={() => {
              window.scrollTo({
                top: 0,
                behavior: "smooth",
              });
            }}
            className="sticky z-[100] top-[85vh] left-[91vw] bg-[#ffffff]/40 hover:bg-[#ffffff]/80 duration-300 
              transition-opacity ease-in-out w-12 h-12 flex justify-center items-center rounded-full backdrop-blur-sm"
            style={{ display: showButton ? "" : "none" }}
          >
            <TbArrowBarToUp className="text-2xl bg-clip-text text-[#3f3f3f]" />
          </button>
        </div>
        <Nav router={router} />
        {children}
        <Footer />
      </div>
    </div>
  );
};

export default withRouter(Layout);
