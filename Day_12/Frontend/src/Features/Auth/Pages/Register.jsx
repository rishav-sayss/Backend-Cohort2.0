import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../Hook/useAuth'
import { useNavigate } from 'react-router-dom'
function Register() {

    let { user, loading, handelregister } = useAuth()
    let [username, setUsername] = useState("")
    let [password, setPassword] = useState("")
    let [email, setemail] = useState("")

    let navigate = useNavigate()
    async function formhandler(e) {
        e.preventDefault()
        await handelregister(username, email, password)
        navigate("/")
    }

    if (loading) {
        return (
            <main>
                <h1>Loading......</h1>
            </main>
        )
    }

    return (
        <main>
            <div className="form-container">
                <h1>Register</h1>
                <form onSubmit={formhandler} >
                    <input type="text" onInput={(e) => { setUsername(e.target.value) }} name='username' id='username' placeholder='Enter username' />
                    <input type="email" onInput={(e) => { setemail(e.target.value) }} name='email' id='email' placeholder='Enter email address' />
                    <input type="password" onInput={(e) => { setPassword(e.target.value) }} name='password' id='password' placeholder='Enter password' />
                    <button className='button primary-button' >Register</button>
                </form>
                <p>Already have an account ? <Link to={"/login"} >Login to account.</Link></p>
            </div>
        </main>
    )
}

export default Register
