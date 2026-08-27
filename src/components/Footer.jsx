import { Link } from 'react-router-dom';
import { Phone, MapPin, ArrowUp } from 'lucide-react';
import { BUSINESS_INFO } from '../data/nccData';
import logo2 from '../assets/Logo-2.jpeg';

export default function Footer({ onOpenModal }) {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#111111] text-[#EFEDE8] pt-16 sm:pt-20 pb-12 border-t border-white/15">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Top Logo Container */}
        <div className="pb-12 border-b border-white/15 flex flex-wrap items-center justify-between gap-6">
          <Link to="/" className="inline-block group" aria-label="National Computer Centre Home">
            <div className="bg-white rounded-2xl p-2.5 sm:p-3.5 inline-flex items-center justify-center shadow-sm hover:opacity-95 transition-opacity">
              <img
                src={logo2}
                alt="National Computer Centre logo"
                loading="lazy"
                className="h-14 sm:h-16 lg:h-20 w-auto object-contain max-w-[260px] sm:max-w-xs"
              />
            </div>
          </Link>
          <div className="flex items-center gap-3 text-[11px] sm:text-xs font-mono tracking-widest uppercase text-white/40">
            <span>EST. 15 AUGUST 1998</span>
            <span>·</span>
            <span>MULUND WEST, MUMBAI</span>
          </div>
        </div>

        {/* 4-Column Directory Grid */}
        <div className="py-16 grid grid-cols-1 md:grid-cols-12 gap-12 border-b border-white/15">
          {/* Col 1: Institute Info */}
          <div className="md:col-span-4 space-y-4">
            <span className="section-label text-white/50 block">ESTABLISHED 1998</span>
            <p className="text-sm text-white/70 leading-relaxed max-w-sm">
              Government-recognised computer training institute delivering practical, 1-on-1 career education in Mulund West for 28 continuous years.
            </p>
            <div className="pt-2">
              <button
                onClick={() => onOpenModal('MS-CIT')}
                className="rounded-full bg-white px-6 py-2.5 text-xs font-bold uppercase tracking-[0.15em] text-[#111111] hover:bg-primary hover:text-white btn-swiss cursor-pointer"
              >
                BOOK FREE TRIAL
              </button>
            </div>
          </div>

          {/* Col 2: Navigation Links */}
          <div className="md:col-span-3 space-y-3">
            <span className="section-label text-white/50 block mb-4">DIRECTORY</span>
            <ul className="space-y-2.5 text-xs uppercase tracking-wider font-semibold">
              <li>
                <Link to="/courses" className="hover:text-brand-cyan transition-colors">
                  01 / Courses Catalog (56)
                </Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-brand-cyan transition-colors">
                  02 / About Legacy & Founder
                </Link>
              </li>
              <li>
                <Link to="/about#why-ncc" className="hover:text-brand-cyan transition-colors">
                  03 / Why NCC & Pedagogy
                </Link>
              </li>
              <li>
                <Link to="/about#testimonials" className="hover:text-brand-cyan transition-colors">
                  04 / Student Reviews
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-brand-cyan transition-colors">
                  05 / Admissions & Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Address & Landmark */}
          <div className="md:col-span-3 space-y-3">
            <span className="section-label text-white/50 block mb-4 flex items-center gap-1.5">
              <MapPin className="w-3 h-3 text-brand-cyan" />
              LOCATION
            </span>
            <p className="text-xs text-white/80 leading-relaxed font-mono">
              {BUSINESS_INFO.address.shop}<br />
              {BUSINESS_INFO.address.street}<br />
              {BUSINESS_INFO.address.landmark}<br />
              {BUSINESS_INFO.address.area}, {BUSINESS_INFO.address.city} {BUSINESS_INFO.address.pincode}
            </p>
          </div>

          {/* Col 4: Timings & Direct Phone */}
          <div className="md:col-span-2 space-y-3">
            <span className="section-label text-white/50 block mb-4 flex items-center gap-1.5">
              <Phone className="w-3 h-3 text-brand-cyan" />
              CONTACT
            </span>
            <p className="text-xs font-mono text-white/80">
              <a href={`tel:${BUSINESS_INFO.phone.raw}`} className="hover:text-brand-cyan transition-colors block">
                {BUSINESS_INFO.phone.display}
              </a>
              <a href="tel:+919820615699" className="hover:text-brand-cyan transition-colors block mt-1">
                +91 98206 15699
              </a>
            </p>
            <div className="pt-2 text-[11px] text-white/50 font-mono">
              <span>Mon–Sat: 7 AM – 9 PM</span><br />
              <span>Sun: 8 AM – 1 PM</span>
            </div>
          </div>
        </div>

        {/* Bottom Bar: Copyright & Back to Top */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] font-mono text-white/50">
          <div>
            © 1998–2026 National Computer Centre. All Rights Reserved. Mulund West, Mumbai.
          </div>
          <button
            onClick={scrollToTop}
            className="flex items-center gap-1.5 hover:text-white transition-colors cursor-pointer uppercase tracking-widest"
          >
            <span>BACK TO TOP</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </footer>
  );
}
