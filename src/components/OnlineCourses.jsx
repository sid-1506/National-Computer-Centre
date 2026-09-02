import { useEffect, useRef } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { categories, courses } from '../data/courses';
import CourseCard from './CourseCard';
import { useSectionReveal } from '../hooks/useMotionReveal';

export default function OnlineCourses() {
  const [searchParams, setSearchParams] = useSearchParams();
  const activeCategory = searchParams.get('category') || 'all';
  const heroRef = useRef(null);
  const gridRef = useRef(null);

  useSectionReveal(heroRef);
  useSectionReveal(gridRef, [activeCategory]);

  const handleFilterChange = (slug) => {
    if (slug === 'all') {
      searchParams.delete('category');
      setSearchParams(searchParams);
    } else {
      setSearchParams({ category: slug });
    }
  };

  useEffect(() => {
    document.title = 'Online Courses | National Computer Centre';
    let metaDesc = document.querySelector('meta[name="description"]');
    if (!metaDesc) {
      metaDesc = document.createElement('meta');
      metaDesc.name = 'description';
      document.head.appendChild(metaDesc);
    }
    metaDesc.content =
      'Explore live online computer and IT courses at National Computer Centre. Learn MS-CIT, Tally Prime, Advance Excel, MERN Full Stack, Python, and AI-ML with dedicated 1-on-1 faculty support.';
  }, []);

  const filteredCourses =
    activeCategory === 'all'
      ? courses
      : courses.filter((c) => c.categorySlug === activeCategory);

  const getCategoryName = (slug) => {
    const cat = categories.find((c) => c.slug === slug);
    return cat ? cat.name : slug;
  };

  return (
    <div className="bg-background min-h-screen">
      {/* Hero Section */}
      <section
        ref={heroRef}
        className="relative pt-12 sm:pt-16 pb-10 bg-gradient-to-b from-[#F0F7FF] to-white"
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-[13px] text-muted-foreground mb-6 font-medium">
            <Link to="/" className="hover:text-primary transition-colors">
              Home
            </Link>
            <span>/</span>
            <span className="text-foreground font-semibold">Online Courses</span>
          </nav>

          {/* Eyebrow + heading */}
          <div className="text-center mb-8">
            <span className="reveal-eyebrow eyebrow-chip mb-3 inline-block">
              Online Training · {courses.length} Courses
            </span>
            <h1
              className="reveal-heading font-bold text-foreground"
              style={{
                fontSize: 'clamp(2.2rem, 5vw, 3.4rem)',
                letterSpacing: '-0.01em',
                lineHeight: 1.15,
              }}
            >
              Online <span className="text-primary">Courses</span>
            </h1>
            <p className="reveal-body mt-3 text-muted-foreground max-w-2xl mx-auto text-[16px] leading-relaxed">
              From essential office fundamentals to enterprise software engineering — discover industry-aligned online programs with live mentorship and flexible scheduling.
            </p>
          </div>

          {/* Category filter pills */}
          <div className="reveal-item overflow-x-auto scrollbar-hide">
            <div className="flex items-center gap-2 whitespace-nowrap pb-1 justify-center flex-wrap min-w-max mx-auto">
              <button
                onClick={() => handleFilterChange('all')}
                className={`px-4 py-2 rounded-full text-[13px] font-semibold transition-all duration-200 cursor-pointer ${
                  activeCategory === 'all'
                    ? 'bg-primary text-white shadow-sm'
                    : 'bg-white border border-border text-foreground hover:border-primary hover:text-primary'
                }`}
              >
                All ({courses.length})
              </button>
              {categories.map((cat) => {
                const count = courses.filter((c) => c.categorySlug === cat.slug).length;
                return (
                  <button
                    key={cat.slug}
                    onClick={() => handleFilterChange(cat.slug)}
                    className={`px-4 py-2 rounded-full text-[13px] font-semibold transition-all duration-200 cursor-pointer ${
                      activeCategory === cat.slug
                        ? 'bg-primary text-white shadow-sm'
                        : 'bg-white border border-border text-foreground hover:border-primary hover:text-primary'
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

      {/* Course Grid */}
      <section ref={gridRef} className="py-12 lg:py-16 bg-background">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div
            key={activeCategory}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {filteredCourses.map((course) => (
              <div key={course.slug} className="reveal-item">
                <CourseCard
                  course={course}
                  categoryName={getCategoryName(course.categorySlug)}
                  isOnline={true}
                />
              </div>
            ))}
          </div>
          {filteredCourses.length === 0 && (
            <div className="text-center py-16 text-muted-foreground">
              No courses found in this category.
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
