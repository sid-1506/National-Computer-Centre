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
      className={`relative w-full ${aspectRatio} overflow-hidden bg-slate-50 select-none ${className}`}
    >
      <img
        src={imgSrc}
        alt={courseTitle}
        loading={priority ? 'eager' : 'lazy'}
        decoding="async"
        width="600"
        height="375"
        onError={() => setHasError(true)}
        className="w-full h-full object-cover transform transition-transform duration-500 ease-out group-hover:scale-[1.05]"
      />
      {/* Gradient scrim */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />

      {/* NCC Logo watermark — bottom-right */}
      <div className="absolute bottom-2.5 right-3 z-10 pointer-events-none">
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
        <div className="absolute bottom-2.5 left-3 z-10 pointer-events-none">
          <span className="text-white text-[10px] font-semibold tracking-wide uppercase drop-shadow-sm">
            {categoryName}
          </span>
        </div>
      )}
    </div>
  );
}
