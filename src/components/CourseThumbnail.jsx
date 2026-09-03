import { useState } from 'react';
import { ImageOff } from 'lucide-react';
import { getCourseImage } from '../utils/courseImages';
import nccLogo from '../assets/ncc-logo.png';

export default function CourseThumbnail({
  slug,
  title,
  categoryName,
  className = '',
  aspectRatio = 'aspect-[16/10]',
  priority = false,
}) {
  const [hasError, setHasError] = useState(false);
  const imgSrc = getCourseImage(slug || title);
  const courseTitle = title || slug || 'Course';

  // No-image fallback placeholder
  if (!imgSrc || hasError) {
    return (
      <div
        className={`relative w-full ${aspectRatio} overflow-hidden bg-[#F8FAFC] border border-[#E2E8F0] flex flex-col items-center justify-center text-slate-400 select-none ${className}`}
      >
        <ImageOff className="w-8 h-8 text-slate-400 mb-2 stroke-[1.5]" />
        <span className="text-[11px] font-semibold tracking-wider text-slate-500 uppercase">
          No image available
        </span>

        {/* Category label bottom-left */}
        {categoryName && (
          <div className="absolute bottom-2.5 left-3 z-10 pointer-events-none">
            <span className="text-slate-600 text-[10px] font-semibold tracking-wide uppercase bg-white/90 px-2 py-0.5 rounded border border-slate-200 shadow-2xs">
              {categoryName}
            </span>
          </div>
        )}
      </div>
    );
  }

  return (
    <div
      className={`relative w-full ${aspectRatio} overflow-hidden bg-[#0F172A] flex items-center justify-center select-none ${className}`}
    >
      {/* Ambient blurred backdrop to organically fill any aspect ratio gaps without letterbox bars */}
      <img
        src={imgSrc}
        alt=""
        aria-hidden="true"
        className="absolute inset-0 w-full h-full object-cover blur-xl scale-125 opacity-35 pointer-events-none"
      />
      <div className="absolute inset-0 bg-black/15 pointer-events-none" />

      {/* Sharp uncropped full image with autofit */}
      <img
        src={imgSrc}
        alt={courseTitle}
        loading={priority ? 'eager' : 'lazy'}
        decoding="async"
        width="600"
        height="375"
        onError={() => setHasError(true)}
        className="relative z-10 w-full h-full object-contain p-1 transform transition-transform duration-500 ease-out group-hover:scale-[1.02]"
      />

      {/* Subtle bottom gradient for badge contrast */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/35 via-transparent to-transparent pointer-events-none z-10" />

      {/* NCC Logo watermark — bottom-right */}
      <div className="absolute bottom-2.5 right-3 z-20 pointer-events-none">
        <div className="bg-white/90 px-1.5 py-0.5 rounded border border-white/60 shadow-xs">
          <img
            src={nccLogo}
            alt="NCC"
            className="h-4 w-auto object-contain opacity-90"
            decoding="async"
          />
        </div>
      </div>

      {/* Category label bottom-left */}
      {categoryName && (
        <div className="absolute bottom-2.5 left-3 z-20 pointer-events-none">
          <span className="text-white text-[10px] font-semibold tracking-wide uppercase drop-shadow-sm bg-black/40 backdrop-blur-xs px-2 py-0.5 rounded border border-white/10">
            {categoryName}
          </span>
        </div>
      )}
    </div>
  );
}
