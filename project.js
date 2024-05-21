document.getElementById('search-button').addEventListener('click', searchWeather);

function searchWeather() {
    const location = document.getElementById('location-input').value;
    if (location) {
        fetchWeatherData(location);
    }
}

function fetchWeatherData(location) {
    const apiKey = 'YOUR_API_KEY'; // Replace with your weather API key
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&appid=${apiKey}`;
    const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${location}&units=metric&appid=${apiKey}`;

    fetch(apiUrl)
        .then(response => response.json())
        .then(data => updateCurrentWeather(data))
        .catch(error => console.error('Error fetching weather data:', error));

    fetch(forecastUrl)
        .then(response => response.json())
        .then(data => updateForecast(data))
        .catch(error => console.error('Error fetching forecast data:', error));
}

function updateCurrentWeather(data) {
    document.getElementById('temperature').textContent = data.main.temp;
    document.getElementById('humidity').textContent = data.main.humidity;
    document.getElementById('wind-speed').textContent = data.wind.speed;
}

function updateForecast(data) {
    const forecastDays = document.getElementById('forecast-days');
    forecastDays.innerHTML = '';

    for (let i = 0; i < data.list.length; i += 8) {
        const forecast = data.list[i];
        const date = new Date(forecast.dt * 1000).toLocaleDateString();
        const temp = forecast.main.temp;
        const description = forecast.weather[0].description;

        const dayDiv = document.createElement('div');
        dayDiv.innerHTML = `
            <p>${date}</p>
            <p>${temp}°C</p>
            <p>${description}</p>
        `;
        forecastDays.appendChild(dayDiv);
    }
}
