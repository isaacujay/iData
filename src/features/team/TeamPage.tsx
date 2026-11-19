// Team Page: Leadership & People (Section 7.1)
// Gradient backdrop, film grain, soft aurora blooms, no numbering in labels, monochrome controls
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  X, 
  Linkedin, 
  Github, 
  Mail, 
  ArrowRight, 
  CheckCircle2
} from 'lucide-react';
import { getLeadership, getCoreTeam, getExtendedNetwork } from '../../content/team';
import { TeamMember } from '../../types';
import { siteConfig } from '../../config/site.config';
import { Breadcrumbs } from '../../components/Breadcrumbs';
import { NextStepCard } from '../../components/Card';
import { Link } from 'react-router-dom';

export const TeamPage: React.FC = () => {
  const leadership = getLeadership();
  const coreTeam = getCoreTeam();
  const extendedNetwork = getExtendedNetwork();

  const [selectedMember, setSelectedMember] = useState<TeamMember | null>(null);
  const [coreAreaFilter, setCoreAreaFilter] = useState<'All' | 'AI & ML' | 'Data Analytics' | 'Software Engineering' | 'Delivery & Operations'>('All');

  const filteredCore = coreAreaFilter === 'All'
    ? coreTeam
    : coreTeam.filter(m => m.area === coreAreaFilter);

  return (
    <div className="pt-28 pb-20 min-h-screen bg-gradient-dark-section film-grain relative overflow-hidden">
      {/* Drifting aurora blooms */}
      <div className="pointer-events-none absolute top-10 left-10 w-[500px] h-[500px] rounded-full bg-[#4F46E5] opacity-20 blur-[130px] animate-aurora-1" />
      <div className="pointer-events-none absolute bottom-20 right-10 w-[450px] h-[450px] rounded-full bg-[#7C3AED] opacity-15 blur-[120px] animate-aurora-2" />

      <div className="max-w-[1200px] mx-auto px-4 md:px-8 relative z-10">
        <Breadcrumbs items={[{ label: 'Leadership & Team' }]} />

        {/* Page Header */}
        <div className="max-w-3xl mb-16">
          <span className="text-xs font-mono uppercase tracking-widest text-neutral-400 block mb-3">
            Our People & Delivery Squads
          </span>
          <h1 className="text-3xl md:text-5xl font-extrabold text-white tracking-tight leading-tight mb-6">
            Senior leadership paired with vetted domain specialists.
          </h1>
          <p className="text-base md:text-lg text-neutral-300 leading-relaxed">
            IData delivers complex technical projects through a dedicated core engineering squad supported by an elite international network of vetted contributors. We represent proven collective delivery, not an isolated freelancer.
          </p>
        </div>

        {/* ------------------------------------------------------------------ */}
        {/* LEADERSHIP LAYER (No numbering) */}
        {/* ------------------------------------------------------------------ */}
        <div className="mb-24">
          <div className="flex items-center gap-3 mb-8">
            <h2 className="text-xs font-mono uppercase tracking-widest text-neutral-400">
              Executive & Practice Leadership
            </h2>
            <div className="flex-1 h-px bg-white/10" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {leadership.map((leader) => (
              <div
                key={leader.id}
                onClick={() => setSelectedMember(leader)}
                className="card-depth group p-8 rounded-3xl transition-all duration-300 cursor-pointer flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-start justify-between gap-4 mb-6">
                    <div className="flex items-center gap-4">
                      {/* Big portrait placeholder */}
                      <div className="w-20 h-20 rounded-2xl bg-white/10 border border-white/20 flex items-center justify-center font-bold text-2xl text-white shrink-0 group-hover:scale-105 transition-transform">
                        {leader.name.split(' ').map(n => n[0]).join('')}
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-white transition-colors">
                          {leader.name}
                        </h3>
                        <p className="text-xs font-semibold text-neutral-300">
                          {leader.title}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* 2-line Bio */}
                  <p className="text-xs text-neutral-400 leading-relaxed mb-6 line-clamp-2">
                    {leader.bio}
                  </p>

                  {/* 3 Focus Areas */}
                  <div className="space-y-1.5 mb-6">
                    <span className="text-[11px] font-mono text-neutral-300 uppercase block">
                      Core Focus:
                    </span>
                    {leader.focus.map((f, idx) => (
                      <div key={idx} className="flex items-center gap-2 text-xs text-neutral-300">
                        <CheckCircle2 className="w-3.5 h-3.5 text-white shrink-0" />
                        <span>{f}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Footer with Social Links & Click hint */}
                <div className="pt-4 border-t border-white/10 flex items-center justify-between text-xs text-neutral-400">
                  <div className="flex items-center gap-3" onClick={e => e.stopPropagation()}>
                    {leader.links.linkedin && (
                      <a href={leader.links.linkedin} target="_blank" rel="noopener noreferrer" className="hover:text-white">
                        <Linkedin className="w-4 h-4 text-white" />
                      </a>
                    )}
                    {leader.links.github && (
                      <a href={leader.links.github} target="_blank" rel="noopener noreferrer" className="hover:text-white">
                        <Github className="w-4 h-4 text-white" />
                      </a>
                    )}
                    {leader.links.email && (
                      <a href={leader.links.email} className="hover:text-white">
                        <Mail className="w-4 h-4 text-white" />
                      </a>
                    )}
                  </div>

                  <span className="text-[11px] font-medium text-white group-hover:translate-x-1 transition-transform inline-flex items-center gap-1">
                    <span>View Full Profile</span>
                    <ArrowRight className="w-3 h-3 text-white" />
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ------------------------------------------------------------------ */}
        {/* CORE TEAM LAYER (No numbering) */}
        {/* ------------------------------------------------------------------ */}
        <div className="mb-24">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
            <h2 className="text-xs font-mono uppercase tracking-widest text-neutral-400">
              Core Engineering Squad
            </h2>

            {/* Filter Chips */}
            <div className="flex flex-wrap items-center gap-2">
              {[
                'All',
                'AI & ML',
                'Data Analytics',
                'Software Engineering',
                'Delivery & Operations'
              ].map((area) => (
                <button
                  key={area}
                  onClick={() => setCoreAreaFilter(area as any)}
                  className={`px-3 py-1 rounded-lg text-xs font-medium transition-colors cursor-pointer ${
                    coreAreaFilter === area
                      ? 'bg-white text-black font-bold'
                      : 'bg-white/5 text-neutral-400 hover:text-white border border-white/10'
                  }`}
                >
                  {area}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {filteredCore.map((member) => (
              <div
                key={member.id}
                className="card-depth p-6 rounded-2xl flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 rounded-xl bg-white/10 border border-white/15 flex items-center justify-center font-bold text-sm text-white">
                      {member.name.split(' ').map(n => n[0]).join('')}
                    </div>
                    <div>
                      <h3 className="text-sm font-bold text-white">
                        {member.name}
                      </h3>
                      <p className="text-[11px] text-neutral-300 font-medium">
                        {member.title}
                      </p>
                    </div>
                  </div>

                  <p className="text-xs text-neutral-400 leading-relaxed mb-4">
                    {member.bio}
                  </p>
                </div>

                <div className="pt-3 border-t border-white/10 flex items-center justify-between">
                  <div className="flex flex-wrap gap-1 text-[10px] text-neutral-400">
                    {member.focus.map((f, idx) => (
                      <span key={idx} className="after:content-['·'] last:after:content-none after:ml-1">
                        {f}
                      </span>
                    ))}
                  </div>

                  <div className="flex items-center gap-2 text-neutral-400">
                    {member.links.github && (
                      <a href={member.links.github} target="_blank" rel="noopener noreferrer" className="hover:text-white">
                        <Github className="w-3.5 h-3.5 text-white" />
                      </a>
                    )}
                    {member.links.linkedin && (
                      <a href={member.links.linkedin} target="_blank" rel="noopener noreferrer" className="hover:text-white">
                        <Linkedin className="w-3.5 h-3.5 text-white" />
                      </a>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ------------------------------------------------------------------ */}
        {/* EXTENDED NETWORK (No numbering) */}
        {/* ------------------------------------------------------------------ */}
        {siteConfig.features.enableExtendedNetwork && (
          <div className="card-depth mb-24 p-8 md:p-12 rounded-3xl relative overflow-hidden">
            <div className="max-w-2xl mb-8">
              <span className="text-xs font-mono uppercase tracking-widest text-neutral-400 block mb-2">
                Extended Specialist Network
              </span>
              <h2 className="text-2xl font-bold text-white mb-2">
                Vetted Domain Specialists On-Demand
              </h2>
              <p className="text-xs text-neutral-300 leading-relaxed">
                When an engagement requires highly specialized domain knowledge (such as clinical genomics or African local settlement rails), we augment our core squad with vetted contractors. All code is peer-reviewed by our leadership before deployment.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {extendedNetwork.map((ext) => (
                <div key={ext.id} className="p-5 rounded-2xl bg-white/[0.04] border border-white/10">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-sm font-bold text-white">{ext.name}</h3>
                    <span className="text-[10px] font-mono text-neutral-300 bg-white/10 px-2 py-0.5 rounded border border-white/15">
                      Vetted Partner
                    </span>
                  </div>
                  <p className="text-xs text-neutral-300 mb-2">{ext.title}</p>
                  <p className="text-xs text-neutral-400 leading-relaxed mb-4">{ext.bio}</p>
                  <div className="flex flex-wrap gap-1 text-[10px] text-neutral-400 border-t border-white/10 pt-2">
                    {ext.focus.map((f, i) => (
                      <span key={i} className="after:content-['·'] last:after:content-none after:ml-1">{f}</span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Leadership Detail Modal */}
        <AnimatePresence>
          {selectedMember && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setSelectedMember(null)}
                className="fixed inset-0 bg-black/85 backdrop-blur-md"
              />

              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="card-depth relative w-full max-w-xl rounded-3xl p-8 shadow-2xl z-10 border border-white/20"
              >
                <button
                  onClick={() => setSelectedMember(null)}
                  className="absolute top-6 right-6 p-1.5 rounded-lg text-neutral-400 hover:text-white hover:bg-white/10 transition-colors"
                  aria-label="Close modal"
                >
                  <X className="w-5 h-5 text-white" />
                </button>

                <div className="flex items-center gap-4 mb-6">
                  <div className="w-16 h-16 rounded-2xl bg-white/10 border border-white/20 flex items-center justify-center text-xl font-bold text-white">
                    {selectedMember.name.split(' ').map(n => n[0]).join('')}
                  </div>
                  <div>
                    <h3 className="text-xl font-extrabold text-white">
                      {selectedMember.name}
                    </h3>
                    <p className="text-xs text-neutral-300 font-semibold">
                      {selectedMember.title}
                    </p>
                  </div>
                </div>

                <div className="space-y-4 text-xs text-neutral-300 leading-relaxed mb-6">
                  <p>{selectedMember.bio}</p>
                </div>

                {selectedMember.leadsServices && selectedMember.leadsServices.length > 0 && (
                  <div className="mb-6 p-4 rounded-xl bg-white/[0.04] border border-white/10">
                    <span className="text-[11px] font-mono text-neutral-300 uppercase tracking-wider block mb-2">
                      Directly Leads Practices:
                    </span>
                    <div className="flex flex-wrap gap-2">
                      {selectedMember.leadsServices.map(slug => (
                        <Link
                          key={slug}
                          to={`/services/${slug}`}
                          onClick={() => setSelectedMember(null)}
                          className="px-3 py-1 rounded-lg bg-white/10 border border-white/15 text-xs text-white hover:bg-white hover:text-black flex items-center gap-1.5 transition-colors"
                        >
                          <span className="capitalize">{slug.replace(/-/g, ' ')}</span>
                          <ArrowRight className="w-3 h-3" />
                        </Link>
                      ))}
                    </div>
                  </div>
                )}

                <div className="flex items-center justify-between pt-4 border-t border-white/10">
                  <div className="flex items-center gap-3">
                    {selectedMember.links.linkedin && (
                      <a href={selectedMember.links.linkedin} target="_blank" rel="noopener noreferrer" className="text-neutral-400 hover:text-white">
                        <Linkedin className="w-4 h-4 text-white" />
                      </a>
                    )}
                    {selectedMember.links.github && (
                      <a href={selectedMember.links.github} target="_blank" rel="noopener noreferrer" className="text-neutral-400 hover:text-white">
                        <Github className="w-4 h-4 text-white" />
                      </a>
                    )}
                  </div>

                  <Link
                    to="/contact"
                    onClick={() => setSelectedMember(null)}
                    className="px-4 py-2 rounded-xl bg-white text-black font-bold text-xs hover:bg-neutral-200 transition-colors"
                  >
                    Schedule Call with {selectedMember.name.split(' ')[0]}
                  </Link>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>

        {/* Next Step Band */}
        <div>
          <h3 className="text-xs font-mono uppercase tracking-wider text-neutral-400 mb-4">
            Next Steps
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <NextStepCard
              title="Work With Us"
              description="Request an engineering proposal for your upcoming project."
              to="/contact"
            />
            <NextStepCard
              title="Schedule a Discovery Call"
              description="Speak directly with our technical founder about requirements."
              to="/contact"
            />
            <NextStepCard
              title="Explore Case Studies"
              description="See systems our leadership squad has built and deployed."
              to="/work"
            />
          </div>
        </div>
      </div>
    </div>
  );
};
