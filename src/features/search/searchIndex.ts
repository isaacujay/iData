// Client-side search index powered by Fuse.js
// Searches across services, case studies, team members, and FAQs with zero server requests

import Fuse from 'fuse.js';
import { getServices } from '../../content/services';
import { getCaseStudies } from '../../content/caseStudies';
import { getTeamMembers } from '../../content/team';
import { getFAQs } from '../../content/faqs';

export interface SearchResultItem {
  id: string;
  title: string;
  subtitle: string;
  category: 'Service' | 'Case Study' | 'Team Member' | 'FAQ';
  url: string;
  tags?: string[];
}

export function buildSearchIndex(): SearchResultItem[] {
  const items: SearchResultItem[] = [];

  // Services
  getServices().forEach(s => {
    items.push({
      id: `svc-${s.id}`,
      title: s.title,
      subtitle: s.shortDescription,
      category: 'Service',
      url: `/services/${s.slug}`,
      tags: [...s.techStack, ...s.bullets]
    });
  });

  // Case Studies
  getCaseStudies().forEach(cs => {
    items.push({
      id: `cs-${cs.id}`,
      title: cs.title,
      subtitle: `${cs.client} — ${cs.resultHeadline}`,
      category: 'Case Study',
      url: `/work/${cs.slug}`,
      tags: cs.tools
    });
  });

  // Team
  getTeamMembers().forEach(t => {
    items.push({
      id: `team-${t.id}`,
      title: t.name,
      subtitle: `${t.title} (${t.area})`,
      category: 'Team Member',
      url: `/team#${t.id}`,
      tags: t.focus
    });
  });

  // FAQs
  getFAQs().forEach(f => {
    items.push({
      id: `faq-${f.id}`,
      title: f.question,
      subtitle: f.answer.substring(0, 100) + '...',
      category: 'FAQ',
      url: `/about#faq-${f.id}`,
      tags: [f.category]
    });
  });

  return items;
}

const searchItems = buildSearchIndex();

const fuse = new Fuse(searchItems, {
  keys: [
    { name: 'title', weight: 0.5 },
    { name: 'subtitle', weight: 0.3 },
    { name: 'tags', weight: 0.2 }
  ],
  threshold: 0.35,
  ignoreLocation: true
});

export function searchContent(query: string): SearchResultItem[] {
  if (!query || query.trim().length === 0) {
    return [];
  }
  return fuse.search(query).map(res => res.item);
}
