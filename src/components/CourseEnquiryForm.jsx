import { useState } from 'react';
import { Phone, MessageCircle, CheckCircle2, ChevronDown } from 'lucide-react';

export default function CourseEnquiryForm({ courseTitle }) {
  const [formData, setFormData] = useState({ name: '', phone: '', qualification: 'Graduate', address: '' });
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const validate = () => {
    const errs = {};
    if (!formData.name.trim()) errs.name = 'Please enter your full name';
    const cleanPhone = formData.phone.replace(/\D/g, '');
    if (!cleanPhone) errs.phone = 'Please enter your mobile number';
    else if (cleanPhone.length !== 10) errs.phone = 'Please enter a valid 10-digit mobile number';
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;
    const message = `Hi National Computer Centre, I want to enquire about ${courseTitle}.\nName: ${formData.name.trim()}\nMobile: ${formData.phone.trim()}\nQualification: ${formData.qualification}\nAddress: ${formData.address.trim() || 'Not provided'}`;
    window.open(`https://wa.me/919821115699?text=${encodeURIComponent(message)}`, '_blank', 'noopener,noreferrer');
    setSubmitted(true);
  };

  return (
    <div className="bg-white rounded-[20px] shadow-[0_4px_24px_rgba(11,106,168,0.1)] border border-[#F1F5F9] p-6 sm:p-8">
      <div className="mb-5">
        <span className="eyebrow-chip mb-3 inline-block">Admission Enquiry</span>
        <h2 className="font-bold text-[20px] text-[#0F172A] leading-snug">
          Enquire About <span className="text-[#0B6AA8]">This Course</span>
        </h2>
      </div>

      {submitted ? (
        <div className="py-8 text-center space-y-4">
          <CheckCircle2 className="w-12 h-12 text-[#6FBE44] mx-auto" />
          <h3 className="font-semibold text-[18px] text-[#0F172A]">Enquiry sent via WhatsApp</h3>
          <p className="text-[14px] text-[#5B6472] max-w-sm mx-auto leading-relaxed">
            Our admissions faculty for <strong>{courseTitle}</strong> will connect with you shortly with batch timings and trial availability.
          </p>
          <button onClick={() => setSubmitted(false)} className="text-[13px] font-semibold text-[#0B6AA8] underline underline-offset-4 hover:text-[#095A90]">
            Send Another Enquiry
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} noValidate className="space-y-4">
          {/* Locked course */}
          <div>
            <label className="block text-[12px] font-semibold text-[#5B6472] mb-1.5 uppercase tracking-wide">Selected Course</label>
            <input type="text" value={courseTitle} readOnly
              className="w-full rounded-lg border border-slate-200 bg-[#F7F9FC] px-4 py-2.5 text-[14px] font-semibold text-[#5B6472] cursor-default focus:outline-none select-none truncate" />
          </div>

          {/* Name */}
          <div>
            <label className="block text-[12px] font-semibold text-[#5B6472] mb-1.5 uppercase tracking-wide">Your Name *</label>
            <input type="text" required placeholder="e.g. Rahul Sharma" value={formData.name}
              onChange={(e) => { setFormData({ ...formData, name: e.target.value }); if (errors.name) setErrors({ ...errors, name: '' }); }}
              className={`w-full rounded-lg border px-4 py-2.5 text-[15px] text-[#0F172A] bg-[#F7F9FC] placeholder:text-[#5B6472]/60 focus:outline-none focus:border-[#0B6AA8] transition-colors ${errors.name ? 'border-[#0B6AA8]' : 'border-slate-200'}`}
            />
            {errors.name && <p className="mt-1 text-xs text-[#0B6AA8] font-medium">{errors.name}</p>}
          </div>

          {/* Phone */}
          <div>
            <label className="block text-[12px] font-semibold text-[#5B6472] mb-1.5 uppercase tracking-wide">Mobile Number *</label>
            <input type="tel" required maxLength={10} placeholder="10-digit mobile number" value={formData.phone}
              onChange={(e) => { const val = e.target.value.replace(/\D/g, ''); setFormData({ ...formData, phone: val }); if (errors.phone) setErrors({ ...errors, phone: '' }); }}
              className={`w-full rounded-lg border px-4 py-2.5 text-[15px] text-[#0F172A] bg-[#F7F9FC] placeholder:text-[#5B6472]/60 focus:outline-none focus:border-[#0B6AA8] transition-colors ${errors.phone ? 'border-[#0B6AA8]' : 'border-slate-200'}`}
            />
            {errors.phone && <p className="mt-1 text-xs text-[#0B6AA8] font-medium">{errors.phone}</p>}
          </div>

          {/* Qualification */}
          <div className="relative">
            <label className="block text-[12px] font-semibold text-[#5B6472] mb-1.5 uppercase tracking-wide">Educational Qualification</label>
            <div className="relative">
              <select value={formData.qualification}
                onChange={(e) => setFormData({ ...formData, qualification: e.target.value })}
                className="w-full rounded-lg border border-slate-200 bg-[#F7F9FC] px-4 py-2.5 pr-9 text-[15px] text-[#0F172A] focus:outline-none focus:border-[#0B6AA8] appearance-none cursor-pointer">
                <option value="10th">10th Standard / SSC</option>
                <option value="12th">12th Standard / HSC</option>
                <option value="Diploma">Diploma Student / Graduate</option>
                <option value="Graduate">Graduate (B.Com, B.Sc, B.A, B.E, IT)</option>
                <option value="Post Graduate">Post Graduate / Working Professional</option>
                <option value="Other">Other / School Student</option>
              </select>
              <ChevronDown className="w-4 h-4 text-[#5B6472] absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>
          </div>

          {/* Address */}
          <div>
            <label className="block text-[12px] font-semibold text-[#5B6472] mb-1.5 uppercase tracking-wide">Locality (Optional)</label>
            <textarea rows={2} placeholder="e.g. Zaver Road, Mulund West / Thane"
              value={formData.address}
              onChange={(e) => setFormData({ ...formData, address: e.target.value })}
              className="w-full rounded-lg border border-slate-200 bg-[#F7F9FC] px-4 py-2.5 text-[15px] text-[#0F172A] placeholder:text-[#5B6472]/60 focus:outline-none focus:border-[#0B6AA8] resize-none transition-colors" />
          </div>

          {/* Buttons */}
          <div className="pt-1 grid grid-cols-1 sm:grid-cols-2 gap-3">
            <button type="submit"
              className="rounded-full bg-[#0B6AA8] px-4 py-3 text-[13px] font-semibold text-white hover:bg-[#095A90] btn-swiss cursor-pointer flex items-center justify-center gap-2">
              <MessageCircle className="w-4 h-4 text-[#6FBE44] shrink-0" />
              <span>Send on WhatsApp</span>
            </button>
            <a href="tel:+919821115699"
              className="rounded-full border-2 border-[#0B6AA8] bg-transparent px-4 py-3 text-[13px] font-semibold text-[#0B6AA8] hover:bg-[#0B6AA8] hover:text-white btn-swiss flex items-center justify-center gap-2">
              <Phone className="w-3.5 h-3.5 shrink-0" />
              <span>Call Us</span>
            </a>
          </div>
        </form>
      )}
    </div>
  );
}
