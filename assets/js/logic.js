function form() {

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
}


// const options = {
//     method: 'GET',
//     headers: {
//       accept: 'application/json',
//       Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjZjc4ODVkZGI0ZGIyNzdiZDYxZmZmMzQyYzNlZDYwNiIsInN1YiI6IjY2NTY1NjQyYzZmYTc1YjdhMDBkZWVmMSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.OjHx9Srf8U0aZGeR1372jzpSU9IJXqhjypME7388u9E'
//     }
//   };
  
//   fetch('https://api.themoviedb.org/3/discover/movie/343611?api_key=cf7885ddb4db277bd61fff342c3ed606', options)
//     .then(response => response.json())
//     .then(response => console.log(response))
//     .catch(err => console.error(err));

const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjZjc4ODVkZGI0ZGIyNzdiZDYxZmZmMzQyYzNlZDYwNiIsInN1YiI6IjY2NTY1NjQyYzZmYTc1YjdhMDBkZWVmMSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.OjHx9Srf8U0aZGeR1372jzpSU9IJXqhjypME7388u9E'
    }
  };
    const startDate = localStorage.getItem('start-date')
    console.log(startDate);
    const endDate = localStorage.getItem('end-date')
    console.log(endDate);
    const genre = localStorage.getItem('genre')
    console.log(genre);
    const sliderLarge = localStorage.getItem('slider')
    console.log(sliderLarge);
    const sliderSmall = sliderLarge/10
    console.log(sliderSmall)
    var ratings = JSON.parse(localStorage.getItem('ratings'))
    console.log(ratings);    
    // for (i=0; )


  fetch(`https://api.themoviedb.org/3/discover/movie?api_key=cf7885ddb4db277bd61fff342c3ed606&language=en-US&sort_by=popularity.desc&page=1&release_date.gte=${startDate}&release_date.lte=${endDate}&with_genres=${genre}&vote_average.gte=0.1&vote_average.lte=${sliderSmall}&region=US&certification=PG`, options)
    .then(response => response.json())
    .then(response => console.log(response))
    .catch(err => console.error(err));

    const genres = {
        method: 'GET',
        headers: {
          accept: 'application/json',
          Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjZjc4ODVkZGI0ZGIyNzdiZDYxZmZmMzQyYzNlZDYwNiIsInN1YiI6IjY2NTY1NjQyYzZmYTc1YjdhMDBkZWVmMSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.OjHx9Srf8U0aZGeR1372jzpSU9IJXqhjypME7388u9E'
        }
      };
    
    
      fetch('https://api.themoviedb.org/3/certification/movie/list', genres)
        .then(response => response.json())
        .then(response => console.log(response))
        .catch(err => console.error(err));

        // &certification=