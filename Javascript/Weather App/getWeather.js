async function getWeather(locationKey) {
  const apiKey = 'aEpADrAj17YJB5hwr2yzDWgQ7lZ8A6jQ';
  const url = `https://dataservice.accuweather.com/forecasts/v1/daily/5day/${locationKey}?apikey=${apiKey}`;

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const weatherData = await response.json();
    return weatherData;
  } catch (error) {
    console.error('Error fetching the weather data:', error);
  }
}

export {getWeather};
