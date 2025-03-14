import React, { useState, useEffect } from "react";
import MainHeader from '../layout/MainHeader'
import HotelService from '../common/HotelService'
import Parallax from '../common/Parallax'
import RoomCarousel from '../common/RoomCarousel'
import RoomSearch from '../common/RoomSearch'
import { useLocation } from 'react-router-dom'

const Home = () => {
  const location = useLocation()
  //const message = location.state && location.state.message
  const currentUser = localStorage.getItem("userId")
  const [message, setMessage] = useState(location.state?.message || "");

  useEffect(() => {
    if (message) {
      const timer = setTimeout(() => {
        setMessage(null); // ✅ Celý element zmizí
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [message]);
  

  return (
    <section>
      {message !== null && <p className='text-warning px-5 text-center'>{message}</p>}
      {currentUser && (
        <h6 className='text-success text-center'>You are logged-In as {currentUser}</h6>
      )}
        <MainHeader/>

        <section className='container'>
          <RoomSearch/>
          <RoomCarousel/>
          <Parallax/>
          <RoomCarousel/>
          <HotelService/>
          <Parallax/>
          <RoomCarousel/>
        </section>
    </section>
  )
}

export default Home