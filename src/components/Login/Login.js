import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import "./Login.css";
import logo from "../../images/logo.svg";
import useValidateForm from "../../hooks/useValidateForm";

function Login(props) {
  const { values, errors, isValid, resetForm, handleSubmit, handleChange } =
    useValidateForm(props.onAuthorize);

  useEffect(() => {
    resetForm();
  }, [resetForm]);

  return (
    <div className="login">
      <Link to="/">
        <img className="login__img" src={logo} alt="Логотип" />
      </Link>
      <h2 className="login__header">Рады видеть!</h2>
      <form className="login__form" onSubmit={handleSubmit} noValidate>
        <label className="login__label">E-mail</label>
        <input
          className="login__input"
          name="email"
          type="email"
          autoComplete="off"
          minLength="2"
          maxLength="30"
          onChange={handleChange}
          value={values.email || ""}
          required
        />
        {errors.email && <p className="login__error-message">{errors.email}</p>}
        <label className="login__label">Пароль</label>
        <input
          className="login__input"
          name="password"
          type="password"
          autoComplete="off"
          minLength="8"
          onChange={handleChange}
          value={values.password || ""}
          required
        />
        {errors.password && (
          <p className="login__error-message">{errors.password}</p>
        )}
        <button
          className={isValid ? "login__button" : "login__button login__button_disabled"} 
          type="submit"
          onClick={handleSubmit}
          disabled={!isValid}
        >
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
