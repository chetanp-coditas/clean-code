const apiKey = 'YOUR_API_KEY';
const weatherContainer = document.getElementById('weatherContainer');
const getCurrentWeatherBtn = document.getElementById('getCurrentWeatherBtn');
const getWeatherForecastBtn = document.getElementById('getWeatherForecastBtn');

getCurrentWeatherBtn.addEventListener('click', getCurrentWeather);
getWeatherForecastBtn.addEventListener('click', getWeatherForecast);

function getCurrentWeather() {
  const location = document.getElementById('location').value;
  if (location === '') return;

  const currentWeather = `dummyurl`;

  fetch(currentWeather)
    .then(response => response.json())
    .then(data => {
      displayWeather(data);
    })
    .catch(error => {
      console.log('Error:', error);
      weatherContainer.innerHTML = 'Error fetching current weather';
    });
}

function getWeatherForecast() {
  const location = document.getElementById('location').value;
  if (location === '') return;

  const forecast = `forecaseurl`;

  fetch(forecast)
    .then(response => response.json())
    .then(data => {
      displayForecast(data);
    })
    .catch(error => {
      console.log('Error:', error);
      weatherContainer.innerHTML = 'Error fetching weather forecast';
    });
}

function displayWeather(data) {
  const weatherDescription = data.weather[0].description;
  const temperature = Math.round(data.main.temp - 273.15); // Convert from Kelvin to Celsius

  weatherContainer.innerHTML = `
    <h2>Current Weather</h2>
    <p>Location: ${data.name}</p>
    <p>Temperature: ${temperature}°C</p>
    <p>Weather: ${weatherDescription}</p>
  `;
}

function displayForecast(data) {
  const forecastItems = data.list.slice(0, 5); // Get the forecast for the next 5 days

  weatherContainer.innerHTML = `
    <h2>Weather Forecast</h2>
    ${forecastItems.map(item => {
      const date = new Date(item.dt_txt);
      const temperature = Math.round(item.main.temp - 273.15); // Convert from Kelvin to Celsius

      return `
        <div>
          <p>Date: ${date.toLocaleDateString()}</p>
          <p>Temperature: ${temperature}°C</p>
          <p>Weather: ${item.weather[0].description}</p>
        </div>
      `;
    }).join('')}
  `;
}
