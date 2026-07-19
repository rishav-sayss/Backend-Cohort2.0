import React from "react";

export function SelectField({ label, required, options, ...props }) {
  return (
    <div className="flex flex-col gap-2 w-full">
      <label className="text-[14px] font-semibold text-(--color-on-surface)">
        {label} {required && <span className="text-(--color-error)">*</span>}
      </label>
      <div className="relative">
        <select
          {...props}
          required={required}
          className="w-full px-3.5 py-3 pr-10 rounded-(--radius-md) border border-(--color-outline-variant) bg-(--color-surface-container-lowest) text-(--color-on-surface) font-base text-[14px] transition-all duration-200 outline-none appearance-none cursor-pointer focus:border-(--color-primary) focus:ring-[3px] focus:ring-[rgba(70,72,212,0.12)] focus:bg-(--color-surface-container-low)"
        >
          <option value="" disabled>
            Select {label}
          </option>
          {options.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
        <svg
          className="absolute right-3.5 top-1/2 -translate-y-1/2 text-(--color-on-surface-variant) pointer-events-none"
          width="14"
          height="14"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
        >
          <polyline points="6 9 12 15 18 9" />
        </svg>
      </div>
    </div>
  );
}
