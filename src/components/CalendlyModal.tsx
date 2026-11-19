// Modal popup for Calendly 30-minute booking embed with graceful fallback
import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Calendar, Mail, AlertCircle } from 'lucide-react';
import { getBookingUrl, isBookingConfigured, loadCalendlyScript } from '../services/booking';
import { siteConfig } from '../config/site.config';

export interface CalendlyModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CalendlyModal: React.FC<CalendlyModalProps> = ({ isOpen, onClose }) => {
  const [loaded, setLoaded] = useState(false);
  const bookingUrl = getBookingUrl();
  const configured = isBookingConfigured();

  useEffect(() => {
    if (isOpen && configured) {
      loadCalendlyScript().then(() => setLoaded(true));
    }
  }, [isOpen, configured]);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-6">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/80 backdrop-blur-md"
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 15 }}
            transition={{ duration: 0.2 }}
            className="relative w-full max-w-3xl bg-gradient-to-b from-[#111624] via-[#090d18] to-[#04060c] border border-white/20 rounded-3xl overflow-hidden shadow-2xl z-10 max-h-[90vh] flex flex-col card-depth"
          >
            {/* Ambient glows */}
            <div className="pointer-events-none absolute -top-20 -right-20 w-72 h-72 rounded-full bg-[#4F46E5]/15 blur-3xl" />
            <div className="pointer-events-none absolute -bottom-20 -left-20 w-72 h-72 rounded-full bg-[#38BDF8]/10 blur-3xl" />

            {/* Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-white/10 bg-white/5 relative z-10">
              <div className="flex items-center gap-2">
                <Calendar className="w-5 h-5 text-white" />
                <h3 className="text-base font-bold text-white">
                  Schedule Discovery Call (30 mins)
                </h3>
              </div>
              <button
                onClick={onClose}
                aria-label="Close modal"
                className="p-1 rounded-lg text-neutral-400 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Content Area */}
            <div className="flex-1 overflow-y-auto p-4 md:p-6 min-h-[500px] relative z-10">
              {configured ? (
                <div className="w-full h-full min-h-[550px]">
                  <iframe
                    src={bookingUrl}
                    width="100%"
                    height="550"
                    frameBorder="0"
                    title="Schedule a Discovery Call with IData"
                    className="rounded-xl w-full"
                  />
                </div>
              ) : (
                <div className="p-8 text-center flex flex-col items-center justify-center my-auto">
                  <div className="w-14 h-14 rounded-full bg-white/10 border border-white/20 flex items-center justify-center mb-4 text-white">
                    <Mail className="w-7 h-7" />
                  </div>
                  <h4 className="text-xl font-bold text-white mb-2">
                    Book Directly via Email
                  </h4>
                  <p className="text-sm text-neutral-400 max-w-md mb-6 leading-relaxed">
                    Calendly integration is currently in demo mode. Contact our founder and leadership team directly to schedule your 30-minute consultation.
                  </p>
                  <a
                    href={`mailto:${siteConfig.ownerEmail}?subject=IData%20Discovery%20Call%20Request`}
                    className="px-6 py-3 rounded-xl bg-white text-black font-bold text-sm hover:bg-neutral-200 transition-colors inline-flex items-center gap-2 cursor-pointer shadow-sm"
                  >
                    <Mail className="w-4 h-4 text-black" />
                    <span>Email {siteConfig.ownerEmail}</span>
                  </a>
                </div>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
