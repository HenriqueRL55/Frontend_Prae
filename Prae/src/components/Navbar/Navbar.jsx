import React, { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import "./Navbar.css";
import logoImg from "../../images/logo.png";
import { GrLogout } from "react-icons/gr";
import { HiOutlineMenuAlt3 } from "react-icons/hi";

const Navbar = () => {
  const [toggleMenu, setToggleMenu] = useState(false);
  const navigate = useNavigate();
  const handleNavbar = () => setToggleMenu(!toggleMenu);
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")));
  const location = useLocation();
  const currentPath = location.pathname;

  const handleLogout = () => {
    localStorage.removeItem("token");
    setUser(null);
    navigate("/");
  };

  const favoritesLink = user.type === 1 ? "/favoritesAdmin" : "/favorites";

  return (
    <>
      <nav className="navbar" id="navbar">
        <div className="container navbar-content flex">
          <div className="brand-and-toggler flex flex-sb">
            <div to="/" className="navbar-brand flex">
              <img src={logoImg} alt="site logo" />
              <span className="text-uppercase fw-7 fs-24 ls-1">SATIE</span>
            </div>
            <button
              type="button"
              className="navbar-toggler-btn"
              onClick={handleNavbar}
            >
              <HiOutlineMenuAlt3
                size={35}
                style={{
                  color: `${toggleMenu ? "#fff" : "#010101"}`,
                }}
              />
            </button>
          </div>
          <div
            className={
              toggleMenu
                ? "navbar-collapse show-navbar-collapse"
                : "navbar-collapse"
            }
          >
            <ul className="navbar-nav">
              <li className="nav-item">
                <Link
                  to="/book"
                  className={`nav-link text-uppercase text-white fs-22 fw-6 ls-1 ${
                    currentPath === "/book" ? "active" : ""
                  }`}
                >
                  Acervo
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  to="/about"
                  className={`nav-link text-uppercase text-white fs-22 fw-6 ls-1 ${
                    currentPath === "/about" ? "active" : ""
                  }`}
                >
                  Sobre
                </Link>
              </li>
              {user.type === 1 && (
                <li className="nav-item">
                  <Link
                    to="/crudBook"
                    className={`nav-link text-uppercase text-white fs-22 fw-6 ls-1 ${
                      currentPath === "/crudBook" ? "active" : ""
                    }`}
                  >
                    Cadastro
                  </Link>
                </li>
              )}
              <li className="nav-item">
                <Link
                  to={favoritesLink}
                  className={`nav-link text-uppercase text-white fs-22 fw-6 ls-1 ${
                    currentPath === favoritesLink ? "active" : ""
                  }`}
                >
                  Interesses
                </Link>
              </li>
              <li className="nav-item">
                <button
                  className="nav-link logoutIcon text-uppercase text-white fs-22 fw-6 ls-1"
                  onClick={handleLogout}
                >
                  <GrLogout />
                </button>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
