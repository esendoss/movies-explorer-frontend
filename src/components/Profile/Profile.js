import React, { useState, useEffect } from "react";
import "./Profile.css";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";

function Profile(props) {
  const currentUser = React.useContext(CurrentUserContext);
  const [name, setName] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [readOnly, setReadOnly] = useState(true);
  
  useEffect(() => {
    setName(currentUser.name);
    setUserEmail(currentUser.email);
  }, [currentUser]);
  function handleNameChange(e) {
    setName(e.target.value);
  }
  function handleEmailChange(e) {
    setUserEmail(e.target.value);
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
    props.onUpdateUser({
      name: name,
      email: userEmail,
    });
    console.log(e);
    setReadOnly(true);
    reset();
  }
  useEffect(() => {
    setReadOnly(true);
  }, []);

  function handleClickEdit(e) {
    e.preventDefault();
    setReadOnly(false);
  }
  console.log(currentUser);

  return (
    <div className="profile">
      <h2 className="profile__header">Привет, {currentUser.name}!</h2>
      <form className="profile__container" onSubmit={onSubmit}>
        <div className="profile__container-line">
          <label className="profile__field" htmlFor="name">
            Имя
          </label>
          <input
            type="text"
            readOnly={readOnly}
            className="profile__data"
            name="name"
            id="name"
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
            value={name ? name : ""}
          />
        </div>
        <div className="profile__container-line">
          <label className="profile__field" htmlFor="email">
            E-mail
          </label>
          <input
            type="email"
            readOnly={readOnly}
            className="profile__data"
            id="email"
            name="email"
            {...register("email", {
              required: "Введите email.",
              pattern: {
                value: /^[^@ ]+@[^@ ]+\.[^@ .]{2,}$/,
                message: "Введите неверный формат email",
              },
            })}
            onChange={handleEmailChange}
            value={userEmail ? userEmail : ""}
          />
        </div>
        {errors.username && (
          <p className="profile__error-message">{errors.username.message}</p>
        )}
        {errors.username?.type === "checkLength" && (
          <p className="profile__error-message">
            Имя должно содержать от 2 до 30 символов.
          </p>
        )}
        {errors.email && (
          <p className="profile__error-message">{errors.email.message}</p>
        )}
        {!readOnly ? (
          <button
            className="profile__button-save"
            type="submit"
            disabled={!isValid}
          >
            Сохранить
          </button>
        ) : (
          <button
            className="profile__button-edit"
            type="submit"
            onClick={handleClickEdit}
          >
            Редактировать
          </button>
        )}
      </form>
      <Link
        className="profile__button-exit"
        to="/"
        onClick={props.handleSignOut}
      >
        Выйти из аккаунта
      </Link>
    </div>
  );
}

export default Profile;
