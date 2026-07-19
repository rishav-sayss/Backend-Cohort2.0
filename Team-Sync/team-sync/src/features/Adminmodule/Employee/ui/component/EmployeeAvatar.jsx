import React from "react";
import "./Employee.css";

/**
 * EmployeeAvatar — shows employee initials avatar or image
 * Props:
 *   name    : string  — employee full name (used for initials)
 *   avatar  : string  — image URL (optional)
 *   size    : "sm" | "md" | "lg" (default "md")
 */
function EmployeeAvatar({ name = "", avatar, size = "md" }) {
  const initials = name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);

  // Generate a consistent hue from name
  const hue = name
    .split("")
    .reduce((acc, c) => acc + c.charCodeAt(0), 0) % 360;

  if (avatar) {
    return (
      <img
        src={avatar}
        alt={name}
        className={`emp-avatar emp-avatar--${size}`}
      />
    );
  }

  return (
    <div
      className={`emp-avatar emp-avatar--${size} emp-avatar--initials`}
      style={{ "--avatar-hue": hue }}
    >
      {initials}
    </div>
  );
}

export default EmployeeAvatar;
