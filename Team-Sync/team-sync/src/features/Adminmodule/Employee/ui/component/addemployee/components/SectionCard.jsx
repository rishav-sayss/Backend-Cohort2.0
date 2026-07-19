import React from "react";

export function SectionCard({ title, icon, children }) {
  return (
    <div className="bg-(--color-surface-container-lowest) border border-(--color-outline-variant) rounded-(--radius-lg) overflow-hidden shadow-[var(--shadow-level2)]">
      <div className="flex items-center gap-3 px-6 py-5 border-b border-(--color-outline-variant)">
        {icon}
        <h2 className="text-[20px] font-semibold m-0 text-(--color-on-surface)">
          {title}
        </h2>
      </div>
      <div className="p-6">{children}</div>
    </div>
  );
}
