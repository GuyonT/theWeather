const search = document.getElementById('text');
const errorMessage = document.getElementById('error-message');

async function getWeather() {
  try {
    errorMessage.style.display = 'none';
    search.classList.remove('error');

    const response = await fetch(
      `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${search.value}?key=GKKMBUALRNG4NNCMXY7XP733Y`
    );

    if (!response.ok) {
      throw new Error('CityNotFound');
    }

    const dataAPI = await response.json();
    console.log(dataAPI.resolvedAddress);
    for (let i = 0; i < 6; i++) {
      setWeatherObject(dataAPI, i);
    }
    console.log(weatherReports);
    return weatherReports;
  } catch (error) {
    search.classList.add('error');
    errorMessage.style.display = 'block';

    if (error.message === 'CityNotFound') {
      errorMessage.textContent = `Couldn't find "${search.value}". Please check the spelling and try again.`;
    } else {
      errorMessage.textContent = 'An error occurred. Please try again.';
    }

    console.error(error);
    return null;
  }
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

async function handleSubmit(e) {
  e.preventDefault();
  console.log(search.value);
  const weatherData = await getWeather();
  return weatherData;
}

export { handleSubmit };
