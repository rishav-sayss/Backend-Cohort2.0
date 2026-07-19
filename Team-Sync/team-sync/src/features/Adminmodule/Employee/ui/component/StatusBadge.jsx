import React from "react";
import "./Employee.css";

/**
 * StatusBadge — pill badge for employee status
 * Props:
 *   status : "active" | "inactive" | "pending" | string
 */
function StatusBadge({ status = "active" }) {
  const normalized = status.toLowerCase();
  return (
    <span className={`emp-status-badge emp-status-badge--${normalized}`}>
      <span className="emp-status-dot" />
      {status.charAt(0).toUpperCase() + status.slice(1)}
    </span>
  );
}

export default StatusBadge;
