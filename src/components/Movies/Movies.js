import React, { useState, useEffect } from "react";
import SearchForm from "./SearchForm/SearchForm";
import MoviesCardList from "./MoviesCardList/MoviesCardList";
import moviesApi from "../../utils/MoviesApi";
import Preloader from "../Preloader/Preloader";
import "./Movies.css";
import "../../index.css";

import { CurrentUserContext } from "../../contexts/CurrentUserContext";

function Movies(props) {
  const currentUser = React.useContext(CurrentUserContext);
  console.log(currentUser);

  const [allMovies, setAllMovies] = useState([]); //все фильмы
  const [searchedMovies, setSearchedMovies] = useState([]); // запрашиваемые фильмы
  const [filteredMovies, setFilteredMovies] = useState([]); // отфильтрованные
  const [shortMovies, setShortMovies] = useState(false); // короткометражки

  // получаем все фильмы -> отфильтровывам по запросу -> проверяем состояние кнопки короткометражек

  /* функция на проверку длительности фильма (является ли фильм короткометражкой) */
  function handleDurationCheck(movies) {
    return movies.filter((movie) => movie.duration < 40);
  }

  /* функция проверки состояния чекбокса */
  function handleCheckboxState() {
    setShortMovies(!shortMovies);
    if (!shortMovies) {
      setFilteredMovies(handleDurationCheck(searchedMovies));
    } else {
      setFilteredMovies(searchedMovies);
    }
    localStorage.setItem(`${currentUser.email} - shortMovies`, !shortMovies);
  }

  /* функция фильтрации запроса */
  function filterFilms(movies, inputMovie, shortMovie) {
    const searchedFilm = movies.filter((movie) => {
      const film = inputMovie.toLowerCase().trim();
      const rus = String(movie.nameRU).toLowerCase().trim(); //поиск фильмов на русском без учета регистра
      const eng = String(movie.nameEN).toLowerCase().trim(); //поиск фильмов на английском без учета регистра

      return rus.indexOf(film) !== -1 || eng.indexOf(film) !== -1;
    });

    if (shortMovie) {
      return handleDurationCheck(searchedFilm);
    } else {
      return searchedFilm;
    }
  }

  /* функция преобразования языка и изображения карточек */
  function convertCards(items) {
    items.forEach((movie) => {
      if (!movie.image) {
        movie.image =
          "https://images.unsplash.com/photo-1598899134739-24c46f58b8c0?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=856&q=80";
        movie.thumbnail =
          "https://images.unsplash.com/photo-1598899134739-24c46f58b8c0?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=856&q=80";
      } else {
        movie.thumbnail = `https://api.nomoreparties.co${movie.image.formats.thumbnail.url}`;
        movie.image = `https://api.nomoreparties.co${movie.image.url}`;
      }
      if (!movie.country) {
        movie.country = "Russia";
      }
      if (!movie.nameEN) {
        movie.nameEN = movie.nameRU;
      }
    });
    return items;
  }
  // фильтруем фильмы
  function handleSetFilteredMovies(movies, inputMovie, shortMovie) {
    // переменная отфильтрованных фильмов
    const searchedFilms = filterFilms(movies, inputMovie, shortMovie);
    // если фильм не найден -> открывается попап с оповещением
    if (searchedFilms.length === 0) {
      props.handleInfoTooltip("Ничего не найдено");
    }
    // найденные отфильтрованые фильмы
    setSearchedMovies(searchedFilms);
    setFilteredMovies(
      shortMovie ? handleDurationCheck(searchedFilms) : searchedFilms
    );
    localStorage.setItem(
      `${currentUser.email} - movies`,
      JSON.stringify(searchedFilms)
    );
  }
  //функция получения фильма по запросу
  function handleSearchMovies(value) {
    localStorage.setItem(`${currentUser.email} - findMovie`, value);
    localStorage.setItem(`${currentUser.email} - shortMovies`, shortMovies);
    if (allMovies.length === 0) {
      props.setPreloader(true);
      moviesApi
        .getMovies()
        .then((items) => {
          setAllMovies(items);
          handleSetFilteredMovies(convertCards(items), value, shortMovies);
        })
        .catch((err) =>
        props.handleInfoTooltip("Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз.")
      )
        .finally(() => props.setPreloader(false));
    } else {
      handleSetFilteredMovies(allMovies, value, shortMovies);
    }
  }

  // проверка чекбокса в local storage
  useEffect(() => {
    if (localStorage.getItem(`${currentUser.email} - shortMovies`) === "true") {
      setShortMovies(true);
    } else {
      setShortMovies(false);
    }
  }, [currentUser]);

  // рендер фильмов из local storage
  useEffect(() => {
    if (localStorage.getItem(`${currentUser.email} - movies`)) {
      const movies = JSON.parse(
        localStorage.getItem(`${currentUser.email} - movies`)
      );
      setSearchedMovies(movies);
      if (
        localStorage.getItem(`${currentUser.email} - shortMovies`) === "true"
      ) {
        setFilteredMovies(handleDurationCheck(movies));
      } else {
        setFilteredMovies(movies);
      }
    }
  }, [currentUser]);

  return (
    <section className="movies page__borders">
      <SearchForm
        filterFilms={filterFilms}
        handleCheckboxState={handleCheckboxState}
        shortMovies={shortMovies}
        handleSearchMovies={handleSearchMovies}
      />
      {props.preloader ? (
        <Preloader />
      ) : (
        <MoviesCardList
          allMovies={filteredMovies}
          saveMovies={props.saveMovies}
          onSaveClick={props.onSaveClick}
          onDeleteClick={props.onDeleteClick}
        />
      )}
    </section>
  );
}

export default Movies;
