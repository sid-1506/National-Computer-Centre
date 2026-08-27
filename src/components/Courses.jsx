import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import { categories, courses } from '../data/courses';
import CourseIcon from './CourseIcon';
import CourseThumbnail from './CourseThumbnail';

export default function Courses() {
  const [activeCategory, setActiveCategory] = useState('all');

  const filteredCourses = activeCategory === 'all'
    ? courses
    : courses.filter((c) => c.categorySlug === activeCategory);

  const getCategoryName = (slug) => {
    const cat = categories.find((c) => c.slug === slug);
    return cat ? cat.name : slug;
  };

  return (
    <section id="courses" className="py-20 lg:py-32 bg-[#111111] text-[#EFEDE8] border-b border-white/15">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex items-center justify-between pb-6 border-b border-white/15 mb-12">
          <span className="section-label text-white/50">CURRICULUM</span>
          <span className="section-label text-white/50">56 COURSES · 9 CATEGORIES</span>
        </div>

        {/* Section Title */}
        <div className="pb-12">
          <h2 className="font-display text-4xl sm:text-6xl lg:text-7xl uppercase tracking-[-0.02em] leading-[1.02] md:leading-[0.98] pb-[0.08em] text-white">
            COMPREHENSIVE IT & COMPUTING CATALOGUE
          </h2>
          <p className="mt-3 text-base sm:text-lg text-white/70 max-w-3xl leading-relaxed font-normal">
            From basic digital literacy to advanced full-stack programming, enterprise accounting, and multimedia design.
          </p>
        </div>

        {/* Horizontal Category Filters */}
        <div className="pb-6 border-b border-white/15 overflow-x-auto scrollbar-hide no-scrollbar">
          <div className="flex items-center gap-6 sm:gap-8 text-xs sm:text-[13px] font-semibold tracking-wider uppercase whitespace-nowrap min-w-max">
            <button
              onClick={() => setActiveCategory('all')}
              className={`pb-2 transition-all duration-200 cursor-pointer ${
                activeCategory === 'all'
                  ? 'text-white border-b-2 border-white opacity-100'
                  : 'text-white/40 opacity-40 hover:opacity-80'
              }`}
            >
              ALL ({courses.length})
            </button>
            {categories.map((cat) => {
              const count = courses.filter((c) => c.categorySlug === cat.slug).length;
              return (
                <button
                  key={cat.slug}
                  onClick={() => setActiveCategory(cat.slug)}
                  className={`pb-2 transition-all duration-200 cursor-pointer ${
                    activeCategory === cat.slug
                      ? 'text-white border-b-2 border-white opacity-100'
                      : 'text-white/40 opacity-40 hover:opacity-80'
                  }`}
                >
                  {cat.name} ({count})
                </button>
              );
            })}
          </div>
        </div>

        {/* Course Cards Grid */}
        <div
          key={activeCategory}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pt-10 transition-all duration-200 animate-[fadeIn_200ms_ease-out]"
        >
          {filteredCourses.map((course, idx) => (
            <Link
              key={course.slug}
              to={`/courses/${course.slug}`}
              className="border border-white/15 bg-[#161616] rounded-2xl flex flex-col justify-between hover:border-white/50 hover:-translate-y-1 transition-all duration-200 group relative cursor-pointer overflow-hidden"
            >
              {/* Card Top Thumbnail Image */}
              <CourseThumbnail
                slug={course.slug}
                title={course.title}
                categoryName={getCategoryName(course.categorySlug)}
              />

              <div className="p-6 sm:p-7 flex flex-col justify-between flex-grow">
                <div>
                  {/* Card Top Row: Lucide Icon + Index / Featured */}
                  <div className="flex items-start justify-between pb-5 border-b border-white/10">
                    <CourseIcon
                      name={course.icon}
                      className="w-6 h-6 text-brand-cyan stroke-[1.25]"
                      strokeWidth={1.25}
                    />
                    <div className="flex items-center gap-3">
                      {course.featured && (
                        <span className="text-[10px] font-mono tracking-widest uppercase text-brand-cyan font-bold">
                          FEATURED
                        </span>
                      )}
                      <span className="font-mono text-xs text-white/40 tracking-widest">
                        {String(idx + 1).padStart(2, '0')}
                      </span>
                    </div>
                  </div>

                  {/* Course Title in Anton */}
                  <h3 className="font-display text-2xl sm:text-3xl text-white uppercase tracking-[-0.02em] mt-5 leading-[1.02] md:leading-[0.98] pb-[0.04em] group-hover:text-brand-cyan transition-colors">
                    {course.title}
                  </h3>

                  {/* One-line Highlight in Muted Body */}
                  <p className="mt-2.5 text-xs sm:text-sm text-white/70 leading-relaxed min-h-[40px] line-clamp-2">
                    {course.highlight}
                  </p>
                </div>

                {/* Card Footer: DURATION · CATEGORY & VIEW COURSE ↗ */}
                <div className="pt-5 mt-5 border-t border-white/10 flex items-center justify-between gap-2">
                  <div className="text-[11px] uppercase tracking-wider text-white/50 font-medium truncate">
                    <span>{course.duration}</span> · <span>{getCategoryName(course.categorySlug)}</span>
                  </div>

                  <div className="text-xs font-bold tracking-wider text-white uppercase underline underline-offset-4 decoration-brand-cyan decoration-2 group-hover:text-brand-cyan transition-colors flex items-center gap-1 shrink-0">
                    <span>VIEW COURSE</span>
                    <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
