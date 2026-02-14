
//Router use karte hain taaki APIs structured, readable, scalable aur maintainable rahen.
// Different features ke liye alag routes hote hain:
// auth routes → login, signup
// user routes → profile, dashboard
// product routes → add, delete, update
// Router use karke hum inhe alag files me rakh sakte hain.

let { registerUser, loginapi } = require("../Controler/authcontroller")
let Express = require("express")
let AuthRouter = Express.Router()

AuthRouter.post("/register", registerUser)
AuthRouter.post("/login", loginapi)

module.exports = AuthRouter