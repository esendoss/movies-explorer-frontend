import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import "./SearchForm.css";
import searchicon from "../../../images/search.svg";
import find from "../../../images/find.svg";
import { CurrentUserContext } from "../../../contexts/CurrentUserContext";
import useValidateForm from "../../../hooks/useValidateForm";

function SearchForm(props) {
  const currentUser = React.useContext(CurrentUserContext);
  const location = useLocation();

  const [searchValue, setSearchValue] = useState("");
  const [searchError, setSearchError] = useState("");
  const [isValid, setIsValid] = useState(false);

  // установка значения в поисковике
  useEffect(() => {
    if (location.pathname === "/movies") {
      setSearchValue(
        localStorage.getItem(`${currentUser.email} - findMovie`) || null
      );
    } else {
      setSearchValue(null);
    }
  }, [location.pathname]);

  function handleSearchChange(e) {
    const input = e.target;
    setIsValid(input.closest("form").checkValidity());
    setSearchValue(e.target.value);
  }

  function handleSubmit(evt) {
    evt.preventDefault();
    isValid
      ? props.handleSearchMovies(searchValue)
      : setSearchError("Нужно ввести ключевое слово.");
    if (location.pathname === "/movies") {
      localStorage.getItem(`${currentUser.email} - findMovie`, searchValue);
    }
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
            minLength="1"
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
              onChange={props.handleCheckboxState}
              checked={props.shortMovies ? true : false}
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
          onChange={props.handleCheckboxState}
          checked={props.shortMovies ? true : false}
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
