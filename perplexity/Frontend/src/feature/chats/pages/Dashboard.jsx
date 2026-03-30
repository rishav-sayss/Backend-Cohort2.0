import React, { useEffect, useState, useRef } from 'react'
import ReactMarkdown from 'react-markdown'
import { useSelector, useDispatch } from 'react-redux'
import { useChat } from '../hooks/chats'
import remarkGfm from 'remark-gfm'
import { createNewChat, setCurrentChatId } from '../chats.slice'
import { Plus, Trash2, Sun, Moon, Mic, Paperclip, Send } from 'lucide-react'
import { useTheme } from '../../shared/context/ThemeContext'

const Dashboard = () => {
  const chat = useChat()
  const { isDark, toggleTheme } = useTheme()

  const dispatch = useDispatch()
  const [chatInput, setChatInput] = useState('')
  const [searchQuery, setSearchQuery] = useState('')
  const messagesEndRef = useRef(null)

  const chats = useSelector((state) => state.chat.chats)
  const currentChatId = useSelector((state) => state.chat.currentChatId)
  const user = useSelector((state) => state.auth.user)
  const isMessageLoading = useSelector((state) => state.chat.isMessageLoading)

  // Auto-scroll to latest message
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [chats[currentChatId]?.messages?.length])

  useEffect(() => {
    chat.initializeSocketConnection()
    chat.handleGetChats()
  }, [])

  const handleSubmitMessage = (event) => {
    event.preventDefault()
    sendMessage(chatInput)
  }

  const openChat = (chatId) => {
    dispatch(setCurrentChatId(chatId))
    chat.handleOpenChat(chatId, chats)
  }

  const handleNewChat = ( ) => {
    const chatId = `chat_${Date.now()}`
    const title = 'New Chat'
    dispatch(createNewChat({ chatId, title }))
    dispatch(setCurrentChatId(chatId))
  }

  const handleDeleteChat = (e, chatId) => {
    e.stopPropagation()
    chat.handleDeleteChat(chatId)
  }

  // Helper function to send a message using STREAMING
  // ✅ FIXED: Proper chatId handling to prevent unnecessary chat creation
  const sendMessage = (message) => {
    const trimmedMessage = message.trim()
    if (!trimmedMessage) {
      return
    }

    // ✅ CRITICAL: Check if we already have a valid currentChatId
    let activeChatId = currentChatId

    // ✅ Only create a NEW chat if:
    // 1. currentChatId is null or undefined, AND
    // 2. There are no existing chats to use
    if (!activeChatId) {
      // Check if we have any existing chats in Redux
      const existingChats = Object.values(chats || {})
      
      if (existingChats.length > 0) {
        // Reuse the first available chat
        activeChatId = existingChats[0].id
        dispatch(setCurrentChatId(activeChatId))
      } else {
        // Only create a new temp chat if NO chats exist at all
        activeChatId = `chat_${Date.now()}`
        const title = 'New Chat'
        dispatch(createNewChat({ chatId: activeChatId, title }))
        dispatch(setCurrentChatId(activeChatId))
      }
    }

    // Clear input immediately for better UX
    setChatInput('')

    // ✅ Send message using the determined chatId
    chat.handleSendMessageStream({ 
      message: trimmedMessage, 
      chatId: activeChatId,
      onSuccess: (response) => {
        // Message sent successfully
      },
      onError: (error) => {
        // Error is handled in the hook
      }
    })
  }

  // Typing animation component
  const TypingIndicator = () => (
    <div className='flex gap-1'>
      <div className={`h-2 w-2 rounded-full animate-bounce transition ${isDark ? 'bg-white/60' : 'bg-gray-600'}`} style={{ animationDelay: '0s' }}></div>
      <div className={`h-2 w-2 rounded-full animate-bounce transition ${isDark ? 'bg-white/60' : 'bg-gray-600'}`} style={{ animationDelay: '0.2s' }}></div>
      <div className={`h-2 w-2 rounded-full animate-bounce transition ${isDark ? 'bg-white/60' : 'bg-gray-600'}`} style={{ animationDelay: '0.4s' }}></div>
    </div>
  )

  const hasMessages = chats[currentChatId]?.messages && chats[currentChatId].messages.length > 0

  // Filter chats based on search query
  const filteredChats = Object.values(chats).filter(chat =>
    chat.title.toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <main className={`min-h-screen w-full p-3 transition-colors duration-200 md:p-5 ${isDark ? 'bg-[#0a0a0a] text-white' : 'bg-[#fafafa] text-gray-900'}`}>
      <section className={`mx-auto flex h-[calc(100vh-1.5rem)] w-full gap-4 md:h-[calc(100vh-2.5rem)] md:gap-6`}>
        {/* Sidebar */}
        <aside className={`hidden  px-2 py-2.5 rounded-md h-full w-64 shrink-0 transition-colors duration-200 md:flex md:flex-col ${isDark ? 'bg-[#161616]' : 'bg-white border-r border-gray-200'}`}>
          {/* Top Section with Logo and Theme Toggle */}
          <div className='mb-8 flex items-center justify-between'>
            <div className='flex items-center gap-2'>
              <div className='w-8 h-8 rounded-lg bg-gradient-to-br from-purple-500 to-pink-500'></div>
              <h1 className='text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent'>Aarka.ai</h1>
            </div>
            <button
              onClick={toggleTheme}
              className={`rounded-lg p-2 transition cursor-pointer ${isDark ? 'bg-white/10 hover:bg-white/20 text-yellow-400' : 'bg-gray-100 hover:bg-gray-200 text-gray-600'}`}
              title='Toggle theme'
            >
              {isDark ? <Sun size={20} /> : <Moon size={20} />}
            </button>
          </div>

          {/* New Chat Button */}
          <button
            onClick={handleNewChat}
            className={`mb-6 w-full rounded-lg px-4 py-2.5 font-semibold transition flex items-center justify-center gap-2 ${isDark ? 'bg-white text-black hover:bg-gray-100' : 'bg-gray-900 text-white hover:bg-gray-800'}`}
            title='New Chat'
          >
            <Plus size={20} />
            New Chat
          </button>

          {/* Search Bar */}
          <input
            type='text'
            placeholder='Search chat'
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className={`mb-6 w-full rounded-lg border px-4 py-2 text-sm outline-none transition ${isDark ? 'border-white/20 bg-white/10 text-white placeholder:text-white/40 hover:bg-white/20 focus:border-purple-500' : 'border-gray-300 bg-white text-gray-900 placeholder:text-gray-500 hover:border-gray-400 focus:border-gray-400 focus:ring-1 focus:ring-gray-200'}`}
          />

          {/* Recent Chats */}
          {filteredChats.length > 0 && (
            <>
              <h3 className={`mb-3 text-xs font-semibold uppercase tracking-wider transition ${isDark ? 'text-white/50' : 'text-gray-600'}`}>RECENT CHATS</h3>
              <div className='space-y-2 flex-1 overflow-y-auto'>
                {filteredChats.map((chat) => (
                  <div
                    key={chat.id}
                    className='group flex items-center gap-2'
                  >
                    <button
                      onClick={() => { openChat(chat.id) }}
                      type='button'
                      className={`flex-1 cursor-pointer rounded-lg px-3 py-2 text-left text-sm font-medium transition ${isDark ? 'text-white/80 hover:bg-white/10' : 'text-gray-800 hover:bg-gray-200'}`}
                    >
                      {chat.title}
                    </button>
                    <button
                      onClick={(e) =>  handleDeleteChat(e, chat.id)}
                      type='button'
                      className={`rounded-lg p-1.5 transition cursor-pointer opacity-0 group-hover:opacity-100 ${isDark ? 'text-white/60 hover:text-red-400' : 'text-gray-600 hover:text-red-600'}`}
                      title='Delete Chat'
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                ))}
              </div>
            </>
          )}

          {/* No Results Message */}
          {searchQuery && filteredChats.length === 0 && (
            <div className={`text-center py-8 transition ${isDark ? 'text-white/50' : 'text-gray-500'}`}>
              <p className='text-sm'>No chats found matching "{searchQuery}"</p>
            </div>
          )}

          {/* User Section */}
          {user && (
            <div className={`mt-auto border-t p-4 transition-colors duration-200 ${isDark ? 'border-white/10' : 'border-gray-200'}`}>
              <button className={`w-full rounded-lg p-3 flex items-center gap-3 transition ${isDark ? 'hover:bg-white/10' : 'hover:bg-gray-200'}`}>
                {/* Avatar */}
                <div className='w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center flex-shrink-0'>
                  <span className='text-white font-semibold text-xs'>
                    {(user?.username || user?.email || 'U')
                      .substring(0, 2)
                      .toUpperCase()}
                  </span>
                </div>

                {/* User Info */}
                <div className='flex-1 text-left min-w-0'>
                  <p className={`text-sm font-medium truncate transition ${isDark ? 'text-white' : 'text-gray-900'}`}>{user?.username}</p>
                  <p className={`text-xs truncate transition ${isDark ? 'text-white/50' : 'text-gray-600'}`}>{user?.email}</p>
                </div>
              </button>
            </div>
          )}
        </aside>

        {/* Main Content */}
        <section className={`relative flex h-full min-w-0 flex-1 flex-col rounded-2xl transition-colors duration-200 ${isDark ? 'bg-[#1a1a1a]' : 'bg-white border border-gray-200'}`}>
          {hasMessages ? (
            <>
              {/* Messages Area */}
              <div className='messages flex-1 space-y-4 overflow-y-auto p-6 scrollbar-hide'
                style={{
                  scrollbarWidth: 'none',
                  msOverflowStyle: 'none',
                }}>
                {chats[currentChatId]?.messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div className='flex flex-col gap-1'>
                      <div
                        className={`max-w-[70%] rounded-lg px-4 py-3 text-sm md:text-base transition ${message.role === 'user'
                          ? isDark ? 'rounded-br-none bg-white text-black' : 'rounded-br-none bg-gray-900 text-white'
                          : isDark ? 'rounded-bl-none bg-white/10 text-white' : 'rounded-bl-none bg-gray-100 text-gray-800'
                          }`}
                      >
                        {message.isLoading ? (
                          <TypingIndicator />
                        ) : message.error ? (
                          <div className='text-red-500 text-sm'>
                            <p className='font-semibold'>Error</p>
                            <p>{message.error}</p>
                          </div>
                        ) : message.role === 'user' ? (
                          <p>{message.content}</p>
                        ) : (
                          <ReactMarkdown
                            components={{
                              p: ({ children }) => <p className='mb-2 last:mb-0'>{children}</p>,
                              ul: ({ children }) => <ul className='mb-2 list-disc pl-5'>{children}</ul>,
                              ol: ({ children }) => <ol className='mb-2 list-decimal pl-5'>{children}</ol>,
                              code: ({ children }) => <code className='rounded bg-white/10 px-1 py-0.5 text-xs'>{children}</code>,
                              pre: ({ children }) => <pre className='mb-2 overflow-x-auto rounded-lg bg-black/40 p-3'>{children}</pre>
                            }}
                            remarkPlugins={[remarkGfm]}
                          >
                            {message.content}
                          </ReactMarkdown>
                        )}
                      </div>
                      {message.timestamp && (
                        <span className={`text-xs transition ${isDark ? 'text-white/40' : 'text-gray-500'}`}>
                          {new Date(message.timestamp).toLocaleTimeString()}
                        </span>
                      )}
                    </div>
                  </div>
                ))}
                <div ref={messagesEndRef} />
              </div>

              {/* Input Footer */}
              <footer className={`border-t transition-colors duration-200 p-6 ${isDark ? 'border-white/10 bg-[#1a1a1a]' : 'border-gray-200 bg-white border-r border-gray-200'}`}>
                <form onSubmit={handleSubmitMessage} className='flex gap-2 items-center'>
                  <input
                    type='text'
                    value={chatInput}
                    onChange={(event) => setChatInput(event.target.value)}
                    placeholder='Ask something...'
                    disabled={isMessageLoading}
                    className={`flex-1 rounded-lg border px-4 py-3 outline-none transition ${isDark ? 'border-white/20 bg-white/10 text-white placeholder:text-white/40 hover:bg-white/20 focus:border-purple-500 disabled:opacity-50' : 'border-gray-200 bg-gray-50 text-black placeholder:text-gray-400 hover:bg-gray-100 focus:border-gray-300 disabled:opacity-50'}`}
                  />
                  
                  {/* Attachment Button */}
                  <button
                    type='button'
                    disabled={isMessageLoading}
                    className={`p-2.5 rounded-lg transition ${isDark ? 'hover:bg-white/10 text-white/60 disabled:opacity-50' : 'hover:bg-gray-100 text-gray-600 disabled:opacity-50'}`}
                    title='Attach file'
                  >
                    <Paperclip size={20} />
                  </button>

                  {/* Mic Button */}
                  <button
                    type='button'
                    disabled={isMessageLoading}
                    className={`p-2.5 rounded-lg transition ${isDark ? 'hover:bg-white/10 text-white/60 disabled:opacity-50' : 'hover:bg-gray-100 text-gray-600 disabled:opacity-50'}`}
                    title='Voice input'
                  >
                    <Mic size={20} />
                  </button>

                  {/* Send Button */}
                  <button
                    type='submit'
                    disabled={!chatInput.trim() || isMessageLoading}
                    className={`p-2.5 rounded-lg transition font-semibold ${isDark ? 'bg-white text-black hover:bg-gray-100 disabled:opacity-50' : 'bg-gray-900 text-white hover:bg-gray-800 disabled:opacity-50'}`}
                    title='Send message'
                  >
                    <Send size={20} />
                  </button>
                </form>
              </footer>
            </>
          ) : (
            <>
              {/* Empty State */}
              <div className='flex flex-1 flex-col items-center justify-center px-6'>
                <h2 className={`mb-2 text-4xl md:text-5xl font-bold transition ${isDark ? 'text-white' : 'text-gray-900'}`}>
                  Hello Deep
                </h2>
                <p className={`mb-12 text-lg transition ${isDark ? 'text-white/40' : 'text-gray-500'}`}>How can I help you today?</p>

                {/* Suggestion Cards */}
                <div className='grid w-full max-w-2xl grid-cols-1 gap-4 md:grid-cols-3 mb-12'>
                  {[
                    {
                      icon: '🕐',
                      title: "What's Happen in 24 hours?",
                      description: "See what's been happening in the world over the last 24 hours"
                    },
                    {
                      icon: '📈',
                      title: 'Stock market update',
                      description: 'See what\'s happening in the stock market in real time'
                    },
                    {
                      icon: '💼',
                      title: 'Deep economic research',
                      description: 'See research from experts that we have simplified'
                    }
                  ].map((item, idx) => (
                    <button
                      key={idx}
                      onClick={() => sendMessage(item.title)}
                      className={`group rounded-lg border p-5 text-left transition ${isDark ? 'border-white/20 bg-white/10 hover:bg-white/20' : 'border-gray-200 bg-white hover:bg-gray-50'}`}
                    >
                      <div className='mb-3 text-2xl'>{item.icon}</div>
                      <h3 className={`mb-2 font-semibold transition ${isDark ? 'text-white' : 'text-gray-900'}`}>{item.title}</h3>
                      <p className={`text-sm transition ${isDark ? 'text-white/50' : 'text-gray-600'}`}>{item.description}</p>
                    </button>
                  ))}
                </div>
              </div>

              {/* Input Footer */}
              <footer className={`border-t transition-colors duration-200 p-6 ${isDark ? 'border-white/10 bg-[#1a1a1a]' : 'border-gray-200 bg-white border-r border-gray-200'}`}>
                <form onSubmit={handleSubmitMessage} className='mx-auto max-w-2xl flex gap-2 items-center'>
                  <input
                    type='text'
                    value={chatInput}
                    onChange={(event) => setChatInput(event.target.value)}
                    placeholder='Ask something...'
                    disabled={isMessageLoading}
                    className={`flex-1 rounded-lg border px-4 py-3 outline-none transition ${isDark ? 'border-white/20 bg-white/10 text-white placeholder:text-white/40 hover:bg-white/20 focus:border-purple-500 disabled:opacity-50' : 'border-gray-300 bg-white text-gray-900 placeholder:text-gray-500 hover:border-gray-400 focus:border-gray-400 focus:ring-1 focus:ring-gray-200 disabled:opacity-50'}`}
                  />
                  
                  {/* Attachment Button */}
                  <button
                    type='button'
                    disabled={isMessageLoading}
                    className={`p-2.5 rounded-lg transition ${isDark ? 'hover:bg-white/10 text-white/60 disabled:opacity-50' : 'hover:bg-gray-100 text-gray-600 disabled:opacity-50'}`}
                    title='Attach file'
                  >
                    <Paperclip size={20} />
                  </button>

                  {/* Mic Button */}
                  <button
                    type='button'
                    disabled={isMessageLoading}
                    className={`p-2.5 rounded-lg transition ${isDark ? 'hover:bg-white/10 text-white/60 disabled:opacity-50' : 'hover:bg-gray-100 text-gray-600 disabled:opacity-50'}`}
                    title='Voice input'
                  >
                    <Mic size={20} />
                  </button>

                  {/* Send Button */}
                  <button
                    type='submit'
                    disabled={!chatInput.trim() || isMessageLoading}
                    className={`p-2.5 rounded-lg transition font-semibold ${isDark ? 'bg-white text-black hover:bg-gray-100 disabled:opacity-50' : 'bg-gray-900 text-white hover:bg-gray-800 disabled:opacity-50'}`}
                    title='Send message'
                  >
                    <Send size={20} />
                  </button>
                </form>
              </footer>
            </>
          )}
        </section>
      </section>
    </main>
  )

}

export default Dashboard
 