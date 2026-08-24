import { useState, useEffect } from 'react';
import { X, ArrowRight, CheckCircle2 } from 'lucide-react';
import { COURSES, BUSINESS_INFO } from '../data/nccData';

export default function EnquiryModal({ isOpen, onClose, defaultCourse = 'MS-CIT' }) {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    course: defaultCourse,
    timing: 'Morning (07:00 AM – 11:00 AM)',
  });
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    if (defaultCourse) {
      setFormData((prev) => ({ ...prev, course: defaultCourse }));
    }
  }, [defaultCourse]);

  // Handle escape key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.phone) return;

    const message = encodeURIComponent(
      `Hello National Computer Centre,\n\nI want to book a One Day Free Trial.\n*Name:* ${formData.name}\n*Phone:* ${formData.phone}\n*Email:* ${formData.email || 'N/A'}\n*Course:* ${formData.course}\n*Preferred Slot:* ${formData.timing}`
    );

    window.open(`https://wa.me/919821115699?text=${message}`, '_blank');
    setSubmitted(true);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/75 backdrop-blur-sm">
      <div
        className="relative w-full max-w-lg bg-[#EFEDE8] text-[#111111] rounded-2xl p-6 sm:p-8 border border-[#111111]/20 shadow-2xl"
        role="dialog"
        aria-modal="true"
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-6 right-6 p-1.5 text-[#111111]/60 hover:text-[#111111] transition-colors"
          aria-label="Close dialog"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="pb-6 border-b border-[#111111]/15 pr-8">
          <span className="section-label text-[#1B3FAE] block mb-1">
            ONE DAY FREE TRIAL BOOKING
          </span>
          <h2 className="font-display text-2xl sm:text-3xl uppercase tracking-[-0.02em] leading-[1.02] md:leading-[0.98] text-[#111111] pb-[0.04em]">
            RESERVE YOUR LAB TERMINAL
          </h2>
          <p className="text-xs text-[#111111]/70 mt-1">
            Shop No. 7, Anubhav Bldg, Zaver Rd, Mulund West · Call 98211 15699
          </p>
        </div>

        {submitted ? (
          <div className="py-8 space-y-4">
            <div className="flex items-center gap-3 text-[#1B3FAE]">
              <CheckCircle2 className="w-6 h-6" />
              <span className="font-display text-2xl uppercase tracking-[-0.02em] leading-[1.02] md:leading-[0.98] text-[#111111] pb-[0.04em]">
                BOOKING SENT VIA WHATSAPP
              </span>
            </div>
            <p className="text-sm text-[#111111]/80 leading-relaxed">
              We have received your trial request for <strong>{formData.course}</strong>. Our faculty will reserve a computer terminal for you.
            </p>
            <button
              onClick={onClose}
              className="rounded-full bg-[#111111] px-6 py-3 text-xs font-bold uppercase tracking-wider text-[#EFEDE8] hover:bg-[#1B3FAE] btn-swiss"
            >
              CLOSE
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="py-6 space-y-5">
            {/* Name */}
            <div className="space-y-1">
              <label htmlFor="modal-name" className="section-label text-[#111111]/60 block">
                FULL NAME *
              </label>
              <input
                type="text"
                id="modal-name"
                name="name"
                required
                value={formData.name}
                onChange={handleChange}
                placeholder="Your full name"
                className="w-full bg-transparent py-2.5 border-b border-[#111111]/30 text-sm sm:text-base text-[#111111] focus:border-[#111111] focus:outline-none"
              />
            </div>

            {/* Phone */}
            <div className="space-y-1">
              <label htmlFor="modal-phone" className="section-label text-[#111111]/60 block">
                PHONE (WHATSAPP) *
              </label>
              <input
                type="tel"
                id="modal-phone"
                name="phone"
                required
                value={formData.phone}
                onChange={handleChange}
                placeholder="+91 98211 15699"
                className="w-full bg-transparent py-2.5 border-b border-[#111111]/30 text-sm sm:text-base text-[#111111] focus:border-[#111111] focus:outline-none"
              />
            </div>

            {/* Course */}
            <div className="space-y-1">
              <label htmlFor="modal-course" className="section-label text-[#111111]/60 block">
                COURSE TRACK *
              </label>
              <select
                id="modal-course"
                name="course"
                value={formData.course}
                onChange={handleChange}
                className="w-full bg-transparent py-2.5 border-b border-[#111111]/30 text-sm sm:text-base text-[#111111] focus:border-[#111111] focus:outline-none cursor-pointer"
              >
                {COURSES.map((c) => (
                  <option key={c.id} value={c.name} className="bg-[#EFEDE8]">
                    {c.index} — {c.name} ({c.duration})
                  </option>
                ))}
                <option value="Anniversary Combo Offer (Up to 50% Off)" className="bg-[#EFEDE8]">
                  ★ 28th Anniversary Combo (Up to 50% Off)
                </option>
              </select>
            </div>

            {/* Timing */}
            <div className="space-y-1">
              <label htmlFor="modal-timing" className="section-label text-[#111111]/60 block">
                PREFERRED TIME SLOT
              </label>
              <select
                id="modal-timing"
                name="timing"
                value={formData.timing}
                onChange={handleChange}
                className="w-full bg-transparent py-2.5 border-b border-[#111111]/30 text-sm sm:text-base text-[#111111] focus:border-[#111111] focus:outline-none cursor-pointer"
              >
                <option value="Morning (07:00 AM – 11:00 AM)">Morning (07:00 AM – 11:00 AM)</option>
                <option value="Afternoon (11:00 AM – 04:00 PM)">Afternoon (11:00 AM – 04:00 PM)</option>
                <option value="Evening (04:00 PM – 09:00 PM)">Evening (04:00 PM – 09:00 PM)</option>
                <option value="Sunday Batch (08:00 AM – 01:00 PM)">Sunday Batch (08:00 AM – 01:00 PM)</option>
              </select>
            </div>

            {/* Submit */}
            <div className="pt-4 flex items-center justify-between">
              <button
                type="submit"
                className="rounded-full bg-[#111111] px-7 py-3.5 text-xs font-bold uppercase tracking-[0.15em] text-[#EFEDE8] hover:bg-[#1B3FAE] btn-swiss flex items-center gap-2 cursor-pointer w-full justify-center"
              >
                <span>CONFIRM TRIAL VIA WHATSAPP</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
