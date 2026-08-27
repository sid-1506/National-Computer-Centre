import { useState, useEffect, useLayoutEffect, useRef } from 'react';
import { Phone, ChevronDown, MessageSquare } from 'lucide-react';
import { gsap } from 'gsap';
import { BUSINESS_INFO } from '../data/nccData';
import { categories, courses } from '../data/courses';
import heroBgImg from '../assets/classroom-logo.png';

const ANIMATED_COURSES = [
  'MS-CIT CERTIFICATION',
  'TALLY PRIME WITH GST',
  'ADVANCE EXCEL & MIS',
  'MERN FULL STACK',
  'PYTHON PROGRAMMING',
  'AI & MACHINE LEARNING',
  'GRAPHICS DESIGNING',
  'AUTOCAD 2D/3D',
  'DIGITAL MARKETING',
  'DATA SCIENCE',
];

export default function Hero({ onOpenModal }) {
  // Intro animation container & refs
  const heroRef = useRef(null);
  const topMetaRef = useRef(null);
  const headingRef = useRef(null);
  const formCardRef = useRef(null);

  // Animated title rotator
  const [courseIdx, setCourseIdx] = useState(0);
  const [animating, setAnimating] = useState(false);

  // Quick Enquiry Form state
  const [form, setForm] = useState({
    name: '',
    mobile: '',
    course: 'Certificate Course in MS-CIT',
  });
  const [errors, setErrors] = useState({});

  useLayoutEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) return;

    const ctx = gsap.context(() => {
      const topMeta = topMetaRef.current;
      const headingElements = headingRef.current?.children;
      const formCard = formCardRef.current;

      const elements = [
        topMeta,
        ...(headingElements ? Array.from(headingElements) : []),
        formCard,
      ].filter(Boolean);

      // Set initial hidden state immediately to prevent FOUC / layout shift
      gsap.set(elements, {
        y: 24,
        opacity: 0,
      });

      const tl = gsap.timeline({
        defaults: {
          duration: 0.7,
          ease: 'power3.out',
        },
      });

      // 1. Hero eyebrow/label
      if (topMeta) {
        tl.to(topMeta, { y: 0, opacity: 1 }, 0);
      }

      // 2. Left column content (eyebrow, display rotator, copy, facts)
      if (headingElements && headingElements.length > 0) {
        tl.to(headingElements, { y: 0, opacity: 1, stagger: 0.08 }, 0.1);
      }

      // 3. Enquiry form card
      if (formCard) {
        tl.to(formCard, { y: 0, opacity: 1 }, 0.35);
      }
    }, heroRef);

    return () => ctx.revert();
  }, []);

  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) return;

    const interval = setInterval(() => {
      setAnimating(true);
      setTimeout(() => {
        setCourseIdx((prev) => (prev + 1) % ANIMATED_COURSES.length);
        setAnimating(false);
      }, 400);
    }, 2400);

    return () => clearInterval(interval);
  }, []);

  const validateForm = () => {
    const errs = {};
    if (!form.name.trim()) {
      errs.name = 'Please enter your name';
    }
    const cleanMobile = form.mobile.replace(/\D/g, '');
    if (!cleanMobile) {
      errs.mobile = 'Please enter your mobile number';
    } else if (cleanMobile.length !== 10) {
      errs.mobile = 'Please enter a valid 10-digit mobile number';
    }
    if (!form.course) {
      errs.course = 'Please select a course';
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleWhatsAppSubmit = (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    const msg = `Hi National Computer Centre, I want to enquire.
Name: ${form.name.trim()}
Mobile: ${form.mobile.trim()}
Course: ${form.course}`;

    const url = `https://wa.me/919821115699?text=${encodeURIComponent(msg)}`;
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <section
      ref={heroRef}
      className="relative pt-28 sm:pt-32 lg:pt-36 pb-16 md:pb-20 bg-[#0B1623] text-[#F8F9FA] overflow-hidden"
    >
      {/* Full-bleed blurred background image layer with dark scrim overlay */}
      <div className="absolute inset-0 pointer-events-none select-none z-0 overflow-hidden">
        {/* CSS background color fallback */}
        <div className="absolute inset-0 bg-[#0B1623]" />
        
        {/* Blurred background image (scaled slightly to avoid edge clipping) */}
        <img
          src={heroBgImg}
          alt="National Computer Centre Classroom"
          width={1920}
          height={1080}
          loading="eager"
          decoding="async"
          fetchPriority="high"
          className="w-full h-full object-cover object-center filter blur-[10px] scale-105 transform-gpu"
        />

        {/* Dark overlay / scrim for crisp contrast */}
        <div className="absolute inset-0 bg-[#0B1623]/75 sm:bg-[#0B1623]/65" />
        {/* Subtle vertical vignette */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#0B1623]/80 via-transparent to-[#0B1623]/90" />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Top Meta Line: Plain text label */}
        <div
          ref={topMetaRef}
          className="pb-6 border-b border-white/15"
        >
          <span className="section-label text-[#F8F9FA]">
            GOVERNMENT RECOGNISED · MULUND WEST, MUMBAI
          </span>
        </div>

        {/* 2-Column Hero Grid: Left 60%, Right 40% */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 pt-8 lg:pt-12 items-center">
          {/* Left Column (~60% / col-span-7) */}
          <div ref={headingRef} className="lg:col-span-7 space-y-6">
            {/* Primary Display Rotator Headline: WANT TO LEARN [ANIMATED COURSE] */}
            <h1
              className="font-display tracking-[-0.02em] uppercase text-[#F8F9FA] leading-[1.02] md:leading-[0.98] pb-[0.08em] select-none text-left"
              style={{ fontSize: 'clamp(2.4rem, 5.8vw, 4.75rem)' }}
            >
              <span className="block">WANT TO LEARN</span>
              <span className="inline-block h-[1.18em] overflow-hidden align-bottom">
                <span
                  className={`inline-block text-primary transition-all duration-400 transform ${
                    animating
                      ? '-translate-y-full opacity-0'
                      : 'translate-y-0 opacity-100'
                  }`}
                >
                  {ANIMATED_COURSES[courseIdx]}
                </span>
              </span>
            </h1>

            {/* Editorial Copy */}
            <p className="text-base sm:text-lg lg:text-xl text-[#F8F9FA]/85 max-w-xl leading-relaxed font-normal pt-3 border-t border-white/15">
              Since 1998, delivering practical, 1-on-1 computer education on dedicated terminals with Maharashtra government certifications.
            </p>
          </div>

          {/* Right Column (~40% / col-span-5): Quick Enquiry Form */}
          <div ref={formCardRef} className="lg:col-span-5">
            <div className="border border-[#111111]/15 rounded-2xl p-6 sm:p-8 bg-[#EFEDE8]/95 backdrop-blur-md shadow-2xl text-[#111111]">
              <div className="pb-4 mb-4 border-b border-[#111111]/15">
                <span className="section-label text-primary font-bold block mb-1">
                  QUICK ADMISSION ENQUIRY
                </span>
                <h2 className="font-display text-2xl uppercase tracking-[-0.02em] text-[#111111] leading-[1.02]">
                  START YOUR 1-ON-1 TRIAL
                </h2>
              </div>

              <form onSubmit={handleWhatsAppSubmit} noValidate className="space-y-5">
                {/* Name */}
                <div>
                  <label className="block text-[11px] uppercase tracking-[0.12em] text-[#111111]/60 font-semibold mb-1">
                    NAME *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Enter your name"
                    value={form.name}
                    onChange={(e) => {
                      setForm({ ...form, name: e.target.value });
                      if (errors.name) setErrors({ ...errors, name: '' });
                    }}
                    className={`w-full bg-transparent border-b py-2 text-base text-[#111111] placeholder:text-[#111111]/30 focus:outline-none transition-colors ${
                      errors.name ? 'border-[#111111]' : 'border-[#111111]/15 focus:border-brand-cyan'
                    }`}
                  />
                  {errors.name && (
                    <p className="mt-1 text-xs italic text-[#111111]">{errors.name}</p>
                  )}
                </div>

                {/* Mobile */}
                <div>
                  <label className="block text-[11px] uppercase tracking-[0.12em] text-[#111111]/60 font-semibold mb-1">
                    MOBILE NUMBER *
                  </label>
                  <input
                    type="tel"
                    required
                    maxLength={10}
                    placeholder="10-digit mobile number"
                    value={form.mobile}
                    onChange={(e) => {
                      const val = e.target.value.replace(/\D/g, '');
                      setForm({ ...form, mobile: val });
                      if (errors.mobile) setErrors({ ...errors, mobile: '' });
                    }}
                    className={`w-full bg-transparent border-b py-2 text-base text-[#111111] placeholder:text-[#111111]/30 focus:outline-none transition-colors ${
                      errors.mobile ? 'border-[#111111]' : 'border-[#111111]/15 focus:border-brand-cyan'
                    }`}
                  />
                  {errors.mobile && (
                    <p className="mt-1 text-xs italic text-[#111111]">{errors.mobile}</p>
                  )}
                </div>

                {/* Course Selection */}
                <div className="relative">
                  <label className="block text-[11px] uppercase tracking-[0.12em] text-[#111111]/60 font-semibold mb-1">
                    SELECT COURSE *
                  </label>
                  <div className="relative">
                    <select
                      value={form.course}
                      onChange={(e) => {
                        setForm({ ...form, course: e.target.value });
                        if (errors.course) setErrors({ ...errors, course: '' });
                      }}
                      className="w-full bg-transparent border-b border-[#111111]/15 py-2 pr-8 text-base text-[#111111] focus:outline-none focus:border-brand-cyan appearance-none cursor-pointer truncate"
                    >
                      {categories.map((cat) => {
                        const catCourses = courses.filter((c) => c.categorySlug === cat.slug);
                        return (
                          <optgroup key={cat.slug} label={cat.name.toUpperCase()}>
                            {catCourses.map((c) => (
                              <option key={c.slug} value={c.title}>
                                {c.title} ({c.duration})
                              </option>
                            ))}
                          </optgroup>
                        );
                      })}
                    </select>
                    <ChevronDown className="w-4 h-4 text-[#111111]/60 absolute right-1 top-1/2 -translate-y-1/2 pointer-events-none" />
                  </div>
                  {errors.course && (
                    <p className="mt-1 text-xs italic text-[#111111]">{errors.course}</p>
                  )}
                </div>

                {/* Equal Height Buttons Row */}
                <div className="pt-2 grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <button
                    type="submit"
                    className="rounded-full bg-[#111111] px-4 py-3.5 text-[11px] font-bold uppercase tracking-[0.12em] text-[#EFEDE8] hover:bg-primary btn-swiss cursor-pointer flex items-center justify-center gap-1.5"
                  >
                    <MessageSquare className="w-4 h-4 text-brand-green shrink-0" />
                    <span>SEND ON WHATSAPP</span>
                  </button>

                  <a
                    href="tel:+919821115699"
                    className="rounded-full border border-[#111111] bg-transparent px-4 py-3.5 text-[11px] font-bold uppercase tracking-[0.12em] text-[#111111] hover:bg-[#111111] hover:text-[#EFEDE8] btn-swiss flex items-center justify-center gap-1.5"
                  >
                    <Phone className="w-3.5 h-3.5 shrink-0" />
                    <span>CALL US</span>
                  </a>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
