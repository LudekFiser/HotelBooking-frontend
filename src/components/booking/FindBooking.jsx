import React, { useState } from 'react'
import { cancelBooking, getBookingByConfirmationCode } from '../utils/ApiFunctions'
import moment from 'moment'
import BookingSummary from './BookingSummary'



const FindBooking = ({payment}) => {
    const[confirmationCode, setConfirmationCode] = useState("")
    const[error, setError] = useState("")
    const[successMessage, setSuccessMessage] = useState("")
    const[isLoading, setIsLoading] = useState(false)
    const[isDeleted, setIsDeleted] = useState(false)
    const[bookingInfo, setBookingInfo] = useState({
        id: "",
        bookingConfirmationCode: "",
        room: {id: "", roomType: ""},
        roomNumber: "",
        checkInDate: "",
        checkOutDate: "",
        guestFullName: "",
        guestEmail: "",
        numberOfAdults: "",
        numberOfChildren: "",
        totalNumberOfGuests: ""
    })
    
    const emptyBookingInfo = {
        id: "",
        bookingConfirmationCode: "",
        room: {id: "", roomType: ""},
        roomNumber: "",
        checkInDate: "",
        checkOutDate: "",
        guestFullName: "",
        guestEmail: "",
        numberOfAdults: "",
        numberOfChildren: "",
        totalNumberOfGuests: ""
    }

    const handleInputChange = (event) => {
        setConfirmationCode(event.target.value)
    }

    const handleFormSubmit = async(event) => {
        event.preventDefault()
        setIsLoading(true)

        try {
            const data = await getBookingByConfirmationCode(confirmationCode)
            setBookingInfo(data)
            setError(null)
        } catch (error) {
            setBookingInfo(emptyBookingInfo)
            if(error.response && error.response.status === 404) {
                setError(error.response.data.message)
            } else {
                setError(error.message)
            }
        }
        setTimeout(() => {
            setIsLoading(false)
        }, 2000)
    }

    const handleBookingCancelation = async (bookingId) => {
        try {
            await cancelBooking(bookingInfo.id)
            setIsDeleted(true)
            setSuccessMessage("Booking has been cancelled succesfully!")
            setBookingInfo(emptyBookingInfo)
            setConfirmationCode("")
            setError("")
        } catch (error) {
            setError(error.message)
        }
        setTimeout(() => {
            setSuccessMessage("")
            setIsDeleted(false)
        }, 2000)
    }


 


  return (
    <>
        <div className='container mt-5 d-flex flex-column justify-content-center align-items-center'>
            <h2>Find My Booking</h2>
            <form onSubmit={handleFormSubmit} className='col-md-6'>
                <div className='input-group mb-3'>
                    <input 
                    className='form-control' 
                    id="confirmationCode" 
                    name="confirmationCode"
                    value={confirmationCode}
                    onChange={handleInputChange}
                    placeholder='Enter the booking confirmation code'
                    />

                    <button className='btn btn-hotel input-group-text'>Find booking</button>
                </div>
            </form>

            {isLoading ? (
                <div>Finding your booking....</div>
            ) : error ? (
            <div className='text-danger'>Error: {error}</div>
            ) : bookingInfo.bookingConfirmationCode ? (
                <div className='col-md-6 md-4 mb-5'>
                    <h3>Booking Information</h3>
                    <p>Booking Confirmation Code : {bookingInfo.bookingConfirmationCode}</p>
                    <p>Room Number : {bookingInfo.room.id}</p>
                    <p>Room Type : {bookingInfo.room.roomType}</p>

                    <p>
                        Check-in Date : {" "}
                        {moment(bookingInfo.checkInDate).subtract(1, "month").format("MMM Do, YYYY")}
                    </p>
                    <p>
                        Check-out Date : {" "}
                        {moment(bookingInfo.checkOutDate).subtract(1, "month").format("MMM Do, YYYY")}
                    </p>

                    <p>Full name : {bookingInfo.guestFullName}</p>
                    <p>Email Address : {bookingInfo.guestEmail}</p>
                    <p>Adults : {bookingInfo.numberOfAdults}</p>
                    <p>Children : {bookingInfo.numberOfChildren}</p>
                    <p>Total Guests : {bookingInfo.totalNumberOfGuests}</p>

                    {!isDeleted && (
                        <button 
                            className='btn btn-danger' 
                            onClick={() => handleBookingCancelation(bookingInfo.id)}>Cancel Booking</button>
                    )}
                </div>
            ) : (
                <div>Enter confirmation code</div>
            )}

            {isDeleted && <div className='alert alert-success mt-3 fade show'>{successMessage}</div>}
        </div>
    </>
  )
}

export default FindBooking