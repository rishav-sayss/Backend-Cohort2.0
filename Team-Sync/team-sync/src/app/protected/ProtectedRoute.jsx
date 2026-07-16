import React from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet, } from "react-router";
import { store } from "../store";

function ProtectedRoute() {
 
  const { Employes, isLoading } = useSelector((store) => store.Auth);

  if(isLoading) return <h1>Loading....</h1>

  if(!Employes) return <Navigate to={"/"} />
  return <Outlet />;
}

export default ProtectedRoute;
