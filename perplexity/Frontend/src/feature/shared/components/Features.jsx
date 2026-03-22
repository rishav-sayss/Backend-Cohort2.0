import React from 'react';
import { Card } from '../ui';

export const Features = () => {
  const features = [
    {
      title: 'Real-Time Answers',
      description: 'Get instant responses to your questions with up-to-date information.',
      icon: '⚡',
    },
    {
      title: 'AI-Powered Search',
      description: 'Advanced algorithms understand context and deliver relevant results.',
      icon: '🤖',
    },
    {
      title: 'Sources Included',
      description: 'Every answer comes with verified sources for transparency.',
      icon: '📚',
    },
    {
      title: 'Fast & Reliable',
      description: 'Lightning-fast responses without compromising on accuracy.',
      icon: '🚀',
    },
  ];

  return (
    <section id="features" className="py-20 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            Why Choose Our AI?
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Experience the power of advanced AI technology designed for you
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <Card key={index} hover>
              <div className="space-y-4">
                <div className="text-4xl">{feature.icon}</div>
                <h3 className="text-xl font-semibold text-white">
                  {feature.title}
                </h3>
                <p className="text-gray-400">
                  {feature.description}
                </p>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};
