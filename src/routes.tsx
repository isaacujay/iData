// Central route definitions with React Router and Lazy-Loading for code-splitting
import React, { lazy, Suspense } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';

// Lazy-loaded page components
const HomePage = lazy(() => import('./features/home/HomePage').then(m => ({ default: m.HomePage })));
const ServicesPage = lazy(() => import('./features/services/ServicesPage').then(m => ({ default: m.ServicesPage })));
const ServiceDetailPage = lazy(() => import('./features/services/ServiceDetailPage').then(m => ({ default: m.ServiceDetailPage })));
const WorkPage = lazy(() => import('./features/work/WorkPage').then(m => ({ default: m.WorkPage })));
const CaseStudyDetailPage = lazy(() => import('./features/work/CaseStudyDetailPage').then(m => ({ default: m.CaseStudyDetailPage })));
const ReviewsPage = lazy(() => import('./features/reviews/ReviewsPage').then(m => ({ default: m.ReviewsPage })));
const TeamPage = lazy(() => import('./features/team/TeamPage').then(m => ({ default: m.TeamPage })));
const AboutPage = lazy(() => import('./features/about/AboutPage').then(m => ({ default: m.AboutPage })));
const ContactPage = lazy(() => import('./features/contact/ContactPage').then(m => ({ default: m.ContactPage })));
const PortalPage = lazy(() => import('./features/portal/PortalPage').then(m => ({ default: m.PortalPage })));
const AdminPage = lazy(() => import('./features/admin/AdminPage').then(m => ({ default: m.AdminPage })));
const LegalPage = lazy(() => import('./features/legal/LegalPage').then(m => ({ default: m.LegalPage })));
const NotFoundPage = lazy(() => import('./features/not-found/NotFoundPage').then(m => ({ default: m.NotFoundPage })));

// Loading spinner fallback
const PageLoader = () => (
  <div className="min-h-screen bg-gradient-to-b from-[#0a0f1d] via-[#050811] to-[#020408] flex items-center justify-center">
    <div className="w-8 h-8 rounded-full border-2 border-white/20 border-t-white animate-spin" />
  </div>
);

// Route wrapper with page transitions
const PageTransition: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
      transition={{ duration: 0.25, ease: 'easeInOut' }}
    >
      {children}
    </motion.div>
  );
};

export interface AppRoutesProps {
  onOpenBooking: () => void;
}

export const AppRoutes: React.FC<AppRoutesProps> = ({ onOpenBooking }) => {
  const location = useLocation();

  return (
    <Suspense fallback={<PageLoader />}>
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<PageTransition><HomePage onOpenBooking={onOpenBooking} /></PageTransition>} />
          <Route path="/services" element={<PageTransition><ServicesPage onOpenBooking={onOpenBooking} /></PageTransition>} />
          <Route path="/services/:slug" element={<PageTransition><ServiceDetailPage onOpenBooking={onOpenBooking} /></PageTransition>} />
          <Route path="/work" element={<PageTransition><WorkPage /></PageTransition>} />
          <Route path="/work/:slug" element={<PageTransition><CaseStudyDetailPage /></PageTransition>} />
          <Route path="/reviews" element={<PageTransition><ReviewsPage onOpenBooking={onOpenBooking} /></PageTransition>} />
          <Route path="/team" element={<PageTransition><TeamPage /></PageTransition>} />
          <Route path="/about" element={<PageTransition><AboutPage onOpenBooking={onOpenBooking} /></PageTransition>} />
          <Route path="/contact" element={<PageTransition><ContactPage /></PageTransition>} />
          <Route path="/portal" element={<PageTransition><PortalPage /></PageTransition>} />
          <Route path="/admin" element={<PageTransition><AdminPage /></PageTransition>} />
          <Route path="/privacy" element={<PageTransition><LegalPage /></PageTransition>} />
          <Route path="/terms" element={<PageTransition><LegalPage /></PageTransition>} />
          <Route path="*" element={<PageTransition><NotFoundPage /></PageTransition>} />
        </Routes>
      </AnimatePresence>
    </Suspense>
  );
};
