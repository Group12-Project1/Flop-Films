const form = document.querySelector('form');
const modalBody = document.querySelector('.modal-body');
const errorDiv=document.getElementById('errorDisplay');
const poster = 'https://image.tmdb.org/t/p/w500';


form.addEventListener('submit', function add(event) {
   event.preventDefault();
   var genre = document.getElementById('genres').value;
   var startDate = document.getElementById('start-date').value;
   var endDate = document.getElementById('end-date').value;
   var slider = document.getElementById('flop-slider').value; 
   var checkboxes = document.querySelectorAll('input[type="checkbox"]');
   let ratings = [];
    checkboxes.forEach(function (checkbox) {
       if (checkbox.checked) {
           ratings.push(checkbox.value);
       }
   });

  
  localStorage.setItem("genre", genre);
   localStorage.setItem("start-date", startDate);
   localStorage.setItem("end-date", endDate);
   localStorage.setItem("slider", slider);
   localStorage.setItem('ratings', JSON.stringify(ratings));
   renderMoviesLS();


   
});


function renderMoviesLS() {
   const startDate = localStorage.getItem('start-date');
   const endDate = localStorage.getItem('end-date');
   const genre = localStorage.getItem('genre');
   const sliderLarge = localStorage.getItem('slider');
   const sliderSmall = sliderLarge / 10;
   const ratings = JSON.parse(localStorage.getItem('ratings'));
   let certification = "";
   for (let i = 0; i < ratings.length; i++) {
       certification += ratings[i];
       if (i < ratings.length - 1) {
           certification += "|";
       }
   }


   const options = {
       method: 'GET',
       headers: {
           accept: 'application/json',
           Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjZjc4ODVkZGI0ZGIyNzdiZDYxZmZmMzQyYzNlZDYwNiIsInN1YiI6IjY2NTY1NjQyYzZmYTc1YjdhMDBkZWVmMSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.OjHx9Srf8U0aZGeR1372jzpSU9IJXqhjypME7388u9E'
       }
   };


   fetch(`https://api.themoviedb.org/3/discover/movie?api_key=cf7885ddb4db277bd61fff342c3ed606&language=en-US&sort_by=popularity.desc&page=1&release_date.gte=${startDate}&release_date.lte=${endDate}&with_genres=${genre}&vote_average.gte=0.1&vote_average.lte=${sliderSmall}&certification=${certification}&certification_country=US`, options)
       .then(response => response.json())
       .then(data => {
           const movId = data.results.map(movie => movie.id);
           renderMovies(data.results);
           localStorage.setItem("id", JSON.stringify(movId));
           movId.forEach(movieId => fetchFromWatchMode(movieId));
       });
}


function renderMovies(data) {
   modalBody.innerHTML = '';

if(data==''){

  errorDiv.textContent='No movie found for the above search criteria';
  console.log('No movie found for the above search criteria');
}
else
{ errorDiv.textContent='';
   data.forEach(movie => {
       const { title, poster_path, overview, vote_average, release_date, id } = movie;
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
                       <div id="overview">${overview}</div>
                   </div>
               </div>
               <div id="streaming-services-${id}">
                   <h4>Where To Watch:</h4>
               </div>
           </div>
       `;
       modalBody.appendChild(movieEl);
   });}
}

function fetchFromWatchMode(movieId) {
   const apiKey = 'DHcrJoVIL2fFD5kuLHpjN8MB9oejaUwBGtfRx9SJ';
   fetch(`https://api.watchmode.com/v1/title/movie-${movieId}/sources/?apiKey=${apiKey}`)
       .then(response => {
           if (!response.ok) {
               throw new Error('Network response was not ok');
           }
           return response.json();
       })
       .then(data => {
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


           const streamingServicesDiv = document.getElementById(`streaming-services-${movieId}`);
           if (streamingServicesDiv) {
               if (uniqueStreamingServices.length > 0) {
                   uniqueStreamingServices.forEach(service => {
                       const linkElement = document.createElement('a');
                       linkElement.href = service.web_url;
                       linkElement.textContent = service.name;
                       linkElement.target = '_blank';
                       streamingServicesDiv.appendChild(linkElement);
                       streamingServicesDiv.appendChild(document.createElement('br'));
                   });
               } else {
                   streamingServicesDiv.textContent = 'No streaming services available';
               }
           } else {
               console.error(`streaming-services-${movieId} not found`);
           }
       })
       .catch(error => {
           console.error('Error fetching data from WatchMode:', error);
       });
}

const existingTitleId = JSON.parse(localStorage.getItem('id'));
if (existingTitleId) {
   existingTitleId.forEach(movieId => fetchFromWatchMode(movieId));
} else {
   console.error('No titleId found in local storage');
}

