import React, { useState, useRef, useEffect } from 'react';
import './App.css';
import { MessageBlock } from '../components/MessageBlock';
import { ChatInput } from '../components/ChatInput';
import { Sun, Moon } from 'lucide-react';

 
function App() {
  const [messages, setMessages] = useState([]);
  console.log(messages)
  const [isDarkMode, setIsDarkMode] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Apply dark class to body so background covers correctly
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  const handleSendMessage = (text) => {
    console.log(text)

    setMessages(prev => [...prev,text]);
  };

  return (
    <div className="min-h-screen bg-[#f9f9fb] dark:bg-[#0a0a0b] text-gray-900 dark:text-gray-100 font-sans selection:bg-gray-200 dark:selection:bg-gray-800 transition-colors duration-300">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 bg-[#f9f9fb]/80 dark:bg-[#0a0a0b]/80 backdrop-blur-md z-10 border-b border-gray-200/50 dark:border-gray-800 transition-colors duration-300">
        <div className="max-w-6xl mx-auto px-6 py-5 flex items-center justify-between">
          <div>
            <h1 className="text-xl font-bold tracking-tight text-gray-900 dark:text-white">Battle Arena</h1>
            <p className="text-xs text-gray-500 dark:text-gray-400 font-medium">Model A vs Model B</p>
          </div>
          <div className="flex gap-4">
            <button
              onClick={() => setIsDarkMode(!isDarkMode)}
              className="p-2 rounded-full text-gray-500 cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-800 transition-colors"
            >
              {isDarkMode ? <Sun className="w-5 h-5 text-gray-300" /> : <Moon className="w-5 h-5" />}
            </button>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-green-500"></div>
              <span className="text-sm text-gray-600 dark:text-gray-300 font-medium">System Online</span>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content Feed */}
      <main className="pt-32 pb-48 px-6">
        {messages.map((msg, idx) => (
          <MessageBlock key={idx} message={msg} />
        ))}
        <div ref={messagesEndRef} />
      </main>

      {/* Input / Form Area */}
      <ChatInput onSendMessage={handleSendMessage} />
    </div>
  );
}

export default App;