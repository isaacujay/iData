// Full-Screen Animated Menu Overlay
// Gradient backdrop, soft ambient blooms, zero numbering in section labels, pure monochrome typography & buttons
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Search, ArrowRight, Calendar } from 'lucide-react';
import { siteConfig } from '../config/site.config';
import { getServices } from '../content/services';

export interface FullScreenMenuProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenSearch: () => void;
  onOpenBooking: () => void;
}

export const FullScreenMenu: React.FC<FullScreenMenuProps> = ({
  isOpen,
  onClose,
  onOpenSearch,
  onOpenBooking
}) => {
  const services = getServices();
  const navigate = useNavigate();

  const handleLinkClick = (path: string) => {
    navigate(path);
    onClose();
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.05, delayChildren: 0.1 }
    },
    exit: {
      opacity: 0,
      transition: { duration: 0.2 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 12 },
    show: { opacity: 1, y: 0, transition: { duration: 0.3 } },
    exit: { opacity: 0, y: 8 }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 bg-gradient-to-b from-[#030712] via-[#0b1120] to-[#030712] backdrop-blur-2xl flex flex-col justify-between p-6 md:p-12 overflow-y-auto overflow-x-hidden relative"
        >
          {/* Drifting soft color blooms in background */}
          <div className="pointer-events-none absolute -top-40 -left-40 w-96 h-96 rounded-full bg-[#4F46E5] opacity-25 blur-[120px] animate-aurora-1" />
          <div className="pointer-events-none absolute top-1/2 -right-40 w-96 h-96 rounded-full bg-[#7C3AED] opacity-20 blur-[130px] animate-aurora-2" />
          <div className="pointer-events-none absolute -bottom-40 left-1/3 w-96 h-96 rounded-full bg-[#38BDF8] opacity-15 blur-[120px] animate-aurora-3" />

          {/* Top Bar inside Menu */}
          <div className="relative z-10 flex items-center justify-between border-b border-white/10 pb-6">
            <Link to="/" onClick={onClose} className="flex items-center gap-2">
              <img src="/brand/logo.svg" alt="IData" className="h-8 w-auto" />
            </Link>

            <div className="flex items-center gap-3">
              <button
                onClick={() => {
                  onClose();
                  onOpenSearch();
                }}
                className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-white/10 hover:bg-white/15 text-xs text-white transition-colors border border-white/10 cursor-pointer"
              >
                <Search className="w-3.5 h-3.5 text-white" />
                <span className="hidden sm:inline">Search...</span>
                <kbd className="hidden sm:inline px-1 bg-black/40 rounded text-[10px]">Ctrl+K</kbd>
              </button>

              <button
                onClick={onClose}
                aria-label="Close menu"
                className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors cursor-pointer border border-white/10"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Nav Links Grid (No numbering) */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="show"
            exit="exit"
            className="relative z-10 my-auto py-8 grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12"
          >
            {/* Column 1: Services & Sub-Pages */}
            <div>
              <div className="text-xs font-mono uppercase tracking-widest text-neutral-400 mb-4">
                Services & Capabilities
              </div>
              <div className="space-y-4">
                <motion.div variants={itemVariants}>
                  <button
                    onClick={() => handleLinkClick('/services')}
                    className="text-2xl md:text-3xl font-extrabold text-white hover:text-neutral-300 transition-colors text-left cursor-pointer"
                  >
                    Services Overview
                  </button>
                </motion.div>

                <div className="pt-2 pl-3 space-y-2.5 border-l border-white/10">
                  {services.map(svc => (
                    <motion.div key={svc.id} variants={itemVariants}>
                      <button
                        onClick={() => handleLinkClick(`/services/${svc.slug}`)}
                        className="text-sm font-medium text-neutral-300 hover:text-white transition-colors block text-left cursor-pointer"
                      >
                        {svc.title}
                      </button>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>

            {/* Column 2: Company */}
            <div>
              <div className="text-xs font-mono uppercase tracking-widest text-neutral-400 mb-4">
                Agency & Proof
              </div>
              <div className="space-y-4">
                {[
                  { label: 'Work & Demos', path: '/work' },
                  { label: 'Client Reviews', path: '/reviews' },
                  { label: 'Leadership & Team', path: '/team' },
                  { label: 'About & Delivery', path: '/about' },
                  { label: 'Contact & Quotes', path: '/contact' },
                ].map((item, idx) => (
                  <motion.div key={idx} variants={itemVariants}>
                    <button
                      onClick={() => handleLinkClick(item.path)}
                      className="text-2xl md:text-3xl font-extrabold text-white hover:text-neutral-300 transition-colors text-left block cursor-pointer"
                    >
                      {item.label}
                    </button>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Column 3: Client Area & Quick Actions */}
            <div>
              <div className="text-xs font-mono uppercase tracking-widest text-neutral-400 mb-4">
                Client Area & Actions
              </div>
              <div className="space-y-4 mb-8">
                <motion.div variants={itemVariants}>
                  <button
                    onClick={() => handleLinkClick('/portal')}
                    className="text-2xl md:text-3xl font-extrabold text-white hover:text-neutral-300 transition-colors text-left block cursor-pointer"
                  >
                    Client Portal
                  </button>
                  <p className="text-xs text-neutral-400 mt-1">
                    Sign in to track active sprint milestones and deliverables
                  </p>
                </motion.div>

                <motion.div variants={itemVariants}>
                  <button
                    onClick={() => handleLinkClick('/admin')}
                    className="text-sm font-semibold text-neutral-300 hover:text-white transition-colors block cursor-pointer"
                  >
                    Admin Console (IData Team)
                  </button>
                </motion.div>
              </div>

              {/* Action Buttons (Strict Monochrome: White fill / Outline) */}
              <div className="space-y-3 pt-4 border-t border-white/10">
                <button
                  onClick={() => handleLinkClick('/contact')}
                  className="w-full py-3.5 px-5 rounded-xl bg-white text-black font-bold text-sm hover:bg-neutral-200 transition-all flex items-center justify-center gap-2 cursor-pointer shadow-md"
                >
                  <span>Request a Quote</span>
                  <ArrowRight className="w-4 h-4 text-black" />
                </button>

                <button
                  onClick={() => {
                    onClose();
                    onOpenBooking();
                  }}
                  className="w-full py-3.5 px-5 rounded-xl bg-transparent border border-white/20 text-white font-semibold text-sm hover:bg-white/10 transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Calendar className="w-4 h-4 text-white" />
                  <span>Book a 30-min Call</span>
                </button>
              </div>
            </div>
          </motion.div>

          {/* Bottom Footer inside Menu */}
          <div className="relative z-10 pt-6 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-neutral-400">
            <div className="flex items-center gap-6">
              <a href={siteConfig.social.linkedin} target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">
                LinkedIn
              </a>
              <a href={siteConfig.social.github} target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">
                GitHub
              </a>
              <a href={siteConfig.social.twitter} target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">
                X / Twitter
              </a>
            </div>
            <div className="text-center md:text-right">
              {siteConfig.headquarters} · <a href={`mailto:${siteConfig.ownerEmail}`} className="text-white hover:underline">{siteConfig.ownerEmail}</a>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
