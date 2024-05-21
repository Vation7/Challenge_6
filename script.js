document.addEventListener('DOMContentLoaded', () => {
    const searchForm = document.getElementById('search-form');
    const cityInput = document.getElementById('city-input');
    const weatherInfo = document.getElementById('weather-info');
    const historyList = document.getElementById('history-list');

    // Initialize search history from localStorage
    let searchHistory = JSON.parse(localStorage.getItem('searchHistory')) || [];

    // Function to save search history to localStorage
    function saveToLocalStorage(city) {
        searchHistory.push(city);
        localStorage.setItem('searchHistory', JSON.stringify(searchHistory));
        renderHistory();
    }

    // Function to render search history
    function renderHistory() {
        historyList.innerHTML = '';
        searchHistory.forEach(city => {
            const li = document.createElement('li');
            li.textContent = city;
            li.addEventListener('click', () => {
                searchWeather(city);
            });
            historyList.appendChild(li);
        });
    }

    // Function to fetch weather data
    function fetchWeather(city) {
        const apiKey = 'YOUR_API_KEY';
        const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

        fetch(apiUrl)
            .then(response => response.json())
            .then(data => {
                displayWeather(data);
                saveToLocalStorage(city);
            })
            .catch(error => console.error('Error fetching weather:', error));
    }

    // Function to display weather data
    function displayWeather(data) {
        weatherInfo.innerHTML = `
            <h2>${data.name} (${new Date().toLocaleDateString()})</h2>
            <p>Temperature: ${data.main.temp}°C</p>
            <p>Humidity: ${data.main.humidity}%</p>
            <p>Wind Speed: ${data.wind.speed} m/s</p>
        `;
    }

    // Function to search weather for a city
    function searchWeather(city) {
        fetchWeather(city);
    }

    // Event listener for form submission
    searchForm.addEventListener('submit', e => {
        e.preventDefault();
        const city = cityInput.value.trim();
        if (city) {
            searchWeather(city);
            cityInput.value = '';
        }
    });

    // Initial render of search history
    renderHistory();
});
