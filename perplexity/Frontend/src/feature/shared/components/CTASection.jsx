import React from 'react';
import { Button } from '../ui';

export const CTASection = () => {
  return (
    <section className="py-20 px-4">
      <div className="max-w-4xl mx-auto text-center">
        <div className="space-y-6">
          {/* Background Gradient */}
          <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-blue-500/10 blur-3xl -z-10"></div>

          {/* Content */}
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white">
            Start Exploring AI Now
          </h2>

          <p className="text-gray-400 text-lg sm:text-xl max-w-2xl mx-auto">
            Join thousands of users discovering answers with our AI-powered search engine. No credit card required.
          </p>

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
            <Button size="lg" className="w-full sm:w-auto">
              Try for Free
            </Button>
            <Button variant="outline" size="lg" className="w-full sm:w-auto">
              Watch Demo
            </Button>
          </div>

          {/* Features List */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-8 border-t border-gray-800">
            {[
              { label: 'Unlimited Searches', icon: '∞' },
              { label: '24/7 Availability', icon: '🌍' },
              { label: 'Free Forever', icon: '✨' },
            ].map((item, index) => (
              <div key={index} className="space-y-2">
                <div className="text-2xl">{item.icon}</div>
                <p className="text-gray-300 text-sm">{item.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
