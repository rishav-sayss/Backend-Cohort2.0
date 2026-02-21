let express = require("express")
let cookieparser = require("cookie-parser")
let App = express();
App.use(cookieparser())

/**
 * require routes
 */
let authrouter = require("./routes/auth.routes")
let postroute = require("./routes/post.route");
let userrouter = require("./routes/user.route")

App.use(express.json())

/**
 * using route
 */
App.use("/api/auth", authrouter)
App.use("/api/post", postroute)
App.use("/api/user", userrouter)

module.exports = App