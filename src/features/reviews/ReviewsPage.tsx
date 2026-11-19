// Reviews Page Showpiece (/reviews)
// Gradient backdrop, film-grain texture, aurora blooms, monochrome controls, no numbering in labels
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Star, 
  CheckCircle2, 
  ChevronLeft, 
  ChevronRight, 
  Send, 
  AlertCircle
} from 'lucide-react';
import { Review, ServiceSlug } from '../../types';
import { getApprovedReviews, submitReview } from '../../services/database';
import { sendNotification } from '../../services/notify';
import { Breadcrumbs } from '../../components/Breadcrumbs';
import { ReviewCard, NextStepCard } from '../../components/Card';
import { uploadFile } from '../../services/storage';

export interface ReviewsPageProps {
  onOpenBooking: () => void;
}

export const ReviewsPage: React.FC<ReviewsPageProps> = ({ onOpenBooking }) => {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [carouselIndex, setCarouselIndex] = useState(0);

  // Filters
  const [serviceFilter, setServiceFilter] = useState<'all' | ServiceSlug>('all');
  const [typeFilter, setTypeFilter] = useState<'all' | 'international' | 'enterprise' | 'sme' | 'agency'>('all');
  const [visibleCount, setVisibleCount] = useState(6);

  // Form state
  const [formName, setFormName] = useState('');
  const [formCompany, setFormCompany] = useState('');
  const [formRole, setFormRole] = useState('');
  const [formService, setFormService] = useState<ServiceSlug>('data-analytics-dashboards');
  const [formRating, setFormRating] = useState(5);
  const [formBody, setFormBody] = useState('');
  const [formPhoto, setFormPhoto] = useState<File | null>(null);
  const [formSubmitting, setFormSubmitting] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);

  useEffect(() => {
    loadReviews();
  }, []);

  const loadReviews = async () => {
    try {
      const data = await getApprovedReviews();
      setReviews(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const featuredReviews = reviews.filter(r => r.featured);
  const activeFeatured = featuredReviews.length > 0 ? featuredReviews : reviews;

  // Carousel autoplay
  useEffect(() => {
    if (activeFeatured.length <= 1) return;
    const timer = setInterval(() => {
      setCarouselIndex(prev => (prev + 1) % activeFeatured.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [activeFeatured.length]);

  const totalReviews = reviews.length;
  const avgRating = totalReviews > 0 
    ? (reviews.reduce((acc, r) => acc + r.rating, 0) / totalReviews).toFixed(1)
    : '5.0';

  const ratingCounts = [5, 4, 3, 2, 1].map(stars => ({
    stars,
    count: reviews.filter(r => r.rating === stars).length,
    percentage: totalReviews > 0 ? (reviews.filter(r => r.rating === stars).length / totalReviews) * 100 : 0
  }));

  const filteredReviews = reviews.filter(r => {
    const matchesService = serviceFilter === 'all' || r.service_slug === serviceFilter;
    const matchesType = typeFilter === 'all' || r.client_type === typeFilter;
    return matchesService && matchesType;
  });

  const displayedReviews = filteredReviews.slice(0, visibleCount);

  const handleReviewSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formName || !formCompany || !formBody) return;

    setFormSubmitting(true);
    setFormError(null);

    try {
      let photoPath: string | undefined = undefined;
      if (formPhoto) {
        const uploadRes = await uploadFile('review-photos', formPhoto);
        photoPath = uploadRes.path;
      }

      const newId = await submitReview({
        author_name: formName,
        company: formCompany,
        role_title: formRole || 'Client Stakeholder',
        service_slug: formService,
        rating: formRating,
        body: formBody,
        photo_path: photoPath,
        featured: false
      });

      sendNotification('review', {
        id: newId,
        author_name: formName,
        company: formCompany,
        role_title: formRole,
        service_slug: formService,
        rating: formRating,
        body: formBody
      });

      setFormSubmitted(true);
      setFormName('');
      setFormCompany('');
      setFormRole('');
      setFormBody('');
      setFormPhoto(null);
    } catch (err: any) {
      console.error(err);
      setFormError(err.message || 'Failed to submit review');
    } finally {
      setFormSubmitting(false);
    }
  };

  return (
    <div className="pt-28 pb-20 min-h-screen bg-gradient-dark-section film-grain relative overflow-hidden">
      {/* Drifting aurora blooms */}
      <div className="pointer-events-none absolute top-10 right-10 w-[500px] h-[500px] rounded-full bg-[#4F46E5] opacity-20 blur-[130px] animate-aurora-1" />
      <div className="pointer-events-none absolute bottom-20 left-10 w-[450px] h-[450px] rounded-full bg-[#7C3AED] opacity-15 blur-[120px] animate-aurora-2" />

      <div className="max-w-[1200px] mx-auto px-4 md:px-8 relative z-10">
        <Breadcrumbs items={[{ label: 'Client Reviews' }]} />

        {/* ------------------------------------------------------------------ */}
        {/* SUMMARY HEADER */}
        {/* ------------------------------------------------------------------ */}
        <div className="card-depth grid grid-cols-1 lg:grid-cols-12 gap-8 items-center mb-16 p-8 md:p-12 rounded-3xl relative overflow-hidden">
          <div className="lg:col-span-6">
            <span className="text-xs font-mono uppercase tracking-widest text-neutral-400 block mb-2">
              Social Proof & Trust
            </span>
            <h1 className="text-3xl md:text-5xl font-extrabold text-white tracking-tight mb-4">
              Proven results from verified client leaders.
            </h1>
            <p className="text-sm md:text-base text-neutral-300 leading-relaxed">
              Read transparent feedback from partners across international enterprises, VC-backed fintechs, and ambitious startups who depend on IData.
            </p>
          </div>

          <div className="lg:col-span-6 p-6 rounded-2xl bg-white/[0.04] border border-white/10 flex flex-col sm:flex-row items-center gap-8">
            {/* Big Rating Number */}
            <div className="text-center sm:text-left shrink-0">
              <div className="text-5xl font-black font-mono text-white mb-1">
                {avgRating}
              </div>
              <div className="flex items-center gap-1 justify-center sm:justify-start mb-1 text-white">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-white text-white" />
                ))}
              </div>
              <div className="text-xs text-neutral-400">
                Based on {totalReviews} verified engagements
              </div>
            </div>

            {/* Rating Breakdown Bar */}
            <div className="w-full space-y-1.5 text-xs text-neutral-400">
              {ratingCounts.map(({ stars, count, percentage }) => (
                <div key={stars} className="flex items-center gap-3">
                  <span className="w-6 font-mono text-[11px] shrink-0 text-neutral-300">{stars}★</span>
                  <div className="flex-1 h-2 bg-white/10 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-white rounded-full transition-all duration-500"
                      style={{ width: `${percentage}%` }}
                    />
                  </div>
                  <span className="w-6 font-mono text-[11px] text-right shrink-0 text-neutral-300">{count}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ------------------------------------------------------------------ */}
        {/* FEATURED CAROUSEL */}
        {/* ------------------------------------------------------------------ */}
        {activeFeatured.length > 0 && (
          <div className="mb-20">
            <div className="flex items-center justify-between mb-6">
              <span className="text-xs font-mono uppercase tracking-widest text-neutral-400">
                Featured Testimonials
              </span>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setCarouselIndex(prev => (prev - 1 + activeFeatured.length) % activeFeatured.length)}
                  className="p-2 rounded-xl bg-white/10 border border-white/15 hover:bg-white/20 text-white transition-colors cursor-pointer"
                  aria-label="Previous review"
                >
                  <ChevronLeft className="w-4 h-4 text-white" />
                </button>
                <button
                  onClick={() => setCarouselIndex(prev => (prev + 1) % activeFeatured.length)}
                  className="p-2 rounded-xl bg-white/10 border border-white/15 hover:bg-white/20 text-white transition-colors cursor-pointer"
                  aria-label="Next review"
                >
                  <ChevronRight className="w-4 h-4 text-white" />
                </button>
              </div>
            </div>

            <div className="card-depth relative overflow-hidden rounded-3xl p-8 md:p-12 shadow-2xl">
              <AnimatePresence mode="wait">
                <motion.div
                  key={carouselIndex}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                  className="max-w-3xl"
                >
                  <div className="flex items-center gap-1 mb-4 text-white">
                    {[...Array(activeFeatured[carouselIndex].rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-white text-white" />
                    ))}
                  </div>

                  <blockquote className="text-lg md:text-2xl font-medium text-white leading-relaxed mb-8 italic">
                    "{activeFeatured[carouselIndex].body}"
                  </blockquote>

                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-white/10 border border-white/20 flex items-center justify-center font-bold text-base text-white">
                      {activeFeatured[carouselIndex].author_name.charAt(0)}
                    </div>
                    <div>
                      <div className="text-sm font-bold text-white">
                        {activeFeatured[carouselIndex].author_name}
                      </div>
                      <div className="text-xs text-neutral-400">
                        {activeFeatured[carouselIndex].role_title} · {activeFeatured[carouselIndex].company}
                      </div>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>

              {/* Dots Indicator */}
              <div className="flex items-center gap-2 mt-8">
                {activeFeatured.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setCarouselIndex(idx)}
                    className={`h-1.5 rounded-full transition-all cursor-pointer ${
                      idx === carouselIndex ? 'w-8 bg-white' : 'w-2 bg-white/20'
                    }`}
                    aria-label={`Go to slide ${idx + 1}`}
                  />
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ------------------------------------------------------------------ */}
        {/* OPPOSING MARQUEE ROWS */}
        {/* ------------------------------------------------------------------ */}
        <div className="mb-20 overflow-hidden py-8 border-y border-white/10 select-none relative bg-gradient-to-r from-[#030712] via-[#0c1222] to-[#030712]">
          <div className="pointer-events-none absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-[#030712] to-transparent z-10" />
          <div className="pointer-events-none absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-[#030712] to-transparent z-10" />

          {/* Row 1 Left */}
          <div className="flex w-max mb-3 animate-marquee-left hover:[animation-play-state:paused]">
            {[...reviews, ...reviews, ...reviews].map((r, i) => (
              <div key={`ml-${i}`} className="px-5 py-3 mx-2 rounded-xl bg-white/[0.04] border border-white/10 text-xs text-white flex items-center gap-3 shrink-0">
                <Star className="w-3.5 h-3.5 text-white fill-white shrink-0" />
                <span className="font-semibold text-white">{r.author_name} ({r.company}):</span>
                <span className="text-neutral-400 italic truncate max-w-xs">"{r.body}"</span>
              </div>
            ))}
          </div>

          {/* Row 2 Right */}
          <div className="flex w-max animate-marquee-right hover:[animation-play-state:paused]">
            {[...reviews, ...reviews, ...reviews].reverse().map((r, i) => (
              <div key={`mr-${i}`} className="px-5 py-3 mx-2 rounded-xl bg-white/[0.04] border border-white/10 text-xs text-white flex items-center gap-3 shrink-0">
                <Star className="w-3.5 h-3.5 text-white fill-white shrink-0" />
                <span className="font-semibold text-white">{r.company}:</span>
                <span className="text-neutral-400 truncate max-w-xs">{r.body.substring(0, 70)}...</span>
              </div>
            ))}
          </div>
        </div>

        {/* ------------------------------------------------------------------ */}
        {/* FILTER CHIPS & MASONRY WALL */}
        {/* ------------------------------------------------------------------ */}
        <div className="mb-20">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8 pb-4 border-b border-white/10">
            {/* Service Filters */}
            <div className="flex flex-wrap items-center gap-2">
              {[
                { label: 'All Reviews', value: 'all' },
                { label: 'Agentic AI', value: 'ai-agentic-systems' },
                { label: 'Analytics & BI', value: 'data-analytics-dashboards' },
                { label: 'Data Science & ML', value: 'data-science-machine-learning' },
                { label: 'Software Engineering', value: 'software-web-development' }
              ].map(f => (
                <button
                  key={f.value}
                  onClick={() => setServiceFilter(f.value as any)}
                  className={`px-3.5 py-1.5 rounded-lg text-xs font-medium transition-colors cursor-pointer ${
                    serviceFilter === f.value
                      ? 'bg-white text-black font-bold shadow-sm'
                      : 'bg-white/5 text-neutral-400 hover:text-white border border-white/10'
                  }`}
                >
                  {f.label}
                </button>
              ))}
            </div>

            {/* Client Type Filter */}
            <div className="flex items-center gap-2 text-xs text-neutral-400">
              <span>Client Segment:</span>
              <select
                value={typeFilter}
                onChange={e => setTypeFilter(e.target.value as any)}
                className="bg-white/10 border border-white/15 rounded-lg px-2.5 py-1 text-xs text-white focus:outline-none"
              >
                <option value="all" className="bg-slate-900 text-white">All Types</option>
                <option value="enterprise" className="bg-slate-900 text-white">Enterprise</option>
                <option value="international" className="bg-slate-900 text-white">International</option>
                <option value="sme" className="bg-slate-900 text-white">SMEs</option>
                <option value="agency" className="bg-slate-900 text-white">Agencies</option>
              </select>
            </div>
          </div>

          {/* Wall Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            {displayedReviews.map(r => (
              <ReviewCard key={r.id} review={r} />
            ))}
          </div>

          {/* Load More Button */}
          {visibleCount < filteredReviews.length && (
            <div className="text-center">
              <button
                onClick={() => setVisibleCount(prev => prev + 6)}
                className="px-6 py-2.5 rounded-xl bg-white/10 border border-white/20 hover:bg-white/20 text-xs font-semibold text-white transition-colors cursor-pointer"
              >
                Load More Reviews ({filteredReviews.length - visibleCount} remaining)
              </button>
            </div>
          )}
        </div>

        {/* ------------------------------------------------------------------ */}
        {/* LEAVE A REVIEW FORM */}
        {/* ------------------------------------------------------------------ */}
        <div className="card-depth max-w-2xl mx-auto p-8 md:p-10 rounded-3xl mb-20 relative overflow-hidden">
          <div className="text-center mb-8">
            <span className="text-xs font-mono uppercase tracking-widest text-neutral-400 block mb-2">
              Share Your Feedback
            </span>
            <h2 className="text-2xl font-bold text-white mb-2">
              Leave a Client Review
            </h2>
            <p className="text-xs text-neutral-400">
              Submitted reviews undergo verification and are reviewed in the IData admin console before publication.
            </p>
          </div>

          {formSubmitted ? (
            <div className="p-6 rounded-2xl bg-white/[0.04] border border-white/20 text-center space-y-3">
              <div className="w-12 h-12 rounded-full bg-white/10 text-white mx-auto flex items-center justify-center">
                <CheckCircle2 className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-lg font-bold text-white">
                Thank you for your review!
              </h3>
              <p className="text-xs text-neutral-300 max-w-sm mx-auto">
                Your feedback has been saved as pending. It will be verified and approved by the IData administration squad shortly.
              </p>
              <button
                onClick={() => setFormSubmitted(false)}
                className="text-xs text-white hover:underline pt-2 block mx-auto font-semibold cursor-pointer"
              >
                Submit another review
              </button>
            </div>
          ) : (
            <form onSubmit={handleReviewSubmit} className="space-y-4">
              {formError && (
                <div className="p-3 rounded-xl bg-red-500/10 border border-red-500/20 text-xs text-red-300 flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{formError}</span>
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-medium text-neutral-300 block mb-1">
                    Your Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={formName}
                    onChange={e => setFormName(e.target.value)}
                    placeholder="Adebayo Ogunlesi"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-white/[0.05] border border-white/15 text-xs text-white focus:outline-none focus:border-white"
                  />
                </div>

                <div>
                  <label className="text-xs font-medium text-neutral-300 block mb-1">
                    Company Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={formCompany}
                    onChange={e => setFormCompany(e.target.value)}
                    placeholder="Apex Capital Partners"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-white/[0.05] border border-white/15 text-xs text-white focus:outline-none focus:border-white"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-medium text-neutral-300 block mb-1">
                    Your Role / Title
                  </label>
                  <input
                    type="text"
                    value={formRole}
                    onChange={e => setFormRole(e.target.value)}
                    placeholder="Managing Partner"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-white/[0.05] border border-white/15 text-xs text-white focus:outline-none focus:border-white"
                  />
                </div>

                <div>
                  <label className="text-xs font-medium text-neutral-300 block mb-1">
                    Service Delivered
                  </label>
                  <select
                    value={formService}
                    onChange={e => setFormService(e.target.value as ServiceSlug)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-white/[0.05] border border-white/15 text-xs text-white focus:outline-none focus:border-white"
                  >
                    <option value="data-analytics-dashboards" className="bg-slate-900 text-white">Data Analytics & Dashboards</option>
                    <option value="ai-agentic-systems" className="bg-slate-900 text-white">AI & Agentic Systems</option>
                    <option value="data-science-machine-learning" className="bg-slate-900 text-white">Data Science & Machine Learning</option>
                    <option value="software-web-development" className="bg-slate-900 text-white">Software & Web Development</option>
                  </select>
                </div>
              </div>

              {/* Star Rating Selector (Monochrome) */}
              <div>
                <label className="text-xs font-medium text-neutral-300 block mb-1">
                  Overall Rating *
                </label>
                <div className="flex items-center gap-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => setFormRating(star)}
                      className="p-1 cursor-pointer focus:outline-none"
                    >
                      <Star
                        className={`w-6 h-6 transition-colors ${
                          star <= formRating
                            ? 'text-white fill-white'
                            : 'text-neutral-600'
                        }`}
                      />
                    </button>
                  ))}
                  <span className="text-xs font-mono text-neutral-300 ml-2">
                    {formRating} out of 5 stars
                  </span>
                </div>
              </div>

              {/* Review Text */}
              <div>
                <label className="text-xs font-medium text-neutral-300 block mb-1">
                  Review & Results Outcome *
                </label>
                <textarea
                  required
                  rows={4}
                  value={formBody}
                  onChange={e => setFormBody(e.target.value)}
                  placeholder="Describe your engagement with IData, milestones delivered, speed, and business impact..."
                  className="w-full px-3.5 py-2.5 rounded-xl bg-white/[0.05] border border-white/15 text-xs text-white focus:outline-none focus:border-white resize-none"
                />
              </div>

              {/* Optional Photo */}
              <div>
                <label className="text-xs font-medium text-neutral-300 block mb-1">
                  Optional Avatar or Company Logo
                </label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={e => setFormPhoto(e.target.files ? e.target.files[0] : null)}
                  className="w-full text-xs text-neutral-400 file:mr-3 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-semibold file:bg-white/10 file:text-white hover:file:bg-white hover:file:text-black cursor-pointer"
                />
              </div>

              <button
                type="submit"
                disabled={formSubmitting}
                className="w-full py-3.5 rounded-xl bg-white text-black font-bold text-xs hover:bg-neutral-200 transition-all flex items-center justify-center gap-2 cursor-pointer shadow-sm disabled:opacity-50"
              >
                <Send className="w-4 h-4 text-black" />
                <span>{formSubmitting ? 'Submitting Review...' : 'Submit Review for Approval'}</span>
              </button>
            </form>
          )}
        </div>

        {/* ------------------------------------------------------------------ */}
        {/* CLOSING NEXT STEP BAND */}
        {/* ------------------------------------------------------------------ */}
        <div>
          <h3 className="text-xs font-mono uppercase tracking-wider text-neutral-400 mb-4">
            Next Steps
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <NextStepCard
              title="Request a Quote"
              description="Tell us about your data, AI or software goals for a detailed proposal."
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
