// Seed reviews content for IData
// Clearly marked as initial testimonials. Live reviews from the database merge seamlessly.

import { Review } from '../types';

export const seedReviews: Review[] = [
  {
    id: 'rev-1',
    author_name: 'Adebayo Ogunlesi',
    company: 'Apex Capital Partners',
    role_title: 'Managing Partner',
    service_slug: 'data-analytics-dashboards',
    rating: 5,
    body: 'IData transformed our weekly financial reporting from a 14-hour manual spreadsheet scramble into real-time executive dashboards. Flawless delivery and unmatched technical precision.',
    status: 'approved',
    featured: true,
    client_type: 'enterprise',
    created_at: '2026-09-14T10:00:00Z',
    approved_at: '2026-09-14T12:00:00Z'
  },
  {
    id: 'rev-2',
    author_name: 'Elena Rostova',
    company: 'Nordic Health Technologies',
    role_title: 'VP of Engineering',
    service_slug: 'ai-agentic-systems',
    rating: 5,
    body: 'Their multi-agent workflow automated 82% of our clinical triage notes intake with strict adherence to data governance. Highly recommend Isaac and the entire IData squad.',
    status: 'approved',
    featured: true,
    client_type: 'international',
    created_at: '2026-09-28T14:30:00Z',
    approved_at: '2026-09-28T16:00:00Z'
  },
  {
    id: 'rev-3',
    author_name: 'Marcus Sterling',
    company: 'HyperScale Logistics UK',
    role_title: 'Chief Operating Officer',
    service_slug: 'data-science-machine-learning',
    rating: 5,
    body: 'The route optimization and demand forecasting model cut our deadhead freight mileage by 18% in the first quarter of deployment. Transparent process from day one.',
    status: 'approved',
    featured: true,
    client_type: 'enterprise',
    created_at: '2026-10-05T09:15:00Z',
    approved_at: '2026-10-05T11:00:00Z'
  },
  {
    id: 'rev-4',
    author_name: 'Chinedu Eze',
    company: 'PayMatrix Africa',
    role_title: 'Head of Product',
    service_slug: 'software-web-development',
    rating: 5,
    body: 'Delivered our merchant settlement API and dashboard four weeks ahead of schedule. Rock-solid TypeScript architecture and zero production bugs since launch.',
    status: 'approved',
    featured: true,
    client_type: 'sme',
    created_at: '2026-10-18T16:45:00Z',
    approved_at: '2026-10-18T18:00:00Z'
  },
  {
    id: 'rev-5',
    author_name: 'Claire Beauchamp',
    company: 'Lumière Digital Paris',
    role_title: 'Creative Technical Director',
    service_slug: 'software-web-development',
    rating: 5,
    body: 'We subcontracted complex full-stack client portal engineering to IData. Their delivery milestones were met religiously and code quality exceeded our internal standards.',
    status: 'approved',
    featured: false,
    client_type: 'agency',
    created_at: '2026-10-24T11:20:00Z',
    approved_at: '2026-10-24T12:00:00Z'
  },
  {
    id: 'rev-6',
    author_name: 'Femi Awosika',
    company: 'Kora Retail Group',
    role_title: 'Director of Inventory & Supply',
    service_slug: 'data-science-machine-learning',
    rating: 5,
    body: 'The predictive inventory restock engine saved us over $80k in perishable spoilage during our peak Q4 season. Best technical investment we made this year.',
    status: 'approved',
    featured: false,
    client_type: 'sme',
    created_at: '2026-10-30T13:10:00Z',
    approved_at: '2026-10-30T15:00:00Z'
  }
];

export function getSeedReviews(): Review[] {
  return seedReviews;
}
