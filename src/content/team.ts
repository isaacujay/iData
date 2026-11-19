// Content layer for IData Team & Leadership
// Typed getter functions

import { TeamMember, TeamLevel } from '../types';

export const teamData: TeamMember[] = [
  // 1. LEADERSHIP
  {
    id: 'team-isaac',
    name: 'Isaac Ujay', // OWNER: replace or update founder name
    title: 'Founder & Chief Executive Officer',
    level: 'leadership',
    area: 'Leadership',
    photo: '',
    bio: 'Data architect and software engineer with over a decade of experience designing enterprise analytics and scalable systems for global startups and African enterprises.',
    focus: [
      'Enterprise Architecture & Strategy',
      'AI Systems Governance',
      'Client Partner Relations'
    ],
    leadsServices: ['ai-agentic-systems', 'data-analytics-dashboards'],
    links: {
      linkedin: 'https://linkedin.com/in/issacujay', // OWNER: replace
      github: 'https://github.com/issacujay',        // OWNER: replace
      email: 'mailto:issacujay@gmail.com'
    },
    order: 1
  },
  {
    id: 'team-aminat',
    name: 'Aminat Bello', // OWNER: replace
    title: 'Chief Technology Officer',
    level: 'leadership',
    area: 'Leadership',
    photo: '',
    bio: 'Former senior backend architect at pan-African fintechs. Specializes in low-latency distributed systems, security compliance, and cloud database infrastructure.',
    focus: [
      'Distributed Cloud Systems',
      'Data Privacy & Security Protocols',
      'High-Throughput APIs'
    ],
    leadsServices: ['software-web-development'],
    links: {
      linkedin: 'https://linkedin.com',
      github: 'https://github.com',
      email: 'mailto:aminat@idata.agency'
    },
    order: 2
  },
  {
    id: 'team-david',
    name: 'David Okafor', // OWNER: replace
    title: 'Head of Data & Machine Learning',
    level: 'leadership',
    area: 'Leadership',
    photo: '',
    bio: 'Applied statistician and ML engineer. Previously built customer segmentation and risk forecasting engines for commercial banking and logistics fleets.',
    focus: [
      'Predictive Modeling & Drift Detection',
      'Feature Engineering & Pipelines',
      'Model Explainability & Audits'
    ],
    leadsServices: ['data-science-machine-learning'],
    links: {
      linkedin: 'https://linkedin.com',
      github: 'https://github.com',
      email: 'mailto:david@idata.agency'
    },
    order: 3
  },
  {
    id: 'team-kemi',
    name: 'Kemi Adebayo', // OWNER: replace
    title: 'Head of Delivery & Client Success',
    level: 'leadership',
    area: 'Leadership',
    photo: '',
    bio: 'Agile delivery director ensuring on-time, on-budget execution across core engineering squads and vetted specialist contractors worldwide.',
    focus: [
      'Sprint Execution & Milestone Governance',
      'Quality Assurance Standards',
      'Client Onboarding & Communications'
    ],
    links: {
      linkedin: 'https://linkedin.com',
      email: 'mailto:kemi@idata.agency'
    },
    order: 4
  },

  // 2. CORE TEAM
  {
    id: 'team-emmanuel',
    name: 'Emmanuel Vance',
    title: 'Senior AI Engineer',
    level: 'core',
    area: 'AI & ML',
    photo: '',
    bio: 'Specialist in agentic state graphs, vector search tuning, and autonomous LLM orchestration.',
    focus: ['LangGraph', 'RAG Pipelines', 'Prompt Hardening'],
    links: { github: 'https://github.com', linkedin: 'https://linkedin.com' },
    order: 10
  },
  {
    id: 'team-folake',
    name: 'Folake Adeleke',
    title: 'Lead Data Analytics Engineer',
    level: 'core',
    area: 'Data Analytics',
    photo: '',
    bio: 'Expert in dbt dimensional modeling, Snowflake warehousing, and executive KPI dashboard visualization.',
    focus: ['dbt Core', 'Snowflake', 'Executive Dashboards'],
    links: { github: 'https://github.com', linkedin: 'https://linkedin.com' },
    order: 11
  },
  {
    id: 'team-chinedu-dev',
    name: 'Chinedu Nwosu',
    title: 'Senior Full-Stack Engineer',
    level: 'core',
    area: 'Software Engineering',
    photo: '',
    bio: 'TypeScript craftsman passionate about resilient React architectures, Tailwind systems, and fast APIs.',
    focus: ['React & Next.js', 'PostgreSQL', 'Tailwind CSS'],
    links: { github: 'https://github.com', linkedin: 'https://linkedin.com' },
    order: 12
  },
  {
    id: 'team-zainab',
    name: 'Zainab Lawal',
    title: 'Data Scientist & Statistician',
    level: 'core',
    area: 'AI & ML',
    photo: '',
    bio: 'Designs time-series demand forecasting, customer lifetime value algorithms, and retention models.',
    focus: ['Time-Series Forecasting', 'XGBoost', 'Feature Engineering'],
    links: { linkedin: 'https://linkedin.com' },
    order: 13
  },
  {
    id: 'team-tariq',
    name: 'Tariq Al-Mansoor',
    title: 'Cloud & DevOps Architect',
    level: 'core',
    area: 'Delivery & Operations',
    photo: '',
    bio: 'Automates CI/CD deployment pipelines, Docker container orchestration, and multi-region database replication.',
    focus: ['Docker & Kubernetes', 'Terraform', 'CI/CD Pipelines'],
    links: { github: 'https://github.com' },
    order: 14
  },

  // 3. EXTENDED NETWORK (Vetted Freelancers & Domain Specialists)
  {
    id: 'team-ext-1',
    name: 'Sofia Lindqvist',
    title: 'Bioinformatics & Clinical ML Specialist',
    level: 'extended',
    area: 'AI & ML',
    photo: '',
    bio: 'Stockholm-based biomedical data consultant supporting healthcare ML engagements.',
    focus: ['EHR Integration', 'Clinical Natural Language Processing', 'HIPAA Compliance'],
    links: { linkedin: 'https://linkedin.com' },
    order: 20
  },
  {
    id: 'team-ext-2',
    name: 'Kwame Mensah',
    title: 'Fintech Payment Integration Engineer',
    level: 'extended',
    area: 'Software Engineering',
    photo: '',
    bio: 'Accra-based payment gateways engineer with deep knowledge of African settlement rails.',
    focus: ['Payment Gateways', 'Webhook Architecture', 'Reconciliation'],
    links: { github: 'https://github.com' },
    order: 21
  },
  {
    id: 'team-ext-3',
    name: 'Elena Vance',
    title: 'PowerBI & Enterprise Visualization Designer',
    level: 'extended',
    area: 'Data Analytics',
    photo: '',
    bio: 'Specialized in UI/UX for corporate data warehouses, financial statements, and supply chain telemetry.',
    focus: ['PowerBI Modeling', 'DAX Optimization', 'C-Suite Reporting'],
    links: { linkedin: 'https://linkedin.com' },
    order: 22
  }
];

// Content Access Layer
export function getTeamMembers(level?: TeamLevel): TeamMember[] {
  if (level) {
    return teamData.filter(m => m.level === level).sort((a, b) => a.order - b.order);
  }
  return [...teamData].sort((a, b) => a.order - b.order);
}

export function getLeadership(): TeamMember[] {
  return getTeamMembers('leadership');
}

export function getCoreTeam(): TeamMember[] {
  return getTeamMembers('core');
}

export function getExtendedNetwork(): TeamMember[] {
  return getTeamMembers('extended');
}

export function getTeamMemberById(id: string): TeamMember | undefined {
  return teamData.find(m => m.id === id);
}
