const { response } = require("express")
let { generateResponse, generateChatTitle } = require("../services/AIservices")
let sendmessage = async (req, res) => {
    let message = req.body
    let title = await generateResponse(message)
    console.log(title)
    let result = await generateChatTitle(message)
    console.log(result)

    res.status(201).json({
        aimessage: result
    })
}

module.exports = { sendmessage }