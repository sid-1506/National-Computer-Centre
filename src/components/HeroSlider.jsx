import { useState, useEffect, useLayoutEffect, useCallback } from 'react';
import { gsap } from 'gsap';
import classroomImg from '../assets/classroom-logo.png';
import mscitImg from '../assets/courses/certificate-course-in-ms-cit.jpg';
import devImg from '../assets/courses/full-stack-with-mern-stack-web-development.jpg';
import CompactEnquiryForm from './CompactEnquiryForm';
import { isReducedMotion } from '../hooks/useMotionReveal';

const useIsomorphicLayoutEffect = typeof window !== 'undefined' ? useLayoutEffect : useEffect;

const SLIDES = [
  {
    id: 1,
    image: classroomImg,
    alt: 'Master In-Demand Computer Skills Build a High-Paying Career',
    headingLine1: 'Master In-Demand Computer Skills',
    headingLine2: 'Build a High-Paying Career',
    subline: 'Explore career-defining courses across various domains',
  },
  {
    id: 2,
    image: mscitImg,
    alt: 'Government Recognised Training In Mulund West Since 1998',
    headingLine1: 'Government Recognised Training',
    headingLine2: 'In Mulund West Since 1998',
    subline: 'MS-CIT, Tally with GST, Advanced Excel, DTP, Python and more',
  },
  {
    id: 3,
    image: devImg,
    alt: 'One Day Free Trial Class Learn Before You Enrol',
    headingLine1: 'One Day Free Trial Class',
    headingLine2: 'Learn Before You Enrol',
    subline: 'Offline batches on real machines, in Marathi, Hindi or English',
  },
];

export default function HeroSlider({ onOpenModal }) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [introFinished, setIntroFinished] = useState(() => {
    if (typeof window !== 'undefined') {
      return isReducedMotion();
    }
    return false;
  });

  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev + 1) % SLIDES.length);
  }, []);

  // Slider auto-advance interval: starts ONLY AFTER the master intro completes
  useEffect(() => {
    if (!introFinished) return;

    const timer = setInterval(() => {
      nextSlide();
    }, 5500);
    return () => clearInterval(timer);
  }, [introFinished, nextSlide]);

  // Master Page-Load Animation Timeline (Plays on every reload / page visit)
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
      const dotPager = document.querySelector('.intro-dot-pager');

      // 1. Initial states set via gsap.set so no flash of visible content
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
      if (dotPager) gsap.set(dotPager, { opacity: 0 });

      // 2. Master Timeline with exact timings
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
              dotPager,
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

      // 1.05s Slider dot pager: opacity 0 -> 1, 0.4s.
      if (dotPager) {
        masterTl.to(dotPager, { opacity: 1, duration: 0.4 }, 1.05);
      }
    });

    return () => ctx.revert();
  }, []);

  return (
    <section className="relative w-full min-h-[480px] sm:min-h-[520px] lg:h-[620px] overflow-hidden bg-[#030A15]">
      {/* Background Slides */}
      {SLIDES.map((slide, idx) => {
        const isActive = idx === currentSlide;
        return (
          <div
            key={slide.id}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
              isActive ? 'opacity-100 z-10' : 'opacity-0 z-0 pointer-events-none'
            }`}
          >
            {/* Background Image */}
            <img
              src={slide.image}
              alt={slide.alt}
              className={`${idx === 0 ? 'intro-bg-img' : ''} absolute inset-0 w-full h-full object-cover object-center`}
              style={{ transformOrigin: 'center center' }}
              loading={idx === 0 ? 'eager' : 'lazy'}
              decoding={idx === 0 ? 'sync' : 'async'}
              fetchPriority={idx === 0 ? 'high' : 'low'}
            />

            {/* Dark Left-to-Right Gradient Scrim */}
            <div
              className={`${idx === 0 ? 'intro-scrim' : ''} absolute inset-0`}
              style={{
                background:
                  'linear-gradient(90deg, rgba(3,10,21,0.92) 0%, rgba(3,10,21,0.72) 55%, rgba(3,10,21,0.3) 85%, transparent 100%)',
              }}
            />
          </div>
        );
      })}

      {/* Main Hero Content: Left Column Copy + Desktop Right Column Compact Enquiry Form */}
      <div className="relative z-20 h-full max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-12 py-12 lg:py-0 flex items-center">
        <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Left Column: Headlines & CTA */}
          <div className="lg:col-span-7 xl:col-span-8 text-left max-w-[680px]">
            <h1
              className="text-white font-bold tracking-tight mb-4 sm:mb-5 leading-[1.15]"
              style={{ fontSize: 'clamp(1.9rem, 4.2vw, 3.4rem)' }}
            >
              <span className="block overflow-hidden py-0.5">
                <span className="intro-headline-1 block">{SLIDES[currentSlide].headingLine1}</span>
              </span>
              <span className="block overflow-hidden py-0.5">
                <span className="intro-headline-2 block">{SLIDES[currentSlide].headingLine2}</span>
              </span>
            </h1>

            <div>
              <p className="intro-subline text-white/90 text-[16px] sm:text-[18px] font-normal mb-6 sm:mb-8 leading-relaxed max-w-[540px]">
                {SLIDES[currentSlide].subline}
              </p>

              {onOpenModal && (
                <div className="flex items-center gap-4">
                  <button
                    onClick={() => onOpenModal('MS-CIT')}
                    className="intro-cta-btn rounded-full bg-[#0B6AA8] hover:bg-[#095A90] text-white px-7 py-3 text-[14px] sm:text-[15px] font-semibold transition-all shadow-lg hover:shadow-cyan-500/20 cursor-pointer inline-flex items-center gap-2 btn-hover"
                  >
                    Book Free Trial Class
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Desktop Right Column: Compact Enquiry Form Card (overlapping photo, vertically centered) */}
          <div className="intro-enquire-card hidden lg:flex lg:col-span-5 xl:col-span-4 justify-end">
            <CompactEnquiryForm />
          </div>

        </div>
      </div>

      {/* Slide Indicators (bottom left on desktop, bottom center on mobile) */}
      <div className="intro-dot-pager absolute bottom-6 left-4 sm:left-6 lg:left-12 flex items-center gap-2.5 z-30">
        {SLIDES.map((slide, idx) => (
          <button
            key={slide.id}
            onClick={() => setCurrentSlide(idx)}
            aria-label={`Go to slide ${idx + 1}`}
            className={`border-none p-0 cursor-pointer transition-all duration-400 ${
              idx === currentSlide
                ? 'w-8 h-2.5 rounded-full bg-[#0B6AA8]'
                : 'w-2.5 h-2.5 rounded-full bg-white/50 hover:bg-white/80'
            }`}
          />
        ))}
      </div>
    </section>
  );
}
