// Database Service Layer
// Clean interface isolating UI from the underlying persistence provider (Supabase / Mock Demo Store)

import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { Lead, Review, Project, Milestone, Deliverable, Message } from '../types';
import { seedReviews } from '../content/reviews';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const isDemoMode = !supabaseUrl || !supabaseAnonKey || supabaseUrl.trim() === '' || supabaseAnonKey.trim() === '';

// Initialize live Supabase client if keys exist
export const supabase: SupabaseClient | null = !isDemoMode 
  ? createClient(supabaseUrl, supabaseAnonKey) 
  : null;

// ==============================================================================
// LOCAL STORAGE DEMO MOCK STORE
// ==============================================================================
const STORAGE_KEYS = {
  LEADS: 'idata_demo_leads',
  REVIEWS: 'idata_demo_reviews',
  PROJECTS: 'idata_demo_projects',
  MILESTONES: 'idata_demo_milestones',
  DELIVERABLES: 'idata_demo_deliverables',
  MESSAGES: 'idata_demo_messages',
  SUBSCRIBERS: 'idata_demo_subscribers',
};

// Initial Demo Seed Data
const initialDemoProjects: Project[] = [
  {
    id: 'proj-demo-1',
    client_id: 'demo-client-user-id',
    title: 'Enterprise Risk & Liquidity Intelligence Pipeline',
    service_slug: 'data-analytics-dashboards',
    summary: 'Automated dbt modeling and real-time executive risk dashboard implementation.',
    status: 'active',
    start_date: '2026-10-15',
    due_date: '2026-12-05',
    progress_percentage: 65,
    created_at: '2026-10-15T09:00:00Z'
  },
  {
    id: 'proj-demo-2',
    client_id: 'demo-client-user-id',
    title: 'Clinical Document AI Agent Pipeline',
    service_slug: 'ai-agentic-systems',
    summary: 'LangGraph multi-agent intake ingestion and compliance validation engine.',
    status: 'review',
    start_date: '2026-09-01',
    due_date: '2026-11-20',
    progress_percentage: 90,
    created_at: '2026-09-01T08:00:00Z'
  }
];

const initialDemoMilestones: Milestone[] = [
  {
    id: 'm-1',
    project_id: 'proj-demo-1',
    title: 'Architecture Blueprint & Source Schema Audit',
    description: 'Discovery audit of banking feeds and dimensional schema design.',
    status: 'completed',
    due_date: '2026-10-25',
    sort_order: 1
  },
  {
    id: 'm-2',
    project_id: 'proj-demo-1',
    title: 'Automated ELT Pipeline & Staging Warehouse',
    description: 'PostgreSQL & dbt transformation pipeline deployment.',
    status: 'completed',
    due_date: '2026-11-10',
    sort_order: 2
  },
  {
    id: 'm-3',
    project_id: 'proj-demo-1',
    title: 'Executive Dashboard UI & Telemetry Alerts',
    description: 'High-density metric views and automated Slack/Email anomaly alerts.',
    status: 'in_progress',
    due_date: '2026-11-25',
    sort_order: 3
  },
  {
    id: 'm-4',
    project_id: 'proj-demo-1',
    title: 'Security Audit & Final Handover',
    description: 'SOC-2 readiness verification and staff training runbook.',
    status: 'pending',
    due_date: '2026-12-05',
    sort_order: 4
  }
];

const initialDemoDeliverables: Deliverable[] = [
  {
    id: 'del-1',
    project_id: 'proj-demo-1',
    milestone_id: 'm-1',
    title: 'IData_Apex_Architecture_Specification_v1.0.pdf',
    file_path: '/deliverables/apex_architecture_spec.pdf',
    file_size: '3.4 MB',
    published: true,
    created_at: '2026-10-25T14:00:00Z'
  },
  {
    id: 'del-2',
    project_id: 'proj-demo-1',
    milestone_id: 'm-2',
    title: 'dbt_Warehouse_Dimensional_Models_Documentation.pdf',
    file_path: '/deliverables/dbt_models_docs.pdf',
    file_size: '1.8 MB',
    published: true,
    created_at: '2026-11-10T16:20:00Z'
  }
];

const initialDemoMessages: Message[] = [
  {
    id: 'msg-1',
    project_id: 'proj-demo-1',
    sender_id: 'team-isaac',
    sender_name: 'Isaac Ujay',
    sender_role: 'admin',
    body: 'Welcome to your dedicated IData Client Portal! Sprint 2 was delivered ahead of schedule. We have started deploying the live executive dashboard interfaces.',
    created_at: '2026-11-11T10:30:00Z'
  },
  {
    id: 'msg-2',
    project_id: 'proj-demo-1',
    sender_id: 'demo-client-user-id',
    sender_name: 'Adebayo Ogunlesi',
    sender_role: 'client',
    body: 'The latency benchmarks look fantastic. Can we schedule a brief demo review for the currency exposure widget on Thursday?',
    created_at: '2026-11-11T11:45:00Z'
  },
  {
    id: 'msg-3',
    project_id: 'proj-demo-1',
    sender_id: 'team-folake',
    sender_name: 'Folake Adeleke',
    sender_role: 'team',
    body: 'Confirmed! We have set up a preview link for Thursday at 2:00 PM WAT.',
    created_at: '2026-11-11T13:00:00Z'
  }
];

function getDemoStore<T>(key: string, defaultVal: T): T {
  try {
    const raw = localStorage.getItem(key);
    if (!raw) {
      localStorage.setItem(key, JSON.stringify(defaultVal));
      return defaultVal;
    }
    return JSON.parse(raw);
  } catch {
    return defaultVal;
  }
}

function setDemoStore<T>(key: string, val: T): void {
  try {
    localStorage.setItem(key, JSON.stringify(val));
  } catch (e) {
    console.error('Storage error:', e);
  }
}

// ==============================================================================
// PUBLIC DATABASE API METHODS
// ==============================================================================

// 1. Leads / Quote Requests
export async function createLead(lead: Lead): Promise<{ success: boolean; id: string }> {
  if (isDemoMode || !supabase) {
    const leads = getDemoStore<Lead[]>(STORAGE_KEYS.LEADS, []);
    const newLead: Lead = {
      ...lead,
      id: 'lead-' + Date.now(),
      status: 'new',
      created_at: new Date().toISOString()
    };
    leads.unshift(newLead);
    setDemoStore(STORAGE_KEYS.LEADS, leads);
    console.log('[Demo Mode] Saved new quote request to mock store:', newLead);
    return { success: true, id: newLead.id! };
  }

  const { data, error } = await supabase
    .from('leads')
    .insert([lead])
    .select('id')
    .single();

  if (error) {
    console.error('Error creating lead:', error);
    throw error;
  }
  return { success: true, id: data.id };
}

export async function listLeads(): Promise<Lead[]> {
  if (isDemoMode || !supabase) {
    return getDemoStore<Lead[]>(STORAGE_KEYS.LEADS, [
      {
        id: 'lead-demo-1',
        name: 'Sarah Jenkins',
        email: 's.jenkins@globex.io',
        company: 'Globex Solutions Inc',
        service_slug: 'ai-agentic-systems',
        budget_range: '$10k - $25k',
        message: 'Looking to automate our international vendor compliance onboarding with autonomous agent tools.',
        source_page: '/services/ai-agentic-systems',
        status: 'qualified',
        created_at: '2026-11-04T14:20:00Z'
      },
      {
        id: 'lead-demo-2',
        name: 'Tunde Bakare',
        email: 'tunde@lagosfin.ng',
        company: 'Lagos Financial Group',
        service_slug: 'data-analytics-dashboards',
        budget_range: '$5k - $10k',
        message: 'We need high-speed real-time transaction monitoring dashboards with Slack alerting.',
        source_page: '/',
        status: 'new',
        created_at: '2026-11-05T09:10:00Z'
      }
    ]);
  }

  const { data, error } = await supabase
    .from('leads')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) throw error;
  return data || [];
}

export async function updateLeadStatus(id: string, status: Lead['status']): Promise<void> {
  if (isDemoMode || !supabase) {
    const leads = await listLeads();
    const updated = leads.map(l => l.id === id ? { ...l, status } : l);
    setDemoStore(STORAGE_KEYS.LEADS, updated);
    return;
  }

  const { error } = await supabase
    .from('leads')
    .update({ status })
    .eq('id', id);

  if (error) throw error;
}

// 2. Reviews (Approved & Pending)
export async function getApprovedReviews(): Promise<Review[]> {
  if (isDemoMode || !supabase) {
    const demoReviews = getDemoStore<Review[]>(STORAGE_KEYS.REVIEWS, seedReviews);
    return demoReviews.filter(r => r.status === 'approved');
  }

  const { data, error } = await supabase
    .from('reviews')
    .select('*')
    .eq('status', 'approved')
    .order('created_at', { ascending: false });

  if (error) {
    console.warn('Falling back to seed reviews due to DB query failure:', error);
    return seedReviews;
  }
  return data && data.length > 0 ? data : seedReviews;
}

export async function getAllReviews(): Promise<Review[]> {
  if (isDemoMode || !supabase) {
    return getDemoStore<Review[]>(STORAGE_KEYS.REVIEWS, seedReviews);
  }

  const { data, error } = await supabase
    .from('reviews')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) throw error;
  return data || [];
}

export async function submitReview(review: Omit<Review, 'id' | 'status' | 'created_at'>): Promise<string> {
  if (isDemoMode || !supabase) {
    const reviews = getDemoStore<Review[]>(STORAGE_KEYS.REVIEWS, seedReviews);
    const newReview: Review = {
      ...review,
      id: 'rev-demo-' + Date.now(),
      status: 'pending',
      created_at: new Date().toISOString()
    };
    reviews.unshift(newReview);
    setDemoStore(STORAGE_KEYS.REVIEWS, reviews);
    console.log('[Demo Mode] Review submitted as pending:', newReview);
    return newReview.id;
  }

  const { data, error } = await supabase
    .from('reviews')
    .insert([{ ...review, status: 'pending' }])
    .select('id')
    .single();

  if (error) throw error;
  return data.id;
}

export async function updateReviewStatus(id: string, status: 'approved' | 'rejected'): Promise<void> {
  if (isDemoMode || !supabase) {
    const reviews = await getAllReviews();
    const updated = reviews.map(r => r.id === id ? { 
      ...r, 
      status, 
      approved_at: status === 'approved' ? new Date().toISOString() : undefined 
    } : r);
    setDemoStore(STORAGE_KEYS.REVIEWS, updated);
    return;
  }

  const { error } = await supabase
    .from('reviews')
    .update({ 
      status, 
      approved_at: status === 'approved' ? new Date().toISOString() : null 
    })
    .eq('id', id);

  if (error) throw error;
}

// 3. Projects & Milestones (Client Portal)
export async function getProjectsForClient(clientId: string): Promise<Project[]> {
  if (isDemoMode || !supabase) {
    return getDemoStore<Project[]>(STORAGE_KEYS.PROJECTS, initialDemoProjects);
  }

  const { data, error } = await supabase
    .from('projects')
    .select('*')
    .eq('client_id', clientId)
    .order('created_at', { ascending: false });

  if (error) throw error;
  return data || [];
}

export async function getAllProjects(): Promise<Project[]> {
  if (isDemoMode || !supabase) {
    return getDemoStore<Project[]>(STORAGE_KEYS.PROJECTS, initialDemoProjects);
  }

  const { data, error } = await supabase
    .from('projects')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) throw error;
  return data || [];
}

export async function getMilestonesForProject(projectId: string): Promise<Milestone[]> {
  if (isDemoMode || !supabase) {
    const all = getDemoStore<Milestone[]>(STORAGE_KEYS.MILESTONES, initialDemoMilestones);
    return all.filter(m => m.project_id === projectId).sort((a, b) => a.sort_order - b.sort_order);
  }

  const { data, error } = await supabase
    .from('milestones')
    .select('*')
    .eq('project_id', projectId)
    .order('sort_order', { ascending: true });

  if (error) throw error;
  return data || [];
}

export async function getDeliverablesForProject(projectId: string): Promise<Deliverable[]> {
  if (isDemoMode || !supabase) {
    const all = getDemoStore<Deliverable[]>(STORAGE_KEYS.DELIVERABLES, initialDemoDeliverables);
    return all.filter(d => d.project_id === projectId);
  }

  const { data, error } = await supabase
    .from('deliverables')
    .select('*')
    .eq('project_id', projectId)
    .eq('published', true);

  if (error) throw error;
  return data || [];
}

export async function getMessagesForProject(projectId: string): Promise<Message[]> {
  if (isDemoMode || !supabase) {
    const all = getDemoStore<Message[]>(STORAGE_KEYS.MESSAGES, initialDemoMessages);
    return all.filter(m => m.project_id === projectId);
  }

  const { data, error } = await supabase
    .from('messages')
    .select('*')
    .eq('project_id', projectId)
    .order('created_at', { ascending: true });

  if (error) throw error;
  return data || [];
}

export async function sendProjectMessage(projectId: string, senderId: string, senderName: string, role: Message['sender_role'], body: string): Promise<Message> {
  const newMsg: Message = {
    id: 'msg-' + Date.now(),
    project_id: projectId,
    sender_id: senderId,
    sender_name: senderName,
    sender_role: role,
    body,
    created_at: new Date().toISOString()
  };

  if (isDemoMode || !supabase) {
    const all = getDemoStore<Message[]>(STORAGE_KEYS.MESSAGES, initialDemoMessages);
    all.push(newMsg);
    setDemoStore(STORAGE_KEYS.MESSAGES, all);
    return newMsg;
  }

  const { data, error } = await supabase
    .from('messages')
    .insert([{
      project_id: projectId,
      sender_id: senderId,
      body
    }])
    .select('*')
    .single();

  if (error) throw error;
  return { ...data, sender_name: senderName, sender_role: role };
}

// 4. Newsletter
export async function subscribeNewsletter(email: string): Promise<{ success: boolean }> {
  if (isDemoMode || !supabase) {
    const subs = getDemoStore<string[]>(STORAGE_KEYS.SUBSCRIBERS, []);
    if (!subs.includes(email)) subs.push(email);
    setDemoStore(STORAGE_KEYS.SUBSCRIBERS, subs);
    console.log('[Demo Mode] Newsletter subscriber registered:', email);
    return { success: true };
  }

  const { error } = await supabase
    .from('newsletter_subscribers')
    .insert([{ email }]);

  if (error && error.code !== '23505') { // ignore duplicate unique error
    throw error;
  }
  return { success: true };
}

export async function getNewsletterSubscribers(): Promise<string[]> {
  if (isDemoMode || !supabase) {
    return getDemoStore<string[]>(STORAGE_KEYS.SUBSCRIBERS, ['adebayo@apexcapital.com', 'partner@nordichealth.tech']);
  }

  const { data, error } = await supabase
    .from('newsletter_subscribers')
    .select('email');

  if (error) throw error;
  return data ? data.map(d => d.email) : [];
}
