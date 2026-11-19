// Service Detail Page (/services/:slug)
// Gradient backdrop, film-grain texture, monochrome controls, no numbering in labels
import React from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { 
  ArrowRight, 
  Calendar, 
  CheckCircle2, 
  ChevronRight,
  Wrench
} from 'lucide-react';
import { getServiceBySlug, getServices } from '../../content/services';
import { getCaseStudiesByService } from '../../content/caseStudies';
import { getSeedReviews } from '../../content/reviews';
import { getVideos } from '../../content/videos';
import { Breadcrumbs } from '../../components/Breadcrumbs';
import { VideoEmbed } from '../../components/VideoEmbed';
import { CaseStudyCard, ReviewCard, NextStepCard } from '../../components/Card';

export interface ServiceDetailPageProps {
  onOpenBooking: () => void;
}

export const ServiceDetailPage: React.FC<ServiceDetailPageProps> = ({ onOpenBooking }) => {
  const { slug } = useParams<{ slug: string }>();
  const service = getServiceBySlug(slug || '');

  if (!service) {
    return <Navigate to="/services" replace />;
  }

  const relatedCaseStudies = getCaseStudiesByService(service.slug);
  const relatedReviews = getSeedReviews().filter(r => r.service_slug === service.slug || r.service_slug === 'general');
  const relatedVideo = getVideos().find(v => v.serviceSlug === service.slug);

  return (
    <div className="pt-28 pb-20 min-h-screen bg-gradient-dark-section film-grain relative overflow-hidden">
      {/* Drifting aurora blooms */}
      <div className="pointer-events-none absolute top-10 right-1/4 w-[500px] h-[500px] rounded-full bg-[#4F46E5] opacity-20 blur-[130px] animate-aurora-1" />
      <div className="pointer-events-none absolute bottom-20 left-10 w-[450px] h-[450px] rounded-full bg-[#7C3AED] opacity-15 blur-[120px] animate-aurora-2" />

      <div className="max-w-[1200px] mx-auto px-4 md:px-8 relative z-10">
        <Breadcrumbs
          items={[
            { label: 'Services', to: '/services' },
            { label: service.title }
          ]}
        />

        {/* Hero Banner */}
        <div className="max-w-3xl mb-16">
          <span className="text-xs font-mono uppercase tracking-widest text-neutral-400 block mb-3">
            Service Practice
          </span>
          <h1 className="text-3xl md:text-5xl font-extrabold text-white tracking-tight mb-6">
            {service.title}
          </h1>
          <p className="text-lg md:text-xl text-neutral-300 leading-relaxed mb-8">
            {service.tagline}
          </p>

          <div className="flex flex-wrap items-center gap-4">
            <Link
              to={`/contact?service=${service.slug}`}
              className="px-6 py-3.5 rounded-xl bg-white text-black font-bold text-sm hover:bg-neutral-200 transition-all flex items-center gap-2 shadow-sm cursor-pointer"
            >
              <span>Request a Quote for {service.title}</span>
              <ArrowRight className="w-4 h-4 text-black" />
            </Link>

            <button
              onClick={onOpenBooking}
              className="px-6 py-3.5 rounded-xl bg-white/10 border border-white/20 text-white font-semibold text-sm hover:bg-white/20 transition-all flex items-center gap-2 cursor-pointer"
            >
              <Calendar className="w-4 h-4 text-white" />
              <span>Book Discovery Call</span>
            </button>
          </div>
        </div>

        {/* Problem vs Solution Split */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-20">
          <div className="card-depth p-8 rounded-2xl">
            <span className="text-xs font-mono text-neutral-400 uppercase tracking-wider block mb-2">
              The Common Bottleneck
            </span>
            <h3 className="text-xl font-bold text-white mb-3">
              Why traditional approaches stall
            </h3>
            <p className="text-sm text-neutral-300 leading-relaxed">
              {service.problem}
            </p>
          </div>

          <div className="card-depth p-8 rounded-2xl">
            <span className="text-xs font-mono text-white uppercase tracking-wider block mb-2">
              The IData Engineering Solution
            </span>
            <h3 className="text-xl font-bold text-white mb-3">
              Deterministic, production-ready delivery
            </h3>
            <p className="text-sm text-neutral-200 leading-relaxed">
              {service.solution}
            </p>
          </div>
        </div>

        {/* Process Steps (No numbering in labels) */}
        <div className="mb-20">
          <div className="text-center max-w-xl mx-auto mb-12">
            <span className="text-xs font-mono uppercase tracking-widest text-neutral-400 block mb-2">
              Delivery Roadmap
            </span>
            <h2 className="text-2xl md:text-3xl font-extrabold text-white">
              How we take your project from scope to production
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {service.process.map((step, idx) => (
              <div
                key={idx}
                className="card-depth p-6 rounded-2xl flex flex-col justify-between"
              >
                <div>
                  <h4 className="text-base font-bold text-white mb-2">
                    {step.title}
                  </h4>
                  <p className="text-xs text-neutral-300 leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Sub-Offerings Breakdown */}
        <div className="card-depth p-8 md:p-12 rounded-3xl mb-20 relative overflow-hidden">
          <div className="max-w-xl mb-10">
            <span className="text-xs font-mono uppercase tracking-widest text-neutral-400 block mb-2">
              Specific Scopes & Deliverables
            </span>
            <h2 className="text-2xl md:text-3xl font-extrabold text-white">
              What we build within this practice
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {service.subOfferings.map((sub, idx) => (
              <div key={idx} className="p-6 rounded-2xl bg-white/[0.04] border border-white/10 flex flex-col justify-between">
                <div>
                  <h4 className="text-base font-bold text-white mb-2">
                    {sub.title}
                  </h4>
                  <p className="text-xs text-neutral-300 leading-relaxed mb-6">
                    {sub.description}
                  </p>
                </div>

                <div className="pt-4 border-t border-white/10">
                  <span className="text-[11px] font-mono uppercase tracking-wider text-white block mb-2">
                    Key Deliverables:
                  </span>
                  <ul className="space-y-1.5 text-xs text-neutral-200">
                    {sub.deliverables.map((deliv, dIdx) => (
                      <li key={dIdx} className="flex items-center gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-white shrink-0" />
                        <span>{deliv}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Tech Stack Chips */}
        <div className="card-depth mb-20 p-8 rounded-2xl flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <h4 className="text-sm font-bold text-white mb-1">
              Engineered with proven industry tools
            </h4>
            <p className="text-xs text-neutral-400">
              Zero vendor lock-in. We build on open, maintainable standards you fully own.
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            {service.techStack.map((tech, idx) => (
              <span
                key={idx}
                className="px-3 py-1.5 rounded-lg bg-white/10 border border-white/15 text-xs font-mono text-white"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>

        {/* Demo Video (if available) */}
        {relatedVideo && (
          <div className="mb-20">
            <span className="text-xs font-mono uppercase tracking-widest text-neutral-400 block mb-2">
              System Demonstration
            </span>
            <h2 className="text-2xl font-bold text-white mb-6">
              See the architecture in action
            </h2>
            <div className="max-w-3xl">
              <VideoEmbed video={relatedVideo} />
            </div>
          </div>
        )}

        {/* Related Case Studies */}
        {relatedCaseStudies.length > 0 && (
          <div className="mb-20">
            <div className="flex items-end justify-between mb-8">
              <div>
                <span className="text-xs font-mono uppercase tracking-widest text-neutral-400 block mb-1">
                  Proof of Impact
                </span>
                <h3 className="text-2xl font-bold text-white">
                  Case studies in this practice
                </h3>
              </div>
              <Link to="/work" className="text-xs text-white hover:underline flex items-center gap-1 font-semibold">
                <span>All case studies</span>
                <ChevronRight className="w-3.5 h-3.5 text-white" />
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {relatedCaseStudies.map((cs) => (
                <CaseStudyCard key={cs.id} caseStudy={cs} />
              ))}
            </div>
          </div>
        )}

        {/* Related Reviews */}
        {relatedReviews.length > 0 && (
          <div className="mb-20">
            <span className="text-xs font-mono uppercase tracking-widest text-neutral-400 block mb-2">
              Client Feedback
            </span>
            <h3 className="text-2xl font-bold text-white mb-6">
              What clients say about our delivery
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {relatedReviews.slice(0, 2).map((rev) => (
                <ReviewCard key={rev.id} review={rev} />
              ))}
            </div>
          </div>
        )}

        {/* Next Step Band */}
        <div>
          <h3 className="text-xs font-mono uppercase tracking-wider text-neutral-400 mb-4">
            Next Steps
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <NextStepCard
              title={`Quote for ${service.title}`}
              description="Tell us your requirements for an immediate fixed-fee proposal."
              to={`/contact?service=${service.slug}`}
            />
            <NextStepCard
              title="Compare Other Services"
              description="Explore our data analytics, ML and full-stack software practices."
              to="/services"
            />
            <NextStepCard
              title="Schedule Discovery Call"
              description="Speak directly with our technical founder and engineering leads."
              to="/contact"
            />
          </div>
        </div>
      </div>
    </div>
  );
};
