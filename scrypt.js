let now = new Date();
let hours = now.getHours();
if (hours < 10) {
    hours = `0 ${hours}`;
}
let minutes = now.getMinutes();
if (minutes < 10) {
    minutes = `0 ${minutes}`;
}

let weekDays = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturda,y",
];
let weekDay = weekDays[now.getDay()];

let currentDateDay = document.querySelector("#today-link");
currentDateDay.innerHTML = `${weekDay} ${hours}:${minutes}`;

let currentDateNight = document.querySelector("#tonight-link");
currentDateNight.innerHTML = `${weekDay} night`;

function displayCityEntered(event) {
    event.preventDefault();
    let cityEntered = document.querySelector("#input-city");
    let currentLocation = document.querySelector("#current-location");
    currentLocation.innerHTML = `${cityEntered.value} `;
}

let searchForm = document.querySelector(".d-flex");
searchForm.addEventListener("submit", displayCityEntered);
let apiKey = "5ed1e5439462ada1b6de58f11508c5d7";
let apiUrl =
    "https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric";

function showTemperature(response) {
    console.log(response);

    let temperature = Math.round(response.data.main.temp);
    let temperatureElement = document.querySelector("#temperature");
    temperatureElement.innerHTML = `${temperature}°C`;
}

axios.get(`${apiUrl}&appid=${apiKey}`).then(showTemperature);

function convertToFahrenheit(event) {
    event.preventDefault();
    let temperatureElement = document.querySelector("#temperature");
    temperatureElement.innerHTML = "66";
}

function convertToCelsius(event) {
    event.preventDefault();
    let temperatureElement = document.querySelector("#temperature");
    temperatureElement.innerHTML = "19";
}

let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", convertToFahrenheit);

let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", convertToCelsius);