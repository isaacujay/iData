// Work & Demos Page (/work)
// Gradient backdrop, film-grain texture, aurora blooms, monochrome controls, no numbering in labels
import React, { useState } from 'react';
import { getCaseStudies } from '../../content/caseStudies';
import { ServiceSlug } from '../../types';
import { CaseStudyCard, NextStepCard } from '../../components/Card';
import { Breadcrumbs } from '../../components/Breadcrumbs';

export const WorkPage: React.FC = () => {
  const allCaseStudies = getCaseStudies();
  const [activeFilter, setActiveFilter] = useState<'all' | ServiceSlug>('all');
  const [activeClientType, setActiveClientType] = useState<'all' | 'enterprise' | 'international' | 'sme' | 'agency'>('all');

  const filtered = allCaseStudies.filter(cs => {
    const matchesService = activeFilter === 'all' || cs.serviceSlug === activeFilter;
    const matchesType = activeClientType === 'all' || cs.clientType === activeClientType;
    return matchesService && matchesType;
  });

  return (
    <div className="pt-28 pb-20 min-h-screen bg-gradient-dark-section film-grain relative overflow-hidden">
      {/* Drifting aurora blooms */}
      <div className="pointer-events-none absolute top-10 left-10 w-[500px] h-[500px] rounded-full bg-[#4F46E5] opacity-20 blur-[130px] animate-aurora-1" />
      <div className="pointer-events-none absolute bottom-20 right-10 w-[450px] h-[450px] rounded-full bg-[#7C3AED] opacity-15 blur-[120px] animate-aurora-2" />

      <div className="max-w-[1200px] mx-auto px-4 md:px-8 relative z-10">
        <Breadcrumbs items={[{ label: 'Work & Demos' }]} />

        {/* Header */}
        <div className="max-w-3xl mb-12">
          <span className="text-xs font-mono uppercase tracking-widest text-neutral-400 block mb-3">
            Proven Deliveries
          </span>
          <h1 className="text-3xl md:text-5xl font-extrabold text-white tracking-tight leading-tight mb-6">
            Production systems delivered with measured results.
          </h1>
          <p className="text-base md:text-lg text-neutral-300 leading-relaxed">
            Every case study below represents a real production deployment with quantified operational metrics: manual toil eliminated, latency reduced, and software shipped on schedule.
          </p>
        </div>

        {/* Filter Controls (Monochrome) */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-10 pb-6 border-b border-white/10">
          {/* Service Filter Tabs */}
          <div className="flex flex-wrap items-center gap-2">
            {[
              { label: 'All Disciplines', value: 'all' },
              { label: 'Agentic AI', value: 'ai-agentic-systems' },
              { label: 'Analytics & Dashboards', value: 'data-analytics-dashboards' },
              { label: 'Data Science & ML', value: 'data-science-machine-learning' },
              { label: 'Software & Web', value: 'software-web-development' },
            ].map(tab => (
              <button
                key={tab.value}
                onClick={() => setActiveFilter(tab.value as any)}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-medium transition-colors cursor-pointer ${
                  activeFilter === tab.value
                    ? 'bg-white text-black font-bold shadow-sm'
                    : 'bg-white/5 text-neutral-400 hover:text-white border border-white/10'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Client Type Filter */}
          <div className="flex items-center gap-2 text-xs text-neutral-400">
            <span className="font-mono text-[11px] uppercase">Client:</span>
            <select
              value={activeClientType}
              onChange={e => setActiveClientType(e.target.value as any)}
              className="bg-white/10 border border-white/15 rounded-lg px-2.5 py-1 text-xs text-white focus:outline-none"
            >
              <option value="all" className="bg-slate-900 text-white">All Organizations</option>
              <option value="enterprise" className="bg-slate-900 text-white">Enterprise</option>
              <option value="international" className="bg-slate-900 text-white">International / Remote</option>
              <option value="sme" className="bg-slate-900 text-white">SMEs & Startups</option>
              <option value="agency" className="bg-slate-900 text-white">Agencies & Subcontract</option>
            </select>
          </div>
        </div>

        {/* Case Studies Gallery Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-20">
          {filtered.length > 0 ? (
            filtered.map((cs, idx) => (
              <CaseStudyCard key={cs.id} caseStudy={cs} index={idx} />
            ))
          ) : (
            <div className="card-depth col-span-2 p-12 text-center rounded-2xl text-neutral-400 text-sm">
              No case studies found matching current filter combination.
            </div>
          )}
        </div>

        {/* Next Step Band */}
        <div>
          <h3 className="text-xs font-mono uppercase tracking-wider text-neutral-400 mb-4">
            Next Steps
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <NextStepCard
              title="Start a Similar Project"
              description="Discuss requirements, tech stack and scope with our engineering squad."
              to="/contact"
            />
            <NextStepCard
              title="Read Client Reviews"
              description="See ratings and testimonials from previous partners."
              to="/reviews"
            />
            <NextStepCard
              title="Explore Service Offerings"
              description="Understand how we structure sprints, milestones, and deliverables."
              to="/services"
            />
          </div>
        </div>
      </div>
    </div>
  );
};
