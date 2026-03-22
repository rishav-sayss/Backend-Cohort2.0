import React, { useState } from 'react';

export const Input = ({
  placeholder = '',
  value,
  onChange,
  onFocus,
  onBlur,
  className = '',
  icon = null,
  ...props
}) => {
  const [focused, setFocused] = useState(false);

  const handleFocus = (e) => {
    setFocused(true);
    onFocus?.(e);
  };

  const handleBlur = (e) => {
    setFocused(false);
    onBlur?.(e);
  };

  return (
    <div className="relative w-full">
      <input
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        onFocus={handleFocus}
        onBlur={handleBlur}
        className={`
          w-full px-4 py-3 pl-4 pr-4
          bg-gray-900 border border-gray-800
          text-white placeholder-gray-500
          rounded-full
          transition-all duration-300
          focus:outline-none focus:border-gray-600 focus:ring-1 focus:ring-gray-600
          ${focused ? 'border-gray-600 bg-gray-800/50' : ''}
          ${className}
        `}
        {...props}
      />
      {icon && (
        <div className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400">
          {icon}
        </div>
      )}
    </div>
  );
};
