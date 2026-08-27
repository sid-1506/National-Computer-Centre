import { useEffect } from 'react';
import HeroSlider from '../components/HeroSlider';
import CompactEnquiryForm from '../components/CompactEnquiryForm';
import OurCoursesSection from '../components/OurCoursesSection';
import WhyExtraSkills from '../components/WhyExtraSkills';
import MostPopularCourses from '../components/MostPopularCourses';
import FounderSection from '../components/FounderSection';
import Stats from '../components/Stats';
import StudentsFeedback from '../components/StudentsFeedback';

export default function HomePage({ onOpenModal }) {
  useEffect(() => {
    document.title = 'National Computer Centre | Computer Training Institute in Mulund West';
    let metaDesc = document.querySelector('meta[name="description"]');
    if (!metaDesc) {
      metaDesc = document.createElement('meta');
      metaDesc.name = 'description';
      document.head.appendChild(metaDesc);
    }
    metaDesc.content =
      'National Computer Centre is Mulund West’s leading government-recognised computer institute since 1998. Learn MS-CIT, Tally Prime with GST, Advanced Excel, DTP, Python, and Full Stack with 100% practical 1-on-1 terminal training.';
  }, []);

  return (
    <main className="w-full overflow-x-hidden bg-white">
      {/* 01. Hero Slider (Full-Bleed 3-Slide Carousel with Desktop Right Form) */}
      <HeroSlider onOpenModal={onOpenModal} />

      {/* Mobile / Tablet: Compact Enquiry Form stacked directly under Hero before Our Courses */}
      <div className="block lg:hidden bg-[#F7F9FC] py-8 px-4 sm:px-6 border-b border-slate-100">
        <div className="max-w-[440px] mx-auto">
          <CompactEnquiryForm className="max-w-none shadow-md" />
        </div>
      </div>

      {/* 02. "OUR COURSES" Block (Wide Title + Category Pills + Carousel) */}
      <OurCoursesSection />

      {/* 03. "WHY EXTRA SKILLS MATTER" Section */}
      <WhyExtraSkills />

      {/* 04. "MOST POPULAR COURSES" Section */}
      <MostPopularCourses />

      {/* 05. "FOUNDER & DIRECTOR" Section (Placed just above the stats / metrics section) */}
      <FounderSection />

      {/* 06. "VERIFIED METRICS" / Numbers That Speak Section */}
      <Stats />

      {/* 07. "STUDENTS FEEDBACK" Section (Review Carousel) */}
      <StudentsFeedback />
    </main>
  );
}
