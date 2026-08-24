import { useState, useEffect, useRef } from 'react';
import { Phone, Menu, X } from 'lucide-react';
import { gsap } from 'gsap';
import { BUSINESS_INFO } from '../data/nccData';

export default function Navbar({ onOpenModal }) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [shouldRender, setShouldRender] = useState(false);

  const panelRef = useRef(null);
  const linksRef = useRef([]);
  const footerRowRef = useRef(null);
  const iconMenuRef = useRef(null);
  const iconCloseRef = useRef(null);
  const tlRef = useRef(null);
  const iconTlRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 40) {
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

  // Animate hamburger icon swap (0 -> 90deg with opacity crossfade)
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

      // Panel wipe down
      tl.fromTo(
        panelRef.current,
        { clipPath: 'inset(0% 0% 100% 0%)' },
        { clipPath: 'inset(0% 0% 0% 0%)', duration: 0.55 }
      );

      // Links stagger in from y: 24, opacity: 0
      const activeLinks = linksRef.current.filter(Boolean);
      tl.fromTo(
        activeLinks,
        { y: 24, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.45, stagger: 0.06 },
        '-=0.3'
      );

      // Divider + phone row fade in
      if (footerRowRef.current) {
        tl.fromTo(
          footerRowRef.current,
          { y: 12, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.4 },
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

      // Links fade/slide out
      const activeLinks = linksRef.current.filter(Boolean);
      tl.to(activeLinks, {
        y: -12,
        opacity: 0,
        duration: 0.25,
        stagger: 0.03,
      });

      // Divider + phone row fade out
      if (footerRowRef.current) {
        tl.to(footerRowRef.current, { opacity: 0, duration: 0.2 }, '<');
      }

      // Panel collapses clipPath
      tl.to(
        panelRef.current,
        {
          clipPath: 'inset(0% 0% 100% 0%)',
          duration: 0.4,
        },
        '-=0.15'
      );
    }
  }, [mobileMenuOpen, shouldRender]);

  const navLinks = [
    { label: 'COURSES', href: '#courses' },
    { label: 'ABOUT', href: '#about' },
    { label: 'WHY NCC', href: '#why-ncc' },
    { label: 'REVIEWS', href: '#testimonials' },
    { label: 'CONTACT', href: '#contact' },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-[#EFEDE8]/90 backdrop-blur-md py-3.5 border-b border-[#111111]/15'
          : 'bg-transparent py-6'
      }`}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Left: Brand Identity Wordmark */}
        <a
          href="#"
          className="flex items-baseline gap-2 font-display text-2xl tracking-[-0.02em] leading-[1.02] md:leading-[0.98] text-[#111111] uppercase hover:text-[#1B3FAE] transition-colors"
        >
          <span>NATIONAL COMPUTER CENTRE</span>
          <span className="text-[10px] font-sans font-semibold tracking-widest text-[#111111]/40 hidden sm:inline">
            / 1998
          </span>
        </a>

        {/* Center: Max 5 Nav Links (Desktop) */}
        <nav className="hidden md:flex items-center gap-8 text-[11px] font-semibold tracking-[0.18em] uppercase text-[#111111]">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="hover:text-[#1B3FAE] transition-colors"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Right: Phone Number + One Black Pill CTA Button (Max 2 CTAs) */}
        <div className="hidden lg:flex items-center gap-6">
          <a
            href={`tel:${BUSINESS_INFO.phone.raw}`}
            className="text-[12px] font-medium tracking-wider text-[#111111] hover:text-[#1B3FAE] transition-colors flex items-center gap-1.5"
          >
            <Phone className="w-3.5 h-3.5" />
            <span>98211 15699</span>
          </a>

          <button
            onClick={() => onOpenModal('MS-CIT')}
            className="rounded-full bg-[#111111] px-5 py-2.5 text-[11px] font-bold uppercase tracking-[0.15em] text-[#EFEDE8] hover:bg-[#1B3FAE] btn-swiss cursor-pointer"
          >
            FREE TRIAL
          </button>
        </div>

        {/* Mobile Hamburger Toggle */}
        <div className="flex md:hidden items-center gap-3">
          <button
            onClick={() => onOpenModal('MS-CIT')}
            className="rounded-full bg-[#111111] px-3.5 py-1.5 text-[10px] font-bold uppercase tracking-wider text-[#EFEDE8] hover:bg-[#1B3FAE] btn-swiss"
          >
            FREE TRIAL
          </button>

          <button
            onClick={toggleMobileMenu}
            className="relative p-2 text-[#111111] w-10 h-10 flex items-center justify-center cursor-pointer"
            aria-label="Toggle navigation menu"
          >
            <span
              ref={iconMenuRef}
              className="absolute inset-0 flex items-center justify-center pointer-events-none"
            >
              <Menu className="w-6 h-6" />
            </span>
            <span
              ref={iconCloseRef}
              className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-0"
            >
              <X className="w-6 h-6" />
            </span>
          </button>
        </div>
      </div>

      {/* Mobile Drawer with GSAP Dropdown & Exit Animation */}
      {shouldRender && (
        <div
          ref={panelRef}
          className="md:hidden bg-[#EFEDE8] border-b border-[#111111]/15 px-6 py-6 space-y-4 overflow-hidden"
          style={{ clipPath: 'inset(0% 0% 100% 0%)' }}
        >
          {navLinks.map((link, idx) => (
            <div
              key={link.label}
              ref={(el) => (linksRef.current[idx] = el)}
            >
              <a
                href={link.href}
                onClick={closeMobileMenu}
                className="block text-sm font-bold tracking-[0.18em] uppercase text-[#111111] hover:text-[#1B3FAE] transition-colors"
              >
                {link.label}
              </a>
            </div>
          ))}

          <div
            ref={footerRowRef}
            className="pt-4 border-t border-[#111111]/15 flex items-center justify-between"
          >
            <a
              href={`tel:${BUSINESS_INFO.phone.raw}`}
              className="text-xs font-semibold text-[#111111] flex items-center gap-2"
            >
              <Phone className="w-3.5 h-3.5 text-[#1B3FAE]" />
              <span>98211 15699</span>
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
