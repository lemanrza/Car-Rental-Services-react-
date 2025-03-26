import React, { useState } from "react";
import "./header.css";
import { Link } from "react-router";

import { useAuth } from "../../../Services/Context/AuthContext";
const ClientHeader = () => {
  const [toggleMenu, setToggleMenu] = useState(false);
  const { user } = useAuth();
  const [mobileMenu, setMobileMenu] = useState(false);
  
  return (
    <div>
      <header>
        <Link to={"/"} className="logo">
          Car Rental Services
        </Link>
        <nav>
          <ul>
            <li>
              <Link to={"/"}>home</Link>
            </li>
            <li>
              <Link to={"/cars"}>cars</Link>
            </li>
          </ul>
        </nav>
        <div
          className="user-profile"
          onClick={() => setToggleMenu(!toggleMenu)}
        >
          <img src="https://mixmag.com.tr/assets/uploads/images/_columns2/rihanna-june-19-1.jpg" alt="" />
          <ul className={`user-content ${toggleMenu ? "active" : "inactive"}`}>
            <li>
              <Link to={"/user"}>
                User
              </Link>
            </li>
            <li>
            <Link to={"/"}>
                LogOut
              </Link>
            </li>
          </ul>
        </div>
      </header>
     

    </div>
  );
};

export default ClientHeader;