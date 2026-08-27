import { useState, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import { categories, courses } from '../data/courses';
import CourseIcon from './CourseIcon';
import CourseThumbnail from './CourseThumbnail';
import heroBgImg from '../assets/classroom-logo.png';

export default function AllCourses() {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialCategory = searchParams.get('category') || 'all';
  const [activeCategory, setActiveCategory] = useState(initialCategory);

  useEffect(() => {
    const cat = searchParams.get('category') || 'all';
    setActiveCategory(cat);
  }, [searchParams]);

  const handleFilterChange = (slug) => {
    setActiveCategory(slug);
    if (slug === 'all') {
      searchParams.delete('category');
      setSearchParams(searchParams);
    } else {
      setSearchParams({ category: slug });
    }
  };

  useEffect(() => {
    document.title = 'Complete Course Catalogue | National Computer Centre Mulund West';
    let metaDesc = document.querySelector('meta[name="description"]');
    if (!metaDesc) {
      metaDesc = document.createElement('meta');
      metaDesc.name = 'description';
      document.head.appendChild(metaDesc);
    }
    metaDesc.content = 'Explore all 56 government-recognised and professional IT courses at National Computer Centre Mulund West. MS-CIT, Tally Prime, Advance Excel, MERN Full Stack, Python, AI-ML & more.';
  }, []);

  const filteredCourses = activeCategory === 'all'
    ? courses
    : courses.filter((c) => c.categorySlug === activeCategory);

  const getCategoryName = (slug) => {
    const cat = categories.find((c) => c.slug === slug);
    return cat ? cat.name : slug;
  };

  return (
    <div className="bg-[#EFEDE8] text-[#111111] min-h-screen">
      {/* 01. Hero / Landing Section with Blurred Full-Bleed Classroom Background */}
      <section className="relative pt-32 sm:pt-36 pb-8 bg-[#0B1623] text-[#F8F9FA] border-b border-white/15 overflow-hidden">
        {/* Full-bleed blurred background image layer */}
        <div className="absolute inset-0 pointer-events-none select-none z-0 overflow-hidden">
          {/* CSS fallback background color */}
          <div className="absolute inset-0 bg-[#0B1623]" />

          {/* Blurred classroom background image */}
          <img
            src={heroBgImg}
            alt="National Computer Centre Classroom Lab"
            width={1920}
            height={1080}
            loading="lazy"
            decoding="async"
            className="w-full h-full object-cover object-center filter blur-[10px] sm:blur-[12px] scale-105 transform-gpu"
          />

          {/* Dark overlay / scrim for crisp text readability */}
          <div className="absolute inset-0 bg-[#0B1623]/75 sm:bg-[#0B1623]/65" />
          {/* Subtle vertical vignette */}
          <div className="absolute inset-0 bg-gradient-to-b from-[#0B1623]/80 via-transparent to-[#0B1623]/95" />
        </div>

        {/* Foreground Content */}
        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* Breadcrumb */}
          <nav className="text-[11px] font-mono tracking-widest uppercase text-[#F8F9FA]/60 mb-8 flex items-center gap-2">
            <Link to="/" className="hover:text-white transition-colors">HOME</Link>
            <span>/</span>
            <span className="text-[#F8F9FA] font-semibold">COURSES</span>
          </nav>

          {/* Section Header */}
          <div className="flex items-center justify-between pb-6 border-b border-white/15">
            <span className="section-label text-[#F8F9FA]">01 — FULL CATALOGUE</span>
            <span className="section-label text-[#F8F9FA]/60">56 COURSES · 9 CATEGORIES</span>
          </div>

          {/* Page Heading */}
          <div className="pt-8 mb-10">
            <h1 className="font-display text-4xl sm:text-6xl lg:text-7xl uppercase tracking-[-0.02em] text-[#F8F9FA] leading-[1.02] md:leading-[0.98] pb-[0.08em]">
              EXPLORE ALL 56 CERTIFIED TRACKS
            </h1>
            <p className="mt-3 text-base sm:text-lg text-[#F8F9FA]/80 max-w-3xl leading-relaxed">
              From essential office fundamentals to enterprise software engineering and generative AI, discover industry-aligned programs taught 1-on-1 on dedicated computer terminals.
            </p>
          </div>

          {/* Horizontal Category Filter Row */}
          <div className="pt-2 overflow-x-auto scrollbar-hide no-scrollbar">
            <div className="flex items-center gap-6 sm:gap-8 text-xs sm:text-[13px] font-semibold tracking-wider uppercase whitespace-nowrap min-w-max pb-2">
              <button
                onClick={() => handleFilterChange('all')}
                className={`pb-2 transition-all duration-200 cursor-pointer ${
                  activeCategory === 'all'
                    ? 'text-brand-cyan border-b-2 border-brand-cyan opacity-100 font-bold'
                    : 'text-[#F8F9FA]/60 opacity-60 hover:opacity-100 hover:text-white'
                }`}
              >
                ALL ({courses.length})
              </button>
              {categories.map((cat) => {
                const count = courses.filter((c) => c.categorySlug === cat.slug).length;
                return (
                  <button
                    key={cat.slug}
                    onClick={() => handleFilterChange(cat.slug)}
                    className={`pb-2 transition-all duration-200 cursor-pointer ${
                      activeCategory === cat.slug
                        ? 'text-brand-cyan border-b-2 border-brand-cyan opacity-100 font-bold'
                        : 'text-[#F8F9FA]/60 opacity-60 hover:opacity-100 hover:text-white'
                    }`}
                  >
                    {cat.name} ({count})
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* 02. Course Grid Section */}
      <div className="py-12 lg:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div
            key={activeCategory}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 transition-all duration-200 animate-[fadeIn_200ms_ease-out]"
          >
            {filteredCourses.map((course, idx) => (
              <Link
                key={course.slug}
                to={`/courses/${course.slug}`}
                className="border border-[#111111]/15 bg-[#EFEDE8] rounded-2xl flex flex-col justify-between hover:border-[#111111]/60 hover:-translate-y-1 transition-all duration-200 group relative cursor-pointer overflow-hidden"
              >
                {/* Top Course Thumbnail Image with NCC logo overlay and category */}
                <CourseThumbnail
                  slug={course.slug}
                  title={course.title}
                  categoryName={getCategoryName(course.categorySlug)}
                />

                <div className="p-6 sm:p-7 flex flex-col justify-between flex-grow">
                  <div>
                    {/* Card Header: Lucide Icon + Index / Featured */}
                    <div className="flex items-start justify-between pb-5 border-b border-[#111111]/15">
                      <CourseIcon
                        name={course.icon}
                        className="w-6 h-6 text-primary stroke-[1.25]"
                        strokeWidth={1.25}
                      />
                      <div className="flex items-center gap-3">
                        {course.featured && (
                          <span className="text-[10px] font-mono tracking-widest uppercase text-primary bg-brand-cyan-soft px-1.5 py-0.5 rounded font-bold">
                            FEATURED
                          </span>
                        )}
                        <span className="font-mono text-xs text-[#111111]/40 tracking-widest">
                          {String(idx + 1).padStart(2, '0')}
                        </span>
                      </div>
                    </div>

                    {/* Course Title in Anton */}
                    <h2 className="font-display text-2xl sm:text-3xl text-[#111111] uppercase tracking-[-0.02em] mt-5 leading-[1.02] md:leading-[0.98] pb-[0.04em] group-hover:text-primary transition-colors">
                      {course.title}
                    </h2>

                    {/* One-line Highlight in Muted Body */}
                    <p className="mt-2.5 text-xs sm:text-sm text-[#111111]/70 leading-relaxed min-h-[40px] line-clamp-2">
                      {course.highlight}
                    </p>
                  </div>

                  {/* Card Footer: DURATION · CATEGORY & VIEW COURSE ↗ */}
                  <div className="pt-5 mt-5 border-t border-[#111111]/15 flex items-center justify-between gap-2">
                    <div className="text-[11px] uppercase tracking-wider text-[#111111]/50 font-medium truncate">
                      <span>{course.duration}</span> · <span>{getCategoryName(course.categorySlug)}</span>
                    </div>

                    <div className="text-xs font-bold tracking-wider text-[#111111] uppercase underline underline-offset-4 decoration-brand-cyan decoration-2 group-hover:text-primary transition-colors flex items-center gap-1 shrink-0">
                      <span>VIEW COURSE</span>
                      <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
