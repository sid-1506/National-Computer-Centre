import { useState, useEffect } from 'react';
import { X, ArrowRight, CheckCircle2 } from 'lucide-react';
import { COURSES } from '../data/nccData';

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
      `Hello National Computer Centre,\n\nI want to book a One Day Free Trial.\n*Name:* ${formData.name}\n*Phone:* ${formData.phone}\n*Email:* ${formData.email || 'N/A'}\n*Course:* ${formData.course || defaultCourse}\n*Preferred Slot:* ${formData.timing}`
    );

    window.open(`https://wa.me/919821115699?text=${message}`, '_blank');
    setSubmitted(true);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/60 backdrop-blur-sm">
      <div
        className="relative w-full max-w-lg bg-white text-foreground rounded-[20px] p-6 sm:p-8 border border-border shadow-2xl"
        role="dialog"
        aria-modal="true"
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full text-muted-foreground hover:text-foreground hover:bg-surface transition-colors cursor-pointer"
          aria-label="Close dialog"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="pb-5 border-b border-border pr-8">
          <span className="eyebrow-chip mb-2 inline-block">
            One Day Free Trial Booking
          </span>
          <h2 className="text-xl sm:text-2xl font-bold text-foreground leading-tight">
            Reserve Your <span className="text-primary">Lab Terminal</span>
          </h2>
          <p className="text-xs text-muted-foreground mt-1">
            Shop No. 7, Anubhav Bldg, Zaver Rd, Mulund West · Call 98211 15699
          </p>
        </div>

        {submitted ? (
          <div className="py-8 space-y-4 text-center">
            <CheckCircle2 className="w-12 h-12 text-[#6FBE44] mx-auto" />
            <h3 className="text-xl font-bold text-foreground">
              Booking Sent via WhatsApp
            </h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              We have received your trial request for <strong>{formData.course || defaultCourse}</strong>. Our faculty will reserve a computer terminal for you.
            </p>
            <button
              onClick={onClose}
              className="rounded-full bg-primary px-7 py-3 text-xs font-semibold uppercase tracking-wider text-white hover:bg-primary-hover btn-swiss cursor-pointer"
            >
              Close
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="py-5 space-y-4">
            {/* Name */}
            <div>
              <label htmlFor="modal-name" className="block text-[12px] font-semibold text-muted-foreground mb-1.5 uppercase tracking-wide">
                Full Name *
              </label>
              <input
                type="text"
                id="modal-name"
                name="name"
                required
                value={formData.name}
                onChange={handleChange}
                placeholder="Your full name"
                className="w-full rounded-lg border border-border bg-surface px-4 py-2.5 text-[15px] text-foreground focus:border-primary focus:outline-none transition-colors"
              />
            </div>

            {/* Phone */}
            <div>
              <label htmlFor="modal-phone" className="block text-[12px] font-semibold text-muted-foreground mb-1.5 uppercase tracking-wide">
                Phone (WhatsApp) *
              </label>
              <input
                type="tel"
                id="modal-phone"
                name="phone"
                required
                value={formData.phone}
                onChange={handleChange}
                placeholder="+91 98211 15699"
                className="w-full rounded-lg border border-border bg-surface px-4 py-2.5 text-[15px] text-foreground focus:border-primary focus:outline-none transition-colors"
              />
            </div>

            {/* Course */}
            <div>
              <label htmlFor="modal-course" className="block text-[12px] font-semibold text-muted-foreground mb-1.5 uppercase tracking-wide">
                Course Track *
              </label>
              <select
                id="modal-course"
                name="course"
                value={formData.course || defaultCourse}
                onChange={handleChange}
                className="w-full rounded-lg border border-border bg-surface px-4 py-2.5 text-[15px] text-foreground focus:border-primary focus:outline-none cursor-pointer"
              >
                {COURSES.map((c) => (
                  <option key={c.id} value={c.name}>
                    {c.index} — {c.name} ({c.duration})
                  </option>
                ))}
                <option value="Anniversary Combo Offer (Up to 50% Off)">
                  ★ 28th Anniversary Combo (Up to 50% Off)
                </option>
              </select>
            </div>

            {/* Timing */}
            <div>
              <label htmlFor="modal-timing" className="block text-[12px] font-semibold text-muted-foreground mb-1.5 uppercase tracking-wide">
                Preferred Time Slot
              </label>
              <select
                id="modal-timing"
                name="timing"
                value={formData.timing}
                onChange={handleChange}
                className="w-full rounded-lg border border-border bg-surface px-4 py-2.5 text-[15px] text-foreground focus:border-primary focus:outline-none cursor-pointer"
              >
                <option value="Morning (07:00 AM – 11:00 AM)">Morning (07:00 AM – 11:00 AM)</option>
                <option value="Afternoon (11:00 AM – 04:00 PM)">Afternoon (11:00 AM – 04:00 PM)</option>
                <option value="Evening (04:00 PM – 09:00 PM)">Evening (04:00 PM – 09:00 PM)</option>
                <option value="Sunday Batch (08:00 AM – 01:00 PM)">Sunday Batch (08:00 AM – 01:00 PM)</option>
              </select>
            </div>

            {/* Submit */}
            <div className="pt-2">
              <button
                type="submit"
                className="rounded-full bg-primary px-7 py-3.5 text-[14px] font-semibold text-white hover:bg-primary-hover btn-swiss flex items-center gap-2 cursor-pointer w-full justify-center"
              >
                <span>Confirm Trial via WhatsApp</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
