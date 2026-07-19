import React from "react";

export function InputField({ label, required, ...props }) {
  return (
    <div className="flex flex-col gap-2 w-full">
      <label className="text-[14px] font-semibold text-(--color-on-surface)">
        {label} {required && <span className="text-(--color-error)">*</span>}
      </label>
      {props.type === "textarea" ? (
        <textarea
          {...props}
          className="w-full px-3.5 py-3 rounded-(--radius-md) border border-(--color-outline-variant) bg-(--color-surface-container-lowest) text-(--color-on-surface) font-base text-[14px] transition-all duration-200 outline-none resize-y min-h-[80px] placeholder:text-(--color-on-surface-variant) placeholder:opacity-60 focus:border-(--color-primary) focus:ring-[3px] focus:ring-[rgba(70,72,212,0.12)] focus:bg-(--color-surface-container-low)"
        />
      ) : (
        <input
          {...props}
          required={required}
          className={`w-full px-3.5 py-3 rounded-(--radius-md) border border-(--color-outline-variant) bg-(--color-surface-container-lowest) text-(--color-on-surface) font-base text-[14px] transition-all duration-200 outline-none placeholder:text-(--color-on-surface-variant) placeholder:opacity-60 focus:border-(--color-primary) focus:ring-[3px] focus:ring-[rgba(70,72,212,0.12)] focus:bg-(--color-surface-container-low) ${
            props.type === "date"
              ? "[&::-webkit-calendar-picker-indicator]:cursor-pointer [&::-webkit-calendar-picker-indicator]:opacity-60 hover:[&::-webkit-calendar-picker-indicator]:opacity-100"
              : ""
          }`}
        />
      )}
    </div>
  );
}
