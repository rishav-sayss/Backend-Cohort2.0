const express = require("express");
let authroute = require("./routes/auth.routes")
let cors = require("cors")
let app = express();
let cookieParser = require("cookie-parser");
let chatRoute = require("./routes/chat.routes")

app.use(cookieParser());
// Middleware
app.use(express.json());
app.use(cors({
    origin: "http://localhost:5173",
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
}))
app.use("/api/auth", authroute)
app.use("/api/chats",chatRoute)

module.exports = app;