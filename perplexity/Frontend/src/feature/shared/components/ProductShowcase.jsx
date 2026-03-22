import React from 'react';
import { Card } from '../ui';

export const ProductShowcase = () => {
  return (
    <section className="py-20 px-4 bg-gradient-to-b from-transparent via-purple-500/5 to-transparent">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            See It In Action
          </h2>
          <p className="text-gray-400 text-lg">
            Experience our powerful AI response interface
          </p>
        </div>

        {/* Showcase Card */}
        <Card className="p-8">
          <div className="space-y-6">
            {/* Sample Chat Message */}
            <div className="space-y-4">
              <div className="flex justify-end">
                <div className="bg-purple-600 text-white rounded-2xl px-4 py-3 max-w-xs">
                  What are the benefits of AI?
                </div>
              </div>

              {/* AI Response */}
              <div className="space-y-4">
                <div className="bg-gray-800/50 border border-gray-700 rounded-2xl px-4 py-4">
                  <p className="text-gray-200 leading-relaxed">
                    AI offers numerous benefits across various domains. Key advantages include increased efficiency, better decision-making through data analysis, and automation of repetitive tasks. AI also enables personalization at scale and helps discover patterns humans might miss.
                  </p>
                </div>

                {/* Sources */}
                <div className="space-y-2">
                  <p className="text-sm text-gray-400 font-semibold">Sources:</p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    {[
                      'Stanford AI Research Center',
                      'MIT Technology Review',
                      'Harvard Business Review',
                      'Forbes - AI Impact',
                    ].map((source, index) => (
                      <a
                        key={index}
                        href="#"
                        className="text-sm text-blue-400 hover:text-blue-300 truncate transition duration-300"
                      >
                        • {source}
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Card>

        {/* Features Below Showcase */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
          {[
            { title: 'Smart Citations', desc: 'Automatic source attribution' },
            { title: 'Follow-ups', desc: 'Ask follow-up questions seamlessly' },
            { title: 'Multiple Sources', desc: 'Aggregated answers from various sources' },
          ].map((item, index) => (
            <div key={index} className="text-center">
              <h3 className="text-lg font-semibold text-white mb-2">
                {item.title}
              </h3>
              <p className="text-gray-400 text-sm">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
