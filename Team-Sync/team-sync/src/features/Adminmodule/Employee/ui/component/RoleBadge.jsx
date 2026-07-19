import React from "react";
import "./Employee.css";

/**
 * RoleBadge — color-coded role pill
 * Props:
 *   role : string — e.g. "employee", "admin", "manager"
 */
const ROLE_COLORS = {
  admin: "violet",
  manager: "blue",
  employee: "teal",
  hr: "pink",
  lead: "orange",
};

function RoleBadge({ role = "employee" }) {
  const color = ROLE_COLORS[role.toLowerCase()] ?? "teal";
  return (
    <span className={`emp-role-badge emp-role-badge--${color}`}>
      {role.charAt(0).toUpperCase() + role.slice(1)}
    </span>
  );
}

export default RoleBadge;
