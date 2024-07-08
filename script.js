document.addEventListener('DOMContentLoaded', () => {
    const weatherDiv = document.getElementById('weather');
  
    // Function to fetch weather data
    async function fetchWeather(lat, lon) {
      const url = `/weather?lat=${lat}&lon=${lon}`;
  
      try {
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error('Weather data not available');
        }
        const data = await response.json();
        displayWeather(data);
      } catch (error) {
        weatherDiv.innerHTML = `<p>${error.message}</p>`;
      }
    }
  
    // Function to display weather data
    function displayWeather(data) {
      const { name, main, weather } = data;
      weatherDiv.innerHTML = `
        <h2>${name}</h2>
        <p>${weather[0].description}</p>
        <p>Temperature: ${main.temp}°C</p>
        <p>Humidity: ${main.humidity}%</p>
      `;
    }
  
    // Function to get user's location
    function getLocation() {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          position => {
            const { latitude, longitude } = position.coords;
            fetchWeather(latitude, longitude);
          },
          () => {
            weatherDiv.innerHTML = '<p>Unable to retrieve your location</p>';
          }
        );
      } else {
        weatherDiv.innerHTML = '<p>Geolocation is not supported by this browser</p>';
      }
    }
  
    // Get user's location on page load
    getLocation();
  });
  