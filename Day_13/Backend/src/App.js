let express = require("express")
let cookieParser = require("cookie-parser")
let cores = require("cors")
let App = express()
App.use(express.json())
App.use(cookieParser())
App.use(cores({
      origin: "http://localhost:5173",
      credentials: true
}))
/**
 * require the Routes 
 */
let Authroutes = require("../src/Routes/auth.route")
let songeroutes = require("./Routes/song.routes")
/**
 *  Use the Routes
 */

App.use("/api/auth", Authroutes)
App.use("/api/song", songeroutes)


module.exports = App