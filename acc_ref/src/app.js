let express = require("express");
let cookieParser = require("cookie-parser");
let authroutes = require("./routes/auth.routes")
let Homerouter  =  require("./routes/home.routes")
let app = express();

app.use(cookieParser());
app.use(express.json());

app.use("/auth/api" , authroutes)
app.use("/home/api" , Homerouter)
module.exports = app;