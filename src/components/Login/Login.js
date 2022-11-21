import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import "./Login.css";
import logo from "../../images/logo.svg";

function Login(props) {
  const [userEmail, setUserEmail] = useState("");
  const [password, setPassword] = useState("");

  function handleEmailChange(e) {
    setUserEmail(e.target.value);
  }
  function handlePasswordChange(e) {
    setPassword(e.target.value);
  }

  const {
    register,
    formState: { errors, isValid },
    reset,
  } = useForm({
    mode: "onBlur",
  });
  function onSubmit(e) {
    e.preventDefault();
    props.onAuthorize(userEmail, password);
    console.log(e);
    reset();
  }

  return (
    <div className="login">
      <img className="login__img" src={logo} alt="Лого"></img>
      <h2 className="login__header">Рады видеть!</h2>
      <form className="login__form" onSubmit={onSubmit} noValidate>
        <label className="login__label">E-mail</label>
        <input
          className="login__input"
          name="email"
          type="email"
          {...register("email", {
            required: "Введите email.",
            pattern: {
              value: /^[^@ ]+@[^@ ]+\.[^@ .]{2,}$/,
              message: "Введите неверный формат email",
            },
          })}
          autoComplete="on"
          onChange={handleEmailChange}
        />
        {errors.email && (
          <p className="login__error-message">{errors.email.message}</p>
        )}
        <label className="login__label">Пароль</label>
        <input
          className="login__input"
          name="password"
          type="password"
          {...register("password", {
            required: true,
          })}
          autoComplete="on"
          onChange={handlePasswordChange}
        />
        {errors.password?.type === "required" && (
          <p className="login__error-message">Введите пароль.</p>
        )}
        <button className="login__button" type="submit" disabled={!isValid}>
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
