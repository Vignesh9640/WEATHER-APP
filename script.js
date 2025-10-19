const apiKey = "abda28abd26b41d1f2f66af20a38cf9b";

async function getWeather() {
  const city = document.getElementById("city-input").value.trim();
  const weatherInfo = document.getElementById("weather-info");

  if (city === "") {
    weatherInfo.innerHTML = "<p>Please enter a city name!</p>";
    return;
  }

  fetchWeatherData(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`);
}

async function getLocationWeather() {
  const weatherInfo = document.getElementById("weather-info");
  weatherInfo.innerHTML = "<p>📡 Getting your location...</p>";

  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const lat = position.coords.latitude;
        const lon = position.coords.longitude;
        fetchWeatherData(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`);
      },
      (error) => {
        weatherInfo.innerHTML = "<p style='color:red;'>❌ Unable to access location.</p>";
      }
    );
  } else {
    weatherInfo.innerHTML = "<p style='color:red;'>❌ Geolocation not supported by your browser.</p>";
  }
}

async function fetchWeatherData(url) {
  const weatherInfo = document.getElementById("weather-info");

  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error("City not found");

    const data = await response.json();
    const { name } = data;
    const { temp, humidity } = data.main;
    const { description, icon } = data.weather[0];

    weatherInfo.innerHTML = `
      <h2>${name}</h2>
      <img src="https://openweathermap.org/img/wn/${icon}@2x.png" alt="Weather Icon">
      <p>🌡 Temperature: ${temp}°C</p>
      <p>💧 Humidity: ${humidity}%</p>
      <p>🌥 Condition: ${description}</p>
    `;
  } catch (error) {
    weatherInfo.innerHTML = `<p style="color:red;">❌ ${error.message}</p>`;
  }
}
