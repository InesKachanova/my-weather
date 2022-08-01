function showDate(response) {
  let localDate = response.data.dt * 1000;
  let now = new Date(localDate);

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
  showDate(response);
  showTemp(response);
  showWind(response);
  showClouds(response);
  showHumidity(response);
  showDescription(response);
  showCity(response);
  showIcon(response);
  showForecast();
}

function showIcon(response) {
  let currentIcon = document.querySelector("#icon");
  currentIcon.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  currentIcon.setAttribute("alt", response.data.weather[0].description);
}

function showTemp(response) {
  celsiusTemperature = Math.round(response.data.main.temp);
  temperatureCelsius();
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

function showDescription(response) {
  let description = response.data.weather[0].description;
  let currentDescription = document.querySelector("#description");
  currentDescription.innerHTML = `${description}`;
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

function showForecast() {
  let forecast = document.querySelector("#weatherForecast");
  let forecastHTML = `<div class="row">`;
  let days = ["Sun", "Mon", "Tue"];
  days.forEach(function (day) {
    forecastHTML =
      forecastHTML +
      `
            <div class="col-2">
              <div class="minicard">
                <div class="minicard-body">
                  <h5 class="minicard-title">${day}</h5>
                  <img src="icons/cloudy.png" class="card-img-top" alt="..." />
                  <div class="minicard-text">
                    <span class="maxtemp"> 21°C </span>
                    <span class="mintemp"> 17°C </span>
                  </div>
                </div>
              </div>
            </div>
          `;
  });

  forecastHTML = forecastHTML + `</div>`;
  forecast.innerHTML = forecastHTML;
}

function temperatureFahrenheit() {
  correntTemperature.innerHTML = Math.round(celsiusTemperature * 1.8 + 32);

  let tempFahrenheit = document.querySelector("#temperatureFahrenheit");
  tempFahrenheit.removeEventListener("click", temperatureFahrenheit);
  tempFahrenheit.classList.add("active");

  let tempCelsius = document.querySelector("#temperatureCelsius");
  tempCelsius.addEventListener("click", temperatureCelsius);
  tempCelsius.classList.remove("active");
}

function temperatureCelsius() {
  let correntTemperature = document.querySelector("#correntTemperature");
  correntTemperature.innerHTML = celsiusTemperature;

  let tempCelsius = document.querySelector("#temperatureCelsius");
  tempCelsius.removeEventListener("click", temperatureCelsius);
  tempCelsius.classList.add("active");

  let tempFahrenheit = document.querySelector("#temperatureFahrenheit");
  tempFahrenheit.addEventListener("click", temperatureFahrenheit);
  tempFahrenheit.classList.remove("active");
}

let celsiusTemperature = null;

let tempFahrenheit = document.querySelector("#temperatureFahrenheit");
tempFahrenheit.addEventListener("click", temperatureFahrenheit);

let form = document.querySelector("#search-form");
form.addEventListener("submit", searchCity);

let button = document.querySelector("#currentButton");
button.addEventListener("click", getCurrentPosition);

getWether("Chicago");
// "Wednesday",
// "Thursday",
// "Friday",
// "Saturday",
