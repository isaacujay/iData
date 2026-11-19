// Booking Service Layer
// Isolates Calendly configuration so it can easily be swapped for Cal.com or another scheduling tool

import { siteConfig } from '../config/site.config';

export function getBookingUrl(): string {
  return siteConfig.calendlyUrl || '';
}

export function isBookingConfigured(): boolean {
  const url = getBookingUrl();
  return Boolean(url && url.trim().length > 0 && !url.includes('example.com'));
}

export function loadCalendlyScript(): Promise<void> {
  return new Promise((resolve) => {
    if (document.getElementById('calendly-script')) {
      resolve();
      return;
    }
    const script = document.createElement('script');
    script.id = 'calendly-script';
    script.src = 'https://assets.calendly.com/assets/external/widget.js';
    script.async = true;
    script.onload = () => resolve();
    document.body.appendChild(script);
  });
}
