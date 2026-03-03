let express = require("express")
let cookieParser = require("cookie-parser")
let App = express()
App.use(express.json())
App.use(cookieParser())
/**
 * require the Routes 
 */
let Authroutes = require("../src/Routes/auth.route")

/**
 *  Use the Routes
 */

App.use("/api/auth", Authroutes)


module.exports = App