let express = require("express")
let cookieparser = require("cookie-parser")
let App = express();
App.use(cookieparser())
let authrouter = require("./routes/auth.routes")
const postroute = require("./routes/post.route");
App.use(express.json())

App.use("/api/auth", authrouter)
App.use("/api/post", postroute)

module.exports = App