import type { ScrapeResult, AnalysisResult } from '../../types';

export function generateDetailedReport(result: ScrapeResult): AnalysisResult {
  const { threats } = result;
  
  const summary = {
    totalThreats: threats.length,
    criticalThreats: threats.filter(t => t.severity === 'critical').length,
    highThreats: threats.filter(t => t.severity === 'high').length,
    mediumThreats: threats.filter(t => t.severity === 'medium').length,
    lowThreats: threats.filter(t => t.severity === 'low').length
  };

  return {
    threats: threats.sort((a, b) => {
      const severityOrder = { critical: 0, high: 1, medium: 2, low: 3 };
      return severityOrder[a.severity] - severityOrder[b.severity];
    }),
    summary
  };
}