// Admin Console (/admin) - IData Leadership Only
// Gradient backdrop, film grain, soft aurora blooms, monochrome controls, no numbering in labels
import React, { useState, useEffect } from 'react';
import { 
  ShieldCheck, 
  CheckCircle2, 
  XCircle, 
  Star, 
  Inbox, 
  FolderGit2, 
  Mail, 
  LogOut
} from 'lucide-react';
import { getCurrentUser, signInAsDemo, signOut, UserProfile } from '../../services/auth';
import { 
  listLeads, 
  updateLeadStatus, 
  getAllReviews, 
  updateReviewStatus, 
  getAllProjects, 
  getNewsletterSubscribers 
} from '../../services/database';
import { Lead, Review, Project } from '../../types';
import { Breadcrumbs } from '../../components/Breadcrumbs';

export const AdminPage: React.FC = () => {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);

  const [activeTab, setActiveTab] = useState<'leads' | 'reviews' | 'projects' | 'newsletter'>('leads');

  const [leads, setLeads] = useState<Lead[]>([]);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [projects, setProjects] = useState<Project[]>([]);
  const [subscribers, setSubscribers] = useState<string[]>([]);
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);

  useEffect(() => {
    checkAdmin();
    const handleAuth = () => checkAdmin();
    window.addEventListener('auth-state-changed', handleAuth);
    return () => window.removeEventListener('auth-state-changed', handleAuth);
  }, []);

  const checkAdmin = async () => {
    try {
      const u = await getCurrentUser();
      setUser(u);
      if (u && (u.role === 'admin' || u.email.includes('issac') || u.email.includes('admin'))) {
        loadData();
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const loadData = async () => {
    try {
      const [l, r, p, s] = await Promise.all([
        listLeads(),
        getAllReviews(),
        getAllProjects(),
        getNewsletterSubscribers()
      ]);
      setLeads(l);
      setReviews(r);
      setProjects(p);
      setSubscribers(s);
    } catch (err) {
      console.error(err);
    }
  };

  const handleUpdateLeadStatus = async (id: string, status: Lead['status']) => {
    try {
      await updateLeadStatus(id, status);
      setLeads(prev => prev.map(l => l.id === id ? { ...l, status } : l));
      if (selectedLead?.id === id) {
        setSelectedLead(prev => prev ? { ...prev, status } : null);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleReviewAction = async (id: string, action: 'approved' | 'rejected') => {
    try {
      await updateReviewStatus(id, action);
      setReviews(prev => prev.map(r => r.id === id ? { ...r, status: action } : r));
    } catch (err) {
      console.error(err);
    }
  };

  if (loading) {
    return (
      <div className="pt-32 pb-20 min-h-screen bg-gradient-dark-section flex items-center justify-center">
        <div className="w-8 h-8 rounded-full border-2 border-white border-t-transparent animate-spin" />
      </div>
    );
  }

  // Restrict to Admin
  if (!user || user.role !== 'admin') {
    return (
      <div className="pt-28 pb-20 min-h-screen bg-gradient-dark-section film-grain relative overflow-hidden">
        <div className="max-w-[1200px] mx-auto px-4 md:px-8 relative z-10">
          <Breadcrumbs items={[{ label: 'Admin Access' }]} />

          <div className="card-depth max-w-md mx-auto my-16 p-8 rounded-3xl text-center shadow-2xl">
            <div className="w-14 h-14 rounded-2xl bg-white/10 text-white mx-auto flex items-center justify-center mb-4">
              <ShieldCheck className="w-7 h-7 text-white" />
            </div>
            <h2 className="text-xl font-bold text-white mb-2">
              IData Administrator Access Only
            </h2>
            <p className="text-xs text-neutral-400 mb-6 leading-relaxed">
              This area manages leads, review approvals, and project allocations.
            </p>

            <button
              onClick={() => signInAsDemo('admin')}
              className="w-full py-3 rounded-xl bg-white text-black font-bold text-xs hover:bg-neutral-200 transition-colors cursor-pointer"
            >
              Sign In as Admin (Isaac Ujay)
            </button>
          </div>
        </div>
      </div>
    );
  }

  const pendingReviews = reviews.filter(r => r.status === 'pending');

  return (
    <div className="pt-28 pb-20 min-h-screen bg-gradient-dark-section film-grain relative overflow-hidden">
      {/* Drifting aurora blooms */}
      <div className="pointer-events-none absolute top-10 right-10 w-[500px] h-[500px] rounded-full bg-[#4F46E5] opacity-20 blur-[130px] animate-aurora-1" />
      <div className="pointer-events-none absolute bottom-10 left-10 w-[450px] h-[450px] rounded-full bg-[#7C3AED] opacity-15 blur-[120px] animate-aurora-2" />

      <div className="max-w-[1200px] mx-auto px-4 md:px-8 relative z-10">
        {/* Admin Header */}
        <div className="card-depth flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6 rounded-3xl mb-8">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-white/10 text-white flex items-center justify-center">
              <ShieldCheck className="w-5 h-5 text-white" />
            </div>
            <div>
              <h1 className="text-lg font-bold text-white">
                IData Agency Console
              </h1>
              <p className="text-xs text-neutral-400">
                Logged in as {user.full_name} ({user.email}) · Admin Privilege
              </p>
            </div>
          </div>

          <button
            onClick={() => signOut()}
            className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-xs text-neutral-300 hover:text-white transition-colors self-start sm:self-center cursor-pointer"
          >
            <LogOut className="w-3.5 h-3.5 text-white" />
            <span>Sign Out</span>
          </button>
        </div>

        {/* Tab Switcher (Monochrome) */}
        <div className="flex items-center gap-2 mb-8 overflow-x-auto pb-2 border-b border-white/10">
          <button
            onClick={() => setActiveTab('leads')}
            className={`px-4 py-2 rounded-xl text-xs font-semibold flex items-center gap-2 transition-colors cursor-pointer whitespace-nowrap ${
              activeTab === 'leads'
                ? 'bg-white text-black font-bold shadow-sm'
                : 'text-neutral-400 hover:text-white'
            }`}
          >
            <Inbox className={`w-3.5 h-3.5 ${activeTab === 'leads' ? 'text-black' : 'text-white'}`} />
            <span>Incoming Leads ({leads.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('reviews')}
            className={`px-4 py-2 rounded-xl text-xs font-semibold flex items-center gap-2 transition-colors cursor-pointer whitespace-nowrap ${
              activeTab === 'reviews'
                ? 'bg-white text-black font-bold shadow-sm'
                : 'text-neutral-400 hover:text-white'
            }`}
          >
            <Star className={`w-3.5 h-3.5 ${activeTab === 'reviews' ? 'text-black' : 'text-white'}`} />
            <span>Reviews Approval {pendingReviews.length > 0 && `(${pendingReviews.length} Pending)`}</span>
          </button>

          <button
            onClick={() => setActiveTab('projects')}
            className={`px-4 py-2 rounded-xl text-xs font-semibold flex items-center gap-2 transition-colors cursor-pointer whitespace-nowrap ${
              activeTab === 'projects'
                ? 'bg-white text-black font-bold shadow-sm'
                : 'text-neutral-400 hover:text-white'
            }`}
          >
            <FolderGit2 className={`w-3.5 h-3.5 ${activeTab === 'projects' ? 'text-black' : 'text-white'}`} />
            <span>Client Projects ({projects.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('newsletter')}
            className={`px-4 py-2 rounded-xl text-xs font-semibold flex items-center gap-2 transition-colors cursor-pointer whitespace-nowrap ${
              activeTab === 'newsletter'
                ? 'bg-white text-black font-bold shadow-sm'
                : 'text-neutral-400 hover:text-white'
            }`}
          >
            <Mail className={`w-3.5 h-3.5 ${activeTab === 'newsletter' ? 'text-black' : 'text-white'}`} />
            <span>Subscribers ({subscribers.length})</span>
          </button>
        </div>

        {/* ------------------------------------------------------------------ */}
        {/* TAB 1: LEADS & QUOTE REQUESTS */}
        {/* ------------------------------------------------------------------ */}
        {activeTab === 'leads' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            <div className="lg:col-span-7 space-y-3">
              {leads.length > 0 ? (
                leads.map(l => (
                  <div
                    key={l.id}
                    onClick={() => setSelectedLead(l)}
                    className={`card-depth p-5 rounded-2xl cursor-pointer ${
                      selectedLead?.id === l.id
                        ? 'border-white bg-white/[0.08]'
                        : ''
                    }`}
                  >
                    <div className="flex items-center justify-between gap-2 mb-2">
                      <span className="text-sm font-bold text-white">
                        {l.name}
                      </span>
                      <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded font-bold bg-white/10 text-white border border-white/15">
                        {l.status}
                      </span>
                    </div>

                    <div className="text-xs text-neutral-400 mb-2">
                      {l.company || 'Direct Client'} · <span className="text-white">{l.service_slug}</span>
                    </div>

                    <p className="text-xs text-neutral-300 line-clamp-2">
                      "{l.message}"
                    </p>
                  </div>
                ))
              ) : (
                <div className="card-depth p-8 text-center text-xs text-neutral-400 rounded-2xl">
                  No leads submitted yet.
                </div>
              )}
            </div>

            {/* Lead Detail Panel */}
            <div className="card-depth lg:col-span-5 p-6 rounded-3xl h-fit sticky top-28">
              {selectedLead ? (
                <div className="space-y-4">
                  <div className="flex items-center justify-between pb-3 border-b border-white/10">
                    <h3 className="text-base font-bold text-white">
                      Lead Specifications
                    </h3>
                    <span className="text-[10px] font-mono text-neutral-400">
                      {selectedLead.created_at?.split('T')[0]}
                    </span>
                  </div>

                  <div>
                    <label className="text-[10px] uppercase font-mono text-neutral-400 block">Contact</label>
                    <div className="text-sm font-semibold text-white">{selectedLead.name}</div>
                    <a href={`mailto:${selectedLead.email}`} className="text-xs text-neutral-300 underline">
                      {selectedLead.email}
                    </a>
                  </div>

                  <div>
                    <label className="text-[10px] uppercase font-mono text-neutral-400 block">Company & Budget</label>
                    <div className="text-xs text-neutral-200">{selectedLead.company || 'N/A'} · Budget: {selectedLead.budget_range || 'Not specified'}</div>
                  </div>

                  <div>
                    <label className="text-[10px] uppercase font-mono text-neutral-400 block">Full Scope Message</label>
                    <div className="p-3 rounded-xl bg-white/[0.04] border border-white/10 text-xs text-neutral-200 leading-relaxed whitespace-pre-wrap mt-1">
                      {selectedLead.message}
                    </div>
                  </div>

                  {selectedLead.attachment_path && (
                    <div>
                      <label className="text-[10px] uppercase font-mono text-neutral-400 block">Attachment</label>
                      <span className="text-xs text-white font-mono">
                        📁 {selectedLead.attachment_path}
                      </span>
                    </div>
                  )}

                  {/* Status changer buttons (Monochrome) */}
                  <div className="pt-4 border-t border-white/10">
                    <label className="text-[10px] uppercase font-mono text-neutral-400 block mb-2">Update Pipeline Status:</label>
                    <div className="flex flex-wrap gap-1.5">
                      {(['new', 'contacted', 'qualified', 'won', 'lost'] as Lead['status'][]).map(st => (
                        <button
                          key={st}
                          onClick={() => handleUpdateLeadStatus(selectedLead.id!, st)}
                          className={`px-2.5 py-1 rounded-lg text-[10px] font-mono uppercase transition-colors cursor-pointer ${
                            selectedLead.status === st
                              ? 'bg-white text-black font-bold'
                              : 'bg-white/5 text-neutral-400 hover:text-white border border-white/10'
                          }`}
                        >
                          {st}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              ) : (
                <div className="py-16 text-center text-xs text-neutral-400">
                  Select a lead on the left to view detailed scope and contact parameters.
                </div>
              )}
            </div>
          </div>
        )}

        {/* ------------------------------------------------------------------ */}
        {/* TAB 2: REVIEWS APPROVAL */}
        {/* ------------------------------------------------------------------ */}
        {activeTab === 'reviews' && (
          <div className="space-y-4">
            <h2 className="text-sm font-mono uppercase tracking-wider text-neutral-400 mb-2">
              Reviews Awaiting Moderation
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {reviews.map(r => (
                <div
                  key={r.id}
                  className="card-depth p-6 rounded-2xl flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-1 text-white">
                        {[...Array(r.rating)].map((_, i) => (
                          <Star key={i} className="w-3.5 h-3.5 fill-white text-white" />
                        ))}
                      </div>

                      <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded font-bold bg-white/10 text-white border border-white/15">
                        {r.status}
                      </span>
                    </div>

                    <p className="text-xs text-neutral-200 italic leading-relaxed mb-4">
                      "{r.body}"
                    </p>

                    <div className="text-xs font-semibold text-white">
                      {r.author_name}
                    </div>
                    <div className="text-[11px] text-neutral-400">
                      {r.role_title} · {r.company}
                    </div>
                  </div>

                  {/* Approve / Reject Actions (Monochrome) */}
                  <div className="pt-4 border-t border-white/10 flex items-center justify-end gap-2 mt-4">
                    {r.status !== 'approved' && (
                      <button
                        onClick={() => handleReviewAction(r.id, 'approved')}
                        className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-white text-black text-xs font-bold hover:bg-neutral-200 transition-colors cursor-pointer"
                      >
                        <CheckCircle2 className="w-3.5 h-3.5 text-black" />
                        <span>Approve</span>
                      </button>
                    )}
                    {r.status !== 'rejected' && (
                      <button
                        onClick={() => handleReviewAction(r.id, 'rejected')}
                        className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-white/10 border border-white/20 hover:bg-white/20 text-white text-xs font-semibold transition-colors cursor-pointer"
                      >
                        <XCircle className="w-3.5 h-3.5 text-white" />
                        <span>Reject</span>
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ------------------------------------------------------------------ */}
        {/* TAB 3: CLIENT PROJECTS */}
        {/* ------------------------------------------------------------------ */}
        {activeTab === 'projects' && (
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {projects.map(p => (
                <div key={p.id} className="card-depth p-6 rounded-2xl">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-base font-bold text-white">{p.title}</h3>
                    <span className="text-[10px] font-mono uppercase bg-white/10 text-white px-2 py-0.5 rounded border border-white/15">
                      {p.status}
                    </span>
                  </div>
                  <p className="text-xs text-neutral-400 mb-4">{p.summary}</p>
                  <div className="text-xs text-neutral-400 flex items-center justify-between border-t border-white/10 pt-3">
                    <span>Due: {p.due_date}</span>
                    <span className="font-mono text-white">{p.progress_percentage || 75}% Complete</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ------------------------------------------------------------------ */}
        {/* TAB 4: NEWSLETTER SUBSCRIBERS */}
        {/* ------------------------------------------------------------------ */}
        {activeTab === 'newsletter' && (
          <div className="card-depth p-6 rounded-3xl">
            <h3 className="text-base font-bold text-white mb-4">
              Mailing List Subscribers ({subscribers.length})
            </h3>
            <div className="divide-y divide-white/10">
              {subscribers.map((email, idx) => (
                <div key={idx} className="py-2.5 text-xs text-neutral-200 flex items-center justify-between">
                  <span>{email}</span>
                  <span className="text-[10px] font-mono text-neutral-400">Active Subscriber</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
