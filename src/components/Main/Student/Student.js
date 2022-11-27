import React from "react";
import "./Student.css";
import photo from "../../../images/portfolio.jpg";
import arrow from "../../../images/arrow.svg";

function Student(props) {
  return (
    <section className="student">
      <h2 className="student__header">Студент</h2>
      <div className="student__container">
        <div className="student__description">
          <h3 className="student__title">Есения</h3>
          <p className="student__caption">Фронтенд-разработчица, 23 года</p>
          <p className="student__about">
            Я родилась в Магнитогорске, закончив факультет биологии КФУ,
            вернулась в родной город. Я люблю искусство и изучать что-то новое,
            а недавно начала кодить. Во время прохождения курса по
            веб-разработке начала работать в it-компании, разрабатываюшей
            програмное обеспечение для банков.
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
