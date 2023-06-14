import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import "./Register.css";
import logo from "../../images/logo.svg";
import useValidateForm from "../../hooks/useValidateForm";

function Register(props) {
  const { values, errors, isValid, resetForm, handleChange, handleSubmit } =
    useValidateForm(props.onRegister);

  useEffect(() => {
    resetForm();
  }, [resetForm]);

  return (
    <div className="register">
      <Link to="/">
        <img className="register__img" src={logo} alt="Логотип" />
      </Link>
      <h2 className="register__header">Добро пожаловать!</h2>
      <form className="register__form" onSubmit={handleSubmit} noValidate>
        <label className="register__label">Имя</label>
        <input
          className="register__input"
          name="name"
          value={values.name || ""}
          type="text"
          minLength="2"
          maxLength="30"
          pattern="^[A-Za-zА-Яа-яЁё /s -]+$"
          autoComplete="off"
          onChange={handleChange}
          required
        />
        {errors?.name && (
          <p className="register__error-message">{errors.name}</p>
        )}
        <label className="register__label">E-mail</label>
        <input
          className="register__input"
          name="email"
          value={values.email || ""}
          autoComplete="off"
          type="email"
          minLength="2"
          maxLength="30"
          onChange={handleChange}
          required
        />
        {errors.email && (
          <p className="register__error-message">{errors.email}</p>
        )}

        <label className="register__label">Пароль</label>
        <input
          className="register__input"
          name="password"
          value={values.password || ""}
          autoComplete="off"
          type="password"
          onChange={handleChange}
          minLength="8"
          required
        />
        {errors.password && (
          <p className="register__error-message">{errors.password}</p>
        )}

        <button
          className={
            isValid
              ? "register__button"
              : "register__button register__button_disabled"
          }
          type="submit"
          onClick={handleSubmit}
          disabled={!isValid}
        >
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
