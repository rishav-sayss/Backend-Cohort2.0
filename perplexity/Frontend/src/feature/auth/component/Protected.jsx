import React from 'react'
import { Navigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { Vortex } from 'react-loader-spinner'
function Protected({ children }) {
    let user = useSelector((state) => state.auth.user)
     
    let loading = useSelector((state) => state.auth.loading)
     
    if (loading) {
        return (
            <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}>
                <Vortex
                    visible={true}
                    height="110"
                    width="110"
                    ariaLabel="vortex-loading"
                    wrapperStyle={{}}
                    wrapperClass="vortex-wrapper"
                    colors={['red', 'green', 'blue', 'yellow', 'orange', 'purple']}
                />
            </div>
        )
    }

    if (!user) {
        return <Navigate to="/login" replace />
    }
    return children
}

export default Protected
