import React from 'react'
import { Link } from 'react-router-dom'

const Admin = () => {
  return (
    /*<section className='container mt-5'>
        <h2>ADMIN PANEL</h2>
        <hr/>
        <Link to={"/add-room"}>Manage Rooms</Link>
    </section>*/
  
  <section className='container mt-5'>
    <h2>ADMIN PANEL</h2>
    <hr/>
    <div className="row mt-4">
        <div className="col-md-6">
            <div className="link-wrapper">
                <Link to="/existing-rooms" className="styled-link">Manage Rooms</Link>
            </div>
        </div>
        <div className="col-md-6">
            <div className="link-wrapper">
                <Link to="/existing-bookings" className="styled-link">Manage Bookings</Link>
            </div>
        </div>
        <div className="mt-4">
          <div className='col-12'>
            <div className="link-wrapper-crab">
                <Link to="https://www.youtube.com/watch?v=-50NdPawLVY" className="crab-rave-link">CRAB RAVE</Link>
            </div>
          </div>
        </div>
    </div>
  </section>




  )
}

export default Admin