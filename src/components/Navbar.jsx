import { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { gsap } from 'gsap';
import nccLogo from '../assets/ncc-logo.png';

/* ─── Social SVG Icons (Only Facebook & Instagram) ───────────────────── */
const InstagramIcon = () => (
  <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
  </svg>
);

const FacebookIcon = () => (
  <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor">
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
  </svg>
);

export default function Navbar({ onOpenModal }) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [inTestimonialsView, setInTestimonialsView] = useState(false);
  const location = useLocation();

  const iconMenuRef = useRef(null);
  const iconCloseRef = useRef(null);
  const iconTlRef = useRef(null);

  // Throttled passive scroll listener for navbar elevation
  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          setScrolled(window.scrollY > 20);
          ticking = false;
        });
        ticking = true;
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // IntersectionObserver to accurately track when #testimonials is in view on homepage
  useEffect(() => {
    if (location.pathname !== '/') {
      return;
    }

    const testimonialsEl = document.getElementById('testimonials');
    if (!testimonialsEl) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setInTestimonialsView(entry.isIntersecting);
      },
      { rootMargin: '-20% 0px -40% 0px', threshold: 0.1 }
    );

    observer.observe(testimonialsEl);
    return () => observer.disconnect();
  }, [location.pathname]);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = mobileMenuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [mobileMenuOpen]);

  const toggleMobileMenu = () => {
    setMobileMenuOpen((prev) => !prev);
  };

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
  };

  useEffect(() => {
    const pref = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (pref) return;
    iconTlRef.current?.kill();
    const tl = gsap.timeline();
    iconTlRef.current = tl;
    if (mobileMenuOpen) {
      tl.to(iconMenuRef.current, { rotate: 90, opacity: 0, duration: 0.3, ease: 'power2.inOut' }, 0);
      tl.fromTo(iconCloseRef.current, { rotate: -90, opacity: 0 }, { rotate: 0, opacity: 1, duration: 0.3, ease: 'power2.inOut' }, 0);
    } else {
      tl.to(iconCloseRef.current, { rotate: -90, opacity: 0, duration: 0.3, ease: 'power2.inOut' }, 0);
      tl.to(iconMenuRef.current, { rotate: 0, opacity: 1, duration: 0.3, ease: 'power2.inOut' }, 0);
    }
    return () => tl.kill();
  }, [mobileMenuOpen]);

  const navLinks = [
    { label: 'Home', to: '/', key: 'home' },
    { label: 'Courses', to: '/courses', key: 'courses' },
    { label: 'Reviews', to: '/#testimonials', key: 'reviews' },
    { label: 'Contact', to: '/contact', key: 'contact' },
  ];

  const socialLinks = [
    { Icon: FacebookIcon, href: 'https://www.facebook.com/nationalcomputercentre', label: 'Facebook' },
    { Icon: InstagramIcon, href: 'https://www.instagram.com/nationalcomputercentre', label: 'Instagram' },
  ];

  // Helper to determine active state strictly
  const isLinkActive = (link) => {
    if (link.key === 'reviews') {
      return location.pathname === '/' && inTestimonialsView;
    }
    if (link.key === 'home') {
      return location.pathname === '/' && !inTestimonialsView;
    }
    if (link.key === 'courses') {
      return location.pathname.startsWith('/courses');
    }
    if (link.key === 'contact') {
      return location.pathname.startsWith('/contact');
    }
    return false;
  };

  return (
    <header
      className={`intro-header sticky top-0 z-50 w-full bg-white transition-all duration-300 border-b border-slate-100 ${
        scrolled ? 'shadow-sm' : 'shadow-none'
      }`}
      style={{ backgroundColor: '#ffffff' }}
    >
      {/* Header Bar — Compact ~60-64px on mobile, ~68-72px on desktop */}
      <div className="mx-auto max-w-[1400px] w-full flex items-center justify-between px-3.5 sm:px-6 lg:px-12 py-2.5 sm:py-3 lg:py-3.5 box-border">
        
        {/* Left: Minimal Clean Logo + Brand Text Lockup */}
        <div className="intro-logo flex-shrink-0 flex items-center">
          <Link
            to="/"
            aria-label="National Computer Centre Home"
            className="flex items-center gap-2 sm:gap-2.5 lg:gap-3 group"
          >
            <img
              src={nccLogo}
              alt="National Computer Centre Logo"
              className="h-9 sm:h-10 lg:h-11 w-auto object-contain transition-transform group-hover:scale-[1.02] shrink-0"
              loading="eager"
            />
            <span className="font-bold text-[#111827] text-[14px] xs:text-[15px] sm:text-[17px] lg:text-[19px] xl:text-[20px] tracking-tight leading-none group-hover:text-[#0B6AA8] transition-colors whitespace-nowrap">
              National Computer Centre
            </span>
          </Link>
        </div>

        {/* Center: Desktop Horizontal Navigation */}
        <nav className="hidden lg:flex items-center gap-6 xl:gap-8 mx-4 xl:mx-8" aria-label="Main navigation">
          {navLinks.map((link) => {
            const active = isLinkActive(link);

            return (
              <Link
                key={link.label}
                to={link.to}
                className="intro-nav-link relative py-1 text-[15px] xl:text-[16px] font-medium transition-colors duration-300 group text-slate-800 hover:text-[#0B6AA8] whitespace-nowrap leading-tight"
                style={{ color: active ? '#0B6AA8' : '#1C1D1F' }}
              >
                {link.label}
                {/* Active underline bar */}
                <span
                  className="absolute -bottom-1.5 left-0 w-full h-[2px] bg-[#0B6AA8] transition-transform duration-300 origin-left"
                  style={{ transform: active ? 'scaleX(1)' : 'scaleX(0)' }}
                />
              </Link>
            );
          })}
        </nav>

        {/* Right: Desktop Social Icons (Facebook + Instagram) + Free Trial CTA */}
        <div className="flex items-center gap-3 sm:gap-4 shrink-0">
          <div className="hidden xl:flex items-center gap-2.5">
            {socialLinks.map(({ Icon, href, label }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="intro-social-icon w-9 h-9 rounded-full bg-[#0B6AA8] flex items-center justify-center text-white hover:bg-[#095A90] hover:scale-105 transition-all duration-300 shadow-xs"
              >
                <Icon />
              </a>
            ))}
          </div>

          <button
            onClick={() => onOpenModal('MS-CIT')}
            id="nav-free-trial-btn"
            className="intro-free-trial hidden sm:inline-flex rounded-full bg-[#0B6AA8] px-5 py-2 text-[14px] font-semibold text-white hover:bg-[#095A90] hover:shadow-md transition-all duration-300 cursor-pointer whitespace-nowrap"
          >
            Free Trial
          </button>

          {/* Mobile Hamburger Button */}
          <button
            onClick={toggleMobileMenu}
            className="intro-hamburger lg:hidden p-1.5 text-slate-700 hover:text-[#0B6AA8] rounded-xl cursor-pointer transition-colors relative w-9 h-9 flex items-center justify-center shrink-0"
            aria-label="Toggle navigation menu"
            aria-expanded={mobileMenuOpen}
          >
            <span ref={iconMenuRef} className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <Menu className="w-6 h-6" />
            </span>
            <span ref={iconCloseRef} className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-0">
              <X className="w-6 h-6" />
            </span>
          </button>
        </div>
      </div>

      {/* Mobile Drawer (Absolute overlay — zero layout shift on closed navbar) */}
      {mobileMenuOpen && (
        <div
          className="lg:hidden absolute top-full left-0 right-0 w-full bg-white border-t border-slate-100 px-6 pt-4 pb-8 shadow-2xl z-50 animate-in fade-in slide-in-from-top-2 duration-200"
        >
          <nav className="space-y-1" aria-label="Mobile navigation">
            {navLinks.map((link) => {
              const active = isLinkActive(link);

              return (
                <div key={link.label}>
                  <Link
                    to={link.to}
                    onClick={closeMobileMenu}
                    className={`block text-[16px] font-semibold py-3 border-b border-slate-100 transition-colors ${
                      active ? 'text-[#0B6AA8]' : 'text-slate-800 hover:text-[#0B6AA8]'
                    }`}
                  >
                    {link.label}
                  </Link>
                </div>
              );
            })}
          </nav>

          <div className="mt-6 pt-2 flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <span className="text-[13px] text-slate-400 font-semibold uppercase tracking-wider">
                Follow Us:
              </span>
              <div className="flex items-center gap-3">
                {socialLinks.map(({ Icon, href, label }) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={label}
                    className="w-10 h-10 rounded-full bg-[#0B6AA8] flex items-center justify-center text-white hover:bg-[#095A90]"
                  >
                    <Icon />
                  </a>
                ))}
              </div>
            </div>

            <button
              onClick={() => {
                onOpenModal('MS-CIT');
                closeMobileMenu();
              }}
              className="w-full rounded-full bg-[#0B6AA8] py-3.5 text-[15px] font-bold text-white hover:bg-[#095A90] transition-all shadow-md cursor-pointer"
            >
              Book One Day Free Trial
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
