const weatherForm = document.querySelector("#weather-form");
const cityNameInput = document.querySelector("#city-name-input");
const weatherCity = document.querySelector("#weather-city");
const weatherTemp = document.querySelector("#weather-temp");
const weatherFeelsLike = document.querySelector("#weather-feels-like");
const weatherDescription = document.querySelector("#weather-description");
const weatherHighLow = document.querySelector("#weather-high-low");

weatherForm.addEventListener("submit", async (event) => {
    event.preventDefault();
    weatherCity.textContent = "Loading...";
    weatherTemp.textContent = "";
    weatherFeelsLike.textContent = "";
    weatherDescription.textContent = "";
    weatherHighLow.textContent = "";
    try {
        const response = await fetch(
            `https://api-proxy-server-production-dfe7.up.railway.app/weather/${cityNameInput.value}`
        );
        if (response.ok) {
            const data = await response.json();
            weatherCity.textContent = data.name;
            weatherTemp.textContent = `Current Temp: ${data.main.temp} degrees`;
            weatherFeelsLike.textContent = `(Feels like ${data.main.feels_like})`;
            weatherDescription.textContent = `Description: ${data.weather[0].description}`;
            weatherHighLow.textContent = `High: ${data.main.temp_max} degrees / Low: ${data.main.temp_min}`;
        } else {
            if (response.status === 400) {
                throw new Error(
                    "Please do not include special characters in your request"
                );
            } else if (response.status === 429) {
                throw new Error(
                    "Request limit reached, please wait before making any more requests"
                );
            } else {
                throw new Error(
                    "Not found, please make sure the city name is spelled correctly"
                );
            }
        }
    } catch (err) {
        weatherCity.textContent = err;
        console.error(err);
    }
    cityNameInput.value = "";
});
