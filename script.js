"use strict";

// DOM elements
const description = document.querySelector(".description");
const city = document.querySelector(".city");
const temp = document.querySelector(".temp");
const unitBtn = document.querySelector(".unitBtn");
const feels = document.querySelector(".feels");
const humidity = document.querySelector(".humidity");
const unit = document.querySelectorAll(".unit");
const speedUnit = document.querySelector(".speedUnit");
const wind = document.querySelector(".wind");
const searchForm = document.querySelector(".search-box");
const search__input = document.querySelector(".search-box-input");

// Default Unit
let currentUnit = "metric";
unit.forEach((unit) => (unit.textContent = "C"));
speedUnit.textContent = "km/h";

// Weather API
const getWeather = async function (city, units = "metric") {
  try {
    const res =
      await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=${units}&appid=97d948c286a507ecf31718185c75dca2
    `);
    const data = await res.json();
    populate(data);
  } catch (err) {
    console.error(err);
  }
};

getWeather("montreal");

// Populate the fields
function populate(data) {
  description.textContent = data.weather[0].description;
  city.textContent = data.name;
  temp.textContent = Math.round(data.main.temp);
  feels.textContent = Math.round(data.main.feels_like);
  humidity.textContent = data.main.humidity;
  wind.textContent = (data.wind.speed * 3.6).toFixed(1);
}

// Switch units
unitBtn.addEventListener("click", function () {
  if (currentUnit == "metric") {
    currentUnit = "imperial";
    unit.forEach((unit) => (unit.textContent = "F"));
    speedUnit.textContent = "mph";
  } else {
    currentUnit = "metric";
    unit.forEach((unit) => (unit.textContent = "C"));
    speedUnit.textContent = "km/h";
  }
  getWeather("montreal", currentUnit);
});

// Search form
searchForm.addEventListener("submit", function (e) {
  e.preventDefault();
  if (search__input.value) {
    getWeather(search__input.value);
    search__input.value = "";
  } else {
    alert("Please enter a location");
  }
});
