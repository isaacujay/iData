// Authentication Service Layer
// Works seamlessly in live Supabase mode and zero-config Demo Mode

import { supabase, isDemoMode } from './database';

export interface UserProfile {
  id: string;
  email: string;
  full_name: string;
  company: string;
  role: 'client' | 'admin' | 'team' | 'freelancer';
  avatar_url?: string;
}

// Preset demo accounts for rapid testing in demo mode
export const DEMO_CLIENT: UserProfile = {
  id: 'demo-client-user-id',
  email: 'client@apexcapital.com',
  full_name: 'Adebayo Ogunlesi',
  company: 'Apex Capital Partners',
  role: 'client',
  avatar_url: ''
};

export const DEMO_ADMIN: UserProfile = {
  id: 'demo-admin-user-id',
  email: 'issacujay@gmail.com',
  full_name: 'Isaac Ujay',
  company: 'IData Technologies',
  role: 'admin',
  avatar_url: ''
};

const DEMO_AUTH_STORAGE_KEY = 'idata_demo_current_user';

export async function getCurrentUser(): Promise<UserProfile | null> {
  if (isDemoMode || !supabase) {
    const raw = localStorage.getItem(DEMO_AUTH_STORAGE_KEY);
    return raw ? JSON.parse(raw) : null;
  }

  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return null;

  // Fetch role and profile details
  const { data: profile } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', user.id)
    .single();

  return {
    id: user.id,
    email: user.email || '',
    full_name: profile?.full_name || user.user_metadata?.full_name || 'User',
    company: profile?.company || '',
    role: profile?.role || 'client',
    avatar_url: profile?.avatar_url
  };
}

export async function signIn(email: string, password?: string): Promise<UserProfile> {
  if (isDemoMode || !supabase) {
    // If logging in as admin or email has admin/issac
    const user: UserProfile = email.toLowerCase().includes('admin') || email.toLowerCase().includes('issac')
      ? { ...DEMO_ADMIN, email }
      : { ...DEMO_CLIENT, email };
    
    localStorage.setItem(DEMO_AUTH_STORAGE_KEY, JSON.stringify(user));
    window.dispatchEvent(new Event('auth-state-changed'));
    return user;
  }

  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password: password || 'password'
  });

  if (error) throw error;
  if (!data.user) throw new Error('Sign in failed: no user returned');

  const { data: profile } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', data.user.id)
    .single();

  const userProfile: UserProfile = {
    id: data.user.id,
    email: data.user.email || '',
    full_name: profile?.full_name || 'Client',
    company: profile?.company || '',
    role: profile?.role || 'client',
    avatar_url: profile?.avatar_url
  };

  window.dispatchEvent(new Event('auth-state-changed'));
  return userProfile;
}

export async function signInAsDemo(role: 'client' | 'admin'): Promise<UserProfile> {
  const user = role === 'admin' ? DEMO_ADMIN : DEMO_CLIENT;
  localStorage.setItem(DEMO_AUTH_STORAGE_KEY, JSON.stringify(user));
  window.dispatchEvent(new Event('auth-state-changed'));
  return user;
}

export async function signOut(): Promise<void> {
  if (isDemoMode || !supabase) {
    localStorage.removeItem(DEMO_AUTH_STORAGE_KEY);
    window.dispatchEvent(new Event('auth-state-changed'));
    return;
  }

  await supabase.auth.signOut();
  window.dispatchEvent(new Event('auth-state-changed'));
}
