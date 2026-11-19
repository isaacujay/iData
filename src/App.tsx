// App root component
import React, { useState, useEffect } from 'react';
import { BrowserRouter, useLocation } from 'react-router-dom';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { ScrollProgress } from './components/ScrollProgress';
import { CalendlyModal } from './components/CalendlyModal';
import { DemoModeBanner } from './components/DemoModeBanner';
import { AppRoutes } from './routes';

// Scroll to top automatically when route changes
const ScrollToTopOnRoute: React.FC = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

export const App: React.FC = () => {
  const [isBookingOpen, setIsBookingOpen] = useState(false);

  return (
    <BrowserRouter>
      <ScrollToTopOnRoute />
      <div className="min-h-screen bg-gradient-to-b from-[#060a14] via-[#03060c] to-[#010307] text-white flex flex-col selection:bg-white selection:text-black">
        {/* Scroll Progress Bar at the very top */}
        <ScrollProgress />

        {/* Global Slim Sticky Header */}
        <Header onOpenBooking={() => setIsBookingOpen(true)} />

        {/* Main Content Area */}
        <main className="flex-1">
          <AppRoutes onOpenBooking={() => setIsBookingOpen(true)} />
        </main>

        {/* Global Footer on every page */}
        <Footer onOpenBooking={() => setIsBookingOpen(true)} />

        {/* Calendly Booking Modal */}
        <CalendlyModal
          isOpen={isBookingOpen}
          onClose={() => setIsBookingOpen(false)}
        />

        {/* Demo Mode Dev Banner */}
        <DemoModeBanner />
      </div>
    </BrowserRouter>
  );
};

export default App;
