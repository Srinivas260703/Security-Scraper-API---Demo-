import type { Threat } from '../../types';

export function analyzeSSL(url: string, headers: Record<string, string>): Threat[] {
  const threats: Threat[] = [];

  // Check if using HTTPS
  if (!url.startsWith('https://')) {
    threats.push({
      type: 'Insecure Protocol',
      severity: 'critical',
      description: 'Website is not using HTTPS',
      location: 'Protocol',
      recommendation: 'Implement HTTPS with a valid SSL certificate'
    });
  }

  // Check SSL/TLS version from headers
  const securityProtocol = headers['strict-transport-security'];
  if (securityProtocol && !securityProtocol.includes('max-age=31536000')) {
    threats.push({
      type: 'Weak HSTS Configuration',
      severity: 'high',
      description: 'HSTS max-age is less than recommended one year',
      location: 'SSL/TLS',
      recommendation: 'Set HSTS max-age to at least 31536000 seconds (1 year)'
    });
  }

  return threats;
}