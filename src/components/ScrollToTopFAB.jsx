import { useState, useEffect } from 'react';
import { ArrowUp } from 'lucide-react';

export default function ScrollToTopFAB() {
  const [visible, setVisible] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    let ticking = false;

    const updateScroll = () => {
      const currentScrollY = window.scrollY;
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
      
      setVisible(currentScrollY > 400);

      if (scrollHeight > 0) {
        const progress = Math.min(1, Math.max(0, currentScrollY / scrollHeight));
        setScrollProgress(progress);
      }
      ticking = false;
    };

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(updateScroll);
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    updateScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // SVG circle calculation: r = 22, circumference = 2 * PI * 22 ≈ 138.23
  const radius = 22;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - scrollProgress * circumference;

  return (
    <button
      onClick={scrollToTop}
      aria-label="Scroll to top of page"
      className={`fixed bottom-6 right-6 sm:bottom-8 sm:right-8 z-50 w-14 h-14 rounded-full flex items-center justify-center cursor-pointer transition-all duration-300 ${
        visible
          ? 'opacity-100 translate-y-0 scale-100 pointer-events-auto'
          : 'opacity-0 translate-y-4 scale-75 pointer-events-none'
      }`}
    >
      {/* Background disc with soft shadow */}
      <div className="absolute inset-0 bg-white rounded-full shadow-[0_10px_25px_-5px_rgba(0,0,0,0.15)] border border-slate-100" />

      {/* Circular Progress Ring */}
      <svg width="56" height="56" viewBox="0 0 56 56" className="absolute inset-0 -rotate-90 pointer-events-none">
        {/* Track */}
        <circle
          cx="28"
          cy="28"
          r={radius}
          fill="transparent"
          stroke="#F1F5F9"
          strokeWidth="3"
        />
        {/* Progress */}
        <circle
          cx="28"
          cy="28"
          r={radius}
          fill="transparent"
          stroke="#0B6AA8"
          strokeWidth="3"
          strokeDasharray={circumference}
          style={{
            strokeDashoffset,
            transition: 'stroke-dashoffset 80ms linear',
            strokeLinecap: 'round',
          }}
        />
      </svg>

      {/* Up Arrow Icon */}
      <ArrowUp className="w-5 h-5 text-[#0B6AA8] relative z-10 stroke-[2.5]" />
    </button>
  );
}
