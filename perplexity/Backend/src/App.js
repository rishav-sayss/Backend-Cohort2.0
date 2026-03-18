const express = require("express");
let authroute = require("./routes/auth.routes")
const app = express();
const cookieParser = require("cookie-parser");

app.use(cookieParser());
// Middleware
app.use(express.json());

app.use("/api/auth", authroute)

module.exports = app;