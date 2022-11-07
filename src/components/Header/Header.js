import React from "react";
import "./Header.css";
import "../../index.css";
import { Link, useLocation } from "react-router-dom";

import logo from "../../images/logo.svg";
import icon from "../../images/icon.svg";
import menu from "../../images/menu.svg";
import NavBar from "../NavBar/NavBar";

function Header(props) {
  const location = useLocation();
  const project = location.pathname === "/";

  return (
    <header className={project ? "header header_profile" : "header__movies"}>
      {project ? (
        <div className="header-nav page__borders">
          <Link to="/">
            <img className="header__logo" src={logo} alt="Логотип" />
          </Link>
          {props.loggedIn ? (
            <div className="header-nav__container">
              <div className="header-nav__links">
                <Link to="/movies" className="header-nav__link">
                  Фильмы
                </Link>
                <Link to="/saved-movies" className="header-nav__link">
                  Сохранённые фильмы
                </Link>
              </div>
              <Link
                to="/profile"
                className="header-nav__link header-nav__profile"
              >
                Аккаунт
                <img
                  className="header-nav__profile-img"
                  src={icon}
                  alt="Профиль"
                />
              </Link>
            </div>
          ) : (
            <div>
              <Link
                to="/signup"
                className="header-nav__link header-nav__link-registration"
              >
                Регистрация
              </Link>
              <Link
                to="/signin"
                className="header-nav__link header-nav__link-entrance"
              >
                Войти
              </Link>
            </div>
          )}
        </div>
      ) : (
        <div className="header-nav page__borders">
          <Link to="/">
            <img className="header__logo" src={logo} alt="Логотип" />
          </Link>
          <div className="header-nav__container">
            <div className="header-nav__links">
              <Link to="/movies" className="header-nav__link">
                Фильмы
              </Link>
              <Link to="/saved-movies" className="header-nav__link">
                Сохранённые фильмы
              </Link>
            </div>
            <Link
              to="/profile"
              className="header-nav__link header-nav__profile"
            >
              Аккаунт
              <img
                className="header-nav__profile-img"
                src={icon}
                alt="Профиль"
              />
            </Link>
          </div>
          <button className="header-nav__menu">
            <img className="header-nav__menu-img" src={menu} alt="Меню" />
          </button>
          <NavBar />
        </div>
      )}
    </header>
  );
}

export default Header;
