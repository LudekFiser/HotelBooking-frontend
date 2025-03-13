import React, { useContext } from 'react'
import { AuthContext } from './AuthProvider'
import { Link, useNavigate } from 'react-router-dom'

const Logout = () => {
    const auth = useContext(AuthContext)
    const navigate = useNavigate()

    const handleLogout = () => {
        auth.handleLogout()
        // window.location.reload()
        navigate("/", {state: {message: " You have been logged out!"}})
        // Počkej krátkou chvíli, než se provede navigate, a pak reloadni
        setTimeout(() => {
            window.location.reload();
        }, 100);
    }

    //const isLoggedIn = auth.user !== null

  return /*isLoggedIn ? */(
    <>
        <li>
            <Link className='dropdown-item' to={"/profile"}>Profile</Link>
        </li>

        <li>
            <hr className='dropdown-divider'/>
        </li>
        <button className='dropdown-item' onClick={handleLogout}>Logout</button>
    </>
  ) //: null
}

export default Logout