// Professional footer with CTA top band, 4 columns, newsletter signup, and bottom bar
// Gradient depth, soft ambient glow, pure monochrome typography & buttons
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Calendar, ArrowUp, CheckCircle2 } from 'lucide-react';
import { siteConfig } from '../config/site.config';
import { getServices } from '../content/services';
import { subscribeNewsletter } from '../services/database';
import { sendNotification } from '../services/notify';

export interface FooterProps {
  onOpenBooking?: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenBooking = () => {} }) => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  const [loading, setLoading] = useState(false);
  const services = getServices();

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes('@')) return;

    setLoading(true);
    try {
      await subscribeNewsletter(email);
      sendNotification('newsletter', { email });
      setSubscribed(true);
      setEmail('');
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative bg-gradient-to-b from-[#070d18] via-[#030712] to-[#010409] border-t border-white/10 pt-16 pb-24 md:pb-16 overflow-hidden">
      {/* Soft ambient drifting color glow in background */}
      <div className="pointer-events-none absolute bottom-0 left-1/2 -translate-x-1/2 w-3/4 h-72 bg-gradient-to-t from-[#4F46E5]/15 via-[#7C3AED]/10 to-transparent blur-3xl opacity-60" />

      <div className="max-w-[1200px] mx-auto px-4 md:px-8 relative z-10">
        {/* Top Band: Short CTA */}
        <div className="card-depth p-8 md:p-12 rounded-3xl flex flex-col md:flex-row items-center justify-between gap-6 mb-16 shadow-2xl relative overflow-hidden">
          <div className="pointer-events-none absolute -right-20 -top-20 w-80 h-80 rounded-full bg-[#4F46E5]/15 blur-3xl" />
          
          <div className="max-w-xl text-center md:text-left relative z-10">
            <h3 className="text-2xl md:text-3xl font-extrabold text-white tracking-tight mb-2">
              Ready to turn business data into production systems?
            </h3>
            <p className="text-sm text-neutral-300 leading-relaxed">
              Book a free 30-minute discovery call or send us your technical scope for an itemized milestone proposal.
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-3 shrink-0 relative z-10">
            <Link
              to="/contact"
              className="px-6 py-3 rounded-xl bg-white text-black font-bold text-sm hover:bg-neutral-200 transition-all flex items-center gap-2 shadow-sm cursor-pointer"
            >
              <span>Request a Quote</span>
              <ArrowRight className="w-4 h-4 text-black" />
            </Link>

            <button
              onClick={onOpenBooking}
              className="px-6 py-3 rounded-xl bg-white/10 border border-white/20 text-white font-semibold text-sm hover:bg-white/20 transition-all flex items-center gap-2 cursor-pointer"
            >
              <Calendar className="w-4 h-4 text-white" />
              <span>Book a Call</span>
            </button>
          </div>
        </div>

        {/* Four Columns Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 pb-12 border-b border-white/10">
          {/* Column 1: Brand Block */}
          <div className="md:col-span-1">
            <Link to="/" className="inline-block mb-4">
              <img src="/brand/logo.svg" alt="IData" className="h-8 w-auto" />
            </Link>
            <p className="text-xs text-neutral-400 leading-relaxed mb-6">
              {siteConfig.tagline}
            </p>
            <div className="flex items-center gap-3 text-xs text-neutral-400">
              <a href={siteConfig.social.linkedin} target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">
                LinkedIn
              </a>
              <span>·</span>
              <a href={siteConfig.social.github} target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">
                GitHub
              </a>
              <span>·</span>
              <a href={siteConfig.social.twitter} target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">
                X (Twitter)
              </a>
            </div>
          </div>

          {/* Column 2: Services */}
          <div>
            <div className="text-xs font-mono uppercase tracking-wider text-neutral-300 mb-4">
              Services
            </div>
            <ul className="space-y-2.5 text-xs text-neutral-400">
              {services.map(s => (
                <li key={s.id}>
                  <Link to={`/services/${s.slug}`} className="hover:text-white transition-colors">
                    {s.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Company */}
          <div>
            <div className="text-xs font-mono uppercase tracking-wider text-neutral-300 mb-4">
              Company
            </div>
            <ul className="space-y-2.5 text-xs text-neutral-400">
              <li>
                <Link to="/about" className="hover:text-white transition-colors">
                  About & Process
                </Link>
              </li>
              <li>
                <Link to="/team" className="hover:text-white transition-colors">
                  Leadership & Team
                </Link>
              </li>
              <li>
                <Link to="/work" className="hover:text-white transition-colors">
                  Work & Demos
                </Link>
              </li>
              <li>
                <Link to="/reviews" className="hover:text-white transition-colors">
                  Client Reviews
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-white transition-colors">
                  Contact & Booking
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Client Area & Newsletter */}
          <div>
            <div className="text-xs font-mono uppercase tracking-wider text-neutral-300 mb-4">
              Client Area & Updates
            </div>
            <ul className="space-y-2.5 text-xs text-neutral-400 mb-6">
              <li>
                <Link to="/portal" className="text-white hover:underline font-medium">
                  Client Portal Sign-In →
                </Link>
              </li>
              <li>
                <a href={`mailto:${siteConfig.supportEmail}`} className="hover:text-white transition-colors">
                  Support: {siteConfig.supportEmail}
                </a>
              </li>
              <li>
                <Link to="/about#faqs" className="hover:text-white transition-colors">
                  Delivery FAQs
                </Link>
              </li>
            </ul>

            {/* Newsletter form (Monochrome button) */}
            <form onSubmit={handleSubscribe} className="space-y-2">
              <span className="text-[11px] text-neutral-400 block">
                Engineering newsletter & quarterly data briefs:
              </span>
              <div className="flex items-center gap-2">
                <input
                  type="email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  required
                  className="w-full px-3 py-2 text-xs bg-white/5 border border-white/15 rounded-lg text-white placeholder-neutral-500 focus:outline-none focus:border-white"
                />
                <button
                  type="submit"
                  disabled={loading || subscribed}
                  className="px-3 py-2 bg-white text-black text-xs font-bold rounded-lg hover:bg-neutral-200 transition-colors shrink-0 cursor-pointer"
                >
                  {subscribed ? <CheckCircle2 className="w-4 h-4 text-black" /> : 'Join'}
                </button>
              </div>
              {subscribed && (
                <span className="text-[10px] text-neutral-300 block">
                  Subscribed! Welcome to IData updates.
                </span>
              )}
            </form>
          </div>
        </div>

        {/* Bottom Bar: Copyright, Legal, Back to Top */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-neutral-400">
          <div>
            © {new Date().getFullYear()} {siteConfig.legalName}. All rights reserved.
          </div>

          <div className="flex items-center gap-6">
            <Link to="/privacy" className="hover:text-white transition-colors">
              Privacy Policy
            </Link>
            <Link to="/terms" className="hover:text-white transition-colors">
              Terms of Service
            </Link>
            <button
              onClick={scrollToTop}
              className="flex items-center gap-1.5 hover:text-white transition-colors cursor-pointer"
            >
              <span>Back to top</span>
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
