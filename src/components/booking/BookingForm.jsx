import React, { useEffect, useState } from 'react'
import { bookRoom, getRoomById } from '../utils/ApiFunctions'
import { useNavigate, useParams } from 'react-router-dom'
import  moment  from 'moment'
import { Form, FormControl, Button } from "react-bootstrap"
import BookingSummary from './BookingSummary'

const BookingForm = () => {
  const[isValidated, setIsValidated] = useState(false)
  const[isSubmitted, setIsSubmitted] = useState(false)
  const[errorMessage, setErrorMessage] = useState("")
  const[roomPrice, setRoomPrice] = useState(0)
  const[booking, setBooking] = useState({
    guestFullName : "",
    guestEmail : "",
    checkInDate : "",
    checkOutDate : "",
    numberOfAdults : "",
    numberOfChildren : "",
  })
  const[roomInfo, setRoomInfo] = useState({
    photo : "",
    roomType : "",
    roomPrice : ""
  })

  const{roomId} = useParams()
  const navigate = useNavigate()

  const handleInputChange = (e) => {
    const{name, value} = e.target
    setBooking({...booking, [name]: value})
    setErrorMessage("")
  }

  const getRoomPriceById = async (roomId) => {
    try {
      const response = await getRoomById(roomId)
      setRoomPrice(response.roomPrice)
    } catch (error) {
      throw new Error(error)
    }
  }

  useEffect(() => {
    getRoomPriceById(roomId)
  }, [roomId])

  const calculatePayment = () => {
    const checkInDate = moment(booking.checkInDate)
    const checkOutDate = moment(booking.checkOutDate)
    const diffInDays = checkOutDate.diff(checkInDate, "days")
    const pricePerDay = roomPrice ? roomPrice : 0
    const priceForKids = booking.numberOfChildren * 5
    const priceForAdults = booking.numberOfAdults * 10
    //return (diffInDays * pricePerDay) + priceForKids + priceForAdults
    const priceForRoom = diffInDays * pricePerDay
    
    return {
        total: priceForRoom + priceForKids + priceForAdults,
        priceForKids,
        priceForAdults,
        priceForRoom
    };
  }

  const isGuestCountValid = () => {
    const adultCount = parseInt(booking.numberOfAdults)
    const childrenCount = parseInt(booking.numberOfChildren)
    const totalCount = adultCount + childrenCount
    return totalCount >= 1 && adultCount >= 1
  }

  const isCheckOutDateValid = () => {
    if(!moment(booking.checkOutDate).isSameOrAfter(moment(booking.checkInDate))) {
      setErrorMessage("Check-out date must come after the Check-in date")
      return false
    } else {
      setErrorMessage("")
      return true
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const form = e.currentTarget
    if(form.checkValidity() === false || !isGuestCountValid() || !isCheckOutDateValid()) {
      e.stopPropagation()
    } else {
      setIsSubmitted(true)
    }
    setIsValidated(true)
  }

  const handleFormSubmit = async () => {
    try {
      const confirmationCode = await bookRoom(roomId, booking)
      setIsSubmitted(true)
      navigate("/booking-success", {state:{message : confirmationCode}})
    } catch (error) {
      /*setErrorMessage(error.message)*/
      const errorMessage = error.message
      navigate("/booking-success", {state:{error : errorMessage}})
    }
  }

  return (
    <>
      <div className='container mb-5'>
        <div className='row'>
          <div className='col-md-6'>
            <div className='card card-body mt-5'>
              <h4 className='card-title'>Reserve a Room</h4>
              <Form noValidate validated={isValidated} onSubmit={handleSubmit}>
                <Form.Group>
                  <Form.Label htmlFor='guestFullName' className='hotel-color'> Full Name :</Form.Label>
                  <FormControl 
                  required 
                  type='text' 
                  id='guestFullName' 
                  name='guestFullName' 
                  value={booking.guestFullName}
                  placeholder='Enter your full name'
                  onChange={handleInputChange}/>

                  <Form.Control.Feedback type='invalid'>
                    Please enter your fullname
                  </Form.Control.Feedback>
                </Form.Group>

                <Form.Group>
                  <Form.Label htmlFor='guestEmail' className='hotel-color'> Email :</Form.Label>
                  <FormControl 
                  required 
                  type='email' 
                  id='guestEmail' 
                  name='guestEmail' 
                  value={booking.guestEmail}
                  placeholder='Enter your email'
                  onChange={handleInputChange}/>

                  <Form.Control.Feedback type='invalid'>
                    Please enter your email
                  </Form.Control.Feedback>
                </Form.Group>

                <fieldset style={{border: "2px"}}>
                  <legend>Lodging period</legend>
                  <div className='row'>

                    <div className='col-6'>
                      <Form.Label htmlFor='checkInDate' className='hotel-color'> Check-In date :</Form.Label>

                      <FormControl 
                      required 
                      type='date' 
                      id='checkInDate' 
                      name='checkInDate' 
                      value={booking.checkInDate}
                      placeholder='check-in date'
                      min={moment().format("YYYY-MM-DD")}
                      onChange={handleInputChange}/>

                      <Form.Control.Feedback type='invalid'>
                        Please select a valid check-in date
                      </Form.Control.Feedback>
                    </div>

                    <div className='col-6'>
                      <Form.Label htmlFor='checkOutDate' className='hotel-color'> Check-Out date :</Form.Label>

                      <FormControl 
                      required 
                      type='date' 
                      id='checkOutDate' 
                      name='checkOutDate' 
                      value={booking.checkOutDate}
                      placeholder='check-out date'
                      /*min={moment().format("MMM Do, YYYY")}*/
                      min={booking.checkInDate ? moment(booking.checkInDate).add(1, "days").format("YYYY-MM-DD") : ""}
                      onChange={handleInputChange}/>

                      <Form.Control.Feedback type='invalid'>
                        Please select a valid check-out date
                      </Form.Control.Feedback>
                    </div>
                    {errorMessage && <p className='error-message text-danger'>{errorMessage}</p>}
                  </div>
                </fieldset>

                <fieldset>
                  <legend>Number of Guests</legend>
                  <div className='row'>
                    <div className='col-6'>
                      <Form.Label htmlFor='numberOfAdults' className='hotel-color'>{Number(booking.numberOfAdults) === 1 ? "Adult" : "Adults"} :</Form.Label>

                      <FormControl 
                      required 
                      type='number' 
                      id='numberOfAdults' 
                      name='numberOfAdults' 
                      value={booking.numberOfAdults}
                      placeholder='0'
                      min={1}
                      onChange={handleInputChange}/>

                      <Form.Control.Feedback type='invalid'>
                        Please enter at least 1 adult
                      </Form.Control.Feedback>
                    </div>

                    <div className='col-6'>
                      <Form.Label htmlFor='numberOfChildren' className='hotel-color'>{Number(booking.numberOfChildren) === 1 ? "Child" : "Children"} :</Form.Label>

                      <FormControl 
                      required 
                      type='number' 
                      id='numberOfChildren' 
                      name='numberOfChildren' 
                      value={booking.numberOfChildren}
                      placeholder='0'
                      onChange={handleInputChange}/>
                      <Form.Control.Feedback type='invalid'>
                        Please enter 0 if no children 
                      </Form.Control.Feedback>
                    </div>
                  </div>
                </fieldset>

                <div className='form-group mt-2 mb-2'>
                  <button className='btn btn-hotel' type='submit'>Continue</button>
                </div>
              </Form>
            </div>
          </div>

          <div className='col-md-6'>
            {isSubmitted && (
              <BookingSummary
              booking={booking}
              payment={calculatePayment().total}
              isFormValid={isValidated}
              onConfirm={handleFormSubmit}
              adultDepo={calculatePayment().priceForAdults}
              kidDepo={calculatePayment().priceForKids}/>
            )}
          </div>
        </div>
      </div>
    </>
  )
}

export default BookingForm