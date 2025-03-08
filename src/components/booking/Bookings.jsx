import React, { useEffect, useState } from 'react'
import { cancelBooking, getAllBookings } from '../utils/ApiFunctions'
import BookingsTable from './BookingsTable'
import Header from '../common/Header'


const Bookings = () => {
    const[bookingInfo, setBookingInfo] = useState([])
    const[isLoading, setIsLoading] = useState(true)
    const[error, setError] = useState("")
    
    useEffect(() => {
        setTimeout(() => {
            getAllBookings().then((data) => {
                setBookingInfo(data)
                setIsLoading(false)
            }).catch((error) => {
                setError(error.message)
                setIsLoading(false)
            })
        }, 1000)
    }, [])

    const handleBookingCancelation = async(bookingId) => {
        try {
            await cancelBooking(bookingId)
            const data = await getAllBookings()
            setBookingInfo(data)
        } catch (error) {
            setError(error.message)
        }
    } 
  return (
    <section style={{backgroundColor:"whitesmoke"}}>
        <Header title={"Existing Bookings"}/>
        {error && <div className='text-danger'>{error}</div>}
        {isLoading ? (<div>Loading existing bookings...</div>
        ): (
            <BookingsTable 
            bookingInfo={bookingInfo} 
            handleBookingCancelation={handleBookingCancelation}/>
        )}
    </section>
  )
}

export default Bookings