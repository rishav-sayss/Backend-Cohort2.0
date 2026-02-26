import React from 'react'
import { useNavigate } from 'react-router-dom'
import "../component/navbar.scss"
function Navbar() {
    let navigate = useNavigate()
    return (
        <nav className='nav-bar'>
            <p>Insta</p>
            <button onClick={() => navigate("/Create-post")} className='button primary-button' >New Post</button>
        </nav>
    )
}

export default Navbar
