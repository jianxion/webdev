import React from 'react'
import { Link } from 'react-router-dom'
import './Navbar.css'

const Navbar = ({islogin, setIslogin}) => {
    const handleLogout = (e) => {
        localStorage.removeItem('islogin')
        setIslogin(false)
    }
  return (
    <nav>
        <div className="left">
            {islogin && <Link to='./'><span>Home</span></Link>}
        </div>

        <div className="right">
            
            {islogin && <Link to='/cart'><span>Cart</span></Link>}
            {!islogin && <span>Login</span>}
            {islogin && <Link to='./'><span onClick={handleLogout}>Logout</span></Link>}
        </div>
    </nav>
  )
}

export default Navbar