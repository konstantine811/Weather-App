const API_KEY = "5ed1e5439462ada1b6de58f11508c5d7";
const idTemperature = "temperature";
const ICON_CONFIG = {
  Clouds: {
    class: "fa-solid fa-cloud text-white",
  },
  Sun: {
    class: "fa-solid fa-sun text-orange",
  },
};

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

async function displayCityEntered(event) {
  event.preventDefault();
  const cityEntered = document.querySelector("#input-city");
  const value = cityEntered.value;
  const currentLocation = document.querySelector("#current-location");
  const valueCap = value.charAt(0).toUpperCase() + value.slice(1);
  currentLocation.innerHTML = valueCap;
  const response = await axios.get(getWeatherUrl(valueCap));
  showTemperature(response);
}

const searchForm = document.getElementById("searchLocation");
searchForm.addEventListener("submit", displayCityEntered);

function showTemperature(response) {
  console.log("res", response);
  const secondCardBodyEl = document.getElementById("secondCardBody");
  response.data.weather.forEach((item) => {
    if (ICON_CONFIG[item.main]) {
      const cloudsConfig = ICON_CONFIG[item.main];
      const iconEl = document.createElement("i");
      iconEl.className += cloudsConfig.class;
      secondCardBodyEl.appendChild(iconEl);
    }
  });
  let temperature = Math.round(response.data.main.temp);
  let temperatureElement = document.getElementById(idTemperature);
  temperatureElement.innerHTML = `${temperature}°C`;
}

function convertToFahrenheit(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector(`#${idTemperature}`);
  temperatureElement.innerHTML = "66";
}

function convertToCelsius(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector(`#${idTemperature}`);
  temperatureElement.innerHTML = "19";
}

let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", convertToFahrenheit);

let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", convertToCelsius);

function getWeatherUrl(city) {
  return `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`;
}
