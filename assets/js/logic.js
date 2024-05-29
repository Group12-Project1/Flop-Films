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

    // Filter out duplicates
    const uniqueSources = new Set();
    const uniqueStreamingServices = [];

    data.forEach(source => {
      const key = source.name; 
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
      linkElement.target = '_blank'; // Open link in a new tab
      streamingServicesDiv.appendChild(linkElement);

      streamingServicesDiv.appendChild(document.createElement('br'));
    });
  })
  .catch(error => {
    console.error('There was a problem with the fetch operation:', error);
  });

