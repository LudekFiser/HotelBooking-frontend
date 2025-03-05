import React, { useEffect, useState } from 'react'
import BookingForm from './BookingForm'
import { getRoomById } from '../utils/ApiFunctions'
import { useParams } from 'react-router-dom'
import { FaClock, FaCocktail, FaParking, FaSnowflake, FaTshirt, FaUtensils, FaWifi, FaTv, FaWineGlassAlt} from "react-icons/fa"
import RoomCarousel from "../common/RoomCarousel"


const Checkout = () => {
  const[error, setError] = useState("")
  const[isLoading, setIsLoading] = useState(true)
  const[roomInfo, setRoomInfo] = useState({photo: "", roomType: "", roomPrice: ""})
  
  const{roomId} = useParams()


  useEffect(() => {
    setTimeout(() => {
      getRoomById(roomId).then((response) => {
        setRoomInfo(response)
        setIsLoading(false)
      }).catch((error) => {
        setError(error)
        setIsLoading(false)
      })
    }, 2000)
  }, [roomId])

  return (
    <div>
      <section className='container'>
        <div /*className='row flex-column flex-md-row align-items-center'*/ className='row'>
          <div /*className='col-md-3 mt-2'*/className="col-md-4 mt-5 mb-5">
            {isLoading ? (
              <p>Loading room information...</p>
            ): error ? (
              <p>{error}</p>
            ): (
              <div className='room-info'>
                <img 
                src={`data:image/png;base64,${roomInfo.photo}`} 
                alt='Room Photo' 
                style={{width : "100%", height : "200px" }}/>

                <table className='table table-bordered'>
                  <tbody>
                    <tr>
                      <th>Room Type :</th>
                      <td>{roomInfo.roomType}</td>
                    </tr>
                    <tr>
                      <th>Room Price :</th>
                      <td>${roomInfo.roomPrice}</td>
                    </tr>

                    <tr>
                      <th>Room Service:</th>
                      <td>
                        <ul className='list-unstyled'>
                          <li><FaWifi/> Wifi</li>
                          <li><FaTv/> Netflix Premium</li>
                          <li><FaUtensils/> Breakfast</li>
                          <li><FaWineGlassAlt/> Mini bar refreshment</li>
                          <li><FaParking/> Parking space</li>
                          <li><FaTshirt/> Laundry</li>
                          <li><FaSnowflake/> Air conditioning</li>
                        </ul>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            )}
          </div>

          <div className='col-md-8'>
            <BookingForm/>
          </div>
        </div>
      </section>

      <div className='container'>
        <RoomCarousel/>
      </div>
    </div>
  )
}

export default Checkout