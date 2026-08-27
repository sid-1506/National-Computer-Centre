import { useState } from 'react';
import { Phone, MapPin, Clock, ArrowRight, CheckCircle2 } from 'lucide-react';
import { COURSES, BUSINESS_INFO } from '../data/nccData';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    course: 'MS-CIT',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.phone) return;

    const text = encodeURIComponent(
      `Hello National Computer Centre,\n\nI want to book a One Day Free Trial.\n*Name:* ${formData.name}\n*Phone:* ${formData.phone}\n*Email:* ${formData.email || 'N/A'}\n*Selected Course:* ${formData.course}\n${formData.message ? `*Notes:* ${formData.message}` : ''}`
    );

    window.open(`https://wa.me/919821115699?text=${text}`, '_blank');
    setSubmitted(true);
  };

  return (
    <section id="contact" className="py-20 lg:py-32 bg-[#EFEDE8] text-[#111111]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex items-center justify-between pb-6 border-b border-[#111111]/15 mb-12">
          <span className="section-label text-[#111111]">08 — ADMISSIONS & TRIAL</span>
          <span className="section-label text-[#111111]/60">NO OBLIGATION · 1-ON-1 PC</span>
        </div>

        {/* Section Heading */}
        <div className="mb-16">
          <h2 className="font-display text-4xl sm:text-6xl lg:text-7xl uppercase tracking-[-0.02em] text-[#111111] leading-[1.02] md:leading-[0.98] pb-[0.08em]">
            BOOK YOUR ONE DAY FREE TRIAL
          </h2>
          <p className="mt-4 text-base text-[#111111]/70 max-w-2xl">
            Test our teaching, operate a dedicated computer terminal, and meet our faculty before taking admission.
          </p>
        </div>

        {/* Two Column Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left Column: Minimal Underline-Only Form */}
          <div className="lg:col-span-6">
            {submitted ? (
              <div className="p-8 border border-[#111111]/20 rounded-2xl bg-white space-y-4">
                <div className="flex items-center gap-3 text-primary">
                  <CheckCircle2 className="w-6 h-6" />
                  <span className="font-display text-2xl uppercase tracking-[-0.02em] text-[#111111] leading-[1.02] md:leading-[0.98] pb-[0.04em]">
                    TRIAL REQUEST INITIATED
                  </span>
                </div>
                <p className="text-sm text-[#111111]/80 leading-relaxed">
                  Thank you, <strong>{formData.name}</strong>. We have opened WhatsApp with your booking details. Our admissions team at Zaver Road will confirm your trial slot shortly.
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="text-xs font-bold uppercase tracking-wider text-primary underline underline-offset-4"
                >
                  SUBMIT ANOTHER INQUIRY
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-8">
                {/* Full Name */}
                <div className="space-y-1">
                  <label htmlFor="name" className="section-label text-[#111111]/60 block">
                    FULL NAME *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Enter your full name"
                    className="w-full bg-transparent py-3 border-b border-[#111111]/30 text-base sm:text-lg text-[#111111] placeholder:text-[#111111]/30 focus:border-brand-cyan focus:outline-none transition-colors"
                  />
                </div>

                {/* Phone Number */}
                <div className="space-y-1">
                  <label htmlFor="phone" className="section-label text-[#111111]/60 block">
                    PHONE NUMBER (WHATSAPP) *
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    required
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="+91 98211 15699"
                    className="w-full bg-transparent py-3 border-b border-[#111111]/30 text-base sm:text-lg text-[#111111] placeholder:text-[#111111]/30 focus:border-brand-cyan focus:outline-none transition-colors"
                  />
                </div>

                {/* Email Address */}
                <div className="space-y-1">
                  <label htmlFor="email" className="section-label text-[#111111]/60 block">
                    EMAIL ADDRESS
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="name@example.com"
                    className="w-full bg-transparent py-3 border-b border-[#111111]/30 text-base sm:text-lg text-[#111111] placeholder:text-[#111111]/30 focus:border-brand-cyan focus:outline-none transition-colors"
                  />
                </div>

                {/* Course Selection */}
                <div className="space-y-1">
                  <label htmlFor="course" className="section-label text-[#111111]/60 block">
                    COURSE INTEREST *
                  </label>
                  <select
                    id="course"
                    name="course"
                    value={formData.course}
                    onChange={handleChange}
                    className="w-full bg-transparent py-3 border-b border-[#111111]/30 text-base sm:text-lg text-[#111111] focus:border-brand-cyan focus:outline-none transition-colors cursor-pointer"
                  >
                    {COURSES.map((c) => (
                      <option key={c.id} value={c.name} className="bg-[#EFEDE8] text-[#111111]">
                        {c.index} — {c.name}
                      </option>
                    ))}
                    <option value="28th Anniversary Combo (Up to 50% Off)" className="bg-[#EFEDE8] text-[#111111]">
                      ★ 28th Anniversary Combo Offer (Up to 50% Off)
                    </option>
                  </select>
                </div>

                {/* Submit CTA */}
                <div className="pt-4">
                  <button
                    type="submit"
                    className="rounded-full bg-[#111111] px-8 py-4 text-xs font-bold uppercase tracking-[0.15em] text-[#EFEDE8] hover:bg-primary btn-swiss flex items-center justify-center gap-3 w-full sm:w-auto cursor-pointer"
                  >
                    <span>SEND TRIAL REQUEST TO WHATSAPP</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </form>
            )}
          </div>

          {/* Right Column: Address, Timings, Phone, and Map Inside One Bordered Box */}
          <div className="lg:col-span-6">
            <div className="border border-[#111111]/20 rounded-2xl p-6 sm:p-8 bg-white/60 backdrop-blur-sm space-y-8">
              {/* Address Block */}
              <div className="space-y-2">
                <span className="section-label text-[#111111]/50 block flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-primary" />
                  CENTRE LOCATION
                </span>
                <p className="font-display text-xl sm:text-2xl text-[#111111] uppercase tracking-tight">
                  {BUSINESS_INFO.address.shop}
                </p>
                <p className="text-sm text-[#111111]/80">
                  {BUSINESS_INFO.address.street}, {BUSINESS_INFO.address.landmark}, {BUSINESS_INFO.address.area}, {BUSINESS_INFO.address.city} {BUSINESS_INFO.address.pincode}
                </p>
              </div>

              {/* Timings */}
              <div className="space-y-2 pt-6 border-t border-[#111111]/15">
                <span className="section-label text-[#111111]/50 block flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-primary" />
                  CENTRE TIMINGS
                </span>
                <p className="text-sm text-[#111111]/80">
                  <strong>Monday – Saturday:</strong> {BUSINESS_INFO.timings.monSat}
                </p>
                <p className="text-sm text-[#111111]/80">
                  <strong>Sunday:</strong> {BUSINESS_INFO.timings.sun}
                </p>
              </div>

              {/* Phone Numbers */}
              <div className="space-y-2 pt-6 border-t border-[#111111]/15">
                <span className="section-label text-[#111111]/50 block flex items-center gap-1.5">
                  <Phone className="w-3.5 h-3.5 text-primary" />
                  DIRECT CONTACT
                </span>
                <div className="flex flex-wrap gap-4 pt-1">
                  <a
                    href={`tel:${BUSINESS_INFO.phone.raw}`}
                    className="font-display text-lg sm:text-xl text-[#111111] hover:text-primary transition-colors"
                  >
                    {BUSINESS_INFO.phone.display}
                  </a>
                  <span className="text-[#111111]/30">/</span>
                  <a
                    href="tel:+919820615699"
                    className="font-display text-lg sm:text-xl text-[#111111] hover:text-primary transition-colors"
                  >
                    98206 15699
                  </a>
                </div>
              </div>

              {/* Embedded Google Map */}
              <div className="pt-6 border-t border-[#111111]/15">
                <div className="w-full h-48 sm:h-56 rounded-xl overflow-hidden border border-[#111111]/15 bg-[#111111]">
                  <iframe
                    title="National Computer Centre Google Maps Location"
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3768.4239841804245!2d72.95400267597148!3d19.176669949463994!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7b9015112dcbb%3A0xe54e63f9cfbdfc91!2sNational%20Computer%20Centre!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin"
                    width="100%"
                    height="100%"
                    style={{ border: 0, filter: 'grayscale(100%) contrast(1.1)' }}
                    allowFullScreen=""
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
