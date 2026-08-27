import { useState } from 'react';
import { Phone, MessageCircle, CheckCircle2, ChevronDown } from 'lucide-react';

export default function CourseEnquiryForm({ courseTitle }) {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    qualification: 'Graduate',
    address: '',
  });

  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const validate = () => {
    const errs = {};
    if (!formData.name.trim()) {
      errs.name = 'Please enter your full name';
    }

    const cleanPhone = formData.phone.replace(/\D/g, '');
    if (!cleanPhone) {
      errs.phone = 'Please enter your mobile number';
    } else if (cleanPhone.length !== 10) {
      errs.phone = 'Please enter a valid 10-digit mobile number';
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    const message = `Hi National Computer Centre, I want to enquire about ${courseTitle}.
Name: ${formData.name.trim()}
Mobile: ${formData.phone.trim()}
Qualification: ${formData.qualification}
Address: ${formData.address.trim() || 'Not provided'}`;

    const url = `https://wa.me/919821115699?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank', 'noopener,noreferrer');
    setSubmitted(true);
  };

  return (
    <div className="border border-[#111111]/15 rounded-3xl p-6 sm:p-8 bg-[#EFEDE8]/60 backdrop-blur-sm">
      <div className="pb-4 mb-5 border-b border-[#111111]/15">
        <span className="section-label text-primary font-bold block mb-1">
          ADMISSION ENQUIRY
        </span>
        <h2 className="font-display text-2xl sm:text-3xl uppercase tracking-[-0.02em] text-[#111111] leading-[1.02]">
          ENQUIRE ABOUT THIS COURSE
        </h2>
      </div>

      {submitted ? (
        <div className="py-8 text-center space-y-4">
          <CheckCircle2 className="w-10 h-10 text-primary mx-auto" />
          <h3 className="font-display text-xl sm:text-2xl uppercase tracking-[-0.02em] text-[#111111]">
            ENQUIRY INITIATED VIA WHATSAPP
          </h3>
          <p className="text-xs sm:text-sm text-[#111111]/70 max-w-sm mx-auto leading-relaxed">
            Our admissions faculty for <strong>{courseTitle}</strong> will connect with you on WhatsApp with batch timings and trial availability.
          </p>
          <button
            onClick={() => setSubmitted(false)}
            className="mt-2 text-xs font-semibold tracking-wider uppercase underline underline-offset-4 text-[#111111] hover:text-primary"
          >
            SEND ANOTHER ENQUIRY
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} noValidate className="space-y-4 sm:space-y-5">
          {/* Locked Selected Course Field */}
          <div>
            <div className="flex items-center justify-between pb-1">
              <label className="text-[11px] uppercase tracking-[0.12em] text-[#111111]/60 font-semibold">
                SELECTED COURSE
              </label>
              <span className="text-[10px] font-mono uppercase tracking-wider text-[#111111]/40">
                LOCKED
              </span>
            </div>
            <input
              type="text"
              value={courseTitle}
              readOnly
              className="w-full bg-transparent border-b border-[#111111]/15 py-2 text-sm sm:text-base font-semibold text-[#111111]/75 cursor-default focus:outline-none select-none truncate"
            />
          </div>

          {/* Name Field */}
          <div>
            <label className="block text-[11px] uppercase tracking-[0.12em] text-[#111111]/60 font-semibold mb-1">
              NAME *
            </label>
            <input
              type="text"
              required
              placeholder="e.g. Rahul Sharma"
              value={formData.name}
              onChange={(e) => {
                setFormData({ ...formData, name: e.target.value });
                if (errors.name) setErrors({ ...errors, name: '' });
              }}
              className={`w-full bg-transparent border-b py-2 text-base text-[#111111] placeholder:text-[#111111]/30 focus:outline-none transition-colors ${
                errors.name ? 'border-[#111111]' : 'border-[#111111]/15 focus:border-brand-cyan'
              }`}
            />
            {errors.name && (
              <p className="mt-1 text-xs italic text-[#111111]">{errors.name}</p>
            )}
          </div>

          {/* Mobile Number Field */}
          <div>
            <label className="block text-[11px] uppercase tracking-[0.12em] text-[#111111]/60 font-semibold mb-1">
              MOBILE NUMBER *
            </label>
            <input
              type="tel"
              required
              maxLength={10}
              placeholder="10-digit mobile number"
              value={formData.phone}
              onChange={(e) => {
                const val = e.target.value.replace(/\D/g, '');
                setFormData({ ...formData, phone: val });
                if (errors.phone) setErrors({ ...errors, phone: '' });
              }}
              className={`w-full bg-transparent border-b py-2 text-base text-[#111111] placeholder:text-[#111111]/30 focus:outline-none transition-colors ${
                errors.phone ? 'border-[#111111]' : 'border-[#111111]/15 focus:border-brand-cyan'
              }`}
            />
            {errors.phone && (
              <p className="mt-1 text-xs italic text-[#111111]">{errors.phone}</p>
            )}
          </div>

          {/* Qualification Field */}
          <div className="relative">
            <label className="block text-[11px] uppercase tracking-[0.12em] text-[#111111]/60 font-semibold mb-1">
              EDUCATIONAL QUALIFICATION
            </label>
            <div className="relative">
              <select
                value={formData.qualification}
                onChange={(e) => setFormData({ ...formData, qualification: e.target.value })}
                className="w-full bg-transparent border-b border-[#111111]/15 py-2 pr-8 text-sm sm:text-base text-[#111111] focus:outline-none focus:border-brand-cyan appearance-none cursor-pointer"
              >
                <option value="10th">10th Standard / SSC</option>
                <option value="12th">12th Standard / HSC</option>
                <option value="Diploma">Diploma Student / Graduate</option>
                <option value="Graduate">Graduate (B.Com, B.Sc, B.A, B.E, IT)</option>
                <option value="Post Graduate">Post Graduate / Working Professional</option>
                <option value="Other">Other / School Student</option>
              </select>
              <ChevronDown className="w-4 h-4 text-[#111111]/60 absolute right-1 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>
          </div>

          {/* Locality / Address Field */}
          <div>
            <label className="block text-[11px] uppercase tracking-[0.12em] text-[#111111]/60 font-semibold mb-1">
              LOCALITY / ADDRESS (OPTIONAL)
            </label>
            <textarea
              rows={2}
              placeholder="e.g. Zaver Road, Mulund West / Thane"
              value={formData.address}
              onChange={(e) => setFormData({ ...formData, address: e.target.value })}
              className="w-full bg-transparent border-b border-[#111111]/15 py-2 text-sm sm:text-base text-[#111111] placeholder:text-[#111111]/30 focus:outline-none focus:border-brand-cyan resize-none"
            />
          </div>

          {/* Buttons Row: Side by Side on sm+, Stacked on Mobile */}
          <div className="pt-2 grid grid-cols-1 sm:grid-cols-2 gap-3">
            <button
              type="submit"
              className="rounded-full bg-[#111111] px-4 py-3.5 text-[11px] font-bold uppercase tracking-[0.12em] text-[#EFEDE8] hover:bg-primary btn-swiss cursor-pointer flex items-center justify-center gap-1.5"
            >
              <MessageCircle className="w-4 h-4 text-brand-green shrink-0" />
              <span>SEND ON WHATSAPP</span>
            </button>

            <a
              href="tel:+919821115699"
              className="rounded-full border border-[#111111] bg-transparent px-4 py-3.5 text-[11px] font-bold uppercase tracking-[0.12em] text-[#111111] hover:bg-[#111111] hover:text-[#EFEDE8] btn-swiss flex items-center justify-center gap-1.5"
            >
              <Phone className="w-3.5 h-3.5 shrink-0" />
              <span>CALL US</span>
            </a>
          </div>
        </form>
      )}
    </div>
  );
}
