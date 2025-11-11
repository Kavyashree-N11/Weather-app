// **IMPORTANT: Replace 'YOUR_OPENWEATHER_API_KEY' with your actual API key.**
const apiKey = 'a41e0f087e19994fa0e212db0c780775';

// Get references to HTML elements
const cityInput = document.getElementById('city-input');
const searchBtn = document.getElementById('search-btn');
const cityNameElement = document.getElementById('city-name');
const tempValueElement = document.getElementById('temp-value');
const celsiusBtn = document.getElementById('celsius');
const fahrenheitBtn = document.getElementById('fahrenheit');
const weatherDescriptionElement = document.getElementById('weather-description');
const weatherIconElement = document.getElementById('weather-icon');
const humidityValueElement = document.getElementById('humidity-value');
const windSpeedValueElement = document.getElementById('wind-speed-value');
const errorMessageElement = document.getElementById('error-message');

let isCelsius = true; // State variable to track current temperature unit
let currentWeatherData = null; // Stores the last fetched raw data for unit conversion

/**
 * Fetches weather data for a given city from the OpenWeather API.
 * @param {string} city - The name of the city to fetch weather for.
 */
async function getWeatherData(city) {
    try {
        errorMessageElement.style.display = 'none'; // Hide any previous error message

        // Construct the API URL. 'units=metric' fetches temperature in Celsius by default.
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`);

        // Check if the response was successful (status code 200-299)
        if (!response.ok) {
            // Handle specific HTTP error codes
            if (response.status === 404) {
                throw new Error('City not found. Please try again.');
            } else if (response.status === 401) {
                throw new Error('Invalid API Key. Please check your configuration.');
            }
            throw new Error(`Error: ${response.status} - ${response.statusText}`); // General error
        }

        const data = await response.json(); // Parse the JSON response
        currentWeatherData = data; // Store the raw data
        displayWeatherData(data); // Call function to update UI
    } catch (error) {
        console.error('Error fetching weather data:', error);
        errorMessageElement.textContent = error.message; // Display user-friendly error
        errorMessageElement.style.display = 'block';
        clearWeatherData(); // Clear previous weather display
        document.body.className = ''; // Reset background on error
    }
}

/**
 * Updates the UI with the fetched weather data.
 * @param {object} data - The weather data object from the OpenWeather API.
 */
function displayWeatherData(data) {
    // Populate basic information
    cityNameElement.textContent = data.name;
    weatherDescriptionElement.textContent = data.weather[0].description;
    humidityValueElement.textContent = `${data.main.humidity}%`;
    windSpeedValueElement.textContent = `${data.wind.speed} m/s`; // OpenWeather provides wind speed in m/s with units=metric

    // Update temperature based on current unit preference
    updateTemperatureDisplay();

    // Set weather icon based on the icon code from API
    const iconCode = data.weather[0].icon;
    weatherIconElement.innerHTML = `<img src="https://openweathermap.org/img/wn/${iconCode}@4x.png" alt="${data.weather[0].description}">`;

    // Optional: Set dynamic background theme
    setDynamicBackground(data.weather[0].main);
}

/**
 * Updates the displayed temperature value based on the `isCelsius` state.
 */
function updateTemperatureDisplay() {
    if (!currentWeatherData) return; // Do nothing if no data is loaded

    let temp = currentWeatherData.main.temp; // Temperature in Celsius (from initial fetch)
    if (!isCelsius) {
        temp = (temp * 9/5) + 32; // Convert Celsius to Fahrenheit
    }
    tempValueElement.textContent = Math.round(temp); // Display rounded temperature
}

/**
 * Clears all displayed weather information.
 */
function clearWeatherData() {
    cityNameElement.textContent = '';
    tempValueElement.textContent = '';
    weatherDescriptionElement.textContent = '';
    humidityValueElement.textContent = '';
    windSpeedValueElement.textContent = '';
    weatherIconElement.innerHTML = '';
    currentWeatherData = null; // Clear stored data
}

/**
 * Sets a dynamic background class on the body based on weather condition.
 * @param {string} weatherCondition - Main weather condition (e.g., "Clear", "Clouds", "Rain").
 */
function setDynamicBackground(weatherCondition) {
    document.body.className = ''; // Reset all classes first
    const condition = weatherCondition.toLowerCase();

    // Add specific classes based on weather condition
    if (condition.includes('clear')) {
        document.body.classList.add('sunny');
    } else if (condition.includes('cloud')) {
        document.body.classList.add('cloudy');
    } else if (condition.includes('rain') || condition.includes('drizzle')) {
        document.body.classList.add('rainy');
    } else if (condition.includes('snow')) {
        document.body.classList.add('snowy');
    } else if (condition.includes('thunderstorm')) {
        document.body.classList.add('thunderstorm');
    } else if (condition.includes('mist') || condition.includes('fog') || condition.includes('haze')) {
        document.body.classList.add('mist');
    } else {
        // Fallback to default background if no specific condition matches
        document.body.style.background = 'linear-gradient(to bottom right, #4facfe 0%, #00f2fe 100%)';
    }
}

// --- Event Listeners ---

// Search button click handler
searchBtn.addEventListener('click', () => {
    const city = cityInput.value.trim(); // Get city name and remove leading/trailing spaces
    if (city) {
        getWeatherData(city); // Fetch data if city name is provided
    } else {
        errorMessageElement.textContent = 'Please enter a city name.';
        errorMessageElement.style.display = 'block';
    }
});

// Enter key press handler in the input field
cityInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        searchBtn.click(); // Simulate a click on the search button
    }
});

// Celsius button click handler
celsiusBtn.addEventListener('click', () => {
    if (!isCelsius) { // Only update if not already Celsius
        isCelsius = true;
        celsiusBtn.classList.add('active-unit');
        fahrenheitBtn.classList.remove('active-unit');
        updateTemperatureDisplay();
    }
});

// Fahrenheit button click handler
fahrenheitBtn.addEventListener('click', () => {
    if (isCelsius) { // Only update if not already Fahrenheit
        isCelsius = false;
        fahrenheitBtn.classList.add('active-unit');
        celsiusBtn.classList.remove('active-unit');
        updateTemperatureDisplay();
    }
});

// Optional: Fetch weather for a default city when the page loads
window.addEventListener('load', () => {
    getWeatherData('London'); // You can set any default city here
});