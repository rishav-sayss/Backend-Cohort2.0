import React from 'react';
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router';
import { store } from '../../../../../app/store';
import { AdminNavigation, employeeNavigation } from '../../../../../app/constent/navigation';

// const navItems = [
//   {
//     id: 'dashboard',
//     label: 'Dashboard',
//     path: '/Home',
//     icon: (
//       <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
//         <rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/>
//         <rect x="14" y="14" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/>
//       </svg>
//     ),
//   },
//   {
//     id: 'tasks',
//     label: 'Tasks',
//     path: '/Home/task',
//     icon: (
//       <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
//         <path d="M9 11l3 3L22 4"/><path d="M21 12v7a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h11"/>
//       </svg>
//     ),
//   },
//   {
//     id: 'team',
//     label: 'Team',
//     path: '/Home/team',
//     icon: (
//       <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
//         <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/><circle cx="9" cy="7" r="4"/>
//         <path d="M23 21v-2a4 4 0 00-3-3.87"/><path d="M16 3.13a4 4 0 010 7.75"/>
//       </svg>
//     ),
//   },
//   {
//     id: 'chat',
//     label: 'Chat',
//     path: '/Home/chat',
//     icon: (
//       <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
//         <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z"/>
//       </svg>
//     ),
//   },
//   {
//     id: 'settings',
//     label: 'Settings',
//     path: '/Home/setting',
//     icon: (
//       <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
//         <circle cx="12" cy="12" r="3"/>
//         <path d="M19.07 4.93l-1.41 1.41M4.93 4.93l1.41 1.41M12 2v2M12 20v2M20 12h2M2 12h2M19.07 19.07l-1.41-1.41M4.93 19.07l1.41-1.41"/>
//       </svg>
//     ),
//   },
// ];

function Sidebar() {

  let  { Employes }  =  useSelector((store) => store.Auth)

  console.log( Employes)
   let navigations =  Employes.role === "admin" ? AdminNavigation : employeeNavigation

  return (
    <aside className="flex flex-col h-full bg-[var(--color-surface-container-low)] border-r border-[var(--color-outline-variant)] w-[190px] z-10 overflow-hidden shrink-0">

      {/* Brand */}
      <div className="flex items-center gap-2.5 px-4 h-[60px] border-b border-[var(--color-outline-variant)] shrink-0">
        <div className="w-9 h-9 rounded-[10px] bg-[var(--color-primary-container)] flex items-center justify-center text-[var(--color-on-primary-container)] shrink-0 shadow-[var(--shadow-level2)]">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
            <path d="M12 2L2 7l10 5 10-5-10-5z" fill="currentColor" opacity="0.9"/>
            <path d="M2 17l10 5 10-5" stroke="currentColor" strokeWidth="2" fill="none"/>
            <path d="M2 12l10 5 10-5" stroke="currentColor" strokeWidth="2" fill="none"/>
          </svg>
        </div>
        <div className="flex flex-col">
          <span className="text-sm font-bold text-[var(--color-on-surface)] tracking-tight leading-tight">TeamSync</span>
          <span className="text-[10px] text-[var(--color-on-surface-variant)] font-normal leading-none mt-0.5">Enterprise Workspace</span>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 flex flex-col gap-0.5 px-2.5 py-4 overflow-y-auto">
        {navigations.map((item) => (
          <NavLink
            key={item.id}
            to={item.path}
            end={item.path === '/home'}
            className={({ isActive }) =>
              `flex items-center gap-2.5 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 relative no-underline ${
                isActive
                  ? 'bg-[color-mix(in_srgb,var(--color-primary)_15%,transparent)] text-[var(--color-primary)]'
                  : 'text-[var(--color-on-surface-variant)] hover:bg-[var(--color-surface-container)] hover:text-[var(--color-on-surface)]'
              }`
            }
          >
            {({ isActive }) => (
              <>
                {/* Active indicator bar */}
                {isActive && (
                  <span className="absolute left-0 top-1/2 -translate-y-1/2 w-[3px] h-[60%] bg-[var(--color-primary)] rounded-r-[3px]" />
                )}
                <span className="flex items-center shrink-0">{item.icon}</span>
                <span>{item.label}</span>
              </>
            )}
          </NavLink>
        ))}
      </nav>

      {/* Footer — New Task Button */}
      <div className="px-2.5 pt-3 pb-5 border-t border-[var(--color-outline-variant)]">
        <button
          id="sidebar-new-task-btn"
          className="w-full flex items-center justify-center gap-2 py-2.5 px-4
            bg-[color-mix(in_srgb,var(--color-primary)_15%,transparent)]
            text-[var(--color-primary)]
            border border-[color-mix(in_srgb,var(--color-primary)_30%,transparent)]
            rounded-[10px] text-[13px] font-semibold cursor-pointer
            transition-all duration-200 font-[inherit]
            hover:bg-[color-mix(in_srgb,var(--color-primary)_25%,transparent)]
            hover:shadow-[var(--shadow-level2)]"
        >
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/>
          </svg>
          New Task
        </button>
      </div>
    </aside>
  );
}

export default Sidebar;
