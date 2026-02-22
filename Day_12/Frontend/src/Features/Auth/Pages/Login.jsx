import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import "../Style/form.scss"
import { useAuth } from '../Hook/useAuth'
import { useNavigate } from 'react-router-dom'

function Login() {

    let { user, loading, handellogin } = useAuth()
    let [username, setUsername] = useState("")
    const [password, setPassword] = useState("")

    let navigate = useNavigate()

    async function formhandler(e) {
        e.preventDefault()
        await handellogin(username, password)
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
                <h1>Login</h1>
                <form onSubmit={formhandler} >
                    <input
                        onInput={(e) => { setUsername(e.target.value) }}
                        type="text"
                        name='username'
                        id='username'
                        placeholder='Enter username' />
                    <input
                        onInput={(e) => { setPassword(e.target.value) }}
                        type="password"
                        name='password'
                        id='password'
                        placeholder='Enter password' />
                    <button className='button primary-button' >Login</button>
                </form>
                <p>Don't have an account ? <Link to={"/register"} >Create One.</Link></p>
            </div>
        </main>
    )
}

export default Login
