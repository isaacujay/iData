// Content layer for IData Case Studies & Demos
// Typed getter functions

import { CaseStudy, ServiceSlug } from '../types';

export const caseStudiesData: CaseStudy[] = [
  {
    id: 'cs-1',
    slug: 'fintech-executive-analytics',
    title: 'Real-Time Liquidity & Risk Intelligence Platform',
    client: 'Apex Capital Partners',
    clientType: 'enterprise',
    serviceSlug: 'data-analytics-dashboards',
    resultHeadline: '14 hrs saved / week',
    summary: 'Automated 14 hours of weekly spreadsheet reconciliation into sub-second financial health and risk monitoring dashboards.',
    challenge: 'Apex Capital managed portfolios across 6 emerging markets with transaction data dispersed across disparate legacy banking feeds and manual CSV exports. Leadership lacked an aggregate view of exposure until 48 hours after close-of-business.',
    solution: 'IData designed an automated ELT pipeline in PostgreSQL and dbt with streaming webhooks, paired with a modern high-density executive dashboard displaying real-time currency exposure, margin ratios, and liquidity forecasts.',
    results: [
      { metric: '14 hrs', label: 'Manual reporting time eliminated weekly' },
      { metric: '< 2 sec', label: 'Data latency across 12 banking endpoints' },
      { metric: '100%', label: 'Audit compliance across multi-currency ledgers' }
    ],
    tools: ['PostgreSQL', 'dbt', 'Python', 'React', 'Tailwind CSS', 'Docker'],
    coverImage: '/brand/og-image.png',
    videoId: 'M7lc1UVf-VE', // Sample YouTube ID for click-to-load demo
    featured: true
  },
  {
    id: 'cs-2',
    slug: 'clinical-agentic-workflow',
    title: 'Autonomous Clinical Intake & Medical Triage Pipeline',
    client: 'Nordic Health Technologies',
    clientType: 'international',
    serviceSlug: 'ai-agentic-systems',
    resultHeadline: '82% Intake Automated',
    summary: 'Engineered a multi-agent reasoning architecture automating patient intake processing with strict HIPAA-grade auditability.',
    challenge: 'Doctors and nurse supervisors were spending 3.5 hours per shift manually transcribing unstructured patient history documents and cross-checking EHR drug interaction registries.',
    solution: 'We deployed a deterministic LangGraph agent cluster with dual-validation schemas: one agent parses intake transcripts into structured FHIR records, while a specialized pharmacology checker flags contraindications for physician sign-off.',
    results: [
      { metric: '82%', label: 'Intake workflows resolved without manual re-typing' },
      { metric: '0.0%', label: 'Hallucination rate on drug interaction queries' },
      { metric: '4.2x', label: 'Faster patient triage turnaround speed' }
    ],
    tools: ['LangGraph', 'Gemini API', 'FastAPI', 'Qdrant Vector DB', 'TypeScript'],
    coverImage: '/brand/og-image.png',
    videoId: 'dQw4w9WgXcQ', // Sample YouTube ID
    featured: true
  },
  {
    id: 'cs-3',
    slug: 'logistics-demand-forecasting',
    title: 'Predictive Freight Routing & Fleet Fuel Optimization',
    client: 'HyperScale Logistics UK',
    clientType: 'enterprise',
    serviceSlug: 'data-science-machine-learning',
    resultHeadline: '18% Fuel Mileage Cut',
    summary: 'Custom machine learning models predicting regional freight demand surges and optimizing empty-haul route dispatches.',
    challenge: 'Empty backhauls (deadhead miles) cost HyperScale millions annually due to volatile regional warehouse intake and unpredictable shipping peaks.',
    solution: 'Engineered an ensemble gradient boosted model (XGBoost + LightGBM) incorporating historical weather, port congestion data, and contract orders to forecast freight lane volume 14 days out.',
    results: [
      { metric: '18%', label: 'Reduction in deadhead freight mileage' },
      { metric: '$420K', label: 'Quarterly direct fuel expenditure savings' },
      { metric: '94.2%', label: 'Forecast accuracy across 34 transit corridors' }
    ],
    tools: ['Python', 'XGBoost', 'scikit-learn', 'FastAPI', 'AWS ECS', 'PostgreSQL'],
    coverImage: '/brand/og-image.png',
    featured: true
  },
  {
    id: 'cs-4',
    slug: 'paymatrix-merchant-portal',
    title: 'Cross-Border B2B Settlement Portal & Developer SDK',
    client: 'PayMatrix Africa',
    clientType: 'sme',
    serviceSlug: 'software-web-development',
    resultHeadline: '4 Weeks Ahead of Schedule',
    summary: 'High-throughput merchant settlement portal and developer dashboard handling multi-currency African trade transactions.',
    challenge: 'PayMatrix needed to rapidly launch a self-service merchant dashboard to support rapid customer acquisition before an international funding round, with zero tolerance for security flaws.',
    solution: 'Built a modular TypeScript and React application with Supabase authentication, strict role-based authorization, automated settlement PDF generation, and webhook event streaming.',
    results: [
      { metric: '4 wks', label: 'Delivered ahead of contracted investor milestone' },
      { metric: '99.98%', label: 'Uptime on webhook and settlement processors' },
      { metric: '5,000+', label: 'Active business merchants onboarded smoothly' }
    ],
    tools: ['React', 'TypeScript', 'Tailwind CSS', 'Supabase', 'Node.js', 'Vercel'],
    coverImage: '/brand/og-image.png',
    featured: false
  }
];

// Content Access Layer
export function getCaseStudies(): CaseStudy[] {
  return caseStudiesData;
}

export function getFeaturedCaseStudies(): CaseStudy[] {
  return caseStudiesData.filter(cs => cs.featured);
}

export function getCaseStudyBySlug(slug: string): CaseStudy | undefined {
  return caseStudiesData.find(cs => cs.slug === slug);
}

export function getCaseStudiesByService(serviceSlug: ServiceSlug): CaseStudy[] {
  return caseStudiesData.filter(cs => cs.serviceSlug === serviceSlug);
}
