 import { initializeSocketConnection } from "../services/chat.scokets";
import { sendMessage, getChats, getMessages, deleteChat as deleteChatAPI } from "../services/chat.api";
import { streamMessage } from "../services/chat.stream";
import { setChats, setCurrentChatId, setError, setLoading, createNewChat, addNewMessage, addMessages, deleteChat, updateMessage, updateChatTitle } from "../chats.slice";
import { useDispatch, useSelector } from "react-redux";


export const useChat = () => {

    const dispatch = useDispatch()
    const chats = useSelector((state) => state.chat.chats)


    async function handleSendMessage({ message, chatId, onSuccess, onError }) {
        dispatch(setLoading(true))
        try {
            const data = await sendMessage({ message, chatId })
            
            const { chat, aiMessage } = data
            
            if (!aiMessage) {
                throw new Error('No AI message in response')
            }
            
            if (!chat) {
                throw new Error('No chat object in response')
            }
            
            // Get the actual chat ID (from response)
            const realChatId = chat._id
            
            // If sent with temporary ID, delete the temporary chat from Redux
            if (chatId && chatId.startsWith('chat_')) {
                dispatch(deleteChat({ chatId }))
            }
            
            // Create the real chat in Redux if it doesn't exist
            if (!chats[realChatId]) {
                dispatch(createNewChat({ chatId: realChatId, title: chat.title || 'New Chat' }))
            } else if (chat.title) {
                // If chat already exists, ensure title is up-to-date
                dispatch(updateChatTitle({ chatId: realChatId, title: chat.title }))
            }
            
            // Add user message
            dispatch(addNewMessage({
                chatId: realChatId,
                content: message,
                role: "user",
            }))
            
            // Add AI message - handle both cases: aiMessage as object or string
            const aiContent = typeof aiMessage === 'string' ? aiMessage : (aiMessage.content || aiMessage)
            dispatch(addNewMessage({
                chatId: realChatId,
                content: aiContent,
                role: aiMessage.role || "assistant",
            }))
            
            // Update current chat ID to the real one
            dispatch(setCurrentChatId(realChatId))
            dispatch(setLoading(false))
            
            // Call success callback with the AI message
            if (onSuccess) {
                onSuccess(aiMessage)
            }
        } catch (error) {
            const errorData = error.response?.data
            const errorMessage = errorData?.error || errorData?.message || error.message || 'Failed to send message'
            
            dispatch(setError(errorMessage))
            dispatch(setLoading(false));
            
            // Call error callback
            if (onError) {
                onError(error)
            }
        }
    }

    // ✅ OPTIMIZED: Token-by-token streaming with proper chat ID handling
    async function handleSendMessageStream({ message, chatId, onSuccess, onError }) {
        dispatch(setLoading(true))
        try {
            // ✅ CRITICAL: Only use temp ID if chatId is truly undefined/null
            // Do NOT use temp ID if we have any existing chat ID (even temporary ones)
            const isValidObjectId = chatId && typeof chatId === 'string' && chatId.match(/^[0-9a-fA-F]{24}$/)
            const isTempId = chatId && typeof chatId === 'string' && chatId.startsWith('chat_')
            
            // Determine the actual chat ID to use for this send
            let activeChatId = chatId
            let isNewChat = false
            
            // Only create temp ID if NO chatId exists at all
            if (!chatId) {
                activeChatId = `chat_${Date.now()}`
                isNewChat = true
            } else if (!isValidObjectId && !isTempId) {
                // Invalid ID format - create new temp ID
                activeChatId = `chat_${Date.now()}`
                isNewChat = true
            }

            let realChatId = activeChatId
            let aiMessageId = null
            let hasMigrated = false

            // ✅ Track messages we add to temp chat so we can move them later
            const userMessageId = `user_${Date.now()}_${Math.random()}`
            const aiMessagePlaceholderId = `ai_${Date.now()}_${Math.random()}`
            const messagesAddedToTemp = []

            // ✅ Only create temp chat in Redux if this is a new chat
            if (isNewChat && !chats[activeChatId]) {
                dispatch(createNewChat({
                    chatId: activeChatId,
                    title: 'New Chat'
                }))
            }

            // ✅ Add user message to current (or temp) chat
            const userMsg = {
                id: userMessageId,
                content: message,
                role: "user",
                timestamp: new Date().toISOString()
            }
            messagesAddedToTemp.push(userMsg)
            dispatch(addNewMessage({
                chatId: activeChatId,
                ...userMsg
            }))

            // ✅ Create AI message placeholder
            const aiPlaceholder = {
                id: aiMessagePlaceholderId,
                content: '',
                role: "assistant",
                timestamp: new Date().toISOString(),
                isLoading: true,
                tokenCount: 0
            }
            messagesAddedToTemp.push(aiPlaceholder)
            dispatch(addNewMessage({
                chatId: activeChatId,
                ...aiPlaceholder
            }))

            // ✅ Token buffering for streaming
            let tokenBuffer = ''
            let bufferTimeout = null
            
            const flushTokenBuffer = () => {
                if (tokenBuffer) {
                    dispatch(updateMessage({
                        chatId: realChatId,
                        messageId: aiMessageId || aiMessagePlaceholderId,
                        content: tokenBuffer,
                        isLoading: true,
                        append: true
                    }))
                    tokenBuffer = ''
                }
            }

            await streamMessage({
                message,
                chatId: activeChatId,
                
                // Handle metadata - THIS is where we learn the real chat ID from backend
                onMeta: ({ chat: metaChat, messageId: metaMessageId }) => {
                    if (!metaChat) return

                    const returnedChatId = metaChat._id || metaChat.id
                    if (!returnedChatId) return

                    // ✅ CRITICAL: Update realChatId to the actual MongoDB ID
                    const wasTemporary = realChatId !== returnedChatId && realChatId.startsWith('chat_')
                    realChatId = returnedChatId

                    // ⚠️ NOTE: We don't use metaMessageId for Redux updates
                    // because our Redux message uses aiMessagePlaceholderId (frontend-generated)
                    // The backend ID is only useful for direct DB operations

                    // ✅ Create real chat in Redux if it doesn't exist
                    if (!chats[returnedChatId]) {
                        dispatch(createNewChat({
                            chatId: returnedChatId,
                            title: metaChat.title || 'New Chat'
                        }))
                    } else if (metaChat.title) {
                        dispatch(updateChatTitle({
                            chatId: returnedChatId,
                            title: metaChat.title
                        }))
                    }

                    // ✅ CRITICAL: Move messages from temp to real chat BEFORE deleting temp
                    // Use local array instead of reading stale chats from closure
                    if (wasTemporary && !hasMigrated && activeChatId.startsWith('chat_')) {
                        hasMigrated = true
                        
                        // Add all tracked messages to the real chat using the local array
                        if (messagesAddedToTemp.length > 0) {
                            dispatch(addMessages({
                                chatId: returnedChatId,
                                messages: messagesAddedToTemp
                            }))
                        }
                        
                        // NOW delete the temporary chat
                        dispatch(deleteChat({ chatId: activeChatId }))
                    }

                    // ✅ Immediately update currentChatId to real ID
                    dispatch(setCurrentChatId(returnedChatId))
                },
                
                onChunk: ({ chunk }) => {
                    tokenBuffer += chunk

                    if (bufferTimeout) clearTimeout(bufferTimeout)
                    
                    bufferTimeout = setTimeout(flushTokenBuffer, 25)
                    
                    if (tokenBuffer.length > 50) {
                        clearTimeout(bufferTimeout)
                        flushTokenBuffer()
                    }
                },
                
                onComplete: ({ content, totalTokens }) => {
                    clearTimeout(bufferTimeout)
                    flushTokenBuffer()

                    // ✅ Mark AI message as complete using the placeholder ID in Redux
                    // (we use frontend-generated ID consistently, not backend's ID)
                    dispatch(updateMessage({
                        chatId: realChatId,
                        messageId: aiMessagePlaceholderId,
                        content: content,
                        isLoading: false,
                        tokenCount: totalTokens,
                        replace: true
                    }))

                    // ✅ Ensure currentChatId is set to real chat
                    dispatch(setCurrentChatId(realChatId))
                    dispatch(setLoading(false))

                    if (onSuccess) {
                        onSuccess({ content, totalTokens })
                    }
                },
                
                onError: (error) => {
                    clearTimeout(bufferTimeout)
                    flushTokenBuffer()

                    const errorMessage = error.message || 'Failed to stream message'

                    // ✅ Mark message with error using the placeholder ID
                    dispatch(updateMessage({
                        chatId: realChatId,
                        messageId: aiMessagePlaceholderId,
                        content: errorMessage,
                        isLoading: false,
                        error: errorMessage
                    }))

                    dispatch(setError(errorMessage))
                    dispatch(setLoading(false))

                    if (onError) {
                        onError(error)
                    }
                }
            })
        } catch (error) {
            dispatch(setError(error.message || 'Failed to send message'))
            dispatch(setLoading(false))

            if (onError) {
                onError(error)
            }
        }
    }

    async function handleGetChats() {
        dispatch(setLoading(true))
        const data = await getChats()
        const { chats } = data
        dispatch(setChats(chats.reduce((acc, chat) => {
            acc[ chat._id ] = {
                id: chat._id,
                title: chat.title,
                messages: [],
                lastUpdated: chat.updatedAt,
            }
            return acc
        }, {})))
        dispatch(setLoading(false))
    }

    async function handleOpenChat(chatId, chats) {

        if (chats[chatId]?.messages.length === 0) {
            const data = await getMessages(chatId)
            const { messages } = data

            const formattedMessages = messages.map(msg => ({
                content: msg.content,
                role: msg.role,
            }))

            dispatch(addMessages({
                chatId,
                messages: formattedMessages,
            }))
        }
        dispatch(setCurrentChatId(chatId))
    }

    async function handleDeleteChat(chatId){
        try {
            dispatch(setLoading(true))
            await deleteChatAPI(chatId)
            dispatch(setCurrentChatId(null))
            await handleGetChats()
            dispatch(setLoading(false))
        } catch (error) {
            dispatch(setError(error.message))
            dispatch(setLoading(false))
        }
    }

    return {
        initializeSocketConnection,
        handleSendMessage,
        handleSendMessageStream,
        handleGetChats,
        handleOpenChat,
        handleDeleteChat
    }

}