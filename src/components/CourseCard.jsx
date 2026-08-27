import { Link } from 'react-router-dom';
import { ArrowRight, Star } from 'lucide-react';
import CourseThumbnail from './CourseThumbnail';

export default function CourseCard({
  course,
  categoryName = '',
  showRating = true,
  reviewCount = '3',
}) {
  return (
    <Link
      to={`/courses/${course.slug}`}
      className="group flex flex-col bg-white rounded-2xl border border-[#F1F5F9] overflow-hidden cursor-pointer
        shadow-[0_4px_20px_rgba(0,0,0,0.03)] hover:shadow-[0_12px_32px_rgba(11,106,168,0.12)]
        hover:-translate-y-1 transition-all duration-300 h-full"
    >
      {/* Top: 16:10 Thumbnail with rounded top corners only */}
      <div className="relative w-full h-[220px] sm:h-[240px] overflow-hidden bg-slate-50">
        <CourseThumbnail
          slug={course.slug}
          title={course.title}
          categoryName={categoryName}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
      </div>

      {/* Card Body with ~24px padding */}
      <div className="p-6 flex-grow flex flex-col justify-between">
        <div>
          {/* Optional Star Rating Row for Popular Variant */}
          {showRating && (
            <div className="flex items-center justify-between mb-3.5">
              <div className="flex items-center gap-1.5">
                <div className="flex items-center gap-0.5">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <Star key={i} className="w-4 h-4 fill-[#FF9C08] text-[#FF9C08]" />
                  ))}
                </div>
                <span className="text-[13px] text-[#64748B] font-medium">
                  ({reviewCount} Reviews)
                </span>
              </div>
            </div>
          )}

          {/* 2-line clamped title */}
          <h3 className="font-semibold text-[20px] sm:text-[22px] text-[#0F172A] leading-[1.3] line-clamp-2 mb-3 group-hover:text-[#0B6AA8] transition-colors">
            {course.title}
          </h3>

          {/* 2-line clamped grey description */}
          <p className="text-[15px] sm:text-[16px] text-[#64748B] leading-[1.6] line-clamp-2 mb-4">
            {course.highlight || course.description}
          </p>

          {/* Tinted badge chip */}
          <div className="mb-4">
            <span className="inline-block bg-[#E4F4FB] text-[#0B6AA8] text-[13px] sm:text-[14px] font-medium px-4 py-1.5 rounded-lg">
              28+ Years Training Experience
            </span>
          </div>
        </div>

        {/* Hairline divider & bottom row */}
        <div className="pt-4 border-t border-[#F1F5F9] flex items-center justify-between mt-auto">
          <span className="text-[15px] sm:text-[16px] font-extrabold text-[#0F172A] flex items-center gap-1.5 group-hover:text-[#0B6AA8] transition-colors">
            Learn More
            <ArrowRight className="w-4 h-4 stroke-[2.5] group-hover:translate-x-1 transition-transform" />
          </span>
          <span className="text-[14px] font-extrabold text-[#0F172A]">
            {course.duration}
          </span>
        </div>
      </div>
    </Link>
  );
}
