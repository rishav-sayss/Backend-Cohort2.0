const express = require("express");
let cors = require("cors")
let app = express();
let cookieParser = require("cookie-parser");

// Middleware
app.use(cookieParser());
app.use(express.json());

app.use(cors({
    origin: "http://localhost:5173",
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
}))

//import the routes
let chatRoute = require("./routes/chat.routes")
let authroute = require("./routes/auth.routes")

//use the routes
app.use("/api/auth", authroute)
app.use("/api/chats", chatRoute)

module.exports = app;