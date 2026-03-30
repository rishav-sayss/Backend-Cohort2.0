import { createSlice } from '@reduxjs/toolkit';

const chatSlice = createSlice({
    name: 'chat',
    initialState: {
        chats: {},
        currentChatId: null,
        isLoading: false,
        error: null,
        isMessageLoading: false,
    },
    reducers: {
        createNewChat: (state, action) => {
            const { chatId, title } = action.payload
            state.chats[ chatId ] = {
                id: chatId,
                title,
                messages: [],
                lastUpdated: new Date().toISOString(),
            }
        },
        addNewMessage: (state, action) => {
            const { chatId, content, role, id, isLoading, error } = action.payload
            state.chats[ chatId ].messages.push({ 
                id: id || `${Date.now()}-${Math.random()}`,
                content, 
                role,
                timestamp: new Date().toISOString(),
                isLoading: isLoading ?? false,
                error: error ?? null,
                tokenCount: 0
            })
            state.chats[chatId].lastUpdated = new Date().toISOString()
        },
        updateMessage: (state, action) => {
            const { chatId, messageId, content, isLoading, error, tokenCount, append, replace } = action.payload
            const chat = state.chats[chatId]
            if (chat) {
                const message = chat.messages.find(m => m.id === messageId)
                if (message) {
                    // Handle append mode: add tokens to existing content for true streaming
                    if (append && content !== undefined) {
                        message.content += content;
                    }
                    // Handle replace mode: replace entire content (for final completion)
                    else if (replace && content !== undefined) {
                        message.content = content;
                    }
                    // Default: set content directly
                    else if (content !== undefined) {
                        message.content = content;
                    }
                    
                    if (isLoading !== undefined) message.isLoading = isLoading
                    if (error !== undefined) message.error = error
                    if (tokenCount !== undefined) message.tokenCount = tokenCount
                }
            }
        },
        setMessageLoading: (state, action) => {
            state.isMessageLoading = action.payload
        },
        addMessages: (state, action) => {
            const { chatId, messages } = action.payload
            // ✅ FIXED: Map MongoDB _id to id, add missing properties
            const formattedMessages = messages.map(msg => ({
                id: msg.id || msg._id || `${Date.now()}-${Math.random()}`,
                content: msg.content,
                role: msg.role,
                timestamp: msg.timestamp || msg.createdAt || new Date().toISOString(),
                isLoading: false,
                error: null
            }))
            state.chats[chatId].messages.push(...formattedMessages)
        },
        setChats: (state, action) => {
            state.chats = action.payload
        },
        setCurrentChatId: (state, action) => {
            state.currentChatId = action.payload
        },
        setLoading: (state, action) => {
            state.isLoading = action.payload
        },
        setError: (state, action) => {
            state.error = action.payload
        },
        deleteChat: (state, action) => {
            const { chatId } = action.payload
            delete state.chats[ chatId ]
            if (state.currentChatId === chatId) {
                state.currentChatId = null
            }
        },
        updateChatTitle: (state, action) => {
            const { chatId, title } = action.payload
            if (state.chats[ chatId ]) {
                state.chats[ chatId ].title = title
            }
        },
    }
})

export const { setChats, setCurrentChatId, setLoading, setError, setMessageLoading, createNewChat, addNewMessage, updateMessage, addMessages, deleteChat, updateChatTitle } = chatSlice.actions
export default chatSlice.reducer


// chats = {
//     "docker and AWS": {
//         messages: [
//             {
//                 role: "user",
//                 content: "What is docker?"
//             },
//             {
//                 role: "ai",
//                 content: "Docker is a platform that allows developers to automate the deployment of applications inside lightweight, portable containers. It provides an efficient way to package and distribute software, ensuring consistency across different environments."
//             }
//         ],
//         id: "docker and AWS",
//         lastUpdated: "2024-06-20T12:34:56Z",
//     }

// }