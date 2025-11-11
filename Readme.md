🌦️ Weather App (Fetch API)
📋 Objective

Build a dynamic weather application that fetches and displays real-time weather information for any city using the OpenWeather API.
The app includes features like interactive weather icons, temperature unit toggling, and error handling.

🚀 Features

✅ Search any city to get live weather updates
✅ Displays:

🌡️ Temperature (in Celsius or Fahrenheit)

💧 Humidity

🌬️ Wind Speed

🌥️ Weather Description & Icons

✅ Toggle between Celsius and Fahrenheit
✅ Gracefully handles invalid city names or network errors
✅ Fully responsive design (works on desktop & mobile)
✅ (Optional) Dynamic background themes that change with the weather (e.g., sunny = warm tones, rainy = cool tones)

🧠 Technologies Used

HTML5 — Structure

CSS3 — Styling & responsiveness

JavaScript (Fetch API) — Dynamic data fetching and interactivity

OpenWeatherMap API — Real-time weather data source

⚙️ How It Works

The user enters a city name in the search box.

The app sends a request to the OpenWeather API using fetch().

The response returns data like:

Temperature

Weather description

Humidity

Wind speed

Weather icon code

The app displays this information dynamically in the UI.

Users can toggle between Celsius ↔ Fahrenheit.

🔑 API Setup

Go to OpenWeatherMap

Create a free account and get your API key.

In your script.js, store it like this:

const apiKey = "YOUR_API_KEY_HERE";


(In real projects, API keys should be stored in a .env file and added to .gitignore)

📁 Project Structure
weather-app/
├── index.html
├── style.css
├── script.js
├── .gitignore
└── README.md

💻 How to Run

Download or clone the repository:

git clone https://github.com/your-username/weather-app.git


Open the folder in your code editor.

Replace "YOUR_API_KEY_HERE" in script.js with your actual OpenWeather API key.

Open index.html in your browser.

🎨 Optional Enhancements

Change background images dynamically (e.g., sunny, rainy, cloudy)

Add loading spinners while fetching data

Use localStorage to remember the last searched city

Add geolocation feature to show weather for your current location

📸 Preview

(Add a screenshot or demo GIF here once your app is running)

🧑‍💻 Author

Kavyashree N
Project: Weather App (Fetch API)
Built for learning and practice using HTML, CSS, and JavaScript 🌤️