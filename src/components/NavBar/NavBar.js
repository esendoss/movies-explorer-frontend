import React from "react";
import { Link } from "react-router-dom";
import "./NavBar.css";
import icon from "../../images/icon.svg";
import exit from "../../images/exit.svg";

function NavBar(props) {
  return (
    <div className="nav-bar">
      <div className="nav-bar__menu">
        <div className="nav-bar__container">
          <div className="nav-bar__box">
            <Link className="nav-bar__link header-nav__link" to="/">
              Главная
            </Link>
            <Link to="/movies" className="nav-bar__link header-nav__link">
              Фильмы
            </Link>
            <Link to="/saved-movies" className="nav-bar__link header-nav__link">
              Сохранённые фильмы
            </Link>
          </div>
          <Link to="/profile" className="header-nav__profile">
            Аккаунт
            <img className="navigation__profile-img" src={icon} alt="Профиль" />
          </Link>
          <button className="nav-bar__exit" type="button">
            <img className="nav-bar__exit-img" src={exit} alt="Выход" />
          </button>
        </div>
      </div>
    </div>
  );
}

export default NavBar;
