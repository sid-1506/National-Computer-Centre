import { getCourseImage } from '../utils/courseImages';
import nccLogo from '../assets/ncc-logo.png';

export default function CourseThumbnail({ slug, title, categoryName, className = '', aspectRatio = 'aspect-[16/10]', priority = false }) {
  const imgSrc = getCourseImage(slug);
  return (
    <div className={`relative w-full ${aspectRatio} overflow-hidden bg-slate-50 select-none ${className}`}>
      <img
        src={imgSrc}
        alt={`${title} course at National Computer Centre`}
        loading={priority ? 'eager' : 'lazy'}
        decoding="async"
        width="600"
        height="375"
        className="w-full h-full object-cover transform transition-transform duration-500 ease-out group-hover:scale-[1.05]"
      />
      {/* Gradient scrim */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />
      
      {/* NCC Logo watermark — bottom-right */}
      <div className="absolute bottom-2.5 right-3 z-10 pointer-events-none">
        <div className="bg-white/90 px-1.5 py-0.5 rounded border border-white/60 shadow-xs">
          <img src={nccLogo} alt="NCC" className="h-4 w-auto object-contain opacity-90" decoding="async" />
        </div>
      </div>
      
      {/* Category label bottom-left */}
      {categoryName && (
        <div className="absolute bottom-2.5 left-3 z-10 pointer-events-none">
          <span className="text-white text-[10px] font-semibold tracking-wide uppercase drop-shadow-sm">{categoryName}</span>
        </div>
      )}
    </div>
  );
}
