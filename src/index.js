function currettDate(newdate) {
  let now = new Date();

  let weekDays = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  let nowDay = weekDays[now.getDay()];
  let nowHours = now.getHours();
  if (nowHours < 10) {
    nowHours = `0${nowHours}`;
  }
  let nowMinutes = now.getMinutes();
  if (nowMinutes < 10) {
    nowMinutes = `0${nowMinutes}`;
  }
  let date = document.querySelector("#day-date");
  date.innerHTML = `${nowDay}, ${nowHours}:${nowMinutes}`;
}

function searchCity(event) {
  event.preventDefault();

  let inputSity = document.querySelector("#input-text");
  let city = inputSity.value;

  getWether(city);
}

function getWether(cityName) {
  let apiKey = "8881769c949a322daeafcf35c09b1eb2";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}&units=metric`;

  axios.get(apiUrl).then(showWeather);
}

function showWeather(response) {
  showTemp(response);
  showWind(response);
  showClouds(response);
  showHumidity(response);
  showMinCityTemp(response);
  showCity(response);
}

function showTemp(response) {
  let temperature = Math.round(response.data.main.temp);
  let currentTemperature = document.querySelector("#correntTemperature");
  currentTemperature.innerHTML = `${temperature}`;
}

function showWind(response) {
  let windSpeed = Math.round(response.data.wind.speed);
  let currentWindSpeed = document.querySelector("#windSpeed");
  currentWindSpeed.innerHTML = `${windSpeed}`;
}

function showHumidity(response) {
  let humidity = Math.round(response.data.main.humidity);
  let currentHumidity = document.querySelector("#humidity");
  currentHumidity.innerHTML = `${humidity}`;
}

function showClouds(response) {
  let clouds = Math.round(response.data.clouds.all);
  let currentClouds = document.querySelector("#clouds");
  currentClouds.innerHTML = `${clouds}`;
}

function showMinCityTemp(response) {
  let minCityTemp = Math.round(response.data.main.temp_min);
  let currentMinCityTemp = document.querySelector("#minCityTemp");
  currentMinCityTemp.innerHTML = `${minCityTemp}`;
}

function getCurrentWether(position) {
  let apiKey = "8881769c949a322daeafcf35c09b1eb2";
  let longitude = position.coords.longitude;
  let latitude = position.coords.latitude;
  let url = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`;

  axios.get(url).then(showWeather);
}

function getCurrentPosition() {
  navigator.geolocation.getCurrentPosition(getCurrentWether);
}

function showCity(response) {
  let currentCity = document.querySelector("h1");
  currentCity.innerHTML = response.data.name;
}

function temperatureFahrenheit() {
  let correntTemperature = document.querySelector("#correntTemperature");
  let newtemp = document.querySelector("#correntTemperature");
  newtemp.innerHTML = Math.round(correntTemperature.innerHTML * 1.8 + 32);

  let element = document.querySelector("#temperatureFahrenheit");
  element.removeEventListener("click", temperatureFahrenheit);

  let tempCelsius = document.querySelector("#temperatureCelsius");
  tempCelsius.addEventListener("click", temperatureCelsius);
}

function temperatureCelsius() {
  let correntTemperature = document.querySelector("#correntTemperature");
  let newtemp = document.querySelector("#correntTemperature");
  newtemp.innerHTML = Math.round((correntTemperature.innerHTML - 32) / 1.8);

  let element = document.querySelector("#temperatureCelsius");
  element.removeEventListener("click", temperatureCelsius);

  let tempFahrenheit = document.querySelector("#temperatureFahrenheit");
  tempFahrenheit.addEventListener("click", temperatureFahrenheit);
}

currettDate(new Date());

// let tempFahrenheit = document.querySelector("#temperatureFahrenheit");
// tempFahrenheit.addEventListener("click", temperatureFahrenheit);

// let tempCelsius = document.querySelector("#temperatureCelsius");
// tempCelsius.addEventListener("click", temperatureCelsius);

let form = document.querySelector("#search-form");
form.addEventListener("submit", searchCity);

let button = document.querySelector("#currentButton");
button.addEventListener("click", getCurrentPosition);

getWether("Chicago");
