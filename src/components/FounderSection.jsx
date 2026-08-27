import ownerImg from '../assets/Owner.jpeg';

export default function FounderSection({ className = '' }) {
  return (
    <section
      id="founder"
      className={`py-16 sm:py-20 lg:py-24 bg-white border-b border-slate-100 ${className}`}
    >
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
          
          {/* Left Column: Image (Desktop capped max-height; Mobile full width rounded without face cropping) */}
          <div className="lg:col-span-5 w-full">
            <div className="relative rounded-[22px] overflow-hidden aspect-[4/5] sm:aspect-[4/3] lg:aspect-[4/5] max-h-[440px] shadow-[0_8px_30px_rgba(0,0,0,0.06)] border border-slate-100 mx-auto">
              <img
                src={ownerImg}
                alt="Founder & Director of National Computer Centre, Mulund West"
                className="w-full h-full object-cover object-top"
                loading="lazy"
                decoding="async"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />
              <div className="absolute bottom-5 left-5 right-5 text-white">
                <span className="inline-block bg-[#0B6AA8] text-white text-[12px] font-bold uppercase tracking-wider px-3 py-1 rounded-md mb-1.5 shadow-sm">
                  Leadership
                </span>
                <p className="text-[17px] sm:text-[18px] font-bold leading-tight">
                  National Computer Centre · Since 1998
                </p>
              </div>
            </div>
          </div>

          {/* Right Column: Copy and Chips */}
          <div className="lg:col-span-7 space-y-5">
            <div>
              <span className="inline-block bg-[#E4F4FB] text-[#0B6AA8] text-[13px] sm:text-[14px] font-semibold uppercase tracking-wider px-5 py-2 rounded-full mb-3">
                Founder & Director
              </span>
              <h2
                className="font-bold text-[#0F172A] leading-tight tracking-tight mt-1"
                style={{ fontSize: 'clamp(2rem, 4vw, 3.2rem)' }}
              >
                Leadership & <span className="text-[#0B6AA8]">Practical Pedagogy</span>
              </h2>
            </div>

            <div className="space-y-3.5 text-[15px] sm:text-[16px] text-[#5B6472] leading-relaxed pt-2 border-t border-slate-100">
              <p>
                Guiding National Computer Centre since 15 August 1998 with an unwavering focus on individual terminal practice and student-first mentoring.
              </p>
              <p>
                Over 28 continuous years and 35,000+ alumni across Mumbai, our founding philosophy remains constant: true technical competency comes from direct hands-on practice, personalised pacing, and career-oriented faculty guidance.
              </p>
            </div>

            {/* Three Chips */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              {['28+ Years Mentoring', '35,000+ Students', 'Mulund West, Mumbai'].map((chip) => (
                <span
                  key={chip}
                  className="bg-[#E4F4FB] text-[#0B6AA8] text-[13px] sm:text-[14px] font-semibold px-4 py-2 rounded-xl border border-[#2DB3E3]/15"
                >
                  {chip}
                </span>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
