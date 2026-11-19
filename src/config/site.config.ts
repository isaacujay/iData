// ==============================================================================
// IDATA SITE CONFIGURATION
// ==============================================================================
// This file centralizes all global branding, contact details, social links,
// theme colors, and feature flags. No settings should be hardcoded in components.

export const siteConfig = {
  // Brand identity
  brandName: 'IData',
  legalName: 'IData Technologies & Consulting Ltd',
  tagline: 'IData turns business data into decisions through AI, analytics and software, delivered by a trusted team.',
  shortDescription: 'Enterprise AI & agentic pipelines, executive dashboards, predictive data science, and high-performance software engineering.',
  
  // OWNER: Replace with your actual domain when ready
  siteUrl: import.meta.env.VITE_SITE_URL || 'https://idata.agency',

  // Contact details
  // OWNER: Replace with your primary operational email
  ownerEmail: 'issacujay@gmail.com',
  // OWNER: Replace with your support inbox
  supportEmail: 'support@idata.agency',
  // OWNER: Replace with your business phone or WhatsApp business link
  phone: '+234 812 000 0000',
  // OWNER: Replace or update office / operational location
  headquarters: 'Lagos, Nigeria & Remote Worldwide',

  // Social Links
  social: {
    // OWNER: Enter your LinkedIn company page or founder profile
    linkedin: 'https://linkedin.com/company/idata-systems',
    // OWNER: Enter your GitHub organization
    github: 'https://github.com/idata-org',
    // OWNER: Enter your X / Twitter handle link
    twitter: 'https://x.com/idata_systems',
    // OWNER: Enter your YouTube channel link if available
    youtube: 'https://youtube.com/@idata_systems',
  },

  // Booking & Calendar
  // OWNER: Paste your Calendly event type link here (e.g., https://calendly.com/your-name/30min)
  calendlyUrl: import.meta.env.VITE_CALENDLY_URL || 'https://calendly.com/idata-consulting/discovery-call',

  // Theme design tokens (Hex colors matching specs)
  colors: {
    bgBase: '#000000',
    bgDeep: '#040f16',
    bgSurface: '#000022',
    bgRaised: '#001242',
    accent: '#38BDF8', // Sky 400
    accent2: '#6366F1', // Indigo 500
    text: '#E6EDF5',
    textMuted: '#8FA3B8',
  },

  // Feature Flags
  features: {
    enablePortal: true,             // Enables the /portal client area
    enableReviewsSubmission: true,  // Enables public review submission form
    enableExtendedNetwork: true,    // Shows vetted freelancers on /team
    enableAnalytics: false,         // Default off for privacy
    enableCloudflareTurnstile: false, // Turnstile anti-spam
  },

  // Proof Counters (Shown on home page & about page)
  stats: {
    projectsDelivered: 45,
    clientSatisfactionRate: 99.2,
    hoursAutomatedAnnually: 18000,
    averageRating: 4.95,
  }
};
