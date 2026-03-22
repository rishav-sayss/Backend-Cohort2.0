import React from 'react';

export const Card = ({
  children,
  className = '',
  hover = true,
  ...props
}) => {
  return (
    <div
      className={`
        bg-gray-900 border border-gray-800 rounded-xl p-6
        ${hover ? 'hover:border-gray-700 hover:bg-gray-800/50 transition-all duration-300' : ''}
        ${className}
      `}
      {...props}
    >
      {children}
    </div>
  );
};
