import React from "react";

export function PhotoUpload() {
  return (
    <div className="flex flex-col items-center gap-3">
      <div className="relative w-[140px] h-[140px] border-2 border-dashed border-(--color-outline-variant) rounded-(--radius-md) bg-(--color-surface-container-low) flex flex-col items-center justify-center gap-2 text-(--color-on-surface-variant) cursor-pointer transition-all duration-200 hover:bg-(--color-surface-container) hover:border-(--color-primary) hover:text-(--color-primary)">
        <svg
          width="32"
          height="32"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
        >
          <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
          <circle cx="8.5" cy="8.5" r="1.5" />
          <polyline points="21 15 16 10 5 21" />
        </svg>
        <span className="text-[13px] font-medium">Upload Photo</span>

        <button
          type="button"
          className="absolute -bottom-1.5 -right-1.5 w-7 h-7 rounded-full bg-(--color-primary) text-(--color-on-primary) border-2 border-(--color-surface-container-lowest) flex items-center justify-center cursor-pointer transition-transform duration-200 hover:scale-110"
        >
          <svg
            width="12"
            height="12"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
          >
            <path d="M12 20h9" />
            <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z" />
          </svg>
        </button>
      </div>
      <p className="text-xs text-(--color-on-surface-variant) text-center m-0 font-medium">
        JPG or PNG. Max size of 800K.
      </p>
    </div>
  );
}
