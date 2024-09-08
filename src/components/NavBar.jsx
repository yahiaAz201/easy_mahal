import "./NavBar.css";
import React, { useState } from "react";

export default function NavBar() {
  return (
    <div className="nav-container">
      <nav>
        <img className="nav-logo" src="./logo512.png" alt="logo" />
        {/*   <div className="nav-main-menu">
          <ul className="nav-main-menu-list">
            <li className="nav-main-menu-list-item active">Home</li>
            <li className="nav-main-menu-list-item">Prices</li>
            <li className="nav-main-menu-list-item">Contact</li>
            <li className="nav-main-menu-list-item">About</li>
          </ul>
        </div> */}
        <div className="nav-secondary-menu">
          <ul className="nav-secondary-menu-list">
            <li id="loginBtn" className="nav-secondary-menu-list-item">
              Login
            </li>
            <li id="registerBtn" className="nav-secondary-menu-list-item">
              Register
            </li>
          </ul>
        </div>
      </nav>
    </div>
  );
}
