export function renderWeather(data) {
  const weather = document.getElementById('weather-div');
  const temp = document.getElementById('temp-div');
  const sunrise = document.getElementById('sunrise-div');
  const sunset = document.getElementById('sunset-div');

  weather.innerText = data.weatherDay0.weather;
  temp.innerText = `${data.weatherDay0.temp}°C`;
  sunrise.innerText = `Sunrise: ${data.weatherDay0.sunrise}`;
  sunset.innerText = `Sunset: ${data.weatherDay0.sunset}`;
}
