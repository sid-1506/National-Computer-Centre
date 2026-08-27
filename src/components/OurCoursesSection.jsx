import { useState, useRef, useCallback } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { categories, courses } from '../data/courses';
import CourseCard from './CourseCard';
import { useSectionReveal } from '../hooks/useMotionReveal';

export default function OurCoursesSection() {
  const [activeCategory, setActiveCategory] = useState('all');
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
    <section ref={sectionRef} className="bg-white py-16 sm:py-20 lg:py-24 overflow-hidden border-b border-slate-100">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-12">
        
        {/* Giant Centred Wide-Tracked Grey Two-Line Title */}
        <div className="reveal-heading text-center mb-4 sm:mb-6 select-none">
          <h2
            className="font-bold text-[#6C757D] uppercase tracking-[6px] sm:tracking-[8px] leading-tight"
            style={{ fontSize: 'clamp(2.5rem, 8vw, 5.5rem)' }}
          >
            OUR<br />COURSES
          </h2>
        </div>

        {/* Sub-title */}
        <div className="reveal-body text-center mb-8 sm:mb-12">
          <p className="text-[26px] sm:text-[34px] font-bold text-[#0F172A] tracking-tight">
            For Working Professionals
          </p>
        </div>

        {/* Horizontal Scrollable Pill Filter Row */}
        <div className="reveal-item relative mb-12">
          <div className="overflow-x-auto scrollbar-hide flex items-center justify-start sm:justify-center gap-3 px-2 py-1 scroll-smooth snap-x">
            {/* All Pill */}
            <button
              onClick={() => handleCategorySelect('all')}
              className={`rounded-full px-7 py-3 text-[15px] font-semibold whitespace-nowrap transition-all duration-300 cursor-pointer snap-start shrink-0 btn-hover ${
                activeCategory === 'all'
                  ? 'bg-[#0B6AA8] text-white shadow-md'
                  : 'bg-white text-[#0F172A] border border-slate-200 hover:border-[#0B6AA8] hover:text-[#0B6AA8]'
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
                  className={`rounded-full px-6 py-3 text-[15px] font-semibold whitespace-nowrap transition-all duration-300 cursor-pointer snap-start shrink-0 btn-hover ${
                    isActive
                      ? 'bg-[#0B6AA8] text-white shadow-md'
                      : 'bg-white text-[#0F172A] border border-slate-200 hover:border-[#0B6AA8] hover:text-[#0B6AA8]'
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
