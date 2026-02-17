// Your OpenWeatherMap API Key
const API_KEY = '5837ddd28aeab2f1511f076cb614ef3bYOUR_API_KEY_HERE';  // Replace with your actual API key
const API_URL = 'https://api.openweathermap.org/data/2.5/weather';

// Function to fetch weather data
function getWeather(city) {
    // Build the complete URL
    const url = `${API_URL}?q=${city}&appid=${API_KEY}&units=metric`;
    
    // Make API call using Axios
    axios.get(url)
        .then(function(response) {
            // Success! We got the data
            console.log('Weather Data:', response.data);
            displayWeather(response.data);
        })
        .catch(function(error) {
            // Something went wrong
            console.error('Error fetching weather:', error);
            document.getElementById('weather-display').innerHTML = 
                '<p class="loading">Could not fetch weather data. Please try again.</p>';
        });
}

// Function to display weather data
function displayWeather(data) {
    // Extract the data we need
    const cityName = data.name;
    const temperature = Math.round(data.main.temp);
    const description = data.weather[0].description;
    const icon = data.weather[0].icon;
    const iconUrl = `https://openweathermap.org/img/wn/${icon}@2x.png`;
    
    // Create HTML to display
    const weatherHTML = `
        <div class="weather-info">
            <h2 class="city-name">${cityName}</h2>
            <img src="${iconUrl}" alt="${description}" class="weather-icon">
            <div class="temperature">${temperature}°C</div>
            <p class="description">${description}</p>
        </div>
    `;
    
    // Put it on the page
    document.getElementById('weather-display').innerHTML = weatherHTML;
}

// Show welcome message on page load and set up search functionality
document.addEventListener('DOMContentLoaded', function() {
    const welcomeMessage = `
        <div class="welcome-message">
            <h2>Welcome to SkyFetch Weather Dashboard</h2>
            <p>Search for a city to get the current weather information</p>
        </div>
    `;
    document.getElementById('weather-display').innerHTML = welcomeMessage;
    
    // Get references to the search elements
    const searchBtn = document.getElementById('search-btn');
    const cityInput = document.getElementById('city-input');
    
    // Handle search button click
    searchBtn.addEventListener('click', function() {
        const city = cityInput.value.trim();
        if (city) {
            getWeather(city);
            cityInput.value = ''; // Clear input after search
        }
    });
    
    // Handle Enter key press in input field
    cityInput.addEventListener('keypress', function(event) {
        if (event.key === 'Enter') {
            const city = cityInput.value.trim();
            if (city) {
                getWeather(city);
                cityInput.value = ''; // Clear input after search
            }
        }
    });
});