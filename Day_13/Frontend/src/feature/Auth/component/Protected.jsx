import React from 'react'
import { useAuth } from '../Hook/useAuth'
import { Navigate, useNavigate } from 'react-router'

function Protected({ children }) {
    let { loading, user } = useAuth()

    if (loading) {
        return <h1>Loading...</h1>
    }
    
    if (!user) {
        return <Navigate to="/login" />
    }

    return children
}

export default Protected
