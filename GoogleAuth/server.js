import { config } from "dotenv"
config()
import express from "express"
import passport from "passport"
import { Strategy as googleStrategy } from "passport-google-oauth20"
let app = express()

app.use(passport.initialize())
passport.use(new googleStrategy({
    clientID:process.env.CLIENT_iD,
    clientSecret:process.env.CLIENT_SECRTE,
    callbackURL:"/auth/google/callback"
}, (_, __, profile,done) =>{
    return done(null ,profile)
}))


app.get("/auth/google",
    passport.authenticate("google", { scope: [ "profile", "email" ] })
)

app.get("/auth/google/callback",passport.authenticate("google",{
    session:false,
    failureRedirect:"/"
}),
(req,res)=>{
    // console.log(req.user)
    res.send("google authentication succesfully")
}
)

app.listen(3000, () => {
    console.log('Server is running on port 3000');
})