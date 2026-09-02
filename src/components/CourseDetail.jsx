import { useEffect, useRef, useState } from 'react';
import { useParams, Link, useSearchParams, useLocation } from 'react-router-dom';
import {
  Clock,
  Layers,
  Monitor,
  Award,
  Phone,
  MessageSquare,
  CalendarCheck,
  Star,
  ChevronDown,
  CheckCircle2,
  BookOpen,
  GraduationCap
} from 'lucide-react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { categories, courses } from '../data/courses';
import CourseEnquiryForm from './CourseEnquiryForm';
import CourseThumbnail from './CourseThumbnail';
import CourseCard from './CourseCard';
import { useSectionReveal, isReducedMotion } from '../hooks/useMotionReveal';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export default function CourseDetail({ onOpenModal, isOnline: isOnlineProp = false }) {
  const { slug } = useParams();
  const [searchParams] = useSearchParams();
  const location = useLocation();
  const isOnline =
    isOnlineProp ||
    searchParams.get('mode') === 'online' ||
    location.pathname.startsWith('/online-courses');

  const mainSecRef = useRef(null);
  const overviewSecRef = useRef(null);
  const relatedSecRef = useRef(null);
  const syllabusRef = useRef(null);

  useSectionReveal(mainSecRef);
  useSectionReveal(overviewSecRef);
  useSectionReveal(relatedSecRef);

  const course = courses.find((c) => c.slug === slug);
  const courseTitle = course ? (course.name || course.title) : '';
  const category = course ? categories.find((c) => c.slug === course.categorySlug) : null;
  const getCategoryName = (catSlug) => {
    const cat = categories.find((c) => c.slug === catSlug);
    return cat ? cat.name : catSlug;
  };

  // Accordion state for syllabus modules: default open module 0, or all if 1 module
  const [openModules, setOpenModules] = useState(() => {
    if (!course || !course.syllabus) return { 0: true };
    // If only 1 module, keep it open; otherwise open first module by default
    return { 0: true };
  });

  // Reset open modules when navigating to a new course
  useEffect(() => {
    if (course && course.syllabus) {
      if (course.syllabus.length === 1) {
        setOpenModules({ 0: true });
      } else {
        setOpenModules({ 0: true, 1: true });
      }
    }
  }, [slug]);

  const toggleModule = (idx) => {
    setOpenModules((prev) => ({
      ...prev,
      [idx]: !prev[idx],
    }));
  };

  const toggleAllModules = () => {
    if (!course?.syllabus) return;
    const allOpen = course.syllabus.every((_, idx) => openModules[idx]);
    if (allOpen) {
      setOpenModules({});
    } else {
      const nextState = {};
      course.syllabus.forEach((_, idx) => {
        nextState[idx] = true;
      });
      setOpenModules(nextState);
    }
  };

  // SEO & JSON-LD
  useEffect(() => {
    if (!course) return;
    document.title = isOnline
      ? `${courseTitle} Online Course | National Computer Centre`
      : `${courseTitle} in Mulund West | National Computer Centre`;
    let metaDesc = document.querySelector('meta[name="description"]');
    if (!metaDesc) {
      metaDesc = document.createElement('meta');
      metaDesc.name = 'description';
      document.head.appendChild(metaDesc);
    }
    metaDesc.content = course.highlight;

    const scriptId = 'course-json-ld';
    let scriptEl = document.getElementById(scriptId);
    if (!scriptEl) {
      scriptEl = document.createElement('script');
      scriptEl.id = scriptId;
      scriptEl.type = 'application/ld+json';
      document.head.appendChild(scriptEl);
    }
    scriptEl.textContent = JSON.stringify({
      '@context': 'https://schema.org',
      '@type': 'Course',
      name: courseTitle,
      description: course.description,
      provider: {
        '@type': 'EducationalOrganization',
        name: 'National Computer Centre',
        email: 'Info@nationalcomputercentre.com',
        telephone: '+91-98211-15699',
        address: {
          '@type': 'PostalAddress',
          streetAddress: 'Shop No. 7, Anubhav Building, Zaver Road, Near Railway Station',
          addressLocality: 'Mulund West',
          addressRegion: 'Maharashtra',
          postalCode: '400080',
          addressCountry: 'IN',
        },
      },
      timeRequired: course.duration,
      educationalCredentialAwarded: 'Government Recognised Certificate',
    });
    return () => {
      const el = document.getElementById(scriptId);
      if (el) el.remove();
    };
  }, [course, courseTitle, isOnline]);

  // Syllabus animation
  useEffect(() => {
    if (!course || isReducedMotion()) return;
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
            scrollTrigger: { trigger: syllabusRef.current, start: 'top 85%', once: true },
          }
        );
      }
    }, syllabusRef);
    return () => ctx.revert();
  }, [course]);

  if (!course) {
    return (
      <div className="min-h-screen bg-background pt-36 pb-24 flex items-center justify-center">
        <div className="mx-auto max-w-xl px-4 text-center">
          <span className="eyebrow-chip mb-4 inline-block">404 — Course Not Found</span>
          <h1 className="font-bold text-foreground mb-4" style={{ fontSize: 'clamp(1.8rem, 4vw, 2.8rem)' }}>
            This course does not exist
          </h1>
          <p className="text-muted-foreground mb-8 leading-relaxed">
            The course you are looking for may have been updated or moved. Please explore our complete catalogue.
          </p>
          <Link
            to={isOnline ? '/online-courses' : '/courses'}
            className="inline-flex items-center gap-2 rounded-full bg-primary px-7 py-3 text-[14px] font-semibold text-white hover:bg-[#095A90] btn-swiss"
          >
            View All 52 Courses
          </Link>
        </div>
      </div>
    );
  }

  // Related courses
  const categoryCourses = courses.filter((c) => c.categorySlug === course.categorySlug && c.slug !== course.slug);
  let relatedCourses = categoryCourses.slice(0, 3);
  if (relatedCourses.length < 3) {
    const otherCourses = courses.filter((c) => c.slug !== course.slug && !relatedCourses.some((rc) => rc.slug === c.slug));
    relatedCourses = [...relatedCourses, ...otherCourses.slice(0, 3 - relatedCourses.length)];
  }

  const whatsappMessage = isOnline
    ? encodeURIComponent(`Hi National Computer Centre, I would like details about the ${courseTitle} online course.`)
    : encodeURIComponent(`Hi National Computer Centre, I would like details about the ${courseTitle} course.`);

  const factChips = [
    { Icon: Clock, label: 'Duration', value: course.duration },
    { Icon: Layers, label: 'Category', value: category?.name || course.category || course.categorySlug },
    { Icon: GraduationCap, label: 'Level', value: course.level || 'All Levels' },
    { Icon: Monitor, label: 'Mode', value: isOnline ? 'Online · Live Interactive' : 'Offline · 1:1 PC' },
    { Icon: Award, label: 'Certificate', value: 'Govt Recognised' },
  ];

  const totalTopics = course.syllabus
    ? course.syllabus.reduce((acc, curr) => acc + (curr.topics?.length || 0), 0)
    : 0;

  const allModulesOpen = course.syllabus?.every((_, idx) => openModules[idx]);

  return (
    <div className="bg-background pt-8 sm:pt-12">
      {/* Light hero band */}
      <section className="bg-gradient-to-b from-[#F0F7FF] to-white py-6 border-b border-border">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* Breadcrumb */}
          <nav className="flex flex-wrap items-center gap-2 text-[13px] font-medium text-muted-foreground">
            <Link to="/" className="hover:text-primary transition-colors">
              Home
            </Link>
            <span>/</span>
            <Link to={isOnline ? '/online-courses' : '/courses'} className="hover:text-primary transition-colors">
              {isOnline ? 'Online Courses' : 'Courses'}
            </Link>
            <span>/</span>
            <Link
              to={isOnline ? `/online-courses?category=${course.categorySlug}` : `/courses?category=${course.categorySlug}`}
              className="hover:text-primary transition-colors text-foreground font-semibold"
            >
              {category?.name || course.category || course.categorySlug}
            </Link>
          </nav>
        </div>
      </section>

      {/* Main two-column */}
      <section ref={mainSecRef} className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-[1.2fr_0.8fr] gap-10 lg:gap-14 items-start">
          {/* Left: Course info */}
          <div className="space-y-6">
            {/* Category chip + duration */}
            <div className="reveal-eyebrow flex flex-wrap items-center gap-2">
              <span className="eyebrow-chip">{category?.name || course.category || course.categorySlug}</span>
              {course.featured && (
                <span className="bg-accent-soft text-primary text-[11px] font-semibold px-3 py-1 rounded-full uppercase tracking-wide">
                  Featured
                </span>
              )}
            </div>

            {/* Title */}
            <h1
              className="reveal-heading font-bold text-foreground leading-tight"
              style={{ fontSize: 'clamp(2rem, 4.5vw, 3rem)', letterSpacing: '-0.01em' }}
            >
              {courseTitle}
            </h1>

            {/* Star rating */}
            <div className="reveal-body flex items-center gap-2">
              <div className="flex items-center gap-0.5">
                {[1, 2, 3, 4, 5].map((i) => (
                  <Star key={i} className="w-4 h-4 fill-[#F5A623] text-[#F5A623]" />
                ))}
              </div>
              <span className="text-[14px] text-muted-foreground font-medium">4.9 · 512 reviews</span>
            </div>

            {/* Highlight */}
            <p className="reveal-body text-base sm:text-lg text-muted-foreground leading-relaxed max-w-2xl">
              {course.highlight}
            </p>

            {/* Fact chips */}
            <div className="reveal-item flex flex-wrap gap-2">
              {factChips.map(({ Icon, label, value }) => (
                <div key={label} className="flex items-center gap-2 bg-accent-soft text-foreground rounded-lg px-3 py-2">
                  <Icon className="w-4 h-4 text-primary shrink-0" strokeWidth={1.5} />
                  <div>
                    <span className="text-[10px] text-primary font-semibold uppercase tracking-wide block leading-none">
                      {label}
                    </span>
                    <span className="text-[13px] font-medium">{value}</span>
                  </div>
                </div>
              ))}
            </div>

            {/* Thumbnail */}
            <div className="reveal-item rounded-[20px] overflow-hidden border border-border group">
              <CourseThumbnail
                slug={course.slug}
                title={courseTitle}
                categoryName={category?.name || course.category || course.categorySlug}
                aspectRatio="aspect-[16/9]"
                priority={true}
              />
            </div>
          </div>

          {/* Right: Sticky form */}
          <div className="reveal-item lg:sticky lg:top-24 w-full">
            <CourseEnquiryForm courseTitle={courseTitle} />
          </div>
        </div>
      </section>

      {/* Overview + Syllabus */}
      <section ref={overviewSecRef} className="bg-surface border-t border-border py-14">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
            {/* Left: Overview */}
            <div className="lg:col-span-5 space-y-5">
              <span className="reveal-eyebrow eyebrow-chip inline-block">Overview</span>
              <h2 className="reveal-heading font-bold text-foreground" style={{ fontSize: 'clamp(1.5rem, 3vw, 2rem)' }}>
                About This <span className="text-primary">Course</span>
              </h2>
              <p className="reveal-body text-[15px] sm:text-base leading-relaxed text-muted-foreground">
                {course.description}
              </p>
              <div className="reveal-item p-5 border border-border rounded-xl bg-white space-y-3">
                <span className="eyebrow-chip inline-block">Learning Environment</span>
                <p className="text-[14px] text-muted-foreground leading-relaxed">
                  Every student is assigned an individual high-speed desktop terminal with uninterrupted practice time and bilingual faculty guidance in Marathi, Hindi, and English.
                </p>
                <div className="pt-2 border-t border-slate-100 flex items-center gap-3 text-[13px] text-slate-600 font-medium">
                  <div className="w-2 h-2 rounded-full bg-[#6FBE44]" />
                  <span>100% Practical Hands-on Labs & Capstone Projects</span>
                </div>
              </div>
            </div>

            {/* Right: Syllabus Accordion / Module List */}
            <div className="lg:col-span-7 space-y-5">
              <div className="reveal-eyebrow flex items-center justify-between flex-wrap gap-2">
                <div className="flex items-center gap-2">
                  <span className="eyebrow-chip inline-block">Curriculum</span>
                  <span className="text-[12px] text-muted-foreground font-semibold uppercase tracking-wider">
                    {course.syllabus?.length || 0} {course.syllabus?.length === 1 ? 'Module' : 'Modules'} · {totalTopics} Topics
                  </span>
                </div>
                {course.syllabus && course.syllabus.length > 1 && (
                  <button
                    onClick={toggleAllModules}
                    className="text-[12px] font-semibold text-primary hover:text-primary-hover underline underline-offset-4 cursor-pointer"
                  >
                    {allModulesOpen ? 'Collapse All' : 'Expand All'}
                  </button>
                )}
              </div>

              <h2 className="reveal-heading font-bold text-foreground" style={{ fontSize: 'clamp(1.5rem, 3vw, 2rem)' }}>
                Course <span className="text-primary">Syllabus</span>
              </h2>

              <div ref={syllabusRef} className="space-y-3">
                {course.syllabus &&
                  course.syllabus.map((mod, idx) => {
                    const isOpen = !!openModules[idx];
                    return (
                      <div
                        key={idx}
                        className="bg-white rounded-xl border border-border overflow-hidden transition-all duration-200 hover:border-slate-300 shadow-2xs"
                      >
                        {/* Module Accordion Header */}
                        <button
                          type="button"
                          onClick={() => toggleModule(idx)}
                          className="w-full text-left p-4 sm:p-5 flex items-center justify-between gap-4 cursor-pointer select-none focus:outline-none focus-visible:bg-slate-50 transition-colors"
                          aria-expanded={isOpen}
                        >
                          <div className="flex items-center gap-3.5 min-w-0">
                            <div className="w-8 h-8 rounded-lg bg-accent-soft text-primary font-bold text-[13px] flex items-center justify-center shrink-0">
                              {String(idx + 1).padStart(2, '0')}
                            </div>
                            <div className="min-w-0">
                              <h3 className="text-[15px] sm:text-[16px] font-semibold text-foreground leading-snug truncate">
                                {mod.module}
                              </h3>
                              <span className="text-[12px] text-muted-foreground font-medium">
                                {mod.topics?.length || 0} {(mod.topics?.length === 1) ? 'topic' : 'topics'}
                              </span>
                            </div>
                          </div>
                          <ChevronDown
                            className={`w-5 h-5 text-slate-400 shrink-0 transition-transform duration-300 ${
                              isOpen ? 'rotate-180 text-primary' : ''
                            }`}
                          />
                        </button>

                        {/* Module Topics List */}
                        {isOpen && mod.topics && (
                          <div className="px-4 sm:px-5 pb-5 pt-1 border-t border-slate-100 bg-[#FAFBFD]">
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-3">
                              {mod.topics.map((topic, topicIdx) => (
                                <div
                                  key={topicIdx}
                                  className="flex items-start gap-2.5 text-[14px] text-[#334155] bg-white rounded-lg p-3 border border-slate-200/70 shadow-2xs hover:border-primary/40 transition-colors"
                                >
                                  <CheckCircle2 className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                                  <span className="leading-snug">{topic}</span>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    );
                  })}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Band — light primary */}
      <section className="bg-primary py-16 lg:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl space-y-5">
            <span className="inline-block bg-white/20 text-white text-[11px] font-semibold px-4 py-1.5 rounded-full uppercase tracking-wider">
              Admissions & Counselling
            </span>
            <h2 className="font-bold text-white" style={{ fontSize: 'clamp(1.8rem, 3.5vw, 2.6rem)', lineHeight: 1.2 }}>
              Ready to master {courseTitle}?
            </h2>
            <p className="text-white/80 text-base sm:text-lg leading-relaxed max-w-2xl">
              Book a 1-day free practical trial at our Mulund West centre. Experience 1-on-1 terminal mentoring with zero obligation.
            </p>
            <div className="pt-2 flex flex-wrap items-center gap-4">
              <button
                onClick={() => onOpenModal(courseTitle)}
                className="rounded-full bg-white px-8 py-3.5 text-[14px] font-semibold text-primary hover:bg-accent-soft btn-swiss cursor-pointer flex items-center gap-2 btn-hover"
              >
                <CalendarCheck className="w-4 h-4" />
                <span>Book Free Trial</span>
              </button>
              <a
                href={`https://wa.me/919821115699?text=${whatsappMessage}`}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-full border-2 border-white/40 px-8 py-3.5 text-[14px] font-semibold text-white hover:bg-white hover:text-primary btn-swiss flex items-center gap-2 btn-hover"
              >
                <MessageSquare className="w-4 h-4" />
                <span>WhatsApp Enquiry</span>
              </a>
            </div>
            <div className="pt-4 border-t border-white/20 flex flex-wrap items-center gap-5 text-[13px] text-white/70">
              <span className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-white" />
                <a href="tel:+919821115699" className="text-white hover:text-white/80 underline underline-offset-2">
                  +91 98211 15699
                </a>
              </span>
              <span>Shop No. 7, Anubhav Bldg, Zaver Road, Mulund (W)</span>
            </div>
          </div>
        </div>
      </section>

      {/* Related Courses */}
      <section ref={relatedSecRef} className="py-14 bg-background border-t border-border">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-8">
            <h2 className="reveal-heading font-bold text-foreground text-[22px]">
              Related <span className="text-primary">Courses</span>
            </h2>
            <Link
              to={isOnline ? `/online-courses?category=${course.categorySlug}` : `/courses?category=${course.categorySlug}`}
              className="reveal-body text-[13px] font-semibold text-primary hover:text-accent underline underline-offset-4"
            >
              View all in {category?.name || course.category || course.categorySlug}
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {relatedCourses.map((rel) => (
              <div key={rel.slug} className="reveal-item">
                <CourseCard course={rel} categoryName={getCategoryName(rel.categorySlug)} isOnline={isOnline} />
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
