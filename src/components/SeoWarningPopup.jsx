import { useState, useEffect, useRef, useCallback } from 'react';
import { AlertTriangle, X } from 'lucide-react';
import buzzerSound from '../assets/sound/flutie8211-high-pitch-alarm-buzzer-464349.mp3';

export default function SeoWarningPopup() {
  const [isOpen, setIsOpen] = useState(false);
  const audioRef = useRef(null);
  const openTimeoutRef = useRef(null);
  const closeTimeoutRef = useRef(null);

  // Initialize and reuse single Audio instance
  useEffect(() => {
    audioRef.current = new Audio(buzzerSound);
    audioRef.current.preload = 'auto';

    // One-time user interaction unlock for browser autoplay policies
    const unlockAudio = () => {
      if (audioRef.current) {
        audioRef.current.load();
      }
      window.removeEventListener('click', unlockAudio);
      window.removeEventListener('keydown', unlockAudio);
      window.removeEventListener('touchstart', unlockAudio);
      window.removeEventListener('scroll', unlockAudio);
    };

    window.addEventListener('click', unlockAudio, { passive: true });
    window.addEventListener('keydown', unlockAudio, { passive: true });
    window.addEventListener('touchstart', unlockAudio, { passive: true });
    window.addEventListener('scroll', unlockAudio, { passive: true });

    return () => {
      window.removeEventListener('click', unlockAudio);
      window.removeEventListener('keydown', unlockAudio);
      window.removeEventListener('touchstart', unlockAudio);
      window.removeEventListener('scroll', unlockAudio);

      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.currentTime = 0;
      }
    };
  }, []);

  const closePopup = useCallback(() => {
    setIsOpen(false);

    // Stop and reset buzzer audio
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }

    // Clear any pending close timer
    if (closeTimeoutRef.current) {
      clearTimeout(closeTimeoutRef.current);
      closeTimeoutRef.current = null;
    }

    // Schedule next popup after 30 seconds
    if (openTimeoutRef.current) clearTimeout(openTimeoutRef.current);
    openTimeoutRef.current = setTimeout(() => {
      showPopup();
    }, 30000);
  }, []);

  const showPopup = useCallback(() => {
    setIsOpen(true);

    // Play buzzer audio
    if (audioRef.current) {
      audioRef.current.currentTime = 0;
      audioRef.current.play().catch(() => {
        // Safe catch for browser autoplay protection
      });
    }

    // Auto-close popup after 5 seconds
    if (closeTimeoutRef.current) clearTimeout(closeTimeoutRef.current);
    closeTimeoutRef.current = setTimeout(() => {
      closePopup();
    }, 5000);
  }, [closePopup]);

  // Main cycle: 4s initial delay, then loop every 30s after close
  useEffect(() => {
    openTimeoutRef.current = setTimeout(() => {
      showPopup();
    }, 4000);

    return () => {
      if (openTimeoutRef.current) clearTimeout(openTimeoutRef.current);
      if (closeTimeoutRef.current) clearTimeout(closeTimeoutRef.current);
    };
  }, [showPopup]);

  // Body scroll lock handling
  useEffect(() => {
    if (isOpen) {
      const originalOverflow = document.body.style.overflow;
      document.body.style.overflow = 'hidden';
      return () => {
        document.body.style.overflow = originalOverflow;
      };
    } else {
      document.body.style.overflow = '';
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div
      role="alertdialog"
      aria-modal="true"
      aria-labelledby="seo-warning-title"
      aria-describedby="seo-warning-desc"
      className="fixed inset-0 z-[99999] flex items-center justify-center p-4 sm:p-6 bg-black/92 backdrop-blur-md transition-opacity duration-300 select-none animate-in fade-in duration-200"
    >
      {/* Centered Modal Card */}
      <div className="relative w-full max-w-xl sm:max-w-2xl bg-[#09111E] border border-red-500/40 rounded-3xl p-6 sm:p-10 shadow-[0_0_90px_rgba(239,68,68,0.35)] flex flex-col items-center text-center">
        
        {/* Close Button */}
        <button
          onClick={closePopup}
          aria-label="Close warning"
          className="absolute top-4 right-4 sm:top-5 sm:right-5 p-2 rounded-full text-slate-400 hover:text-white bg-white/5 hover:bg-white/10 border border-white/10 transition-colors cursor-pointer"
        >
          <X className="w-5 h-5 stroke-[2.5]" />
        </button>

        {/* Warning Icon Badge */}
        <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-red-500/10 border border-red-500/40 flex items-center justify-center mb-6 shadow-[0_0_35px_rgba(239,68,68,0.3)] animate-pulse">
          <AlertTriangle className="w-10 h-10 sm:w-12 sm:h-12 text-red-500 stroke-[2.2]" />
        </div>

        {/* Eyebrow alert chip */}
        <span className="inline-block px-4 py-1.5 rounded-full bg-red-500/15 border border-red-500/30 text-red-400 text-[12px] sm:text-[13px] font-bold tracking-wider uppercase mb-4">
          CRITICAL SYSTEM WARNING
        </span>

        {/* Main Heading */}
        <h2
          id="seo-warning-title"
          className="text-white font-extrabold tracking-tight leading-[1.2] mb-4 text-balance"
          style={{ fontSize: 'clamp(1.75rem, 4.5vw, 2.75rem)' }}
        >
          TOO MANY CHANGES LEAD TO SEO
        </h2>

        {/* Subtext */}
        <p
          id="seo-warning-desc"
          className="text-slate-300 text-[15px] sm:text-[18px] leading-relaxed max-w-lg mb-8 font-medium"
        >
          Bahut zyada changes kiye ja rahe hain, jisse SEO kharab ho sakta hai.
        </p>

        {/* 5-Second Auto-close Progress Indicator */}
        <div className="w-full max-w-sm bg-white/10 h-1.5 rounded-full overflow-hidden mb-2">
          <div
            className="h-full bg-red-500 rounded-full"
            style={{
              animation: 'seo-progress 5s linear forwards',
            }}
          />
        </div>
        <span className="text-[12px] text-slate-400 font-medium">
          Auto closing in 5 seconds...
        </span>
      </div>

      <style>{`
        @keyframes seo-progress {
          from { width: 100%; }
          to { width: 0%; }
        }
      `}</style>
    </div>
  );
}
