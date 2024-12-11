import type { Threat } from '../../types';

export function analyzeSecurityHeaders(headers: Record<string, string>): Threat[] {
  const threats: Threat[] = [];

  // Enhanced Security Headers Analysis
  const requiredHeaders = {
    'x-frame-options': {
      severity: 'medium',
      description: 'Protection against clickjacking attacks',
    },
    'content-security-policy': {
      severity: 'high',
      description: 'Controls resources the browser is allowed to load',
    },
    'strict-transport-security': {
      severity: 'high',
      description: 'Enforces HTTPS connections',
    },
    'x-content-type-options': {
      severity: 'medium',
      description: 'Prevents MIME-type sniffing',
    },
    'x-xss-protection': {
      severity: 'high',
      description: 'Enables browser XSS filtering',
    },
    'referrer-policy': {
      severity: 'medium',
      description: 'Controls how much referrer information should be included',
    },
    'permissions-policy': {
      severity: 'medium',
      description: 'Controls browser features and APIs',
    }
  } as const;

  Object.entries(requiredHeaders).forEach(([header, info]) => {
    if (!headers[header]) {
      threats.push({
        type: `Missing ${header}`,
        severity: info.severity,
        description: `${info.description} header is not set`,
        location: 'HTTP Headers',
        recommendation: `Implement ${header} header with appropriate values`
      });
    }
  });

  return threats;
}