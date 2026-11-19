// Legal Policies Page (/privacy and /terms)
import React from 'react';
import { useLocation } from 'react-router-dom';
import { privacyContent } from '../../content/legal/privacy';
import { termsContent } from '../../content/legal/terms';
import { Breadcrumbs } from '../../components/Breadcrumbs';

export const LegalPage: React.FC = () => {
  const location = useLocation();
  const isPrivacy = location.pathname.includes('privacy');
  const content = isPrivacy ? privacyContent : termsContent;

  return (
    <div className="pt-28 pb-20 min-h-screen bg-gradient-to-b from-[#0a0f1d] via-[#050812] to-[#020409] text-white relative overflow-hidden">
      {/* Drifting aurora glow in background */}
      <div className="pointer-events-none absolute top-20 right-10 w-96 h-96 rounded-full bg-[#4F46E5]/10 blur-3xl" />
      <div className="pointer-events-none absolute bottom-20 left-10 w-96 h-96 rounded-full bg-[#38BDF8]/10 blur-3xl" />

      <div className="max-w-[800px] mx-auto px-4 md:px-8 relative z-10">
        <Breadcrumbs items={[{ label: content.title }]} />

        <div className="card-depth p-8 md:p-12 rounded-3xl relative overflow-hidden">
          <div className="border-b border-white/10 pb-6 mb-8">
            <h1 className="text-3xl font-extrabold text-white tracking-tight mb-2">
              {content.title}
            </h1>
            <span className="text-xs font-mono text-neutral-400">
              Effective Date: {content.lastUpdated}
            </span>
          </div>

          <div className="space-y-8 text-xs md:text-sm text-neutral-300 leading-relaxed">
            {content.sections.map((sec, idx) => (
              <div key={idx}>
                <h3 className="text-base font-bold text-white mb-2">
                  {sec.heading}
                </h3>
                <p>{sec.body}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
