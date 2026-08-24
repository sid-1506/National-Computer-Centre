import { useEffect, useState } from 'react';

export default function CustomCursor() {
  const [position, setPosition] = useState({ x: -100, y: -100 });
  const [trailingPos, setTrailingPos] = useState({ x: -100, y: -100 });
  const [isHovered, setIsHovered] = useState(false);
  const [cursorText, setCursorText] = useState('');
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Disable custom cursor on touch devices or if reduced motion is requested
    const isTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (isTouch || prefersReducedMotion) {
      return;
    }

    const onMouseMove = (e) => {
      setPosition({ x: e.clientX, y: e.clientY });
      setIsVisible(true);
    };

    const onMouseEnter = () => setIsVisible(true);
    const onMouseLeave = () => setIsVisible(false);

    window.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseenter', onMouseEnter);
    document.addEventListener('mouseleave', onMouseLeave);

    // Trailing dot lerp animation loop
    let rafId;
    const animateTrailer = () => {
      setTrailingPos((prev) => ({
        x: prev.x + (position.x - prev.x) * 0.2,
        y: prev.y + (position.y - prev.y) * 0.2,
      }));
      rafId = requestAnimationFrame(animateTrailer);
    };
    rafId = requestAnimationFrame(animateTrailer);

    // Setup interactive hover listeners
    const handleMouseOver = (e) => {
      const target = e.target.closest('a, button, [data-cursor], input, select, textarea');
      if (target) {
        setIsHovered(true);
        const text = target.getAttribute('data-cursor-text') || '';
        setCursorText(text);
      } else {
        setIsHovered(false);
        setCursorText('');
      }
    };

    document.addEventListener('mouseover', handleMouseOver);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseenter', onMouseEnter);
      document.removeEventListener('mouseleave', onMouseLeave);
      document.removeEventListener('mouseover', handleMouseOver);
      cancelAnimationFrame(rafId);
    };
  }, [position.x, position.y]);

  if (!isVisible) return null;

  return (
    <>
      {/* Center sharp dot */}
      <div
        className="cursor-dot pointer-events-none fixed z-[9999] rounded-full bg-white mix-blend-difference transition-transform duration-75 ease-out"
        style={{
          left: `${position.x}px`,
          top: `${position.y}px`,
          width: isHovered ? '8px' : '6px',
          height: isHovered ? '8px' : '6px',
          transform: 'translate(-50%, -50%)',
        }}
      />

      {/* Trailing smooth magnetic ring */}
      <div
        className="cursor-dot pointer-events-none fixed z-[9998] flex items-center justify-center rounded-full border border-white/40 mix-blend-difference transition-[width,height,background-color] duration-300 ease-out"
        style={{
          left: `${trailingPos.x}px`,
          top: `${trailingPos.y}px`,
          width: isHovered ? (cursorText ? '80px' : '48px') : '32px',
          height: isHovered ? (cursorText ? '80px' : '48px') : '32px',
          backgroundColor: isHovered ? (cursorText ? 'rgba(27, 63, 174, 0.85)' : 'rgba(255, 255, 255, 0.15)') : 'transparent',
          transform: 'translate(-50%, -50%)',
        }}
      >
        {cursorText && (
          <span className="font-headline text-[10px] font-bold tracking-widest text-white uppercase select-none">
            {cursorText}
          </span>
        )}
      </div>
    </>
  );
}
