import React, { useState } from "react";
import "./header.css";
import { Link } from "react-router";
import { useAuth } from "../../../Services/Context/AuthContext";

const ClientHeader = () => {
  const [toggleMenu, setToggleMenu] = useState(false);
  const { user, logout } = useAuth();

  return (
      <header>
        <Link to={"/"} className="logo">
          Car Rental Services
        </Link>
        <nav>
          <ul>
            <li>
              <Link to={"/"}>Home</Link>
            </li>
            <li>
              <Link to={"/cars"}>Cars</Link>
            </li>
            {user == null && <>
              <li>
              <Link to={"/login"}>
                Login
              </Link>
            </li>
            <li>
              <Link to={"/register"}>
                Register
              </Link>
            </li>
            </>}
          </ul>
        </nav>
        <div>
          {user && (<>
            <div
              className="user-profile"
              onClick={() => setToggleMenu(!toggleMenu)}
            >
              <img src={user.profileImage} alt={user.name} title={user.name} />
              <ul className={`user-content ${toggleMenu ? "active" : "inactive"}`}>
                <li>
                  <Link to={"/user"}>
                    User
                  </Link>
                </li>
                <li>
                  <Link to={"/"}>
                    <button onClick={() => { logout() }}>
                      LogOut
                    </button>
                  </Link>
                </li>
              </ul>
            </div>
          </>)}
        </div>
      </header>
  );
};

export default ClientHeader;