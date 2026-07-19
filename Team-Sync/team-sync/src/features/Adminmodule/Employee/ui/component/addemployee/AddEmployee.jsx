import React, { useState } from "react";
import { useNavigate } from "react-router";
import { InputField } from "./components/InputField";
import { SelectField } from "./components/SelectField";
import { SectionCard } from "./components/SectionCard";
import { PhotoUpload } from "./components/PhotoUpload";
import { StatusRadio } from "./components/StatusRadio";
import { CreateEmployee } from "../../../api/employee.api";

function AddEmployee() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    bio: "",
    department: "",
    role: "",
    joiningDate: "",
    status: "active"
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleStatusChange = (status) => {
    setFormData((prev) => ({ ...prev, status }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log("Submitting employee:", formData);
      await CreateEmployee(formData);
      navigate("/home/employe");
    } catch (error) {
      console.error("Error creating employee:", error);
      alert("Error creating employee. Please check the console or ensure all fields are correct.");
    }
  };

  return (
    <div className="flex flex-col gap-(--spacing-lg) max-w-[1000px] mx-auto animate-[emp-fade-in_0.35s_ease] pb-10">
      {/* ── Breadcrumb & Header ───────────────────────── */}
      <div className="flex flex-col items-start">
        <div className="flex items-center gap-2 text-[12px] font-semibold mb-(--spacing-md) text-(--color-on-surface-variant)">
          <span
            className="cursor-pointer text-(--color-on-surface) hover:text-(--color-primary) transition-colors duration-200"
            onClick={() => navigate("/home/employe")}
          >
            Team
          </span>
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <polyline points="9 18 15 12 9 6" />
          </svg>
          <span className="text-(--color-on-surface)">Add New Employee</span>
        </div>

        <h1 className="text-[32px] font-bold tracking-[-0.02em] text-(--color-on-surface) m-0 mb-1">
          Add Employee
        </h1>
        <p className="text-[15px] text-(--color-on-surface-variant) m-0">
          Configure the new team member's workspace profile and permissions.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col gap-(--spacing-xl)">
        {/* ── Section 1: Personal Information ─────────── */}
        <SectionCard
          title="Personal Information"
          icon={
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--color-primary)" strokeWidth="2.5">
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
              <circle cx="12" cy="7" r="4" />
            </svg>
          }
        >
          <div className="grid grid-cols-1 md:grid-cols-[200px_1fr] gap-6 md:gap-8 items-start">
            <PhotoUpload />

            <div className="flex flex-col gap-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <InputField
                  label="Full Name"
                  name="name"
                  type="text"
                  placeholder="e.g. Sarah Jenkins"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
                <InputField
                  label="Email Address"
                  name="email"
                  type="email"
                  placeholder="sarah.j@synthetix.ai"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>

              <InputField
                label="Password"
                name="password"
                type="password"
                placeholder="Enter password"
                value={formData.password}
                onChange={handleChange}
                required
              />

              <InputField
                label="Bio / About"
                name="bio"
                type="textarea"
                placeholder="Tell us about the new team member..."
                value={formData.bio}
                onChange={handleChange}
              />
            </div>
          </div>
        </SectionCard>

        {/* ── Section 2: Employment Details ───────────── */}
        <SectionCard
          title="Employment Details"
          icon={
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--color-primary)" strokeWidth="2.5">
              <rect x="2" y="7" width="20" height="14" rx="2" ry="2" />
              <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
            </svg>
          }
        >
          <div className="flex flex-col gap-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <SelectField
                label="Department"
                name="department"
                value={formData.department}
                onChange={handleChange}
                required
                options={[
                  { value: "engineering", label: "Product Engineering" },
                  { value: "common", label: "Common / Shared Services" },
                  { value: "operations", label: "Global Logistics" },
                  { value: "security", label: "Information Security" },
                  { value: "hr", label: "Enterprise Growth" }
                ]}
              />
              <SelectField
                label="Role"
                name="role"
                value={formData.role}
                onChange={handleChange}
                required
                options={[
                  { value: "employee", label: "Employee" },
                  { value: "manager", label: "Manager" },
                  { value: "admin", label: "Admin" },
                  { value: "hr", label: "HR" }
                ]}
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <InputField
                label="Joining Date"
                name="joiningDate"
                type="date"
                value={formData.joiningDate}
                onChange={handleChange}
                required
              />
              <StatusRadio value={formData.status} onChange={handleStatusChange} />
            </div>
          </div>
        </SectionCard>

        {/* ── Footer Actions ──────────────────────────── */}
        <div className="flex items-center justify-end gap-4 mt-4">
          <button
            type="button"
            onClick={() => navigate("/home/employe")}
            className="inline-flex items-center justify-center gap-2 rounded-(--radius-default) font-(--font-family-base) text-[14px] font-semibold py-3 px-6 cursor-pointer transition-all duration-200 bg-(--color-surface-container-lowest) text-(--color-on-surface) border-[1.5px] border-(--color-outline-variant) hover:bg-(--color-surface-container-low) hover:border-(--color-outline)"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="inline-flex items-center justify-center gap-2 rounded-(--radius-default) font-(--font-family-base) text-[14px] font-semibold py-3 px-6 cursor-pointer transition-all duration-200 border-none bg-(--color-primary) text-(--color-on-primary) hover:brightness-110 hover:-translate-y-[1px] hover:shadow-[0_4px_16px_rgba(70,72,212,0.35)]"
          >
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
              <circle cx="8.5" cy="7" r="4" />
              <line x1="20" y1="8" x2="20" y2="14" />
              <line x1="17" y1="11" x2="23" y2="11" />
            </svg>
            Create Employee
          </button>
        </div>
      </form>
    </div>
  );
}

export default AddEmployee;
