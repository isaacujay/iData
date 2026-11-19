import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { ArrowRight, Calendar, ChevronDown, Search, X } from 'lucide-react';
import { navigationConfig } from '../../config/navigation';

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenSearch: () => void;
  onOpenBooking: () => void;
}

export const MobileMenu: React.FC<MobileMenuProps> = ({ isOpen, onClose, onOpenSearch, onOpenBooking }) => {
  const location = useLocation();
  const reduceMotion = useReducedMotion();
  const [servicesOpen, setServicesOpen] = useState(false);

  useEffect(() => {
    onClose();
  }, [location.pathname]);

  useEffect(() => {
    if (!isOpen) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      document.body.style.overflow = previous;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: reduceMotion ? 0 : 0.18 }}
          className="fixed inset-0 z-[70] bg-[#030712]/98 backdrop-blur-2xl lg:hidden"
          role="dialog"
          aria-modal="true"
          aria-label="Mobile navigation"
        >
          <button aria-label="Close navigation menu" onClick={onClose} className="absolute inset-0 h-full w-full cursor-default" tabIndex={-1} />
          <motion.div
            initial={{ x: reduceMotion ? 0 : '100%' }}
            animate={{ x: 0 }}
            exit={{ x: reduceMotion ? 0 : '100%' }}
            transition={{ duration: reduceMotion ? 0 : 0.24, ease: 'easeOut' }}
            className="absolute right-0 top-0 flex h-full w-[min(92%,420px)] flex-col border-l border-white/10 bg-[#070b14] p-5 shadow-2xl"
          >
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <Link to="/" onClick={onClose} aria-label="IData home">
                <img src="/brand/logo.svg" alt="IData" className="h-8 w-auto" />
              </Link>
              <div className="flex items-center gap-2">
                <button type="button" onClick={() => { onClose(); onOpenSearch(); }} aria-label="Search" className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/70">
                  <Search className="h-4 w-4" />
                </button>
                <button type="button" onClick={onClose} aria-label="Close menu" className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/70">
                  <X className="h-5 w-5" />
                </button>
              </div>
            </div>

            <nav aria-label="Mobile primary navigation" className="flex-1 overflow-y-auto py-5">
              {navigationConfig.primary.map(item => (
                item.children ? (
                  <div key={item.id} className="border-b border-white/10">
                    <button
                      type="button"
                      aria-expanded={servicesOpen}
                      aria-controls="mobile-services"
                      onClick={() => setServicesOpen(current => !current)}
                      className="flex w-full items-center justify-between py-4 text-left text-lg font-bold text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-white/70"
                    >
                      {item.label}
                      <ChevronDown className={`h-5 w-5 transition-transform ${servicesOpen ? 'rotate-180' : ''}`} />
                    </button>
                    <AnimatePresence initial={false}>
                      {servicesOpen && (
                        <motion.div
                          id="mobile-services"
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: reduceMotion ? 0 : 0.18 }}
                          className="overflow-hidden"
                        >
                          <Link to="/services" onClick={onClose} className="block py-3 text-sm font-semibold text-neutral-200">Services Overview</Link>
                          {item.children.map(child => (
                            <Link key={child.path} to={child.path} onClick={onClose} className="block border-t border-white/[0.06] py-3.5">
                              <div className="text-sm font-semibold text-white">{child.label}</div>
                              {child.description && <div className="mt-1 text-xs leading-relaxed text-neutral-400">{child.description}</div>}
                            </Link>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ) : (
                  <Link key={item.id} to={item.path} onClick={onClose} className="block border-b border-white/10 py-4 text-lg font-bold text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-white/70">
                    {item.label}
                  </Link>
                )
              ))}

              <Link to="/portal" onClick={onClose} className="block py-4 text-base font-semibold text-neutral-300">Client Portal</Link>
              <Link to="/admin" onClick={onClose} className="block text-sm text-neutral-500">Admin Console</Link>
            </nav>

            <div className="grid grid-cols-1 gap-3 border-t border-white/10 pt-4">
              <Link to="/contact" onClick={onClose} className="flex min-h-12 items-center justify-center gap-2 rounded-xl bg-white px-5 text-sm font-bold text-black">
                Request a Quote <ArrowRight className="h-4 w-4" />
              </Link>
              <button type="button" onClick={() => { onClose(); onOpenBooking(); }} className="flex min-h-12 items-center justify-center gap-2 rounded-xl border border-white/20 text-sm font-semibold text-white">
                <Calendar className="h-4 w-4" /> Book a 30-min Call
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
