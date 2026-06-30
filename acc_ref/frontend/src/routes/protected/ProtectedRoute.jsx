
import React from 'react'
import { Navigate, Outlet } from 'react-router'
import {useSelector} from "react-redux"

function ProtectedRoute() {

    let { user , isLoading}  = useSelector((store) => store.auth)
    if(isLoading) return <h1>Loading.....</h1>
    if( !user )  return <Navigate  to={"/login"} />
    return <Outlet/>

}

export default ProtectedRoute
