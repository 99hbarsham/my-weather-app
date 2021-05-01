let today = document.querySelector(".today");

function setDate(date) {
  let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
  let day = days[date.getDay()]
  let time = date.getHours();
  let mins = date.getMinutes();

  if (date.getMinutes() < 10) {
    mins = `0`+mins
  }

  today.innerHTML = `${day} ${time}:${mins} (GMT)`
}

let date = new Date();
setDate(date);

function currentExtras(response) {
  let cityHumidity = response.data.main.humidity;
  let humidity = document.querySelector("#humidity");
  humidity.innerHTML = `Humidity: ${cityHumidity}%`
  let cityWindSpeed = response.data.wind.speed;
  let windSpeed = document.querySelector("#windSpeed");
  windSpeed.innerHTML = `Wind speed: ${cityWindSpeed} m/s`
  //let cityPrecipitation = response.data.main.precipitation;
  //let precipitation = document.querySelector("#precipitation");
  //precipitation.innerHTML = `Precipitation: ${cityPrecipitation}`
}

function currentDesc(response) {
  let cityDesc = response.data.weather[0].description;
  let description = document.querySelector("#todaysDescription");
  description.innerHTML = `${cityDesc}`
  currentExtras(response)
}

function displayForecast() {
  let forecastElement = document.querySelector("#forecast");

  let forecastHTML = `<div class="row">`;
  let days = ["Thu", "Fri", "Sat", "Sun", "Mon"];

  days.forEach(function(day) {
    forecastHTML = forecastHTML + `
      <div class="col g-3 forecastCol">
          <i class="fas fa-sun"></i>
          <div class="forecast-day">${day}</div>
          <div class="forecast-temp">
              <span class="weather-forecast-max">12</span>
              <span class="weather-forecast-min">7</span>
          </div>
      </div>
    
    `
  })

  forecastHTML = forecastHTML + `</div/>`
    
  forecastElement.innerHTML = forecastHTML
}

function currentTemp(response) {
  let city = document.querySelector("#inputCity1")
  city = response.data.name;
  h1.innerHTML = `${city}`
  let cityTemp = Math.round(response.data.main.temp);
  let temperature = document.querySelector("#todaysTemperature");
  temperature.innerHTML = `${cityTemp}`
  let cityIcon = response.data.weather[0].icon;
  let icon = document.querySelector("#weatherIcon");
  icon.setAttribute("src", `http://openweathermap.org/img/wn/${cityIcon}@2x.png`)
  icon.setAttribute("alt", `response.data.weather[0].description`)
  
  currentDesc(response)
  
  celsiusTemperature = response.data.main.temp
  
  displayForecast()
}

function handleSubmit(event) {
  event.preventDefault();
  let cityInputElement = document.querySelector("#inputCity1")
  search(cityInputElement.value);
}

function search(city) {
  let apiKey = "7a61ea414ddbfb5e7496aa625238c0b3";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(currentTemp)
}

function showPosition(position) {
  console.log(position)
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  h1.innerHTML = `${lat} by ${lon}`
  let apiKey = "7a61ea414ddbfb5e7496aa625238c0b3";

  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;

  axios.get(apiUrl).then(currentTemp)
}

function getGeolocation() {
  navigator.geolocation.getCurrentPosition(showPosition);
}

let button = document.querySelector("button");
button.addEventListener("click", getGeolocation)

let h1 = document.querySelector("h1");
let form = document.querySelector("#inputCityForm");
form.addEventListener("submit", handleSubmit);

search("New York")



function changeWeatherToFahreinheit(event) {
  event.preventDefault();
  let temperature = document.querySelector("#todaysTemperature");
  celsiusConvert.classList.remove("active");
  fahreinheitConvert.classList.add("active");
  let fahreinheitTemperature = ((9/5)*celsiusTemperature + 32)
  temperature.innerHTML = Math.round(`${fahreinheitTemperature}`)
}

let celsiusTemperature = null;

function changeWeatherToCelsius(event) {
  event.preventDefault();
  let temperature = document.querySelector("#todaysTemperature");
  celsiusConvert.classList.add("active");
  fahreinheitConvert.classList.remove("active");
  temperature.innerHTML = Math.round(celsiusTemperature)
}

let fahreinheitConvert = document.querySelector("#todaysWeatherFahreinheit")
let celsiusConvert = document.querySelector("#todaysWeatherCelsius")

fahreinheitConvert.addEventListener("click", changeWeatherToFahreinheit)
celsiusConvert.addEventListener("click", changeWeatherToCelsius)