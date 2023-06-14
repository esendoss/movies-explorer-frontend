class MoviesApi {
  constructor({ headers, url }) {
    this._headers = headers;
    this._url = url;
  }
  _checkError(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  }
  getMovies() {
    return fetch(`${this._url}`, {
      method: "GET",
      headers: this._headers,
    }).then(this._checkError);
  }
}
const moviesApi = new MoviesApi({
  url: "https://api.nomoreparties.co/beatfilm-movies",
  headers: {
    "Content-Type": "application/json",
  },
});
export default moviesApi;
