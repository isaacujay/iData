// Client Portal (/portal)
// Gradient backdrop, film grain, soft aurora blooms, monochrome controls, no numbering in labels
import React, { useState, useEffect } from 'react';
import { 
  Lock, 
  LogOut, 
  CheckCircle2, 
  Clock, 
  FileDown, 
  Send, 
  MessageSquare, 
  FolderGit2,
  AlertCircle
} from 'lucide-react';
import { getCurrentUser, signIn, signInAsDemo, signOut, UserProfile } from '../../services/auth';
import { 
  getProjectsForClient, 
  getMilestonesForProject, 
  getDeliverablesForProject, 
  getMessagesForProject, 
  sendProjectMessage 
} from '../../services/database';
import { Project, Milestone, Deliverable, Message } from '../../types';
import { Breadcrumbs } from '../../components/Breadcrumbs';

export const PortalPage: React.FC = () => {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);

  // Auth form
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [authError, setAuthError] = useState<string | null>(null);
  const [authLoading, setAuthLoading] = useState(false);

  // Portal data
  const [projects, setProjects] = useState<Project[]>([]);
  const [selectedProjectId, setSelectedProjectId] = useState<string | null>(null);
  const [milestones, setMilestones] = useState<Milestone[]>([]);
  const [deliverables, setDeliverables] = useState<Deliverable[]>([]);
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [sendingMessage, setSendingMessage] = useState(false);

  useEffect(() => {
    checkUser();
    const handleAuthChange = () => checkUser();
    window.addEventListener('auth-state-changed', handleAuthChange);
    return () => window.removeEventListener('auth-state-changed', handleAuthChange);
  }, []);

  const checkUser = async () => {
    try {
      const u = await getCurrentUser();
      setUser(u);
      if (u) {
        loadProjects(u.id);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const loadProjects = async (userId: string) => {
    try {
      const projs = await getProjectsForClient(userId);
      setProjects(projs);
      if (projs.length > 0) {
        setSelectedProjectId(projs[0].id);
        loadProjectDetails(projs[0].id);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const loadProjectDetails = async (projectId: string) => {
    try {
      const [m, d, msgs] = await Promise.all([
        getMilestonesForProject(projectId),
        getDeliverablesForProject(projectId),
        getMessagesForProject(projectId)
      ]);
      setMilestones(m);
      setDeliverables(d);
      setMessages(msgs);
    } catch (err) {
      console.error(err);
    }
  };

  const handleSelectProject = (projectId: string) => {
    setSelectedProjectId(projectId);
    loadProjectDetails(projectId);
  };

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError(null);
    setAuthLoading(true);

    try {
      await signIn(email, password);
    } catch (err: any) {
      setAuthError(err.message || 'Invalid email or password');
    } finally {
      setAuthLoading(false);
    }
  };

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim() || !selectedProjectId || !user) return;

    setSendingMessage(true);
    try {
      const sent = await sendProjectMessage(
        selectedProjectId,
        user.id,
        user.full_name,
        user.role,
        newMessage
      );
      setMessages(prev => [...prev, sent]);
      setNewMessage('');
    } catch (err) {
      console.error(err);
    } finally {
      setSendingMessage(false);
    }
  };

  const activeProject = projects.find(p => p.id === selectedProjectId);

  if (loading) {
    return (
      <div className="pt-32 pb-20 min-h-screen bg-gradient-dark-section flex items-center justify-center">
        <div className="w-8 h-8 rounded-full border-2 border-white border-t-transparent animate-spin" />
      </div>
    );
  }

  // Not signed in state
  if (!user) {
    return (
      <div className="pt-28 pb-20 min-h-screen bg-gradient-dark-section film-grain relative overflow-hidden">
        {/* Soft aurora bloom */}
        <div className="pointer-events-none absolute top-1/4 left-1/2 -translate-x-1/2 w-[550px] h-[550px] rounded-full bg-[#4F46E5] opacity-20 blur-[130px] animate-aurora-1" />

        <div className="max-w-[1200px] mx-auto px-4 md:px-8 relative z-10">
          <Breadcrumbs items={[{ label: 'Client Portal Login' }]} />

          <div className="card-depth max-w-md mx-auto my-12 p-8 md:p-10 rounded-3xl shadow-2xl relative overflow-hidden">
            <div className="text-center mb-8">
              <div className="w-12 h-12 rounded-2xl bg-white/10 text-white mx-auto flex items-center justify-center mb-4">
                <Lock className="w-6 h-6 text-white" />
              </div>
              <h1 className="text-2xl font-bold text-white mb-2">
                IData Client Portal
              </h1>
              <p className="text-xs text-neutral-400">
                Sign in to view real-time sprint milestones, deliverables, and project discussions.
              </p>
            </div>

            {authError && (
              <div className="mb-5 p-3 rounded-xl bg-red-500/10 border border-red-500/20 text-xs text-red-300 flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{authError}</span>
              </div>
            )}

            <form onSubmit={handleSignIn} className="space-y-4 mb-6">
              <div>
                <label className="text-xs font-medium text-neutral-300 block mb-1">
                  Client Email Address
                </label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  placeholder="client@company.com"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-white/[0.05] border border-white/15 text-xs text-white focus:outline-none focus:border-white"
                />
              </div>

              <div>
                <label className="text-xs font-medium text-neutral-300 block mb-1">
                  Access Password
                </label>
                <input
                  type="password"
                  required
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-white/[0.05] border border-white/15 text-xs text-white focus:outline-none focus:border-white"
                />
              </div>

              <button
                type="submit"
                disabled={authLoading}
                className="w-full py-3 rounded-xl bg-white text-black font-bold text-xs hover:bg-neutral-200 transition-all cursor-pointer disabled:opacity-50"
              >
                {authLoading ? 'Signing in...' : 'Sign In to Portal'}
              </button>
            </form>

            {/* Instant Demo Account Login Trigger */}
            <div className="pt-6 border-t border-white/10 text-center">
              <span className="text-[11px] font-mono text-neutral-400 uppercase block mb-3">
                Or Test in Demo Mode:
              </span>
              <button
                onClick={() => signInAsDemo('client')}
                className="w-full py-2.5 px-4 rounded-xl bg-white/10 border border-white/20 hover:bg-white/20 text-xs font-semibold text-white transition-colors cursor-pointer"
              >
                Instant Access as Demo Client (Apex Capital)
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Authenticated Portal Dashboard View
  return (
    <div className="pt-28 pb-20 min-h-screen bg-gradient-dark-section film-grain relative overflow-hidden">
      {/* Drifting aurora blooms */}
      <div className="pointer-events-none absolute top-10 left-1/4 w-[500px] h-[500px] rounded-full bg-[#4F46E5] opacity-20 blur-[130px] animate-aurora-1" />
      <div className="pointer-events-none absolute bottom-10 right-10 w-[450px] h-[450px] rounded-full bg-[#7C3AED] opacity-15 blur-[120px] animate-aurora-2" />

      <div className="max-w-[1200px] mx-auto px-4 md:px-8 relative z-10">
        {/* Top Header with User Info & Logout */}
        <div className="card-depth flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6 rounded-3xl mb-8">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-white/10 border border-white/20 flex items-center justify-center font-bold text-base text-white">
              {user.full_name.charAt(0)}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-lg font-bold text-white">
                  {user.full_name}
                </h1>
                <span className="text-[10px] font-mono text-neutral-300 bg-white/10 px-2 py-0.5 rounded border border-white/15 uppercase">
                  {user.company || 'Client'}
                </span>
              </div>
              <p className="text-xs text-neutral-400">
                Signed in as {user.email} · Role: {user.role}
              </p>
            </div>
          </div>

          <button
            onClick={() => signOut()}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-xs font-medium text-white transition-colors cursor-pointer self-start sm:self-center"
          >
            <LogOut className="w-4 h-4 text-white" />
            <span>Sign Out</span>
          </button>
        </div>

        {/* Project Selector (if multiple) */}
        {projects.length > 1 && (
          <div className="flex items-center gap-2 mb-8 overflow-x-auto pb-2">
            {projects.map(p => (
              <button
                key={p.id}
                onClick={() => handleSelectProject(p.id)}
                className={`px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-colors cursor-pointer ${
                  selectedProjectId === p.id
                    ? 'bg-white text-black font-bold'
                    : 'bg-white/5 text-neutral-400 border border-white/10'
                }`}
              >
                {p.title}
              </button>
            ))}
          </div>
        )}

        {activeProject ? (
          <div className="space-y-8">
            {/* Project Overview Card */}
            <div className="card-depth p-8 rounded-3xl relative overflow-hidden">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-6">
                <div>
                  <span className="text-xs font-mono text-neutral-400 uppercase tracking-wider block mb-1">
                    Active Engagement
                  </span>
                  <h2 className="text-2xl font-bold text-white">
                    {activeProject.title}
                  </h2>
                  <p className="text-xs text-neutral-300 mt-1 max-w-xl">
                    {activeProject.summary}
                  </p>
                </div>

                <div className="text-left md:text-right shrink-0">
                  <span className="text-xs text-neutral-400 block mb-1">Project Status</span>
                  <span className="px-3 py-1 rounded-full text-xs font-bold font-mono uppercase bg-white/10 text-white border border-white/20">
                    {activeProject.status}
                  </span>
                </div>
              </div>

              {/* Progress Bar */}
              <div>
                <div className="flex justify-between text-xs text-neutral-300 mb-2 font-mono">
                  <span>Sprint Completion</span>
                  <span className="text-white font-bold">{activeProject.progress_percentage || 75}%</span>
                </div>
                <div className="w-full h-2.5 bg-white/10 rounded-full overflow-hidden border border-white/10">
                  <div
                    className="h-full bg-white rounded-full transition-all duration-700"
                    style={{ width: `${activeProject.progress_percentage || 75}%` }}
                  />
                </div>
              </div>
            </div>

            {/* Split: Milestones vs Deliverables & Messages */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              {/* Left Column: Milestones */}
              <div className="lg:col-span-7 space-y-4">
                <div className="card-depth p-6 rounded-3xl">
                  <h3 className="text-base font-bold text-white mb-4 flex items-center gap-2">
                    <FolderGit2 className="w-4 h-4 text-white" />
                    <span>Sprint Milestones & Delivery Stages</span>
                  </h3>

                  <div className="space-y-4">
                    {milestones.map((m) => (
                      <div
                        key={m.id}
                        className="p-4 rounded-2xl bg-white/[0.04] border border-white/10 flex items-start justify-between gap-4"
                      >
                        <div className="flex items-start gap-3">
                          <div className="mt-0.5 shrink-0">
                            {m.status === 'completed' ? (
                              <CheckCircle2 className="w-5 h-5 text-white" />
                            ) : m.status === 'in_progress' ? (
                              <Clock className="w-5 h-5 text-neutral-300 animate-pulse" />
                            ) : (
                              <div className="w-5 h-5 rounded-full border-2 border-white/20" />
                            )}
                          </div>
                          <div>
                            <h4 className="text-sm font-semibold text-white">
                              {m.title}
                            </h4>
                            <p className="text-xs text-neutral-400 mt-1">
                              {m.description}
                            </p>
                          </div>
                        </div>

                        <span className="text-[10px] font-mono uppercase tracking-wider text-neutral-400 shrink-0 mt-1">
                          {m.due_date}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Published Deliverables */}
                <div className="card-depth p-6 rounded-3xl">
                  <h3 className="text-base font-bold text-white mb-4 flex items-center gap-2">
                    <FileDown className="w-4 h-4 text-white" />
                    <span>Published Deliverables & Signed Files</span>
                  </h3>

                  <div className="space-y-3">
                    {deliverables.length > 0 ? (
                      deliverables.map(d => (
                        <div
                          key={d.id}
                          className="p-4 rounded-2xl bg-white/[0.04] border border-white/10 flex items-center justify-between gap-4"
                        >
                          <div className="flex items-center gap-3 min-w-0">
                            <FileDown className="w-4 h-4 text-white shrink-0" />
                            <div className="min-w-0">
                              <span className="text-xs font-semibold text-white truncate block">
                                {d.title}
                              </span>
                              <span className="text-[10px] text-neutral-400">
                                {d.file_size || '2.4 MB'}
                              </span>
                            </div>
                          </div>

                          <a
                            href={d.file_path}
                            download
                            onClick={e => {
                              if (d.file_path.startsWith('/deliverables')) {
                                e.preventDefault();
                                alert(`[Demo Mode] Simulated download of ${d.title}. In live mode, this serves a pre-signed Supabase storage URL.`);
                              }
                            }}
                            className="px-3 py-1.5 rounded-lg bg-white text-black text-xs font-bold hover:bg-neutral-200 transition-colors shrink-0"
                          >
                            Download
                          </a>
                        </div>
                      ))
                    ) : (
                      <div className="text-xs text-neutral-400 text-center py-4">
                        No signed deliverables published yet for this project.
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Right Column: Project Conversation */}
              <div className="card-depth lg:col-span-5 p-6 rounded-3xl flex flex-col h-[580px]">
                <h3 className="text-base font-bold text-white mb-4 flex items-center gap-2 pb-3 border-b border-white/10">
                  <MessageSquare className="w-4 h-4 text-white" />
                  <span>Project Squad Chat</span>
                </h3>

                {/* Messages feed */}
                <div className="flex-1 overflow-y-auto space-y-3 pr-2 mb-4">
                  {messages.map(m => {
                    const isMe = m.sender_id === user.id;
                    return (
                      <div
                        key={m.id}
                        className={`p-3.5 rounded-2xl text-xs max-w-[85%] ${
                          isMe
                            ? 'ml-auto bg-white text-black font-medium'
                            : 'bg-white/10 text-white border border-white/10'
                        }`}
                      >
                        <div className={`text-[10px] font-semibold mb-1 ${isMe ? 'text-black/70' : 'text-neutral-400'}`}>
                          {m.sender_name} ({m.sender_role})
                        </div>
                        <p className="leading-relaxed whitespace-pre-wrap">{m.body}</p>
                      </div>
                    );
                  })}
                </div>

                {/* Message input */}
                <form onSubmit={handleSendMessage} className="flex items-center gap-2 pt-3 border-t border-white/10">
                  <input
                    type="text"
                    value={newMessage}
                    onChange={e => setNewMessage(e.target.value)}
                    placeholder="Send a message to your IData squad..."
                    className="flex-1 px-3 py-2.5 rounded-xl bg-white/[0.05] border border-white/15 text-xs text-white focus:outline-none focus:border-white"
                  />
                  <button
                    type="submit"
                    disabled={sendingMessage || !newMessage.trim()}
                    className="p-2.5 rounded-xl bg-white text-black hover:bg-neutral-200 transition-colors disabled:opacity-50 cursor-pointer"
                  >
                    <Send className="w-4 h-4 text-black" />
                  </button>
                </form>
              </div>
            </div>
          </div>
        ) : (
          <div className="card-depth p-12 text-center rounded-3xl">
            <h3 className="text-lg font-bold text-white mb-2">No Active Projects Found</h3>
            <p className="text-xs text-neutral-400">
              Your account is active. As soon as a Statement of Work is executed, your project will appear here.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
