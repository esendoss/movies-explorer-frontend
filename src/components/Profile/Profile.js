import React, { useState, useEffect } from "react";
import "./Profile.css";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import { Link } from "react-router-dom";
import useValidateForm from "../../hooks/useValidateForm";

function Profile(props) {
  const { values, errors, isValid, handleChange, handleSubmit, resetForm } =
    useValidateForm(props.onUpdateUser);

  const currentUser = React.useContext(CurrentUserContext);

  useEffect(() => {
    if (currentUser) {
      resetForm(currentUser, {}, true);
    }
  }, [currentUser, resetForm]);

  const validation =
    !isValid ||
    (currentUser.name === values.name && currentUser.email === values.email);

  return (
    <div className="profile">
      <h2 className="profile__header">Привет, {currentUser.name}!</h2>
      <form className="profile__container" onSubmit={handleSubmit}>
        <div className="profile__container-line">
          <label className="profile__field" htmlFor="name">
            Имя
          </label>
          <input
            type="text"
            className="profile__data"
            name="name"
            id="name"
            minLength="2"
            maxLength="30"
            onChange={handleChange}
            value={values.name || ""}
            autoComplete="off"
          />
        </div>
        <div className="profile__container-line">
          <label className="profile__field" htmlFor="email">
            E-mail
          </label>
          <input
            type="email"
            className="profile__data"
            id="email"
            name="email"
            onChange={handleChange}
            value={values.email || ""}
            autoComplete="off"
            minLength="2"
            maxLength="30"
          />
        </div>
        {errors.email && (
          <p className="profile__error-message">{errors.email}</p>
        )}
        {errors.name && <p className="profile__error-message">{errors.name}</p>}
        <button
          className={`profile__button-save ${
            validation ? "profile__button-save_disabled" : ""
          }`}
          type="submit"
          disabled={validation ? true : false}
        >
          Сохранить
        </button>
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
