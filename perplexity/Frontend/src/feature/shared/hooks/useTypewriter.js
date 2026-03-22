import { useState, useEffect } from 'react';

/**
 * Custom hook for typewriter text animation
 * @param {string} text - The text to animate
 * @param {number} speed - Speed of typing in milliseconds
 * @returns {string} - The animated text
 */
export const useTypewriter = (text, speed = 50) => {
  const [displayText, setDisplayText] = useState('');

  useEffect(() => {
    let index = 0;
    const interval = setInterval(() => {
      if (index < text.length) {
        setDisplayText(text.substring(0, index + 1));
        index++;
      } else {
        clearInterval(interval);
      }
    }, speed);

    return () => clearInterval(interval);
  }, [text, speed]);

  return displayText;
};
