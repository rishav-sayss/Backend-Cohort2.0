import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate } from 'react-router'

function ProtectedComponent({ children , role="buyer"  }) {
 
  let user = useSelector(state => state.auth.user)
  let loading = useSelector(state => state.auth.loading)

  if (loading) {
    return <div>Loading...</div>
  }

  if (!user) {
    return <Navigate to="/login" />
  }

  if( user.role !== role){
    return <Navigate to="/" />
  }

  return children

}

export default ProtectedComponent
