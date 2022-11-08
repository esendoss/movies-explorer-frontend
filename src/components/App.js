import React from "react";
import { useState } from "react";
import { Route, Switch, useLocation } from "react-router-dom";
import "../App.css";
import "../index.css";
import Header from "./Header/Header.js";
import Main from "./Main/Main.js";
import Movies from "./Movies/Movies";
import SavedMovies from "./SavedMovies/SavedMovies";
import Footer from "./Footer/Footer.js";
import Register from "./Register/Register";
import Login from "./Login/Login";
import Profile from "./Profile/Profile";
import NotFound from "./NotFound/NotFound";

// import ProtectedRoute from "./ProtectedRoute";
import { CurrentUserContext } from "./CurrentUserContext";

function App(props) {
  const [currentUser, setCurrentUser] = useState([]);
  const [loggedIn, setLoggedIn] = useState(false);
  const location = useLocation();
  const pathToHeaderArray = ["/", "/movies", "/saved-movies", "/profile"];
  const pathToFooterArray = ["/", "/movies", "/saved-movies"];
  const pathToHeader = pathToHeaderArray.includes(location.pathname);
  const pathToFooter = pathToFooterArray.includes(location.pathname);

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <div className="page__box">
          {!pathToHeader ? null : <Header loggedIn={loggedIn} />}
          <Switch>
            <Route exact path="/" component={Main} />
            <Route path="/movies" component={Movies} />
            <Route path="/saved-movies" component={SavedMovies} />
            <Route path="/signin" component={Login} />
            <Route path="/signup" component={Register} />
            <Route path="/profile" component={Profile} />
            <Route path="*" component={NotFound} />
          </Switch>
          {!pathToFooter ? null : <Footer />}
        </div>
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
