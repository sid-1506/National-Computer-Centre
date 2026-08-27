import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Phone, MapPin, Clock, MessageSquare, ChevronDown, CheckCircle2, Navigation } from 'lucide-react';
import { BUSINESS_INFO } from '../data/nccData';
import { categories, courses } from '../data/courses';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    course: 'Certificate Course in MS-CIT',
    qualification: 'Graduate',
    message: '',
  });

  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    document.title = 'Contact & Admissions | National Computer Centre Mulund West';
    let metaDesc = document.querySelector('meta[name="description"]');
    if (!metaDesc) {
      metaDesc = document.createElement('meta');
      metaDesc.name = 'description';
      document.head.appendChild(metaDesc);
    }
    metaDesc.content = 'Visit National Computer Centre at Zaver Road, Mulund West. Call +91 98211 15699 or message on WhatsApp to schedule a 1-day free practical trial.';
  }, []);

  const validate = () => {
    const errs = {};
    if (!formData.name.trim()) errs.name = 'Please enter your full name';
    const cleanPhone = formData.phone.replace(/\D/g, '');
    if (!cleanPhone) {
      errs.phone = 'Please enter your mobile number';
    } else if (cleanPhone.length !== 10) {
      errs.phone = 'Please enter a valid 10-digit mobile number';
    }
    if (!formData.course) errs.course = 'Please select a course';

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    const text = `Hi National Computer Centre, I want to enquire about admissions & book a trial.
Name: ${formData.name.trim()}
Mobile: ${formData.phone.trim()}
Course: ${formData.course}
Qualification: ${formData.qualification}
${formData.message.trim() ? `Notes: ${formData.message.trim()}` : ''}`;

    window.open(`https://wa.me/919821115699?text=${encodeURIComponent(text)}`, '_blank', 'noopener,noreferrer');
    setSubmitted(true);
  };

  return (
    <div className="pt-32 sm:pt-36 pb-24 bg-[#EFEDE8] text-[#111111] min-h-screen">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <nav className="text-[11px] font-mono tracking-widest uppercase text-[#111111]/50 mb-8 flex items-center gap-2">
          <Link to="/" className="hover:text-[#111111] transition-colors">HOME</Link>
          <span>/</span>
          <span className="text-[#111111] font-semibold">CONTACT</span>
        </nav>

        {/* Section Header */}
        <div className="flex items-center justify-between pb-6 border-b border-[#111111]/15 mb-8">
          <span className="section-label text-[#111111]">ADMISSIONS & LOCATION</span>
          <span className="section-label text-[#111111]/60">NO OBLIGATION · 1-ON-1 TRIAL</span>
        </div>

        {/* Single Page H1 Heading */}
        <div className="mb-12">
          <h1 className="font-display text-4xl sm:text-6xl lg:text-7xl uppercase tracking-[-0.02em] text-[#111111] leading-[1.02] md:leading-[0.98] pb-[0.08em]">
            VISIT OUR MULUND WEST CENTRE
          </h1>
          <p className="mt-3 text-base sm:text-lg text-[#111111]/70 max-w-3xl leading-relaxed">
            Conveniently located 2 minutes from Mulund Railway Station on Zaver Road. Walk in for counselling or book your 1-day free computer trial.
          </p>
        </div>

        {/* 2-Column Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left Column: Full Hairline Enquiry Form */}
          <div className="lg:col-span-7">
            <div className="border border-[#111111]/15 rounded-2xl p-6 sm:p-8 lg:p-10 bg-[#EFEDE8]">
              <div className="pb-4 mb-6 border-b border-[#111111]/15">
                <span className="section-label text-primary font-bold block mb-1">
                  BOOK FREE PRACTICAL TRIAL
                </span>
                <h2 className="font-display text-2xl sm:text-3xl uppercase tracking-[-0.02em] text-[#111111] leading-[1.02]">
                  ONLINE ADMISSION INQUIRY
                </h2>
              </div>

              {submitted ? (
                <div className="py-10 text-center space-y-4">
                  <CheckCircle2 className="w-12 h-12 text-primary mx-auto" />
                  <h3 className="font-display text-2xl sm:text-3xl uppercase tracking-[-0.02em] text-[#111111]">
                    TRIAL REQUEST INITIATED
                  </h3>
                  <p className="text-sm text-[#111111]/70 max-w-md mx-auto leading-relaxed">
                    Thank you! Our faculty coordinator will connect with you on WhatsApp with batch schedules, fee structure, and slot confirmation.
                  </p>
                  <button
                    onClick={() => setSubmitted(false)}
                    className="mt-4 text-xs font-semibold tracking-wider uppercase underline underline-offset-4 text-[#111111] hover:text-primary"
                  >
                    SUBMIT ANOTHER INQUIRY
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} noValidate className="space-y-6">
                  {/* Name & Mobile */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-[11px] uppercase tracking-[0.12em] text-[#111111]/60 font-semibold mb-1">
                        YOUR NAME *
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="Enter your full name"
                        value={formData.name}
                        onChange={(e) => {
                          setFormData({ ...formData, name: e.target.value });
                          if (errors.name) setErrors({ ...errors, name: '' });
                        }}
                        className={`w-full bg-transparent border-b py-2.5 text-base text-[#111111] placeholder:text-[#111111]/30 focus:outline-none transition-colors ${
                          errors.name ? 'border-[#111111]' : 'border-[#111111]/20 focus:border-brand-cyan'
                        }`}
                      />
                      {errors.name && (
                        <p className="mt-1.5 text-xs italic text-[#111111]">{errors.name}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-[11px] uppercase tracking-[0.12em] text-[#111111]/60 font-semibold mb-1">
                        MOBILE NUMBER *
                      </label>
                      <input
                        type="tel"
                        required
                        maxLength={10}
                        placeholder="10-digit phone number"
                        value={formData.phone}
                        onChange={(e) => {
                          const val = e.target.value.replace(/\D/g, '');
                          setFormData({ ...formData, phone: val });
                          if (errors.phone) setErrors({ ...errors, phone: '' });
                        }}
                        className={`w-full bg-transparent border-b py-2.5 text-base text-[#111111] placeholder:text-[#111111]/30 focus:outline-none transition-colors ${
                          errors.phone ? 'border-[#111111]' : 'border-[#111111]/20 focus:border-brand-cyan'
                        }`}
                      />
                      {errors.phone && (
                        <p className="mt-1.5 text-xs italic text-[#111111]">{errors.phone}</p>
                      )}
                    </div>
                  </div>

                  {/* Course Dropdown (All 56 Courses by Category) */}
                  <div className="relative">
                    <label className="block text-[11px] uppercase tracking-[0.12em] text-[#111111]/60 font-semibold mb-1">
                      SELECT COURSE OF INTEREST *
                    </label>
                    <div className="relative">
                      <select
                        value={formData.course}
                        onChange={(e) => {
                          setFormData({ ...formData, course: e.target.value });
                          if (errors.course) setErrors({ ...errors, course: '' });
                        }}
                        className="w-full bg-transparent border-b border-[#111111]/20 py-2.5 pr-8 text-base text-[#111111] focus:outline-none focus:border-brand-cyan appearance-none cursor-pointer truncate"
                      >
                        {categories.map((cat) => {
                          const catCourses = courses.filter((c) => c.categorySlug === cat.slug);
                          return (
                            <optgroup key={cat.slug} label={cat.name.toUpperCase()}>
                              {catCourses.map((c) => (
                                <option key={c.slug} value={c.title}>
                                  {c.title} ({c.duration})
                                </option>
                              ))}
                            </optgroup>
                          );
                        })}
                      </select>
                      <ChevronDown className="w-4 h-4 text-[#111111]/60 absolute right-1 top-1/2 -translate-y-1/2 pointer-events-none" />
                    </div>
                  </div>

                  {/* Qualification */}
                  <div>
                    <label className="block text-[11px] uppercase tracking-[0.12em] text-[#111111]/60 font-semibold mb-1">
                      EDUCATIONAL BACKGROUND
                    </label>
                    <select
                      value={formData.qualification}
                      onChange={(e) => setFormData({ ...formData, qualification: e.target.value })}
                      className="w-full bg-transparent border-b border-[#111111]/20 py-2.5 text-base text-[#111111] focus:outline-none focus:border-brand-cyan cursor-pointer"
                    >
                      <option value="10th">10th Standard / SSC</option>
                      <option value="12th">12th Standard / HSC</option>
                      <option value="Diploma">Diploma Student</option>
                      <option value="Graduate">Graduate (B.Com, B.Sc, B.A, B.E)</option>
                      <option value="Post Graduate">Post Graduate / Working Professional</option>
                      <option value="Other">School Student / Hobbyist</option>
                    </select>
                  </div>

                  {/* Message */}
                  <div>
                    <label className="block text-[11px] uppercase tracking-[0.12em] text-[#111111]/60 font-semibold mb-1">
                      ADDITIONAL NOTES / PREFERRED TIMING (OPTIONAL)
                    </label>
                    <textarea
                      rows={3}
                      placeholder="e.g. Morning batch preferred, want information about weekend timings..."
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="w-full bg-transparent border-b border-[#111111]/20 py-2.5 text-base text-[#111111] placeholder:text-[#111111]/30 focus:outline-none focus:border-brand-cyan resize-none"
                    />
                  </div>

                  {/* Submit buttons */}
                  <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
                    <button
                      type="submit"
                      className="rounded-full bg-[#111111] px-8 py-3.5 text-xs font-bold uppercase tracking-[0.15em] text-[#EFEDE8] hover:bg-primary btn-swiss cursor-pointer flex items-center justify-center gap-2"
                    >
                      <MessageSquare className="w-4 h-4 text-brand-green" />
                      <span>SUBMIT ON WHATSAPP</span>
                    </button>

                    <a
                      href="tel:+919821115699"
                      className="rounded-full border border-[#111111] bg-transparent px-6 py-3.5 text-xs font-bold uppercase tracking-[0.15em] text-[#111111] hover:bg-[#111111] hover:text-[#EFEDE8] btn-swiss flex items-center justify-center gap-2"
                    >
                      <Phone className="w-3.5 h-3.5" />
                      <span>CALL +91 98211 15699</span>
                    </a>
                  </div>
                </form>
              )}
            </div>
          </div>

          {/* Right Column: Address, Map, Timings, Direct Contacts */}
          <div className="lg:col-span-5 space-y-8">
            {/* Address Block */}
            <div className="p-6 sm:p-8 border border-[#111111]/15 rounded-2xl bg-[#EFEDE8] space-y-4">
              <span className="section-label text-primary font-bold block flex items-center gap-2">
                <MapPin className="w-4 h-4" />
                CENTRE ADDRESS
              </span>
              <p className="text-base text-[#111111] leading-relaxed font-mono">
                {BUSINESS_INFO.address.shop}<br />
                {BUSINESS_INFO.address.street}<br />
                {BUSINESS_INFO.address.landmark}<br />
                {BUSINESS_INFO.address.area}, {BUSINESS_INFO.address.city} {BUSINESS_INFO.address.pincode}
              </p>
              <a
                href="https://maps.google.com/?q=National+Computer+Centre+Mulund+West"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-primary hover:text-brand-cyan hover:underline pt-2"
              >
                <Navigation className="w-3.5 h-3.5" />
                <span>OPEN IN GOOGLE MAPS ↗</span>
              </a>
            </div>

            {/* Direct Phone Numbers & Timings */}
            <div className="p-6 sm:p-8 border border-[#111111]/15 rounded-2xl bg-[#EFEDE8] space-y-5">
              <div>
                <span className="section-label text-[#111111]/50 block mb-2 flex items-center gap-2">
                  <Phone className="w-3.5 h-3.5 text-primary" />
                  TELEPHONE LINES
                </span>
                <div className="space-y-1.5 font-mono text-sm text-[#111111]">
                  <a href="tel:+919821115699" className="block hover:text-primary transition-colors">
                    +91 98211 15699 (Mobile / WhatsApp)
                  </a>
                  <a href="tel:+919820615699" className="block hover:text-primary transition-colors">
                    +91 98206 15699 (Director Direct)
                  </a>
                  <a href="tel:+912225608746" className="block hover:text-primary transition-colors">
                    +91 22 2560 8746 (Landline Lab)
                  </a>
                </div>
              </div>

              <div className="pt-4 border-t border-[#111111]/15">
                <span className="section-label text-[#111111]/50 block mb-2 flex items-center gap-2">
                  <Clock className="w-3.5 h-3.5 text-primary" />
                  OPENING TIMINGS
                </span>
                <p className="text-xs font-mono text-[#111111]/80 space-y-1">
                  <span className="block">Monday – Saturday: 07:00 AM – 09:00 PM</span>
                  <span className="block">Sunday: 08:00 AM – 01:00 PM</span>
                </p>
              </div>
            </div>

            {/* Google Map Interactive Iframe Embed */}
            <div className="border border-[#111111]/15 rounded-2xl overflow-hidden aspect-[16/10] bg-[#111111]">
              <iframe
                title="National Computer Centre Google Maps Location"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3768.4116246328224!2d72.9543113!3d19.1726001!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7b8f9e61c3bc7%3A0x8670fa9c1df5c4cf!2sNational%20Computer%20Centre!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
