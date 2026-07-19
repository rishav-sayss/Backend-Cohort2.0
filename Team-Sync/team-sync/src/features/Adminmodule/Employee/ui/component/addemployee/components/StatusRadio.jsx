import React from "react";

export function StatusRadio({ value, onChange }) {
  return (
    <div className="flex flex-col gap-2">
      <label className="text-[14px] font-semibold text-(--color-on-surface)">
        Employment Status
      </label>
      <div className="flex items-center gap-6 h-[44px]">
        <label className="flex items-center gap-2.5 text-[14px] text-(--color-on-surface) cursor-pointer group">
          <input
            type="radio"
            name="status"
            value="active"
            checked={value === "active"}
            onChange={() => onChange("active")}
            className="hidden peer"
          />
          <span className="w-5 h-5 rounded-full border-2 border-(--color-outline-variant) bg-(--color-surface-container-lowest) relative transition-all duration-200 peer-checked:border-(--color-primary) after:content-[''] after:absolute after:top-1/2 after:left-1/2 after:-translate-x-1/2 after:-translate-y-1/2 after:w-2.5 after:h-2.5 after:rounded-full after:bg-(--color-primary) after:opacity-0 peer-checked:after:opacity-100"></span>
          Active
        </label>
        <label className="flex items-center gap-2.5 text-[14px] text-(--color-on-surface) cursor-pointer group">
          <input
            type="radio"
            name="status"
            value="inactive"
            checked={value === "inactive"}
            onChange={() => onChange("inactive")}
            className="hidden peer"
          />
          <span className="w-5 h-5 rounded-full border-2 border-(--color-outline-variant) bg-(--color-surface-container-lowest) relative transition-all duration-200 peer-checked:border-(--color-primary) after:content-[''] after:absolute after:top-1/2 after:left-1/2 after:-translate-x-1/2 after:-translate-y-1/2 after:w-2.5 after:h-2.5 after:rounded-full after:bg-(--color-primary) after:opacity-0 peer-checked:after:opacity-100"></span>
          Inactive
        </label>
      </div>
    </div>
  );
}
