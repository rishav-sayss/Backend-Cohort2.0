

import React from 'react'
import { Outlet } from 'react-router'

function MainLayout() {
  return (
    <div>
      <div> Nav Bar </div>
      
      <Outlet/>
    </div>
  )
}

export default MainLayout
