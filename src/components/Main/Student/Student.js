import React from "react";
import "./Student.css";
import photo from "../../../images/photo.png";
import arrow from "../../../images/arrow.svg";

function Student(props) {
  return (
    <section className="student">
      <h2 className="student__header">Студент</h2>
      <div className="student__container">
        <div className="student__description">
          <h3 className="student__title">Есения</h3>
          <p className="student__caption">Фронтенд-разработчик, 23 года</p>
          <p className="student__about">
            Я родился и живу в Саратове, закончил факультет экономики СГУ. У
            меня есть жена и дочь. Я люблю слушать музыку, а ещё увлекаюсь
            бегом. Недавно начал кодить. С 2015 года работал в компании «СКБ
            Контур». После того, как прошёл курс по веб-разработке, начал
            заниматься фриланс-заказами и ушёл с постоянной работы.
          </p>
          <a
            className="student__github"
            href="https://github.com/esendoss"
            target="_blank"
            rel="noreferrer"
          >
            Github
          </a>
        </div>
        <img className="student__photo" src={photo} alt="Фото студента" />
      </div>
      <h4 className="student__subtitle">Портфолио</h4>
      <div className="student__links">
        <a
          className="student__link"
          href="https://github.com/esendoss/how-to-learn"
          target="_blank"
          rel="noreferrer"
        >
          Статичный сайт
          <img className="student__arrow" src={arrow} alt="Стрелка" />
        </a>
        <a
          className="student__link"
          href="https://github.com/esendoss/russian-travel"
          target="_blank"
          rel="noreferrer"
        >
          Адаптивный сайт
          <img className="student__arrow" src={arrow} alt="Стрелка" />
        </a>
        <a
          className="student__link"
          href="https://github.com/esendoss/react-mesto-auth"
          target="_blank"
          rel="noreferrer"
        >
          Одностраничное приложение
          <img className="student__arrow" src={arrow} alt="Стрелка" />
        </a>
      </div>
    </section>
  );
}

export default Student;
