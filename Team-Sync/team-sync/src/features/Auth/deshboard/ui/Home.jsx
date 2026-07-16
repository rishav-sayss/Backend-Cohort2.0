import React from 'react';
// import './Dashboard.css';

/* ---- Static Data ---- */
const stats = [
  {
    id: 'total-tasks',
    label: 'Total Tasks',
    value: '128',
    badge: '+12%',
    badgeClass: 'bg-[color-mix(in_srgb,var(--color-secondary)_20%,transparent)] text-[var(--color-secondary)]',
    icon: (
      <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M9 11l3 3L22 4"/><path d="M21 12v7a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h11"/>
      </svg>
    ),
  },
  {
    id: 'completed-tasks',
    label: 'Completed Tasks',
    value: '94',
    badge: '+5%',
    badgeClass: 'bg-[color-mix(in_srgb,var(--color-secondary)_20%,transparent)] text-[var(--color-secondary)]',
    icon: (
      <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10"/><path d="M9 12l2 2 4-4"/>
      </svg>
    ),
  },
  {
    id: 'active-projects',
    label: 'Active Projects',
    value: '12',
    badge: 'ACTIVE',
    badgeClass: 'bg-[color-mix(in_srgb,var(--color-primary)_15%,transparent)] text-[var(--color-primary)]',
    icon: (
      <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M18 20V10"/><path d="M12 20V4"/><path d="M6 20v-6"/>
      </svg>
    ),
  },
  {
    id: 'team-members',
    label: 'Team Members',
    value: '42',
    badge: '8 NEW',
    badgeClass: 'bg-[color-mix(in_srgb,var(--color-tertiary)_20%,transparent)] text-[var(--color-tertiary)]',
    icon: (
      <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/><circle cx="9" cy="7" r="4"/>
        <path d="M23 21v-2a4 4 0 00-3-3.87"/><path d="M16 3.13a4 4 0 010 7.75"/>
      </svg>
    ),
  },
];

const barData = [
  { day: 'Mon', pct: 55 },
  { day: 'Tue', pct: 80 },
  { day: 'Wed', pct: 65 },
  { day: 'Thu', pct: 100, highlight: true },
  { day: 'Fri', pct: 70 },
  { day: 'Sat', pct: 40 },
  { day: 'Sun', pct: 30 },
];

const activities = [
  { id: 'a1', emoji: '✏️', text: <><strong className="text-[var(--color-on-surface)]">Sarah</strong> updated <span className="text-[var(--color-primary)] font-medium">Landing Page Redesign</span></>, time: '2 hours ago' },
  { id: 'a2', emoji: '✅', text: <><strong className="text-[var(--color-on-surface)]">Alex</strong> completed <span className="text-[var(--color-primary)] font-medium">API Integration</span></>, time: '5 hours ago' },
  { id: 'a3', emoji: '👤', text: <>New member joined <span className="text-[var(--color-primary)] font-medium">Design Team</span></>, time: 'Yesterday' },
  { id: 'a4', emoji: '⚠️', text: <>Server alert: <span className="text-[var(--color-error)] font-semibold">High latency detected</span></>, time: 'Oct 12, 11:30 PM' },
];

const teamMembers = [
  { id: 'tm1', name: 'Sarah J.', initials: 'SJ', status: 'In Meeting',    statusColor: 'text-[var(--color-secondary)]',  avatarBg: 'bg-[var(--color-primary-container)]',   avatarText: 'text-[var(--color-on-primary-container)]' },
  { id: 'tm2', name: 'Alex M.',  initials: 'AM', status: 'Coding',         statusColor: 'text-[var(--color-primary)]',    avatarBg: 'bg-[var(--color-secondary-container)]', avatarText: 'text-[var(--color-on-secondary-container)]' },
  { id: 'tm3', name: 'Elena R.', initials: 'ER', status: 'Design Review',  statusColor: 'text-[var(--color-tertiary)]',   avatarBg: 'bg-[var(--color-tertiary-container)]',  avatarText: 'text-[var(--color-on-tertiary-container)]' },
  { id: 'tm4', name: 'Marcus L.',initials: 'ML', status: 'Out of Office',  statusColor: 'text-[var(--color-error)]',      avatarBg: 'bg-[var(--color-error-container)]',     avatarText: 'text-[var(--color-on-error-container)]' },
];

/* ---- Component ---- */
function Home() {
  return (
    <div className="flex flex-col gap-6 animate-[fadeInUp_0.35s_ease_both]">

      {/* Greeting */}
      <div>
        <h1 className="text-[28px] font-bold text-[var(--color-on-surface)] tracking-tight flex items-center gap-2.5 mb-1.5">
          Good morning, Devendra 👋
        </h1>
        <p className="text-sm text-[var(--color-on-surface-variant)]">
          Here's what's happening in TeamSync today.
        </p>
      </div>

      {/* Stats Row */}
      <div className="grid grid-cols-4 gap-4">
        {stats.map((s) => (
          <div
            key={s.id}
            id={s.id}
            className="bg-[var(--color-surface-container)] border border-[var(--color-outline-variant)] rounded-xl p-5 transition-all duration-200 cursor-default hover:-translate-y-0.5 hover:shadow-[var(--shadow-level3)]"
          >
            <div className="flex items-center justify-between mb-3.5">
              <div className="w-9 h-9 rounded-[10px] bg-[color-mix(in_srgb,var(--color-primary)_15%,transparent)] flex items-center justify-center text-[var(--color-primary)]">
                {s.icon}
              </div>
              <span className={`text-[11px] font-semibold px-2 py-0.5 rounded-full ${s.badgeClass}`}>
                {s.badge}
              </span>
            </div>
            <div className="text-xs text-[var(--color-on-surface-variant)] font-medium mb-1">{s.label}</div>
            <div className="text-[30px] font-bold text-[var(--color-on-surface)] leading-none tracking-tight">{s.value}</div>
          </div>
        ))}
      </div>

      {/* Mid Row: Bar Chart + Activity */}
      <div className="grid grid-cols-[1fr_300px] gap-4">

        {/* Bar Chart */}
        <div className="bg-[var(--color-surface-container)] border border-[var(--color-outline-variant)] rounded-xl p-5">
          <div className="flex items-center justify-between mb-5">
            <span className="text-[15px] font-semibold text-[var(--color-on-surface)]">Task Progress</span>
            <button
              id="chart-filter-btn"
              className="flex items-center gap-1.5 px-2.5 py-[5px] bg-[var(--color-surface-container-high)] border border-[var(--color-outline-variant)] rounded-md text-xs text-[var(--color-on-surface-variant)] cursor-pointer font-[inherit] transition-colors duration-200 hover:border-[var(--color-primary)] hover:text-[var(--color-on-surface)]"
            >
              Last 7 Days
              <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="6 9 12 15 18 9"/>
              </svg>
            </button>
          </div>

          {/* Bars */}
          <div className="flex items-end justify-between gap-2 h-[150px] mb-3">
            {barData.map((bar) => (
              <div key={bar.day} className="flex-1 flex flex-col items-center gap-2 h-full justify-end">
                <div
                  className={`w-full max-w-[40px] rounded-t-[5px] transition-all duration-300 cursor-pointer ${
                    bar.highlight
                      ? 'bg-[var(--color-primary)] shadow-[0_0_14px_color-mix(in_srgb,var(--color-primary)_40%,transparent)]'
                      : 'bg-[color-mix(in_srgb,var(--color-primary)_25%,transparent)] hover:bg-[color-mix(in_srgb,var(--color-primary)_45%,transparent)]'
                  }`}
                  style={{ height: `${bar.pct}%` }}
                />
                <span className="text-[11px] text-[var(--color-outline)] font-medium">{bar.day}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Activity Timeline */}
        <div className="bg-[var(--color-surface-container)] border border-[var(--color-outline-variant)] rounded-xl p-5">
          <div className="text-[15px] font-semibold text-[var(--color-on-surface)] mb-5">Activity Timeline</div>
          <div className="flex flex-col gap-[18px]">
            {activities.map((act) => (
              <div key={act.id} className="flex gap-3 items-start">
                <div className="w-8 h-8 rounded-full bg-[var(--color-surface-container-high)] flex items-center justify-center text-sm shrink-0">
                  {act.emoji}
                </div>
                <div className="flex-1">
                  <div className="text-[13px] text-[var(--color-on-surface-variant)] leading-snug mb-0.5">{act.text}</div>
                  <div className="text-[11px] text-[var(--color-outline)]">{act.time}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Row: Team Members + AI Suggestion */}
      <div className="grid grid-cols-[1fr_300px] gap-4">

        {/* Team Members */}
        <div className="bg-[var(--color-surface-container)] border border-[var(--color-outline-variant)] rounded-xl p-5">
          <div className="flex items-center justify-between mb-5">
            <span className="text-[15px] font-semibold text-[var(--color-on-surface)]">Active Team Members</span>
            <button
              id="view-all-team-btn"
              className="text-[12px] text-[var(--color-primary)] bg-transparent border-none cursor-pointer font-medium font-[inherit] hover:underline"
            >
              View All
            </button>
          </div>
          <div className="grid grid-cols-2 gap-3">
            {teamMembers.map((m) => (
              <div
                key={m.id}
                className="flex items-center gap-2.5 p-3 bg-[var(--color-surface-container-lowest)] border border-[var(--color-outline-variant)] rounded-[10px] transition-colors duration-200 hover:bg-[var(--color-surface-container-high)]"
              >
                <div className={`w-9 h-9 rounded-full flex items-center justify-center text-[13px] font-bold shrink-0 ${m.avatarBg} ${m.avatarText}`}>
                  {m.initials}
                </div>
                <div>
                  <div className="text-[13px] font-semibold text-[var(--color-on-surface)]">{m.name}</div>
                  <div className={`text-[11px] font-medium ${m.statusColor}`}>{m.status}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* AI Suggestion */}
        <div className="relative bg-[color-mix(in_srgb,var(--color-primary-container)_20%,var(--color-surface-container))] border border-[color-mix(in_srgb,var(--color-primary)_30%,transparent)] rounded-xl p-5 overflow-hidden">
          {/* Glow blob */}
          <div className="absolute -top-8 -right-8 w-28 h-28 rounded-full bg-[color-mix(in_srgb,var(--color-primary)_12%,transparent)] pointer-events-none" />

          <div className="flex items-center gap-2 mb-3.5 text-[var(--color-primary)] text-[13px] font-bold">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
              <path d="M12 2L2 7l10 5 10-5-10-5z" fill="currentColor" opacity="0.9"/>
              <path d="M2 17l10 5 10-5" stroke="currentColor" strokeWidth="2" fill="none"/>
              <path d="M2 12l10 5 10-5" stroke="currentColor" strokeWidth="2" fill="none"/>
            </svg>
            TS — AI Suggestion
          </div>

          <div className="text-[15px] font-bold text-[var(--color-on-surface)] mb-2">AI Suggestion</div>
          <div className="text-[13px] text-[var(--color-on-surface-variant)] leading-relaxed mb-4">
            Based on your activity, you should review the "Core API" tasks today.
          </div>

          <button
            id="ai-suggestion-btn"
            className="inline-flex items-center gap-1.5 px-4 py-2 bg-[var(--color-primary-container)] text-[var(--color-on-primary-container)] border-none rounded-lg text-[13px] font-semibold cursor-pointer font-[inherit] transition-all duration-200 hover:shadow-[var(--shadow-level2)] hover:-translate-y-px"
          >
            Take Action
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>
            </svg>
          </button>
        </div>
      </div>

    </div>
  );
}

export default Home;
