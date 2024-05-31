const form = document.querySelector('form');
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
});
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

fetch(`https://api.themoviedb.org/3/discover/movie?api_key=cf7885ddb4db277bd61fff342c3ed606&language=en-US&sort_by=popularity.desc&page=1&release_date.gte=${startDate}&release_date.lte=${endDate}&with_genres=${genre}&vote_average.gte=0.1&vote_average.lte=${sliderSmall}&certification=${certification}&certification_country=US`, options).then(function (response) {
  return response.json();
})
  .then(function (data) {
    console.log("DO I see this", data);
    for (let i = 0; i < data.results.length; i++) {
      console.log("this is what I want", data.results[i].id)
      localStorage.setItem("id", data.results[i].id);
    }
  });

// WatchMode API function to generate links to streaming services
const titleId = '1114888';
const apiKey = "UNvGHvpWihQYgDTaNpSpUjFjplw7RtjzMd1N6JFx";
fetch(`https://api.watchmode.com/v1/title/${titleId}/sources/?apiKey=${apiKey}`)
  .then(response => {
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json();
  })
  .then(data => {
    console.log('Data received:', data);
    const filterData = data.filter(source => source.region === 'US' && source.format === 'SD');
    // Filter out duplicates
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
    // Generate HTML for unique streaming services
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