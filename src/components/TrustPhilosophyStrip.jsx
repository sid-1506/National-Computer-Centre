import { Link } from 'react-router-dom';
import { ArrowRight, Award, ShieldCheck, UserCheck } from 'lucide-react';

export default function TrustPhilosophyStrip() {
  return (
    <section className="py-20 bg-[#EFEDE8] text-[#111111] border-b border-[#111111]/15">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between pb-6 border-b border-[#111111]/15 mb-12">
          <span className="section-label text-[#111111]">THE NCC STANDARD</span>
          <span className="section-label text-[#111111]/60">SINCE 15 AUGUST 1998</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          <div className="lg:col-span-8 space-y-4">
            <h2 className="font-display text-3xl sm:text-5xl uppercase tracking-[-0.02em] leading-[1.02] md:leading-[0.98] text-[#111111] pb-[0.04em]">
              PRACTICAL TERMINAL MASTERY OVER PASSIVE LECTURES.
            </h2>
            <p className="text-base sm:text-lg text-[#111111]/80 leading-relaxed max-w-3xl">
              For over 28 years at Zaver Road, Mulund West, National Computer Centre has trained 35,000+ students with 1:1 dedicated computer access, official government test simulators, and lifelong placement assistance.
            </p>
          </div>

          <div className="lg:col-span-4 flex flex-col sm:flex-row lg:flex-col gap-3">
            <Link
              to="/about"
              className="rounded-full bg-[#111111] px-6 py-3.5 text-xs font-bold uppercase tracking-[0.15em] text-[#EFEDE8] hover:bg-primary btn-swiss flex items-center justify-center gap-2"
            >
              <span>OUR STORY & FOUNDER</span>
              <ArrowRight className="w-4 h-4" />
            </Link>

            <Link
              to="/contact"
              className="rounded-full border border-[#111111] bg-transparent px-6 py-3.5 text-xs font-bold uppercase tracking-[0.15em] text-[#111111] hover:bg-[#111111] hover:text-[#EFEDE8] btn-swiss flex items-center justify-center gap-2"
            >
              <span>VISIT OUR MULUND LAB</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-[#111111]/15 grid grid-cols-1 sm:grid-cols-3 gap-6 text-xs sm:text-sm font-medium text-[#111111]/80">
          <div className="flex items-center gap-3">
            <ShieldCheck className="w-5 h-5 text-primary shrink-0" />
            <span>Govt Recognized Certification</span>
          </div>
          <div className="flex items-center gap-3">
            <UserCheck className="w-5 h-5 text-primary shrink-0" />
            <span>1-on-1 Faculty Mentorship</span>
          </div>
          <div className="flex items-center gap-3">
            <Award className="w-5 h-5 text-primary shrink-0" />
            <span>28+ Years of Academic Excellence</span>
          </div>
        </div>
      </div>
    </section>
  );
}
