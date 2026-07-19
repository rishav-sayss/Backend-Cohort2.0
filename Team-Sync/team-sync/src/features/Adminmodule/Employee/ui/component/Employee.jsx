import React, { useState, useMemo } from "react";
import { useEmployee } from "../../state/useEmployee";
import StatCard from "./StatCard";
import EmployeeAvatar from "./EmployeeAvatar";
import StatusBadge from "./StatusBadge";
import RoleBadge from "./RoleBadge";
import ActionsMenu from "./ActionsMenu";
import EmployeeTableSkeleton from "./EmployeeTableSkeleton";
import "./Employee.css";
import {  useNavigate } from "react-router";
import { UpdateEmploye } from "../../api/employee.api";
import { useQueryClient } from "@tanstack/react-query";

/* ─── constants ─────────────────────────────────────────── */
const PAGE_SIZE = 8;

const ROLES = ["All Roles", "admin", "manager", "employee", "hr"];
const DEPARTMENTS = ["All Departments", "engineering", "design", "operations", "common", "security", "hr"];
const STATUSES = ["All Status", "active", "inactive", "pending"];

/* ─── helpers ───────────────────────────────────────────── */
function formatDate(iso) {
  if (!iso) return "—";
  return new Date(iso).toLocaleDateString("en-US", {
    month: "short",
    day: "2-digit",
    year: "numeric",
  });
}

/* ─── sub-components ────────────────────────────────────── */

/** Dropdown filter selector */
function FilterSelect({ label, options, value, onChange }) {
  return (
    <div className="emp-filter-select-wrap">
      <svg className="emp-filter-icon" width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
        <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3" />
      </svg>
      <select
        className="emp-filter-select"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        aria-label={label}
      >
        {options.map((o) => (
          <option key={o} value={o}>
            {o.charAt(0).toUpperCase() + o.slice(1)}
          </option>
        ))}
      </select>
      <svg className="emp-filter-chevron" width="12" height="12" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
        <polyline points="6 9 12 15 18 9" />
      </svg>
    </div>
  );
}

/** Pagination controls */
function Pagination({ page, totalPages, onChange }) {
  const pages = useMemo(() => {
    const arr = [];
    if (totalPages <= 6) {
      for (let i = 1; i <= totalPages; i++) arr.push(i);
    } else {
      arr.push(1);
      if (page > 3) arr.push("...");
      for (let i = Math.max(2, page - 1); i <= Math.min(totalPages - 1, page + 1); i++) arr.push(i);
      if (page < totalPages - 2) arr.push("...");
      arr.push(totalPages);
    }
    return arr;
  }, [page, totalPages]);

  return (
    <div className="emp-pagination">
      <button
        className="emp-page-btn"
        disabled={page === 1}
        onClick={() => onChange(page - 1)}
        aria-label="Previous page"
      >
        <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
          <polyline points="15 18 9 12 15 6" />
        </svg>
      </button>

      {pages.map((p, i) =>
        p === "..." ? (
          <span key={`ellipsis-${i}`} className="emp-page-ellipsis">…</span>
        ) : (
          <button
            key={p}
            className={`emp-page-btn ${page === p ? "emp-page-btn--active" : ""}`}
            onClick={() => onChange(p)}
          >
            {p}
          </button>
        )
      )}

      <button
        className="emp-page-btn"
        disabled={page === totalPages}
        onClick={() => onChange(page + 1)}
        aria-label="Next page"
      >
        <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
          <polyline points="9 18 15 12 9 6" />
        </svg>
      </button>
    </div>
  );
}

/* ─── main component ────────────────────────────────────── */
function Employee() {
  const { data, ispending } = useEmployee();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  // filter state
  const [roleFilter, setRoleFilter] = useState("All Roles");
  const [deptFilter, setDeptFilter] = useState("All Departments");
  const [statusFilter, setStatusFilter] = useState("All Status");
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);

  const employees = data?.employees ?? [];

  // derived stats
  const totalEmployees = data?.totalEmployees ?? employees.length;
  const activeEmployees = employees.filter((e) => e.status === "active").length;

  // filtering
  const filtered = useMemo(() => {
    return employees.filter((emp) => {
      const matchRole = roleFilter === "All Roles" || emp.role === roleFilter;
      const matchDept = deptFilter === "All Departments" || emp.department === deptFilter;
      const matchStatus = statusFilter === "All Status" || emp.status === statusFilter;
      const matchSearch =
        !search ||
        emp.name?.toLowerCase().includes(search.toLowerCase()) ||
        emp.email?.toLowerCase().includes(search.toLowerCase());
      return matchRole && matchDept && matchStatus && matchSearch;
    });
  }, [employees, roleFilter, deptFilter, statusFilter, search]);

  // pagination
  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const paginated = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  const clearFilters = () => {
    setRoleFilter("All Roles");
    setDeptFilter("All Departments");
    setStatusFilter("All Status");
    setSearch("");
    setPage(1);
  };

  const handleFilterChange = (setter) => (val) => {
    setter(val);
    setPage(1);
  };

  return (
    <div className="emp-root">
      {/* ── Page header ─────────────────────────────── */}
      <div className="emp-header">
        <div className="emp-header-left">
          <h1 className="emp-title">Employee Directory</h1>
          <p className="emp-subtitle">
            Manage your organization's workforce and roles.
          </p>
        </div>
        <div className="emp-header-actions">
          <button className="emp-btn emp-btn--outline" id="export-btn">
            <svg width="15" height="15" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
              <polyline points="17 8 12 3 7 8" />
              <line x1="12" y1="3" x2="12" y2="15" />
            </svg>
            Export
          </button>
          <button onClick={()=>{ navigate("/home/add-employee")}} className="emp-btn emp-btn--primary" id="add-employee-btn">
            <svg width="15" height="15" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
              <line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" />
            </svg>
            Add Employee
          </button>
        </div>
      </div>

      {/* ── Stat cards ──────────────────────────────── */}
      <div className="emp-stats-grid">
        <StatCard
          label="Total Employees"
          value={ispending ? "—" : totalEmployees}
          badge="+12%"
          badgeType="success"
        />
        <StatCard
          label="Active Now"
          value={ispending ? "—" : activeEmployees}
          dot={!ispending}
        />
        <StatCard
          label="Departments"
          value={ispending ? "—" : new Set(employees.map((e) => e.department)).size}
          subLabel="across org"
        />
        <StatCard
          label="New Hires (MoM)"
          value={ispending ? "—" : employees.filter((e) => {
            const d = new Date(e.createdAt);
            const now = new Date();
            return d.getMonth() === now.getMonth() && d.getFullYear() === now.getFullYear();
          }).length}
          subLabel="This month"
        />
      </div>

      {/* ── Table panel ─────────────────────────────── */}
      <div className="emp-panel">
        {/* Toolbar: search + filters */}
        <div className="emp-toolbar">
          <div className="emp-search-wrap">
            <svg className="emp-search-icon" width="15" height="15" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
            <input
              id="employee-search"
              className="emp-search-input"
              type="text"
              placeholder="Search by name or email…"
              value={search}
              onChange={(e) => { setSearch(e.target.value); setPage(1); }}
            />
          </div>

          <div className="emp-filters">
            <FilterSelect
              label="Role"
              options={ROLES}
              value={roleFilter}
              onChange={handleFilterChange(setRoleFilter)}
            />
            <FilterSelect
              label="Department"
              options={DEPARTMENTS}
              value={deptFilter}
              onChange={handleFilterChange(setDeptFilter)}
            />
            <FilterSelect
              label="Status"
              options={STATUSES}
              value={statusFilter}
              onChange={handleFilterChange(setStatusFilter)}
            />
            <button className="emp-clear-btn" onClick={clearFilters} id="clear-filters-btn">
              Clear Filters
            </button>
          </div>
        </div>

        {/* Table */}
        <div className="emp-table-wrap">
          <table className="emp-table">
            <thead>
              <tr>
                <th className="emp-th">Employee</th>
                <th className="emp-th">Role</th>
                <th className="emp-th">Department</th>
                <th className="emp-th">Status</th>
                <th className="emp-th">Joined Date</th>
                <th className="emp-th emp-th--center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {ispending ? (
                <tr>
                  <td colSpan={6} style={{ padding: 0, border: "none" }}>
                    <EmployeeTableSkeleton rows={PAGE_SIZE} />
                  </td>
                </tr>
              ) : paginated.length === 0 ? (
                <tr>
                  <td colSpan={6}>
                    <div className="emp-empty-state">
                      <svg width="48" height="48" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.2" opacity="0.3">
                        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                        <circle cx="9" cy="7" r="4" />
                        <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
                        <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                      </svg>
                      <p className="emp-empty-title">No employees found</p>
                      <p className="emp-empty-sub">Try adjusting your search or filters</p>
                    </div>
                  </td>
                </tr>
              ) : (
                paginated.map((emp) => (
                  <tr key={emp._id} className="emp-tr">
                    <td className="emp-td">
                      <div className="emp-cell-employee">
                        <EmployeeAvatar name={emp.name} avatar={emp.avatar} />
                        <div className="emp-cell-info">
                          <span className="emp-cell-name">{emp.name}</span>
                          <span className="emp-cell-email">{emp.email}</span>
                        </div>
                      </div>
                    </td>
                    <td className="emp-td">
                      <RoleBadge role={emp.role} />
                    </td>
                    <td className="emp-td">
                      <span className="emp-cell-dept">{emp.department ?? "—"}</span>
                    </td>
                    <td className="emp-td">
                      <StatusBadge status={emp.status} />
                    </td>
                    <td className="emp-td">
                      <span className="emp-cell-date">{formatDate(emp.createdAt)}</span>
                    </td>
                    <td className="emp-td emp-td--center">
                      <ActionsMenu
                        
                        employee={emp}
                        onView={(e) => console.log("view", e)}
                        onEdit={(e) => console.log("edit", e)}
                        onDeactivate={ async (e) => {
                          const newStatus = e.status === "active" ? "inactive" : "active";
                          await UpdateEmploye(e?._id, { status: newStatus });
                          queryClient.invalidateQueries({ queryKey: ["employees"] });
                          alert(`Employee status updated to ${newStatus}`);
                        }}
                      />
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Footer: showing X to Y of Z + pagination */}
        {!ispending && filtered.length > 0 && (
          <div className="emp-footer">
            <p className="emp-footer-count">
              Showing <strong>{(page - 1) * PAGE_SIZE + 1}</strong> to{" "}
              <strong>{Math.min(page * PAGE_SIZE, filtered.length)}</strong> of{" "}
              <strong>{filtered.length}</strong> employees
            </p>
            <Pagination page={page} totalPages={totalPages} onChange={setPage} />
          </div>
        )}
      </div>
    </div>
  );
}

export default Employee;
