import React, { useState } from 'react'
import FormGroup from '../component/FormGroup'
import "../styles/register.scss"
import { Link } from 'react-router'
import { useAuth } from '../Hook/useAuth'
import { useNavigate } from 'react-router'
function Register() {

  let { loading, handelregister } = useAuth()
  let [username, setusername] = useState("")
  let [email, setemail] = useState("")
  let [password, setpassword] = useState("")
  let navigate = useNavigate()

  async function handelsubmit(e) {
    e.preventDefault()
    await handelregister({ username, email, password })
    navigate("/")
  }

  return (
    <main className='register-page'>
      <div className="form-container">
        <h1>Register</h1>
        <form onSubmit={handelsubmit} >
          <FormGroup value={username} required onChange={(e) => setusername(e.target.value)} label="username" placeholder="Enter your name" />
          <FormGroup value={email} required label="email" onChange={(e) => setemail(e.target.value)} placeholder="Enter your email" />
          <FormGroup value={password} required  type='password' label="password" onChange={(e) => setpassword(e.target.value)} placeholder="Enter your password" />
          <button className='button' >Register</button>
        </form>
        <p>Already have an account?<Link to="/login" >Login</Link> </p>
      </div>

    </main>
  )
}

export default Register
