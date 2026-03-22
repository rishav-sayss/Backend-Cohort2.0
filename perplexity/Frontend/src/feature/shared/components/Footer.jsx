import React from 'react';

export const Footer = () => {
  const currentYear = new Date().getFullYear();

  const footerLinks = [
    { title: 'Product', links: ['Features', 'Pricing', 'Security', 'Enterprise'] },
    { title: 'Company', links: ['About', 'Blog', 'Careers', 'Press'] },
    { title: 'Resources', links: ['Documentation', 'API', 'Community', 'Support'] },
    { title: 'Legal', links: ['Privacy', 'Terms', 'Cookie Policy', 'Compliance'] },
  ];

  const socialLinks = [
    { icon: '𝕏', label: 'Twitter' },
    { icon: 'f', label: 'Facebook' },
    { icon: 'in', label: 'LinkedIn' },
    { icon: 'gh', label: 'GitHub' },
  ];

  return (
    <footer className="border-t border-gray-800 bg-gray-950 py-12 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Main Footer Content */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8 mb-8">
          {/* Logo Section */}
          <div className="col-span-2 md:col-span-1">
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-blue-500 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">AI</span>
              </div>
              <span className="text-white font-bold">Perplexity</span>
            </div>
            <p className="text-gray-400 text-sm">
              AI-powered search for instant answers
            </p>
          </div>

          {/* Links Sections */}
          {footerLinks.map((section) => (
            <div key={section.title}>
              <h4 className="text-white font-semibold mb-4 text-sm">
                {section.title}
              </h4>
              <ul className="space-y-3">
                {section.links.map((link) => (
                  <li key={link}>
                    <a
                      href="#"
                      className="text-gray-400 hover:text-white transition duration-300 text-sm"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Section */}
        <div className="border-t border-gray-800 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            {/* Copyright */}
            <p className="text-gray-400 text-sm text-center md:text-left">
              © {currentYear} Perplexity AI. All rights reserved.
            </p>

            {/* Social Links */}
            <div className="flex gap-6">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href="#"
                  title={social.label}
                  className="w-10 h-10 bg-gray-800 hover:bg-gray-700 rounded-full flex items-center justify-center text-gray-400 hover:text-white transition duration-300"
                >
                  <span className="text-sm font-semibold">{social.icon}</span>
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
