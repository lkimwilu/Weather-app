const apiKey = "dba1b6df28ead84547c3ad37b640c99d";
// stores the api key needed to aunthenticate requests to the API

const apiUrl =  "https://api.openweathermap.org/data/2.5/weather";
// sets the base URL for the weather map api endpoint 

const locationInput =  document.getElementById("locationInput");
// selects the html element where the user will enter the location

const searchButton = document.getElementById("searchButton");
// selects the html button where the user will click on  search for the weather input

const temperatureElement = document.getElementById("temperature");

const locationElement = document.getElementById("location");
// selects the html element where the location and the name will be displayed

const descriptionElement = document.getElementById("description");
// selects the html element where the weather description will be displayed

searchButton.addEventListener("click", () => {
    const location = locationInput.value;
    if (location) {
        fetchWeather(location);
    
}
});

function fetchWeather(location) {
    const url = `${apiUrl}?q=${location}&appid=${apiKey}&units=metric`;
    // Defines a function that constructs the API request URL using the entered location,
    // API key and units set to metric.
    
    fetch(url)
       .then((response) => {
        if (!response.ok) {
            throw new Error("Weather data not available for the entered location");
        }
        return response.json();
       })
    //    sends a GET request to the OpenWeatherMap API, checks if the response is successful,
    // and converts the response to JSON.

    .then((data) => {
        locationElement.textContent = data.name;
        temperatureElement.textContent = `${Math.round(data.main.temp)}°C`;
        descriptionElement.textContent = data.weather[0].description;
    })
    // Updates the HTML elements with the location name, temperature,
    // and weather description received from the API response.

    .catch((error) => {
        console.error("Error fetching weather data:", error);
        locationElement.textContent = "Error fetching data";
        temperatureElement.textContent = "";
        descriptionElement.textContent = "";
    });
    // Handles any errors that may occur during the API request,
    // updates the HTML elements with an error message and clears the other elements.
       
}