import React from "react";
import MoviesCard from "../MoviesCard/MoviesCard";
import "./MoviesCardList.css";
//import '../../../index.css';

function MoviesCardList(props) {
  return (
    <ul className="movies-list">
      <MoviesCard />
      <MoviesCard />
      <MoviesCard />
      <MoviesCard />
      <MoviesCard />
      <MoviesCard />
      <MoviesCard />
      <MoviesCard />
      <MoviesCard />
      <MoviesCard />
      <MoviesCard />
      <MoviesCard />
    </ul>
  );
}

export default MoviesCardList;
