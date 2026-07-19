import React from "react";
// import "./Employee.css";

/**
 * EmployeeTableSkeleton — loading skeleton for the employee table
 */
function EmployeeTableSkeleton({ rows = 5 }) {
  return (
    <div className="emp-skeleton-wrapper">
      {Array.from({ length: rows }).map((_, i) => (
        <div key={i} className="emp-skeleton-row">
          <div className="emp-skeleton-avatar" />
          <div className="emp-skeleton-lines">
            <div className="emp-skeleton-line emp-skeleton-line--name" />
            <div className="emp-skeleton-line emp-skeleton-line--email" />
          </div>
          <div className="emp-skeleton-pill" />
          <div className="emp-skeleton-pill emp-skeleton-pill--wide" />
          <div className="emp-skeleton-pill" />
          <div className="emp-skeleton-line emp-skeleton-line--date" />
        </div>
      ))}
    </div>
  );
}

export default EmployeeTableSkeleton;
