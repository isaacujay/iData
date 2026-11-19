// Click-to-load YouTube video embed (Zero tracking and zero bandwidth before click)
import React, { useState } from 'react';
import { Play } from 'lucide-react';
import { VideoItem } from '../types';

export interface VideoEmbedProps {
  video: VideoItem;
  className?: string;
}

export const VideoEmbed: React.FC<VideoEmbedProps> = ({ video, className = '' }) => {
  const [isPlaying, setIsPlaying] = useState(false);

  return (
    <div className={`relative w-full aspect-video rounded-2xl overflow-hidden card-depth ${className}`}>
      {!isPlaying ? (
        <div className="relative w-full h-full flex flex-col justify-between p-6 bg-gradient-to-br from-[#0e1726] via-[#070d18] to-[#030712]">
          {/* Subtle tech background graphic */}
          <div className="absolute inset-0 opacity-15 pointer-events-none bg-grid-pattern" />

          {/* Top meta */}
          <div className="relative z-10 flex items-center justify-between">
            <span className="text-xs font-mono text-white uppercase tracking-wider bg-white/10 px-2.5 py-1 rounded-md border border-white/15">
              Interactive Demo
            </span>
            <span className="text-xs font-mono text-neutral-400 bg-black/40 px-2 py-0.5 rounded">
              {video.duration}
            </span>
          </div>

          {/* Center Play Button (Crisp White fill, Black icon) */}
          <div className="relative z-10 flex flex-col items-center justify-center my-auto">
            <button
              onClick={() => setIsPlaying(true)}
              aria-label={`Play demo: ${video.title}`}
              className="w-16 h-16 rounded-full bg-white text-black flex items-center justify-center hover:scale-110 hover:shadow-[0_0_35px_rgba(255,255,255,0.4)] transition-all duration-300 group cursor-pointer"
            >
              <Play className="w-6 h-6 fill-current ml-1 text-black" />
            </button>
            <span className="mt-3 text-xs font-medium text-neutral-300 tracking-wide">
              Click to load privacy-friendly video demo
            </span>
          </div>

          {/* Bottom Title */}
          <div className="relative z-10">
            <h4 className="text-sm md:text-base font-bold text-white line-clamp-1">
              {video.title}
            </h4>
            <p className="text-xs text-neutral-400 line-clamp-1 mt-0.5">
              {video.description}
            </p>
          </div>
        </div>
      ) : (
        <iframe
          className="w-full h-full"
          src={`https://www.youtube-nocookie.com/embed/${video.youtubeId}?autoplay=1&rel=0&modestbranding=1`}
          title={video.title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      )}
    </div>
  );
};
