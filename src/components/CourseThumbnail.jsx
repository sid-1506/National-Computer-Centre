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
  const imgSrc = getCourseImage(slug);

  return (
    <div
      className={`relative w-full ${aspectRatio} overflow-hidden bg-[#111111] select-none ${className}`}
    >
      {/* Background Cover Image with Hover Zoom */}
      <img
        src={imgSrc}
        alt={`${title} course training at National Computer Centre`}
        loading={priority ? 'eager' : 'lazy'}
        width="600"
        height="375"
        className="w-full h-full object-cover transform transition-transform duration-500 ease-out group-hover:scale-[1.04]"
      />

      {/* Dark Gradient Scrim: bottom-to-top */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/25 to-black/20 pointer-events-none" />

      {/* Top-Right: NCC Logo Brand Badge with Soft Dark Scrim */}
      <div className="absolute top-3 right-3 z-10">
        <div className="bg-black/50 backdrop-blur-xs px-2 py-1 rounded-md border border-white/10 flex items-center justify-center">
          <img
            src={nccLogo}
            alt="NCC"
            className="h-5 sm:h-6 w-auto object-contain opacity-90 brightness-110"
          />
        </div>
      </div>

      {/* Bottom-Left: Course Category Label */}
      {categoryName && (
        <div className="absolute bottom-3 left-4 z-10">
          <span className="text-white/80 text-[11px] font-sans font-semibold tracking-[0.12em] uppercase drop-shadow-sm">
            {categoryName}
          </span>
        </div>
      )}
    </div>
  );
}
