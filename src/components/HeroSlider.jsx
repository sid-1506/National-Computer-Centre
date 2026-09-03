import { useState, useEffect, useLayoutEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { courses } from '../data/courses';
import { getCourseImage } from '../utils/courseImages';
import classroomImg from '../assets/classroom-logo.png';
import CompactEnquiryForm from './CompactEnquiryForm';
import { isReducedMotion } from '../hooks/useMotionReveal';

const useIsomorphicLayoutEffect = typeof window !== 'undefined' ? useLayoutEffect : useEffect;

// Clean short display titles for typewriter headline
const COURSE_NAMES = courses.map((c) => {
  const name = c.name || c.title || '';
  return name
    .replace(/^Certificate Course in /i, '')
    .replace(/^Advanced Diploma in /i, 'Adv. Diploma in ')
    .replace(/^Diploma in /i, 'Diploma in ')
    .replace(/^Adv\. /i, 'Advanced ')
    .replace(/ with MERN Stack Web Development/i, ' (MERN Stack)')
    .replace(/ with Dashboard/i, '')
    .replace(/ with GST/i, ' & GST');
});

// Curated pool of high-quality background images for the 4s cycle
const BG_IMAGES = Array.from(
  new Set(
    [
      classroomImg,
      getCourseImage('certificate-course-in-ms-cit'),
      getCourseImage('certificate-course-in-advanced-tally-prime'),
      getCourseImage('diploma-in-graphic-designing'),
      getCourseImage('certificate-course-in-advanced-excel'),
      getCourseImage('certificate-course-in-3ds-max'),
      getCourseImage('advanced-diploma-in-hardware-engineering'),
      getCourseImage('certificate-course-in-autocad'),
      getCourseImage('certificate-course-in-adobe-photoshop'),
      getCourseImage('certificate-course-in-advanced-digital-marketing'),
      getCourseImage('certificate-course-in-power-bi'),
      getCourseImage('diploma-in-computer-management'),
    ].filter(Boolean)
  )
);

export default function HeroSlider({ onOpenModal }) {
  const [courseIndex, setCourseIndex] = useState(0);
  const [displayText, setDisplayText] = useState(() => COURSE_NAMES[0]);
  const [isDeleting, setIsDeleting] = useState(false);

  const [bgIndex, setBgIndex] = useState(0);
  const [prevBgIndex, setPrevBgIndex] = useState(0);

  const [introFinished, setIntroFinished] = useState(() => {
    if (typeof window !== 'undefined') {
      return isReducedMotion();
    }
    return false;
  });

  const bgTimerRef = useRef(null);

  // 1. Independent 4-Second Background Crossfade Cycle
  useEffect(() => {
    if (isReducedMotion() || !introFinished) return;

    const startBgCycle = () => {
      if (bgTimerRef.current) clearInterval(bgTimerRef.current);
      bgTimerRef.current = setInterval(() => {
        setBgIndex((prev) => {
          setPrevBgIndex(prev);
          const next = (prev + 1) % BG_IMAGES.length;
          
          // Preload upcoming image to avoid pop-in
          const preloadNext = (next + 1) % BG_IMAGES.length;
          const img = new Image();
          img.src = BG_IMAGES[preloadNext];

          return next;
        });
      }, 4000);
    };

    const handleBgVisibility = () => {
      if (document.hidden) {
        if (bgTimerRef.current) clearInterval(bgTimerRef.current);
      } else {
        startBgCycle();
      }
    };

    startBgCycle();
    document.addEventListener('visibilitychange', handleBgVisibility);

    return () => {
      if (bgTimerRef.current) clearInterval(bgTimerRef.current);
      document.removeEventListener('visibilitychange', handleBgVisibility);
    };
  }, [introFinished]);

  // 2. Typewriter Effect (Typing ~40ms/char, Hold 1.5s, Backspacing ~22ms/char)
  useEffect(() => {
    if (isReducedMotion() || !introFinished) return;

    let timeoutId = null;
    const currentWord = COURSE_NAMES[courseIndex];

    const tick = () => {
      if (!isDeleting) {
        // Typing forward
        if (displayText.length < currentWord.length) {
          setDisplayText(currentWord.slice(0, displayText.length + 1));
          timeoutId = setTimeout(tick, 40);
        } else {
          // Hold full word for 1.5 seconds
          timeoutId = setTimeout(() => {
            setIsDeleting(true);
          }, 1500);
        }
      } else {
        // Backspacing
        if (displayText.length > 0) {
          setDisplayText(currentWord.slice(0, displayText.length - 1));
          timeoutId = setTimeout(tick, 22);
        } else {
          // Finished deleting -> move to next course
          setIsDeleting(false);
          setCourseIndex((prev) => (prev + 1) % COURSE_NAMES.length);
        }
      }
    };

    timeoutId = setTimeout(tick, isDeleting ? 22 : 40);

    const handleVisibility = () => {
      if (document.hidden) {
        if (timeoutId) clearTimeout(timeoutId);
      } else {
        timeoutId = setTimeout(tick, 40);
      }
    };

    document.addEventListener('visibilitychange', handleVisibility);

    return () => {
      if (timeoutId) clearTimeout(timeoutId);
      document.removeEventListener('visibilitychange', handleVisibility);
    };
  }, [displayText, isDeleting, courseIndex, introFinished]);

  // 3. Master Page-Load Animation Timeline
  useIsomorphicLayoutEffect(() => {
    if (typeof window === 'undefined') return;

    const reduced = isReducedMotion();
    if (reduced) {
      setIntroFinished(true);
      return;
    }

    const ctx = gsap.context(() => {
      const isMobile = window.innerWidth < 1024;
      const yMultiplier = isMobile ? 0.6 : 1.0;

      const bgImg = document.querySelector('.intro-bg-img');
      const scrim = document.querySelector('.intro-scrim');
      const headerBar = document.querySelector('header');
      const logo = document.querySelector('.intro-logo');
      const navLinks = document.querySelectorAll('.intro-nav-link');
      const socialIcons = document.querySelectorAll('.intro-social-icon');
      const freeTrialBtn = document.querySelector('.intro-free-trial');
      const headline1 = document.querySelector('.intro-headline-1');
      const headline2 = document.querySelector('.intro-headline-2');
      const subline = document.querySelector('.intro-subline');
      const ctaBtn = document.querySelector('.intro-cta-btn');
      const enquireCard = isMobile
        ? document.querySelector('.intro-mobile-enquire-card')
        : document.querySelector('.intro-enquire-card');
      const cardRows = enquireCard ? enquireCard.querySelectorAll('.intro-card-row') : [];

      // Initial states set via gsap.set so no flash of visible content
      if (bgImg) gsap.set(bgImg, { scale: 1.08, opacity: 0, transformOrigin: 'center center' });
      if (scrim) gsap.set(scrim, { opacity: 0 });
      if (headerBar) gsap.set(headerBar, { opacity: 0, y: -12 });
      if (logo) gsap.set(logo, { opacity: 0, x: -10 });
      if (navLinks.length) gsap.set(navLinks, { opacity: 0, y: -8 });
      if (socialIcons.length) gsap.set(socialIcons, { opacity: 0, y: -8 });
      if (freeTrialBtn) gsap.set(freeTrialBtn, { opacity: 0, y: -8 });
      if (headline1) gsap.set(headline1, { opacity: 0, y: 32 * yMultiplier });
      if (headline2) gsap.set(headline2, { opacity: 0, y: 32 * yMultiplier });
      if (subline) gsap.set(subline, { opacity: 0, y: 18 * yMultiplier });
      if (ctaBtn) gsap.set(ctaBtn, { opacity: 0, y: 14 * yMultiplier, scale: 0.97 });
      if (enquireCard) gsap.set(enquireCard, { opacity: 0, y: 28 * yMultiplier, scale: 0.98 });
      if (cardRows.length) gsap.set(cardRows, { opacity: 0, y: 12 * yMultiplier });

      const masterTl = gsap.timeline({
        defaults: { ease: 'power3.out' },
        onComplete: () => {
          setIntroFinished(true);
          gsap.set(
            [
              bgImg,
              scrim,
              headerBar,
              logo,
              ...Array.from(navLinks),
              ...Array.from(socialIcons),
              freeTrialBtn,
              headline1,
              headline2,
              subline,
              ctaBtn,
              enquireCard,
              ...Array.from(cardRows),
            ].filter(Boolean),
            { clearProps: 'will-change,transform' }
          );
        },
      });

      // 0.00s Background photo: scale 1.08 -> 1.0, opacity 0 -> 1, 1.2s. Dark scrim fades 0 -> 1 over 0.8s.
      if (bgImg) {
        masterTl.to(bgImg, { scale: 1.0, opacity: 1, duration: 1.2 }, 0);
      }
      if (scrim) {
        masterTl.to(scrim, { opacity: 1, duration: 0.8 }, 0);
      }

      // 0.10s Header bar: opacity 0 -> 1, translateY -12px -> 0, 0.5s.
      if (headerBar) {
        masterTl.to(headerBar, { opacity: 1, y: 0, duration: 0.5 }, 0.10);
      }

      // 0.25s Logo + wordmark: opacity 0 -> 1, translateX -10px -> 0, 0.45s.
      if (logo) {
        masterTl.to(logo, { opacity: 1, x: 0, duration: 0.45 }, 0.25);
      }

      // 0.25s Nav links, then social icons, then "Free Trial" button: opacity 0 -> 1, translateY -8px -> 0, stagger 0.05s.
      const headerActions = [...Array.from(navLinks), ...Array.from(socialIcons), freeTrialBtn].filter(Boolean);
      if (headerActions.length) {
        masterTl.to(headerActions, { opacity: 1, y: 0, duration: 0.4, stagger: 0.05 }, 0.25);
      }

      // 0.35s Headline line 1: opacity 0 -> 1, translateY 32px -> 0, 0.7s.
      if (headline1) {
        masterTl.to(headline1, { opacity: 1, y: 0, duration: 0.7 }, 0.35);
      }

      // 0.43s Headline line 2: opacity 0 -> 1, translateY 32px -> 0, 0.7s (0.08s after line 1).
      if (headline2) {
        masterTl.to(headline2, { opacity: 1, y: 0, duration: 0.7 }, 0.43);
      }

      // 0.55s Enquire card: opacity 0 -> 1, translateY 28px -> 0, scale 0.98 -> 1, 0.65s.
      if (enquireCard) {
        masterTl.to(enquireCard, { opacity: 1, y: 0, scale: 1, duration: 0.65 }, 0.55);
      }

      // 0.70s Subline: opacity 0 -> 1, translateY 18px -> 0, 0.55s.
      if (subline) {
        masterTl.to(subline, { opacity: 1, y: 0, duration: 0.55 }, 0.70);
      }

      // 0.75s Card inner rows: opacity 0 -> 1, translateY 12px -> 0, stagger 0.06s.
      if (cardRows.length) {
        masterTl.to(cardRows, { opacity: 1, y: 0, duration: 0.5, stagger: 0.06 }, 0.75);
      }

      // 0.80s "Book Free Trial Class" button: opacity 0 -> 1, translateY 14px -> 0, scale 0.97 -> 1, 0.5s.
      if (ctaBtn) {
        masterTl.to(ctaBtn, { opacity: 1, y: 0, scale: 1, duration: 0.5 }, 0.80);
      }
    });

    return () => ctx.revert();
  }, []);

  const currentBg = BG_IMAGES[bgIndex] || BG_IMAGES[0];
  const prevBg = BG_IMAGES[prevBgIndex] || BG_IMAGES[0];
  const currentCourseFullName = courses[courseIndex]?.title || 'Certificate Course in MS-CIT';

  return (
    <section className="relative w-full min-h-[480px] sm:min-h-[520px] lg:h-[620px] overflow-hidden bg-[#030A15]">
      {/* Background Stack with Independent 4s Cycle (~700ms ease-out crossfade) */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Outgoing Background Layer */}
        {prevBg !== currentBg && (
          <img
            key={`prev-${prevBgIndex}`}
            src={prevBg}
            alt="National Computer Centre"
            className="absolute inset-0 w-full h-full object-cover object-center"
            style={{ transformOrigin: 'center center' }}
            decoding="async"
            width="1440"
            height="620"
          />
        )}

        {/* Current Active Background Layer */}
        <img
          key={`curr-${bgIndex}`}
          src={currentBg}
          alt="National Computer Centre Classroom"
          className="intro-bg-img absolute inset-0 w-full h-full object-cover object-center transition-opacity duration-700 ease-out"
          style={{ transformOrigin: 'center center' }}
          loading="eager"
          decoding="async"
          width="1440"
          height="620"
        />

        {/* Dark Left-to-Right Gradient Scrim for Readability */}
        <div
          className="intro-scrim absolute inset-0"
          style={{
            background:
              'linear-gradient(90deg, rgba(3,10,21,0.95) 0%, rgba(3,10,21,0.82) 55%, rgba(3,10,21,0.45) 85%, rgba(3,10,21,0.25) 100%)',
          }}
        />
      </div>

      {/* Main Hero Content: Left Column Headline & CTA + Desktop Right Column Compact Enquiry Form */}
      <div className="relative z-20 h-full max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-12 py-12 lg:py-0 flex items-center">
        <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Left Column: Headlines & CTA */}
          <div className="lg:col-span-7 xl:col-span-8 text-left max-w-[720px]">
            
            {/* Line 1: "Want to Learn" | Line 2: <ROTATING COURSE NAME> */}
            <h1
              className="text-white font-bold tracking-tight mb-4 sm:mb-5 leading-[1.18]"
              style={{ fontSize: 'clamp(2rem, 4.4vw, 3.6rem)' }}
            >
              {/* Line 1: "Want to Learn" */}
              <span className="block overflow-hidden py-0.5">
                <span className="intro-headline-1 block text-white font-bold">
                  Want to Learn
                </span>
              </span>

              {/* Line 2: <ROTATING COURSE NAME> (Typewriter with Cyan Blinking Cursor, 1.5s Hold) */}
              <span className="block py-0.5 min-h-[1.22em]">
                <span className="intro-headline-2 block text-[#2DB3E3] font-extrabold tracking-tight">
                  <span>{displayText || '\u00A0'}</span>
                  {!isReducedMotion() && (
                    <span
                      className="inline-block w-[3px] sm:w-[4px] h-[0.82em] bg-[#2DB3E3] ml-1.5 align-baseline animate-cursor-blink rounded-xs"
                      aria-hidden="true"
                    />
                  )}
                </span>
              </span>
            </h1>

            {/* Line 3: Subline + CTA Button */}
            <div>
              <p className="intro-subline text-white/85 text-[15px] sm:text-[17px] font-normal mb-6 sm:mb-8 leading-relaxed max-w-[560px]">
                Explore career-defining courses with 100% practical 1-on-1 terminal training in Marathi, Hindi, and English.
              </p>

              {onOpenModal && (
                <div className="flex items-center gap-4">
                  <button
                    onClick={() => onOpenModal(currentCourseFullName)}
                    className="intro-cta-btn rounded-full bg-[#0B6AA8] hover:bg-[#095A90] text-white px-7 py-3 text-[14px] sm:text-[15px] font-semibold transition-all shadow-lg hover:shadow-cyan-500/20 cursor-pointer inline-flex items-center gap-2 btn-hover"
                  >
                    Book Free Trial Class
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Desktop Right Column: Compact Enquiry Form Card */}
          <div className="intro-enquire-card hidden lg:flex lg:col-span-5 xl:col-span-4 justify-end">
            <CompactEnquiryForm defaultCourse={currentCourseFullName} />
          </div>

        </div>
      </div>
    </section>
  );
}
