function dailyWeather(dailyWeatherData){
  const dailyWeatherDataDiv = document.createElement("div");
  dailyWeatherDataDiv.className = "dailyWeather";

  for(let i=0;i<5;i++){
    const dayWeather = document.createElement("div");
    dayWeather.textContent = `Max temperature: ${dailyWeatherData[i]["Temperature"]["Maximum"].Value}°${dailyWeatherData[i]["Temperature"]["Maximum"].Unit}`;

    dailyWeatherDataDiv.appendChild(dayWeather);
  }

  return dailyWeatherDataDiv;
}

export {dailyWeather};