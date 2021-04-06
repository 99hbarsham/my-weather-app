let today = document.querySelector(".today");

function setDate(date) {
  let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
  let day = days[date.getDay()]
  let time = date.getHours();
  let mins = date.getMinutes();

  today.innerHTML = `${day} ${time}:${mins}`
}

let date = new Date();
setDate(date);

function currentTemp(response) {
  let cityTemp = Math.round(response.data.main.temp);
  let temperature = document.querySelector("#todaysWeather");
  temperature.innerHTML = `${cityTemp}℃`
}

function displayCity(event) {
  event.preventDefault();
  let city = document.querySelector("#inputCity1")
  city = city.value;
  h1.innerHTML = `${city}`
  let apiKey = "7a61ea414ddbfb5e7496aa625238c0b3";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(currentTemp)
}

function showPosition(position) {
  console.log(position)
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  h1.innerHTML = `Current coordinates | ${lat} by ${lon}`
  let apiKey = "7a61ea414ddbfb5e7496aa625238c0b3";

  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;

  axios.get(apiUrl).then(currentTemp)
}

function getGeolocation() {
  navigator.geolocation.getCurrentPosition(showPosition);
}

let button = document.querySelector("button");
button.addEventListener("click", getGeolocation)


let form = document.querySelector("#inputCityForm");
let h1 = document.querySelector("h1")
form.addEventListener("submit", displayCity);

function changeWeatherToFahreinheit(event) {
  event.preventDefault();
  let temperature = document.querySelector("#todaysWeather");
  temperature.innerHTML = `67 ℉`
}

function changeWeatherToCelsius(event) {
  event.preventDefault();
  let temperature = document.querySelector("#todaysWeather");
  temperature.innerHTML = `17 ℃`
}

//let fahreinheitConvert = document.querySelector("#todaysWeatherFahreinheit")
//let celsiusConvert = document.querySelector("#todaysWeatherCelsius")

//fahreinheitConvert.addEventListener("click", changeWeatherToFahreinheit)
//celsiusConvert.addEventListener("click", changeWeatherToCelsius)