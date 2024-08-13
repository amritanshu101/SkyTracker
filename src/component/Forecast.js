import React, { useState } from 'react'
import { getIcon } from '../utils/getIcon';
import { formatTime } from '../utils/formatTime';
import { IoIosArrowDropleftCircle, IoIosArrowDroprightCircle } from "react-icons/io";

function Forecast({forecastData, system}) {
  const [offset, setOffset] = useState(0)
  const [leftOpacity, setLeftOpacity] = useState(0.4)
  const [rightOpacity, setRightOpacity] = useState(1)
  const spacing = 150

  function handleLeftClick() {
    if (offset !== 0) {
      setOffset(offset + spacing)
      setRightOpacity(1)
    }
    if (offset >= -spacing) {
      setLeftOpacity(0.4)
    }
  }

  function handleRightClick() {
    if (offset > 3*(-spacing)){
      setOffset(offset - spacing)
      setLeftOpacity(1)
    }
    if (offset === 2*(-spacing)) {
      setRightOpacity(0.4)
    }
  }

  return (
    <>
      {/* <h3>Forecast</h3> */}
      <div className='relative flex flex-none items-center overflow-hidden md:overflow-visible'>
        <ul className='flex gap-5 max-w-xs transition duration-500 p-5 md:max-w-none' style={{ transform: `translateX(${offset}px)` }}>
            
            { forecastData &&
            forecastData.slice(0, 5).map((item, id) => {
                const time = formatTime(item.dt + item.timezone);
                const icon = getIcon(item.main)
                return (
                    <li key={id} className='rounded-3xl setted-color p-5 text-center w-[130px] flex-none'>
                        <p>{time}</p>
                        <p className='text-5xl my-1 drop-shadow-lg inline-block'>{icon}</p>
                        <p>
                          {item.temp}{system === 'metric' ? '°C' : '°F'}
                        </p>
                    </li>
                );
            }
            )}
        </ul>
        
        <IoIosArrowDropleftCircle
          className={`text-2xl absolute md:hidden ${leftOpacity < 1 ? 'cursor-default' : 'cursor-pointer'}`}
          style={{ opacity: leftOpacity }}
          onClick={handleLeftClick}
        />
        <IoIosArrowDroprightCircle
          className={`text-2xl absolute right-0 md:hidden ${rightOpacity < 1 ? 'cursor-default' : 'cursor-pointer'}`}
          style={{ opacity: rightOpacity }}
          onClick={handleRightClick}
        />
      </div>
    </>
  )
}

export default Forecast
