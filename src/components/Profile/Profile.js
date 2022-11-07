import React from "react";
import "./Profile.css";

function Profile(props) {
  return (
    <div className="profile">
      <h2 className="profile__header">Привет, Виталий!</h2>
      <div className="profile__container">
        <div className="profile__container-line">
          <p className="profile__field">Имя</p>
          <p className="profile__data">Виталий</p>
        </div>
        <div className="profile__container-line">
          <p className="profile__field">E-mail</p>
          <p className="profile__data">pochta@yandex.ru</p>
        </div>
      </div>
      <div className="profile__buttons">
        <button className="profile__button-edit" type="submit">
          Редактировать
        </button>
        <button className="profile__button-exit" type="submit">
          Выйти из аккаунта
        </button>
      </div>
    </div>
  );
}

export default Profile;
