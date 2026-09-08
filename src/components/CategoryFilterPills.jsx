import React from 'react';
import { categories } from '../data/courses';

/**
 * CategoryFilterPills
 * Shared category pills component used by Our Courses, All Courses, and Online Courses.
 *
 * Mobile (< md):
 * - flex flex-wrap justify-center gap-2
 * - Compact pill size: text-[11px] px-3 py-1.5
 * - Full visibility across ~2 lines without horizontal scroll cut-off
 *
 * Desktop (>= md):
 * - md:flex-nowrap (or md:flex-wrap when wrapDesktop is true)
 * - Standard desktop pill size: md:text-[13px] md:px-4 md:py-2
 */
export default function CategoryFilterPills({
  activeCategory = 'all',
  onSelectCategory,
  showCounts = false,
  courses = [],
  className = '',
  wrapDesktop = false,
}) {
  return (
    <div
      className={`w-full overflow-x-hidden ${
        wrapDesktop ? 'md:overflow-visible' : 'md:overflow-x-auto'
      } scrollbar-hide ${className}`}
    >
      <div
        className={`flex flex-wrap justify-center gap-2 ${
          wrapDesktop ? 'md:flex-wrap' : 'md:flex-nowrap md:min-w-max'
        } mx-auto py-1 px-1`}
      >
        {/* All Pill */}
        <button
          type="button"
          onClick={() => onSelectCategory('all')}
          className={`rounded-full text-[11px] px-3 py-1.5 md:text-[13px] md:px-4 md:py-2 font-semibold whitespace-nowrap border transition-all duration-200 cursor-pointer ${
            activeCategory === 'all'
              ? 'bg-[#0B6AA8] border-[#0B6AA8] text-white shadow-xs'
              : 'bg-white text-[#1E293B] border-slate-200/90 hover:border-[#0B6AA8] hover:text-[#0B6AA8]'
          }`}
        >
          All {showCounts && courses.length > 0 ? `(${courses.length})` : ''}
        </button>

        {/* Category Pills */}
        {categories.map((cat) => {
          const isActive = activeCategory === cat.slug;
          const count = showCounts
            ? courses.filter((c) => c.categorySlug === cat.slug).length
            : 0;

          return (
            <button
              key={cat.slug}
              type="button"
              onClick={() => onSelectCategory(cat.slug)}
              className={`rounded-full text-[11px] px-3 py-1.5 md:text-[13px] md:px-4 md:py-2 font-semibold whitespace-nowrap border transition-all duration-200 cursor-pointer ${
                isActive
                  ? 'bg-[#0B6AA8] border-[#0B6AA8] text-white shadow-xs'
                  : 'bg-white text-[#1E293B] border-slate-200/90 hover:border-[#0B6AA8] hover:text-[#0B6AA8]'
              }`}
            >
              {cat.name} {showCounts ? `(${count})` : ''}
            </button>
          );
        })}
      </div>
    </div>
  );
}
