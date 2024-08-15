async function searchLocations(query) {
  const apiKey = 'aEpADrAj17YJB5hwr2yzDWgQ7lZ8A6jQ';
  const url = `https://dataservice.accuweather.com/locations/v1/cities/autocomplete?apikey=${apiKey}&q=${query}`;

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const locationData = await response.json();
    return locationData;
  } catch (error) {
    console.error('Error fetching location data:', error);
  }
}

export {searchLocations};
