// Tools, Technologies & Platform Ecosystems (for continuous infinite marquee)

export interface TechPartner {
  name: string;
  category: string;
  symbol: string;
}

export const techStackRow1: TechPartner[] = [
  { name: 'Python', category: 'Core Language', symbol: 'PY' },
  { name: 'TypeScript', category: 'Frontend & API', symbol: 'TS' },
  { name: 'PostgreSQL', category: 'Relational DB', symbol: 'PG' },
  { name: 'Supabase', category: 'Backend & Auth', symbol: 'SB' },
  { name: 'LangGraph', category: 'Agentic Workflows', symbol: 'LG' },
  { name: 'React', category: 'Modern UI', symbol: 'RC' },
  { name: 'dbt', category: 'Data Modeling', symbol: 'DB' },
  { name: 'Snowflake', category: 'Cloud Warehouse', symbol: 'SF' },
  { name: 'Docker', category: 'Containerization', symbol: 'DK' },
  { name: 'FastAPI', category: 'Microservices', symbol: 'FA' }
];

export const techStackRow2: TechPartner[] = [
  { name: 'Gemini API', category: 'Reasoning AI', symbol: 'GA' },
  { name: 'PyTorch', category: 'Deep Learning', symbol: 'PT' },
  { name: 'Tailwind CSS', category: 'Design Systems', symbol: 'TW' },
  { name: 'Qdrant', category: 'Vector Search', symbol: 'QD' },
  { name: 'BigQuery', category: 'Analytics Engine', symbol: 'BQ' },
  { name: 'Vercel', category: 'Edge Platform', symbol: 'VC' },
  { name: 'XGBoost', category: 'Predictive Modeling', symbol: 'XB' },
  { name: 'Next.js', category: 'Full-Stack Web', symbol: 'NX' },
  { name: 'PowerBI', category: 'BI Dashboards', symbol: 'PB' },
  { name: 'AWS Cloud', category: 'Cloud Infrastructure', symbol: 'AW' }
];

export function getTechMarquee() {
  return {
    row1: techStackRow1,
    row2: techStackRow2
  };
}
