import React, { useState, useRef, useEffect } from "react";
import "./Employee.css";

/**
 * ActionsMenu — three-dot dropdown for row actions
 * Props:
 *   employee : object — the employee row data
 *   onView   : fn(employee)
 *   onEdit   : fn(employee)
 *   onDeactivate : fn(employee)
 */
function ActionsMenu({ employee, onView, onEdit, onDeactivate }) {
  // console.log(employee)
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    function handleClick(e) {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  return (
    <div className="emp-actions-menu" ref={ref}>
      <button
        className="emp-actions-trigger"
        onClick={() => setOpen((v) => !v)}
        aria-label="Open actions"
      >
        <span />
        <span />
        <span />
      </button>

      {open && (
        <div className="emp-actions-dropdown">
          <button
            className="emp-actions-item"
            onClick={() => { onView?.(employee); setOpen(false); }}
          >
            <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" /><circle cx="12" cy="12" r="3" />
            </svg>
            View Profile
          </button>
          <button
            className="emp-actions-item"
            onClick={() => { onEdit?.(employee); setOpen(false); }}
          >
            <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
              <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
            </svg>
            Edit Details
          </button>
          <div className="emp-actions-divider" />
        {
          employee.status === "active" ? (
                      <button
            className="emp-actions-item emp-actions-item--danger"
            onClick={() => { onDeactivate?.(employee); setOpen(false); }}
          >
            <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <circle cx="12" cy="12" r="10" /><line x1="4.93" y1="4.93" x2="19.07" y2="19.07" />
            </svg>
            InActive
          </button>
          )
           :(
                      <button
            className="emp-actions-item emp-actions-item--danger"
            onClick={() => { onDeactivate?.(employee); setOpen(false); }}
          >
            <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <circle cx="12" cy="12" r="10" /><line x1="4.93" y1="4.93" x2="19.07" y2="19.07" />
            </svg>
            Activate
          </button>
           )
        }
        </div>
      )}
    </div>
  );
}

export default ActionsMenu;
