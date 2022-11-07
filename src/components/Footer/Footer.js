import React from "react";
import "../../index.css";
import "../Footer/Footer.css";

function Footer() {
  return (
    <footer className="footer page__borders">
      <h4 className="footer__caption">
        Учебный проект Яндекс.Практикум х BeatFilm.
      </h4>
      <div className="footer__container">
        <p className="footer__year">&copy; 2022</p>
        <div className="footer__links">
          <a className="footer__link" href="https://practicum.yandex.ru">
            Яндекс.Практикум
          </a>
          <a
            className="footer__link"
            href="https://github.com/esendoss/movies-explorer-frontend"
          >
            Github
          </a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
