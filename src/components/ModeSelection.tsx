import React from 'react';
import { Terminal, Layout } from 'lucide-react';
import type { Mode } from '../types';

interface ModeSelectionProps {
  onModeSelect: (mode: Mode) => void;
}

export const ModeSelection: React.FC<ModeSelectionProps> = ({ onModeSelect }) => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-4xl w-full mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-8">Choose Analysis Mode</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <button
            onClick={() => onModeSelect('CLI')}
            className="p-8 bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow"
          >
            <Terminal className="w-12 h-12 text-blue-600 mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">CLI Mode</h3>
            <p className="text-gray-600">
              Access Kali Linux tools via command line for advanced security analysis
            </p>
          </button>

          <button
            onClick={() => onModeSelect('GUI')}
            className="p-8 bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow"
          >
            <Layout className="w-12 h-12 text-green-600 mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">GUI Mode</h3>
            <p className="text-gray-600">
              User-friendly interface for website security analysis and reporting
            </p>
          </button>
        </div>
      </div>
    </div>
  );
};