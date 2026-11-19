// Slim Sticky Header with 3 desktop links, Search, Menu button, and Quote CTA
// Strict monochrome controls (white/black only) with glass gradient depth
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Menu, Search } from 'lucide-react';
import { CommandPalette } from './CommandPalette';
import { DesktopNav } from './nav/DesktopNav';
import { MobileMenu } from './nav/MobileMenu';

export interface HeaderProps {
  onOpenBooking?: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onOpenBooking = () => {} }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === 'k') {
        event.preventDefault();
        setIsSearchOpen(current => !current);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-40 transition-[padding,background-color,border-color] duration-300 ${
          isScrolled
            ? 'border-b border-white/10 bg-[#030712]/80 py-3 backdrop-blur-md'
            : 'border-b border-transparent bg-transparent py-5'
        }`}
      >
        <div className="mx-auto flex max-w-[1200px] items-center justify-between gap-4 px-4 md:px-8">
          <Link to="/" aria-label="IData home" className="shrink-0 rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/70">
            <img src="/brand/logo.svg" alt="IData" className="h-7 w-auto md:h-8" />
          </Link>

          <DesktopNav onOpenBooking={onOpenBooking} />

          <div className="flex shrink-0 items-center gap-2">
            {/* Search Trigger */}
            <button
              type="button"
              onClick={() => setIsSearchOpen(true)}
              aria-label="Search website"
              title="Search (Ctrl+K)"
              className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-white transition-colors hover:bg-white/15 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/70"
            >
              <Search className="h-4 w-4" />
            </button>

            {/* Request a Quote Primary CTA (Crisp White fill, Black text) */}
            <Link
              to="/contact"
              className="hidden h-10 items-center gap-1.5 rounded-xl bg-white px-4 text-xs font-bold text-black shadow-sm transition-colors hover:bg-neutral-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/70 sm:flex lg:hidden xl:flex"
            >
              Request a Quote <ArrowRight className="h-3.5 w-3.5" />
            </Link>

            {/* Menu Button */}
            <button
              type="button"
              onClick={() => setIsMenuOpen(true)}
              aria-label="Open navigation menu"
              aria-expanded={isMenuOpen}
              className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-white transition-colors hover:bg-white/15 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/70 lg:hidden"
            >
              <Menu className="h-5 w-5" />
            </button>

            <Link
              to="/contact"
              className="hidden h-10 items-center gap-1.5 rounded-xl bg-white px-4 text-xs font-bold text-black shadow-sm transition-colors hover:bg-neutral-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/70 lg:flex"
            >
              Request a Quote <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>
        </div>
      </header>

      {/* Search Command Palette */}
      <CommandPalette isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />

      {/* Mobile Menu */}
      <MobileMenu
        isOpen={isMenuOpen}
        onClose={() => setIsMenuOpen(false)}
        onOpenSearch={() => setIsSearchOpen(true)}
        onOpenBooking={onOpenBooking}
      />
    </>
  );
};
