const express = require("express");
let authroute = require("./routes/auth.routes")
let cors = require("cors")
const app = express();
const cookieParser = require("cookie-parser");

app.use(cookieParser());
// Middleware
app.use(express.json());
app.use(cors({
    origin: "http://localhost:5173",
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
}))
app.use("/api/auth", authroute)

module.exports = app;