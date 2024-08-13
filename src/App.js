import React, { useState, useEffect } from "react";
import { fetchWeatherData, fetchForecastData } from "./services/weatherService";
import { ImSpinner2 } from "react-icons/im";
import Form from "./component/Form";
import { Card } from "./component/Card";
import Forecast from "./component/Forecast";
import Units from "./component/Units";
import NotFound from "./component/NotFound";

function App() {
  const [city, setCity] = useState('Delhi');
  const [data, setData] = useState(null);
  const [hourlyForecast, setHourlyForecast] = useState(null);
  const [units, setUnits] = useState('metric');
  const [showErrorMsg, setShowErrorMsg] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const weatherData = await fetchWeatherData(city, units);

        const { dt, timezone, name, visibility, weather, sys: { country, sunrise, sunset }, main: { temp, humidity, feels_like }, wind: { speed } } = weatherData;
        const { main, description } = weather[0];

        setData({
          dt,
          timezone,
          name,
          visibility,
          country,
          sunrise,
          sunset,
          temp,
          humidity,
          feels_like,
          speed,
          main,
          description
        });

        const { coord } = weatherData;

        const forecastData = await fetchForecastData(coord.lat, coord.lon, units);

        const currentTimestamp = Math.floor(Date.now() / 1000);
        const currentTimestampLocal = currentTimestamp + 10800;

        const hourlyForecastData = forecastData.list
          .filter(day => day.dt >= currentTimestampLocal)
          .map(day => {
            const { dt, main: { temp }, weather } = day;
            const { main, description } = weather[0];
            return { dt, temp, main, timezone, description };
          });

        setHourlyForecast(hourlyForecastData);
        setShowErrorMsg(false);
      } catch (error) {
        console.error('Error fetching weather data:', error);
        setShowErrorMsg(true);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [city, units]);

  if (!data) {
    return (
      <div className="h-screen bg-mono3 flex justify-center items-center flex-col">
        <ImSpinner2 className="text-5xl animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen h-auto bg-gradient-to-tr from-gray-200 via-mono3 to-mono4 flex items-center flex-col">
      <Form setLocation={setCity} />
      <NotFound showErrorMsg={showErrorMsg} setShowErrorMsg={setShowErrorMsg} />
      <Units setSystem={setUnits} />

      {loading ? (
        <div>
          <ImSpinner2 className="text-5xl mt-36 animate-spin" />
        </div>
      ) : (
        <>
          <Card data={data} system={units} />
          <Forecast forecastData={hourlyForecast} system={units} />
        </>
      )}
    </div>
  );
}

export default App;