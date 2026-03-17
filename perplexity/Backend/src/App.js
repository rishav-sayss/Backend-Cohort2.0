const express = require("express");
let authroute = require("./routes/auth.routes")
const app = express();

// Middleware
app.use(express.json());

app.use("/api/auth", authroute)

module.exports = app;