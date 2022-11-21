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
import mainApi from "../utils/MainApi";
import { CurrentUserContext } from "./CurrentUserContext";

function App() {
  const [currentUser, setCurrentUser] = useState({}); //текущий пользователь

  const [userEmail, setUserEmail] = useState("");

  const location = useLocation();
  const history = useHistory();

  const [preloader, setPreloader] = useState(false);

  const [saveMovies, setSaveMovies] = useState([]); //сохраненные фильмы

  const [isInfoTooltip, setIsInfoTooltip] = useState(false);
  const [isData, setData] = useState({});

  const pathToHeaderArray = ["/", "/movies", "/saved-movies", "/profile"];
  const pathToFooterArray = ["/", "/movies", "/saved-movies"];
  const pathToHeader = pathToHeaderArray.includes(location.pathname);
  const pathToFooter = pathToFooterArray.includes(location.pathname);

  useEffect(() => {
    handleTokenCheck();
  }, []);

  /* получение данных пользователя и сохраненных фильмов */

  // пользователь
  useEffect(() => {
    if (userEmail) {
      setPreloader(true);
      mainApi.updateEmail();
      mainApi
        .getUserInfo()
        .then((res) => setCurrentUser(res))
        .catch((err) => {
          console.log(err);
          handleInfoTooltip({
            tooltipMessage: err,
          });
        })
        .finally(() => setPreloader(false));
    }
  }, [userEmail]);

  // массив сохраненных фильмов
  useEffect(() => {
    if (userEmail && currentUser) {
      mainApi
        .getSavedMovies()
        .then((films) => {
          const userSavedMovies = films.filter(
            (f) => f.owner === currentUser._id
          );
          setSaveMovies(userSavedMovies);
        })
        .catch((err) =>
          setIsInfoTooltip({
            isOpen: true,
            tooltipMessage: err,
          })
        );
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
          handleInfoTooltip({
            tooltipMessage: "Произошла ошибка с токеном",
          });
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
        handleInfoTooltip({
          isOpen: true,
          tooltipMessage: "Что-то пошло не так! Попробуйте ещё раз.",
        })
      );
  }

  //регистрация
  function handleRegister(name, email, password) {
    Auth.register(name, email, password)
      .then(() => {
        handleAuthorize(email, password);
      })
      .catch((err) => {
        console.log(err);
        handleInfoTooltip({
          isOpen: true,
          tooltipMessage: "Что-то пошло не так! Попробуйте ещё раз.",
        });
      });
  }

  //выход из аккаунта
  function handleSignOut() {
    setUserEmail("");
    localStorage.removeItem("token");
  }

  function handleUpdateUser(data) {
    mainApi
      .editUserInfo(data.name, data.email)
      .then((newProfile) => {
        setCurrentUser(newProfile);
      })
      .catch((err) => console.log(err));
  }

  function handleSaveMovie(card) {
    mainApi
      .saveMovieCard(card)
      .then((newMovie) => setSaveMovies([newMovie, ...saveMovies]))
      .catch((err) =>
        handleInfoTooltip({
          isOpen: true,
          tooltipMessage: err,
        })
      );
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
      .catch((err) =>
        handleInfoTooltip({
          isOpen: true,
          tooltipMessage: err,
        })
      );
  }

  // Открытие попапа уведомления
  function handleInfoTooltip(data) {
    setIsInfoTooltip(true);
    setData({ ...data });
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
              component={Movies}
              onSaveClick={handleSaveMovie}
              saveMovies={saveMovies}
              preloader={preloader}
              setPreloader={setPreloader}
              handleInfoTooltip={handleInfoTooltip}
              onDeleteClick={(movie) => handleDeleteMovie(movie)}
              userEmail={userEmail}
            />
            <ProtectedRoute
              path="/saved-movies"
              component={SavedMovies}
              handleInfoTooltip={handleInfoTooltip}
              saveMovies={saveMovies}
              preloader={preloader}
              onDeleteClick={handleDeleteMovie}
              userEmail={userEmail}
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
            onClose={closePopup}
            userEmail={userEmail}
            data={isData}
          />
        </div>
      </div>
    </CurrentUserContext.Provider>
  );
}

export default withRouter(App);
