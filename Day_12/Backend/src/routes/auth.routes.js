
//Router use karte hain taaki APIs structured, readable, scalable aur maintainable rahen.
// Different features ke liye alag routes hote hain:
// auth routes → login, signup
// user routes → profile, dashboard
// product routes → add, delete, update
// Router use karke hum inhe alag files me rakh sakte hain.

let { registerUser, loginapi,  getMeController} = require("../Controler/authcontroller")
let Express = require("express")
let AuthRouter = Express.Router()
let validation = require("../Middelwere/auth.middelwere")

AuthRouter.post("/register", registerUser)
AuthRouter.post("/login", loginapi)
AuthRouter.get("/get-me", validation ,getMeController)
module.exports = AuthRouter