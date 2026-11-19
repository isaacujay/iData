// About Page (/about)
// Gradient backdrop, film-grain texture, aurora blooms, monochrome controls, no numbering in labels
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  ArrowRight, 
  Calendar, 
  CheckCircle2, 
  ChevronDown, 
  ShieldCheck, 
  Target, 
  Clock
} from 'lucide-react';
import { getDeliveryProcess } from '../../content/process';
import { getFAQs } from '../../content/faqs';
import { getLeadership } from '../../content/team';
import { Breadcrumbs } from '../../components/Breadcrumbs';
import { NextStepCard } from '../../components/Card';

export interface AboutPageProps {
  onOpenBooking: () => void;
}

export const AboutPage: React.FC<AboutPageProps> = ({ onOpenBooking }) => {
  const process = getDeliveryProcess();
  const faqs = getFAQs();
  const leadership = getLeadership().slice(0, 3);
  const [openFaq, setOpenFaq] = useState<string | null>(faqs[0]?.id || null);

  return (
    <div className="pt-28 pb-20 min-h-screen bg-gradient-dark-section film-grain relative overflow-hidden">
      {/* Drifting aurora blooms */}
      <div className="pointer-events-none absolute top-10 left-10 w-[500px] h-[500px] rounded-full bg-[#4F46E5] opacity-20 blur-[130px] animate-aurora-1" />
      <div className="pointer-events-none absolute bottom-20 right-10 w-[450px] h-[450px] rounded-full bg-[#7C3AED] opacity-15 blur-[120px] animate-aurora-2" />

      <div className="max-w-[1200px] mx-auto px-4 md:px-8 relative z-10">
        <Breadcrumbs items={[{ label: 'About & Delivery Process' }]} />

        {/* Hero Block */}
        <div className="max-w-3xl mb-16">
          <span className="text-xs font-mono uppercase tracking-widest text-neutral-400 block mb-3">
            Company & Philosophy
          </span>
          <h1 className="text-3xl md:text-5xl font-extrabold text-white tracking-tight leading-tight mb-6">
            We bridge business vision and production-grade engineering.
          </h1>
          <p className="text-base md:text-lg text-neutral-300 leading-relaxed mb-8">
            IData was founded with a singular conviction: enterprises do not lack data or ambition, they lack trustworthy engineering squads that turn operational data into reliable, scalable software.
          </p>

          <button
            onClick={onOpenBooking}
            className="px-6 py-3.5 rounded-xl bg-white text-black font-bold text-sm hover:bg-neutral-200 transition-all inline-flex items-center gap-2 shadow-sm cursor-pointer"
          >
            <Calendar className="w-4 h-4 text-black" />
            <span>Book a Discovery Call</span>
          </button>
        </div>

        {/* Mission & Core Values */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-24">
          <div className="card-depth p-8 rounded-2xl">
            <div className="w-10 h-10 rounded-xl bg-white/10 text-white flex items-center justify-center mb-5">
              <Target className="w-5 h-5 text-white" />
            </div>
            <h3 className="text-lg font-bold text-white mb-2">
              Outcome Over Output
            </h3>
            <p className="text-xs text-neutral-400 leading-relaxed">
              We do not bill aimless hours. Every sprint has concrete deliverables: hours saved, latency shaved, and software verified in staging.
            </p>
          </div>

          <div className="card-depth p-8 rounded-2xl">
            <div className="w-10 h-10 rounded-xl bg-white/10 text-white flex items-center justify-center mb-5">
              <ShieldCheck className="w-5 h-5 text-white" />
            </div>
            <h3 className="text-lg font-bold text-white mb-2">
              Zero Vendor Lock-In
            </h3>
            <p className="text-xs text-neutral-400 leading-relaxed">
              All code, models, pipelines and documentation belong entirely to you upon delivery. We build on open, industry-standard TypeScript and Python.
            </p>
          </div>

          <div className="card-depth p-8 rounded-2xl">
            <div className="w-10 h-10 rounded-xl bg-white/10 text-white flex items-center justify-center mb-5">
              <Clock className="w-5 h-5 text-white" />
            </div>
            <h3 className="text-lg font-bold text-white mb-2">
              Radical Transparency
            </h3>
            <p className="text-xs text-neutral-400 leading-relaxed">
              Our clients track sprint milestones, code commits, and sign-offs in real time through our dedicated Client Portal.
            </p>
          </div>
        </div>

        {/* Delivery Process (Detailed Roadmap - No numbering) */}
        <div className="card-depth mb-24 p-8 md:p-12 rounded-3xl relative overflow-hidden">
          <div className="max-w-2xl mb-12">
            <span className="text-xs font-mono uppercase tracking-widest text-neutral-400 block mb-2">
              Deterministic Methodology
            </span>
            <h2 className="text-2xl md:text-3xl font-extrabold text-white">
              How we deliver on time and on budget
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {process.map((stage, idx) => (
              <div
                key={idx}
                className="p-6 rounded-2xl bg-white/[0.04] border border-white/10 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="text-base font-bold text-white">
                      {stage.title}
                    </h3>
                    <span className="text-xs font-mono text-neutral-400 bg-white/10 px-2 py-0.5 rounded">
                      {stage.duration}
                    </span>
                  </div>
                  <p className="text-xs text-neutral-300 leading-relaxed mb-6">
                    {stage.description}
                  </p>
                </div>

                <div className="pt-4 border-t border-white/10">
                  <span className="text-[11px] font-mono text-white uppercase block mb-1.5">
                    Phase Milestones:
                  </span>
                  <ul className="space-y-1 text-xs text-neutral-300">
                    {stage.deliverables.map((d, i) => (
                      <li key={i} className="flex items-center gap-2">
                        <CheckCircle2 className="w-3 h-3 text-white shrink-0" />
                        <span>{d}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Meet the Leadership Teaser (No numbering) */}
        <div className="card-depth mb-24 p-8 rounded-3xl flex flex-col md:flex-row items-center justify-between gap-8 relative overflow-hidden">
          <div className="max-w-xl">
            <span className="text-xs font-mono uppercase tracking-widest text-neutral-400 block mb-2">
              Engineering Leadership
            </span>
            <h3 className="text-2xl font-bold text-white mb-2">
              Meet the founders behind the delivery squad
            </h3>
            <p className="text-xs text-neutral-300 leading-relaxed mb-4">
              Led by Isaac Ujay and senior specialists with backgrounds spanning fintech, healthtech and enterprise cloud infrastructure.
            </p>
            <div className="flex -space-x-2">
              {leadership.map(l => (
                <div
                  key={l.id}
                  title={l.name}
                  className="w-10 h-10 rounded-full bg-neutral-800 border-2 border-black flex items-center justify-center font-bold text-xs text-white"
                >
                  {l.name.split(' ').map(n => n[0]).join('')}
                </div>
              ))}
            </div>
          </div>

          <Link
            to="/team"
            className="px-6 py-3 rounded-xl bg-white text-black font-bold text-xs hover:bg-neutral-200 transition-colors shrink-0 inline-flex items-center gap-2"
          >
            <span>Meet the Leadership & Team</span>
            <ArrowRight className="w-4 h-4 text-black" />
          </Link>
        </div>

        {/* FAQs Section */}
        <div id="faqs" className="mb-20 max-w-3xl mx-auto">
          <div className="text-center mb-10">
            <span className="text-xs font-mono uppercase tracking-widest text-neutral-400 block mb-2">
              Questions & Clarity
            </span>
            <h2 className="text-2xl md:text-3xl font-extrabold text-white">
              Frequently Asked Questions
            </h2>
          </div>

          <div className="space-y-3">
            {faqs.map(faq => {
              const isOpen = openFaq === faq.id;
              return (
                <div
                  key={faq.id}
                  className="card-depth rounded-2xl overflow-hidden transition-colors"
                >
                  <button
                    onClick={() => setOpenFaq(isOpen ? null : faq.id)}
                    className="w-full p-5 text-left flex items-center justify-between gap-4 cursor-pointer"
                  >
                    <span className="text-sm font-semibold text-white">
                      {faq.question}
                    </span>
                    <ChevronDown
                      className={`w-4 h-4 text-white transition-transform ${
                        isOpen ? 'rotate-180' : ''
                      }`}
                    />
                  </button>
                  {isOpen && (
                    <div className="px-5 pb-5 text-xs text-neutral-300 leading-relaxed border-t border-white/10 pt-3">
                      {faq.answer}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Next Step Band */}
        <div>
          <h3 className="text-xs font-mono uppercase tracking-wider text-neutral-400 mb-4">
            Next Steps
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <NextStepCard
              title="Request a Project Quote"
              description="Tell us about your requirements for an immediate scope and cost estimate."
              to="/contact"
            />
            <NextStepCard
              title="Schedule a Discovery Call"
              description="Speak directly with our technical founder and engineering leads."
              to="/contact"
            />
          </div>
        </div>
      </div>
    </div>
  );
};
