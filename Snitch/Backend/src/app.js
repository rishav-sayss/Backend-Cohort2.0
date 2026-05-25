import express from "express"
import Authrouter from "./Routes/auth.routes.js"
import cookieparser from "cookie-parser"
import productRouter from "./Routes/product.route.js"
import cartrouter from "./Routes/carts.route.js"
import cors from "cors"
import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20"
import {config} from "./config/config.js"
let app = express()
app.use(express.json())
app.use(cookieparser())

app.use(
  cors({
    origin: ["http://localhost:5173", "http://127.0.0.1:5173", "https://backend-cohort2-0.vercel.app"],
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    credentials: true,
  }),
);

//google setup
app.use(passport.initialize());

passport.use(new GoogleStrategy({
    clientID: config.GOOGLE_CLIENT_ID,
    clientSecret: config.GOOGLE_CLIENT_SECRET,
    callbackURL: config.GOOGLE_CALLBACK_URL
}, (accessToken, refreshToken, profile, done) => {
    return done(null, profile);
}))

app.use("/api/auth", Authrouter)
app.use("/api/product", productRouter)
app.use("/api/cart", cartrouter)

export default app
