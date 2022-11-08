import React from "react";
import SearchForm from "./SearchForm/SearchForm";
import MoviesCardList from "./MoviesCardList/MoviesCardList";
import "./Movies.css";
import "../../index.css";

function Movies(props) {
  return (
    <section className="movies page__borders">
      <SearchForm />
      <MoviesCardList />
      <section className="more">
        <button className="more__button" type="submit">
          Еще
        </button>
      </section>
    </section>
  );
}

export default Movies;
