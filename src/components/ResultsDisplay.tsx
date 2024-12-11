import React from 'react';
import { Download, Shield } from 'lucide-react';
import { ThreatCard } from './ThreatCard';
import { exportToCSV, exportToJSON, downloadFile } from '../utils/export';
import type { ScrapeResult } from '../types';

interface ResultsDisplayProps {
  result: ScrapeResult;
}

export const ResultsDisplay: React.FC<ResultsDisplayProps> = ({ result }) => {
  const handleDownload = (format: 'json' | 'csv') => {
    const data = format === 'json' 
      ? exportToJSON(result)
      : exportToCSV(result);
    
    const type = format === 'json' ? 'application/json' : 'text/csv';
    downloadFile(data, `security-analysis.${format}`, type);
  };

  return (
    <div className="w-full max-w-4xl mx-auto bg-white rounded-lg shadow-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold flex items-center space-x-2">
          <Shield className="w-6 h-6 text-blue-600" />
          <span>Analysis Results</span>
        </h2>
        <div className="flex space-x-3">
          <button
            onClick={() => handleDownload('json')}
            className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
          >
            <Download className="w-4 h-4" />
            <span>Download JSON</span>
          </button>
          <button
            onClick={() => handleDownload('csv')}
            className="flex items-center space-x-2 px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700 transition-colors"
          >
            <Download className="w-4 h-4" />
            <span>Download CSV</span>
          </button>
        </div>
      </div>

      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {result.threats.map((threat, index) => (
            <ThreatCard key={index} threat={threat} />
          ))}
        </div>
      </div>
    </div>
  );
};