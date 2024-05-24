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