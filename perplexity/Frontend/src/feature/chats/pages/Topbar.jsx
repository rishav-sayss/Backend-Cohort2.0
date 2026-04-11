// TopBar.jsx
import '../styles/TopBar.css';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

const NAV_ITEMS = [
  { label: 'Home', href: '/',  active: false },
  { label: 'Chat', href: '#',  active: true  },
];

export default function TopBar({ onMenuToggle }) {
  const chats         = useSelector((state) => state.chat.chats);
  const currentChatId = useSelector((state) => state.chat.currentChatId);
  const isLoading     = useSelector((state) => state.chat.isLoading);

  const chatTitle = currentChatId ? (chats[currentChatId]?.title ?? null) : null;

  return (
    <header className="topbar">

      {/* Hamburger — visible only on mobile via CSS */}
      <button
        className="topbar__menu-btn"
        onClick={onMenuToggle}
        aria-label="Toggle sidebar menu"
        aria-expanded={undefined /* controlled by CSS visibility */}
      >
        <span className="material-symbols-outlined">menu</span>
      </button>

      {/* Left nav */}
      <nav className="topbar__nav">
        {NAV_ITEMS.map(({ label, href, active }) => (
          <Link
            key={label}
            to={href}
            className={`topbar__nav-link${active ? ' topbar__nav-link--active' : ''}`}
          >
            {label}
          </Link>
        ))}
      </nav>

      {/* Centre — active chat title */}
      <div className="topbar__title-wrap" aria-live="polite">
        {chatTitle ? (
          <>
            <span className="material-symbols-outlined topbar__title-icon">chat_bubble</span>
            <span className="topbar__title">{chatTitle}</span>
            {isLoading && (
              <span className="topbar__title-thinking">
                <span className="material-symbols-outlined topbar__title-spinner">
                  progress_activity
                </span>
                Thinking…
              </span>
            )}
          </>
        ) : (
          <span className="topbar__title topbar__title--empty">New Conversation</span>
        )}
      </div>

      {/* Right — message count badge */}
      <div className="topbar__right">
        {currentChatId && (
          <div className="topbar__meta">
            <span className="material-symbols-outlined topbar__meta-icon">forum</span>
            <span className="topbar__meta-label">
              {chats[currentChatId]?.messages?.length ?? 0} messages
            </span>
          </div>
        )}
      </div>

    </header>
  );
}