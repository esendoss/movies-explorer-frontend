import React from "react";
import { Link } from "react-router-dom";
import "./Login.css";
import logo from "../../images/logo.svg";

function Login(props) {
  return (
    <div className="login">
      <img className="login__img" src={logo} alt="Лого"></img>
      <h2 className="login__header">Рады видеть!</h2>
      <form className="login__form">
        <label className="login__label">E-mail</label>
        <input className="login__input" name="email" type="email" required />
        <label className="login__label">Пароль</label>
        <input
          className="login__input"
          name="password"
          type="password"
          required
        />
        <button className="login__button" type="submit">
          Войти
        </button>
      </form>
      <p className="login__caption">
        Ещё не зарегистрированы?
        <Link to="signup" className="login__link">
          {" "}
          Регистрация
        </Link>
      </p>
    </div>
  );
}

export default Login;
