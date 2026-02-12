import React, { useState } from 'react'
import axios from "axios"
function Login({ setServerHint, setShowHome }) {

  let [form, setform] = useState({
    email: "",
    password: ""
  })

  function handelchange(e) {
    setform(prev => ({ ...prev, [e.target.name]: e.target.value }))
  }

  async function formhandle(e) {
    e.preventDefault()

    try {
      const res = await axios.post(
        "http://localhost:3000/api/auth/login",
        form,
        { withCredentials: true }
      )

      // success case
      if (res.data.message === "Login success") {
        setShowHome(true)
      }

      setform({
        email: "",
        password: ""
      })

    } catch (err) {
      const data = err?.response?.data

      if (data?.code === "NO_ACCOUNT") {
        setServerHint("No Account")
      }
      else if (data?.message === "Wrong password") {
        setServerHint("Wrong password")
      }
      else {
        setServerHint("Login failed")
      }

      console.log("Handled login error:", data)
    }
  }


  return (
    <form onSubmit={formhandle}>
      <input name="email" value={form.email} placeholder='Enter email' onChange={handelchange} />
      <input type="password" name="password" value={form.password} placeholder='Enter password' onChange={handelchange} />
      <button type="submit">Login</button>
    </form>
  )
}

export default Login
