import type { Threat } from '../../types';

interface ContentData {
  forms: number;
  scripts: number;
  links: number;
  inputs: number;
  iframes: number;
  externalScripts: number;
  inlineScripts: number;
}

export function analyzeContent(data: ContentData): Threat[] {
  const threats: Threat[] = [];

  // Enhanced Form Analysis
  if (data.forms > 0) {
    threats.push({
      type: 'Form Security',
      severity: 'high',
      description: 'Forms detected - potential for data exposure',
      location: 'Forms',
      recommendation: 'Implement HTTPS, CSRF protection, and input validation'
    });
  }

  // Script Analysis
  if (data.inlineScripts > 0) {
    threats.push({
      type: 'Inline Scripts',
      severity: 'medium',
      description: 'Inline scripts detected - potential XSS risk',
      location: 'Scripts',
      recommendation: 'Move inline scripts to external files and implement CSP'
    });
  }

  if (data.externalScripts > 5) {
    threats.push({
      type: 'External Dependencies',
      severity: 'medium',
      description: 'High number of external scripts - increased attack surface',
      location: 'Scripts',
      recommendation: 'Audit external dependencies and consider consolidation'
    });
  }

  // IFrame Analysis
  if (data.iframes > 0) {
    threats.push({
      type: 'IFrame Usage',
      severity: 'medium',
      description: 'IFrames detected - potential for clickjacking',
      location: 'Content',
      recommendation: 'Implement X-Frame-Options and frame-ancestors CSP directive'
    });
  }

  return threats;
}