import * as React from "react";
import { useState, useEffect } from "react";
import Head from "next/head";
import Footer from "./Footer";
import Nav from "./Nav";
import { withRouter } from "next/router";
import { TbArrowBarToUp } from "react-icons/tb";

const Layout = ({ router, children }: any) => {
  const [showButton, setShowButton] = useState<boolean>(false);
  const [height, setHeight] = useState<number | undefined>(undefined);

  useEffect(() => {
    const buttonVisibleHandler = () => {
      window.scrollY > 400 ? setShowButton(true) : setShowButton(false);
    };
    window.addEventListener("scroll", buttonVisibleHandler);
    window === undefined
      ? void 0
      : setHeight(window.document.body.scrollHeight);

    return () => {
      window === undefined
        ? void 0
        : window.removeEventListener("scroll", buttonVisibleHandler);
    };
  }, [showButton, height]);

  useEffect(() => {
    const handleRouteChange = () => {
      window === undefined
        ? void 0
        : setHeight(window.document.body.scrollHeight);
    };
    router.events.on("routeChangeComplete", handleRouteChange);

    return () => {
      router.events.off("routeChangeComplete", handleRouteChange);
    };
  }, [height]);

  return (
    <div>
      <Head>
        <meta name="description" content="Welcome to my portfolio 👀" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div
        id="main-layout-container"
        className="z-[100] w-screen h-fit"
        data-color-mode="dark"
      >
        <Nav router={router} />
        {children}
        <button
          className="fixed z-[100] top-[79dvh] left-[91dvw] bg-[#ffffff]/40 hover:bg-[#ffffff]/80 duration-300 
                        transition-opacity ease-in-out w-12 h-12 justify-center items-center rounded-full backdrop-blur-sm"
          style={{ display: showButton ? "flex" : "none" }}
          onClick={() => {
            window.scrollTo({
              top: 0,
              behavior: "smooth",
            });
          }}
        >
          <TbArrowBarToUp className="text-2xl bg-clip-text text-[#3f3f3f]" />
        </button>
        <Footer currentPath={router.asPath} />
      </div>
    </div>
  );
};

export default withRouter(Layout);
