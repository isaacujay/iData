import React, { useEffect, useRef, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { ArrowRight, BarChart3, Bot, Calendar, ChevronDown, Code, LineChart, LockKeyhole } from 'lucide-react';
import { navigationConfig, NavItem } from '../../config/navigation';

interface DesktopNavProps {
  onOpenBooking: () => void;
}

const serviceIcons = { Bot, BarChart3, LineChart, Code };

export const DesktopNav: React.FC<DesktopNavProps> = ({ onOpenBooking }) => {
  const location = useLocation();
  const reduceMotion = useReducedMotion();
  const [openId, setOpenId] = useState<string | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const triggerRefs = useRef<Record<string, HTMLButtonElement | null>>({});
  const openTimer = useRef<number | null>(null);
  const closeTimer = useRef<number | null>(null);

  const clearTimers = () => {
    if (openTimer.current) window.clearTimeout(openTimer.current);
    if (closeTimer.current) window.clearTimeout(closeTimer.current);
  };

  const openWithIntent = (id: string) => {
    clearTimers();
    openTimer.current = window.setTimeout(() => setOpenId(id), 120);
  };

  const closeWithIntent = () => {
    clearTimers();
    closeTimer.current = window.setTimeout(() => setOpenId(null), 120);
  };

  useEffect(() => {
    setOpenId(null);
  }, [location.pathname]);

  useEffect(() => {
    const handlePointerDown = (event: PointerEvent) => {
      if (!containerRef.current?.contains(event.target as Node)) setOpenId(null);
    };
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && openId) {
        event.preventDefault();
        const trigger = openId === 'services' ? triggerRefs.current.services : triggerRefs.current['client-area'];
        setOpenId(null);
        trigger?.focus();
      }
    };
    let previousScroll = window.scrollY;
    const handleScroll = () => {
      if (window.scrollY > previousScroll + 2) setOpenId(null);
      previousScroll = window.scrollY;
    };
    document.addEventListener('pointerdown', handlePointerDown);
    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      document.removeEventListener('pointerdown', handlePointerDown);
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('scroll', handleScroll);
      clearTimers();
    };
  }, [openId]);

  const isActive = (item: NavItem) => {
    if (item.path === '/') return location.pathname === '/';
    return item.path === '/services'
      ? location.pathname.startsWith('/services')
      : location.pathname === item.path;
  };

  const handleTriggerKeyDown = (event: React.KeyboardEvent<HTMLButtonElement>, id: string) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      setOpenId(current => current === id ? null : id);
    } else if (event.key === 'ArrowDown') {
      event.preventDefault();
      setOpenId(id);
      window.setTimeout(() => containerRef.current?.querySelector<HTMLElement>('[role="menu"] [role="menuitem"]')?.focus(), 180);
    }
  };

  const services = navigationConfig.primary.find(item => item.id === 'services');

  return (
    <div ref={containerRef} className="hidden lg:flex items-center gap-1 xl:gap-2">
      <nav aria-label="Primary navigation" className="flex items-center gap-1 xl:gap-2">
        {navigationConfig.primary.map(item => {
          if (!item.children) {
            return (
              <Link
                key={item.id}
                to={item.path}
                className={`px-2.5 xl:px-3 py-2 text-sm font-medium transition-colors rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/70 ${isActive(item) ? 'text-white' : 'text-neutral-300 hover:text-white'}`}
              >
                {item.label}
              </Link>
            );
          }

          return (
            <div
              key={item.id}
              className="relative"
              onMouseEnter={() => openWithIntent(item.id)}
              onMouseLeave={closeWithIntent}
            >
              <button
                ref={node => { triggerRefs.current[item.id] = node; }}
                type="button"
                aria-expanded={openId === item.id}
                aria-controls="services-mega-menu"
                onClick={() => setOpenId(current => current === item.id ? null : item.id)}
                onKeyDown={event => handleTriggerKeyDown(event, item.id)}
                className={`flex items-center gap-1 px-2.5 xl:px-3 py-2 text-sm font-medium transition-colors rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/70 ${isActive(item) || openId === item.id ? 'text-white' : 'text-neutral-300 hover:text-white'}`}
              >
                {item.label}
                <ChevronDown className={`w-3.5 h-3.5 transition-transform ${openId === item.id ? 'rotate-180' : ''}`} />
              </button>
            </div>
          );
        })}
      </nav>

      <div
        className="relative"
        onMouseEnter={() => openWithIntent('client-area')}
        onMouseLeave={closeWithIntent}
      >
        <button
          ref={node => { triggerRefs.current['client-area'] = node; }}
          type="button"
          aria-expanded={openId === 'client-area'}
          aria-controls="client-area-menu"
          onClick={() => setOpenId(current => current === 'client-area' ? null : 'client-area')}
          onKeyDown={event => handleTriggerKeyDown(event, 'client-area')}
          className="ml-1 flex items-center gap-1.5 px-2 py-2 text-xs font-medium text-neutral-400 hover:text-white rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/70"
        >
          <LockKeyhole className="w-3.5 h-3.5" />
          <span className="hidden xl:inline">Client Area</span>
          <ChevronDown className={`w-3 h-3 transition-transform ${openId === 'client-area' ? 'rotate-180' : ''}`} />
        </button>
      </div>

      <AnimatePresence>
        {openId === 'services' && services && (
          <motion.div
            id="services-mega-menu"
            role="menu"
            aria-label="Services"
            initial={{ opacity: 0, y: reduceMotion ? 0 : -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: reduceMotion ? 0 : -8 }}
            transition={{ duration: reduceMotion ? 0 : 0.18, ease: 'easeOut' }}
            onMouseEnter={() => clearTimers()}
            onMouseLeave={closeWithIntent}
            className="fixed left-1/2 top-[78px] w-[calc(100%-3rem)] max-w-[1120px] -translate-x-1/2 rounded-2xl border border-white/10 bg-[#080d1a]/95 shadow-[0_24px_80px_rgba(0,0,0,.55)] backdrop-blur-xl overflow-hidden"
          >
            <div className="grid grid-cols-[170px_1fr_220px] gap-5 p-5">
              <div className="border-r border-white/10 pr-5">
                <Link role="menuitem" to="/services" className="block rounded-xl p-3 hover:bg-white/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/70">
                  <div className="text-sm font-bold text-white">Services Overview</div>
                  <p className="mt-1 text-xs leading-relaxed text-neutral-400">Explore our end-to-end delivery capabilities.</p>
                </Link>
              </div>
              <div className="grid grid-cols-2 gap-2.5">
                {services.children?.map(child => {
                  const Icon = child.iconName ? serviceIcons[child.iconName] : ArrowRight;
                  return (
                    <Link
                      key={child.path}
                      role="menuitem"
                      to={child.path}
                      className="group rounded-xl border border-white/[0.07] bg-white/[0.025] p-3.5 transition-colors hover:border-white/20 hover:bg-white/[0.06] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/70"
                    >
                      <div className="flex items-start gap-3">
                        <div className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-white/10 bg-white/[0.06]">
                          <Icon className="h-4 w-4 text-white" />
                        </div>
                        <div>
                          <div className="text-sm font-semibold text-white">{child.label}</div>
                          <p className="mt-1 line-clamp-2 text-xs leading-relaxed text-neutral-400">{child.description}</p>
                        </div>
                      </div>
                    </Link>
                  );
                })}
              </div>
              <div className="rounded-xl border border-white/10 bg-white/[0.035] p-4 flex flex-col justify-between">
                <div>
                  <div className="text-xs font-mono uppercase tracking-wider text-neutral-400">Start a project</div>
                  <p className="mt-2 text-sm font-semibold leading-snug text-white">Get a clear scope and delivery plan.</p>
                </div>
                <div className="mt-5 space-y-2">
                  <Link role="menuitem" to="/contact" className="flex w-full items-center justify-center gap-2 rounded-lg bg-white px-3 py-2.5 text-xs font-bold text-black hover:bg-neutral-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/70">
                    Request a Quote <ArrowRight className="h-3.5 w-3.5" />
                  </Link>
                  <button role="menuitem" type="button" onClick={() => { setOpenId(null); onOpenBooking(); }} className="flex w-full items-center justify-center gap-2 rounded-lg border border-white/15 px-3 py-2.5 text-xs font-semibold text-white hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/70">
                    <Calendar className="h-3.5 w-3.5" /> Book a 30-min Call
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {openId === 'client-area' && (
          <motion.div
            id="client-area-menu"
            role="menu"
            aria-label="Client Area"
            initial={{ opacity: 0, y: reduceMotion ? 0 : -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: reduceMotion ? 0 : -8 }}
            transition={{ duration: reduceMotion ? 0 : 0.18 }}
            onMouseEnter={() => clearTimers()}
            onMouseLeave={closeWithIntent}
            className="fixed right-40 top-[78px] w-64 rounded-2xl border border-white/10 bg-[#080d1a]/95 p-2 shadow-[0_24px_80px_rgba(0,0,0,.55)] backdrop-blur-xl"
          >
            {navigationConfig.clientArea.children?.map(child => (
              <Link
                key={child.path}
                role="menuitem"
                to={child.path}
                className="block rounded-xl px-3 py-2.5 hover:bg-white/[0.07] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/70"
              >
                <div className={`text-sm font-semibold ${child.path === '/admin' ? 'text-neutral-400' : 'text-white'}`}>{child.label}</div>
                {child.description && <div className="mt-0.5 text-xs text-neutral-500">{child.description}</div>}
              </Link>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
