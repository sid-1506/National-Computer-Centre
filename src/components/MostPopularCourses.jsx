import { useRef, useState, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { courses, categories } from '../data/courses';
import CourseCard from './CourseCard';
import { useSectionReveal } from '../hooks/useMotionReveal';

export default function MostPopularCourses() {
  const featuredCourses = courses.filter((c) => c.featured);
  const sectionRef = useRef(null);
  const carouselRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  useSectionReveal(sectionRef);

  const getCategoryName = (slug) => {
    const cat = categories.find((c) => c.slug === slug);
    return cat ? cat.name : slug;
  };

  const scrollToCard = useCallback((idx) => {
    const carousel = carouselRef.current;
    if (!carousel) return;
    const cards = carousel.querySelectorAll('.popular-slide-item');
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
    const nextIdx = Math.min(featuredCourses.length - 1, currentIndex + 1);
    scrollToCard(nextIdx);
  };

  const handleScroll = () => {
    const carousel = carouselRef.current;
    if (!carousel) return;
    const cards = carousel.querySelectorAll('.popular-slide-item');
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
    <section ref={sectionRef} className="bg-white py-16 sm:py-20 lg:py-24 border-b border-slate-100 overflow-hidden">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-12">
        
        {/* Header Block */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-10 sm:mb-12">
          <div>
            {/* Tinted Pill Eyebrow */}
            <span className="reveal-eyebrow inline-block bg-[#E4F4FB] text-[#0B6AA8] text-[13px] sm:text-[14px] font-semibold uppercase tracking-wider px-5 py-2 rounded-full mb-3">
              TOP POPULAR COURSE
            </span>

            {/* Two-tone Heading */}
            <h2
              className="reveal-heading font-bold text-[#0F172A] leading-[1.2] tracking-tight"
              style={{ fontSize: 'clamp(2rem, 4vw, 3.2rem)' }}
            >
              Most Popular <span className="text-[#0B6AA8]">Courses</span>
            </h2>
          </div>

          {/* View All Button */}
          <Link
            to="/courses"
            className="reveal-body inline-flex items-center justify-center bg-[#E4F4FB] text-[#0B6AA8] hover:bg-[#0B6AA8] hover:text-white px-7 h-[52px] rounded-lg text-[15px] font-semibold tracking-wide transition-all duration-300 self-start sm:self-auto shrink-0 shadow-sm btn-hover"
          >
            View All
          </Link>
        </div>

        {/* Featured Courses Carousel */}
        <div
          ref={carouselRef}
          onScroll={handleScroll}
          className="flex gap-6 overflow-x-auto snap-x snap-mandatory scrollbar-hide py-4 px-1"
        >
          {featuredCourses.map((course) => (
            <div
              key={course.slug}
              className="reveal-item popular-slide-item flex-none w-[min(340px,88vw)] sm:w-[calc(50%-12px)] lg:w-[calc(33.333%-16px)] snap-start"
            >
              <CourseCard
                course={course}
                categoryName={getCategoryName(course.categorySlug)}
                showRating={true}
                reviewCount="275"
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
            disabled={currentIndex >= featuredCourses.length - 1}
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
