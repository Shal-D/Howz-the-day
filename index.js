let dates = new Date();
function formatDate(date) {
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thrusday",
    "Friday",
    "Saturday"
  ];
  let months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December"
  ];
  let currentYear = dates.getFullYear();
  let currentDay = days[dates.getDay()];
  let currentMonth = months[dates.getMonth()];
  let currentDate = dates.getDate();
  let currentHours = dates.getHours();
  if (currentHours < 10) {
    currentHours = "0".concat(currentHours);
  }
  let currentMinutes = dates.getMinutes();
  if (currentMinutes < 10) {
    currentMinutes = "0".concat(currentMinutes);
  }
  let currentTime = `${currentHours} : ${currentMinutes}`;

  let formattedDate = ` <strong>${currentDate} ${currentMonth} ${currentYear}</strong> <br/> <em>${currentDay}</em>, ${currentTime}`;

  return formattedDate;
}
let dateElement = document.querySelector("div.date");
dateElement.innerHTML = formatDate(dates);

function displayWeatherCondition(response) {
  let temp = response.data.main.temp;
  let h1 = document.querySelector("h1");
  h1.innerHTML = `${temp}° C`;
  document.querySelector(
    "#humidity"
  ).innerHTML = `${response.data.main.humidity}%`;
  document.querySelector("#wind").innerHTML = `${Math.round(
    response.data.wind.speed
  )} km/h`;
  document.querySelector("div.city").innerHTML = response.data.name;
}

function searchCity(city) {
  let apiKey = "59af8519fd4330c56b1129272547754c";
  let apiUrl = "https://api.openweathermap.org/data/2.5/weather?q="
    .concat(city, "&appid=")
    .concat(apiKey, "&units=metric");
  axios.get(apiUrl).then(displayWeatherCondition);
}
function handleSubmit(event) {
  event.preventDefault();
  let city = document.querySelector("#city-input").value;
  searchCity(city);
}
function searchLocation(position) {
  let apiKey = "59af8519fd4330c56b1129272547754c";
  let apiUrl = "https://api.openweathermap.org/data/2.5/weather?lat="
    .concat(position.coords.latitude, "&lon=")
    .concat(position.coords.longitude, "&appid=")
    .concat(apiKey, "&units=metric");
  axios.get(apiUrl).then(displayWeatherCondition);
}
let searchForm = document.querySelector("form.d-flex");
searchForm.addEventListener("submit", handleSubmit);

function getCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchLocation);
}
let currentLocationButton = document.querySelector("button.currentLocation");
currentLocationButton.addEventListener("click", getCurrentLocation);
