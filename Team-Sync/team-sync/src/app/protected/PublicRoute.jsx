import React from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router";

function PublicRoute() {
  const { Employes, isLoading } = useSelector((store) => store.Auth);
   if(isLoading) return <h1>Loading....</h1>
  if (Employes) return <Navigate  to={"/home"} />

  return <Outlet />;
}

export default PublicRoute;
