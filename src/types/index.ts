// Shared TypeScript types for IData
// Matches database tables and content models

export type ServiceSlug = 
  | 'ai-agentic-systems'
  | 'data-analytics-dashboards'
  | 'data-science-machine-learning'
  | 'software-web-development';

export interface SubOffering {
  title: string;
  description: string;
  deliverables: string[];
}

export interface Service {
  id: string;
  slug: ServiceSlug;
  title: string;
  tagline: string;
  shortDescription: string;
  iconName: string;
  bullets: [string, string, string]; // exactly 3 mini bullet points
  problem: string;
  solution: string;
  process: {
    step: string;
    title: string;
    description: string;
  }[];
  subOfferings: SubOffering[];
  techStack: string[];
  deliverables: string[];
}

export interface CaseStudy {
  id: string;
  slug: string;
  title: string;
  client: string;
  clientType: 'international' | 'enterprise' | 'sme' | 'agency';
  serviceSlug: ServiceSlug;
  resultHeadline: string; // e.g. "82% Automated" or "+140% Pipeline"
  summary: string;
  challenge: string;
  solution: string;
  results: {
    metric: string;
    label: string;
  }[];
  tools: string[];
  coverImage: string;
  videoId?: string; // YouTube ID if demo video available
  featured?: boolean;
}

export type TeamLevel = 'leadership' | 'core' | 'extended';

export interface TeamMember {
  id: string;
  name: string;
  title: string;
  level: TeamLevel;
  area: 'Leadership' | 'AI & ML' | 'Data Analytics' | 'Software Engineering' | 'Delivery & Operations';
  photo: string;
  bio: string;
  focus: string[]; // exactly 3 focus areas
  leadsServices?: ServiceSlug[]; // for leadership members
  links: {
    linkedin?: string;
    github?: string;
    email?: string;
    twitter?: string;
  };
  order: number;
}

export interface Review {
  id: string;
  author_name: string;
  company: string;
  role_title: string;
  service_slug: ServiceSlug | 'general';
  rating: number; // 1 to 5
  body: string;
  photo_path?: string;
  status: 'pending' | 'approved' | 'rejected';
  featured: boolean;
  client_type?: 'international' | 'enterprise' | 'sme' | 'agency';
  created_at?: string;
  approved_at?: string;
}

export interface Lead {
  id?: string;
  name: string;
  email: string;
  company?: string;
  service_slug: string;
  budget_range?: string;
  message: string;
  attachment_path?: string;
  source_page?: string;
  status?: 'new' | 'contacted' | 'qualified' | 'won' | 'lost';
  created_at?: string;
}

export interface Project {
  id: string;
  client_id: string;
  title: string;
  service_slug: ServiceSlug;
  summary: string;
  status: 'proposal' | 'active' | 'review' | 'delivered' | 'closed';
  start_date: string;
  due_date: string;
  created_at?: string;
  progress_percentage?: number;
}

export interface Milestone {
  id: string;
  project_id: string;
  title: string;
  description: string;
  status: 'pending' | 'in_progress' | 'completed';
  due_date: string;
  sort_order: number;
}

export interface Deliverable {
  id: string;
  project_id: string;
  milestone_id?: string;
  title: string;
  file_path: string;
  file_size?: string;
  published: boolean;
  created_at?: string;
}

export interface Message {
  id: string;
  project_id: string;
  sender_id: string;
  sender_name: string;
  sender_role: 'client' | 'admin' | 'team' | 'freelancer';
  body: string;
  created_at: string;
}

export interface FAQ {
  id: string;
  question: string;
  answer: string;
  category: 'services' | 'delivery' | 'pricing' | 'portal';
}

export interface PartnerItem {
  name: string;
  category: 'cloud' | 'data' | 'ai' | 'tool';
  icon: string;
}

export interface VideoItem {
  id: string;
  youtubeId: string;
  title: string;
  description: string;
  posterImage: string;
  duration: string;
  serviceSlug: ServiceSlug;
}
