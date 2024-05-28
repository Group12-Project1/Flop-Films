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


  fetch('https://api.themoviedb.org/3/discover/movie?api_key=cf7885ddb4db277bd61fff342c3ed606&language=en-US&sort_by=popularity.desc&page=1&primary_release_date.lte=2004-03-11&with_genres=27&vote_average.gte=0&vote_average.lte=5', options)
    .then(response => response.json())
    .then(response => console.log(response))
    .catch(err => console.error(err));
