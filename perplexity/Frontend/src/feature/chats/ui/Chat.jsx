// Chat.jsx
// Root shell composing Sidebar, TopBar, NewChat / message canvas, and ChatInput.

import { useRef, useEffect, useCallback, useState } from 'react';
import Sidebar from '../pages/Sidebar';
import TopBar from '../pages/Topbar';
import NewChat from '../pages/NewChat';
import ChatInput from '../pages/ChatInput';
import '../styles/Chat.css';
import { useSelector } from 'react-redux';
import { useChat } from '../hooks/chats';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

/* ── Format time helper ── */
function formatTime(date) {
  return date.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' });
}

/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   Sub-components
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */

function AiMessage({ text }) {
  return (
    <div className="chat__msg-ai">
      {/* Avatar */}
      <div className="chat__avatar-ai">
        <span className="material-symbols-outlined">bolt</span>
      </div>

      {/* Body */}
      <div className="chat__msg-ai-body">
        <div className="chat__bubble-ai glass-panel">
          <div className="chat__md">
            <ReactMarkdown remarkPlugins={[remarkGfm]}>
              {text}
            </ReactMarkdown>
          </div>
        </div>
        {/* Status badge */}
        <div className="chat__ai-status">
          <div className="chat__ai-status-dot" />
          <span className="chat__ai-status-label">AI Status: Ready</span>
        </div>
      </div>
    </div>
  );
}

function UserMessage({ text, time }) {
  return (
    <div className="chat__msg-user">
      <div className="chat__msg-user-body">
        <div className="chat__bubble-user">
          <p>{text}</p>
        </div>
        {time && <p className="chat__timestamp">Sent {time}</p>}
      </div>
      {/* Avatar — profile image */}
      <div className="chat__avatar-user">
        <img
          src="default_avatar.jpg"
          alt="User avatar"
        />
      </div>
    </div>
  );
}

function TypingIndicator() {
  return (
    <div className="chat__typing">
      <div className="chat__avatar-thinking">
        <span className="material-symbols-outlined">auto_awesome</span>
      </div>
      <div className="chat__typing-bubble glass-panel">
        <div className="chat__typing-dots">
          <div className="chat__typing-dot" />
          <div className="chat__typing-dot" />
          <div className="chat__typing-dot" />
        </div>
      </div>
    </div>
  );
}

function ErrorBanner({ message, onDismiss }) {
  return (
    <div className="chat__error-banner" role="alert">
      <span className="material-symbols-outlined">error</span>
      <p>{message}</p>
      <button className="chat__error-dismiss" onClick={onDismiss} aria-label="Dismiss error">
        <span className="material-symbols-outlined">close</span>
      </button>
    </div>
  );
}

/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   Chat root
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */

export default function Chat() {
  const bottomRef = useRef(null);

  // ── Sidebar open/close state (for mobile drawer) ─────────────────────────
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const openSidebar = useCallback(() => setSidebarOpen(true), []);
  const closeSidebar = useCallback(() => setSidebarOpen(false), []);
  const toggleSidebar = useCallback(() => setSidebarOpen((v) => !v), []);

  // Lock body scroll when sidebar drawer is open on mobile
  useEffect(() => {
    const isMobile = window.matchMedia('(max-width: 767px)').matches;
    if (isMobile && sidebarOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [sidebarOpen]);

  // Close sidebar on resize to desktop (avoids stale open state)
  useEffect(() => {
    function handleResize() {
      if (window.innerWidth > 767) setSidebarOpen(false);
    }
    window.addEventListener('resize', handleResize, { passive: true });
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // ── Redux state ──────────────────────────────────────────
  const user = useSelector((state) => state.auth.user);
  const chats = useSelector((state) => state.chat.chats);
  const currentChatId = useSelector((state) => state.chat.currentChatId);
  const isLoading = useSelector((state) => state.chat.isLoading);
  const error = useSelector((state) => state.chat.error);

  // ── Derived values ───────────────────────────────────────
  const currentMessages = currentChatId ? (chats[currentChatId]?.messages ?? []) : [];
  const showNew = !currentChatId || currentMessages.length === 0;

  // ── Hooks ────────────────────────────────────────────────
  const { handleSendMessage, handleGetChats, handleOpenChat, handleDismissError } = useChat();

  // Auto-scroll on new messages / typing
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [currentMessages, isLoading]);

  // Load sidebar chat list on mount
  useEffect(() => {
    handleGetChats();
  }, []);

  // ── Handlers ─────────────────────────────────────────────
  const handleNewChat = useCallback(() => {
    handleOpenChat(null, chats);
  }, [chats, handleOpenChat]);

  const handleSend = useCallback(async (text) => {
    const time = formatTime(new Date());
    await handleSendMessage({ message: text, chatId: currentChatId, time });
  }, [currentChatId, handleSendMessage]);

  const handleSuggestion = useCallback((label) => handleSend(label), [handleSend]);

  return (
    <div className="chat">
      {/* Atmospheric background glows */}
      <div className="chat__bg-glow" aria-hidden="true">
        <div className="chat__bg-glow-tr" />
        <div className="chat__bg-glow-bl" />
      </div>

      {/* Sidebar — receives isOpen + onClose for mobile drawer */}
      <Sidebar
        onNewChat={handleNewChat}
        onOpenChat={handleOpenChat}
        user={user}
        chats={chats}
        isOpen={sidebarOpen}
        onClose={closeSidebar}
      />

      {/* Right side */}
      <div className="chat__main">
        {/* TopBar — receives onMenuToggle for hamburger button */}
        <TopBar onMenuToggle={toggleSidebar} />

        {/* Error banner */}
        {error && (
          <ErrorBanner message={error} onDismiss={handleDismissError} />
        )}

        <div className="chat__canvas">
          {showNew ? (
            /* Welcome screen */
            <NewChat onSuggestion={handleSuggestion} />
          ) : (
            /* Active conversation */
            <div className="chat__messages">
              {currentMessages.map((msg, index) =>
                msg.role === 'assistant' || msg.role === 'ai' ? (
                  <AiMessage key={index} text={msg.content} />
                ) : (
                  <UserMessage key={index} text={msg.content} time={msg.time} />
                )
              )}
              {isLoading && <TypingIndicator />}
              <div ref={bottomRef} />
            </div>
          )}
        </div>
      </div>

      {/* Fixed bottom input */}
      <ChatInput onSend={handleSend} disabled={isLoading} />
    </div>
  );
}