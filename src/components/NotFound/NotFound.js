import React from "react";
import "./NotFound.css";
import { Link } from "react-router-dom";

function NotFound(props) {
  return (
    <section className="error">
      <div className="error__container">
        <h1 className="error__title">404</h1>
        <p className="error__subtitle">Страница не найдена</p>
        <Link className="error__link" to="/">
          Назад
        </Link>
      </div>
    </section>
  );
}

export default NotFound;
