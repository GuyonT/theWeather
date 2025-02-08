import './styles.css';
import { handleSubmit } from './weatherAPI';
import { renderWeather, initializeCarousel } from './userInterface';

// Set initial theme
document.body.dataset.theme = 'light';
document.addEventListener('DOMContentLoaded', () => {
  //wait the page is fully loaded before anything
  const themeToggle = document.getElementById('themeToggle');
  themeToggle.addEventListener('click', () => {
    if (document.body.dataset.theme === 'dark') {
      document.body.dataset.theme = 'light';
      themeToggle.innerHTML = '&#x263D';
    } else {
      document.body.dataset.theme = 'dark';
      themeToggle.innerHTML = '&#x263C';
    }
  });
});

//form search
const form = document.querySelector('form');

form.addEventListener('submit', async (e) => {
  const weatherData = await handleSubmit(e);
  if (weatherData) {
    renderWeather(weatherData);
    document.getElementById('weather-main-container').style.display = 'grid';
    document.getElementById('carousel-buttons-container').style.display =
      'flex';
    initializeCarousel();
  }
});

//weather parser
