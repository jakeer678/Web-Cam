import React from "react";
import { NavLink } from "react-router-dom";
import "./Navbar.css";

const Navigation = () => {
  return (
    <>
      <nav className="navbar">
        <ul className="nav-menu">
          <li className="nav-item">
            <NavLink to="/" className="nav-link">
              Home
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink to="/camera" className="nav-link">
              Camera
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink to="/about" className="nav-link">
              About
            </NavLink>
          </li>
        </ul>
      </nav>
    </>
  );
};

export default Navigation;
