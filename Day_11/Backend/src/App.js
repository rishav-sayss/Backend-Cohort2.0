let express = require("express")
let App = express()
const cors = require("cors");
let cookieparser =  require("cookie-parser")
App.use(cookieparser())
App.use(cors({
    origin:"http://localhost:5173",
    credentials:true
}))
App.use(express.json());

//route import 
let authrouter = require("./Routes/user.Routes")
//routeMount
App.use("/api/auth", authrouter)


module.exports = App