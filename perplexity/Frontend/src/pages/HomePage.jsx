import React from 'react';
import {
  Navbar,
  HeroSection,
  Features,
  ProductShowcase,
  Consensus,
  CTASection,
  Footer,
} from '../feature/shared/components';

const HomePage = () => {
  return (
    <div className="bg-black text-white min-h-screen overflow-x-hidden">
      {/* Navigation */}
      <Navbar />

      {/* Main Content */}
      <main>
        {/* Hero Section */}
        <HeroSection />

        {/* Features Section */}
        <Features />

        {/* Product Showcase */}
        <ProductShowcase />

        {/* Consensus Section */}
        <Consensus />

        {/* CTA Section */}
        <CTASection />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default HomePage;
