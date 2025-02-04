const search = document.getElementById('text');

async function getWeather() {
  const response = await fetch(
    `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${search.value}?key=GKKMBUALRNG4NNCMXY7XP733Y`
  );
  const dataAPI = await response.json();
  setWeatherObject(dataAPI, 0);
  setWeatherObject(dataAPI, 1);
  setWeatherObject(dataAPI, 2);
  setWeatherObject(dataAPI, 3);
  setWeatherObject(dataAPI, 4);
  setWeatherObject(dataAPI, 5);
  console.log(weatherReports);
}

function setWeatherObject(data, index) {
  const weatherKey = `weatherDay${index}`;
  weatherReports[weatherKey] = new WeatherReport(data, index);
}

class WeatherReport {
  constructor(data, index) {
    this.address = data.resolvedAddress;
    this.weather = data.days[index].conditions;
    this.temp = Math.round((data.days[index].temp - 32) * (5 / 9));
    this.icon = data.days[index].icon;
    this.sunrise = data.days[index].sunrise;
    this.sunset = data.days[index].sunset;
  }
}

const weatherReports = {};

function handleSubmit(e) {
  e.preventDefault();
  console.log(search.value);
  getWeather();
}

export { handleSubmit };
