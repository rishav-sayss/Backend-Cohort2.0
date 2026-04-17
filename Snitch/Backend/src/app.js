import express from "express"
import Authrouter from "./Routes/auth.routes.js"
import cookieparser from "cookie-parser"
import productRouter from "./Routes/product.route.js"
import cors from "cors"
import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20"
import {config} from "./config/config.js"
let app = express()
app.use(express.json())
app.use(cookieparser())
app.use(cors({
    origin: "http://localhost:5173",
    methods: ["GET", "PUT", "POST", "DELETE"],
    credentials: true
}))

//google setup
app.use(passport.initialize());

console.log(config.GOOGLE_CLIENT_ID)
console.log(config.GOOGLE_CLIENT_SECRET)

passport.use(new GoogleStrategy({
    clientID: config.GOOGLE_CLIENT_ID,
    clientSecret: config.GOOGLE_CLIENT_SECRET,
    callbackURL: "http://localhost:3000/api/auth/google/callback"
}, (accessToken, refreshToken, profile, done) => {
    return done(null, profile);
}))

app.use("/api/auth", Authrouter)
app.use("/api/product", productRouter)

export default app

