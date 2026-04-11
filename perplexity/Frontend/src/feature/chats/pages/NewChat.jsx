// NewChat.jsx
// Hero / welcome screen shown when no conversation is active.
import React, { useCallback } from 'react';
import '../styles/NewChat.css';

const SUGGESTIONS = [
  { icon: 'architecture',  label: 'Design a system' },
  { icon: 'data_object',   label: 'Analyse data'    },
  { icon: 'auto_fix_high', label: 'Generate ideas'  },
  { icon: 'code',          label: 'Write code'       },
];

const PARTICLES = [1, 2, 3, 4, 5];

export default function NewChat({ onSuggestion }) {
  const handleChip = useCallback((label) => onSuggestion?.(label), [onSuggestion]);

  return (
    <div className="new-chat">
      {PARTICLES.map((n) => (
        <div key={n} className={`new-chat__particle new-chat__particle--${n}`} aria-hidden="true" />
      ))}

      <div className="new-chat__hero">
        {/* Icon cluster */}
        <div className="new-chat__icon-cluster" aria-hidden="true">
          <div className="new-chat__icon-glow" />
          <div className="new-chat__icon-ring">
            <span className="material-symbols-outlined">rocket_launch</span>
            <div className="new-chat__orbital new-chat__orbital--1" />
            <div className="new-chat__orbital new-chat__orbital--2" />
          </div>
        </div>

        <h2 className="new-chat__headline">
          What do you want to{' '}
          <span className="new-chat__headline-accent">build</span> today?
        </h2>

        <p className="new-chat__subtitle">
          Ask anything, generate ideas, analyse data, or design systems with
          the power of Celestial Intelligence.
        </p>

        <div className="new-chat__suggestions" role="list">
          {SUGGESTIONS.map(({ icon, label }) => (
            <button
              key={label}
              className="new-chat__chip"
              role="listitem"
              onClick={() => handleChip(label)}
              aria-label={`Start conversation: ${label}`}
            >
              <span className="material-symbols-outlined">{icon}</span>
              {label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}