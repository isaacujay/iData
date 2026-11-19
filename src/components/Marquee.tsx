// Continuous infinite marquee strip with opposing rows, pause on hover, edge gradient fade, and deep gradient depth
import React from 'react';
import { getTechMarquee, TechPartner } from '../content/partners';

export const Marquee: React.FC = () => {
  const { row1, row2 } = getTechMarquee();

  const duplicatedRow1 = [...row1, ...row1, ...row1];
  const duplicatedRow2 = [...row2, ...row2, ...row2];

  return (
    <div className="relative w-full py-10 overflow-hidden bg-gradient-to-r from-[#030712] via-[#0c1222] to-[#030712] border-y border-white/10 select-none">
      {/* Edge gradient fades for seamless disappearance */}
      <div className="pointer-events-none absolute inset-y-0 left-0 w-24 md:w-44 bg-gradient-to-r from-[#030712] to-transparent z-10" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-24 md:w-44 bg-gradient-to-l from-[#030712] to-transparent z-10" />

      {/* Row 1: Left to Right */}
      <div className="flex w-max mb-4 group hover:[animation-play-state:paused] animate-marquee-left">
        {duplicatedRow1.map((item, idx) => (
          <MarqueeItem key={`r1-${idx}`} item={item} />
        ))}
      </div>

      {/* Row 2: Right to Left */}
      <div className="flex w-max group hover:[animation-play-state:paused] animate-marquee-right">
        {duplicatedRow2.map((item, idx) => (
          <MarqueeItem key={`r2-${idx}`} item={item} />
        ))}
      </div>

      <style>{`
        @keyframes marquee-left {
          0% { transform: translateX(0%); }
          100% { transform: translateX(-33.333%); }
        }
        @keyframes marquee-right {
          0% { transform: translateX(-33.333%); }
          100% { transform: translateX(0%); }
        }
        .animate-marquee-left {
          animation: marquee-left 35s linear infinite;
        }
        .animate-marquee-right {
          animation: marquee-right 38s linear infinite;
        }
        @media (prefers-reduced-motion: reduce) {
          .animate-marquee-left, .animate-marquee-right {
            animation-duration: 120s;
          }
        }
      `}</style>
    </div>
  );
};

const MarqueeItem: React.FC<{ item: TechPartner }> = ({ item }) => {
  return (
    <div className="flex items-center gap-3 px-5 py-2.5 mx-2 rounded-xl bg-white/[0.04] border border-white/10 hover:border-white/30 hover:bg-white/[0.08] transition-all duration-200 shrink-0">
      <div className="w-7 h-7 rounded-lg bg-white/10 border border-white/15 flex items-center justify-center font-mono text-[11px] font-bold text-white">
        {item.symbol}
      </div>
      <div>
        <div className="text-xs font-semibold text-white whitespace-nowrap">
          {item.name}
        </div>
        <div className="text-[10px] text-neutral-400 whitespace-nowrap">
          {item.category}
        </div>
      </div>
    </div>
  );
};
