
import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate, Outlet } from 'react-router'
import { store } from '../store'

function RolebasedRoute({allowedRole}) {
    let { Employes } = useSelector((store) => store.Auth)
    console.log(Employes.role)
    if(!allowedRole.includes(Employes?.role)){
        return Navigate("/UnauthorisedUser")
    }
  return  <Outlet/>
}

export default RolebasedRoute
