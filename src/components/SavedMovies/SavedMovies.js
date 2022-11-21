import React, { useState, useEffect } from "react";
import SearchForm from "../Movies/SearchForm/SearchForm";
import MoviesCardList from "../Movies/MoviesCardList/MoviesCardList";
import Preloader from "../Preloader/Preloader";

import { CurrentUserContext } from "../CurrentUserContext";
import "../Movies/Movies.css";
import "../../index.css";

function SavedMovies({
  preloader,
  saveMovies,
  handleInfoTooltip,
  onDeleteClick,
  filterFilms,
}) {
  const currentUser = React.useContext(CurrentUserContext);

  const [appearedMovies, setAppearedMovies] = useState(saveMovies); // показываемые фильмы
  const [filteredMovies, setFilteredMovies] = useState(appearedMovies); // отфильтрованные
  const [shortMovies, setShortMovies] = useState(false); // короткометражки

  function handleDurationCheck(movies) {
    return movies.filter((movie) => movie.duration < 40);
  }
  // поиск по запросу
  function handleSearchMovie(value) {
    const searchedFilms = filterFilms(saveMovies, value, shortMovies);
    if (searchedFilms.length === 0) {
      handleInfoTooltip({
        isOpen: true,
        tooltipMessage: "Ничего не найдено",
      });
    } else {
      setFilteredMovies(searchedFilms);
      setAppearedMovies(searchedFilms);
    }
  }

  function handleCheckboxState() {
    if (!shortMovies) {
      setShortMovies(true);
      localStorage.setItem(`${currentUser.email} - shortSavedMovies`, true);
      setAppearedMovies(handleDurationCheck(filteredMovies));
    } else {
      setShortMovies(false);
      localStorage.setItem(`${currentUser.email} - shortSavedMovies`, false);
      setAppearedMovies(filteredMovies);
    }
  }

  useEffect(() => {
    if (
      localStorage.getItem(`${currentUser.email} - shortSavedMovies`) === "true"
    ) {
      setShortMovies(true);
      setAppearedMovies(handleDurationCheck(saveMovies));
    } else {
      setShortMovies(false);
      setAppearedMovies(saveMovies);
    }
  }, [saveMovies, currentUser]);

  useEffect(() => {
    setFilteredMovies(saveMovies);
  }, [saveMovies]);

  return (
    <section className="movies page__borders">
      <SearchForm
        handleSearchMovie={handleSearchMovie}
        handleCheckboxState={handleCheckboxState}
        shortMovies={shortMovies}
      />
      {preloader ? (
        <Preloader />
      ) : (
        <MoviesCardList
          allMovies={filteredMovies}
          searchedFilms={appearedMovies}
          saveMovies={saveMovies}
          onDeleteClick={onDeleteClick}
        />
      )}
    </section>
  );
}

export default SavedMovies;
