import dotenv from "dotenv"
dotenv.config()
import express from "express"
import morgan from "morgan"
import mongoose from "mongoose"
let app = express()

app.use(morgan("dev"))

let PORT = process.env.PORT   || 3000

app.get("/", (req, res) => {
    res.send("Home Page");
});
app.get("/api/health", (req, res) => {
    res.status(200).json({ status: "OK" });
});

app.get("/api/hello", (req, res) => {
    res.status(200).json({ message: "Hello, World!" });
});

app.get("/api/users", (req, res) => {
    const users = [
        { id: 1, name: "Alice" },
        { id: 2, name: "Bob" },
        { id: 3, name: "Charlie" },
        { id: 4, name: "David" },
    ];
    res.status(200).json(users);
})

app.listen(PORT, () => {
    console.log("Server running is Port 3000");
});