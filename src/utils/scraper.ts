import axios from 'axios';
import * as cheerio from 'cheerio';
import { analyzeWebsite } from './analyzer';
import type { ScrapeResult } from '../types';

export async function scrapeWebsite(url: string): Promise<ScrapeResult> {
  try {
    const response = await axios.get(url);
    const $ = cheerio.load(response.data);
    
    const data = {
      url,
      title: $('title').text(),
      headers: response.headers,
      forms: $('form').length,
      scripts: $('script').length,
      links: $('a').length,
      inputs: $('input').length,
      iframes: $('iframe').length,
      externalScripts: $('script[src]').length,
      inlineScripts: $('script:not([src])').length
    };

    const threats = await analyzeWebsite(data);

    return {
      url,
      data: [data],
      threats,
      timestamp: new Date().toISOString()
    };
  } catch (error) {
    throw new Error(`Failed to scrape website: ${error.message}`);
  }
}