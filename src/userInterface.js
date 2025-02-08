function createWeatherCard(index) {
  const card = document.createElement('div');
  card.className = `weather-card ${index === 0 ? 'active' : ''}`;
  card.dataset.index = index;
  card.innerHTML = `
    <h2>${index === 0 ? 'Today' : `Day ${index + 1}`}</h2>
    <div id="weather-div-${index}">weather</div>
    <div id="temp-div-${index}">temperature</div>
    <div id="sunrise-div-${index}">sunrise</div>
    <div id="sunset-div-${index}">sunset</div>
  `;
  return card;
}

export function renderWeather(data) {
  const container = document.getElementById('weather-main-container');
  container.innerHTML = '';

  for (let i = 0; i < 6; i++) {
    const card = createWeatherCard(i);
    container.appendChild(card);

    const weather = document.getElementById(`weather-div-${i}`);
    const temp = document.getElementById(`temp-div-${i}`);
    const sunrise = document.getElementById(`sunrise-div-${i}`);
    const sunset = document.getElementById(`sunset-div-${i}`);

    weather.innerText = data[`weatherDay${i}`].weather;
    temp.innerText = `${data[`weatherDay${i}`].temp}°C`;
    sunrise.innerText = `Sunrise: ${data[`weatherDay${i}`].sunrise}`;
    sunset.innerText = `Sunset: ${data[`weatherDay${i}`].sunset}`;
  }
}

export function initializeCarousel() {
  let currentIndex = 0;
  const cards = document.querySelectorAll('.weather-card');
  const prevButton = document.getElementById('prevDay');
  const nextButton = document.getElementById('nextDay');

  function showCard(index) {
    cards.forEach((card) => card.classList.remove('active'));
    cards[index].classList.add('active');
  }

  prevButton.addEventListener('click', () => {
    currentIndex = (currentIndex - 1 + cards.length) % cards.length;
    showCard(currentIndex);
  });

  nextButton.addEventListener('click', () => {
    currentIndex = (currentIndex + 1) % cards.length;
    showCard(currentIndex);
  });
}
