class MainApi {
  constructor({ headers, link }) {
    this._headers = headers;
    this._link = link;
  }

  _checkError(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  }
  getToken(token) {
    if (!this._headers["Authorization"])
      this._headers["Authorization"] = "Bearer " + token;
  }
  
  getSavedMovies() {
    return fetch(this._link + "/movies", {
      method: "GET",
      headers: this._headers,
    }).then(this._checkError);
  }
  getUserInfo() {
    return fetch(this._link + "/users/me", {
      method: "GET",
      headers: this._headers,
    }).then(this._checkError);
  }
  // редактирование профиля
  editUserInfo(name, email) {
    return fetch(this._link + "/users/me", {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        name: name,
        email: email,
      }),
    }).then(this._checkError);
  }
  // сохранение фильма
  saveMovieCard(movie) {
    return fetch(this._link + "/movies", {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify({
        country: movie.country,
        director: movie.director,
        duration: movie.duration,
        year: movie.year,
        description: movie.description,
        image: movie.image,
        trailerLink: movie.trailerLink,
        thumbnail: movie.thumbnail,
        movieId: movie.id,
        nameRU: movie.nameRU,
        nameEN: movie.nameEN,
      }),
    }).then(this._checkError);
  }
  // удаление сохраненного фильма
  deleteMovieCard(movieId) {
    return fetch(this._link + `/movies/${movieId}`, {
      method: "DELETE",
      headers: this._headers,
    }).then(this._checkError);
  }
  updateEmail() {
    this._headers = {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
      "Content-Type": "application/json",
    };
  }
  s;
}

const mainApi = new MainApi({
  link: "https://api.movies-esendoss.nomoredomains.icu",
  //link: "http://localhost:3010",
  headers: {
    "Content-Type": "application/json",
  },
});

export {mainApi};
