import React, { useState,useRef } from 'react'
import "../style/createpost.scss"
import { useNavigate } from "react-router-dom"
import { usepost } from '../Hook/userPost'
 
function CreatPost() {
  let naviagte = useNavigate()
  let { loading, handelcreatepost } = usepost()
  const postImageInputFieldRef = useRef(null)
  let [caption, setcaption] = useState("")

  async function fromhandler(e) {
    e.preventDefault()
    let file = postImageInputFieldRef.current.files[0]
    await handelcreatepost(file, caption)    
    naviagte("/")
  }

  if (loading) {
    return (
      <main>
        <h1>creating post</h1>
      </main>
    )

  }

  return (
    <div className='create-post-page' >
      <div className="form-container">
        <h1>Creat Post</h1>
        <form onSubmit={fromhandler} >
          <input type="file" ref={postImageInputFieldRef} name='postimage' id='postimage' />
          <input value={caption} onChange={(e) => setcaption(e.target.value)} type="text" name='caption' id='caption' placeholder='Enter Caption' />
          <button>Creat Post</button>
        </form>
      </div>
    </div>
  )
}

export default CreatPost
