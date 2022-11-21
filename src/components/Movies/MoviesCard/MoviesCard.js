import React from "react";
import { useLocation } from "react-router-dom";
import "./MoviesCard.css";

function MoviesCard({ film, savedFilms, onSaveClick, onDeleteClick }) {
  const location = useLocation();
  // функция преобразования продолжительности фильма
  function duration(time) {
    const hours = Math.trunc(time / 60);
    const minutes = time % 60;
    if (hours === 0) {
      return `${minutes}м`;
    } else {
      return `${hours}ч ${minutes}м`;
    }
  }
  // сохранение фильма
  function handleSaveClick() {
    onSaveClick(film);
  }

  // удаление фильма
  function handleDeleteClick() {
    onDeleteClick(film);
  }

  return (
    <li className="movies-card">
      <div className="movies-card__container">
        <div className="movies-card__about">
          <h3 className="movies-card__title">{film.nameRU}</h3>
          <p className="movies-card__duration">{duration(film.duration)}</p>
        </div>
        {location.pathname === "/movies" && (
          <button
            className={`movies-card__save-button${savedFilms ? "_active" : ""}`}
            type="button"
            onClick={savedFilms ? handleDeleteClick : handleSaveClick}
          ></button>
        )}
        {location.pathname === "/saved-movies" && (
          <button
            className="movies-card__save-button_active"
            type="button"
            onClick={handleDeleteClick}
          ></button>
        )}
      </div>
      <a
        className="movies-card__img-link"
        href={film.trailerLink}
        target="_blank"
        rel="noopener noreferrer"
      >
        <img className="movies-card__img" src={film.image} alt={film.nameRU} />
      </a>
    </li>
  );
}

export default MoviesCard;
