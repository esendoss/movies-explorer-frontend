import React from "react";
import "./About.css";
import "../../../index.css";

function About(props) {
  return (
    <section className="about page__borders">
      <h2 className="about__title">О проекте</h2>
      <div className="about__description">
        <div className="about__column">
          <p className="about__subtitle">Дипломный проект включал 5 этапов</p>
          <p className="about__annotation">
            Составление плана, работу над бэкендом, вёрстку, добавление
            функциональности и финальные доработки.
          </p>
        </div>
        <div className="about__column">
          <p className="about__subtitle">На выполнение диплома ушло 5 недель</p>
          <p className="about__annotation">
            У каждого этапа был мягкий и жёсткий дедлайн, которые нужно было
            соблюдать, чтобы успешно защититься.
          </p>
        </div>
      </div>
      <div className="about__diagram">
        <div className="about__backend">
          <h3 className="about__week about__week-backend">1 неделя</h3>
          <p className="about__part">Back-end</p>
        </div>
        <div className="about__frontend">
          <h3 className="about__week about__week-frontend">4 недели</h3>
          <p className="about__part">Front-end</p>
        </div>
      </div>
    </section>
  );
}

export default About;
