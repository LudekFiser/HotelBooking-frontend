import React from 'react'

const MainHeader = () => {
  return (
    <header className='header-banner'>
        <div className='overlay'></div>
        <div className='animated-texts overlay-content'>
            <h1>Welcome to <span className='hotel-color'>Gary's Hotel</span></h1>
            <h4>Experince the Best hospitality in Town</h4>
        </div>
    </header>
  )
}

export default MainHeader