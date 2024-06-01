const form = document.querySelector('form');
const modalBody = document.querySelector('.modal-body');
const poster = 'https://image.tmdb.org/t/p/w500';


form.addEventListener('submit', function (event) {

    event.preventDefault();
    var genre = document.getElementById('genres').value;
    var startDate = document.getElementById('start-date').value;
    var endDate = document.getElementById('end-date').value;
    var slider = document.getElementById('flop-slider').value;

    localStorage.setItem("genre", genre);
    localStorage.setItem("start-date", startDate);
    localStorage.setItem("end-date", endDate);
    localStorage.setItem("slider", slider);

    var checkboxes = document.querySelectorAll('input[type="checkbox"]');
    let ratings = [];

    checkboxes.forEach(function (checkbox) {
        if (checkbox.checked) {
            ratings.push(checkbox.value);
        }
    });

    localStorage.setItem('ratings', JSON.stringify(ratings));
    renderMoviesLS();

});

//Created a function that encapsulates all the code used to display localStorage items so that it can be called at the end of click eventListener.
function renderMoviesLS() {
    const startDate = localStorage.getItem('start-date')
    console.log(startDate);
    const endDate = localStorage.getItem('end-date')
    console.log(endDate);
    const genre = localStorage.getItem('genre')
    console.log(genre);
    const sliderLarge = localStorage.getItem('slider')
    console.log(sliderLarge);
    const sliderSmall = sliderLarge / 10
    console.log(sliderSmall)
    const ratings = JSON.parse(localStorage.getItem('ratings'))
    console.log(ratings);
    let certification = "";
    for (i = 0; i < ratings.length; i++) {
        certification += ratings[i];
        if (i < ratings.length - 1) {
            certification += "|";
        }
    }
    console.log(certification);


    const options = {
        method: 'GET',
        headers: {
            accept: 'application/json',
            Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjZjc4ODVkZGI0ZGIyNzdiZDYxZmZmMzQyYzNlZDYwNiIsInN1YiI6IjY2NTY1NjQyYzZmYTc1YjdhMDBkZWVmMSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.OjHx9Srf8U0aZGeR1372jzpSU9IJXqhjypME7388u9E'
        }
    };

    fetch(`https://api.themoviedb.org/3/discover/movie?api_key=cf7885ddb4db277bd61fff342c3ed606&language=en-US&sort_by=popularity.desc&page=1&release_date.gte=${startDate}&release_date.lte=${endDate}&with_genres=${genre}&vote_average.gte=0.1&vote_average.lte=${sliderSmall}&certification=${certification}&certification_country=US`, options).then(function (response) {
        return response.json();

    })
        .then(function (data) {
            const movId = [];
            console.log("DO I see this", data);
            for (let i = 0; i < data.results.length; i++) {
                movId.push(data.results[i].id);
            }

            renderMovies(data.results);

            localStorage.setItem("id", JSON.stringify(movId));
        });
}

const getRandomIndex = function (movArray) {
    // TODO: Select and display a random movie index
    const randomIndex = Math.floor(Math.random() * movArray.length);

    const randomMovieIndex = movArray[randomIndex];
    console.log('Random Index is :' + randomMovieIndex);
}


// This function pulls the data from function above, this code runs through the data and parses that parameters selected from results to create "movie".
function renderMovies(data) {

    modalBody.innerHTML = '';

    data.forEach(movie => {
        const { title, poster_path, overview, vote_average, release_date } = movie;
        const movieEl = document.createElement('div');
        movieEl.classList.add('movie-poster');
        movieEl.innerHTML = `
        <div class="modal-body">
        <div class="movie-poster">
            <img src="${poster + poster_path}" style="height: 300px; width: 200px;" alt="${title}" />

            <div class="movie-info">
                <h3 id="movie-title">${title}</h3>
                <div id="vote_average">Rating: ${vote_average}/10</div>
                <div id="release-date">Release Date: ${release_date}</div>
                <h4 id="movie-overview-hd">Movie Overview</h4>
                <div id= "overview">${overview}</div>
            </div>

        </div>
        <div id="streaming-services">
        <h4>Where To Watch:</h4>
    </div>

`

        modalBody.appendChild(movieEl);
    })
}
renderMoviesLS();


// WatchMode API function to generate links to streaming services
const titleId = '1114888';
const apiKey = "UNvGHvpWihQYgDTaNpSpUjFjplw7RtjzMd1N6JFx";
function fetchStreamingLinks(movieIds) {
    console.log('movie id check:', movieIds);
      for (let i = 0; i < movieIds.length; i++) {
          fetch(`https://api.watchmode.com/v1/title/movie-${movieIds[i]}/sources/?apiKey=HXLX3ANMJ6DOV9QlGdXMuc1XC0blq3gv7x8Jfkbo`)
              .then(response => {
                  if (!response.ok) {
                      throw new Error('Network response was not ok');
                  }
                  return response.json();
              })
              .then(data => {
                  console.log('Data received:', data);
                  const filterData = data.filter(source => source.region === 'US' && source.format === 'SD');
                  const uniqueSources = new Set();
                  const uniqueStreamingServices = [];
                  filterData.forEach(source => {
                      const key = `${source.name}-${source.region}-${source.format}`;
                      if (!uniqueSources.has(key)) {
                          uniqueSources.add(key);
                          uniqueStreamingServices.push(source);
                      }
                  });
                  console.log('Unique streaming services:', uniqueStreamingServices);
                  const streamingServicesDiv = document.getElementById('streaming-services');
                  uniqueStreamingServices.forEach(service => {
                      const linkElement = document.createElement('a');
                      linkElement.href = service.web_url;
                      linkElement.textContent = service.name;
                      linkElement.target = '_blank';
                      streamingServicesDiv.appendChild(linkElement);
                      streamingServicesDiv.appendChild(document.createElement('br'));
                  });
              })
              .catch(error => {
                  console.error('There was a problem with the fetch operation:', error);
              });
      };
  }