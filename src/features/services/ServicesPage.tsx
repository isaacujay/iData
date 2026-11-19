// Services Overview Page (/services)
// Gradient backdrop, film-grain texture, monochrome controls, no numbering in labels
import React from 'react';
import { Link } from 'react-router-dom';
import { getServices } from '../../content/services';
import { ServiceCard, NextStepCard } from '../../components/Card';
import { Breadcrumbs } from '../../components/Breadcrumbs';

export interface ServicesPageProps {
  onOpenBooking: () => void;
}

export const ServicesPage: React.FC<ServicesPageProps> = ({ onOpenBooking }) => {
  const services = getServices();

  return (
    <div className="pt-28 pb-20 min-h-screen bg-gradient-dark-section film-grain relative overflow-hidden">
      {/* Drifting aurora glows */}
      <div className="pointer-events-none absolute top-10 left-1/3 w-[500px] h-[500px] rounded-full bg-[#4F46E5] opacity-20 blur-[130px] animate-aurora-1" />
      <div className="pointer-events-none absolute bottom-20 right-10 w-[450px] h-[450px] rounded-full bg-[#7C3AED] opacity-15 blur-[120px] animate-aurora-2" />

      <div className="max-w-[1200px] mx-auto px-4 md:px-8 relative z-10">
        <Breadcrumbs items={[{ label: 'Services & Capabilities' }]} />

        {/* Page Header */}
        <div className="max-w-3xl mb-16">
          <span className="text-xs font-mono uppercase tracking-widest text-neutral-400 block mb-3">
            Core Service Offerings
          </span>
          <h1 className="text-3xl md:text-5xl font-extrabold text-white tracking-tight leading-tight mb-6">
            Four specialized practices. Delivered as one unified team.
          </h1>
          <p className="text-base md:text-lg text-neutral-300 leading-relaxed">
            Whether you need autonomous AI agents to eliminate repetitive toil, executive BI dashboards for board-level clarity, or bespoke full-stack applications, we build production software that scales.
          </p>
        </div>

        {/* Services Grid with Card Depth */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-20">
          {services.map((service, index) => (
            <ServiceCard key={service.id} service={service} index={index} />
          ))}
        </div>

        {/* How We Deliver Comparison Strip (No numbering) */}
        <div className="card-depth p-8 md:p-12 rounded-3xl mb-20 relative overflow-hidden">
          <h2 className="text-xl md:text-2xl font-bold text-white mb-4">
            The IData Delivery Standard
          </h2>
          <p className="text-sm text-neutral-300 max-w-2xl mb-8 leading-relaxed">
            Every engagement follows a structured 2-week milestone cycle. Clients track deliverables, inspect staging environments, and approve releases via our private portal.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs text-neutral-300">
            <div className="p-5 rounded-2xl bg-white/[0.04] border border-white/10">
              <span className="font-mono text-white font-bold text-sm block mb-1">Architecture First</span>
              <p>We lock down schema definitions, security boundaries, and API contracts before typing production code.</p>
            </div>
            <div className="p-5 rounded-2xl bg-white/[0.04] border border-white/10">
              <span className="font-mono text-white font-bold text-sm block mb-1">Transparent Milestones</span>
              <p>Track sprint progress in the Client Portal with continuous staging previews and zero billing surprises.</p>
            </div>
            <div className="p-5 rounded-2xl bg-white/[0.04] border border-white/10">
              <span className="font-mono text-white font-bold text-sm block mb-1">30-Day Handover Warranty</span>
              <p>Comprehensive runbooks, team training, and 30 days of included bug fixes and operational support.</p>
            </div>
          </div>
        </div>

        {/* Next Step Band */}
        <div>
          <h3 className="text-xs font-mono uppercase tracking-wider text-neutral-400 mb-4">
            Next Steps
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <NextStepCard
              title="Request a Custom Quote"
              description="Get an itemized proposal and delivery plan within 48 hours."
              to="/contact"
            />
            <NextStepCard
              title="Explore Case Studies"
              description="Review real-world client metrics and technical outcomes."
              to="/work"
            />
            <NextStepCard
              title="Meet the Engineering Squad"
              description="Learn about our leadership and vetted specialist network."
              to="/team"
            />
          </div>
        </div>
      </div>
    </div>
  );
};
