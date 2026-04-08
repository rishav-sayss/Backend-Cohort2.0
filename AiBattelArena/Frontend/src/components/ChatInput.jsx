import React, { useState } from 'react';
import { Send, Sparkles } from 'lucide-react';
import axios from "axios"
export function ChatInput({ onSendMessage }) {
  const [input, setInput] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!input?.trim()) return;

    const response = await axios.post("http://localhost:3000/invoke", {
      problem: input
    })

    const data = response.data
    console.log(data)
    onSendMessage(response.data.result);
    setInput("")
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white/80 dark:bg-[#0a0a0b]/80 backdrop-blur-xl border-t border-gray-200/50 dark:border-gray-800 p-6 z-10 transition-colors duration-300">
      <div className="max-w-4xl mx-auto relative">
        <form onSubmit={handleSubmit} className="relative flex items-center">
          <div className="absolute left-6 text-gray-400 dark:text-gray-500">
            <Sparkles className="w-5 h-5" />
          </div>
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask a question or provide a prompt..."
            className="w-full bg-gray-50/80 dark:bg-[#121214] border border-gray-200 dark:border-gray-800 text-gray-800 dark:text-gray-100 rounded-full py-5 pl-14 pr-16 focus:outline-none focus:ring-2 focus:ring-gray-300 dark:focus:ring-gray-700 focus:bg-white dark:focus:bg-[#17171a] transition-all duration-300 shadow-sm"
          />
          <button
            type="submit"
            disabled={!input.trim()}
            className="absolute right-3 p-3 cursor-pointer bg-gray-800 dark:bg-white text-white dark:text-gray-900 rounded-full hover:bg-gray-900 dark:hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 dark:focus:ring-offset-[#121214] focus:ring-gray-800 dark:focus:ring-white disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 shadow-md"
          >
            <Send className="w-5 h-5" />
          </button>
        </form>
        <p className="text-center text-xs text-gray-400 dark:text-gray-600 mt-4 font-medium tracking-wide">
          AI Battle Arena &middot; Comparing leading intelligence models
        </p>
      </div>
    </div>
  );
}
