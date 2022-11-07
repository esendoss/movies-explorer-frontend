import React from "react";
import { Link } from "react-router-dom";
import "./Register.css";
import logo from "../../images/logo.svg";

function Register(props) {
  return (
    <div className="register">
      <img className="register__img" src={logo} alt="Лого"></img>
      <h2 className="register__header">Добро пожаловать!</h2>
      <form className="register__form">
        <label className="register__label">Имя</label>
        <input className="register__input" name="email" type="email" required />
        <label className="register__label">E-mail</label>
        <input className="register__input" name="email" type="email" required />
        <label className="register__label">Пароль</label>
        <input
          className="register__input"
          name="password"
          type="password"
          required
        />
        <button className="register__button" type="submit">
          Зарегистрироваться
        </button>
      </form>
      <p className="register__caption">
        Уже зарегистрированы?
        <Link to="/signin" className="register__link">
          {" "}
          Войти
        </Link>
      </p>
    </div>
  );
}

export default Register;
