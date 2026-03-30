 import { initializeSocketConnection } from "../services/chat.scokets";
import { sendMessage, getChats, getMessages, deleteChat as deleteChatAPI } from "../services/chat.api";
import { streamMessage } from "../services/chat.stream";
import { setChats, setCurrentChatId, setError, setLoading, createNewChat, addNewMessage, addMessages, deleteChat, updateMessage } from "../chats.slice";
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
            dispatch(createNewChat({
                chatId: realChatId,
                title: chat.title || 'New Chat',
            }))
            
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

    // ✅ OPTIMIZED: Token-by-token streaming with minimal re-renders
    async function handleSendMessageStream({ message, chatId, onSuccess, onError }) {
        dispatch(setLoading(true))
        try {
            // Determine the actual chat ID
            let activeChatId = chatId
            if (!chatId || !chatId.match(/^[0-9a-fA-F]{24}$/)) {
                activeChatId = chatId || `chat_${Date.now()}`
            }

            let realChatId = activeChatId
            let aiMessageId = null

            // ✅ STEP 1: Create/ensure chat exists in Redux
            if (!chats[realChatId]) {
                dispatch(createNewChat({
                    chatId: realChatId,
                    title: 'New Chat'
                }))
            }

            // ✅ STEP 2: Add user message IMMEDIATELY (optimistic UI)
            dispatch(addNewMessage({
                chatId: realChatId,
                content: message,
                role: "user",
                id: `user_${Date.now()}_${Math.random()}`
            }))

            // ✅ STEP 3: Create AI message placeholder with loading state IMMEDIATELY
            const aiMessagePlaceholderId = `ai_${Date.now()}_${Math.random()}`
            dispatch(addNewMessage({
                chatId: realChatId,
                content: '',
                role: "assistant",
                id: aiMessagePlaceholderId,
                isLoading: true,
                tokenCount: 0
            }))

            // ✅ STEP 4: Start streaming and update message as tokens arrive
            let tokenBuffer = ''; // Buffer for micro-batching tokens
            let bufferTimeout = null;
            
            const flushTokenBuffer = () => {
                if (tokenBuffer) {
                    dispatch(updateMessage({
                        chatId: realChatId,
                        messageId: aiMessageId || aiMessagePlaceholderId,
                        content: tokenBuffer,
                        isLoading: true,
                        append: true // Append to existing content, don't replace
                    }))
                    tokenBuffer = '';
                }
            };

            await streamMessage({
                message,
                chatId: activeChatId,
                
                onChunk: ({ chunk, fullContent, messageId: msgId, tokenIndex }) => {
                    // Update with the backend message ID when available
                    if (msgId && !aiMessageId) {
                        aiMessageId = msgId;
                    }

                    // Buffer tokens and flush periodically for optimal performance
                    // This prevents too many Redux updates while maintaining responsiveness
                    tokenBuffer += chunk;
                    
                    // Clear previous timeout
                    if (bufferTimeout) {
                        clearTimeout(bufferTimeout);
                    }
                    
                    // Update after small delay to batch tokens (every ~50ms)
                    bufferTimeout = setTimeout(flushTokenBuffer, 25);
                    
                    // Or flush immediately if we have a reasonable amount
                    if (tokenBuffer.length > 50) {
                        clearTimeout(bufferTimeout);
                        flushTokenBuffer();
                    }
                },
                
                onComplete: ({ content, chat, messageId: msgId, totalTokens }) => {
                    // Flush any remaining token buffer
                    clearTimeout(bufferTimeout);
                    flushTokenBuffer();

                    // Update real chat ID and swap if needed
                    if (chat) {
                        realChatId = chat._id
                        aiMessageId = msgId

                        // If was temporary ID, swap it out from Redux
                        if (activeChatId.startsWith('chat_')) {
                            dispatch(deleteChat({ chatId: activeChatId }))
                        }

                        // Update chat with real MongoDB data
                        dispatch(createNewChat({
                            chatId: realChatId,
                            title: chat.title || 'New Chat'
                        }))

                        // Move messages from temp to real chat if needed
                        if (activeChatId !== realChatId && chats[activeChatId]) {
                            dispatch(addMessages({
                                chatId: realChatId,
                                messages: chats[activeChatId].messages
                            }))
                            dispatch(deleteChat({ chatId: activeChatId }))
                        }
                    }

                    // Mark AI message as complete
                    dispatch(updateMessage({
                        chatId: realChatId,
                        messageId: aiMessageId || aiMessagePlaceholderId,
                        content: content, // Set final content
                        isLoading: false,
                        tokenCount: totalTokens,
                        replace: true // Replace content completely
                    }))

                    // Update current chat ID
                    dispatch(setCurrentChatId(realChatId))
                    dispatch(setLoading(false))

                    if (onSuccess) {
                        onSuccess({ content, chat, totalTokens })
                    }
                },
                
                onError: (error) => {
                    // Flush token buffer on error
                    clearTimeout(bufferTimeout);
                    flushTokenBuffer();

                    const errorMessage = error.message || 'Failed to stream message'

                    // Mark message with error state
                    dispatch(updateMessage({
                        chatId: realChatId,
                        messageId: aiMessageId || aiMessagePlaceholderId,
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