import React from "react";
import Nav from "./Nav";
import Footer from "./Footer";

const Layout = ({ children }: any) => {
  return (
    <div>
      <Nav />
      {children}
      <Footer />
    </div>
  );
};

export default Layout;
