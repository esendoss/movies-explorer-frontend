import React from "react";
import "./SearchForm.css";
import searchicon from "../../../images/search.svg";
import find from "../../../images/find.svg";

function SearchForm(props) {
  return (
    <section className="researcher">
      <form className="researcher__box">
        <div className="researcher__container">
          <img
            className="researcher__search-icon"
            src={searchicon}
            alt="иконка поиска"
          />
          <input
            className="researcher__field"
            placeholder="Фильм"
            required
          ></input>
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
            />
            <label class="researcher__shortfilms-switch" for="switch"></label>
            <p className="researcher__caption">Короткометражки</p>
          </div>
        </div>
      </form>
      <div className="researcher__shortfilms-container researcher__shortfilms-container_mobile">
        <input className="researcher__shortfilms" type="checkbox" id="switch2" />
        <label class="researcher__shortfilms-switch" for="switch2"></label>
        <p className="researcher__caption">Короткометражки</p>
      </div>
    </section>
  );
}

export default SearchForm;
