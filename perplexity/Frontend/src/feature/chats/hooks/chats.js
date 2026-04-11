import { sendMessage, getChats, getMessages } from "../services/chat.api.js";
import {
    setChats,
    setCurrentChatId,
    setLoading,
    setError,
    createNewChat,
    addNewMessage,
    addMessages,
} from "../chats.slice.js";
import { useDispatch } from "react-redux";


export const useChat = () => {

    const dispatch = useDispatch()

    // ── Clear a previously set error ──────────────────────────────────────────
    function handleDismissError() {
        dispatch(setError(null))
    }

    // ── Send a message and receive an AI reply ────────────────────────────────
    async function handleSendMessage({ message, chatId, time }) {
        dispatch(setLoading(true))
        dispatch(setError(null))
        try {
            const data = await sendMessage({ message, chatId })
            const { chat, aiMessage } = data

            // For a new chat the backend creates and returns a chat object.
            // For an existing chat the backend may return chat: null — so always
            // prefer the chatId we already have, and only fall back to chat?._id.
            const resolvedChatId = chatId || chat?._id

            if (!resolvedChatId) {
                throw new Error("No chat ID returned from the server.")
            }

            // New chat — register it in the store before adding messages
            if (!chatId && chat?._id) {
                dispatch(createNewChat({
                    chatId: chat._id,
                    title: chat.title,
                }))
            }

            // Persist the user's message
            dispatch(addNewMessage({
                chatId: resolvedChatId,
                content: message,
                role: "user",
                time,
            }))

            // Persist the AI reply
            dispatch(addNewMessage({
                chatId: resolvedChatId,
                content: aiMessage.content,
                role: aiMessage.role,
            }))

            dispatch(setCurrentChatId(resolvedChatId))
        } catch (error) {
            dispatch(setError(error.message ?? "Failed to send message. Please try again."))
        } finally {
            dispatch(setLoading(false))
        }
    }

    // ── Fetch the list of all chats for the sidebar ───────────────────────────
    async function handleGetChats() {
        dispatch(setLoading(true))
        dispatch(setError(null))
        try {
            const data = await getChats()
            const { chats } = data
            dispatch(setChats(chats.reduce((acc, chat) => {
                acc[chat._id] = {
                    id: chat._id,
                    title: chat.title,
                    messages: [],
                    lastUpdated: chat.updatedAt,
                }
                return acc
            }, {})))
        } catch (error) {
            dispatch(setError(error.message ?? "Failed to load chats. Please refresh the page."))
        } finally {
            dispatch(setLoading(false))
        }
    }

    // ── Open a chat and lazy-load its messages on first visit ─────────────────
    async function handleOpenChat(chatId, chats) {
        // Passing null resets to the welcome screen (new-chat mode)
        if (!chatId) {
            dispatch(setCurrentChatId(null))
            return
        }

        dispatch(setError(null))

        // Messages already loaded — just switch active chat
        if (chats[chatId]?.messages.length > 0) {
            dispatch(setCurrentChatId(chatId))
            return
        }

        dispatch(setLoading(true))
        try {
            const data = await getMessages(chatId)
            const { messages } = data

            dispatch(addMessages({
                chatId,
                messages: messages.map((msg) => ({
                    content: msg.content,
                    role: msg.role,
                })),
            }))

            dispatch(setCurrentChatId(chatId))
        } catch (error) {
            dispatch(setError(error.message ?? "Failed to load messages. Please try again."))
        } finally {
            dispatch(setLoading(false))
        }
    }

    return {
        handleSendMessage,
        handleGetChats,
        handleOpenChat,
        handleDismissError,
    }
}