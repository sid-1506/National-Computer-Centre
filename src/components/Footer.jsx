import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import logo2 from '../assets/Logo-2.jpeg';
import { BUSINESS_INFO } from '../data/nccData';

/* ─── Social Icons ───────────────────────────────────────────────────── */
const FacebookIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
  </svg>
);

const InstagramIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
  </svg>
);



export default function Footer({ onOpenModal }) {
  return (
    <footer className="bg-white pt-16 sm:pt-20 pb-8 border-t border-slate-100 w-full overflow-x-hidden">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-12 box-border">
        
        {/* 4-Column Grid matching Disha screenshot 2 & HTML */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-10 mb-12">
          
          {/* Column 1: Logo & Blurb */}
          <div className="flex flex-col gap-5">
            <Link to="/" aria-label="National Computer Centre Home">
              <img
                src={logo2}
                alt="National Computer Centre Logo"
                className="h-12 w-auto object-contain"
                loading="lazy"
              />
            </Link>
            <p className="text-[#6B7280] text-[15px] leading-[1.6] max-w-[300px]">
              We’re always in search for talented and motivated people. Don’t be shy introduce yourself!
            </p>
          </div>

          {/* Column 2: Useful Links */}
          <div>
            <h4 className="text-[18px] font-bold text-[#111827] mb-6">
              Useful Links
            </h4>
            <ul className="space-y-3.5 list-none p-0 m-0">
              <li>
                <Link
                  to="/courses"
                  className="text-[#6B7280] hover:text-[#0B6AA8] text-[15px] transition-colors inline-block"
                >
                  Courses
                </Link>
              </li>
              <li>
                <button
                  onClick={() => onOpenModal && onOpenModal('MS-CIT')}
                  className="text-[#6B7280] hover:text-[#0B6AA8] text-[15px] transition-colors inline-block bg-transparent border-none p-0 cursor-pointer text-left"
                >
                  Free Trial Class
                </button>
              </li>
              <li>
                <Link
                  to="/contact"
                  className="text-[#6B7280] hover:text-[#0B6AA8] text-[15px] transition-colors inline-block"
                >
                  Franchise & Enquiry
                </Link>
              </li>
              <li>
                <Link
                  to="/contact"
                  className="text-[#6B7280] hover:text-[#0B6AA8] text-[15px] transition-colors inline-block"
                >
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Explore */}
          <div>
            <h4 className="text-[18px] font-bold text-[#111827] mb-6">
              Explore
            </h4>
            <ul className="space-y-3.5 list-none p-0 m-0">
              <li>
                <a
                  href="/#founder"
                  className="text-[#6B7280] hover:text-[#0B6AA8] text-[15px] transition-colors inline-block"
                >
                  Founder & Leadership
                </a>
              </li>
              <li>
                <a
                  href="/#testimonials"
                  className="text-[#6B7280] hover:text-[#0B6AA8] text-[15px] transition-colors inline-block"
                >
                  Student Reviews
                </a>
              </li>
              <li>
                <Link
                  to="/contact"
                  className="text-[#6B7280] hover:text-[#0B6AA8] text-[15px] transition-colors inline-block"
                >
                  Visit Mulund Lab
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Get Contact & Social Buttons & CTA */}
          <div>
            <h4 className="text-[18px] font-bold text-[#111827] mb-6">
              Get Contact
            </h4>
            <div className="text-[#6B7280] flex flex-col gap-5">
              <p className="m-0 text-[15px] leading-relaxed">
                <strong className="text-[#111827]">Email:</strong>{' '}
                <a
                  href="mailto:nationalcomputercentre.mulund@gmail.com"
                  className="hover:text-[#0B6AA8] transition-colors"
                >
                  nationalcomputercentre.mulund@gmail.com
                </a>
              </p>

              <p className="m-0 text-[15px] leading-relaxed">
                <strong className="text-[#111827]">Phone:</strong>{' '}
                <a
                  href={`tel:${BUSINESS_INFO.phone.raw}`}
                  className="hover:text-[#0B6AA8] transition-colors"
                >
                  {BUSINESS_INFO.phone.display}
                </a>
              </p>

              {/* Social Icon Row */}
              <div className="flex items-center gap-3 pt-1">
                <a
                  href="https://www.facebook.com/nationalcomputercentre"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Facebook"
                  className="w-10 h-10 rounded-full bg-[#0B6AA8] flex items-center justify-center text-white hover:scale-105 hover:bg-[#095A90] transition-all"
                >
                  <FacebookIcon />
                </a>
                <a
                  href="https://www.instagram.com/nationalcomputercentre"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Instagram"
                  className="w-10 h-10 rounded-full bg-[#0B6AA8] flex items-center justify-center text-white hover:scale-105 hover:bg-[#095A90] transition-all"
                >
                  <InstagramIcon />
                </a>
              </div>

              {/* Full-width / Pill Solid Blue CTA Button "Contact With Us →" */}
              <div className="pt-2">
                <Link
                  to="/contact"
                  className="inline-flex items-center justify-center gap-3 w-full sm:w-auto px-8 py-3.5 rounded-full font-bold text-white bg-[#0B6AA8] hover:bg-[#095A90] hover:-translate-y-0.5 transition-all duration-300 shadow-md"
                >
                  <span>Contact With Us</span>
                  <ArrowRight className="w-4 h-4 stroke-[2.5]" />
                </Link>
              </div>

            </div>
          </div>

        </div>

        {/* Bottom Copyright Line */}
        <div className="pt-8 border-t border-slate-100 text-center">
          <p className="text-[#6B7280] text-[14px] m-0">
            Copyright © 2026{' '}
            <span className="text-[#111827] font-bold">National Computer Centre</span>{' '}
            All Rights Reserved
          </p>
        </div>

      </div>
    </footer>
  );
}
