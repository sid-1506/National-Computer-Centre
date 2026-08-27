import { useRef, useState, useCallback } from 'react';
import { Star, ChevronLeft, ChevronRight } from 'lucide-react';

const REVIEWS = [
  {
    name: 'Rohit Kulkarni',
    role: 'Tally Prime & Advanced Excel Student',
    text: 'I joined the Certificate Course in Tally Prime and Advanced Excel at National Computer Centre to upgrade my accounting skills. The trainers explain concepts like GST entries, e-Way bills, and MIS pivot tables in a very simple and practical way. We also worked on live balance sheets, which helped me secure an accounts executive position in Mumbai.',
    stars: 5,
  },
  {
    name: 'Pratiksha Sawant',
    role: 'MS-CIT Certification Student',
    text: 'The 7:00 AM batch allowed me to complete MS-CIT and Office Automation while managing college. Every session was 100% practical on my own individual computer workstation. The teachers are extremely patient and guided me step by step through every practical drill.',
    stars: 5,
  },
  {
    name: 'Aakash Mehta',
    role: 'Python & Data Analytics Student',
    text: 'I transitioned into corporate business analytics after completing Python and Power BI at NCC Mulund. Having individual computer terminal access and direct teacher mentoring throughout the course was invaluable. Best institute in Mulund West for practical computing.',
    stars: 5,
  },
  {
    name: 'Sneha Deshmukh',
    role: 'Graphic Designing & DTP Student',
    text: 'The DTP and Graphic Designing course at National Computer Centre gave me a complete portfolio. I mastered CorelDRAW, Photoshop, and offset prepress layouts. I am now working confidently with design clients and digital printing presses.',
    stars: 5,
  },
  {
    name: 'Rohan Patil',
    role: 'English & Marathi Typing Student',
    text: 'Cleared my official Maharashtra government GCC-TBC typing examination in the very first attempt with 94% accuracy. The teachers patiently corrected my keyboard finger placement and provided daily speed test drills.',
    stars: 5,
  },
];

export default function StudentsFeedback() {
  const carouselRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  const scrollToReview = useCallback((idx) => {
    const carousel = carouselRef.current;
    if (!carousel) return;
    const cards = carousel.querySelectorAll('.review-slide-item');
    if (cards[idx]) {
      cards[idx].scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'start' });
    }
    setCurrentIndex(idx);
  }, []);

  const handlePrev = () => {
    const nextIdx = Math.max(0, currentIndex - 1);
    scrollToReview(nextIdx);
  };

  const handleNext = () => {
    const nextIdx = Math.min(REVIEWS.length - 1, currentIndex + 1);
    scrollToReview(nextIdx);
  };

  const handleScroll = () => {
    const carousel = carouselRef.current;
    if (!carousel) return;
    const cards = carousel.querySelectorAll('.review-slide-item');
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
    <section id="testimonials" className="bg-[#F7F9FC] py-16 sm:py-20 lg:py-24 border-b border-slate-100 overflow-hidden">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-12">
        
        {/* Centered Heading with Eyebrow matching Screenshot 3 */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <span className="inline-block bg-[#E4F4FB] text-[#0B6AA8] text-[13px] sm:text-[14px] font-semibold uppercase tracking-wider px-5 py-2 rounded-full mb-3">
            EDUCATION FOR EVERYONE
          </span>

          <h2
            className="font-bold text-[#0F172A] leading-tight tracking-tight mt-2"
            style={{ fontSize: 'clamp(2.2rem, 4.5vw, 3.4rem)' }}
          >
            Students <span className="text-[#0B6AA8]">Feedback</span>
          </h2>
        </div>

        {/* Reviews Carousel */}
        <div
          ref={carouselRef}
          onScroll={handleScroll}
          className="flex gap-6 overflow-x-auto snap-x snap-mandatory scrollbar-hide py-4 px-1"
        >
          {REVIEWS.map((review, idx) => (
            <div
              key={idx}
              className="review-slide-item flex-none w-[min(350px,90vw)] sm:w-[calc(50%-12px)] lg:w-[calc(33.333%-16px)] snap-start"
            >
              <div className="bg-white rounded-[20px] p-7 sm:p-8 border border-slate-100 shadow-[0_4px_25px_rgba(0,0,0,0.04)] hover:shadow-[0_12px_32px_rgba(11,106,168,0.08)] transition-all duration-300 h-full flex flex-col justify-between">
                
                <div>
                  {/* Top Row: Circular Avatar + Name + Decorative Quote Glyph */}
                  <div className="flex items-start justify-between mb-6">
                    <div className="flex items-center gap-3.5">
                      {/* Avatar Circle with Initial in Blue */}
                      <div className="w-13 h-13 sm:w-14 sm:h-14 rounded-full bg-[#E4F4FB] flex items-center justify-center shrink-0">
                        <span className="text-[#0B6AA8] font-bold text-[22px] sm:text-[24px]">
                          {review.name[0]}
                        </span>
                      </div>
                      <div>
                        <h3 className="font-bold text-[17px] sm:text-[18px] text-[#0F172A] leading-tight">
                          {review.name}
                        </h3>
                        <p className="text-[12px] text-[#64748B] font-medium mt-0.5">
                          {review.role}
                        </p>
                      </div>
                    </div>

                    {/* Decorative quotation mark glyph top-right in soft tint */}
                    <div className="text-[#2DB3E3]/25 select-none font-serif text-[42px] sm:text-[48px] leading-none -mt-2">
                      “
                    </div>
                  </div>

                  {/* Review Text */}
                  <p className="text-[15px] sm:text-[16px] text-[#5B6472] leading-[1.7] mb-6">
                    {review.text}
                  </p>
                </div>

                {/* 5-Star Row in Amber */}
                <div className="pt-2 flex items-center gap-1">
                  {Array.from({ length: review.stars }).map((_, sIdx) => (
                    <Star key={sIdx} className="w-4 h-4 fill-[#FF9C08] text-[#FF9C08]" />
                  ))}
                </div>

              </div>
            </div>
          ))}
        </div>

        {/* Bottom Navigation: Prev/Next Buttons + Dot Pager with Elongated Pill */}
        <div className="flex items-center justify-center gap-4 mt-10">
          <button
            onClick={handlePrev}
            disabled={currentIndex === 0}
            aria-label="Previous review"
            className="carousel-btn !w-11 !h-11 sm:!w-12 sm:!h-12"
          >
            <ChevronLeft className="w-5 h-5 text-slate-800" />
          </button>

          {/* Dot pager where active dot is an elongated blue pill */}
          <div className="flex items-center gap-2 px-2">
            {REVIEWS.map((_, dotIdx) => (
              <button
                key={dotIdx}
                onClick={() => scrollToReview(dotIdx)}
                aria-label={`Go to review ${dotIdx + 1}`}
                className={dotIdx === currentIndex ? 'dot-active' : 'dot-inactive'}
              />
            ))}
          </div>

          <button
            onClick={handleNext}
            disabled={currentIndex >= REVIEWS.length - 1}
            aria-label="Next review"
            className="carousel-btn !w-11 !h-11 sm:!w-12 sm:!h-12"
          >
            <ChevronRight className="w-5 h-5 text-slate-800" />
          </button>
        </div>

      </div>
    </section>
  );
}
