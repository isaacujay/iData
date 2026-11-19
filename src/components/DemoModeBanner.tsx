// Subtle Dev/Demo Mode Banner
// Notifies developer/owner that zero-config Demo Mode is active, and provides quick role switching for testing
import React, { useState } from 'react';
import { isDemoMode } from '../services/database';
import { signInAsDemo, signOut } from '../services/auth';
import { Database, ShieldAlert, X, ChevronRight, UserCheck } from 'lucide-react';
import { Link } from 'react-router-dom';

export const DemoModeBanner: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false);

  if (!isDemoMode) {
    return null; // Silent in live mode
  }

  if (collapsed) {
    return (
      <button
        onClick={() => setCollapsed(false)}
        className="fixed bottom-3 left-3 z-30 px-2.5 py-1 rounded-full bg-white/10 border border-white/20 text-[10px] font-mono text-white shadow-lg flex items-center gap-1.5 hover:bg-white hover:text-black transition-colors cursor-pointer"
      >
        <Database className="w-3 h-3 text-white" />
        <span>Demo Mode Active</span>
      </button>
    );
  }

  return (
    <div className="fixed bottom-3 left-3 right-3 md:right-auto md:max-w-md z-30 p-3 rounded-xl bg-gradient-to-r from-[#111624]/95 to-[#080d18]/95 backdrop-blur-md border border-white/20 shadow-2xl text-xs text-white flex items-center justify-between gap-3 card-depth">
      <div className="flex items-center gap-2.5 min-w-0">
        <div className="w-6 h-6 rounded-md bg-white/10 border border-white/20 flex items-center justify-center text-white shrink-0">
          <Database className="w-3.5 h-3.5" />
        </div>
        <div className="truncate">
          <div className="font-semibold text-[11px] text-white">
            Demo Mode (Zero Configuration)
          </div>
          <div className="text-[10px] text-neutral-400 truncate">
            Sample data active · Forms simulate live persistence
          </div>
        </div>
      </div>

      <div className="flex items-center gap-2 shrink-0">
        <div className="flex items-center gap-1">
          <button
            onClick={() => signInAsDemo('client')}
            title="Switch auth to Demo Client"
            className="px-2 py-1 rounded bg-white/10 hover:bg-white hover:text-black text-[10px] font-medium text-white transition-colors cursor-pointer"
          >
            Client
          </button>
          <button
            onClick={() => signInAsDemo('admin')}
            title="Switch auth to Demo Admin"
            className="px-2 py-1 rounded bg-white/10 hover:bg-white hover:text-black text-[10px] font-medium text-white transition-colors cursor-pointer"
          >
            Admin
          </button>
        </div>

        <button
          onClick={() => setCollapsed(true)}
          className="text-neutral-400 hover:text-white p-1 cursor-pointer"
          aria-label="Minimize demo banner"
        >
          <X className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
};
