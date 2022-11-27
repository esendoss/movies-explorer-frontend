import "./Project.css";
import logo from "../../../images/planet-logo.svg";
import { Link } from "react-router-dom";

function Project(props) {
  return (
    <section className="project">
      <div className="project__container">
        <div className="project__box">
          <h1 className="project__title">
            Учебный проект студента факультета Веб-разработки.
          </h1>
          <p className="project__caption">
            Листайте ниже, чтобы узнать больше про этот проект и его создателя.
          </p>
        </div>
        <img className="project__img" src={logo} alt="Логотип" />
      </div>
      <Link className="project__link" to="/signin">
        Узнать больше
      </Link>
    </section>
  );
}

export default Project;
