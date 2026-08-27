import { useEffect, useRef } from 'react';
import { useParams, Link } from 'react-router-dom';
import {
  Clock,
  Layers,
  Monitor,
  Award,
  Phone,
  MessageSquare,
  ArrowLeft,
  CalendarCheck,
} from 'lucide-react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { categories, courses } from '../data/courses';
import CourseIcon from './CourseIcon';
import CourseEnquiryForm from './CourseEnquiryForm';
import CourseThumbnail from './CourseThumbnail';

gsap.registerPlugin(ScrollTrigger);

export default function CourseDetail({ onOpenModal }) {
  const { slug } = useParams();
  const syllabusRef = useRef(null);

  const course = courses.find((c) => c.slug === slug);

  const category = course
    ? categories.find((c) => c.slug === course.categorySlug)
    : null;

  const getCategoryName = (catSlug) => {
    const cat = categories.find((c) => c.slug === catSlug);
    return cat ? cat.name : catSlug;
  };

  // SEO & Structured Data
  useEffect(() => {
    if (!course) return;

    // Document Title
    document.title = `${course.title} in Mulund West | National Computer Centre`;

    // Meta Description
    let metaDesc = document.querySelector('meta[name="description"]');
    if (!metaDesc) {
      metaDesc = document.createElement('meta');
      metaDesc.name = 'description';
      document.head.appendChild(metaDesc);
    }
    metaDesc.content = course.highlight;

    // JSON-LD Course Schema
    const scriptId = 'course-json-ld';
    let scriptEl = document.getElementById(scriptId);
    if (!scriptEl) {
      scriptEl = document.createElement('script');
      scriptEl.id = scriptId;
      scriptEl.type = 'application/ld+json';
      document.head.appendChild(scriptEl);
    }

    const schemaData = {
      '@context': 'https://schema.org',
      '@type': 'Course',
      'name': course.title,
      'description': course.description,
      'provider': {
        '@type': 'EducationalOrganization',
        'name': 'National Computer Centre',
        'sameAs': 'https://nationalcomputers.co.in',
        'address': {
          '@type': 'PostalAddress',
          'streetAddress': 'Shop No. 7, Anubhav Building, Zaver Road, Near Railway Station',
          'addressLocality': 'Mulund West',
          'addressRegion': 'Maharashtra',
          'postalCode': '400080',
          'addressCountry': 'IN',
        },
      },
      'timeRequired': course.duration,
      'educationalCredentialAwarded': 'Government Recognised Certificate',
    };

    scriptEl.textContent = JSON.stringify(schemaData);

    return () => {
      const el = document.getElementById(scriptId);
      if (el) el.remove();
    };
  }, [course]);

  // Syllabus Stagger Animation
  useEffect(() => {
    if (!course) return;
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      if (syllabusRef.current) {
        gsap.fromTo(
          syllabusRef.current.children,
          { y: 12, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.5,
            stagger: 0.04,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: syllabusRef.current,
              start: 'top 85%',
            },
          }
        );
      }
    }, syllabusRef);

    return () => ctx.revert();
  }, [course]);

  // 404 handler if slug not found
  if (!course) {
    return (
      <div className="min-h-screen bg-[#EFEDE8] text-[#111111] pt-36 pb-24 flex items-center justify-center">
        <div className="mx-auto max-w-xl px-4 text-center">
          <span className="section-label text-[#111111]/50 block mb-4">404 — COURSE NOT FOUND</span>
          <h1 className="font-display text-4xl sm:text-6xl uppercase tracking-[-0.02em] leading-[1.02] pb-[0.08em] mb-6">
            THIS COURSE DOES NOT EXIST
          </h1>
          <p className="text-sm sm:text-base text-[#111111]/70 mb-8 leading-relaxed">
            The course you are looking for may have been updated or moved. Please explore our complete catalogue of 56 certified courses.
          </p>
          <Link
            to="/courses"
            className="inline-flex items-center gap-2 rounded-full bg-[#111111] px-7 py-3 text-xs font-bold uppercase tracking-[0.15em] text-[#EFEDE8] hover:bg-primary btn-swiss"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>VIEW ALL 56 COURSES</span>
          </Link>
        </div>
      </div>
    );
  }

  // Related courses (3 from same category, or backfilled)
  const categoryCourses = courses.filter(
    (c) => c.categorySlug === course.categorySlug && c.slug !== course.slug
  );
  let relatedCourses = categoryCourses.slice(0, 3);
  if (relatedCourses.length < 3) {
    const otherCourses = courses.filter(
      (c) => c.slug !== course.slug && !relatedCourses.some((rc) => rc.slug === c.slug)
    );
    relatedCourses = [...relatedCourses, ...otherCourses.slice(0, 3 - relatedCourses.length)];
  }

  const whatsappMessage = encodeURIComponent(
    `Hi National Computer Centre, I would like details about the ${course.title} course.`
  );

  return (
    <div className="bg-[#EFEDE8] text-[#111111] pt-28 sm:pt-32">
      {/* 1. Hero & Top Two-Column Section with Sticky Enquiry Form */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-4 pb-16">
        <div className="grid grid-cols-1 lg:grid-cols-[1.15fr_0.85fr] gap-10 lg:gap-12 items-start">
          {/* Left Column: Thumbnail Banner, Breadcrumbs, Title, Highlight, Facts Strip */}
          <div className="space-y-6">
            {/* Breadcrumb */}
            <nav className="text-[11px] font-mono tracking-widest uppercase text-[#111111]/50 flex flex-wrap items-center gap-2">
              <Link to="/" className="hover:text-[#111111] transition-colors">HOME</Link>
              <span>/</span>
              <Link to="/courses" className="hover:text-[#111111] transition-colors">COURSES</Link>
              <span>/</span>
              <Link
                to={`/courses?category=${course.categorySlug}`}
                className="text-[#111111] font-semibold hover:text-primary transition-colors"
              >
                {category?.name || course.categorySlug}
              </Link>
            </nav>

            {/* Course Thumbnail Wide Banner with NCC Branding Overlay */}
            <div className="rounded-2xl overflow-hidden border border-[#111111]/15 group">
              <CourseThumbnail
                slug={course.slug}
                title={course.title}
                categoryName={category?.name || course.categorySlug}
                aspectRatio="aspect-[16/9]"
                priority={true}
              />
            </div>

            {/* Category Label + Duration Meta Line */}
            <div className="flex items-center gap-3 pt-1">
              <span className="section-label text-primary font-bold">
                {category?.name || course.categorySlug}
              </span>
              <span className="text-[#111111]/30">·</span>
              <span className="text-xs font-mono tracking-wider uppercase text-[#111111]/60">
                {course.duration}
              </span>
              {course.featured && (
                <>
                  <span className="text-[#111111]/30">·</span>
                  <span className="text-[10px] font-mono tracking-widest uppercase text-primary bg-brand-cyan-soft px-1.5 py-0.5 rounded font-bold">
                    FEATURED
                  </span>
                </>
              )}
            </div>

            {/* Giant Anton Title */}
            <h1
              className="font-display tracking-[-0.02em] uppercase text-[#111111] leading-[1.02] md:leading-[0.98] pb-[0.08em] text-left select-none"
              style={{ fontSize: 'clamp(2.4rem, 5.5vw, 5.5rem)' }}
            >
              {course.title}
            </h1>

            {/* Highlight in Larger Body Text */}
            <p className="text-base sm:text-lg lg:text-xl text-[#111111]/80 font-normal leading-relaxed max-w-2xl">
              {course.highlight}
            </p>

            {/* Quick Facts Strip (Hairline-separated inline items) */}
            <div className="pt-6 pb-6 border-y border-[#111111]/15 grid grid-cols-2 sm:grid-cols-4 gap-6 text-xs sm:text-sm font-medium text-[#111111]">
              <div className="flex items-center gap-2.5">
                <Clock className="w-4 h-4 text-primary shrink-0" strokeWidth={1.5} />
                <div>
                  <span className="text-[10px] font-mono uppercase tracking-wider text-[#111111]/50 block">DURATION</span>
                  <span>{course.duration}</span>
                </div>
              </div>

              <div className="flex items-center gap-2.5">
                <Layers className="w-4 h-4 text-primary shrink-0" strokeWidth={1.5} />
                <div>
                  <span className="text-[10px] font-mono uppercase tracking-wider text-[#111111]/50 block">CATEGORY</span>
                  <span className="truncate">{category?.name || course.categorySlug}</span>
                </div>
              </div>

              <div className="flex items-center gap-2.5">
                <Monitor className="w-4 h-4 text-primary shrink-0" strokeWidth={1.5} />
                <div>
                  <span className="text-[10px] font-mono uppercase tracking-wider text-[#111111]/50 block">MODE</span>
                  <span>Offline · 1:1 PC</span>
                </div>
              </div>

              <div className="flex items-center gap-2.5">
                <Award className="w-4 h-4 text-primary shrink-0" strokeWidth={1.5} />
                <div>
                  <span className="text-[10px] font-mono uppercase tracking-wider text-[#111111]/50 block">CERTIFICATE</span>
                  <span>Govt Recognised</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Sticky Quick Course Enquiry Form */}
          <div className="lg:sticky lg:top-28 w-full">
            <CourseEnquiryForm courseTitle={course.title} />
          </div>
        </div>
      </section>

      {/* 2. Course Overview & Complete Syllabus Section */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 border-t border-[#111111]/15">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left Column: About This Course */}
          <div className="lg:col-span-5 space-y-6">
            <span className="section-label text-[#111111]/50 block">OVERVIEW</span>
            <h2 className="font-display text-3xl sm:text-4xl uppercase tracking-[-0.02em] leading-[1.02] text-[#111111] pb-[0.04em]">
              ABOUT THIS COURSE
            </h2>
            <p className="text-base sm:text-lg leading-relaxed text-[#111111]/85 max-w-[65ch]">
              {course.description}
            </p>

            <div className="pt-4 p-6 border border-[#111111]/15 rounded-2xl bg-[#EFEDE8] space-y-3">
              <span className="section-label text-primary block">LEARNING ENVIRONMENT</span>
              <p className="text-xs sm:text-sm text-[#111111]/70 leading-relaxed">
                Every student is assigned an individual high-speed desktop terminal with uninterrupted practice time and bilingual faculty guidance in Marathi, Hindi, and English.
              </p>
            </div>
          </div>

          {/* Right Column: Complete Syllabus */}
          <div className="lg:col-span-7 space-y-6">
            <div className="flex items-center justify-between">
              <span className="section-label text-[#111111]/50 block">CURRICULUM</span>
              <span className="text-xs font-mono text-[#111111]/40 uppercase tracking-widest">
                {course.syllabus.length} MODULES
              </span>
            </div>

            <h2 className="font-display text-3xl sm:text-4xl uppercase tracking-[-0.02em] leading-[1.02] text-[#111111] pb-[0.04em]">
              COMPLETE SYLLABUS
            </h2>

            <div ref={syllabusRef} className="space-y-0 pt-2 border-b border-[#111111]/15">
              {course.syllabus.map((item, idx) => (
                <div
                  key={idx}
                  className="py-4 border-t border-[#111111]/15 flex items-start gap-4 sm:gap-6 hover:bg-[#111111]/[0.02] transition-colors px-2 rounded-lg"
                >
                  <span className="font-mono text-xs text-[#111111]/40 w-7 shrink-0 pt-0.5">
                    {String(idx + 1).padStart(2, '0')}
                  </span>
                  <span className="text-sm sm:text-base font-medium text-[#111111] leading-relaxed">
                    {item}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 3. Full-Bleed Ink Black Enquiry CTA Band */}
      <section className="bg-[#111111] text-[#EFEDE8] py-20 lg:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl space-y-6">
            <span className="section-label text-white/50 block">ADMISSIONS & COUNSELLING</span>
            <h2 className="font-display text-4xl sm:text-6xl uppercase tracking-[-0.02em] text-white leading-[1.02] md:leading-[0.98] pb-[0.08em]">
              READY TO MASTER {course.title}?
            </h2>
            <p className="text-base sm:text-lg text-white/70 leading-relaxed max-w-2xl">
              Book a 1-day free practical trial at our Mulund West centre. Experience 1-on-1 terminal mentoring with zero obligation.
            </p>

            <div className="pt-4 flex flex-wrap items-center gap-4">
              <button
                onClick={() => onOpenModal(course.title)}
                className="rounded-full bg-white px-8 py-3.5 text-xs font-bold uppercase tracking-[0.15em] text-[#111111] hover:bg-primary hover:text-white btn-swiss cursor-pointer flex items-center gap-2"
              >
                <CalendarCheck className="w-4 h-4" />
                <span>BOOK FREE TRIAL</span>
              </button>

              <a
                href={`https://wa.me/919821115699?text=${whatsappMessage}`}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-full border border-white/30 px-8 py-3.5 text-xs font-bold uppercase tracking-[0.15em] text-white hover:bg-white hover:text-[#111111] btn-swiss flex items-center gap-2"
              >
                <MessageSquare className="w-4 h-4 text-brand-green" />
                <span>WHATSAPP ENQUIRY</span>
              </a>
            </div>

            <div className="pt-6 border-t border-white/10 flex flex-wrap items-center gap-6 text-xs font-mono text-white/60">
              <span className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-brand-cyan" />
                Call Admissions:
                <a href="tel:+919821115699" className="text-white hover:text-brand-cyan transition-colors underline underline-offset-2">
                  +91 98211 15699
                </a>
              </span>
              <span>·</span>
              <span>Shop No. 7, Anubhav Bldg, Zaver Road, Mulund (W)</span>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Related Courses Section */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-20 border-t border-[#111111]/15">
        <div className="flex items-center justify-between pb-6 border-b border-[#111111]/15 mb-10">
          <span className="section-label text-[#111111]">RELATED COURSES</span>
          <Link
            to={`/courses?category=${course.categorySlug}`}
            className="section-label text-primary hover:text-brand-cyan hover:underline"
          >
            VIEW ALL IN {category?.name || course.categorySlug} →
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {relatedCourses.map((rel, idx) => (
            <Link
              key={rel.slug}
              to={`/courses/${rel.slug}`}
              className="border border-[#111111]/15 bg-[#EFEDE8] rounded-2xl flex flex-col justify-between hover:border-[#111111]/60 hover:-translate-y-1 transition-all duration-200 group cursor-pointer overflow-hidden"
            >
              {/* Card Top Thumbnail Image */}
              <CourseThumbnail
                slug={rel.slug}
                title={rel.title}
                categoryName={getCategoryName(rel.categorySlug)}
              />

              <div className="p-6 flex flex-col justify-between flex-grow">
                <div>
                  <div className="flex items-start justify-between pb-4 border-b border-[#111111]/15">
                    <CourseIcon
                      name={rel.icon}
                      className="w-5 h-5 text-primary"
                      strokeWidth={1.25}
                    />
                    <span className="font-mono text-xs text-[#111111]/40 tracking-widest">
                      {String(idx + 1).padStart(2, '0')}
                    </span>
                  </div>

                  <h3 className="font-display text-xl text-[#111111] uppercase tracking-[-0.02em] mt-4 leading-[1.02] pb-[0.04em] group-hover:text-primary transition-colors">
                    {rel.title}
                  </h3>

                  <p className="mt-2 text-xs text-[#111111]/70 leading-relaxed line-clamp-2">
                    {rel.highlight}
                  </p>
                </div>

                <div className="pt-4 mt-4 border-t border-[#111111]/15 flex items-center justify-between text-[11px] font-mono text-[#111111]/50">
                  <span>{rel.duration}</span>
                  <span className="text-[#111111] font-sans font-bold flex items-center gap-1 group-hover:text-primary">
                    VIEW ↗
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
