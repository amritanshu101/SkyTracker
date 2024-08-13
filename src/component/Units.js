import React from 'react'

function Units({setSystem}) {
  return (
    <div className='my-4 text-white'>
      <span
        onClick={() => setSystem('metric')}
        className='px-2 py-1 setted-color rounded-s-2xl border-r btn'
        title='Celsius'
      >°C</span>
      
      <span
        onClick={() => setSystem('imperial')}
        className='px-2 py-1 setted-color rounded-e-2xl border-l btn'
        title='Fahrenheit'
      >°F</span>
    </div>
  )
}

export default Units
