// Unified Card Component with Variants
// Pure black & white typography and controls, with subtle gradient depths and colored glow on hover

import React, { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { 
  ArrowRight, 
  CheckCircle2, 
  Star, 
  Bot, 
  BarChart3, 
  LineChart, 
  Code, 
  ChevronRight
} from 'lucide-react';
import { Service, CaseStudy, Review, TeamMember } from '../types';

// ==============================================================================
// 1. SERVICE CARD (With Cursor Spotlight, 3D Tilt, and Glow on Hover)
// ==============================================================================
export interface ServiceCardProps {
  service: Service;
  index?: number;
}

const serviceIcons: Record<string, React.ReactNode> = {
  Bot: <Bot className="w-5 h-5 text-white" />,
  BarChart3: <BarChart3 className="w-5 h-5 text-white" />,
  LineChart: <LineChart className="w-5 h-5 text-white" />,
  Code: <Code className="w-5 h-5 text-white" />,
};

export const ServiceCard: React.FC<ServiceCardProps> = ({ service, index = 0 }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  // 3D Tilt springs
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [5, -5]), { stiffness: 300, damping: 25 });
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-5, 5]), { stiffness: 300, damping: 25 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    setMousePos({ x: mouseX, y: mouseY });

    const normX = (mouseX / rect.width) - 0.5;
    const normY = (mouseY / rect.height) - 0.5;
    x.set(normX);
    y.set(normY);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX,
        rotateY,
        transformStyle: 'preserve-3d',
      }}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.5, delay: index * 0.08 }}
      className="card-depth relative rounded-2xl p-8 flex flex-col justify-between group overflow-hidden"
    >
      {/* Soft spotlight glow following cursor */}
      {isHovered && (
        <div
          className="pointer-events-none absolute -inset-px rounded-2xl transition-opacity duration-300"
          style={{
            background: `radial-gradient(350px circle at ${mousePos.x}px ${mousePos.y}px, rgba(79, 70, 229, 0.18), transparent 70%)`,
          }}
        />
      )}

      <div>
        {/* Badge with White Icon */}
        <div className="w-12 h-12 rounded-xl bg-white/10 border border-white/20 flex items-center justify-center mb-6 transition-transform duration-200 group-hover:scale-105">
          {serviceIcons[service.iconName] || <Bot className="w-5 h-5 text-white" />}
        </div>

        {/* Title & One-line promise (Pure White & Light Neutral Text) */}
        <h3 className="text-xl font-bold text-white mb-2 tracking-tight">
          {service.title}
        </h3>
        <p className="text-sm text-neutral-300 mb-6 leading-relaxed">
          {service.shortDescription}
        </p>

        {/* 3 mini bullet points */}
        <ul className="space-y-2.5 mb-8">
          {service.bullets.map((bullet, idx) => (
            <li key={idx} className="flex items-start gap-2.5 text-xs text-neutral-300">
              <span className="w-1.5 h-1.5 rounded-full bg-white mt-1.5 shrink-0" />
              <span>{bullet}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Explore Link (Black & White only) */}
      <Link
        to={`/services/${service.slug}`}
        className="inline-flex items-center gap-2 text-xs font-semibold text-white hover:text-neutral-300 transition-colors duration-200 group-hover:translate-x-1 transition-transform"
      >
        <span>Explore Service</span>
        <ArrowRight className="w-3.5 h-3.5" />
      </Link>
    </motion.div>
  );
};

// ==============================================================================
// 2. CASE STUDY CARD
// ==============================================================================
export interface CaseStudyCardProps {
  caseStudy: CaseStudy;
  index?: number;
}

export const CaseStudyCard: React.FC<CaseStudyCardProps> = ({ caseStudy, index = 0 }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.45, delay: index * 0.08 }}
      className="card-depth group relative rounded-2xl flex flex-col justify-between overflow-hidden"
    >
      {/* Header Visual with Client and Tag */}
      <div className="p-6 border-b border-white/10 bg-gradient-to-br from-white/5 to-transparent">
        <div className="flex items-center justify-between gap-2 mb-3">
          <span className="text-xs font-medium text-neutral-400 uppercase tracking-wider">
            {caseStudy.client}
          </span>
          <span className="text-[11px] font-mono text-white uppercase tracking-wider">
            {caseStudy.clientType}
          </span>
        </div>
        <div className="text-2xl font-extrabold text-white tracking-tight">
          {caseStudy.resultHeadline}
        </div>
      </div>

      {/* Body Content */}
      <div className="p-6 flex-1 flex flex-col justify-between">
        <div>
          <h4 className="text-base font-semibold text-white mb-2 leading-snug">
            {caseStudy.title}
          </h4>
          <p className="text-xs text-neutral-300 leading-relaxed mb-6 line-clamp-3">
            {caseStudy.summary}
          </p>
        </div>

        <div>
          {/* Tools row */}
          <div className="flex flex-wrap items-center gap-1.5 mb-5 text-[11px] text-neutral-400">
            {caseStudy.tools.slice(0, 4).map((tool, idx) => (
              <span key={idx} className="after:content-['·'] last:after:content-none after:ml-1.5">
                {tool}
              </span>
            ))}
          </div>

          <Link
            to={`/work/${caseStudy.slug}`}
            className="inline-flex items-center gap-2 text-xs font-semibold text-white hover:text-neutral-300 transition-colors"
          >
            <span>View Case Study</span>
            <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>
    </motion.div>
  );
};

// ==============================================================================
// 3. REVIEW CARD
// ==============================================================================
export interface ReviewCardProps {
  review: Review;
  compact?: boolean;
}

export const ReviewCard: React.FC<ReviewCardProps> = ({ review, compact = false }) => {
  return (
    <div className={`card-depth rounded-2xl p-6 flex flex-col justify-between ${compact ? 'h-full' : ''}`}>
      <div>
        {/* Star Rating & Verified tag (Clean Monochrome) */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-1">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`w-3.5 h-3.5 ${
                  i < review.rating
                    ? 'text-white fill-white'
                    : 'text-neutral-600'
                }`}
              />
            ))}
          </div>
          {review.status === 'approved' && (
            <span className="inline-flex items-center gap-1 text-[11px] text-neutral-300 font-medium">
              <CheckCircle2 className="w-3 h-3 text-white" />
              Verified Client
            </span>
          )}
        </div>

        {/* Review Quote Body */}
        <p className="text-sm text-neutral-200 leading-relaxed italic mb-6">
          "{review.body}"
        </p>
      </div>

      {/* Author Profile */}
      <div className="flex items-center gap-3 pt-4 border-t border-white/10">
        <div className="w-9 h-9 rounded-full bg-white/10 border border-white/20 flex items-center justify-center font-bold text-xs text-white shrink-0">
          {review.author_name.charAt(0)}
        </div>
        <div className="min-w-0">
          <div className="text-xs font-semibold text-white truncate">
            {review.author_name}
          </div>
          <div className="text-[11px] text-neutral-400 truncate">
            {review.role_title} · {review.company}
          </div>
        </div>
      </div>
    </div>
  );
};

// ==============================================================================
// 4. TEAM CARD
// ==============================================================================
export interface TeamCardProps {
  member: TeamMember;
  onSelect?: (member: TeamMember) => void;
}

export const TeamCard: React.FC<TeamCardProps> = ({ member, onSelect }) => {
  return (
    <div 
      onClick={() => onSelect && onSelect(member)}
      className="card-depth group relative rounded-2xl p-6 transition-all duration-300 cursor-pointer flex flex-col justify-between"
    >
      <div>
        {/* Portrait / Avatar placeholder */}
        <div className="relative w-full aspect-square rounded-xl bg-white/5 mb-5 overflow-hidden border border-white/10 flex items-center justify-center">
          <div className="text-3xl font-extrabold text-white/30 select-none">
            {member.name.split(' ').map(n => n[0]).join('')}
          </div>
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
          <div className="absolute bottom-3 left-3 text-[11px] font-mono text-neutral-300 uppercase tracking-wider">
            {member.area}
          </div>
        </div>

        {/* Name & Title */}
        <h3 className="text-lg font-bold text-white mb-1">
          {member.name}
        </h3>
        <p className="text-xs text-neutral-300 font-medium mb-3">
          {member.title}
        </p>
        <p className="text-xs text-neutral-400 leading-relaxed line-clamp-2 mb-4">
          {member.bio}
        </p>
      </div>

      {/* Focus chips */}
      <div className="pt-3 border-t border-white/10">
        <div className="flex flex-wrap gap-1.5 text-[11px] text-neutral-400">
          {member.focus.map((f, idx) => (
            <span key={idx} className="after:content-['·'] last:after:content-none after:ml-1.5">
              {f}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

// ==============================================================================
// 5. STAT CARD (With Animated Counter)
// ==============================================================================
export interface StatCardProps {
  value: number;
  suffix?: string;
  prefix?: string;
  label: string;
  description?: string;
}

export const StatCard: React.FC<StatCardProps> = ({
  value,
  suffix = '',
  prefix = '',
  label,
  description
}) => {
  const [displayValue, setDisplayValue] = useState(0);
  const [hasAnimated, setHasAnimated] = useState(false);

  React.useEffect(() => {
    if (!hasAnimated) return;

    const duration = 1200;
    const startTime = performance.now();

    const updateCounter = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const easedProgress = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
      const current = Math.floor(easedProgress * value);
      setDisplayValue(current);

      if (progress < 1) {
        requestAnimationFrame(updateCounter);
      } else {
        setDisplayValue(value);
      }
    };

    requestAnimationFrame(updateCounter);
  }, [hasAnimated, value]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      onViewportEnter={() => setHasAnimated(true)}
      className="card-depth p-6 rounded-2xl flex flex-col justify-between"
    >
      <div className="text-3xl md:text-4xl font-extrabold text-white tracking-tight font-mono tabular-nums mb-1">
        {prefix}{displayValue.toLocaleString()}{suffix}
      </div>
      <div>
        <div className="text-sm font-bold text-white mb-1">
          {label}
        </div>
        {description && (
          <p className="text-xs text-neutral-400 leading-relaxed">
            {description}
          </p>
        )}
      </div>
    </motion.div>
  );
};

// ==============================================================================
// 6. NEXT STEP CARD (Bottom of every page for CTA navigation)
// ==============================================================================
export interface NextStepCardProps {
  title: string;
  description: string;
  to: string;
  icon?: React.ReactNode;
}

export const NextStepCard: React.FC<NextStepCardProps> = ({
  title,
  description,
  to,
  icon = <ArrowRight className="w-5 h-5 text-white" />
}) => {
  return (
    <Link
      to={to}
      className="card-depth group p-6 rounded-2xl flex items-center justify-between gap-4"
    >
      <div>
        <h4 className="text-base font-bold text-white mb-1">
          {title}
        </h4>
        <p className="text-xs text-neutral-400 leading-relaxed">
          {description}
        </p>
      </div>
      <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center shrink-0 group-hover:bg-white group-hover:text-black group-hover:translate-x-1 transition-all text-white">
        {icon}
      </div>
    </Link>
  );
};
