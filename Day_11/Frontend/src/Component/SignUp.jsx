import React, { useState } from 'react'
import axios from "axios"
import { useNavigate } from "react-router-dom"

function SignUp({ setServerHint, setShowHome }) {
    const navigate = useNavigate()

    let [form, setform] = useState({
        name: "",
        email: "",
        password: "",
    })

    function handelchange(e) {
        setform(prev => ({ ...prev, [e.target.name]: e.target.value }))
    }

    async function fromhandle(e) {
        e.preventDefault()

        try {
            let ragister = await axios.post(
                "http://localhost:3000/api/auth/register",
                form,
                { withCredentials: true }
            )

            // ✅ signup success → dashboard
            // if (ragister.data.message === "User created") {
            //     navigate("/dashboard")
            // }
            if (ragister.data.message === "Registered successfully") {
                setShowHome(true)
            }

            // ❌ user exists — tumhara old hint system same

            setform({ name: "", email: "", password: "" })

        } catch (error) {
            console.log(error.response.data)
            const data = error?.response?.data
            if (data?.code === "USER_EXISTS") {
                setServerHint("USER_EXISTS")
            }
        }
    }

    return (
        <form onSubmit={fromhandle}>
            <input name='name' value={form.name} placeholder='Enter name' onChange={handelchange} />
            <input name="email" value={form.email} placeholder='Enter email' onChange={handelchange} />
            <input type="password" name="password" value={form.password} placeholder='Enter password' onChange={handelchange} />
            <button type="submit">Create Account</button>
        </form>
    )
}

export default SignUp
