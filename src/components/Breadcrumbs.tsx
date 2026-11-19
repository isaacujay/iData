// Visible Breadcrumbs component for inner pages
import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, Home } from 'lucide-react';

export interface BreadcrumbItem {
  label: string;
  to?: string;
}

export interface BreadcrumbsProps {
  items: BreadcrumbItem[];
}

export const Breadcrumbs: React.FC<BreadcrumbsProps> = ({ items }) => {
  return (
    <nav aria-label="Breadcrumb" className="mb-6">
      <ol className="flex items-center gap-1.5 text-xs text-[#8FA3B8]">
        <li>
          <Link to="/" className="flex items-center gap-1 hover:text-white transition-colors">
            <Home className="w-3.5 h-3.5" />
            <span className="sr-only">Home</span>
          </Link>
        </li>

        {items.map((item, idx) => {
          const isLast = idx === items.length - 1;
          return (
            <li key={idx} className="flex items-center gap-1.5">
              <ChevronRight className="w-3 h-3 text-white/20 shrink-0" />
              {isLast || !item.to ? (
                <span className="text-[#E6EDF5] font-medium truncate max-w-[200px] md:max-w-none">
                  {item.label}
                </span>
              ) : (
                <Link to={item.to} className="hover:text-white transition-colors truncate max-w-[150px] md:max-w-none">
                  {item.label}
                </Link>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
};
