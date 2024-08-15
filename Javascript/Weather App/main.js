import { searchLocations } from "./searchLocation.js";
import { getWeather } from "./getWeather.js";
import { dailyWeather } from "./dailyWeather.js";

const mainPage = document.querySelector(".main");

const searchBar = document.createElement("div");
searchBar.className = "searchBar";
const searchInput = document.createElement("input");
searchInput.type = "text";
searchInput.placeholder = "Search for a location...";
searchInput.className = "search-input";

searchInput.addEventListener("input", async (event) =>{
  const query = event.target.value.trim();
  if (query.length > 0) {
    const locations = Array(JSON.parse(JSON.stringify(await searchLocations(query))));
    showDropdown(locations);
  }
});
searchBar.appendChild(searchInput);

function showDropdown(locations) {
  clearDropdown();
  const dropdown = document.createElement('ul');
  dropdown.className = 'location-dropdown';
  for(let i=0;i<5;i++){
    const listItem = document.createElement('li');
    listItem.textContent = locations[0][i]["LocalizedName"];
    listItem.addEventListener("click", async ()=>{
      const weatherData = Array(JSON.parse(JSON.stringify(await getWeather(locations[0][i]["Key"]))));
      const weatherHead = document.createElement("div");
      weatherHead.className = "weatherHead";
      weatherHead.textContent = locations[0][i]["LocalizedName"];
      const weatherDesc = document.createElement("div");
      weatherDesc.className = "weatherDesc";
      weatherDesc.textContent =  weatherData[0]["Headline"]["Text"];
      weatherDesc.appendChild(dailyWeather(weatherData[0]["DailyForecasts"]));

      if(weatherCard.childElementCount!=0){
        weatherCard.replaceChildren();
      }

      weatherCard.appendChild(weatherHead);
      weatherCard.appendChild(weatherDesc);

      dropdown.replaceChildren();
      searchInput.value = "";
    });
    dropdown.appendChild(listItem);
  }
  searchBar.appendChild(dropdown);
}

function clearDropdown() {
  const existingDropdown = document.querySelector('.location-dropdown');
  if (existingDropdown) {
    existingDropdown.remove();
  }
}

const mainDisplay = document.createElement("div");
mainDisplay.className = "mainDisplay";

const weatherCard = document.createElement("div");
weatherCard.className = "weatherCard";

mainPage.appendChild(searchBar);
mainPage.appendChild(mainDisplay);
mainPage.appendChild(weatherCard);