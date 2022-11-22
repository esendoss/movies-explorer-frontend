import React, { useEffect, useState } from "react";
import MoviesCard from "../MoviesCard/MoviesCard";
import "./MoviesCardList.css";
import { useLocation } from "react-router-dom";
import useScreen from "../../../hooks/useScreen";

const desktop = { width: 950, item: { total: 12, add: 3 } };
const tablet = { width: 650, item: { total: 8, add: 2 } };
const mobile = { width: 650, item: { total: 5, add: 2 } };

function MoviesCardList(props) {
  const windowWidth = useScreen();
  const loc = useLocation();

  const [isMount, setIsMount] = useState(true);
  const [appearMovies, setAppearMovies] = useState([]); // показать карточки

  const [amountCards, setAmountCards] = useState({
    total: 12,
    add: 3,
  });

  // зависимость кол-ва карточек от ширины экрана
  useEffect(() => {
    if (loc.pathname === "/movies") {
      if (windowWidth > desktop.width) {
        setAmountCards(desktop.item);
      } else if (windowWidth <= desktop.width && windowWidth > mobile.width) {
        setAmountCards(tablet.item);
      } else {
        setAmountCards(mobile.item);
      }
      return () => setIsMount(false);
    }
  }, [windowWidth, isMount, desktop, tablet, mobile, loc.pathname]);

  useEffect(() => {
    if (props.allMovies.length) {
      const res = props.allMovies.filter((item, i) => i < amountCards.total);
      setAppearMovies(res);
    }
  }, [props.allMovies, amountCards.total]);

  /* функция работы кнопки "еще" */
  function showMore() {
    const all = appearMovies.length + amountCards.add;
    const extraCards = props.allMovies.length - appearMovies.length;
    if (extraCards > 0) {
      const newFilms = props.allMovies.slice(appearMovies.length, all);
      setAppearMovies([...appearMovies, ...newFilms]);
    }
  }
  // функция cравнения сохраненных фильмов
  function getSavedMovieCard(array, movie) {
    return array.find((item) => {
      return item.movieId === (movie.id || movie.movieId);
    });
  }
  return (
    <>
      <ul className="movies-list">
        {appearMovies.map((movie) => (
          <MoviesCard
            key={movie.id || movie._id}
            savedFilms={getSavedMovieCard(props.saveMovies, movie)}
            onSaveClick={props.onSaveClick}
            onDeleteClick={props.onDeleteClick}
            film={movie}
          />
        ))}
      </ul>
      <section className="more">
        {loc.pathname === "/movies" &&
          appearMovies.length >= 5 &&
          appearMovies.length < props.allMovies.length && (
            <button className="more__button" type="submit" onClick={showMore}>
              Еще
            </button>
          )}
      </section>
    </>
  );
}

export default MoviesCardList;
