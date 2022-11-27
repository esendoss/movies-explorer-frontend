import React from "react";
import "./Techs.css";

function Techs(props) {
  return (
    <section className="techs">
      <h2 className="techs__header">Технологии</h2>
      <div className="techs__container">
        <h3 className="techs__title">7 технологий</h3>
        <p className="techs__subtitle">
          На курсе веб-разработки мы освоили технологии, которые применили в
          дипломном проекте.
        </p>
        <div className="techs__technology-stack">
          <p className="techs__item">HTML</p>
          <p className="techs__item">CSS</p>
          <p className="techs__item">JS</p>
          <p className="techs__item">React</p>
          <p className="techs__item">Git</p>
          <p className="techs__item">Express.js</p>
          <p className="techs__item">mongoDB</p>
        </div>
      </div>
    </section>
  );
}

export default Techs;
