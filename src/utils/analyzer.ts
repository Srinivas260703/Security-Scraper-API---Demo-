import { analyzeSecurityHeaders } from './security/headers';
import { analyzeSSL } from './security/ssl';
import { analyzeContent } from './security/content';
import type { Threat } from '../types';

interface SecurityData {
  url: string;
  title: string;
  headers: Record<string, string>;
  forms: number;
  scripts: number;
  links: number;
  inputs: number;
  iframes: number;
  externalScripts: number;
  inlineScripts: number;
}

export async function analyzeWebsite(data: SecurityData): Promise<Threat[]> {
  const headerThreats = analyzeSecurityHeaders(data.headers);
  const sslThreats = analyzeSSL(data.url, data.headers);
  const contentThreats = analyzeContent({
    forms: data.forms,
    scripts: data.scripts,
    links: data.links,
    inputs: data.inputs,
    iframes: data.iframes,
    externalScripts: data.externalScripts,
    inlineScripts: data.inlineScripts
  });

  return [...headerThreats, ...sslThreats, ...contentThreats];
}