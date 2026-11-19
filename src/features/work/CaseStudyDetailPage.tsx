// Case Study Detail Page (/work/:slug)
// Gradient backdrop, film grain, aurora blooms, monochrome controls, no numbering in labels
import React from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { ArrowRight, Wrench } from 'lucide-react';
import { getCaseStudyBySlug, getCaseStudies } from '../../content/caseStudies';
import { Breadcrumbs } from '../../components/Breadcrumbs';
import { VideoEmbed } from '../../components/VideoEmbed';
import { NextStepCard, CaseStudyCard } from '../../components/Card';

export const CaseStudyDetailPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const caseStudy = getCaseStudyBySlug(slug || '');

  if (!caseStudy) {
    return <Navigate to="/work" replace />;
  }

  const otherStudies = getCaseStudies().filter(c => c.slug !== caseStudy.slug).slice(0, 2);
  const video = caseStudy.videoId ? {
    id: `cs-vid-${caseStudy.id}`,
    youtubeId: caseStudy.videoId,
    title: `${caseStudy.client} Demo Walkthrough`,
    description: caseStudy.summary,
    posterImage: caseStudy.coverImage,
    duration: '3:30',
    serviceSlug: caseStudy.serviceSlug
  } : undefined;

  return (
    <div className="pt-28 pb-20 min-h-screen bg-gradient-dark-section film-grain relative overflow-hidden">
      {/* Drifting aurora blooms */}
      <div className="pointer-events-none absolute top-10 right-10 w-[500px] h-[500px] rounded-full bg-[#4F46E5] opacity-20 blur-[130px] animate-aurora-1" />
      <div className="pointer-events-none absolute bottom-20 left-10 w-[450px] h-[450px] rounded-full bg-[#7C3AED] opacity-15 blur-[120px] animate-aurora-2" />

      <div className="max-w-[1200px] mx-auto px-4 md:px-8 relative z-10">
        <Breadcrumbs
          items={[
            { label: 'Work', to: '/work' },
            { label: caseStudy.client }
          ]}
        />

        {/* Header Block */}
        <div className="max-w-3xl mb-12">
          <div className="flex items-center gap-3 text-xs font-mono mb-3">
            <span className="text-white uppercase tracking-wider">{caseStudy.client}</span>
            <span className="text-white/20">/</span>
            <span className="text-neutral-400 uppercase">{caseStudy.clientType}</span>
          </div>

          <h1 className="text-3xl md:text-5xl font-extrabold text-white tracking-tight leading-tight mb-6">
            {caseStudy.title}
          </h1>

          <div className="text-3xl md:text-4xl font-extrabold text-white font-mono mb-8">
            {caseStudy.resultHeadline}
          </div>

          <p className="text-base md:text-lg text-neutral-300 leading-relaxed mb-8">
            {caseStudy.summary}
          </p>

          <Link
            to={`/contact?subject=${encodeURIComponent('Project inquiry based on ' + caseStudy.title)}`}
            className="px-6 py-3.5 rounded-xl bg-white text-black font-bold text-sm hover:bg-neutral-200 transition-all inline-flex items-center gap-2 shadow-sm cursor-pointer"
          >
            <span>Start a Similar Project</span>
            <ArrowRight className="w-4 h-4 text-black" />
          </Link>
        </div>

        {/* Quantified Results Grid */}
        <div className="card-depth p-8 md:p-10 rounded-3xl mb-16 relative overflow-hidden">
          <span className="text-xs font-mono uppercase tracking-widest text-neutral-400 block mb-6">
            Quantified Business Results
          </span>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {caseStudy.results.map((res, idx) => (
              <div key={idx} className="p-6 rounded-2xl bg-white/[0.04] border border-white/10">
                <div className="text-3xl md:text-4xl font-extrabold font-mono text-white mb-2 tabular-nums">
                  {res.metric}
                </div>
                <div className="text-xs text-neutral-400 leading-relaxed">
                  {res.label}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Challenge vs Solution */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          <div className="card-depth p-8 rounded-2xl">
            <span className="text-xs font-mono uppercase tracking-widest text-neutral-400 block mb-3">
              The Challenge
            </span>
            <p className="text-sm text-neutral-300 leading-relaxed">
              {caseStudy.challenge}
            </p>
          </div>

          <div className="card-depth p-8 rounded-2xl">
            <span className="text-xs font-mono uppercase tracking-widest text-white block mb-3">
              The Engineering Solution
            </span>
            <p className="text-sm text-neutral-200 leading-relaxed">
              {caseStudy.solution}
            </p>
          </div>
        </div>

        {/* Tools and Technologies */}
        <div className="card-depth p-6 rounded-2xl flex flex-col md:flex-row md:items-center justify-between gap-4 mb-16">
          <div className="flex items-center gap-2 text-sm font-semibold text-white">
            <Wrench className="w-4 h-4 text-white" />
            <span>Technologies & Stack:</span>
          </div>
          <div className="flex flex-wrap gap-2">
            {caseStudy.tools.map((tool, idx) => (
              <span
                key={idx}
                className="px-3 py-1 rounded-lg bg-white/10 border border-white/15 text-xs font-mono text-white"
              >
                {tool}
              </span>
            ))}
          </div>
        </div>

        {/* Video Demo (if available) */}
        {video && (
          <div className="mb-20">
            <span className="text-xs font-mono uppercase tracking-widest text-neutral-400 block mb-2">
              Video Walkthrough
            </span>
            <h2 className="text-2xl font-bold text-white mb-6">
              Interactive System Inspection
            </h2>
            <div className="max-w-3xl">
              <VideoEmbed video={video} />
            </div>
          </div>
        )}

        {/* Related Case Studies */}
        {otherStudies.length > 0 && (
          <div className="mb-20">
            <h2 className="text-xl font-bold text-white mb-6">
              Explore More Case Studies
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {otherStudies.map(cs => (
                <CaseStudyCard key={cs.id} caseStudy={cs} />
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
              title="Request a Similar Build"
              description="Tell us your requirements and data architecture goals."
              to="/contact"
            />
            <NextStepCard
              title="All Case Studies"
              description="Filter our work by AI, Analytics, ML, or Web systems."
              to="/work"
            />
            <NextStepCard
              title="Client Testimonials"
              description="Read what our clients have to say about delivery quality."
              to="/reviews"
            />
          </div>
        </div>
      </div>
    </div>
  );
};
