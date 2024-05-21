document.getElementById('fetch-weather').addEventListener('click', function() {
    const city = document.getElementById('city-input').value;
    if (city) {
        fetchWeather(city);
    }
});

function fetchWeather(city) {
    const apiKey = 'YOUR_API_KEY';
    const apiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}`;

    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            displayWeather(data);
        })
        .catch(error => console.error('Error fetching the weather data:', error));
}

function displayWeather(data) {
    const weatherInfo = document.getElementById('weather-info');
    weatherInfo.innerHTML = '';

    if (data.cod === '200') {
        data.list.forEach(forecast => {
            const forecastElement = document.createElement('div');
            forecastElement.innerHTML = `
                <p>${new Date(forecast.dt_txt).toLocaleString()}</p>
                <p>Temperature: ${(forecast.main.temp - 273.15).toFixed(2)}°C</p>
                <p>Weather: ${forecast.weather[0].description}</p>
            `;
            weatherInfo.appendChild(forecastElement);
        });
    } else {
        weatherInfo.innerHTML = `<p>City not found</p>`;
    }
}
