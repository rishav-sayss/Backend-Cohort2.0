import React, { useEffect } from 'react'
import "./index.css"
import { useState } from 'react'
import axios from "axios"
function App() {
  const [data, setdata] = useState([
    {
      title: "test title1",
      description: "test Description 1"
    },
    {
      title: "test title2",
      description: "test Description 2"
    },
    {
      title: "test title3",
      description: "test Description 3"
    },
  ])

  useEffect(() => {

     axios.get("http://localhost:3000/get/notes").then((res)=>{
      setdata(res.data.fetchdata)
    })
    
  }, [])


  return (
    <div className='wraper' >
      <div className="box">
        {data.map((val, idx) => {
          return <div className='notes' key={idx
          }>
            <h1> {val.title}</h1>
            <h4> {val.description} </h4>
          </div>
        })
        }
      </div>
    </div>
  )
}

export default App
