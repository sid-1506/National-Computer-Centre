import { useState } from 'react';
import { z } from 'zod';
import { MessageCircle, Phone, ChevronDown, CheckCircle2 } from 'lucide-react';
import { categories, courses } from '../data/courses';

const enquirySchema = z.object({
  name: z
    .string()
    .trim()
    .min(1, 'Please enter your name')
    .max(60, 'Name cannot exceed 60 characters'),
  phone: z
    .string()
    .trim()
    .regex(/^\d{10}$/, 'Please enter a valid 10-digit mobile number'),
  course: z
    .string()
    .trim()
    .min(1, 'Please select a course'),
});

export default function CompactEnquiryForm({ defaultCourse = 'Certificate Course in MS-CIT', className = '' }) {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    course: defaultCourse,
  });

  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (field, value) => {
    let cleanValue = value;
    if (field === 'phone') {
      cleanValue = value.replace(/\D/g, '').slice(0, 10);
    } else if (field === 'name') {
      cleanValue = value.slice(0, 60);
    }

    setFormData((prev) => ({ ...prev, [field]: cleanValue }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const result = enquirySchema.safeParse(formData);
    if (!result.success) {
      const fieldErrors = {};
      result.error.errors.forEach((err) => {
        if (err.path[0]) {
          fieldErrors[err.path[0]] = err.message;
        }
      });
      setErrors(fieldErrors);
      return;
    }

    const { name, phone, course } = result.data;
    const message = `Hi National Computer Centre, I am ${name}. My number is ${phone}. I am interested in the ${course} course. Please share details.`;
    const whatsappUrl = `https://wa.me/919821115699?text=${encodeURIComponent(message)}`;

    window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
    setSubmitted(true);
  };

  return (
    <div
      className={`bg-white rounded-2xl p-6 sm:p-7 shadow-[0_10px_35px_rgba(0,0,0,0.12)] border border-slate-100 w-full max-w-[380px] text-left transition-all ${className}`}
    >
      {submitted ? (
        <div className="py-6 text-center space-y-3">
          <CheckCircle2 className="w-12 h-12 text-[#6FBE44] mx-auto" />
          <h3 className="text-[18px] font-bold text-[#0F172A]">
            Enquiry Sent
          </h3>
          <p className="text-[14px] text-[#5B6472] leading-relaxed">
            Our faculty will connect with you on WhatsApp with batch timings and course curriculum.
          </p>
          <button
            onClick={() => {
              setSubmitted(false);
              setFormData({ name: '', phone: '', course: defaultCourse });
            }}
            className="text-[13px] font-semibold text-[#0B6AA8] underline underline-offset-4 hover:text-[#095A90] cursor-pointer"
          >
            Submit Another Enquiry
          </button>
        </div>
      ) : (
        <>
          {/* Card Header */}
          <div className="mb-5">
            <h3 className="text-[20px] font-bold text-[#0F172A] leading-tight mb-1">
              Enquire Now
            </h3>
            <p className="text-[13px] text-[#64748B] font-medium">
              Get course details on WhatsApp
            </p>
          </div>

          <form onSubmit={handleSubmit} noValidate className="space-y-3.5">
            {/* Field 1: Name */}
            <div>
              <label htmlFor="compact-name" className="block text-[11px] font-bold text-[#5B6472] uppercase tracking-wider mb-1">
                Name *
              </label>
              <input
                id="compact-name"
                type="text"
                required
                maxLength={60}
                placeholder="Your Full Name"
                value={formData.name}
                onChange={(e) => handleChange('name', e.target.value)}
                className={`w-full rounded-xl border px-3.5 py-2.5 text-[14px] text-[#0F172A] bg-[#F7F9FC] placeholder:text-[#94A3B8] focus:outline-none focus:bg-white focus:border-[#0B6AA8] transition-colors ${
                  errors.name ? 'border-[#0B6AA8]' : 'border-slate-200'
                }`}
              />
              {errors.name && (
                <p className="mt-1 text-[11px] text-[#0B6AA8] font-medium leading-tight">
                  {errors.name}
                </p>
              )}
            </div>

            {/* Field 2: Mobile Number */}
            <div>
              <label htmlFor="compact-phone" className="block text-[11px] font-bold text-[#5B6472] uppercase tracking-wider mb-1">
                Mobile Number *
              </label>
              <input
                id="compact-phone"
                type="tel"
                required
                maxLength={10}
                placeholder="10-digit mobile number"
                value={formData.phone}
                onChange={(e) => handleChange('phone', e.target.value)}
                className={`w-full rounded-xl border px-3.5 py-2.5 text-[14px] text-[#0F172A] bg-[#F7F9FC] placeholder:text-[#94A3B8] focus:outline-none focus:bg-white focus:border-[#0B6AA8] transition-colors ${
                  errors.phone ? 'border-[#0B6AA8]' : 'border-slate-200'
                }`}
              />
              {errors.phone && (
                <p className="mt-1 text-[11px] text-[#0B6AA8] font-medium leading-tight">
                  {errors.phone}
                </p>
              )}
            </div>

            {/* Field 3: Select Course */}
            <div className="relative">
              <label htmlFor="compact-course" className="block text-[11px] font-bold text-[#5B6472] uppercase tracking-wider mb-1">
                Select Course *
              </label>
              <div className="relative">
                <select
                  id="compact-course"
                  value={formData.course}
                  onChange={(e) => handleChange('course', e.target.value)}
                  className={`w-full rounded-xl border px-3.5 py-2.5 pr-8 text-[14px] text-[#0F172A] bg-[#F7F9FC] focus:outline-none focus:bg-white focus:border-[#0B6AA8] appearance-none cursor-pointer truncate ${
                    errors.course ? 'border-[#0B6AA8]' : 'border-slate-200'
                  }`}
                >
                  {categories.map((cat) => {
                    const catCourses = courses.filter((c) => c.categorySlug === cat.slug);
                    return (
                      <optgroup key={cat.slug} label={cat.name}>
                        {catCourses.map((c) => (
                          <option key={c.slug} value={c.title}>
                            {c.title} ({c.duration})
                          </option>
                        ))}
                      </optgroup>
                    );
                  })}
                </select>
                <ChevronDown className="w-4 h-4 text-slate-500 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
              </div>
              {errors.course && (
                <p className="mt-1 text-[11px] text-[#0B6AA8] font-medium leading-tight">
                  {errors.course}
                </p>
              )}
            </div>

            {/* Primary Button: Send on WhatsApp */}
            <div className="pt-1.5 space-y-2.5">
              <button
                type="submit"
                className="w-full rounded-full bg-[#0B6AA8] hover:bg-[#095A90] text-white py-3 px-5 text-[14px] font-bold flex items-center justify-center gap-2 shadow-md hover:shadow-lg transition-all cursor-pointer"
              >
                <MessageCircle className="w-4 h-4 text-[#6FBE44] shrink-0" />
                <span>Send on WhatsApp</span>
              </button>

              {/* Secondary Button: Call Us */}
              <a
                href="tel:+919821115699"
                className="w-full rounded-full border border-[#0B6AA8] text-[#0B6AA8] hover:bg-[#0B6AA8] hover:text-white py-2.5 px-5 text-[13px] font-bold flex items-center justify-center gap-2 transition-all"
              >
                <Phone className="w-3.5 h-3.5 shrink-0" />
                <span>Call Us (+91 98211 15699)</span>
              </a>
            </div>
          </form>
        </>
      )}
    </div>
  );
}
