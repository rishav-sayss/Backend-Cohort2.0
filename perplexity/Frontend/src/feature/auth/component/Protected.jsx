import React from 'react'
import { Navigate } from 'react-router'
import { useSelector } from 'react-redux'

function Protected({children}) {
    let user = useSelector((state) => state.auth.user)
    console.log(user)
    let loading = useSelector((state) => state.auth.loading)
    console.log(loading)


    if (loading) {
        return <div>Loading...</div>
    }

    if (!user) {
        return <Navigate to="/login" replace />
    }


    return children
}

export default Protected
