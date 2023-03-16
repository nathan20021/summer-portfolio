import * as React from "react";
import { useState, useEffect } from "react";
import Head from "next/head";
import Footer from "./Footer";
import Nav from "./Nav";
import { withRouter } from "next/router";
import { TbArrowBarToUp } from "react-icons/tb";
// import { useTheme } from "next-themes";
// import { FaSun, FaMoon } from "react-icons/fa";

const Layout = ({ router, children }: any) => {
  const [showButton, setShowButton] = useState<boolean>(false);
  const [height, setHeight] = useState<number | undefined>(undefined);
  // const { theme, setTheme } = useTheme();

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
        <title>Nathan Luong</title>
        <meta name="description" content="Welcome to my portfolio 👀" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div
        id="main-layout-container"
        className="z-[100] w-screen h-fit"
        data-color-mode="dark"
      >
        <div
          id="to-top-button-container"
          className="absolute w-full h-full"
          style={{ height: height }}
        >
          {/* {router.asPath.split("/")[1] === "blogs" &&
          router.asPath.split("/").length > 2 ? (
            <button
              id="theme-toggle-button"
              onClick={() => {
                theme === "dark" ? setTheme("light") : setTheme("dark");
              }}
              className="sticky z-[100] top-[79dvh] left-[91dvw] bg-[#ffffff]/40 hover:bg-[#ffffff]/80 duration-300 
              transition-opacity ease-in-out w-12 h-12 flex justify-center items-center rounded-full backdrop-blur-sm font-bold
              "
            >
              {theme === "dark" ? (
                <FaSun className="text-xl bg-clip-text text-[#3f3f3f]" />
              ) : (
                <FaMoon className="text-xl bg-clip-text text-[#3f3f3f]" />
              )}
            </button>
          ) : (
            void 0
          )} */}
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
        <Footer currentPath={router.asPath} />
      </div>
    </div>
  );
};

export default withRouter(Layout);
