import Papa from 'papaparse';
import type { ScrapeResult, Threat } from '../types';

export function exportToCSV(result: ScrapeResult): string {
  const threats = result.threats.map(threat => ({
    URL: result.url,
    Type: threat.type,
    Severity: threat.severity,
    Description: threat.description,
    Location: threat.location,
    Timestamp: result.timestamp
  }));

  return Papa.unparse(threats);
}

export function exportToJSON(result: ScrapeResult): string {
  return JSON.stringify(result, null, 2);
}

export function downloadFile(data: string, filename: string, type: string): void {
  const blob = new Blob([data], { type });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}