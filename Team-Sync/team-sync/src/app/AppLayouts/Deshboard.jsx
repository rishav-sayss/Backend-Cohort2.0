import React from 'react'
import { Outlet } from 'react-router'

function Deshboard() {
  return (
    <div>
      
      <h1>This is Nav bar</h1>

      <Outlet/>

    </div>
  )
}

export default Deshboard
