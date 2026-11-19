// Video content for IData Demos
// Maximum 3 videos, click-to-load privacy-friendly embeds

import { VideoItem } from '../types';

export const videosData: VideoItem[] = [
  {
    id: 'vid-1',
    youtubeId: 'M7lc1UVf-VE', // OWNER: replace with unlisted YouTube demo video ID
    title: 'Real-Time Financial Analytics & Liquidity Dashboard Demo',
    description: 'A 3-minute walkthrough showing how automated dbt pipelines power sub-second executive KPI reporting and multi-currency margin monitors.',
    posterImage: '/brand/og-image.png',
    duration: '3:24',
    serviceSlug: 'data-analytics-dashboards'
  },
  {
    id: 'vid-2',
    youtubeId: 'dQw4w9WgXcQ', // OWNER: replace with unlisted YouTube demo video ID
    title: 'Autonomous Clinical Notes Extraction & Agentic Triage Demo',
    description: 'Demonstrating LangGraph multi-agent coordination parsing unstructured hospital intake transcripts with schema validation and zero hallucinations.',
    posterImage: '/brand/og-image.png',
    duration: '4:10',
    serviceSlug: 'ai-agentic-systems'
  },
  {
    id: 'vid-3',
    youtubeId: 'jNQXAC9IVRw', // OWNER: replace with unlisted YouTube demo video ID
    title: 'Custom B2B Client Portal & Secure Milestone Delivery',
    description: 'Inside look at the IData client portal: tracking sprint milestones, previewing code deliverables, and downloading signed deliverables.',
    posterImage: '/brand/og-image.png',
    duration: '2:45',
    serviceSlug: 'software-web-development'
  }
];

export function getVideos(): VideoItem[] {
  return videosData;
}

export function getFeaturedVideo(): VideoItem {
  return videosData[0];
}

export function getVideoById(id: string): VideoItem | undefined {
  return videosData.find(v => v.id === id);
}
