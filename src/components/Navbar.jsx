import { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Phone, Menu, X } from 'lucide-react';
import { gsap } from 'gsap';
import { BUSINESS_INFO } from '../data/nccData';
import nccLogo from '../assets/ncc-logo.png';

export default function Navbar({ onOpenModal }) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [shouldRender, setShouldRender] = useState(false);
  const location = useLocation();

  const panelRef = useRef(null);
  const linksRef = useRef([]);
  const footerRowRef = useRef(null);
  const iconMenuRef = useRef(null);
  const iconCloseRef = useRef(null);
  const tlRef = useRef(null);
  const iconTlRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 30) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Lock / unlock body scroll
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileMenuOpen]);

  // Handle Hamburger Toggle
  const toggleMobileMenu = () => {
    if (!mobileMenuOpen) {
      setShouldRender(true);
      setMobileMenuOpen(true);
    } else {
      setMobileMenuOpen(false);
    }
  };

  const closeMobileMenu = () => {
    if (mobileMenuOpen) {
      setMobileMenuOpen(false);
    }
  };

  // Animate hamburger icon swap
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    iconTlRef.current?.kill();
    const tl = gsap.timeline();
    iconTlRef.current = tl;

    if (mobileMenuOpen) {
      tl.to(iconMenuRef.current, {
        rotate: 90,
        opacity: 0,
        duration: 0.3,
        ease: 'power2.inOut',
      }, 0);
      tl.fromTo(
        iconCloseRef.current,
        { rotate: -90, opacity: 0 },
        { rotate: 0, opacity: 1, duration: 0.3, ease: 'power2.inOut' },
        0
      );
    } else {
      tl.to(iconCloseRef.current, {
        rotate: -90,
        opacity: 0,
        duration: 0.3,
        ease: 'power2.inOut',
      }, 0);
      tl.to(
        iconMenuRef.current,
        { rotate: 0, opacity: 1, duration: 0.3, ease: 'power2.inOut' },
        0
      );
    }

    return () => {
      tl.kill();
    };
  }, [mobileMenuOpen]);

  // Animate mobile drawer opening / closing
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (mobileMenuOpen && shouldRender) {
      tlRef.current?.kill();

      if (prefersReducedMotion) {
        if (panelRef.current) gsap.set(panelRef.current, { clipPath: 'inset(0% 0% 0% 0%)' });
        if (linksRef.current) gsap.set(linksRef.current, { y: 0, opacity: 1 });
        if (footerRowRef.current) gsap.set(footerRowRef.current, { y: 0, opacity: 1 });
        return;
      }

      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });
      tlRef.current = tl;

      tl.fromTo(
        panelRef.current,
        { clipPath: 'inset(0% 0% 100% 0%)' },
        { clipPath: 'inset(0% 0% 0% 0%)', duration: 0.45 }
      );

      const activeLinks = linksRef.current.filter(Boolean);
      tl.fromTo(
        activeLinks,
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.4, stagger: 0.05 },
        '-=0.25'
      );

      if (footerRowRef.current) {
        tl.fromTo(
          footerRowRef.current,
          { y: 10, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.35 },
          '-=0.2'
        );
      }
    } else if (!mobileMenuOpen && shouldRender) {
      tlRef.current?.kill();

      if (prefersReducedMotion) {
        setShouldRender(false);
        return;
      }

      const tl = gsap.timeline({
        defaults: { ease: 'power2.inOut' },
        onComplete: () => {
          setShouldRender(false);
        },
      });
      tlRef.current = tl;

      const activeLinks = linksRef.current.filter(Boolean);
      tl.to(activeLinks, {
        y: -10,
        opacity: 0,
        duration: 0.2,
        stagger: 0.03,
      });

      if (footerRowRef.current) {
        tl.to(footerRowRef.current, { opacity: 0, duration: 0.15 }, '<');
      }

      tl.to(
        panelRef.current,
        {
          clipPath: 'inset(0% 0% 100% 0%)',
          duration: 0.35,
        },
        '-=0.1'
      );
    }
  }, [mobileMenuOpen, shouldRender]);

  const navLinks = [
    { label: 'COURSES', to: '/courses' },
    { label: 'ABOUT', to: '/about' },
    { label: 'CONTACT', to: '/contact' },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-[#EFEDE8]/95 backdrop-blur-md py-2.5 sm:py-3 lg:py-3.5 border-b border-[#111111]/15'
          : 'bg-[#EFEDE8]/90 backdrop-blur-sm py-3.5 sm:py-4 lg:py-5'
      }`}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Left: Responsive Brand Lockup */}
        <Link
          to="/"
          className="flex items-center gap-2.5 sm:gap-3 lg:gap-3.5 group shrink-0 select-none"
        >
          {/* Logo Mark */}
          <img
            src={nccLogo}
            alt="National Computer Centre"
            className="h-11 sm:h-12 lg:h-14 w-auto object-contain transition-transform group-hover:scale-[1.02]"
          />

          {/* Brand Text in Anton */}
          <div className="flex items-center leading-none">
            <span className="font-display uppercase text-[#111111] text-[11px] sm:text-[13px] lg:text-[15px] tracking-tight whitespace-nowrap">
              NATIONAL COMPUTER CENTRE
            </span>
          </div>
        </Link>

        {/* Center: Dedicated Route Nav Links (Desktop) */}
        <nav className="hidden md:flex items-center gap-8 text-[11px] font-semibold tracking-[0.18em] uppercase text-[#111111]">
          {navLinks.map((link) => {
            const isActive = location.pathname === link.to;
            return (
              <Link
                key={link.label}
                to={link.to}
                className={`hover:text-primary transition-colors ${
                  isActive ? 'text-primary border-b border-primary pb-0.5' : ''
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        {/* Right: Direct Phone + One Black Pill CTA */}
        <div className="hidden lg:flex items-center gap-6">
          <a
            href={`tel:${BUSINESS_INFO.phone.raw}`}
            className="text-[12px] font-medium tracking-wider text-[#111111] hover:text-primary transition-colors flex items-center gap-1.5"
          >
            <Phone className="w-3.5 h-3.5 text-primary" />
            <span>98211 15699</span>
          </a>

          <button
            onClick={() => onOpenModal('MS-CIT')}
            className="rounded-full bg-[#111111] px-5 py-2.5 text-[11px] font-bold uppercase tracking-[0.15em] text-[#EFEDE8] hover:bg-primary btn-swiss cursor-pointer"
          >
            FREE TRIAL
          </button>
        </div>

        {/* Mobile Actions (< 1024px) */}
        <div className="flex md:hidden items-center gap-2 sm:gap-3">
          <button
            onClick={() => onOpenModal('MS-CIT')}
            className="rounded-full bg-[#111111] px-3 sm:px-3.5 py-1.5 text-[10px] font-bold uppercase tracking-wider text-[#EFEDE8] hover:bg-primary btn-swiss shrink-0"
          >
            FREE TRIAL
          </button>

          <button
            onClick={toggleMobileMenu}
            className="relative p-1.5 text-[#111111] w-9 h-9 flex items-center justify-center cursor-pointer shrink-0"
            aria-label="Toggle navigation menu"
          >
            <span
              ref={iconMenuRef}
              className="absolute inset-0 flex items-center justify-center pointer-events-none"
            >
              <Menu className="w-5 h-5" />
            </span>
            <span
              ref={iconCloseRef}
              className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-0"
            >
              <X className="w-5 h-5" />
            </span>
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {shouldRender && (
        <div
          ref={panelRef}
          className="md:hidden bg-[#EFEDE8] border-b border-[#111111]/15 px-6 py-6 space-y-4 overflow-hidden"
          style={{ clipPath: 'inset(0% 0% 100% 0%)' }}
        >
          {navLinks.map((link, idx) => {
            const isActive = location.pathname === link.to;
            return (
              <div
                key={link.label}
                ref={(el) => (linksRef.current[idx] = el)}
              >
                <Link
                  to={link.to}
                  onClick={closeMobileMenu}
                  className={`block text-sm font-bold tracking-[0.18em] uppercase transition-colors ${
                    isActive ? 'text-primary' : 'text-[#111111] hover:text-primary'
                  }`}
                >
                  {link.label}
                </Link>
              </div>
            );
          })}

          <div
            ref={footerRowRef}
            className="pt-4 border-t border-[#111111]/15 flex items-center justify-between"
          >
            <a
              href={`tel:${BUSINESS_INFO.phone.raw}`}
              className="text-xs font-semibold text-[#111111] flex items-center gap-2"
            >
              <Phone className="w-3.5 h-3.5 text-primary" />
              <span>98211 15699</span>
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
