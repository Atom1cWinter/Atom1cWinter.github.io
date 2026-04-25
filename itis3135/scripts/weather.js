const citySelect = document.getElementById("city-select");
const getWeatherBtn = document.getElementById("get-weather-btn");
const weatherStatus = document.getElementById("weather-status");
const weatherIcon = document.getElementById("weather-icon");
const fallbackIcon = "about:blank";

async function getWeather(city) {
  try {
    // prettier-ignore
    const response = await fetch(
      `https://weather-proxy.freecodecamp.rocks/api/city/${city}`
    );
    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error);
  }
}

async function showWeather(city) {
  weatherStatus.textContent = "Loading current weather...";
  const data = await getWeather(city);

  if (!data || data.error) {
    weatherStatus.textContent = "Unable to load the forecast right now.";
    return;
  }

  const weatherInfo =
    data.weather && data.weather.length ? data.weather[0] : {};
  const mainInfo = data.main || {};
  const windInfo = data.wind || {};

  weatherIcon.src = weatherInfo.icon || fallbackIcon;
  weatherIcon.alt = weatherInfo.main
    ? `${weatherInfo.main} weather icon`
    : "Weather icon";
  document.getElementById("main-temperature").innerText =
    mainInfo.temp !== undefined && mainInfo.temp !== null
      ? mainInfo.temp
      : "N/A";
  document.getElementById("feels-like").innerText =
    mainInfo.feels_like !== undefined && mainInfo.feels_like !== null
      ? mainInfo.feels_like
      : "N/A";
  document.getElementById("humidity").innerText =
    mainInfo.humidity !== undefined && mainInfo.humidity !== null
      ? mainInfo.humidity
      : "N/A";
  document.getElementById("wind").innerText =
    windInfo.speed !== undefined && windInfo.speed !== null
      ? windInfo.speed
      : "N/A";
  document.getElementById("wind-gust").innerText =
    windInfo.gust !== undefined && windInfo.gust !== null
      ? windInfo.gust
      : "N/A";
  document.getElementById("weather-main").innerText = weatherInfo.main || "N/A";
  const locationName = data.name || "N/A";
  document.getElementById("location").innerText = locationName;
  weatherStatus.textContent = `Updated for ${data.name || city}.`;
}

getWeatherBtn.addEventListener("click", () => {
  const selectedCity = citySelect.value;
  if (selectedCity) {
    showWeather(selectedCity);
  } else {
    weatherStatus.textContent = "Choose a city before requesting weather.";
  }
});
