// Contact & Quote Request Page (/contact)
// Gradient backdrop, film-grain texture, aurora blooms, monochrome controls, no numbering in labels
import React, { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { 
  Send, 
  Calendar, 
  CheckCircle2, 
  Mail, 
  Phone, 
  MapPin, 
  AlertCircle
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { siteConfig } from '../../config/site.config';
import { getServices } from '../../content/services';
import { createLead } from '../../services/database';
import { uploadFile } from '../../services/storage';
import { sendNotification } from '../../services/notify';
import { isBookingConfigured, getBookingUrl } from '../../services/booking';
import { Breadcrumbs } from '../../components/Breadcrumbs';
import { NextStepCard } from '../../components/Card';

export const ContactPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const preselectedService = searchParams.get('service') || 'data-analytics-dashboards';
  const preselectedSubject = searchParams.get('subject') || '';
  const services = getServices();

  // Form fields
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [company, setCompany] = useState('');
  const [serviceSlug, setServiceSlug] = useState(preselectedService);
  const [budgetRange, setBudgetRange] = useState('$10k - $25k');
  const [message, setMessage] = useState(preselectedSubject ? `Regarding: ${preselectedSubject}\n\n` : '');
  const [file, setFile] = useState<File | null>(null);
  const [consent, setConsent] = useState(true);

  // Honeypot spam defense
  const [honeypot, setHoneypot] = useState('');
  const [formRenderTime, setFormRenderTime] = useState(Date.now());

  // Form status
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  // Active tab: 'quote' or 'calendar'
  const [activeTab, setActiveTab] = useState<'quote' | 'calendar'>('quote');

  useEffect(() => {
    setFormRenderTime(Date.now());
  }, []);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selected = e.target.files[0];
      if (selected.size > 5 * 1024 * 1024) {
        setErrorMsg('Selected file exceeds maximum 5 MB limit');
        return;
      }
      setFile(selected);
      setErrorMsg(null);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);

    if (honeypot.trim().length > 0) {
      setSubmitted(true);
      return;
    }

    if (Date.now() - formRenderTime < 1500) {
      setErrorMsg('Please take a moment to review before submitting.');
      return;
    }

    if (!consent) {
      setErrorMsg('Please acknowledge privacy consent to proceed.');
      return;
    }

    setSubmitting(true);

    try {
      let attachmentPath: string | undefined = undefined;
      if (file) {
        const uploadRes = await uploadFile('attachments', file);
        attachmentPath = uploadRes.path;
      }

      const leadPayload = {
        name,
        email,
        company,
        service_slug: serviceSlug,
        budget_range: budgetRange,
        message,
        attachment_path: attachmentPath,
        source_page: window.location.pathname
      };

      await createLead(leadPayload);
      sendNotification('lead', leadPayload);

      try {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 }
        });
      } catch (e) {
        // Safe if confetti fails
      }

      setSubmitted(true);
    } catch (err: any) {
      console.error(err);
      setErrorMsg(err.message || 'Submission failed. Please email us directly.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="pt-28 pb-20 min-h-screen bg-gradient-dark-section film-grain relative overflow-hidden">
      {/* Drifting aurora blooms */}
      <div className="pointer-events-none absolute top-10 left-10 w-[500px] h-[500px] rounded-full bg-[#4F46E5] opacity-20 blur-[130px] animate-aurora-1" />
      <div className="pointer-events-none absolute bottom-20 right-10 w-[450px] h-[450px] rounded-full bg-[#7C3AED] opacity-15 blur-[120px] animate-aurora-2" />

      <div className="max-w-[1200px] mx-auto px-4 md:px-8 relative z-10">
        <Breadcrumbs items={[{ label: 'Contact & Quotes' }]} />

        {/* Header */}
        <div className="max-w-3xl mb-12">
          <span className="text-xs font-mono uppercase tracking-widest text-neutral-400 block mb-3">
            Initiate Engagement
          </span>
          <h1 className="text-3xl md:text-5xl font-extrabold text-white tracking-tight leading-tight mb-6">
            Let’s discuss your technical architecture.
          </h1>
          <p className="text-base md:text-lg text-neutral-300 leading-relaxed">
            Submit your requirements for an itemized fixed-fee milestone proposal, or schedule a direct 30-minute discovery call with our leadership squad.
          </p>
        </div>

        {/* Tab switch between Quote Form and Calendar (Monochrome) */}
        <div className="flex items-center gap-2 mb-10 p-1.5 rounded-2xl bg-white/[0.04] border border-white/10 w-fit">
          <button
            onClick={() => setActiveTab('quote')}
            className={`px-5 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              activeTab === 'quote'
                ? 'bg-white text-black shadow-sm'
                : 'text-neutral-400 hover:text-white'
            }`}
          >
            Request a Quote (Proposal in 48h)
          </button>

          <button
            onClick={() => setActiveTab('calendar')}
            className={`px-5 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-2 ${
              activeTab === 'calendar'
                ? 'bg-white text-black shadow-sm'
                : 'text-neutral-400 hover:text-white'
            }`}
          >
            <Calendar className={`w-3.5 h-3.5 ${activeTab === 'calendar' ? 'text-black' : 'text-white'}`} />
            <span>Book Discovery Call (30 min)</span>
          </button>
        </div>

        {/* Content depending on active tab */}
        {activeTab === 'quote' ? (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start mb-20">
            {/* Left: Quote Request Form */}
            <div className="card-depth lg:col-span-8 p-8 md:p-10 rounded-3xl relative overflow-hidden">
              {submitted ? (
                <div className="py-12 text-center space-y-6">
                  <div className="w-16 h-16 rounded-full bg-white/10 text-white mx-auto flex items-center justify-center">
                    <CheckCircle2 className="w-8 h-8 text-white" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-white mb-2">
                      Quote Request Received!
                    </h3>
                    <p className="text-sm text-neutral-300 max-w-md mx-auto leading-relaxed">
                      Thank you, <strong className="text-white">{name}</strong>. Our engineering leads are reviewing your project specifications. We will send an itemized scope and timeline proposal to <strong className="text-white">{email}</strong> within 48 business hours.
                    </p>
                  </div>

                  <div className="pt-6 border-t border-white/10">
                    <span className="text-xs font-mono text-neutral-400 uppercase tracking-wider block mb-4">
                      Next Recommended Steps
                    </span>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-left">
                      <button
                        onClick={() => setActiveTab('calendar')}
                        className="p-4 rounded-2xl bg-white/[0.04] border border-white/10 hover:border-white/30 text-xs transition-colors cursor-pointer"
                      >
                        <div className="font-bold text-white mb-1 flex items-center gap-2">
                          <Calendar className="w-4 h-4 text-white" />
                          <span>Book an Introductory Call</span>
                        </div>
                        <span className="text-neutral-400">Lock in a 30-min discovery slot immediately.</span>
                      </button>

                      <Link
                        to="/work"
                        className="p-4 rounded-2xl bg-white/[0.04] border border-white/10 hover:border-white/30 text-xs transition-colors"
                      >
                        <div className="font-bold text-white mb-1 flex items-center gap-2">
                          <CheckCircle2 className="w-4 h-4 text-white" />
                          <span>Explore Case Studies</span>
                        </div>
                        <span className="text-neutral-400">Review real deliverables and metrics.</span>
                      </Link>
                    </div>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Honeypot field */}
                  <div className="hidden" aria-hidden="true">
                    <input
                      type="text"
                      name="bot_field"
                      tabIndex={-1}
                      autoComplete="off"
                      value={honeypot}
                      onChange={e => setHoneypot(e.target.value)}
                    />
                  </div>

                  {errorMsg && (
                    <div className="p-4 rounded-2xl bg-red-500/10 border border-red-500/20 text-xs text-red-300 flex items-center justify-between gap-3">
                      <div className="flex items-center gap-2">
                        <AlertCircle className="w-4 h-4 shrink-0" />
                        <span>{errorMsg}</span>
                      </div>
                      <a
                        href={`mailto:${siteConfig.ownerEmail}?subject=Quote%20Request`}
                        className="underline font-semibold shrink-0 text-white"
                      >
                        Email directly
                      </a>
                    </div>
                  )}

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label className="text-xs font-semibold text-neutral-300 block mb-2">
                        Your Full Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={name}
                        onChange={e => setName(e.target.value)}
                        placeholder="Isaac Ujay"
                        className="w-full px-4 py-3 rounded-xl bg-white/[0.05] border border-white/15 text-xs text-white focus:outline-none focus:border-white"
                      />
                    </div>

                    <div>
                      <label className="text-xs font-semibold text-neutral-300 block mb-2">
                        Work Email Address *
                      </label>
                      <input
                        type="email"
                        required
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                        placeholder="isaac@company.com"
                        className="w-full px-4 py-3 rounded-xl bg-white/[0.05] border border-white/15 text-xs text-white focus:outline-none focus:border-white"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label className="text-xs font-semibold text-neutral-300 block mb-2">
                        Company or Project Name
                      </label>
                      <input
                        type="text"
                        value={company}
                        onChange={e => setCompany(e.target.value)}
                        placeholder="Apex Technologies"
                        className="w-full px-4 py-3 rounded-xl bg-white/[0.05] border border-white/15 text-xs text-white focus:outline-none focus:border-white"
                      />
                    </div>

                    <div>
                      <label className="text-xs font-semibold text-neutral-300 block mb-2">
                        Service of Primary Interest *
                      </label>
                      <select
                        value={serviceSlug}
                        onChange={e => setServiceSlug(e.target.value)}
                        className="w-full px-4 py-3 rounded-xl bg-white/[0.05] border border-white/15 text-xs text-white focus:outline-none focus:border-white"
                      >
                        {services.map(s => (
                          <option key={s.slug} value={s.slug} className="bg-slate-900 text-white">
                            {s.title}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="text-xs font-semibold text-neutral-300 block mb-2">
                      Estimated Project Budget
                    </label>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                      {['< $5,000', '$5k - $10k', '$10k - $25k', '$25k+ / Retainer'].map((b) => (
                        <button
                          key={b}
                          type="button"
                          onClick={() => setBudgetRange(b)}
                          className={`p-2.5 rounded-xl text-xs font-medium border text-center transition-colors cursor-pointer ${
                            budgetRange === b
                              ? 'bg-white text-black font-bold border-white'
                              : 'bg-white/[0.03] border-white/10 text-neutral-400 hover:border-white/20'
                          }`}
                        >
                          {b}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="text-xs font-semibold text-neutral-300 block mb-2">
                      Project Description & Technical Goals *
                    </label>
                    <textarea
                      required
                      rows={4}
                      value={message}
                      onChange={e => setMessage(e.target.value)}
                      placeholder="Outline current data bottlenecks, data formats, required integrations, and timeline goals..."
                      className="w-full px-4 py-3 rounded-xl bg-white/[0.05] border border-white/15 text-xs text-white focus:outline-none focus:border-white resize-none"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-semibold text-neutral-300 block mb-2">
                      Optional Technical Spec or RFP (Max 5 MB)
                    </label>
                    <div className="flex items-center gap-3">
                      <input
                        type="file"
                        onChange={handleFileChange}
                        accept=".pdf,.docx,.txt,.csv,.xlsx,.png,.jpg"
                        className="w-full text-xs text-neutral-400 file:mr-4 file:py-2.5 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-semibold file:bg-white/10 file:text-white hover:file:bg-white hover:file:text-black cursor-pointer"
                      />
                      {file && (
                        <span className="text-[11px] font-mono text-white shrink-0">
                          ✓ {file.name}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Consent Checkbox */}
                  <div className="flex items-start gap-2.5 pt-2">
                    <input
                      type="checkbox"
                      id="consent-check"
                      checked={consent}
                      onChange={e => setConsent(e.target.checked)}
                      className="mt-1 accent-white cursor-pointer"
                    />
                    <label htmlFor="consent-check" className="text-xs text-neutral-400 leading-relaxed cursor-pointer">
                      I agree to allow IData to store and process this information to evaluate our project scope in accordance with the{' '}
                      <Link to="/privacy" className="text-white hover:underline">
                        Privacy Policy
                      </Link>.
                    </label>
                  </div>

                  <button
                    type="submit"
                    disabled={submitting}
                    className="w-full py-4 rounded-xl bg-white text-black font-bold text-sm hover:bg-neutral-200 transition-all flex items-center justify-center gap-2 cursor-pointer shadow-sm disabled:opacity-50"
                  >
                    <Send className="w-4 h-4 text-black" />
                    <span>{submitting ? 'Submitting Scope to Engineering...' : 'Submit Quote Request'}</span>
                  </button>
                </form>
              )}
            </div>

            {/* Right: Direct Contact & Office Info */}
            <div className="lg:col-span-4 space-y-6">
              <div className="card-depth p-6 rounded-3xl space-y-4">
                <span className="text-xs font-mono uppercase tracking-widest text-neutral-400 block">
                  Direct Communications
                </span>

                <div className="flex items-start gap-3 text-xs text-neutral-300">
                  <Mail className="w-4 h-4 text-white shrink-0 mt-0.5" />
                  <div>
                    <span className="block font-semibold text-white">Owner & Founder:</span>
                    <a href={`mailto:${siteConfig.ownerEmail}`} className="hover:text-white underline">
                      {siteConfig.ownerEmail}
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3 text-xs text-neutral-300">
                  <Phone className="w-4 h-4 text-white shrink-0 mt-0.5" />
                  <div>
                    <span className="block font-semibold text-white">Phone / WhatsApp:</span>
                    <span>{siteConfig.phone}</span>
                  </div>
                </div>

                <div className="flex items-start gap-3 text-xs text-neutral-300">
                  <MapPin className="w-4 h-4 text-white shrink-0 mt-0.5" />
                  <div>
                    <span className="block font-semibold text-white">Headquarters:</span>
                    <span>{siteConfig.headquarters}</span>
                  </div>
                </div>
              </div>

              <div className="card-depth p-6 rounded-3xl space-y-3">
                <h3 className="text-sm font-bold text-white">
                  What happens next?
                </h3>
                <div className="space-y-2 text-xs text-neutral-300">
                  <div className="flex items-start gap-2">
                    <span className="font-mono text-white">·</span>
                    <span>Direct review by Isaac and senior technical leadership within 24 hours.</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="font-mono text-white">·</span>
                    <span>Itemized scope breakdown with fixed sprint deliverables and pricing.</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="font-mono text-white">·</span>
                    <span>Onboarding into the private IData Client Portal upon contract agreement.</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          /* Calendar Embed View */
          <div className="card-depth mb-20 p-8 rounded-3xl max-w-4xl mx-auto">
            <div className="text-center mb-8">
              <span className="text-xs font-mono uppercase tracking-widest text-neutral-400 block mb-2">
                Live Scheduling
              </span>
              <h2 className="text-2xl font-bold text-white mb-2">
                Schedule a 30-Minute Technical Discovery
              </h2>
              <p className="text-xs text-neutral-400 max-w-md mx-auto">
                Pick a time slot that suits your schedule. We will review your architecture requirements over Google Meet.
              </p>
            </div>

            {isBookingConfigured() ? (
              <div className="w-full min-h-[600px] rounded-2xl overflow-hidden bg-white/5">
                <iframe
                  src={getBookingUrl()}
                  width="100%"
                  height="650"
                  frameBorder="0"
                  title="Calendly Discovery Call"
                  className="w-full"
                />
              </div>
            ) : (
              <div className="p-10 text-center rounded-2xl bg-white/[0.04] border border-white/10 max-w-lg mx-auto">
                <Calendar className="w-10 h-10 text-white mx-auto mb-3" />
                <h3 className="text-base font-bold text-white mb-2">
                  Direct Discovery via Email
                </h3>
                <p className="text-xs text-neutral-400 mb-6 leading-relaxed">
                  Calendly link has not been set yet. Contact founder Isaac Ujay directly to schedule your call.
                </p>
                <a
                  href={`mailto:${siteConfig.ownerEmail}?subject=IData%20Discovery%20Call`}
                  className="px-6 py-3 rounded-xl bg-white text-black font-bold text-xs inline-flex items-center gap-2"
                >
                  <Mail className="w-4 h-4 text-black" />
                  <span>Email {siteConfig.ownerEmail}</span>
                </a>
              </div>
            )}
          </div>
        )}

        {/* Next Step Band */}
        <div>
          <h3 className="text-xs font-mono uppercase tracking-wider text-neutral-400 mb-4">
            Next Steps
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <NextStepCard
              title="Explore Case Studies"
              description="See real metrics and architectures from previous client deliveries."
              to="/work"
            />
            <NextStepCard
              title="Client Portal Sign-In"
              description="Already an active partner? Follow your sprint milestones and deliverables."
              to="/portal"
            />
          </div>
        </div>
      </div>
    </div>
  );
};
