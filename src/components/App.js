import React from "react";
import { useState, useEffect } from "react";
import {
  Route,
  Switch,
  useLocation,
  withRouter,
  Redirect,
  useHistory,
} from "react-router-dom";
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
import * as Auth from "../utils/auth";

import InfoTooltip from "./InfoTooltip/InfoTooltip";
import ProtectedRoute from "./ProtectedRoute";
import { mainApi } from "../utils/MainApi";

import { CurrentUserContext } from "../contexts/CurrentUserContext";

function App() {
  const [currentUser, setCurrentUser] = useState({ name: "", email: "" }); //текущий пользователь

  const [userEmail, setUserEmail] = useState("");

  const location = useLocation();
  const history = useHistory();

  const [preloader, setPreloader] = useState(false);

  const [saveMovies, setSaveMovies] = useState([]); //сохраненные фильмы

  const [isInfoTooltip, setIsInfoTooltip] = useState(false);
  const [tooltipMessage, setTooltipMessage] = useState("");

  const pathToHeaderArray = ["/", "/movies", "/saved-movies", "/profile"];
  const pathToFooterArray = ["/", "/movies", "/saved-movies"];
  const pathToHeader = pathToHeaderArray.includes(location.pathname);
  const pathToFooter = pathToFooterArray.includes(location.pathname);

  useEffect(() => {
    handleTokenCheck();
  }, []);

  /* получение данных пользователя и сохраненных фильмов */
  //console.log(currentUser);

  useEffect(() => {
    if (userEmail) {
      mainApi.updateEmail();
      Promise.all([mainApi.getUserInfo()])
        .then(([profile]) => {
          setCurrentUser(profile);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [userEmail]);

  // массив сохраненных фильмов
  useEffect(() => {
    if (userEmail && currentUser) {
      mainApi.updateEmail();
      mainApi
        .getSavedMovies()
        .then((films) => {
          const userSavedMovies = films.filter(
            (f) => f.owner === currentUser._id
          );
          setSaveMovies(userSavedMovies);
        })
        .catch((err) => console.log(err));
    }
  }, [currentUser, userEmail]);

  /* проверка токена */
  function handleTokenCheck() {
    const token = localStorage.getItem("token");
    if (token) {
      setPreloader(true);
      Auth.checkToken(token)
        .then((res) => {
          if (res) {
            mainApi.getToken(token);
            handleLogin(res.data ? res.data.email : res.email);
            setCurrentUser(res);
          }
        })
        .catch((err) => {
          console.log(err);
          localStorage.removeItem("token");
          handleInfoTooltipClick("Произошла ошибка с токеном.");
        })
        .finally(() => {
          setPreloader(false);
        });
    }
  }
  function handleLogin(email) {
    setUserEmail(email);
    history.push("/movies");
  }

  //авторизация
  function handleAuthorize(email, password) {
    Auth.authorize(email, password)
      .then((data) => {
        if (data.token) {
          localStorage.setItem("token", data.token);
          handleLogin(email);
        }
      })
      .catch((res) =>
        handleInfoTooltipClick("Что-то пошло не так! Попробуйте ещё раз.")
      );
  }

  //регистрация
  function handleRegister(name, email, password) {
    Auth.register(name, email, password)
      .then(() => {
        handleInfoTooltipClick("Вы успешно зарегистрировались!");
        handleAuthorize(email, password);
      })
      .catch((err) =>
        handleInfoTooltipClick("Что-то пошло не так! Попробуйте ещё раз.")
      );
  }

  //выход из аккаунта
  function handleSignOut() {
    setUserEmail("");
    setSaveMovies([]);
    localStorage.removeItem("token");
  }
  // редактирование профиля
  function handleUpdateUser(data) {
    mainApi
      .editUserInfo(data.name, data.email)
      .then((newProfile) => {
        setCurrentUser(newProfile);
      })
      .catch((err) => console.log(err));
  }
  // сохранить фильм
  function handleSaveMovie(card) {
    mainApi
      .saveMovieCard(card)
      .then((newMovie) => setSaveMovies([newMovie, ...saveMovies]))
      .catch((err) => console.log(err));
  }

  /* удаление фильма из сохраненных */
  function handleDeleteMovie(movie) {
    const savedCard = saveMovies.find(
      (card) => card.movieId === movie.id || card.movieId === movie.movieId
    );
    mainApi
      .deleteMovieCard(savedCard._id)
      .then(() => {
        const updateMovies = saveMovies.filter((f) => {
          if (movie.id === f.movieId || movie.movieId === f.movieId) {
            return false;
          } else {
            return true;
          }
        });
        setSaveMovies(updateMovies);
      })
      .catch((err) => console.log(err));
  }

  // Открытие попапа уведомления

  function handleInfoTooltipClick(tooltipMessage) {
    setTooltipMessage(tooltipMessage);
    setIsInfoTooltip(true);
  }
  //закрытте попапа
  function closePopup() {
    setIsInfoTooltip(false);
  }
  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <div className="page__box">
          {!pathToHeader ? null : <Header userEmail={userEmail} />}
          <Switch>
            <Route exact path="/" component={Main} />
            <ProtectedRoute
              path="/movies"
              userEmail={userEmail}
              component={Movies}
              onSaveClick={handleSaveMovie}
              saveMovies={saveMovies}
              preloader={preloader}
              setPreloader={setPreloader}
              handleInfoTooltip={handleInfoTooltipClick}
              tooltipMessage={tooltipMessage}
              onDeleteClick={(movie) => handleDeleteMovie(movie)}
            />
            <ProtectedRoute
              path="/saved-movies"
              component={SavedMovies}
              userEmail={userEmail}
              handleInfoTooltip={handleInfoTooltipClick}
              tooltipMessage={tooltipMessage}
              saveMovies={saveMovies}
              preloader={preloader}
              onDeleteClick={(movie) => handleDeleteMovie(movie)}
            />

            <ProtectedRoute
              path="/profile"
              component={Profile}
              handleSignOut={handleSignOut}
              userEmail={userEmail}
              onUpdateUser={handleUpdateUser}
            />

            <Route path="/signup">
              <Register onRegister={handleRegister} />
            </Route>
            <Route path="/signin">
              <Login onAuthorize={handleAuthorize} />
            </Route>
            <Route path="*" component={NotFound} />
            <Redirect to={userEmail ? "/movies" : "/"} />
          </Switch>
          {!pathToFooter ? null : <Footer />}
          <InfoTooltip
            isOpen={isInfoTooltip}
            tooltipMessage={tooltipMessage}
            onClose={closePopup}
            userEmail={userEmail}
          />
        </div>
      </div>
    </CurrentUserContext.Provider>
  );
}

export default withRouter(App);
