import React, { useState } from "react";
import { getIcon } from "../utils/getIcon";
import { formatTime } from "../utils/formatTime";

function Card({ data, system }) {
  const [hide, setHide] = useState(true)
  const icon = getIcon(data.main)
  const now = new Date()
  const timestampInSeconds = Math.floor(now.getTime() / 1000)
  const timeNow = formatTime(timestampInSeconds + 10800 + data.timezone);
  const sunrise = formatTime(data.sunrise + 10800 + data.timezone)
  const sunset = formatTime(data.sunset + 10800 + data.timezone)

  return (
    <>
      <div className="px-3">
        <h1 className="text-3xl font-bold">{data.name}, {data.country}</h1>
        <p>{timeNow}</p>

        <main className="my-5 grid grid-cols-2 justify-items-center items-center gap-x-4 md:max-w-72">
          <span className="row-span-2 text-8xl drop-shadow-md">{icon}</span>
          
          <div className="text-5xl relative">
            {data.temp} 
            <span className="text-base absolute -right-5">
              {system === 'metric' ? '°C' : '°F'}
            </span>
          </div>
          <div className="capitalize text-center max-w-32">{data.description}</div>
        </main>
        
        <div className="xl:flex xl:gap-4">
          <div className="md:flex md:gap-4 md:flex-wrap">
            <section className="section">
              <div className="flex items-center gap-2">
                💧 Humidity  
              </div>
              {data.humidity}%
            </section>

            <section className="section">
              <div className="flex items-center gap-2">
                🌡️ Feels Like  
              </div>
              {data.feels_like}°
            </section>

            <section className="section">
              <div className="flex items-center gap-2">
                🍃 Wind  
              </div>
              {system === 'metric' ? (
                  `${(data.speed * 3.6).toFixed(1)} km/h`
                ) : (
                  `${(data.speed).toFixed(1)} mph`
                )
              }
            </section>
          </div>

          <div className={`transition-all duration-500 md:flex md:gap-4 md:flex-wrap md:max-h-36 ${hide ? 'max-h-0' : 'max-h-36'} overflow-hidden`}>
            <section className="section">
              <div className="flex items-center gap-2">
                👁️ Visibility  
              </div>
              {data.visibility/1000} km
            </section>

            <section className="section">
              <div className="flex items-center gap-2">
                🌅 Sunrise
              </div>
              {sunrise}
            </section>

            <section className="section">
              <div className="flex items-center gap-2">
                🌇 Sunset
              </div>
              {sunset}
            </section>
          </div>

          <button 
            onClick={() => setHide((prev) => !prev)}
            className="transition-all duration-500 text-mono4 hover:text-mono1 w-full text-right -my-1 px-2 md:hidden">
            {hide ? 'See more' : 'See less'}
          </button>
        </div>
      </div>
    </>
  );
}

export { Card };