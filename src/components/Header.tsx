import React from 'react';
import { Shield } from 'lucide-react';

export const Header = () => {
  return (
    <header className="bg-gradient-to-r from-blue-600 to-blue-800 text-white p-6 shadow-lg">
      <div className="container mx-auto flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <Shield className="w-8 h-8" />
          <h1 className="text-2xl font-bold">SecureScraper</h1>
        </div>
        <nav className="flex space-x-6">
          <a href="#features" className="hover:text-blue-200 transition-colors">Features</a>
          <a href="#documentation" className="hover:text-blue-200 transition-colors">Documentation</a>
          <a href="#about" className="hover:text-blue-200 transition-colors">About</a>
        </nav>
      </div>
    </header>
  );
};