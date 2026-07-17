import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { toggleTheme } from '../../../../../shared/state/themeslice';

function TopNavbar() {
  const [searchFocused, setSearchFocused] = useState(false);

  // Redux — theme state padhna aur toggle dispatch karna
  const theme = useSelector((state) => state.theme.mode);
  const dispatch = useDispatch();

  const isDark = theme === 'dark' || theme == null;

  return (
    <header className="flex items-center justify-between px-6 gap-4 h-[60px] bg-[var(--color-surface-container-low)] border-b border-[var(--color-outline-variant)] z-[9] shrink-0 transition-colors duration-300">

      {/* Search Bar */}
      <div
        className={`flex items-center gap-2 px-3 py-[7px] rounded-lg w-[280px] border transition-all duration-200
          ${searchFocused
            ? 'border-[var(--color-primary)] shadow-[0_0_0_3px_color-mix(in_srgb,var(--color-primary)_20%,transparent)] bg-[var(--color-surface-container)]'
            : 'border-[var(--color-outline-variant)] bg-[var(--color-surface-container-lowest)]'
          }`}
      >
        <svg className="text-[var(--color-outline)] shrink-0" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
        </svg>
        <input
          id="topnav-search-input"
          type="text"
          placeholder="Search workspace..."
          className="flex-1 bg-transparent border-none outline-none text-[var(--color-on-surface)] text-[13px] font-[inherit] placeholder:text-[var(--color-outline)]"
          onFocus={() => setSearchFocused(true)}
          onBlur={() => setSearchFocused(false)}
        />
        <span className="text-[11px] text-[var(--color-outline)] bg-[var(--color-surface-container-high)] border border-[var(--color-outline-variant)] rounded px-[5px] py-[1px] shrink-0">
          ⌘K
        </span>
      </div>

      {/* Right Actions */}
      <div className="flex items-center gap-1.5 ml-auto">

        {/* Notification */}
        <button
          id="topnav-notification-btn"
          aria-label="Notifications"
          className="relative w-9 h-9 flex items-center justify-center rounded-lg text-[var(--color-on-surface-variant)] bg-transparent border-none cursor-pointer transition-all duration-200 hover:bg-[var(--color-surface-container)] hover:text-[var(--color-on-surface)]"
        >
          <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9"/>
            <path d="M13.73 21a2 2 0 01-3.46 0"/>
          </svg>
          <span className="absolute top-[7px] right-[7px] w-[7px] h-[7px] rounded-full bg-[var(--color-primary)] border-[1.5px] border-[var(--color-surface-container-low)]" />
        </button>

        {/* ===== Theme Toggle Button ===== */}
        <button
          id="topnav-theme-toggle-btn"
          aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
          onClick={() => dispatch(toggleTheme())}
          className="w-9 h-9 flex items-center justify-center rounded-lg border-none cursor-pointer transition-all duration-200
            bg-[color-mix(in_srgb,var(--color-primary)_12%,transparent)]
            text-[var(--color-primary)]
            hover:bg-[color-mix(in_srgb,var(--color-primary)_22%,transparent)]
            hover:shadow-[0_0_12px_color-mix(in_srgb,var(--color-primary)_30%,transparent)]"
          title={isDark ? 'Light mode' : 'Dark mode'}
        >
          {isDark ? (
            /* Sun icon — light mode pe switch */
            <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="5"/>
              <line x1="12" y1="1" x2="12" y2="3"/>
              <line x1="12" y1="21" x2="12" y2="23"/>
              <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/>
              <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/>
              <line x1="1" y1="12" x2="3" y2="12"/>
              <line x1="21" y1="12" x2="23" y2="12"/>
              <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/>
              <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>
            </svg>
          ) : (
            /* Moon icon — dark mode pe switch */
            <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z"/>
            </svg>
          )}
        </button>

        {/* AI / Lightning */}
        <button
          id="topnav-ai-btn"
          aria-label="AI Assistant"
          className="w-9 h-9 flex items-center justify-center rounded-lg text-[var(--color-on-surface-variant)] bg-transparent border-none cursor-pointer transition-all duration-200 hover:bg-[var(--color-surface-container)] hover:text-[var(--color-on-surface)]"
        >
          <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/>
          </svg>
        </button>

        {/* Brand Chip */}
        <div className="flex items-center gap-1.5 px-2.5 py-1 bg-[color-mix(in_srgb,var(--color-primary)_12%,transparent)] border border-[color-mix(in_srgb,var(--color-primary)_30%,transparent)] rounded-lg text-[var(--color-primary)] text-[12px] font-bold">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
            <path d="M12 2L2 7l10 5 10-5-10-5z" fill="currentColor" opacity="0.9"/>
            <path d="M2 17l10 5 10-5" stroke="currentColor" strokeWidth="2" fill="none"/>
            <path d="M2 12l10 5 10-5" stroke="currentColor" strokeWidth="2" fill="none"/>
          </svg>
          TS
        </div>

        {/* Grid Menu */}
        <button
          id="topnav-menu-btn"
          aria-label="App menu"
          className="w-9 h-9 flex items-center justify-center rounded-lg text-[var(--color-on-surface-variant)] bg-transparent border-none cursor-pointer transition-all duration-200 hover:bg-[var(--color-surface-container)] hover:text-[var(--color-on-surface)]"
        >
          <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect x="3" y="3" width="4" height="4" rx="0.5"/><rect x="10" y="3" width="4" height="4" rx="0.5"/>
            <rect x="17" y="3" width="4" height="4" rx="0.5"/><rect x="3" y="10" width="4" height="4" rx="0.5"/>
            <rect x="10" y="10" width="4" height="4" rx="0.5"/><rect x="17" y="10" width="4" height="4" rx="0.5"/>
            <rect x="3" y="17" width="4" height="4" rx="0.5"/><rect x="10" y="17" width="4" height="4" rx="0.5"/>
            <rect x="17" y="17" width="4" height="4" rx="0.5"/>
          </svg>
        </button>

        {/* Avatar */}
        <button
          id="topnav-profile-btn"
          aria-label="User profile"
          className="p-0 bg-transparent border-none cursor-pointer rounded-full transition-all duration-200 hover:shadow-[0_0_0_2px_var(--color-primary)]"
        >
          <div className="w-[34px] h-[34px] rounded-full bg-gradient-to-br from-[var(--color-tertiary-container)] to-[var(--color-error-container)] flex items-center justify-center text-sm font-bold text-[var(--color-on-surface)]">
            D
          </div>
        </button>
      </div>
    </header>
  );
}

export default TopNavbar;
