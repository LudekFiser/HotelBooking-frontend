import React, { useEffect, useState } from 'react'
import { parseISO } from 'date-fns'
import DateSlider from '../common/DateSlider'
import moment from "moment";

const BookingsTable = ({bookingInfo, handleBookingCancelation}) => {
    const[filteredBookings, setFilteredBookings] = useState(bookingInfo)
    const [copied, setCopied] = useState(null);

    const filterBookings = (startDate, endDate) => {
        let filtered = bookingInfo
        if(startDate && endDate) {
            filtered = bookingInfo.filter((booking) => {
                const bookingStartDate = parseISO(booking.checkInDate)
                const bookingEndDate = parseISO(booking.checkOutDate)
                return bookingStartDate >= startDate && bookingEndDate <= endDate && bookingEndDate > startDate
            })
        }
        setFilteredBookings(filtered)
    }

    useEffect(() => {
        setFilteredBookings(bookingInfo)
    }, [bookingInfo])

    const copyToClipboard = (text, id) => {
        navigator.clipboard.writeText(text);
        setCopied(id);
        setTimeout(() => setCopied(null), 2000); // Hide message after 2 sec
    }

    // Funkce pro správné formátování datumu
    const formatDate = (dateString) => {
        if (!dateString) return "N/A"; // Pokud není datum, zobrazí "N/A"
        
        const date = moment(dateString, "YYYYMMDD"); // Převod čísla na moment datum
        return date.isValid() ? date.format("DD-MM-YYYY") : "Invalid date"; // Formát: "Mar 14, 2025"
    }

      
  return (
    <section className='p-4'>
        <DateSlider onDateChange={filterBookings} onFilterChange={filterBookings}/> 
        <table className='table table-bordered table-hover shadow'>
            <thead>
                <tr>
                    <th>S/N</th>
                    <th>Booking ID</th>
                    <th>Room ID</th>
                    <th>Room Type</th>
                    <th>Check-In Date</th>
                    <th>Check-Out Date</th>
                    <th>Guest Name</th>
                    <th>Guest Email</th>
                    <th>Adults</th>
                    <th>Children</th>
                    <th>Total Guests</th>
                    <th>Confirmation Code</th>
                    <th colSpan={2}>Actions</th>
                </tr>
            </thead>

            <tbody className='text-center'>
                {filteredBookings.map((booking, index) => (
                    <tr key={booking.id}>
                        <td>{index + 1}</td>
                        <td>{booking.id}</td>
                        <td>{booking.room.id}</td>
                        <td>{booking.room.roomType}</td>
                        <td>{formatDate(booking.checkInDate)}</td>
                        <td>{formatDate(booking.checkOutDate)}</td>
                        <td>{booking.guestFullName}</td>
                        <td>{booking.guestEmail}</td>
                        <td>{booking.numberOfAdults}</td>
                        <td>{booking.numberOfChildren}</td>
                        <td>{booking.totalNumberOfGuests}</td>
                        {/*<td>{booking.bookingConfirmationCode}</td>*/}

                        <td 
                        onClick={() => copyToClipboard(booking.bookingConfirmationCode, booking.id)}
                        className="copyable"
                        >
                        {booking.bookingConfirmationCode}
                        {copied === booking.id && (
                            <span 
                                className="absolute bg-black text-white text-[10px] px-1 py-0.5 rounded shadow-sm"
                                style={{ top: "-15px", left: "50%", transform: "translateX(-50%)", whiteSpace: "nowrap" }}
                            >
                            Copied!
                            </span>
                        )}
                        </td>
                        


                        <td>
                            <button 
                            className='btn btn-danger btn-sm' 
                            onClick={() => handleBookingCancelation(booking.id)}>
                                Cancel
                            </button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
        {filterBookings.length === 0 && <p> No booking found for the selected dates</p>}
    </section>
  )
}

export default BookingsTable