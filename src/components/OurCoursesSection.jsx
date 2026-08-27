import { useState, useRef, useCallback } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { categories, courses } from '../data/courses';
import CourseCard from './CourseCard';
import { useSectionReveal } from '../hooks/useMotionReveal';

export default function OurCoursesSection() {
  const [activeCategory, setActiveCategory] = useState('all');
  const [audience, setAudience] = useState('working-professionals');
  const [currentIndex, setCurrentIndex] = useState(0);
  const sectionRef = useRef(null);
  const carouselRef = useRef(null);

  useSectionReveal(sectionRef);

  const filteredCourses = activeCategory === 'all'
    ? courses
    : courses.filter((c) => c.categorySlug === activeCategory);

  const getCategoryName = (slug) => {
    const cat = categories.find((c) => c.slug === slug);
    return cat ? cat.name : slug;
  };

  const handleCategorySelect = (slug) => {
    setActiveCategory(slug);
    setCurrentIndex(0);
    if (carouselRef.current) {
      carouselRef.current.scrollTo({ left: 0, behavior: 'smooth' });
    }
  };

  const scrollToCard = useCallback((idx) => {
    const carousel = carouselRef.current;
    if (!carousel) return;
    const cards = carousel.querySelectorAll('.course-slide-item');
    if (cards[idx]) {
      cards[idx].scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'start' });
    }
    setCurrentIndex(idx);
  }, []);

  const handlePrev = () => {
    const nextIdx = Math.max(0, currentIndex - 1);
    scrollToCard(nextIdx);
  };

  const handleNext = () => {
    const nextIdx = Math.min(filteredCourses.length - 1, currentIndex + 1);
    scrollToCard(nextIdx);
  };

  const handleScroll = () => {
    const carousel = carouselRef.current;
    if (!carousel) return;
    const cards = carousel.querySelectorAll('.course-slide-item');
    let closest = 0;
    let minDist = Infinity;
    cards.forEach((card, i) => {
      const dist = Math.abs(card.getBoundingClientRect().left - carousel.getBoundingClientRect().left);
      if (dist < minDist) {
        minDist = dist;
        closest = i;
      }
    });
    setCurrentIndex(closest);
  };

  return (
    <section ref={sectionRef} className="bg-white py-14 sm:py-18 lg:py-20 overflow-hidden border-b border-slate-100">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-12">
        
        {/* Giant Centred Wide-Tracked Grey Two-Line Title */}
        <div className="reveal-heading text-center mb-3 sm:mb-4 select-none">
          <h2
            className="font-bold text-[#6C757D] uppercase tracking-[6px] sm:tracking-[8px] leading-tight"
            style={{ fontSize: 'clamp(2.4rem, 7.5vw, 5.2rem)' }}
          >
            OUR<br />COURSES
          </h2>
        </div>

        {/* Compact Centered Audience Filter Pill Toggle: For Working Professionals / For Students */}
        <div className="reveal-body text-center mb-5 sm:mb-6">
          <div className="inline-flex items-center bg-[#F1F5F9] p-1 rounded-full border border-slate-200/80 shadow-2xs max-w-full overflow-x-auto scrollbar-hide">
            <button
              onClick={() => setAudience('working-professionals')}
              className={`px-4 sm:px-5 py-1.5 sm:py-2 rounded-full text-[13px] sm:text-[14px] font-semibold transition-all duration-200 cursor-pointer whitespace-nowrap ${
                audience === 'working-professionals'
                  ? 'bg-[#0B6AA8] text-white shadow-xs'
                  : 'text-[#475569] hover:text-[#0B6AA8]'
              }`}
            >
              For Working Professionals
            </button>
            <button
              onClick={() => setAudience('students')}
              className={`px-4 sm:px-5 py-1.5 sm:py-2 rounded-full text-[13px] sm:text-[14px] font-semibold transition-all duration-200 cursor-pointer whitespace-nowrap ${
                audience === 'students'
                  ? 'bg-[#0B6AA8] text-white shadow-xs'
                  : 'text-[#475569] hover:text-[#0B6AA8]'
              }`}
            >
              For Students
            </button>
          </div>
        </div>

        {/* Compact Centered Category Filter Pills Row (Max-w-5xl, smaller font, hairline border, no edge cut) */}
        <div className="reveal-item max-w-5xl mx-auto mb-8 sm:mb-10 px-2 sm:px-4">
          <div className="flex items-center justify-start md:justify-center flex-nowrap md:flex-wrap overflow-x-auto md:overflow-visible scrollbar-hide py-1 px-2 sm:px-3 gap-2 sm:gap-2.5 snap-x snap-mandatory scroll-smooth w-full">
            {/* All Pill */}
            <button
              onClick={() => handleCategorySelect('all')}
              className={`rounded-full px-3.5 sm:px-4.5 py-1.5 sm:py-2 text-[13px] sm:text-[14px] font-medium whitespace-nowrap border transition-all duration-200 cursor-pointer snap-start shrink-0 btn-hover ${
                activeCategory === 'all'
                  ? 'bg-[#0B6AA8] border-[#0B6AA8] text-white shadow-xs'
                  : 'bg-white text-[#1E293B] border-slate-200/90 hover:border-[#0B6AA8] hover:text-[#0B6AA8]'
              }`}
            >
              All
            </button>

            {/* Category Pills */}
            {categories.map((cat) => {
              const isActive = activeCategory === cat.slug;
              return (
                <button
                  key={cat.slug}
                  onClick={() => handleCategorySelect(cat.slug)}
                  className={`rounded-full px-3.5 sm:px-4.5 py-1.5 sm:py-2 text-[13px] sm:text-[14px] font-medium whitespace-nowrap border transition-all duration-200 cursor-pointer snap-start shrink-0 btn-hover ${
                    isActive
                      ? 'bg-[#0B6AA8] border-[#0B6AA8] text-white shadow-xs'
                      : 'bg-white text-[#1E293B] border-slate-200/90 hover:border-[#0B6AA8] hover:text-[#0B6AA8]'
                  }`}
                >
                  {cat.name}
                </button>
              );
            })}
          </div>
        </div>

        {/* Course Carousel */}
        <div
          ref={carouselRef}
          onScroll={handleScroll}
          className="flex gap-6 overflow-x-auto snap-x snap-mandatory scrollbar-hide py-4 px-1"
        >
          {filteredCourses.map((course) => (
            <div
              key={course.slug}
              className="reveal-item course-slide-item flex-none w-[min(340px,88vw)] sm:w-[calc(50%-12px)] lg:w-[calc(33.333%-16px)] snap-start"
            >
              <CourseCard
                course={course}
                categoryName={getCategoryName(course.categorySlug)}
                showRating={false}
              />
            </div>
          ))}
        </div>

        {/* Centred Prev/Next Circular Buttons */}
        <div className="reveal-item flex items-center justify-center gap-5 mt-10">
          <button
            onClick={handlePrev}
            disabled={currentIndex === 0}
            aria-label="Previous courses"
            className="carousel-btn"
          >
            <ChevronLeft className="w-6 h-6 text-slate-800" />
          </button>
          <button
            onClick={handleNext}
            disabled={currentIndex >= filteredCourses.length - 1}
            aria-label="Next courses"
            className="carousel-btn"
          >
            <ChevronRight className="w-6 h-6 text-slate-800" />
          </button>
        </div>

      </div>
    </section>
  );
}
