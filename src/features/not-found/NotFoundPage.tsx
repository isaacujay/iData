// Friendly 404 Not Found Page
import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Home, Search, MessageSquareQuote } from 'lucide-react';

export const NotFoundPage: React.FC = () => {
  return (
    <div className="pt-32 pb-20 min-h-screen bg-gradient-to-b from-[#0a0f1d] via-[#050812] to-[#020409] text-white flex items-center justify-center relative overflow-hidden">
      {/* Drifting aurora glow in background */}
      <div className="pointer-events-none absolute top-1/3 left-1/2 -translate-x-1/2 w-96 h-96 rounded-full bg-[#4F46E5]/15 blur-3xl" />

      <div className="max-w-md mx-auto px-4 text-center relative z-10 card-depth p-10 rounded-3xl">
        <div className="text-7xl font-black font-mono text-white mb-4 tracking-tighter">
          404
        </div>
        <h1 className="text-2xl font-bold text-white mb-3">
          Page Not Found
        </h1>
        <p className="text-xs text-neutral-400 mb-8 leading-relaxed">
          The requested system route does not exist or has migrated. Use the primary navigation below to find what you are looking for.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <Link
            to="/"
            className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-white text-black font-bold text-xs hover:bg-neutral-200 transition-colors inline-flex items-center justify-center gap-2 cursor-pointer shadow-sm"
          >
            <Home className="w-4 h-4 text-black" />
            <span>Return to Home</span>
          </Link>

          <Link
            to="/services"
            className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-white/10 border border-white/20 text-white text-xs font-semibold hover:bg-white/20 transition-colors inline-flex items-center justify-center gap-2 cursor-pointer"
          >
            <span>Explore Services</span>
          </Link>
        </div>
      </div>
    </div>
  );
};
