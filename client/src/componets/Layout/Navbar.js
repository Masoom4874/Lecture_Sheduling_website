import React, { useState } from "react";
import "../../App.css";
import { FaBars, FaUserAlt, FaRegChartBar, FaCommentAlt } from "react-icons/fa";
import { NavLink } from "react-router-dom";

const Navbar = ({ children }) => {
  const [isOpen, setIsOpen] = useState(true);
  const toggle = () => setIsOpen(!isOpen);
  const menuItem = [
    {
      path: "/",
      name: "Instructors",
      icon: <FaUserAlt />,
    },
    {
      path: "/courses",
      name: "Courses",
      icon: <FaRegChartBar />,
    },
    {
      path: "/lectures",
      name: "Lectures",
      icon: <FaCommentAlt />,
    },
  ];
  return (
    <div className="container">
      <div style={{ width: isOpen ? "300px" : "50px" }} className="sidebar">
        <div className="top_section">
          <h1 style={{ display: isOpen ? "block" : "none" }} className="logo">
            Ideamagix
          </h1>
          <div style={{ marginLeft: isOpen ? "50px" : "0px" }} className="bars">
            <FaBars onClick={toggle} />
          </div>
        </div>
        {menuItem.map((item, index) => (
          <NavLink
            to={item.path}
            key={index}
            className="link"
            activeclassName="active"
          >
            <div className="icon">{item.icon}</div>
            <div
              style={{ display: isOpen ? "block" : "none" }}
              className="link_text"
            >
              {item.name}
            </div>
          </NavLink>
        ))}
      </div>
      <main>{children}</main>
    </div>
  );
};

export default Navbar;
