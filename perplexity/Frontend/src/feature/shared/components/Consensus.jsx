import React from 'react';
import { Card } from '../ui';

export const Consensus = () => {
  const opinions = [
    {
      ai: 'Claude',
      answer: 'AI is revolutionary technology that will transform how we work and learn.',
    },
    {
      ai: 'GPT-4',
      answer: 'Large language models represent significant progress in natural language processing.',
    },
    {
      ai: 'Gemini',
      answer: 'AI has immense potential to solve complex problems across multiple domains.',
    },
  ];

  return (
    <section className="py-20 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            Multi-AI Consensus
          </h2>
          <p className="text-gray-400 text-lg">
            Get perspectives from multiple AI models to form a comprehensive view
          </p>
        </div>

        {/* Consensus Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {opinions.map((item, index) => (
            <Card key={index} hover>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold text-white">
                    {item.ai}
                  </h3>
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                </div>
                <p className="text-gray-300 leading-relaxed">
                  {item.answer}
                </p>
                <button className="text-blue-400 hover:text-blue-300 text-sm transition duration-300">
                  Learn more →
                </button>
              </div>
            </Card>
          ))}
        </div>

        {/* Summary Section */}
        <Card className="mt-12 bg-gradient-to-r from-purple-900/20 to-blue-900/20 border-purple-800">
          <div className="space-y-3">
            <h3 className="text-xl font-semibold text-white">
              ✓ Consensus Summary
            </h3>
            <p className="text-gray-300">
              All models agree on the transformative potential of AI technology. There is strong alignment on AI's ability to impact multiple domains positively.
            </p>
          </div>
        </Card>
      </div>
    </section>
  );
};
