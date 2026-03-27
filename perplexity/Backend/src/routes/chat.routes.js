let { Router } = require("express")
let authUser = require("../middelere/auth.middelwere")
let { sendmessage, getchats, getmessages,deleteChat } = require("../controllers/chat.controller")
let chateRoute = Router()

chateRoute.post("/message", authUser, sendmessage)
chateRoute.get("/", authUser, getchats)
chateRoute.get("/:chatId/messages", authUser, getmessages)
chateRoute.get("/delete/:chatId", authUser, deleteChat )

module.exports = chateRoute