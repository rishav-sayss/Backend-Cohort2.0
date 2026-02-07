import React, { useEffect } from 'react'
import { useState } from 'react'
import axios from 'axios'

function App() {
  let [showmodal, setshowmodal] = useState(false)
  let [editid, seteditid] = useState(null)
  let [tostmsg, settostmsg] = useState("")
  let [showmsg, setshowmsg] = useState(false)
  let [title, settitle] = useState("")
  let [desc, setdesc] = useState("")
  let [note, setnote] = useState([])
  async function handlesubmit(e) {
    e.preventDefault()
    let response = await axios.post("https://backend-cohort2-0-5e0v.onrender.com/api/notes", {
      title: title,
      description: desc
    })
    triggerToast("Note created successfully")
    settitle("")
    setdesc("")
    fetchdata()

  }

  async function fetchdata() {
    let response = await axios.get("https://backend-cohort2-0-5e0v.onrender.com/api/notes")
    setnote(response.data.data)

  }

  async function deletenote(noteId) {
    let response = await axios.delete(`https://backend-cohort2-0-5e0v.onrender.com/api/notes/${noteId}`)
    fetchdata()
    triggerToast("Note Deleted ")

  }



  useEffect(() => {
    fetchdata()
  }, [])

  function triggerToast(msg) {
    settostmsg(msg)
    setshowmsg(true)
    setTimeout(() => {
      setshowmsg(false)
    }, 2000)
  }

  function openupdatemodel(notobj) {
    console.log(notobj.title)
    settitle(notobj.title)
    setdesc(notobj.description)
    seteditid(notobj._id)
    setshowmodal(true)
  }

  async function confirmupdated() {
    let response = await axios.patch(`https://backend-cohort2-0-5e0v.onrender.com/api/notes/${editid}`, {
      title: title,
      description: desc
    })
    fetchdata();
    setshowmodal(false)
    settitle("")
    setdesc("")
    triggerToast("Note Updated succesfully ")
  }

  return (
    <div>
      <header>
        <form className='container' onSubmit={handlesubmit}>

          <input
            type="text"
            required
            value={title}
            onChange={(e) => {
              console.log("Title:", e.target.value)
              settitle(e.target.value)
            }}
            placeholder='Enter Title'
          />

          <input
            type="text"
            required
            value={desc}
            onChange={(e) => {
              console.log("Desc:", e.target.value)
              setdesc(e.target.value)
            }}
            placeholder='Enter Description'
          />

          <button className='primary' type="submit">Submit</button>
        </form>
      </header>

      <section className='main'>
        {
          note.map((val, idx) => {
            return <div className='note' key={idx} >
              <h1> {val.title} </h1>
              <h5> {val.description} </h5>
              <div className='btns' >
                <button className='btn' onClick={() => deletenote(val._id)} >Delete</button>
                <button className='btn' onClick={() => openupdatemodel(val)} >Update</button>
              </div>
            </div>
          })
        }
        <div className={`toast ${showmsg ? "show" : ""}`}>
          {tostmsg}
        </div>
        {
          showmodal && (
            <div className="blur">
              <div className="modal">
                <input type="text" className='title' value={title} onChange={(e) => settitle(e.target.value)} placeholder='Enter Title' />
                <input type="text" className='desc' value={desc} onChange={(e) => setdesc(e.target.value)} placeholder='Enter Description' />
                <button className='update' onClick={confirmupdated} >Update</button>
                <button className='Cancel' onClick={() => setshowmodal(false)}  > Cancel </button>
              </div>
            </div>
          )
        }
      </section >
    </div >
  )
}

export default App
