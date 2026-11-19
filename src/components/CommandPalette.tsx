// Command Palette (Ctrl+K / Cmd+K or Search Icon trigger)
import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, X, ArrowRight, CornerDownLeft, Sparkles, BookOpen, Users, HelpCircle, Layers } from 'lucide-react';
import { searchContent, SearchResultItem } from '../features/search/searchIndex';

export interface CommandPaletteProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CommandPalette: React.FC<CommandPaletteProps> = ({ isOpen, onClose }) => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SearchResultItem[]>([]);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  // Handle hotkeys (Ctrl+K / Cmd+K / Esc)
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
      setQuery('');
      setResults([]);
      setSelectedIndex(0);
    }
  }, [isOpen]);

  useEffect(() => {
    if (!query.trim()) {
      setResults([]);
      return;
    }
    const matched = searchContent(query);
    setResults(matched);
    setSelectedIndex(0);
  }, [query]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex(prev => (prev + 1) % (results.length || 1));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex(prev => (prev - 1 + results.length) % (results.length || 1));
    } else if (e.key === 'Enter' && results[selectedIndex]) {
      e.preventDefault();
      handleSelect(results[selectedIndex]);
    } else if (e.key === 'Escape') {
      e.preventDefault();
      onClose();
    }
  };

  const handleSelect = (item: SearchResultItem) => {
    navigate(item.url);
    onClose();
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'Service': return <Layers className="w-3.5 h-3.5 text-white" />;
      case 'Case Study': return <BookOpen className="w-3.5 h-3.5 text-white" />;
      case 'Team Member': return <Users className="w-3.5 h-3.5 text-white" />;
      case 'FAQ': return <HelpCircle className="w-3.5 h-3.5 text-white" />;
      default: return <Sparkles className="w-3.5 h-3.5 text-white" />;
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4">
          {/* Backdrop blur */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/80 backdrop-blur-md"
          />

          {/* Modal Panel with gradient depth */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -10 }}
            transition={{ duration: 0.2 }}
            className="relative w-full max-w-xl bg-gradient-to-b from-[#111624] via-[#0a0f1d] to-[#04060c] border border-white/20 rounded-2xl shadow-2xl overflow-hidden z-10 card-depth"
          >
            {/* Ambient soft glow */}
            <div className="pointer-events-none absolute -top-16 -right-16 w-56 h-56 rounded-full bg-[#4F46E5]/15 blur-3xl" />
            <div className="pointer-events-none absolute -bottom-16 -left-16 w-56 h-56 rounded-full bg-[#38BDF8]/10 blur-3xl" />

            {/* Input Header */}
            <div className="flex items-center px-4 py-3.5 border-b border-white/10 gap-3 relative z-10">
              <Search className="w-4 h-4 text-neutral-400 shrink-0" />
              <input
                ref={inputRef}
                value={query}
                onChange={e => setQuery(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Search services, case studies, team, or FAQs..."
                className="w-full bg-transparent text-white placeholder-neutral-500 text-sm focus:outline-none"
              />
              <button
                onClick={onClose}
                className="p-1 rounded-md text-neutral-400 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Results List */}
            <div className="max-h-96 overflow-y-auto p-2 relative z-10">
              {results.length > 0 ? (
                results.map((item, index) => {
                  const isSelected = index === selectedIndex;
                  return (
                    <div
                      key={item.id}
                      onClick={() => handleSelect(item)}
                      onMouseEnter={() => setSelectedIndex(index)}
                      className={`flex items-center justify-between p-3 rounded-xl cursor-pointer transition-colors ${
                        isSelected 
                          ? 'bg-white/10 text-white border border-white/30 shadow-sm' 
                          : 'text-neutral-200 hover:bg-white/5 border border-transparent'
                      }`}
                    >
                      <div className="min-w-0 pr-3">
                        <div className="flex items-center gap-2 mb-0.5">
                          {getCategoryIcon(item.category)}
                          <span className="text-[10px] font-mono uppercase tracking-wider text-neutral-400">
                            {item.category}
                          </span>
                        </div>
                        <div className="text-sm font-semibold truncate text-white">
                          {item.title}
                        </div>
                        <div className="text-xs text-neutral-400 truncate mt-0.5">
                          {item.subtitle}
                        </div>
                      </div>
                      <div className="shrink-0 flex items-center text-white">
                        <CornerDownLeft className="w-3.5 h-3.5 opacity-70" />
                      </div>
                    </div>
                  );
                })
              ) : query.trim() ? (
                <div className="p-8 text-center text-xs text-neutral-400">
                  No results found for "<span className="text-white">{query}</span>"
                </div>
              ) : (
                <div className="p-5">
                  <div className="text-[11px] font-mono text-neutral-400 uppercase tracking-wider mb-2">
                    Quick Suggestions
                  </div>
                  <div className="grid grid-cols-2 gap-2 text-xs">
                    <button
                      onClick={() => { setQuery('AI'); }}
                      className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-left text-neutral-200 hover:text-white transition-colors cursor-pointer"
                    >
                      Agentic Systems & LLMs
                    </button>
                    <button
                      onClick={() => { setQuery('Dashboard'); }}
                      className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-left text-neutral-200 hover:text-white transition-colors cursor-pointer"
                    >
                      Executive BI Dashboards
                    </button>
                    <button
                      onClick={() => { setQuery('Isaac'); }}
                      className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-left text-neutral-200 hover:text-white transition-colors cursor-pointer"
                    >
                      Founder & Leadership Team
                    </button>
                    <button
                      onClick={() => { setQuery('Pricing'); }}
                      className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-left text-neutral-200 hover:text-white transition-colors cursor-pointer"
                    >
                      Delivery & Engagement FAQ
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Footer hints */}
            <div className="px-4 py-2 border-t border-white/10 bg-black/40 flex items-center justify-between text-[11px] text-neutral-400 relative z-10">
              <div className="flex items-center gap-3">
                <span><kbd className="px-1.5 py-0.5 bg-white/10 rounded">↑</kbd> <kbd className="px-1.5 py-0.5 bg-white/10 rounded">↓</kbd> navigate</span>
                <span><kbd className="px-1.5 py-0.5 bg-white/10 rounded">↵</kbd> select</span>
                <span><kbd className="px-1.5 py-0.5 bg-white/10 rounded">esc</kbd> close</span>
              </div>
              <span className="font-mono text-white/60">Instant Search</span>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
