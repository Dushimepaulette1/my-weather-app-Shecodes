function currentDate() {
  let date = new Date();
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[date.getDay()];
  let hours = date.getHours();
  let minutes = date.getMinutes();

  // Add leading zero to minutes if it's less than 10
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  let temperature = document.querySelector("#temperature");
  temperature.innerHTML = `${day} ${hours}:${minutes}`;
}
function handleSubmit(event) {
  event.preventDefault();
  let enterCity = document.querySelector("#search-form");
  let h1 = document.querySelector("#current-city");
  h1.innerHTML = `${enterCity.value}`;
}

currentDate();
let form = document.querySelector("#form-input");
form.addEventListener("submit", handleSubmit);

// Listen for the form submit event
document
  .getElementById("form-input")
  .addEventListener("submit", function (event) {
    // Prevent the form from reloading the page
    event.preventDefault();

    // Step 1: Store important elements in variables
    let searchInput = document.getElementById("search-form"); // The input where the user types the city name
    let cityElement = document.getElementById("current-city"); // The place where the city name will be displayed
    let temperatureElement = document.querySelector(
      ".current-temperature-value"
    ); // The place where the temperature will be shown

    // Step 2: Get the city name from the input field
    let city = searchInput.value; // Get the value entered by the user

    // Step 3: Define the API URL and key
    let apiKey = "409358oa0b2d74cc98fa66aabc1789t2"; // The API key for accessing the weather data
    let apiUrl = `https://api.shecodes.io/weather/v1/forecast?query=${city}&key=${apiKey}`; // The URL to get the weather data

    // Step 4: Make the API request to get the weather data
    axios
      .get(apiUrl)
      .then(function (response) {
        // Step 5: Get the weather information from the response
        let cityName = response.data.city; // Get the city name from the API response
        let todayTemperature = Math.round(
          response.data.daily[0].temperature.day
        ); // Get the current day's temperature and round it to a whole number

        // Step 6: Update the HTML with the city name and temperature
        cityElement.innerHTML = cityName; // Display the city name in the element
        temperatureElement.innerHTML = todayTemperature; // Display the temperature in the element
      })
      .catch(function (error) {
        // If there's an error (e.g., city not found), show an alert
        console.error("Error fetching weather data:", error);
        alert("Could not find weather information for that city.");
      });
  });
