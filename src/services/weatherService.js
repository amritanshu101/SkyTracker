import axios from 'axios';

const APIkey = process.env.REACT_APP_API_KEY;



export const fetchWeatherData = async (city, units) => {
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=${units}&appid=${APIkey}`;
  try {
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    console.error('Error fetching weather data:', error);
    throw error;
  }
};

export const fetchForecastData = async (lat, lon, units) => {
  const url_onecall = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&cnt=10&units=${units}&appid=${APIkey}`;
  try {
    const response = await axios.get(url_onecall);
    return response.data;
  } catch (error) {
    console.error('Error fetching forecast data:', error);
    throw error;
  }
};