import React from "react";
import Navbar from "./Navbar";

const Layout = ({ children, title, description, keywords, author }) => {
  return (
    <div className="d-flex justify-content-center">
      <div style={{ width: "60vw" }}>
        <Navbar className="bg-black w-25">
          <main style={{ minHeight: "70vh" }}>{children}</main>
        </Navbar>
      </div>
    </div>
  );
};

export default Layout;
