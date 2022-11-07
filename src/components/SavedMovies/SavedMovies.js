import React from "react";
import SearchForm from "../Movies/SearchForm/SearchForm";
import MoviesCardList from "../Movies/MoviesCardList/MoviesCardList";
import "../Movies/Movies.css";
import "../../index.css";

function SavedMovies(props) {
  return (
    <section className="movies page__borders">
      <SearchForm />
      <MoviesCardList />
    </section>
  );
}

export default SavedMovies;
