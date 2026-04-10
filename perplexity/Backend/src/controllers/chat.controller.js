
let { generateResponse, generateChatTitle } = require("../services/AIservices")
let chatModel = require("../models/chatmodel")
let messageModel = require("../models/messagemodal")


let sendmessage = async (req, res) => {
    const { message, chat: chatId } = req.body;


    let title = null, chat = null;

    if (!chatId) {
        title = await generateChatTitle(message);
        chat = await chatModel.create({
            user: req.user.id,
            title
        });
    }

    const userMessage = await messageModel.create({
        chat: chatId || chat._id,
        content: message,
        role: "user"
    });

    const messages = await messageModel.find({ chat: chatId || chat._id });

    const result = await generateResponse(messages);

    const aiMessage = await messageModel.create({
        chat: chatId || chat._id,
        content: result,
        role: "ai"
    })


    res.status(201).json({
        title,
        chat,
        aiMessage
    })

}

let getchats = async (req, res) => {
    const user = req.user

    const chats = await chatModel.find({ user: user.id })

    res.status(200).json({
        message: "Chats retrieved successfully",
        chats
    })
}

let getmessages = async (req, res) => {
    let { chatId } = req.params


    let chat = await chatModel.findOne({
        _id: chatId,
        user: req.user.id
    })

    if (!chat) {
        return res.status(404).json({
            message: "Chat not found"
        })
    }

    const messages = await messageModel.find({
        chat: chatId
    })

    res.status(200).json({
        message: "Messages retrieved successfully",
        messages
    })

}

let deleteChat = async (req, res) => {
    try {
        const { chatId } = req.params

        await chatModel.findOneAndDelete({
            _id: chatId,
            user: req.user.id
        })

        await messageModel.deleteMany({
            chat: chatId
        })

        res.status(200).json({
            message: "Chat deleted successfully"
        })
    } catch (error) {
        res.status(500).json({
            error: error.message
        })
    }
}

module.exports = { sendmessage, getchats, getmessages, deleteChat }