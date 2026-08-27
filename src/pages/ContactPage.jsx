import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Phone, MapPin, MessageSquare, ChevronDown, CheckCircle2, Navigation } from 'lucide-react';
import { BUSINESS_INFO } from '../data/nccData';
import { categories, courses } from '../data/courses';
import { useSectionReveal } from '../hooks/useMotionReveal';

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
  const containerRef = useRef(null);

  useSectionReveal(containerRef);

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

    const text = `Hi National Computer Centre, I want to enquire about admissions & book a trial.\nName: ${formData.name.trim()}\nMobile: ${formData.phone.trim()}\nCourse: ${formData.course}\nQualification: ${formData.qualification}\n${formData.message.trim() ? `Notes: ${formData.message.trim()}` : ''}`;

    window.open(`https://wa.me/919821115699?text=${encodeURIComponent(text)}`, '_blank', 'noopener,noreferrer');
    setSubmitted(true);
  };

  return (
    <div ref={containerRef} className="pt-12 sm:pt-16 pb-20 bg-background text-foreground min-h-screen">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-[13px] font-medium text-muted-foreground mb-6">
          <Link to="/" className="hover:text-primary transition-colors">Home</Link>
          <span>/</span>
          <span className="text-foreground font-semibold">Contact</span>
        </nav>

        {/* Heading */}
        <div className="mb-10">
          <span className="reveal-eyebrow eyebrow-chip mb-3 inline-block">Admissions & Location</span>
          <h1 className="reveal-heading font-bold text-foreground leading-tight" style={{ fontSize: 'clamp(2.2rem, 4.5vw, 3.2rem)', letterSpacing: '-0.01em' }}>
            Visit Our <span className="text-primary">Mulund West</span> Centre
          </h1>
          <p className="reveal-body mt-3 text-base sm:text-lg text-muted-foreground max-w-2xl leading-relaxed">
            Conveniently located 2 minutes from Mulund Railway Station on Zaver Road. Walk in for counselling or book your 1-day free computer trial.
          </p>
        </div>

        {/* 2-Column Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
          {/* Left Column: Form Card */}
          <div className="reveal-item lg:col-span-7">
            <div className="bg-white rounded-[20px] shadow-[0_4px_24px_rgba(11,106,168,0.08)] border border-border p-6 sm:p-8">
              <div className="mb-6">
                <span className="eyebrow-chip mb-2 inline-block">Book Free Practical Trial</span>
                <h2 className="text-xl font-bold text-foreground">
                  Online Admission <span className="text-primary">Inquiry</span>
                </h2>
              </div>

              {submitted ? (
                <div className="py-10 text-center space-y-4">
                  <CheckCircle2 className="w-12 h-12 text-[#6FBE44] mx-auto" />
                  <h3 className="text-xl font-bold text-foreground">Trial Request Initiated</h3>
                  <p className="text-sm text-muted-foreground max-w-md mx-auto leading-relaxed">
                    Thank you! Our faculty coordinator will connect with you on WhatsApp with batch schedules, fee structure, and slot confirmation.
                  </p>
                  <button
                    onClick={() => setSubmitted(false)}
                    className="text-[13px] font-semibold text-primary underline underline-offset-4 hover:text-[#095A90] cursor-pointer"
                  >
                    Submit Another Inquiry
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} noValidate className="space-y-4">
                  {/* Name & Mobile */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[12px] font-semibold text-muted-foreground mb-1.5 uppercase tracking-wide">
                        Your Name *
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
                        className={`w-full rounded-lg border px-4 py-2.5 text-[15px] text-foreground bg-surface placeholder:text-muted-foreground focus:outline-none focus:border-primary transition-colors ${
                          errors.name ? 'border-primary' : 'border-border'
                        }`}
                      />
                      {errors.name && <p className="mt-1 text-xs text-primary font-medium">{errors.name}</p>}
                    </div>

                    <div>
                      <label className="block text-[12px] font-semibold text-muted-foreground mb-1.5 uppercase tracking-wide">
                        Mobile Number *
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
                        className={`w-full rounded-lg border px-4 py-2.5 text-[15px] text-foreground bg-surface placeholder:text-muted-foreground focus:outline-none focus:border-primary transition-colors ${
                          errors.phone ? 'border-primary' : 'border-border'
                        }`}
                      />
                      {errors.phone && <p className="mt-1 text-xs text-primary font-medium">{errors.phone}</p>}
                    </div>
                  </div>

                  {/* Course Dropdown */}
                  <div className="relative">
                    <label className="block text-[12px] font-semibold text-muted-foreground mb-1.5 uppercase tracking-wide">
                      Select Course of Interest *
                    </label>
                    <div className="relative">
                      <select
                        value={formData.course}
                        onChange={(e) => {
                          setFormData({ ...formData, course: e.target.value });
                          if (errors.course) setErrors({ ...errors, course: '' });
                        }}
                        className="w-full rounded-lg border border-border bg-surface px-4 py-2.5 pr-9 text-[15px] text-foreground focus:outline-none focus:border-primary appearance-none cursor-pointer"
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
                      <ChevronDown className="w-4 h-4 text-muted-foreground absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                    </div>
                  </div>

                  {/* Qualification */}
                  <div>
                    <label className="block text-[12px] font-semibold text-muted-foreground mb-1.5 uppercase tracking-wide">
                      Educational Background
                    </label>
                    <div className="relative">
                      <select
                        value={formData.qualification}
                        onChange={(e) => setFormData({ ...formData, qualification: e.target.value })}
                        className="w-full rounded-lg border border-border bg-surface px-4 py-2.5 pr-9 text-[15px] text-foreground focus:outline-none focus:border-primary appearance-none cursor-pointer"
                      >
                        <option value="10th">10th Standard / SSC</option>
                        <option value="12th">12th Standard / HSC</option>
                        <option value="Diploma">Diploma Student</option>
                        <option value="Graduate">Graduate (B.Com, B.Sc, B.A, B.E)</option>
                        <option value="Post Graduate">Post Graduate / Working Professional</option>
                        <option value="Other">School Student / Hobbyist</option>
                      </select>
                      <ChevronDown className="w-4 h-4 text-muted-foreground absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                    </div>
                  </div>

                  {/* Message */}
                  <div>
                    <label className="block text-[12px] font-semibold text-muted-foreground mb-1.5 uppercase tracking-wide">
                      Additional Notes / Preferred Timing (Optional)
                    </label>
                    <textarea
                      rows={3}
                      placeholder="e.g. Morning batch preferred, want information about weekend timings..."
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="w-full rounded-lg border border-border bg-surface px-4 py-2.5 text-[15px] text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary resize-none transition-colors"
                    />
                  </div>

                  {/* Buttons */}
                  <div className="pt-2 grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <button
                      type="submit"
                      className="rounded-full bg-primary px-6 py-3.5 text-[13px] font-semibold text-white hover:bg-primary-hover btn-swiss cursor-pointer flex items-center justify-center gap-2"
                    >
                      <MessageSquare className="w-4 h-4 text-[#6FBE44] shrink-0" />
                      <span>Submit on WhatsApp</span>
                    </button>

                    <a
                      href="tel:+919821115699"
                      className="rounded-full border-2 border-primary bg-transparent px-6 py-3.5 text-[13px] font-semibold text-primary hover:bg-primary hover:text-white btn-swiss flex items-center justify-center gap-2"
                    >
                      <Phone className="w-3.5 h-3.5 shrink-0" />
                      <span>Call Us</span>
                    </a>
                  </div>
                </form>
              )}
            </div>
          </div>

          {/* Right Column: Address & Map */}
          <div className="reveal-item lg:col-span-5 space-y-6">
            {/* Address Block */}
            <div className="p-6 sm:p-7 rounded-2xl bg-white border border-border shadow-sm space-y-3">
              <span className="eyebrow-chip mb-1 inline-flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5" />
                Centre Address
              </span>
              <p className="text-[15px] text-foreground leading-relaxed">
                {BUSINESS_INFO.address.shop}<br />
                {BUSINESS_INFO.address.street}<br />
                {BUSINESS_INFO.address.landmark}<br />
                {BUSINESS_INFO.address.area}, {BUSINESS_INFO.address.city} {BUSINESS_INFO.address.pincode}
              </p>
              <a
                href="https://maps.google.com/?q=National+Computer+Centre+Mulund+West"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-[13px] font-semibold text-primary hover:text-accent underline underline-offset-4 pt-1"
              >
                <Navigation className="w-3.5 h-3.5" />
                <span>Open in Google Maps</span>
              </a>
            </div>

            {/* Direct Contacts & Timings */}
            <div className="p-6 sm:p-7 rounded-2xl bg-white border border-border shadow-sm space-y-4">
              <div>
                <span className="text-[12px] font-semibold text-muted-foreground uppercase tracking-wider block mb-2">
                  Telephone & Email
                </span>
                <div className="space-y-1.5 text-[15px]">
                  <a href="tel:+919821115699" className="block text-foreground font-semibold hover:text-primary transition-colors">
                    +91 98211 15699 (Mobile / WhatsApp)
                  </a>
                  <a href="tel:+919820615699" className="block text-foreground font-semibold hover:text-primary transition-colors">
                    +91 98206 15699 (Director Direct)
                  </a>
                  <a href="mailto:Info@nationalcomputercentre.com" className="block text-foreground font-semibold hover:text-primary transition-colors pt-1">
                    Info@nationalcomputercentre.com
                  </a>
                </div>
              </div>

              <div className="pt-3 border-t border-border">
                <span className="text-[12px] font-semibold text-muted-foreground uppercase tracking-wider block mb-1.5">
                  Opening Timings
                </span>
                <p className="text-[14px] text-muted-foreground space-y-1">
                  <span className="block">Monday – Saturday: 07:00 AM – 09:00 PM</span>
                  <span className="block">Sunday: 08:00 AM – 01:00 PM</span>
                </p>
              </div>
            </div>

            {/* Google Map */}
            <div className="rounded-2xl overflow-hidden aspect-[16/10] border border-border shadow-sm">
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
