import React from 'react'
import { Container } from 'react-bootstrap'

const Parallax = () => {
  return (
    <div className='parallax mb-5'>
      <Container className='text-center px-5 py-5 justify-content-center'>
        <div className='animated-texts bounceIn'>
          <h1>Welcome to <span className='hotel-color'>Gary's Hotel</span></h1>
          <h3>We offer the Best services for all your needs</h3>
        </div>
      </Container>
    </div>
  )
}

export default Parallax