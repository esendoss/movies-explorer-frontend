import React from "react";
import About from "./About/About";
import Project from "./Project/Project";
import Student from "./Student/Student";
import Techs from "./Techs/Techs";
import "./Main.css";

function Main(props) {
  return (
    <main className="main">
      <Project />
      <About />
      <Techs />
      <Student />
    </main>
  );
}

export default Main;
