import React from 'react';
import { useTypewriter } from '../hooks';

export const HeroSection = () => {
  const heading = useTypewriter('Ask Anything.', 50);
  const subheading = useTypewriter('Get Instant Answers.', 50);

  return (
    <section className="min-h-screen flex flex-col items-center justify-center px-4 pt-20">
      <div className="w-full max-w-3xl text-center space-y-8">
        {/* Heading */}
        <div className="space-y-4">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight min-h-[1.2em]">
            {heading}
            <span className="animate-pulse">|</span>
            <br />
            <span className="bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
              {subheading}
              {subheading.length === 'Get Instant Answers.'.length ? '' : <span className="animate-pulse">|</span>}
            </span>
          </h1>
          <p className="text-gray-400 text-lg sm:text-xl max-w-2xl mx-auto">
            Powered by advanced AI, get accurate and instant answers to any question with sources included.
          </p>
        </div>
      </div>
    </section>
  );
};
