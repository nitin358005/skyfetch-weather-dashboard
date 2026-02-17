// Your OpenWeatherMap API Key
const API_KEY = '5837ddd28aeab2f1511f076cb614ef3bYOUR_API_KEY_HERE';  // Replace with your actual API key
const API_URL = 'https://api.openweathermap.org/data/2.5/weather';

// Function to fetch weather data
async function getWeather(city) {
    // Build the complete URL
    const url = `${API_URL}?q=${city}&appid=${API_KEY}&units=metric`;
    
    // Show loading indicator
    showLoading();
    
    // Disable search button and show loading state
    const searchBtn = document.getElementById('search-btn');
    const originalText = searchBtn.textContent;
    searchBtn.disabled = true;
    searchBtn.textContent = 'Searching...';
    
    try {
        // Make API call using Axios
        const response = await axios.get(url);
        
        // Log the response (for debugging)
        console.log('Weather Data:', response.data);
        
        // Call displayWeather with response.data
        displayWeather(response.data);
        
    } catch (error) {
        // Log the error
        console.error('Error fetching weather:', error);
        
        // Generate appropriate error message based on error type
        let errorMessage = 'Could not fetch weather data. Please try again.';
        
        if (error.response) {
            // API responded with error status
            if (error.response.status === 404) {
                errorMessage = 'City not found. Please check the spelling and try again.';
            } else if (error.response.status === 401) {
                errorMessage = 'API key is invalid. Please check your configuration.';
            }
        } else if (error.request) {
            // Request was made but no response
            errorMessage = 'Network error. Please check your internet connection.';
        }
        
        // Call showError() with the error message
        showError(errorMessage);
        
    } finally {
        // Re-enable search button
        searchBtn.disabled = false;
        searchBtn.textContent = originalText;
    }
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

// Function to display error message
function showError(message) {
    // Create HTML for error message with emoji and styling
    const errorHTML = `
        <div class="error-message">
            <p>❌ <strong>${message}</strong></p>
        </div>
    `;
    
    // Display in #weather-display div
    document.getElementById('weather-display').innerHTML = errorHTML;
}

// Function to display loading indicator
function showLoading() {
    // Create loading HTML with spinner animation
    const loadingHTML = `
        <div class="loading-container">
            <div class="spinner"></div>
            <p class="loading-text">Loading weather data...</p>
        </div>
    `;
    
    // Display in #weather-display div
    document.getElementById('weather-display').innerHTML = loadingHTML;
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
        
        // Validate input
        if (!city) {
            showError('Please enter a city name');
            return;
        }
        
        if (city.length < 2) {
            showError('City name must be at least 2 characters');
            return;
        }
        
        // Proceed with search
        getWeather(city);
        cityInput.value = ''; // Clear input after search
    });
    
    // Handle Enter key press in input field
    cityInput.addEventListener('keypress', function(event) {
        if (event.key === 'Enter') {
            const city = cityInput.value.trim();
            
            // Validate input
            if (!city) {
                showError('Please enter a city name');
                return;
            }
            
            if (city.length < 2) {
                showError('City name must be at least 2 characters');
                return;
            }
            
            // Proceed with search
            getWeather(city);
            cityInput.value = ''; // Clear input after search
        }
    });
});