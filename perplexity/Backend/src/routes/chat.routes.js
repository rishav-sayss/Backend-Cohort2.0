let { Router } = require("express")
let authUser = require("../middelere/auth.middelwere")
let { sendmessage } = require("../controllers/chat.controller")
let chateRoute = Router()

chateRoute.post("/message", authUser, sendmessage)

module.exports = chateRoute