import React, { useState, useEffect } from "react";
import "./SearchForm.css";
import searchicon from "../../../images/search.svg";
import find from "../../../images/find.svg";

function SearchForm({ handleSearchMovies, handleCheckboxState, shortMovies }) {
  const [searchValue, setSearchFilmValue] = useState("");
  const [searchError, setSearchError] = useState("");
  const [isValid, setIsValid] = useState(false);

  function handleSearchChange(e) {
    const input = e.target;
    setIsValid(input.closest("form").checkValidity());
    setSearchFilmValue(e.target.value);
  }

  function handleSubmit(evt) {
    evt.preventDefault();
    isValid
      ? handleSearchMovies(searchValue)
      : setSearchError("Нужно ввести ключевое слово.");
  }
  useEffect(() => {
    setSearchError("");
  }, [isValid]);

  return (
    <section className="researcher">
      <form className="researcher__box" onSubmit={handleSubmit} noValidate>
        <div className="researcher__container">
          <img
            className="researcher__search-icon"
            src={searchicon}
            alt="иконка поиска"
          />
          <input
            className="researcher__field"
            placeholder="Фильм"
            type="text"
            name="researcher"
            id="researcher"
            minLength="2"
            maxLength="40"
            value={searchValue || ""}
            onChange={handleSearchChange}
            required
          />
          <span className="researcher__error">{searchError}</span>
        </div>
        <div className="researcher__container">
          <button className="researcher__button" type="submit">
            <img
              className="researcher__button-img"
              src={find}
              alt="Поиск"
            ></img>
          </button>
          <div className="researcher__shortfilms-container researcher__shortfilms-container_desktop">
            <input
              className="researcher__shortfilms"
              type="checkbox"
              id="switch"
              onChange={handleCheckboxState}
              checked={shortMovies ? true : false}
            />
            <label
              className="researcher__shortfilms-switch"
              htmlFor="switch"
            ></label>
            <p className="researcher__caption">Короткометражки</p>
          </div>
        </div>
      </form>
      <div className="researcher__shortfilms-container researcher__shortfilms-container_mobile">
        <input
          className="researcher__shortfilms"
          type="checkbox"
          id="switch2"
          onChange={handleCheckboxState}
          checked={shortMovies ? true : false}
        />
        <label
          className="researcher__shortfilms-switch"
          htmlFor="switch2"
        ></label>
        <p className="researcher__caption">Короткометражки</p>
      </div>
    </section>
  );
}

export default SearchForm;
