import React, { useState } from 'react'
import FormGroup from '../component/FormGroup'
import { Link } from 'react-router'
import "../styles/login.scss"
import { useAuth } from '../Hook/useAuth'
import { useNavigate } from 'react-router'

function Login() {
  let { loading, handellogin } = useAuth()
  let [email, setemail] = useState("")
  let [password, setpassword] = useState("")
  let navigate = useNavigate()

  async function handelsubmit(e) {
    e.preventDefault()
    await handellogin({ email, password })
    navigate("/")

  }

  return (
    <main className='login-page'>
      <div className="form-container">
        <h1>Login</h1>
        <form onSubmit={handelsubmit}>
          <FormGroup value={email} required onChange={(e) => setemail(e.target.value)} label="email" placeholder="Enter Your email" />
          <FormGroup value={password} required type='password' onChange={(e) => setpassword(e.target.value)} label="password" placeholder="Enter your password" />
          <button className='button' type='submit' >Login</button>
        </form>
        <p>Don't have an account? <Link to="/register" >Register</Link> </p>
      </div>
    </main>
  )
}

export default Login
