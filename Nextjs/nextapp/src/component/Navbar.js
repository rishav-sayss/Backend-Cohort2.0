import Link from 'next/link'
import React from 'react'
import { ModeToggle } from './modeToggle'

function Navbar() {
  return (
<div className="flex justify-between items-center px-8 py-4">
      <h1 className="text-xl font-bold">E-comm</h1>
      <div className="flex gap-4 font-semibold">
        <Link href="/layout/home">Home</Link>
        <Link href="/layout/product">Products</Link>
      </div>
      <div>
       <h1>
        <ModeToggle/>
       </h1>
      </div>
    </div>
  )
}

export default Navbar
