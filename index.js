// --------------N1--------------

const getMovieAge = function (movie) {
  fetch(`http://www.omdbapi.com/?t=${movie}&apikey=9c23e035`)
    .then((res) => res.json())
    .then((data) =>
      console.log(
        `Movie "${data.Title}" created  ${
          new Date().getFullYear() - data.Year
        } years ago`
      )
    );
};

getMovieAge("Avatar");

// --------------N2--------------

const getMovieActor = function (movie) {
  fetch(`http://www.omdbapi.com/?t=${movie}&apikey=9c23e035`)
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      let x = data.Actors.split(", ");
      for (const i of x) {
        console.log(i.split(" ")[0]);
      }
    });
};

getMovieActor("Madagascar");

// --------------N3--------------

const getMovieCountry = function (movie) {
  fetch(`http://www.omdbapi.com/?t=${movie}&apikey=9c23e035`)
    .then((res) => res.json())
    .then(function (x) {
      const country = x.Country;
      console.log(country);
      return fetch(`https://restcountries.com/v3.1/name/ ${country}`);
    })
    .then((res) => res.json())
    .then((x) =>
      console.log(
        `Movie ${movie} is from ${x[0].name.common}, where currency is ${x[0].currencies.JPY.name}`
      )
    )
    .catch((err) => console.log(err));
};

getMovieCountry("one punch man");
// --------------N4--------------

const getJson = function (url) {
  let num = "";
  return fetch(url)
    .then((res) => res.json())
    .then(function (x) {
      [...x.Runtime].forEach((i) => {
        if (Number(i)) num += i;
      });

      return num;
    });
};

const moviesTimeSum = function (movie1, movie2, movie3) {
  const promiis = Promise.all([
    getJson(`http://www.omdbapi.com/?t=${movie1}&apikey=9c23e035`).then((y) =>
      Number(y)
    ),

    getJson(`http://www.omdbapi.com/?t=${movie2}&apikey=9c23e035`).then((z) =>
      Number(z)
    ),

    getJson(`http://www.omdbapi.com/?t=${movie3}&apikey=9c23e035`).then((x) =>
      Number(x)
    ),
  ])
    .then((x) => x.reduce((acc, curr) => (acc += curr)))
    .then((x) => console.log(x));
};

moviesTimeSum("avatar", "madagascar", "one punch man");
// --------------N5--------------
