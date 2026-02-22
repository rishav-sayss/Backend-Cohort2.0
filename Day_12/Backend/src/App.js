let express = require("express")
let cookieparser = require("cookie-parser")
const cors = require("cors")
let App = express();

App.use(cors({
    credentials: true,
    origin: "http://localhost:5173",
     methods: [ "GET", "POST", "PUT", "DELETE" ],
}))

App.use(cookieparser())
App.use(express.json())

/**
 * require routes
 */
let authrouter = require("./routes/auth.routes")
let postroute = require("./routes/post.route");
let userrouter = require("./routes/user.route")

/**
 * using route
 */
App.use("/api/auth", authrouter)
App.use("/api/post", postroute)
App.use("/api/user", userrouter)

module.exports = App