import { useEffect, useRef } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Clock, Layers, Monitor, Award, Phone, MessageSquare, CalendarCheck, Star } from 'lucide-react';
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

export default function CourseDetail({ onOpenModal }) {
  const { slug } = useParams();
  const mainSecRef = useRef(null);
  const overviewSecRef = useRef(null);
  const relatedSecRef = useRef(null);
  const syllabusRef = useRef(null);

  useSectionReveal(mainSecRef);
  useSectionReveal(overviewSecRef);
  useSectionReveal(relatedSecRef);

  const course = courses.find((c) => c.slug === slug);
  const category = course ? categories.find((c) => c.slug === course.categorySlug) : null;
  const getCategoryName = (catSlug) => { const cat = categories.find((c) => c.slug === catSlug); return cat ? cat.name : catSlug; };

  // SEO & JSON-LD
  useEffect(() => {
    if (!course) return;
    document.title = `${course.title} in Mulund West | National Computer Centre`;
    let metaDesc = document.querySelector('meta[name="description"]');
    if (!metaDesc) { metaDesc = document.createElement('meta'); metaDesc.name = 'description'; document.head.appendChild(metaDesc); }
    metaDesc.content = course.highlight;

    const scriptId = 'course-json-ld';
    let scriptEl = document.getElementById(scriptId);
    if (!scriptEl) { scriptEl = document.createElement('script'); scriptEl.id = scriptId; scriptEl.type = 'application/ld+json'; document.head.appendChild(scriptEl); }
    scriptEl.textContent = JSON.stringify({
      '@context': 'https://schema.org', '@type': 'Course', 'name': course.title, 'description': course.description,
      'provider': { '@type': 'EducationalOrganization', 'name': 'National Computer Centre', 'sameAs': 'https://nationalcomputers.co.in',
        'address': { '@type': 'PostalAddress', 'streetAddress': 'Shop No. 7, Anubhav Building, Zaver Road, Near Railway Station', 'addressLocality': 'Mulund West', 'addressRegion': 'Maharashtra', 'postalCode': '400080', 'addressCountry': 'IN' }},
      'timeRequired': course.duration, 'educationalCredentialAwarded': 'Government Recognised Certificate',
    });
    return () => { const el = document.getElementById(scriptId); if (el) el.remove(); };
  }, [course]);

  // Syllabus animation
  useEffect(() => {
    if (!course || isReducedMotion()) return;
    const ctx = gsap.context(() => {
      if (syllabusRef.current) {
        gsap.fromTo(syllabusRef.current.children, { y: 12, opacity: 0 }, {
          y: 0, opacity: 1, duration: 0.5, stagger: 0.04, ease: 'power2.out',
          scrollTrigger: { trigger: syllabusRef.current, start: 'top 85%', once: true },
        });
      }
    }, syllabusRef);
    return () => ctx.revert();
  }, [course]);

  if (!course) {
    return (
      <div className="min-h-screen bg-background pt-36 pb-24 flex items-center justify-center">
        <div className="mx-auto max-w-xl px-4 text-center">
          <span className="eyebrow-chip mb-4 inline-block">404 — Course Not Found</span>
          <h1 className="font-bold text-foreground mb-4" style={{ fontSize: 'clamp(1.8rem, 4vw, 2.8rem)' }}>This course does not exist</h1>
          <p className="text-muted-foreground mb-8 leading-relaxed">The course you are looking for may have been updated or moved. Please explore our complete catalogue.</p>
          <Link to="/courses" className="inline-flex items-center gap-2 rounded-full bg-primary px-7 py-3 text-[14px] font-semibold text-white hover:bg-[#095A90] btn-swiss">
            View All 56 Courses
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

  const whatsappMessage = encodeURIComponent(`Hi National Computer Centre, I would like details about the ${course.title} course.`);

  const factChips = [
    { Icon: Clock, label: 'Duration', value: course.duration },
    { Icon: Layers, label: 'Category', value: category?.name || course.categorySlug },
    { Icon: Monitor, label: 'Mode', value: 'Offline · 1:1 PC' },
    { Icon: Award, label: 'Certificate', value: 'Govt Recognised' },
  ];

  return (
    <div className="bg-background pt-8 sm:pt-12">
      {/* Light hero band */}
      <section className="bg-gradient-to-b from-[#F0F7FF] to-white py-6 border-b border-border">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* Breadcrumb */}
          <nav className="flex flex-wrap items-center gap-2 text-[13px] font-medium text-muted-foreground">
            <Link to="/" className="hover:text-primary transition-colors">Home</Link>
            <span>/</span>
            <Link to="/courses" className="hover:text-primary transition-colors">Courses</Link>
            <span>/</span>
            <Link to={`/courses?category=${course.categorySlug}`} className="hover:text-primary transition-colors text-foreground font-semibold">
              {category?.name || course.categorySlug}
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
              <span className="eyebrow-chip">{category?.name || course.categorySlug}</span>
              {course.featured && (
                <span className="bg-accent-soft text-primary text-[11px] font-semibold px-3 py-1 rounded-full uppercase tracking-wide">Featured</span>
              )}
            </div>

            {/* Title */}
            <h1 className="reveal-heading font-bold text-foreground leading-tight" style={{ fontSize: 'clamp(2rem, 4.5vw, 3rem)', letterSpacing: '-0.01em' }}>
              {course.title}
            </h1>

            {/* Star rating */}
            <div className="reveal-body flex items-center gap-2">
              <div className="flex items-center gap-0.5">
                {[1,2,3,4,5].map((i) => <Star key={i} className="w-4 h-4 fill-[#F5A623] text-[#F5A623]" />)}
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
                    <span className="text-[10px] text-primary font-semibold uppercase tracking-wide block leading-none">{label}</span>
                    <span className="text-[13px] font-medium">{value}</span>
                  </div>
                </div>
              ))}
            </div>

            {/* Thumbnail */}
            <div className="reveal-item rounded-[20px] overflow-hidden border border-border group">
              <CourseThumbnail slug={course.slug} title={course.title} categoryName={category?.name || course.categorySlug} aspectRatio="aspect-[16/9]" priority={true} />
            </div>
          </div>

          {/* Right: Sticky form */}
          <div className="reveal-item lg:sticky lg:top-24 w-full">
            <CourseEnquiryForm courseTitle={course.title} />
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
              <p className="reveal-body text-[15px] sm:text-base leading-relaxed text-muted-foreground">{course.description}</p>
              <div className="reveal-item p-5 border border-border rounded-xl bg-white">
                <span className="eyebrow-chip mb-2 inline-block">Learning Environment</span>
                <p className="text-[14px] text-muted-foreground leading-relaxed">
                  Every student is assigned an individual high-speed desktop terminal with uninterrupted practice time and bilingual faculty guidance in Marathi, Hindi, and English.
                </p>
              </div>
            </div>

            {/* Right: Syllabus */}
            <div className="lg:col-span-7 space-y-5">
              <div className="reveal-eyebrow flex items-center justify-between">
                <span className="eyebrow-chip inline-block">Curriculum</span>
                <span className="text-[12px] text-muted-foreground font-medium uppercase tracking-wider">{course.syllabus.length} Modules</span>
              </div>
              <h2 className="reveal-heading font-bold text-foreground" style={{ fontSize: 'clamp(1.5rem, 3vw, 2rem)' }}>
                Complete <span className="text-primary">Syllabus</span>
              </h2>
              <div ref={syllabusRef} className="space-y-2">
                {course.syllabus.map((item, idx) => (
                  <div key={idx} className="flex items-start gap-4 bg-white rounded-xl p-4 border border-border hover:border-accent-soft hover:shadow-sm transition-all duration-200">
                    <div className="w-8 h-8 rounded-full bg-accent-soft flex items-center justify-center shrink-0 mt-0.5">
                      <span className="text-primary font-bold text-[13px]">{String(idx + 1).padStart(2, '0')}</span>
                    </div>
                    <span className="text-[15px] font-medium text-foreground leading-relaxed">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Band — light primary */}
      <section className="bg-primary py-16 lg:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl space-y-5">
            <span className="inline-block bg-white/20 text-white text-[11px] font-semibold px-4 py-1.5 rounded-full uppercase tracking-wider">Admissions & Counselling</span>
            <h2 className="font-bold text-white" style={{ fontSize: 'clamp(1.8rem, 3.5vw, 2.6rem)', lineHeight: 1.2 }}>
              Ready to master {course.title}?
            </h2>
            <p className="text-white/80 text-base sm:text-lg leading-relaxed max-w-2xl">
              Book a 1-day free practical trial at our Mulund West centre. Experience 1-on-1 terminal mentoring with zero obligation.
            </p>
            <div className="pt-2 flex flex-wrap items-center gap-4">
              <button onClick={() => onOpenModal(course.title)}
                className="rounded-full bg-white px-8 py-3.5 text-[14px] font-semibold text-primary hover:bg-accent-soft btn-swiss cursor-pointer flex items-center gap-2 btn-hover">
                <CalendarCheck className="w-4 h-4" />
                <span>Book Free Trial</span>
              </button>
              <a href={`https://wa.me/919821115699?text=${whatsappMessage}`} target="_blank" rel="noopener noreferrer"
                className="rounded-full border-2 border-white/40 px-8 py-3.5 text-[14px] font-semibold text-white hover:bg-white hover:text-primary btn-swiss flex items-center gap-2 btn-hover">
                <MessageSquare className="w-4 h-4" />
                <span>WhatsApp Enquiry</span>
              </a>
            </div>
            <div className="pt-4 border-t border-white/20 flex flex-wrap items-center gap-5 text-[13px] text-white/70">
              <span className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-white" />
                <a href="tel:+919821115699" className="text-white hover:text-white/80 underline underline-offset-2">+91 98211 15699</a>
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
            <Link to={`/courses?category=${course.categorySlug}`}
              className="reveal-body text-[13px] font-semibold text-primary hover:text-accent underline underline-offset-4">
              View all in {category?.name || course.categorySlug}
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {relatedCourses.map((rel) => (
              <div key={rel.slug} className="reveal-item">
                <CourseCard course={rel} categoryName={getCategoryName(rel.categorySlug)} />
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
