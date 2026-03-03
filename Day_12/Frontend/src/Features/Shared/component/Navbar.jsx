import React from 'react'
import { useNavigate } from 'react-router-dom'
import "../component/navbar.scss"
import UserProfile from './UserProfile'

function Navbar() {
    const navigate = useNavigate()

    return (
        <nav className='nav-bar'>
            <p>Insta</p>

            <div className="left-side">
                <button 
                    onClick={() => navigate("/create-post")} 
                    className='button primary-button'
                >
                    New Post
                </button>

                <UserProfile 
                    fileimage="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTXimLcKuE_EzHvptMeyGsds44nF-S9X35_yw&s"
                    username="Shivam Kumar"
                />
            </div>
        </nav>
    )
}

export default Navbar