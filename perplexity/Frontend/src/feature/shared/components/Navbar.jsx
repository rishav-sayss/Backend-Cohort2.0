import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../ui';

export const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();

  const handleLoginClick = () => {
    navigate('/login');
    console.log("login")
  };

  const handleRegisterClick = () => {
    navigate('/register');
    console.log("login")
  };

  return (
    <nav className="fixed top-0 w-full bg-black/50 backdrop-blur-md border-b border-gray-800 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-blue-500 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">AI</span>
            </div>
            <span className="text-white font-bold text-xl hidden sm:inline">Perplexity</span>
          </div>

          {/* Desktop Links */}
          <div className="hidden md:flex items-center space-x-8">
            <a href="#" className="text-gray-300 hover:text-white transition duration-300">
              Home
            </a>
            <a href="#features" className="text-gray-300 hover:text-white transition duration-300">
              Features
            </a>
            <a href="#" className="text-gray-300 hover:text-white transition duration-300">
              Pricing
            </a>
          </div>

          {/* Right Side Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            <Button variant="secondary" size="sm" onClick={handleLoginClick}>
              Login
            </Button>
            <Button variant="primary" size="sm" onClick={handleRegisterClick}>
              Sign Up
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-white"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden pb-4 space-y-3">
            <a
              href="#"
              className="block text-gray-300 hover:text-white transition duration-300 py-2"
            >
              Home
            </a>
            <a
              href="#features"
              className="block text-gray-300 hover:text-white transition duration-300 py-2"
            >
              Features
            </a>
            <a
              href="#"
              className="block text-gray-300 hover:text-white transition duration-300 py-2"
            >
              Pricing
            </a>
            <div className="space-y-2 pt-2">
              <Button variant="secondary" size="sm" className="w-full" onClick={handleLoginClick}>
                Login
              </Button>
              <Button variant="primary" size="sm" className="w-full" onClick={handleRegisterClick}>
                Sign Up
              </Button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};
