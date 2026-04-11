// Sidebar.jsx
import '../styles/Sidebar.css';
import { useAuth } from '../../auth/hooks/useauth';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setUser } from '../../auth/auth.slice';
import { deleteChat } from '../api/chat.api';
import { setChats, setCurrentChatId, setError } from '../chat.slice';

/* ── Relative-time helper ─────────────────────────────────────────────────── */
function relativeTime(isoString) {
  if (!isoString) return '';
  const diff = Date.now() - new Date(isoString).getTime();
  const mins  = Math.floor(diff / 60_000);
  const hours = Math.floor(diff / 3_600_000);
  const days  = Math.floor(diff / 86_400_000);

  if (mins < 1)   return 'Just now';
  if (mins < 60)  return `${mins} min${mins === 1 ? '' : 's'} ago`;
  if (hours < 24) return `${hours} hour${hours === 1 ? '' : 's'} ago`;
  if (days < 2)   return 'Yesterday';
  if (days < 7)   return `${days} days ago`;
  return new Date(isoString).toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
}

/* ── Component ───────────────────────────────────────────────────────────── */
export default function Sidebar({ onNewChat, onOpenChat, user, isOpen = false, onClose }) {

  const { handleLogout } = useAuth();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const chats        = useSelector((state) => state.chat.chats);
  const currentChatId = useSelector((state) => state.chat.currentChatId);
  const isLoading    = useSelector((state) => state.chat.isLoading);

  // Sort chats newest-first
  const sortedChats = Object.values(chats).sort(
    (a, b) => new Date(b.lastUpdated) - new Date(a.lastUpdated)
  );

  async function handleDeleteChat(e, chatId) {
    e.stopPropagation();
    try {
      await deleteChat(chatId);
      const updated = { ...chats };
      delete updated[chatId];
      dispatch(setChats(updated));
      if (currentChatId === chatId) dispatch(setCurrentChatId(null));
    } catch (err) {
      dispatch(setError(err.message ?? 'Failed to delete chat. Please try again.'));
    }
  }

  // When a session is clicked on mobile, also close the sidebar
  function handleSessionClick(id) {
    onOpenChat?.(id, chats);
    onClose?.();
  }

  // When New Chat is clicked on mobile, also close the sidebar
  function handleNewChatClick() {
    onNewChat?.();
    onClose?.();
  }

  return (
    <>
      {/* Mobile overlay — tap outside to close */}
      <div
        className={`sidebar__overlay${isOpen ? ' sidebar__overlay--visible' : ''}`}
        onClick={onClose}
        aria-hidden="true"
      />

      <aside className={`sidebar${isOpen ? ' sidebar--open' : ''}`}>

        {/* Mobile close button */}
        <button
          className="sidebar__close-btn"
          onClick={onClose}
          aria-label="Close menu"
        >
          <span className="material-symbols-outlined">close</span>
        </button>

        {/* Brand */}
        <div className="sidebar__brand">
          <h1 className="sidebar__brand-name">NovaAI</h1>
          <span className="sidebar__brand-tagline">Celestial Architect</span>
        </div>

        {/* New Chat CTA */}
        <div className="sidebar__new-chat">
          <button
            className="sidebar__new-chat-btn"
            onClick={handleNewChatClick}
            disabled={isLoading}
          >
            <span className="material-symbols-outlined">add_circle</span>
            New Chat
          </button>
        </div>

        {/* Session history */}
        <nav className="sidebar__nav">
          {sortedChats.length === 0 && (
            <p className="sidebar__empty">No conversations yet.</p>
          )}

          {sortedChats.map(({ id, title, lastUpdated }) => {
            const isActive = id === currentChatId;
            return (
              <div
                key={id}
                className={`sidebar__session${isActive ? ' sidebar__session--active' : ''}`}
                onClick={() => handleSessionClick(id)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => e.key === 'Enter' && handleSessionClick(id)}
                aria-current={isActive ? 'true' : undefined}
              >
                <div className="sidebar__session-row">
                  <span className="material-symbols-outlined sidebar__session-icon">
                    chat_bubble
                  </span>
                  <p className="sidebar__session-title">{title || 'Untitled Chat'}</p>
                </div>

                <div className="sidebar__session-meta">
                  <p className="sidebar__session-time">{relativeTime(lastUpdated)}</p>
                  <button
                    className="sidebar__session-delete"
                    aria-label={`Delete chat: ${title}`}
                    onClick={(e) => handleDeleteChat(e, id)}
                  >
                    <span className="material-symbols-outlined">delete</span>
                  </button>
                </div>
              </div>
            );
          })}
        </nav>

        {/* User profile */}
        <div className="sidebar__footer">
          <div className="sidebar__user">
            <div className="sidebar__user-avatar-wrap">
              <img
                className="sidebar__user-avatar"
                src="default_avatar.jpg"
                alt={user?.username ?? 'User'}
              />
              <div className="sidebar__user-online" />
            </div>
            <div className="sidebar__user-info">
              <p className="sidebar__user-name">{user?.username}</p>
              <p className="sidebar__user-role">{user?.email}</p>
            </div>
            <button
              className="sidebar__logout-btn"
              aria-label="Logout"
              onClick={async () => {
                const { success } = await handleLogout();
                if (success) {
                  dispatch(setUser(null));
                  navigate('/login');
                }
              }}
            >
              <span className="material-symbols-outlined">logout</span>
            </button>
          </div>
        </div>

      </aside>
    </>
  );
}