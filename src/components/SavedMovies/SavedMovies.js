import React, { useState, useEffect } from "react";
import SearchForm from "../Movies/SearchForm/SearchForm";
import MoviesCardList from "../Movies/MoviesCardList/MoviesCardList";
import Preloader from "../Preloader/Preloader";

import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import "../Movies/Movies.css";
import "../../index.css";
import { handleDurationCheck, filterFilms } from "../../utils/constants";

function SavedMovies(props) {
  const currentUser = React.useContext(CurrentUserContext);

  const [appearedMovies, setAppearedMovies] = useState(props.saveMovies); // показываемые фильмы
  const [filteredMovies, setFilteredMovies] = useState(appearedMovies); // отфильтрованные
  const [shortMovies, setShortMovies] = useState(false); // короткометражки
  // поиск по запросу
  function handleSearchMovies(value) {
    const searchedFilms = filterFilms(props.saveMovies, value, shortMovies);
    if (searchedFilms.length === 0) {
      props.handleInfoTooltip("Ничего не найдено");
    } else {
      setFilteredMovies(searchedFilms);
      setAppearedMovies(searchedFilms);
    }
  }

  function handleCheckboxState() {
    if (!shortMovies) {
      setShortMovies(true);
      console.log(setShortMovies)
      localStorage.setItem(`${currentUser.email} - shortSavedMovies`, true);
      setAppearedMovies(handleDurationCheck(filteredMovies));
    } else {
      setShortMovies(false);
      localStorage.setItem(`${currentUser.email} - shortSavedMovies`, false);
      setAppearedMovies(filteredMovies);
    }
  }
 // console.log(handleCheckboxState)
  /* функция проверки состояния чекбокса в local storage*/
  useEffect(() => {
    if (
      localStorage.getItem(`${currentUser.email} - shortSavedMovies`) === "true"
    ) {
      setShortMovies(true);
      setAppearedMovies(handleDurationCheck(props.saveMovies));
    } else {
      setShortMovies(false);
      setAppearedMovies(props.saveMovies);
    }
  }, [props.saveMovies, currentUser]);

  useEffect(() => {
    setFilteredMovies(props.saveMovies);
    console.log(setFilteredMovies);
  }, [props.saveMovies]);

  return (
    <section className="movies page__borders">
      <SearchForm
        filterFilms={filterFilms}
        handleSearchMovies={handleSearchMovies}
        handleCheckboxState={handleCheckboxState}
        shortMovies={shortMovies}
      />
      {props.preloader ? (
        <Preloader />
      ) : (
        <MoviesCardList
          allMovies={appearedMovies}
          saveMovies={props.saveMovies}
          onDeleteClick={props.onDeleteClick}
        />
      )}
    </section>
  );
}

export default SavedMovies;
