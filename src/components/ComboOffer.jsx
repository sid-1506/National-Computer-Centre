export default function ComboOffer({ onOpenModal }) {
  return (
    <section className="py-20 lg:py-28 bg-primary text-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex items-center justify-between pb-6 border-b border-white/15 mb-10">
          <span className="section-label text-white/80">SPECIAL ANNIVERSARY ADMISSIONS</span>
          <span className="section-label text-white/60">EST. 15 AUG 1998</span>
        </div>

        {/* Content */}
        <div className="max-w-4xl space-y-6">
          <h2 className="font-display text-4xl sm:text-6xl lg:text-7xl uppercase tracking-[-0.02em] text-white leading-[1.02] md:leading-[0.98] pb-[0.08em]">
            28 YEARS OF TRUST. UP TO 50% OFF ON COMBO COURSES.
          </h2>

          <p className="text-base sm:text-xl text-white/90 leading-relaxed font-normal max-w-3xl">
            In celebration of twenty-eight continuous years in Mulund West, enroll in dual career tracks — such as Tally Prime with Advanced Excel, DTP with Graphic Design, or Python with Data Analytics — and receive up to 50% fee concession.
          </p>

          <div className="pt-4">
            <button
              onClick={() => onOpenModal('Tally + Advanced Excel Combo')}
              className="rounded-full bg-white px-8 py-4 text-xs font-bold uppercase tracking-[0.15em] text-primary hover:bg-[#111111] hover:text-white btn-swiss cursor-pointer"
            >
              CLAIM ANNIVERSARY OFFER
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
