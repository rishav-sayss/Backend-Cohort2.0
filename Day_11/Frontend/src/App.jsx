import React, { useState } from 'react'
import Home from "./Component/userdeshboard/Home"
import SignUp from './Component/SignUp'
import Login from './Component/Login'
import "./App.css"

function App() {
  let [islogin, setislogin] = useState(false)
  let [serverHint, setServerHint] = useState("")
  let [showHome, setShowHome] = useState(false)

  if (showHome) {
    return <Home />
  }

  return (
    <div className="container">

      <div className="user">
        <img
          src="https://i.pinimg.com/1200x/92/f2/98/92f2984ebd391d7e8c17a1e3cd673e46.jpg"
          alt=""
        />
      </div>

      <div className="formbox">
        <h1>
          {islogin ? "Signup" : "Login"}
        </h1>

        <div>
          {
            islogin
              ? <SignUp setServerHint={setServerHint} setShowHome={setShowHome} />
              : <Login setServerHint={setServerHint} setShowHome={setShowHome} />
          }
        </div>

        {
          islogin ? (
            <p>
              {serverHint === "USER_EXISTS" ? "Already have an account? " : ""}
              <span
                onClick={() => setislogin(false)}
                className="link"
              >
                Login
              </span>
            </p>
          ) : (
            <p>
              {
                serverHint === "No Account"
                  ? "No account? "
                  : serverHint === "Wrong password"
                    ? "Wrong password "
                    : ""
              }
              <span
                onClick={() => setislogin(true)}
                className="link"
              >
                Signup
              </span>
            </p>
          )
        }

      </div>
    </div>
  )
}

export default App
