function returnWeather(response) {
  let cityElement = document.querySelector("#city");
  let temperatureElement = document.querySelector("#temperature");
  let temperature = response.data.temperature.current;
  let descriptionElement = document.querySelector("#description");
  let humidityElement = document.querySelector("#humidity");
  let windSpeedElement = document.querySelector("#wind-speed");
  let timeElement = document.querySelector("#time");
  let date = new Date(response.data.time * 1000);
  let iconElement = document.querySelector("#icon");
  let pressureElement = document.querySelector("#pressure");
  let realFeelElement = document.querySelector("#real-feel");
  let feelsLike = response.data.temperature.feels_like;

  cityElement.innerHTML = response.data.city;
  timeElement.innerHTML = formatDate(date);
  descriptionElement.innerHTML = response.data.condition.description;
  humidityElement.innerHTML = `${response.data.temperature.humidity}%`;
  windSpeedElement.innerHTML = `${response.data.wind.speed}km/h`;
  temperatureElement.innerHTML = Math.round(temperature);
  iconElement.innerHTML = `<img src="${response.data.condition.icon_url}" class="weather-app-icon" />`;
  pressureElement.innerHTML = `${response.data.temperature.pressure} mbar`;
  realFeelElement.innerHTML = `${Math.round(feelsLike)}°C`;

  getForecast(response.data.city);
  displayBackground(response.data.condition.icon);
}

function formatDate(date) {
  let minutes = date.getMinutes();
  let hours = date.getHours();
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[date.getDay()];
  if (hours < 10) {
    hours = `0${hours}`;
  }
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  return `${day} ${hours}:${minutes}`;
}
function searchCity(city) {
  let apiKey = "bb3502a4t5567900odf5c4da2a6e140f";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}`;
  axios.get(apiUrl).then(returnWeather);
}
function searchSubmit(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#search-form-input");
  searchCity(searchInput.value);
}

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return days[date.getDay()];
}

function getForecast(city) {
  let apiKey = "bb3502a4t5567900odf5c4da2a6e140f";
  let apiUrl = `https://api.shecodes.io/weather/v1/forecast?query=${city}&key=${apiKey}`;
  axios(apiUrl).then(displayForecast);
}

function displayForecast(response) {
  let forecastHtml = "";
  response.data.daily.forEach(function (day, index) {
    if (index < 5) {
      forecastHtml =
        forecastHtml +
        `
      <div class="weather-forecast-day">
        
        <img src="${day.condition.icon_url}" class="weather-forecast-icon" />
       <div class="weather-forecast-date">${formatDay(day.time)}</div> 
       <div class="weather-forecast-temperatures">
          <div class="weather-forecast-temperature">
            <strong>${Math.round(day.temperature.maximum)}°</strong>
          </div>
          <div class="weather-forecast-temperature">${Math.round(
            day.temperature.minimum
          )}°</div>
        </div>
      </div> `;
    }
  });
  let forecastElement = document.querySelector("#forecast");
  forecastElement.innerHTML = forecastHtml;
}

function displayBackground(response) {
  let box = document.querySelector("#background");
  let iconName = response;

  if (iconName === "clear-sky-day") {
    box.classList.add("clear-sky-day");
  } else {
    box.classList.remove("clear-sky-day");
  }

  if (iconName === "clear-sky-night") {
    box.classList.add("clear-sky-night");
  } else {
    box.classList.remove("clear-sky-night");
  }
  if (iconName === "few-clouds-day") {
    box.classList.add("few-clouds-day");
  } else {
    box.classList.remove("few-clouds-day");
  }
  if (iconName === "few-clouds-night") {
    box.classList.add("few-clouds-night");
  } else {
    box.classList.remove("few-clouds-night");
  }

  if (iconName === "scattered-clouds-day") {
    box.classList.add("scattered-clouds-day");
  } else {
    box.classList.remove("scattered-clouds-day");
  }
  if (iconName === "scattered-clouds-night") {
    box.classList.add("scattered-clouds-night");
  } else {
    box.classList.remove("scattered-clouds-night");
  }

  if (iconName === "broken-clouds-day") {
    box.classList.add("broken-clouds-day");
  } else {
    box.classList.remove("broken-clouds-day");
  }
  if (iconName === "broken-clouds-night") {
    box.classList.add("broken-clouds-night");
  } else {
    box.classList.remove("broken-clouds-night");
  }
  if (iconName === "shower-rain-day") {
    box.classList.add("shower-rain-day");
  } else {
    box.classList.remove("shower-rain-day");
  }
  if (iconName === "shower-rain-night") {
    box.classList.add("shower-rain-night");
  } else {
    box.classList.remove("shower-rain-night");
  }
  if (iconName === "rain-day") {
    box.classList.add("rain-day");
  } else {
    box.classList.remove("rain-day");
  }
  if (iconName === "rain-night") {
    box.classList.add("rain-night");
  } else {
    box.classList.remove("rain-night");
  }
  if (iconName === "thunderstorm-day") {
    box.classList.add("thunderstorm-day");
  } else {
    box.classList.remove("thunderstorm-day");
  }
  if (iconName === "thunderstorm-night") {
    box.classList.add("thunderstorm-night");
  } else {
    box.classList.remove("thunderstorm-night");
  }
  if (iconName === "snow-day" || iconName === "snow-night") {
    box.classList.add("snow");
  } else {
    box.classList.remove("snow");
  }
  if (iconName === "mist-day" || iconName === "mist-night") {
    box.classList.add("mist");
  } else {
    box.classList.remove("mist");
  }
}

let searchFormElement = document.querySelector("#search-form");
searchFormElement.addEventListener("submit", searchSubmit);

searchCity("Lisbon");
