import React from "react";
import "./MoviesCard.css";
import save from "../../../images/save.svg";
import film from "../../../images/film.png";

function MoviesCard(props) {
  return (
    <li className="movies-card">
      <div className="movies-card__container">
        <div className="movies-card__about">
          <h3 className="movies-card__title">33 слова о дизайне</h3>
          <p className="movies-card__duration">1ч 47м</p>
        </div>
        <button className="movies-card__save-button">
          <img src={save} alt="Сохранить" />
        </button>
      </div>
      <img className="movies-card__img" src={film} alt="film"></img>
    </li>
  );
}

export default MoviesCard;
/*
 <li className="movies-card">
            <div className="movies-card__container">
                <div className="movies-card__about">
                    <h3 className="movies-card__title">{props.movie.nameRU}</h3>
                    <p className="movies-card__duration">{props.movie.duration}</p>
                </div>
                <button className="movies-card__save-button">
                    <img src={save} alt="Сохранить" />
                </button>
            </div>
            <img className="movies-card__img" src={props.movie.image} alt={props.nameRU}></img>
        </li>
*/
