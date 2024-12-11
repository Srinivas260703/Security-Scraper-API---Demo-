import React from 'react';
import { AlertCircle } from 'lucide-react';
import type { Threat } from '../types';

interface ThreatCardProps {
  threat: Threat;
}

export const ThreatCard: React.FC<ThreatCardProps> = ({ threat }) => {
  const severityColors = {
    low: 'bg-yellow-100 text-yellow-800',
    medium: 'bg-orange-100 text-orange-800',
    high: 'bg-red-100 text-red-800',
    critical: 'bg-red-200 text-red-900'
  };

  return (
    <div className="p-4 rounded-lg border border-gray-200 shadow-sm">
      <div className="flex items-center justify-between mb-2">
        <span className={`px-2 py-1 rounded-full text-sm ${severityColors[threat.severity]}`}>
          {threat.severity.toUpperCase()}
        </span>
        <AlertCircle className="w-5 h-5 text-gray-500" />
      </div>
      <h3 className="font-semibold mb-1">{threat.type}</h3>
      <p className="text-sm text-gray-600">{threat.description}</p>
      <p className="text-xs text-gray-500 mt-2">Location: {threat.location}</p>
    </div>
  );
};