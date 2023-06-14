const desktop = { width: 950, item: { total: 12, add: 3 } };
const tablet = { width: 650, item: { total: 8, add: 2 } };
const mobile = { width: 650, item: { total: 5, add: 2 } };

/* функция на проверку длительности фильма (является ли фильм короткометражкой) */
function handleDurationCheck(movies) {
  return movies.filter((movie) => movie.duration < 40);
}

/* функция фильтрации запроса */
function filterFilms(movies, inputMovie, shortMovie) {
  const searchedFilm = movies.filter((movie) => {
    const film = inputMovie.toLowerCase().trim();
    const rus = String(movie.nameRU).toLowerCase().trim(); //поиск фильмов на русском без учета регистра
    const eng = String(movie.nameEN).toLowerCase().trim(); //поиск фильмов на английском без учета регистра

    return rus.indexOf(film) !== -1 || eng.indexOf(film) !== -1;
  });

  if (shortMovie) {
    return handleDurationCheck(searchedFilm);
  } else {
    return searchedFilm;
  }
}

/* функция преобразования языка и изображения карточек */
function convertCards(items) {
  items.forEach((movie) => {
    if (!movie.image) {
      movie.image =
        "https://images.unsplash.com/photo-1598899134739-24c46f58b8c0?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=856&q=80";
      movie.thumbnail =
        "https://images.unsplash.com/photo-1598899134739-24c46f58b8c0?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=856&q=80";
    } else {
      movie.thumbnail = `https://api.nomoreparties.co${movie.image.formats.thumbnail.url}`;
      movie.image = `https://api.nomoreparties.co${movie.image.url}`;
    }
    if (!movie.country) {
      movie.country = "Russia";
    }
    if (!movie.nameEN) {
      movie.nameEN = movie.nameRU;
    }
  });
  return items;
}

export { desktop, tablet, mobile, handleDurationCheck, filterFilms, convertCards };
