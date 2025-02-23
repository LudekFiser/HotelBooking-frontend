import React from "react"
import { Card, Col } from 'react-bootstrap'
import { Link } from 'react-router-dom'
/*
const RoomCard = ({ room }) => {
  return (
    <Col key={room.id} className='mb-4' xs={12}>
      <Card>
        <Card.Body className='d-flex flex-wrap align-items-center'>
          <div className='flex-shrink-0 mr-3 mb-3 mb-md-0'>

            <Card.Img 
            variant='top' 
            src={`data:image/png;base64, ${room.photo}`} 
            alt='Room Photo' 
            style={{width:"250px", maxWidth:"250px", height:"150px", maxHeight:"150px"}}/>
          </div>

          <div className='flex-grow-1 ml-3 px-5'>
            <Card.Title className='hotel-color text-start d-block'>{room.roomType}</Card.Title>
            <Card.Title className="room-price text-start d-block">{room.roomPrice}$ / night</Card.Title>
            <Card.Text className="text-start d-block">Some room information goes here for the guest to read through</Card.Text>
          </div>

          <div className='flex-shrink-0 mt-3'>
            <Link to={`bookings/${room.id}`} className='btn btn-hotel btn-sm'>View / Book Now</Link>
          </div>

        </Card.Body>
      </Card>
    </Col>
  )
}*/
const RoomCard = ({ room }) => {
  return (
    <Col key={room.id} xs={12} sm={6} md={4} lg={4} xl={3} className="d-flex justify-content-center">
      <Card className="room-card">

      <Link to={`/book-room/${room.id}`}>
        <div className="room-img-container">
          
            <Card.Img 
              variant="top" 
              src={`data:image/png;base64, ${room.photo}`} 
              alt="Room Photo" 
              className="room-img"
              height={"100%"}
            /> 
        </div>
      </Link>

        <Card.Body className="text-center d-flex flex-column justify-content-between">
          <Card.Title className="hotel-color">{room.roomType}</Card.Title>
          <Card.Title className="room-price">{room.roomPrice}$ / night</Card.Title>
          <Card.Text>Some room information goes here for the guest to read through</Card.Text>

          <Link to={`/book-room/${room.id}`} className="btn btn-hotel btn-sm mt-3">View / Book Now</Link>
        </Card.Body>
      </Card>
    </Col>
  );
};

export default RoomCard