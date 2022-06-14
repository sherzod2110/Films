"use strict";

// ELEMENTS CALL
let elForm = document.querySelector(".js-form");
let elInput = document.querySelector(".js-input", elForm);
let elSelect = document.querySelector(".js-select", elForm);

// THE RESULT
let elList = document.querySelector(".js-list");
let elResults = document.querySelector(".js-results");
let elResults2 = document.querySelector(".js-results-2");

elResults.textContent = films.length;
elResults2.textContent = films.length;

const renderGenres = function (arr) {
  const uniqueGenres = [];

  arr.forEach((film) => {
    film.genres.forEach((genre) => {
      if (!uniqueGenres.includes(genre)) {
        uniqueGenres.push(genre);
      }
    });
  });

  uniqueGenres.forEach((genre) => {
    const genresOption = document.createElement("option");

    genresOption.textContent = genre;
    genresOption.value = genre;

    elSelect.appendChild(genresOption);
  });
};

const renderMovies = function (arr, htmlElement) {
  arr.forEach(function (film) {
    let elLi = document.createElement("li");
    elLi.classList.add("list__item");

    let elImg = document.createElement("img");
    elImg.classList.add("list__img");

    let elHeading = document.createElement("h3");
    elHeading.classList.add("list__heading");

    let elP = document.createElement("p");
    elP.classList.add("list__text");

    let elP2 = document.createElement("p");
    elP2.classList.add("list__text2");

    let elLink = document.createElement("a");
    elLink.setAttribute(
      "class",
      "list-button btn btn-success fw-bold text-white"
    );

    let elBox = document.createElement("div");
    elBox.classList.add("list__box");

    elImg.src = film.poster;
    elHeading.textContent = film.title;
    elP.textContent = film.overview;
    elP2.textContent = film.genres.join(" ");
    elLink.setAttribute("href", `https://www.youtube.com/`);
    elLink.textContent = "Watch Trailer";

    elBox.append(elHeading, elP);
    elLi.append(elImg, elBox, elP2, elLink);
    htmlElement.append(elLi);
  });
};

renderMovies(films, elList);
renderGenres(films);

elSelect.addEventListener("change", function (evt) {
  evt.preventDefault();

  elList.innerHTML = "";

  const selectedGenre = elSelect.value;

  const selectedFilms = [];

  films.forEach((film) => {
    if (selectedGenre === "all" || film.genres.includes(selectedGenre)) {
      selectedFilms.push(film);
      elResults.textContent = `${selectedFilms.length}`;
    }
  });

  renderMovies(selectedFilms, elList);
});

// Search function
elInput.addEventListener("input", (evt) => {
  evt.preventDefault();
  let searchRegex = new RegExp(elInput.value.trim(), "gi");

  let array = [];
  films.forEach(function (film) {
    elList.innerHTML = "";
    if (film.title.match(searchRegex)) {
      array.push(film);
      elResults2.textContent = `${array.length}`;
    }
    renderMovies(array, elList);
  });
});
