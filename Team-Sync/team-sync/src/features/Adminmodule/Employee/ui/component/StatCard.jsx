import React from "react";
import "./Employee.css";

/**
 * StatCard — reusable summary card for the Employee Directory header stats
 * Props:
 *   label   : string  — e.g. "Total Employees"
 *   value   : string | number
 *   badge   : string  — e.g. "+12%"  (optional)
 *   badgeType: "success" | "warning" | "error" | "info" (optional)
 *   subLabel: string  — e.g. "Target: 50"  (optional)
 *   dot     : boolean — show animated live dot (optional)
 */
function StatCard({ label, value, badge, badgeType = "success", subLabel, dot }) {
  return (
    <div className="emp-stat-card">
      <p className="emp-stat-label">{label}</p>
      <div className="emp-stat-value-row">
        <span className="emp-stat-value">{value}</span>
        {dot && <span className="emp-stat-live-dot" />}
        {badge && (
          <span className={`emp-stat-badge emp-stat-badge--${badgeType}`}>
            {badge}
          </span>
        )}
        {subLabel && (
          <span className="emp-stat-sublabel">{subLabel}</span>
        )}
      </div>
    </div>
  );
}

export default StatCard;
