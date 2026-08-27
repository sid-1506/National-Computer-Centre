import { useState, useEffect, useCallback } from 'react';
import classroomImg from '../assets/classroom-logo.png';
import mscitImg from '../assets/courses/certificate-course-in-ms-cit.jpg';
import devImg from '../assets/courses/full-stack-with-mern-stack-web-development.jpg';
import CompactEnquiryForm from './CompactEnquiryForm';

const SLIDES = [
  {
    id: 1,
    image: classroomImg,
    alt: 'Master In-Demand Computer Skills Build a High-Paying Career',
    headingLine1: 'Master In-Demand Computer Skills',
    headingLine2: 'Build a High-Paying Career',
    subline: 'Explore career-defining courses across various domains',
  },
  {
    id: 2,
    image: mscitImg,
    alt: 'Government Recognised Training In Mulund West Since 1998',
    headingLine1: 'Government Recognised Training',
    headingLine2: 'In Mulund West Since 1998',
    subline: 'MS-CIT, Tally with GST, Advanced Excel, DTP, Python and more',
  },
  {
    id: 3,
    image: devImg,
    alt: 'One Day Free Trial Class Learn Before You Enrol',
    headingLine1: 'One Day Free Trial Class',
    headingLine2: 'Learn Before You Enrol',
    subline: 'Offline batches on real machines, in Marathi, Hindi or English',
  },
];

export default function HeroSlider({ onOpenModal }) {
  const [currentSlide, setCurrentSlide] = useState(0);

  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev + 1) % SLIDES.length);
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      nextSlide();
    }, 5500);
    return () => clearInterval(timer);
  }, [nextSlide]);

  return (
    <section className="relative w-full min-h-[480px] sm:min-h-[520px] lg:h-[620px] overflow-hidden bg-[#030A15]">
      {/* Background Slides */}
      {SLIDES.map((slide, idx) => {
        const isActive = idx === currentSlide;
        return (
          <div
            key={slide.id}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
              isActive ? 'opacity-100 z-10' : 'opacity-0 z-0 pointer-events-none'
            }`}
          >
            {/* Background Image */}
            <img
              src={slide.image}
              alt={slide.alt}
              className="absolute inset-0 w-full h-full object-cover object-center"
              loading={idx === 0 ? 'eager' : 'lazy'}
              decoding={idx === 0 ? 'sync' : 'async'}
              fetchPriority={idx === 0 ? 'high' : 'low'}
            />

            {/* Dark Left-to-Right Gradient Scrim */}
            <div
              className="absolute inset-0"
              style={{
                background:
                  'linear-gradient(90deg, rgba(3,10,21,0.92) 0%, rgba(3,10,21,0.72) 55%, rgba(3,10,21,0.3) 85%, transparent 100%)',
              }}
            />
          </div>
        );
      })}

      {/* Main Hero Content: Left Column Copy + Desktop Right Column Compact Enquiry Form */}
      <div className="relative z-20 h-full max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-12 py-12 lg:py-0 flex items-center">
        <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Left Column: Headlines & CTA */}
          <div className="lg:col-span-7 xl:col-span-8 text-left max-w-[680px]">
            <h1
              className="text-white font-bold tracking-tight mb-4 sm:mb-5 leading-[1.15]"
              style={{ fontSize: 'clamp(1.9rem, 4.2vw, 3.4rem)' }}
            >
              <span className="block">{SLIDES[currentSlide].headingLine1}</span>
              <span className="block">{SLIDES[currentSlide].headingLine2}</span>
            </h1>

            <p className="text-white/90 text-[16px] sm:text-[18px] font-normal mb-6 sm:mb-8 leading-relaxed max-w-[540px]">
              {SLIDES[currentSlide].subline}
            </p>

            {onOpenModal && (
              <div className="flex items-center gap-4">
                <button
                  onClick={() => onOpenModal('MS-CIT')}
                  className="rounded-full bg-[#0B6AA8] hover:bg-[#095A90] text-white px-7 py-3 text-[14px] sm:text-[15px] font-semibold transition-all shadow-lg hover:shadow-cyan-500/20 cursor-pointer inline-flex items-center gap-2"
                >
                  Book Free Trial Class
                </button>
              </div>
            )}
          </div>

          {/* Desktop Right Column: Compact Enquiry Form Card (overlapping photo, vertically centered) */}
          <div className="hidden lg:flex lg:col-span-5 xl:col-span-4 justify-end">
            <CompactEnquiryForm />
          </div>

        </div>
      </div>

      {/* Slide Indicators (bottom left on desktop, bottom center on mobile) */}
      <div className="absolute bottom-6 left-4 sm:left-6 lg:left-12 flex items-center gap-2.5 z-30">
        {SLIDES.map((slide, idx) => (
          <button
            key={slide.id}
            onClick={() => setCurrentSlide(idx)}
            aria-label={`Go to slide ${idx + 1}`}
            className={`border-none p-0 cursor-pointer transition-all duration-400 ${
              idx === currentSlide
                ? 'w-8 h-2.5 rounded-full bg-[#0B6AA8]'
                : 'w-2.5 h-2.5 rounded-full bg-white/50 hover:bg-white/80'
            }`}
          />
        ))}
      </div>
    </section>
  );
}
