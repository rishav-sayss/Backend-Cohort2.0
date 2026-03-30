// const { response } = require("express")
let { generateResponse, generateChatTitle, generateResponseStream } = require("../services/AIservices")
let chatModel = require("../models/chatmodel")
let messageModel = require("../models/messagemodal")


let sendmessage = async (req, res) => {
    try {
        let { message, chat: chatId } = req.body

        if (!message) {
            return res.status(400).json({ error: 'Message is required' })
        }

        let chat = null;
        let actualChatId = chatId;       
        // If no chat ID or invalid ObjectId, create a new chat
        if (!chatId) {
            const title = await generateChatTitle(message);   
            chat = await chatModel.create({
                user: req.user.id,
                title
            })
            actualChatId = chat._id
        } else {
        
            chat = await chatModel.findById(chatId)
            if (!chat) {
                return res.status(404).json({ error: 'Chat not found' })
            }
        }

        // Save user message
        const userMessage = await messageModel.create({
            chat: actualChatId,
            content: message,
            role: "user"
        })

        // Get all messages for context
        const messages = await messageModel.find({ chat: actualChatId })

        // Generate AI response 
        const result = await generateResponse(messages);
        // Save AI message
         
        const aiMessage = await messageModel.create({
            chat: actualChatId,
            content: result,
            role: "ai"
        })

        // Return response
        res.status(201).json({
            chat,
            aiMessage
        })
    } catch (error) {
        res.status(500).json({
            error: error.message,
            details: error.stack
        })
    }
}

/**
 * Streaming version of message endpoint
 * Implements true token-by-token streaming using Server-Sent Events (SSE)
 * Each token arrives from LLM and is immediately sent to client
 */
let sendmessageStream = async (req, res) => {
    try {
        let { message, chat: chatId } = req.body

        if (!message) {
            return res.status(400).json({ error: 'Message is required' })
        }

        let chat = null;
        let actualChatId = chatId;

        // Check if chatId is a valid MongoDB ObjectId
        const isValidObjectId = chatId && chatId.match(/^[0-9a-fA-F]{24}$/)
        
        // If no chat ID or invalid ObjectId, create a new chat
        if (!chatId || !isValidObjectId) {
            const title = await generateChatTitle(message);
            
            chat = await chatModel.create({
                user: req.user.id,
                title
            })
            actualChatId = chat._id
        } else {
            // If chat ID was provided and is valid, fetch the chat
            chat = await chatModel.findById(chatId)
            if (!chat) {
                return res.status(404).json({ error: 'Chat not found' })
            }
        }

        // Save user message
        const userMessage = await messageModel.create({
            chat: actualChatId,
            content: message,
            role: "user"
        })

        // Create placeholder AI message - will be updated as streaming completes
        const aiMessage = await messageModel.create({
            chat: actualChatId,
            content: '...', // Use placeholder, will be replaced with actual content
            role: "ai"
        })

        // Get all messages for context (excluding the empty AI message we just created)
        const messages = await messageModel.find({ 
            chat: actualChatId,
            _id: { $ne: aiMessage._id }
        })
        
        // Format messages: Map MongoDB _id to id for LangChain processing
        const formattedMessages = messages.map(msg => ({
            id: msg._id.toString(),
            content: msg.content,
            role: msg.role === 'ai' ? 'assistant' : msg.role // Normalize role
        }))

        // Set proper SSE headers for streaming
        res.setHeader('Content-Type', 'text/event-stream')
        res.setHeader('Cache-Control', 'no-cache')
        res.setHeader('Connection', 'keep-alive')
        // CORS is handled by app-level middleware, don't override here

        // Send initialization event with chat and message metadata
        res.write(`data: ${JSON.stringify({ 
            type: 'init',
            chat,
            messageId: aiMessage._id.toString(),
            timestamp: new Date().toISOString()
        })}\n\n`)

        let fullContent = '';
        let tokenCount = 0;

        /**
         * Token callback: Called for each token from LLM
         * Sends token immediately to client for real-time streaming effect
         */
        const onToken = (token) => {
            tokenCount++;
            // Send each token as a separate SSE event for maximum responsiveness
            res.write(`data: ${JSON.stringify({ 
                type: 'chunk',
                content: token,
                tokenIndex: tokenCount
            })}\n\n`)
        }

        // Stream tokens from AI service
        // generateResponseStream is an async generator that yields individual tokens
        const stream = generateResponseStream(formattedMessages, onToken);
        
        for await (const chunk of stream) {
            fullContent += chunk;
        }

        // Update the AI message in database with complete content
        await messageModel.findByIdAndUpdate(aiMessage._id, {
            content: fullContent,
            tokenCount: tokenCount
        })

        // Send completion event with final stats
        res.write(`data: ${JSON.stringify({ 
            type: 'complete',
            content: fullContent,
            totalTokens: tokenCount,
            timestamp: new Date().toISOString()
        })}\n\n`)

        // Properly close the response stream
        res.end()
    } catch (error) {
        // Send error event before closing
        res.write(`data: ${JSON.stringify({ 
            type: 'error',
            error: error.message,
            timestamp: new Date().toISOString()
        })}\n\n`)
        res.end()
    }
}


let getchats = async (req, res) => {
    let user = req.user.id
    let chats = await chatModel.find({ user })
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

async function deleteChat(req, res) {
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

module.exports = { sendmessage, sendmessageStream, getchats, getmessages, deleteChat }