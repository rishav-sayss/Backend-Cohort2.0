
import React from 'react'
import { Outlet } from 'react-router'
import { useSelector } from "react-redux";
import { Navigate} from "react-router";

function PubliceRoute() {
    let { user, isLoading } = useSelector((store) => store.auth);

  if (isLoading) return <h1>Loading...</h1>;

  if (user) return <Navigate to={"/home"} />;
  return <Outlet/>

}

export default PubliceRoute

