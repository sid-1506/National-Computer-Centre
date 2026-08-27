import { useRef } from 'react';
import classroomImg from '../assets/classroom-logo.png';
import { useSectionReveal } from '../hooks/useMotionReveal';

const STAT_CARDS = [
  {
    letter: 'A',
    stat: '94% of learners',
    title: 'Stay Ahead of the Curve',
    body: 'Practical hands-on training that keeps you up to date with modern workplace software, AI tools, and corporate digital workflows.',
  },
  {
    letter: 'B',
    stat: '3x Hired Faster',
    title: 'Bridge the Experience Gap',
    body: 'Real-world business case studies, live GST reconciliation, and 1-on-1 terminal practice make you immediately job-ready.',
  },
  {
    letter: 'C',
    stat: '40% Salary Boost',
    title: 'Unlock Higher Salaries',
    body: 'Certified proficiency in Tally Prime, Advanced Excel, Python programming, and Graphic Design unlocks corporate promotions and career growth.',
  },
  {
    letter: 'D',
    stat: '2026',
    title: 'New tech roles emerging every year',
    body: 'Future-proof your career as businesses rapidly adopt data analytics, automated financial reporting, and cloud technologies.',
  },
];

export default function WhyExtraSkills() {
  const sectionRef = useRef(null);
  useSectionReveal(sectionRef);

  return (
    <section ref={sectionRef} className="bg-white py-16 sm:py-20 lg:py-24 border-b border-slate-100">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
          
          {/* Left Column: Rounded Corner Image */}
          <div className="reveal-item lg:col-span-5 order-1 lg:order-1">
            <div className="relative rounded-[24px] overflow-hidden shadow-[0_8px_30px_rgba(0,0,0,0.06)] border border-slate-100 aspect-[4/5] sm:aspect-[4/3] lg:aspect-[4/5]">
              <img
                src={classroomImg}
                alt="Students learning practical computer skills at National Computer Centre"
                className="w-full h-full object-cover object-center transform hover:scale-102 transition-transform duration-500"
                loading="lazy"
                decoding="async"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
              <div className="absolute bottom-6 left-6 right-6 text-white">
                <span className="inline-block bg-[#0B6AA8] text-white text-[12px] font-bold uppercase tracking-wider px-3 py-1 rounded-md mb-2">
                  Since 1998
                </span>
                <p className="text-[18px] sm:text-[20px] font-bold leading-tight">
                  28+ Years of Practical Excellence in Mulund West
                </p>
              </div>
            </div>
          </div>

          {/* Right Column: Heading, Paragraph, and 4 Stat Cards */}
          <div className="lg:col-span-7 order-2 lg:order-2 space-y-6">
            
            {/* Two-tone Heading */}
            <div>
              <h2
                className="reveal-heading font-bold text-[#0F172A] leading-tight tracking-tight mb-4"
                style={{ fontSize: 'clamp(2rem, 4vw, 3.2rem)' }}
              >
                Why Extra <span className="text-[#0B6AA8]">Skills Matter</span>
              </h2>
              <p className="reveal-body text-[16px] sm:text-[17px] text-[#5B6472] leading-relaxed max-w-2xl">
                Degrees provide knowledge, but job-oriented practical skills build careers. At National Computer Centre, our structured courses bridge the gap between academic theory and real industry demands.
              </p>
            </div>

            {/* Vertical Stack of 4 Stat Cards */}
            <div className="space-y-4 pt-2">
              {STAT_CARDS.map((card) => (
                <div
                  key={card.letter}
                  className="reveal-item bg-[#EFF1F4] rounded-[18px] p-5 sm:p-6 flex items-start gap-4 sm:gap-5 transition-all duration-300 hover:bg-[#EAF0F6] hover:shadow-sm"
                >
                  {/* Solid Blue Rounded Square with White Capital Letter */}
                  <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-[14px] bg-[#0B6AA8] flex items-center justify-center shrink-0 text-white font-extrabold text-[20px] sm:text-[22px] shadow-sm">
                    {card.letter}
                  </div>

                  {/* Text details */}
                  <div className="flex-1 min-w-0">
                    <span className="text-[12px] sm:text-[13px] font-bold text-[#0B6AA8] uppercase tracking-wider block mb-1">
                      {card.stat}
                    </span>
                    <h3 className="text-[17px] sm:text-[19px] font-bold text-[#0F172A] leading-snug mb-1">
                      {card.title}
                    </h3>
                    <p className="text-[14px] sm:text-[15px] text-[#5B6472] leading-relaxed">
                      {card.body}
                    </p>
                  </div>
                </div>
              ))}
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}
