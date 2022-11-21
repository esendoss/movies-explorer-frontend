import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import "./Register.css";
import logo from "../../images/logo.svg";

function Register(props) {
  const [name, setName] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [password, setPassword] = useState("");

  function handleNameChange(e) {
    setName(e.target.value);
  }
  function handleEmailChange(e) {
    setUserEmail(e.target.value);
  }
  function handlePasswordChange(e) {
    setPassword(e.target.value);
  }

  const [successMsg, setSuccessMsg] = useState("");

  const {
    register,
    //handleSubmit,
    formState: { errors, isValid },
    reset,
  } = useForm({
    mode: "onBlur",
  });

  function onSubmit(e) {
    e.preventDefault();
    setSuccessMsg("Вы успешно зарегестрированы!");
    props.onRegister(name, userEmail, password);
    reset();
  }
  return (
    <div className="register">
      <img className="register__img" src={logo} alt="Лого"></img>
      <h2 className="register__header">Добро пожаловать!</h2>
      <form className="register__form" onSubmit={onSubmit} noValidate>
        {successMsg && <p className="register__message">{successMsg}</p>}

        <label className="register__label">Имя</label>
        <input
          className="register__input"
          name="name"
          value={name}
          type="text"
          {...register("username", {
            required: "Введите имя пользователя",
            pattern: {
              validate: /[A-Za-zА-Яа-яЁё /s -]/,
              message:
                "Имя может содержать только латиницу, кириллицу, пробел или дефис",
            },
            validate: {
              checkLength: (value) => value.length >= 2 && value.length < 30,
            },
          })}
          onChange={handleNameChange}
        />
        {errors.username && (
          <p className="register__error-message">{errors.username.message}</p>
        )}
        {errors.username?.type === "checkLength" && (
          <p className="register__error-message">
            Имя должно содержать от 2 до 30 символов.
          </p>
        )}

        <label className="register__label">E-mail</label>
        <input
          className="register__input"
          name="email"
          value={userEmail}
          type="email"
          {...register("email", {
            required: "Введите email.",
            pattern: {
              value: /^[^@ ]+@[^@ ]+\.[^@ .]{2,}$/,
              message: "Введите неверный формат email",
            },
          })}
          onChange={handleEmailChange}
        />
        {errors.email && (
          <p className="register__error-message">{errors.email.message}</p>
        )}

        <label className="register__label">Пароль</label>
        <input
          className="register__input"
          name="password"
          value={password}
          type="password"
          {...register("password", {
            required: true,
            validate: {
              checkLength: (value) => value.length >= 8,
            },
          })}
          onChange={handlePasswordChange}
        />
        {errors.password?.type === "required" && (
          <p className="register__error-message">Введите пароль.</p>
        )}
        {errors.password?.type === "checkLength" && (
          <p className="register__error-message">
            Пароль должен содержать минимум 8 символов.
          </p>
        )}

        <button className="register__button" type="submit" disabled={!isValid}>
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
