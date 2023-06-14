import React from "react";
import "./Header.css";
import "../../index.css";
import "../NavBar/NavBar.css";

import { Link, NavLink, useLocation } from "react-router-dom";

import logo from "../../images/logo.svg";
import icon from "../../images/icon.svg";
import menu from "../../images/menu.svg";
import exit from "../../images/exit.svg";

function Header({ userEmail }) {
  const location = useLocation();
  const project = location.pathname === "/";

  // открытие меню
  function handleOnClickMenu() {
    document
      .querySelector(".header-nav__menu")
      .classList.add("header-nav__menu_hidden");
    document.querySelector(".nav-bar").classList.add("nav-bar_active");
    document
      .querySelector(".nav-bar__menu")
      .classList.add("nav-bar__menu_open");
  }
  // закрытие меню
  function handleCloseNavBar() {
    document
      .querySelector(".header-nav__menu")
      .classList.remove("header-nav__menu_hidden");
    document.querySelector(".nav-bar").classList.remove("nav-bar_active");
    document
      .querySelector(".nav-bar__menu")
      .classList.remove("nav-bar__menu_open");
  }

  return (
    <header className={project ? "header header_profile" : "header__movies"}>
      {project ? (
        <div className="header-nav page__borders">
          <Link to="/">
            <img className="header__logo" src={logo} alt="Логотип" />
          </Link>
          {userEmail ? (
            <div className="header-nav__container">
              <div className="header-nav__links">
                <NavLink  to="/movies" className="header-nav__link">
                  Фильмы
                </NavLink>
                <NavLink  to="/saved-movies" className="header-nav__link">
                  Сохранённые фильмы
                </NavLink>
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
              <NavLink  to="/movies" className="header-nav__link">
                Фильмы
              </NavLink>
              <NavLink  to="/saved-movies" className="header-nav__link">
                Сохранённые фильмы
              </NavLink>
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
          <button className="header-nav__menu" onClick={handleOnClickMenu}>
            <img
              className="header-nav__menu-img"
              src={menu}
              alt="Меню"
              type="button"
            />
          </button>
          <div className="nav-bar">
            <div className="nav-bar__menu">
              <div className="nav-bar__container">
                <div className="nav-bar__box">
                  <Link className="nav-bar__link header-nav__link" to="/">
                    Главная
                  </Link>
                  <Link
                    to="/movies"
                    className="nav-bar__link header-nav__link"
                    onClick={handleCloseNavBar}
                  >
                    Фильмы
                  </Link>
                  <Link
                    to="/saved-movies"
                    className="nav-bar__link header-nav__link"
                    onClick={handleCloseNavBar}
                  >
                    Сохранённые фильмы
                  </Link>
                </div>
                <Link
                  to="/profile"
                  className="header-nav__profile"
                  onClick={handleCloseNavBar}
                >
                  Аккаунт
                  <img
                    className="navigation__profile-img"
                    src={icon}
                    alt="Профиль"
                  />
                </Link>
                <button
                  className="nav-bar__exit"
                  type="button"
                  onClick={handleCloseNavBar}
                >
                  <img className="nav-bar__exit-img" src={exit} alt="Выход" />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}

export default Header;
