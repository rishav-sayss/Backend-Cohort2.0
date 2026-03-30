let { Router } = require("express")
let authUser = require("../middelere/auth.middelwere")
let { sendmessage, sendmessageStream, getchats, getmessages, deleteChat } = require("../controllers/chat.controller")
let chateRoute = Router()

chateRoute.post("/message", authUser, sendmessage)
chateRoute.post("/message/stream", authUser, sendmessageStream)
chateRoute.get("/", authUser, getchats)
chateRoute.get("/:chatId/messages", authUser, getmessages)
chateRoute.delete("/delete/:chatId", authUser, deleteChat )

module.exports = chateRoute