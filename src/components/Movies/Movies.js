import React, { useState, useEffect } from "react";
import SearchForm from "./SearchForm/SearchForm";
import MoviesCardList from "./MoviesCardList/MoviesCardList";
import moviesApi from "../../utils/MoviesApi";
import Preloader from "../Preloader/Preloader";
import "./Movies.css";
import "../../index.css";
import {
  handleDurationCheck,
  filterFilms,
  convertCards,
} from "../../utils/constants";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";

function Movies(props) {
  const currentUser = React.useContext(CurrentUserContext);

  const [allMovies, setAllMovies] = useState([]); //все фильмы
  const [searchedMovies, setSearchedMovies] = useState([]); // запрашиваемые фильмы
  const [filteredMovies, setFilteredMovies] = useState([]); // отфильтрованные
  const [shortMovies, setShortMovies] = useState(false); // короткометражки

  // получаем все фильмы -> отфильтровывам по запросу -> проверяем состояние кнопки короткометражек

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
        .catch(() =>
          props.handleInfoTooltip(
            "Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз."
          )
        )
        .finally(() => props.setPreloader(false));
    } else {
      handleSetFilteredMovies(allMovies, value, shortMovies);
    }
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
