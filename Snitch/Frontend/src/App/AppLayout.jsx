import React from 'react'
import { Outlet } from 'react-router'
import Nav from '../feature/Shared/Components/Nav'

function AppLayout() {
  return (
    <>
      <Nav/>
      <Outlet/>
    </>
  )
}

export default AppLayout
