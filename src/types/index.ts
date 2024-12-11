export interface ScrapeResult {
  url: string;
  data: any[];
  threats: Threat[];
  timestamp: string;
}

export interface Threat {
  type: string;
  severity: 'low' | 'medium' | 'high' | 'critical';
  description: string;
  location: string;
  recommendation?: string;
}

export interface AnalysisResult {
  threats: Threat[];
  summary: {
    totalThreats: number;
    criticalThreats: number;
    highThreats: number;
    mediumThreats: number;
    lowThreats: number;
  };
}

export interface User {
  username: string;
  isAuthenticated: boolean;
}

export type Mode = 'CLI' | 'GUI';