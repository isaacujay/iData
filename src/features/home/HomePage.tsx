// Home Page (redesign)
// Scope: this file only. Same export, same props, same content/service imports,
// and only CSS classes that already exist in the project (bg-grid-pattern,
// film-grain, bg-gradient-dark-section, bg-gradient-light-section, card-depth,
// animate-aurora-1/2/3). No global styles or other pages are touched.
import React from 'react';
import { Link } from 'react-router-dom';
import { motion, useReducedMotion, type Variants } from 'framer-motion';
import {
  ArrowRight,
  Calendar,
  CheckCircle2,
  ChevronRight,
  Cpu,
  ShieldCheck,
  Activity,
  Star,
} from 'lucide-react';
import { getServices } from '../../content/services';
import { getFeaturedVideo } from '../../content/videos';
import { getStats } from '../../content/stats';
import { getSeedReviews } from '../../content/reviews';
import { ServiceCard, StatCard } from '../../components/Card';
import { Marquee } from '../../components/Marquee';
import { VideoEmbed } from '../../components/VideoEmbed';

export interface HomePageProps {
  onOpenBooking: () => void;
}

// Swap this to /images/hero-bg.webp once you have an optimized WebP.
const HERO_BG_SRC = '/images/hero/heroImage.png';

const TRUST_POINTS = [
  { icon: CheckCircle2, label: 'Fixed-scope sprint delivery' },
  { icon: ShieldCheck, label: 'SOC-2 & HIPAA-ready architecture' },
  { icon: Activity, label: 'Direct client portal visibility' },
] as const;

export const HomePage: React.FC<HomePageProps> = ({ onOpenBooking }) => {
  const services = getServices();
  const featuredVideo = getFeaturedVideo();
  const stats = getStats().slice(0, 3);
  const reviews = getSeedReviews().slice(0, 3);
  const [featuredReview, ...otherReviews] = reviews;

  const shouldReduceMotion = useReducedMotion();

  // One orchestrated entrance for the hero (children stagger in sequence).
  const heroContainer: Variants = shouldReduceMotion
    ? { hidden: {}, show: {} }
    : { hidden: {}, show: { transition: { staggerChildren: 0.1, delayChildren: 0.05 } } };

  const heroItem: Variants = shouldReduceMotion
    ? { hidden: { opacity: 1 }, show: { opacity: 1 } }
    : {
        hidden: { opacity: 0, y: 16 },
        show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: 'easeOut' } },
      };

  return (
    <div className="relative min-h-screen bg-[#030712]">
      {/* ---------------------------------------------------------------------- */}
      {/* 1. HERO: full-bleed image, truly centered content                       */}
      {/* ---------------------------------------------------------------------- */}
      <section className="relative isolate flex min-h-[92vh] items-center justify-center overflow-hidden px-4 pb-32 pt-32 sm:px-6 md:pb-24 md:pt-36 lg:px-8">
        {/* Background image (LCP element: eager, high priority) */}
        <img
          src={HERO_BG_SRC}
          alt=""
          width={1920}
          height={1080}
          fetchPriority="high"
          decoding="async"
          className="absolute inset-0 -z-10 h-full w-full object-cover object-center"
        />

        {/* Readability layers: flat tint, centered vignette, top + bottom fades */}
        <div className="absolute inset-0 -z-10 bg-[#030712]/55" />
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_70%_60%_at_50%_45%,rgba(3,7,18,0.80)_0%,rgba(3,7,18,0.45)_55%,rgba(3,7,18,0)_100%)]" />
        <div className="absolute inset-x-0 top-0 -z-10 h-40 bg-gradient-to-b from-[#030712]/90 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 -z-10 h-56 bg-gradient-to-b from-transparent to-[#030712]" />
        <div className="absolute inset-0 -z-10 bg-grid-pattern opacity-20" />
        <div className="pointer-events-none absolute left-1/2 top-1/3 -z-10 h-[420px] w-[720px] -translate-x-1/2 rounded-full bg-[#4F46E5] opacity-20 blur-[140px] animate-aurora-1" />

        <motion.div
          variants={heroContainer}
          initial="hidden"
          animate="show"
          className="relative z-10 mx-auto flex w-full max-w-4xl flex-col items-center text-center"
        >
          <motion.div
            variants={heroItem}
            className="mb-6 inline-flex max-w-full items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-1.5 text-xs font-medium text-neutral-200 backdrop-blur-md sm:text-sm"
          >
            <Cpu className="h-4 w-4 shrink-0 text-white" />
            <span className="truncate">Enterprise AI &amp; software engineering squad</span>
          </motion.div>

          <motion.h1
            variants={heroItem}
            className="mb-6 text-balance text-4xl font-extrabold leading-[1.08] tracking-tight text-white sm:text-5xl lg:text-6xl xl:text-7xl"
          >
            Turning business data into{' '}
            <span className="bg-gradient-to-r from-white to-neutral-400 bg-clip-text text-transparent">
              decisions through AI
            </span>
            , analytics and software.
          </motion.h1>

          <motion.p
            variants={heroItem}
            className="mx-auto mb-9 max-w-2xl text-pretty text-base leading-relaxed text-neutral-300 sm:text-lg"
          >
            We build production-grade agentic systems, executive dashboards, and modern software
            for teams ready to turn operational data into faster decisions.
          </motion.p>

          <motion.div
            variants={heroItem}
            className="mb-12 flex w-full flex-col items-stretch justify-center gap-3 sm:w-auto sm:flex-row sm:items-center"
          >
            <Link
              to="/contact"
              className="inline-flex min-h-12 items-center justify-center gap-2 whitespace-nowrap rounded-xl bg-white px-8 py-3.5 text-sm font-bold text-black shadow-lg shadow-white/10 transition-colors hover:bg-neutral-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
            >
              <span>Request a Quote</span>
              <ArrowRight className="h-4 w-4" />
            </Link>
            <button
              type="button"
              onClick={onOpenBooking}
              className="inline-flex min-h-12 items-center justify-center gap-2 whitespace-nowrap rounded-xl border border-white/25 bg-white/5 px-8 py-3.5 text-sm font-semibold text-white backdrop-blur-sm transition-colors hover:border-white/40 hover:bg-white/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
            >
              <Calendar className="h-4 w-4" />
              <span>Book a Call</span>
            </button>
          </motion.div>

          <motion.ul
            variants={heroItem}
            className="flex w-full max-w-3xl flex-wrap items-center justify-center gap-x-8 gap-y-3 border-t border-white/15 pt-6 text-sm text-neutral-300"
          >
            {TRUST_POINTS.map(({ icon: Icon, label }) => (
              <li key={label} className="flex items-center gap-2">
                <Icon className="h-4 w-4 shrink-0 text-white" />
                <span>{label}</span>
              </li>
            ))}
          </motion.ul>
        </motion.div>
      </section>

      {/* ---------------------------------------------------------------------- */}
      {/* 2. TECH MARQUEE                                                         */}
      {/* ---------------------------------------------------------------------- */}
      <Marquee />

      {/* ---------------------------------------------------------------------- */}
      {/* 3. SERVICES (light section)                                             */}
      {/* ---------------------------------------------------------------------- */}
      <section className="relative overflow-hidden bg-gradient-light-section py-24 text-slate-900 md:py-28">
        <div className="pointer-events-none absolute -top-20 left-10 h-96 w-96 rounded-full bg-[#4F46E5] opacity-15 blur-[120px]" />
        <div className="pointer-events-none absolute bottom-0 right-10 h-96 w-96 rounded-full bg-[#7C3AED] opacity-15 blur-[120px]" />

        <div className="relative z-10 mx-auto max-w-[1200px] px-4 md:px-8">
          <div className="mb-14 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <div className="max-w-2xl">
              <p className="mb-3 text-sm font-semibold text-slate-600">What we build</p>
              <h2 className="text-balance text-3xl font-extrabold tracking-tight text-slate-950 md:text-5xl">
                Architected for real business impact.
              </h2>
            </div>
            <Link
              to="/services"
              className="inline-flex items-center gap-1.5 text-sm font-bold text-slate-900 transition-colors hover:text-slate-600"
            >
              <span>Explore all service scopes</span>
              <ChevronRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 md:gap-8">
            {services.map((service, index) => (
              <ServiceCard key={service.id} service={service} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* ---------------------------------------------------------------------- */}
      {/* 4. FEATURED DEMO + PROOF (dark section)                                 */}
      {/* ---------------------------------------------------------------------- */}
      <section className="film-grain relative overflow-hidden border-y border-white/10 bg-gradient-dark-section py-24 md:py-28">
        <div className="pointer-events-none absolute inset-0 bg-grid-pattern opacity-20" />
        <div className="pointer-events-none absolute left-1/4 top-10 h-[500px] w-[500px] rounded-full bg-[#4F46E5] opacity-25 blur-[130px] animate-aurora-1" />
        <div className="pointer-events-none absolute bottom-10 left-10 h-[400px] w-[400px] rounded-full bg-[#38BDF8] opacity-15 blur-[110px] animate-aurora-3" />

        <div className="relative z-10 mx-auto max-w-[1200px] px-4 md:px-8">
          <div className="mx-auto mb-12 max-w-3xl text-center">
            <p className="mb-3 text-sm font-semibold text-neutral-400">System walkthrough</p>
            <h2 className="text-balance text-3xl font-extrabold tracking-tight text-white md:text-5xl">
              Watch how we automate production data pipelines.
            </h2>
          </div>

          <div className="grid grid-cols-1 items-center gap-8 lg:grid-cols-12 lg:gap-10">
            <div className="lg:col-span-7">
              <VideoEmbed video={featuredVideo} />
            </div>

            <div className="space-y-4 lg:col-span-5">
              {stats.map((stat, idx) => (
                <StatCard
                  key={idx}
                  value={stat.value}
                  suffix={stat.suffix}
                  prefix={stat.prefix}
                  label={stat.label}
                  description={stat.description}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ---------------------------------------------------------------------- */}
      {/* 5. REVIEWS (light section, one featured quote + two supporting)         */}
      {/* ---------------------------------------------------------------------- */}
      <section className="relative overflow-hidden bg-gradient-light-section py-24 text-slate-900 md:py-28">
        <div className="pointer-events-none absolute -top-10 right-20 h-80 w-80 rounded-full bg-[#7C3AED] opacity-15 blur-[120px]" />
        <div className="pointer-events-none absolute bottom-0 left-20 h-80 w-80 rounded-full bg-[#4F46E5] opacity-15 blur-[120px]" />

        <div className="relative z-10 mx-auto max-w-[1200px] px-4 md:px-8">
          <div className="mb-14 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <div className="max-w-2xl">
              <p className="mb-3 text-sm font-semibold text-slate-600">Client reviews</p>
              <h2 className="text-balance text-3xl font-extrabold tracking-tight text-slate-950 md:text-5xl">
                Trusted by founders and enterprise leaders.
              </h2>
            </div>
            <Link
              to="/reviews"
              className="inline-flex items-center gap-1.5 text-sm font-bold text-slate-900 transition-colors hover:text-slate-600"
            >
              <span>Read all client reviews</span>
              <ChevronRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 gap-6 lg:grid-cols-5">
            {featuredReview && (
              <figure className="card-depth flex flex-col justify-between rounded-2xl p-8 md:p-10 lg:col-span-3">
                <div>
                  <div className="mb-6 flex items-center gap-1" aria-label="5 out of 5 stars">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-white text-white" />
                    ))}
                  </div>
                  <blockquote className="text-lg leading-relaxed text-white md:text-2xl md:leading-snug">
                    “{featuredReview.body}”
                  </blockquote>
                </div>
                <figcaption className="mt-8 flex items-center gap-3 border-t border-white/10 pt-5">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full border border-white/20 bg-white/10 text-sm font-bold text-white">
                    {featuredReview.author_name.charAt(0)}
                  </div>
                  <div>
                    <div className="text-sm font-bold text-white">{featuredReview.author_name}</div>
                    <div className="text-xs text-neutral-400">
                      {featuredReview.role_title}, {featuredReview.company}
                    </div>
                  </div>
                </figcaption>
              </figure>
            )}

            <div className="grid grid-cols-1 gap-6 lg:col-span-2">
              {otherReviews.map((rev) => (
                <figure key={rev.id} className="card-depth flex flex-col justify-between rounded-2xl p-7">
                  <div>
                    <div className="mb-4 flex items-center gap-1" aria-label="5 out of 5 stars">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="h-3.5 w-3.5 fill-white text-white" />
                      ))}
                    </div>
                    <blockquote className="mb-5 text-sm leading-relaxed text-neutral-200">
                      “{rev.body}”
                    </blockquote>
                  </div>
                  <figcaption className="flex items-center gap-3 border-t border-white/10 pt-4">
                    <div className="flex h-9 w-9 items-center justify-center rounded-full border border-white/20 bg-white/10 text-xs font-bold text-white">
                      {rev.author_name.charAt(0)}
                    </div>
                    <div>
                      <div className="text-xs font-bold text-white">{rev.author_name}</div>
                      <div className="text-[11px] text-neutral-400">
                        {rev.role_title}, {rev.company}
                      </div>
                    </div>
                  </figcaption>
                </figure>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ---------------------------------------------------------------------- */}
      {/* 6. FINAL CTA                                                            */}
      {/* ---------------------------------------------------------------------- */}
      <section className="film-grain relative overflow-hidden bg-gradient-dark-section py-24 md:py-28">
        <div className="pointer-events-none absolute left-1/2 top-1/2 h-[350px] w-[700px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#4F46E5] opacity-25 blur-[140px] animate-aurora-1" />
        <div className="pointer-events-none absolute bottom-0 right-1/4 h-[400px] w-[400px] rounded-full bg-[#7C3AED] opacity-20 blur-[130px] animate-aurora-2" />

        <div className="relative z-10 mx-auto max-w-[1200px] px-4 text-center md:px-8">
          <h2 className="mx-auto mb-6 max-w-3xl text-balance text-3xl font-extrabold tracking-tight text-white sm:text-4xl md:text-5xl">
            Let’s engineer your next data or AI breakthrough.
          </h2>
          <p className="mx-auto mb-10 max-w-xl text-base leading-relaxed text-neutral-300">
            Tell us about your operational challenge. We will return an itemized technical proposal
            and delivery timeline within 48 hours.
          </p>

          <div className="flex flex-col items-stretch justify-center gap-4 sm:flex-row sm:items-center">
            <Link
              to="/contact"
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-white px-8 py-4 text-sm font-bold text-black shadow-lg shadow-white/10 transition-colors hover:bg-neutral-200"
            >
              <span>Request a Quote</span>
              <ArrowRight className="h-4 w-4" />
            </Link>
            <button
              type="button"
              onClick={onOpenBooking}
              className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/20 bg-white/10 px-8 py-4 text-sm font-semibold text-white transition-colors hover:bg-white/20"
            >
              <Calendar className="h-4 w-4" />
              <span>Book a 30-min Discovery Call</span>
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};