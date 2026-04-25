const citySelect = document.getElementById("city-select");
const getWeatherBtn = document.getElementById("get-weather-btn");

async function getWeather(city) {
  try {
    const response = await fetch(
      `https://weather-proxy.freecodecamp.rocks/api/city/${city}`,
    );
    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error);
  }
}

async function showWeather(city) {
  const data = await getWeather(city);

  if (!data || data.error) {
    alert("Something went wrong, please try again later.");
    return;
  }

  document.getElementById("weather-icon").src = data.weather[0]?.icon || "";
  document.getElementById("main-temperature").innerText =
    data.main?.temp ?? "N/A";
  document.getElementById("feels-like").innerText =
    data.main?.feels_like ?? "N/A";
  document.getElementById("humidity").innerText = data.main?.humidity ?? "N/A";
  document.getElementById("wind").innerText = data.wind?.speed ?? "N/A";
  document.getElementById("wind-gust").innerText = data.wind?.gust ?? "N/A";
  document.getElementById("weather-main").innerText =
    data.weather[0]?.main ?? "N/A";
  document.getElementById("location").innerText = data.name ?? "N/A";
}

getWeatherBtn.addEventListener("click", () => {
  const selectedCity = citySelect.value;
  if (selectedCity) {
    showWeather(selectedCity);
  }
});
