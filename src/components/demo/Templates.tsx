"use client";

import React, { useState } from "react";
import { 
  Coffee, Clock, Phone, MapPin, 
  Dumbbell, Trophy, Users, Shield, Calendar,
  Sparkles, Heart, Scissors, CheckCircle,
  Send, ChevronRight, Check, Star, ArrowUpRight, Globe
} from "lucide-react";

interface Lead {
  id: string;
  name: string;
  phone: string;
  address: string;
  category: string;
  tagline: string;
  description: string;
  color_theme: string;
  services?: string;
  rating?: number;
  review_count?: number;
}

// Helper to get services list
function parseServices(servicesString?: string, defaultServices: string[] = []): string[] {
  if (!servicesString) return defaultServices;
  return servicesString.split(",").map(s => s.trim()).filter(Boolean);
}

// Simple dynamic contact form component for all templates
function ContactForm({ businessName, themeColor }: { businessName: string; themeColor: string }) {
  const [submitted, setSubmitted] = useState(false);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name && phone) {
      setSubmitted(true);
    }
  };

  const btnStyle = {
    gold: "bg-amber-500 hover:bg-amber-600 text-black",
    red: "bg-red-600 hover:bg-red-700 text-white font-mono border-2 border-black shadow-[4px_4px_0px_#000]",
    rose: "bg-rose-500 hover:bg-rose-600 text-white tracking-widest font-light",
    emerald: "bg-emerald-600 hover:bg-emerald-700 text-white",
    blue: "bg-blue-600 hover:bg-blue-700 text-white"
  }[themeColor] || "bg-white hover:bg-neutral-200 text-black";

  if (submitted) {
    return (
      <div className="bg-white/5 backdrop-blur-xl border border-white/10 p-8 rounded-2xl text-center shadow-2xl">
        <CheckCircle className="w-12 h-12 text-emerald-400 mx-auto mb-4" />
        <h4 className="text-xl font-bold text-white mb-2">Thank You!</h4>
        <p className="text-neutral-400 text-sm">
          Your request has been sent to {businessName}. We will get back to you shortly.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="bg-black/40 backdrop-blur-xl border border-white/10 p-6 rounded-2xl space-y-4 shadow-2xl">
      <h4 className="text-lg font-bold text-white mb-2">Reserve / Inquire</h4>
      <div>
        <label className="block text-xs font-semibold text-neutral-400 uppercase mb-1">Your Name</label>
        <input 
          type="text" 
          required
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full bg-black/60 border border-white/10 rounded-xl px-4 py-3 text-white text-sm outline-hidden focus:border-white transition-all"
          placeholder="John Doe"
        />
      </div>
      <div>
        <label className="block text-xs font-semibold text-neutral-400 uppercase mb-1">Your Phone Number</label>
        <input 
          type="tel" 
          required
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          className="w-full bg-black/60 border border-white/10 rounded-xl px-4 py-3 text-white text-sm outline-hidden focus:border-white transition-all"
          placeholder="+91 XXXXX XXXXX"
        />
      </div>
      <button 
        type="submit" 
        className={`w-full py-3.5 rounded-xl font-bold text-sm transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer ${btnStyle}`}
      >
        Submit Request
        <Send className="w-4 h-4" />
      </button>
    </form>
  );
}

// -------------------------------------------------------------------
// 1. CAFE TEMPLATE (Elegant Editorial, Serif Typography)
// -------------------------------------------------------------------
export function CafeTemplate({ lead }: { lead: Lead }) {
  const services = parseServices(lead.services, [
    "Single-Origin Pour Over",
    "Flaky French Croissants",
    "Signature Cold Brews",
    "Artisanal Desserts"
  ]);

  const cafeImages = [
    "https://images.unsplash.com/photo-1498804103079-a6351b050096?q=80&w=300",
    "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?q=80&w=300",
    "https://images.unsplash.com/photo-1554118811-1e0d58224f24?q=80&w=300",
    "https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?q=80&w=300"
  ];

  return (
    <div 
      className="min-h-screen bg-[#0d0c0a] text-[#f4f2ee] selection:bg-amber-500 selection:text-black leading-relaxed"
      style={{ fontFamily: "'Playfair Display', serif" }}
    >
      {/* Header */}
      <header className="sticky top-0 z-50 bg-[#0d0c0a]/90 backdrop-blur-md border-b border-[#2d2a23] py-5 px-6 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Coffee className="w-5 h-5 text-amber-500" />
          <span className="font-serif text-xl font-bold tracking-wider text-white uppercase">{lead.name}</span>
        </div>
        <a 
          href={`tel:${lead.phone}`}
          className="border border-amber-500/30 hover:bg-amber-500 hover:text-black text-amber-400 py-2.5 px-6 rounded-full text-xs font-bold tracking-widest uppercase transition-all duration-300"
        >
          Call Now
        </a>
      </header>

      {/* Hero */}
      <section className="relative py-20 px-6 max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        <div className="lg:col-span-7 space-y-6 text-left">
          <span className="text-amber-500 text-xs font-bold tracking-[0.3em] uppercase block">Bespoke Experience</span>
          <h1 className="text-4xl sm:text-6xl font-black text-white leading-tight uppercase tracking-tight">
            {lead.tagline || "Artisanal Coffee & Crafted Ambience"}
          </h1>
          <p className="text-[#c7c1b5] text-base sm:text-lg leading-relaxed font-sans font-light max-w-xl">
            {lead.description || "Every cup at our sanctuary is a sensory journey. We carefully source single-origin coffee beans and prepare freshly baked, flaky croissants daily."}
          </p>
          {lead.rating && (
            <div className="flex items-center gap-1.5 font-sans text-xs text-amber-400">
              <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
              <span className="font-bold">{lead.rating}</span>
              <span className="text-neutral-500">({lead.review_count} Google reviews)</span>
            </div>
          )}
          <div className="flex gap-4 pt-4">
            <a 
              href="#menu" 
              className="bg-amber-500 hover:bg-amber-600 text-black font-semibold font-sans px-8 py-4 rounded-full text-xs tracking-widest uppercase transition-all duration-300"
            >
              Explore Menu
            </a>
            <a 
              href="#contact" 
              className="border border-[#3d382e] hover:bg-white/5 text-white font-semibold font-sans px-8 py-4 rounded-full text-xs tracking-widest uppercase transition-all duration-300"
            >
              Reserve Table
            </a>
          </div>
        </div>
        
        {/* Premium Image Block */}
        <div className="lg:col-span-5 relative w-full aspect-square rounded-3xl overflow-hidden border border-[#2d2a23] shadow-2xl">
          <img 
            src="https://images.unsplash.com/photo-1498804103079-a6351b050096?q=80&w=800"
            alt="Espresso Pouring"
            className="w-full h-full object-cover grayscale-20 hover:grayscale-0 transition-all duration-700 hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
        </div>
      </section>

      {/* Menu / Highlights Section */}
      <section id="menu" className="py-20 px-6 max-w-5xl mx-auto border-t border-[#2d2a23]">
        <div className="text-center mb-16">
          <span className="text-amber-500 text-xs font-bold uppercase tracking-[0.3em] block mb-2">Our Highlights</span>
          <h2 className="text-3xl sm:text-4xl font-bold text-white uppercase tracking-wider">Curated Specialties</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {services.map((service, index) => (
            <div key={index} className="flex gap-6 items-center">
              <div className="w-24 h-24 shrink-0 rounded-2xl overflow-hidden border border-[#2d2a23]">
                <img 
                  src={cafeImages[index % cafeImages.length]}
                  alt={service}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="space-y-1">
                <h4 className="text-lg font-bold text-white uppercase">{service}</h4>
                <p className="text-xs text-[#c7c1b5] font-sans font-light leading-relaxed">Prepared individually by our experienced baristas using verified techniques.</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Booking Form */}
      <section id="contact" className="py-20 px-6 max-w-5xl mx-auto border-t border-[#2d2a23]">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-7 space-y-6">
            <h3 className="text-3xl sm:text-4xl font-bold text-white uppercase tracking-wider">Experience Our Sanctuary</h3>
            <p className="text-[#c7c1b5] text-sm font-sans font-light leading-relaxed">
              We look forward to serving you. Come in to work, read, or catch up with friends in our premium ambient space.
            </p>
            <div className="space-y-4 pt-4 font-sans font-light text-sm">
              <div className="flex items-center gap-3">
                <MapPin className="w-5 h-5 text-amber-500 shrink-0" />
                <span>{lead.address}</span>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-amber-500 shrink-0" />
                <span>{lead.phone}</span>
              </div>
              <div className="flex items-center gap-3">
                <Clock className="w-5 h-5 text-amber-500 shrink-0" />
                <span>Open Daily: 8:00 AM - 10:00 PM</span>
              </div>
            </div>
          </div>
          <div className="lg:col-span-5">
            <ContactForm businessName={lead.name} themeColor="gold" />
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t border-[#2d2a23] text-center text-xs text-neutral-500 font-sans font-light">
        <p className="mb-2 uppercase tracking-widest font-black text-neutral-400">&copy; {new Date().getFullYear()} {lead.name}</p>
        <p>Proudly presented by Asenra Venture Studio Demo Network</p>
      </footer>
    </div>
  );
}

// -------------------------------------------------------------------
// 2. GYM / FITNESS TEMPLATE (Industrial Brutalist, Thick Borders)
// -------------------------------------------------------------------
export function GymTemplate({ lead }: { lead: Lead }) {
  const services = parseServices(lead.services, [
    "Powerlifting & Strength Racks",
    "Olympic Lifting Platforms",
    "HIIT & Functional Fitness",
    "Elite Personal Coaching"
  ]);

  return (
    <div 
      className="min-h-screen bg-[#111] text-neutral-100 selection:bg-red-600 selection:text-white leading-tight"
      style={{ fontFamily: "'Syne', sans-serif" }}
    >
      {/* Header */}
      <header className="sticky top-0 z-50 bg-[#111] border-b-4 border-black py-4 px-6 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Dumbbell className="w-5 h-5 text-red-600" />
          <span className="font-extrabold text-xl tracking-tighter text-white uppercase italic">{lead.name}</span>
        </div>
        <a 
          href={`tel:${lead.phone}`}
          className="bg-red-600 hover:bg-red-700 text-white py-2 px-5 border-2 border-black shadow-[3px_3px_0px_#000] text-xs font-black uppercase transition-all duration-300"
        >
          Join Now
        </a>
      </header>

      {/* Hero */}
      <section className="relative py-20 px-6 max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        <div className="lg:col-span-7 space-y-6 text-left">
          <span className="bg-red-600 text-white text-xs font-bold px-3 py-1 uppercase inline-block border-2 border-black shadow-[3px_3px_0px_#000]">No Limits</span>
          <h1 className="text-5xl sm:text-7xl font-extrabold text-white leading-none uppercase italic tracking-tighter">
            {lead.tagline || "No Excuses. Just Pure Power."}
          </h1>
          <p className="text-neutral-400 text-base leading-relaxed font-sans max-w-xl">
            {lead.description || "Transform your physique inside our premium heavy-iron zone. State-of-the-art platforms, power racks, and coaches built for ultimate strength growth."}
          </p>
          {lead.rating && (
            <div className="flex items-center gap-1.5 font-sans text-xs text-red-500">
              <Star className="w-4 h-4 fill-red-600 text-red-600" />
              <span className="font-bold text-white">{lead.rating}</span>
              <span className="text-neutral-500">({lead.review_count} Google reviews)</span>
            </div>
          )}
          <div className="flex gap-4 pt-4">
            <a 
              href="#contact" 
              className="bg-red-600 hover:bg-red-700 text-white font-extrabold px-8 py-4 border-4 border-black shadow-[5px_5px_0px_#000] text-sm uppercase tracking-wide transition-all"
            >
              Get Free Pass
            </a>
          </div>
        </div>

        {/* Industrial Image Frame */}
        <div className="lg:col-span-5 relative w-full aspect-square border-4 border-black shadow-[8px_8px_0px_#000] rounded-none overflow-hidden bg-black">
          <img 
            src="https://images.unsplash.com/photo-1517838277536-f5f99be501cd?q=80&w=800"
            alt="Gym training"
            className="w-full h-full object-cover grayscale contrast-125"
          />
        </div>
      </section>

      {/* Brutalist Bento Grid */}
      <section className="py-20 px-6 max-w-5xl mx-auto border-t-4 border-black">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service, index) => (
            <div key={index} className="bg-neutral-800 border-4 border-black p-6 shadow-[5px_5px_0px_#000] space-y-4">
              <Trophy className="w-10 h-10 text-red-600" />
              <h4 className="text-lg font-bold uppercase italic">{service}</h4>
              <p className="text-xs text-neutral-400 font-sans leading-relaxed">High performance training programs tailored to your fitness needs.</p>
            </div>
          ))}
        </div>
      </section>

      {/* Booking Form */}
      <section id="contact" className="py-20 px-6 max-w-5xl mx-auto border-t-4 border-black">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-7 space-y-6">
            <h3 className="text-4xl font-extrabold text-white uppercase italic">Ready to Train?</h3>
            <p className="text-neutral-400 text-sm font-sans leading-relaxed">
              Fill out the form to secure your free day pass. Take the first step towards your fitness goals today. Our team is ready to guide you.
            </p>
            <div className="space-y-4 pt-4 font-mono text-sm">
              <div className="flex items-center gap-3">
                <MapPin className="w-5 h-5 text-red-600 shrink-0" />
                <span>{lead.address}</span>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-red-600 shrink-0" />
                <span>{lead.phone}</span>
              </div>
            </div>
          </div>
          <div className="lg:col-span-5">
            <ContactForm businessName={lead.name} themeColor="red" />
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t-4 border-black text-center text-xs text-neutral-500 font-sans">
        <p className="mb-2 uppercase tracking-widest font-black text-neutral-400">&copy; {new Date().getFullYear()} {lead.name}</p>
        <p>Proudly presented by Asenra Venture Studio Demo Network</p>
      </footer>
    </div>
  );
}

// -------------------------------------------------------------------
// 3. SALON / BEAUTY TEMPLATE (Luxury Minimalist, Italiana Typography)
// -------------------------------------------------------------------
export function SalonTemplate({ lead }: { lead: Lead }) {
  const services = parseServices(lead.services, [
    "Signature Haircuts & Styling",
    "Luxury Bridal Makeup",
    "Organic Skin Cleansing",
    "Aroma Scalp Therapy"
  ]);

  return (
    <div 
      className="min-h-screen bg-[#faf8f5] text-[#2c2623] selection:bg-rose-100 selection:text-rose-950 leading-relaxed font-light"
      style={{ fontFamily: "'Outfit', sans-serif" }}
    >
      {/* Header */}
      <header className="sticky top-0 z-50 bg-[#faf8f5]/90 backdrop-blur-md border-b border-[#ebdcd0] py-5 px-6 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Scissors className="w-5 h-5 text-rose-400" />
          <span 
            className="text-lg tracking-[0.2em] text-black uppercase"
            style={{ fontFamily: "'Italiana', serif" }}
          >
            {lead.name}
          </span>
        </div>
        <a 
          href={`tel:${lead.phone}`}
          className="border border-[#ebdcd0] hover:bg-black hover:text-white text-black py-2.5 px-6 rounded-full text-xs font-bold tracking-widest uppercase transition-all duration-300"
        >
          Book Appointment
        </a>
      </header>

      {/* Hero */}
      <section className="relative py-24 px-6 max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        <div className="lg:col-span-7 space-y-6 text-left">
          <span className="text-rose-400 text-xs font-bold tracking-[0.3em] uppercase block">Exclusive Salon & Spa</span>
          <h1 
            className="text-5xl sm:text-7xl font-extralight text-black leading-tight tracking-wide uppercase"
            style={{ fontFamily: "'Italiana', serif" }}
          >
            Refined <span className="font-normal text-rose-400">Beauty & Glamour</span>
          </h1>
          <p className="text-zinc-600 text-base sm:text-lg leading-relaxed max-w-xl font-light">
            {lead.tagline || lead.description || "A luxury salon experience built around custom treatments, premium hair care, and relaxing spa sessions designed for you."}
          </p>
          {lead.rating && (
            <div className="flex items-center gap-1.5 text-xs text-rose-500 font-medium">
              <Star className="w-4 h-4 fill-rose-400 text-rose-400" />
              <span className="font-bold text-black">{lead.rating}</span>
              <span className="text-neutral-400">({lead.review_count} Google reviews)</span>
            </div>
          )}
          <div className="flex gap-4 pt-4">
            <a 
              href="#services" 
              className="bg-black hover:bg-zinc-800 text-white font-semibold px-8 py-4 rounded-full text-xs tracking-widest uppercase transition-all duration-300"
            >
              Our Services
            </a>
          </div>
        </div>

        {/* Soft Luxury Image Frame */}
        <div className="lg:col-span-5 relative w-full aspect-square rounded-[2rem] overflow-hidden border border-[#ebdcd0] shadow-2xl">
          <img 
            src="https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?q=80&w=800"
            alt="Salon Treatment"
            className="w-full h-full object-cover scale-102 hover:scale-105 transition-transform duration-700"
          />
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-20 px-6 max-w-4xl mx-auto border-t border-[#ebdcd0]">
        <div className="text-center mb-16">
          <span className="text-rose-400 text-xs font-bold uppercase tracking-[0.3em] block mb-2">Treatments</span>
          <h2 
            className="text-3xl sm:text-4xl font-light text-black uppercase tracking-wider"
            style={{ fontFamily: "'Italiana', serif" }}
          >
            Signature Catalog
          </h2>
        </div>

        <div className="space-y-6">
          {services.map((service, index) => (
            <div key={index} className="flex justify-between items-center border-b border-[#ebdcd0] pb-4">
              <div>
                <h4 className="text-lg font-bold text-black">{service}</h4>
                <p className="text-xs text-zinc-500">Premium treatment custom-tailored to your style and wellness preferences.</p>
              </div>
              <span className="text-rose-500 font-bold text-sm">Couture</span>
            </div>
          ))}
        </div>
      </section>

      {/* Booking Form */}
      <section id="contact" className="py-20 px-6 max-w-5xl mx-auto border-t border-[#ebdcd0]">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-7 space-y-6">
            <h3 
              className="text-4xl font-light text-black uppercase tracking-wider leading-none"
              style={{ fontFamily: "'Italiana', serif" }}
            >
              Book Appointment
            </h3>
            <p className="text-zinc-600 text-sm leading-relaxed font-light">
              Pamper yourself with the treatment you deserve. Select your date, submit details, and our premium stylist team will call you to confirm.
            </p>
            <div className="space-y-4 pt-4 text-sm font-light">
              <div className="flex items-center gap-3">
                <MapPin className="w-5 h-5 text-rose-400 shrink-0" />
                <span>{lead.address}</span>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-rose-400 shrink-0" />
                <span>{lead.phone}</span>
              </div>
            </div>
          </div>
          <div className="lg:col-span-5 bg-white border border-[#ebdcd0] p-6 rounded-3xl shadow-xl">
            <ContactForm businessName={lead.name} themeColor="rose" />
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t border-[#ebdcd0] text-center text-xs text-zinc-500">
        <p className="mb-2 uppercase tracking-widest font-black text-zinc-500">&copy; {new Date().getFullYear()} {lead.name}</p>
        <p>Proudly presented by Asenra Venture Studio Demo Network</p>
      </footer>
    </div>
  );
}

// -------------------------------------------------------------------
// 4. CLEANING & HOME SERVICES TEMPLATE (Clean, Bright, Trustworthy)
// -------------------------------------------------------------------
export function ServicesTemplate({ lead }: { lead: Lead }) {
  const services = parseServices(lead.services, [
    "Invisible Dental Aligners",
    "Cosmetic Dentistry Sessions",
    "Painless Root Canal Treatments",
    "Specialized Pediatric Dentistry"
  ]);

  return (
    <div 
      className="min-h-screen bg-slate-50 text-slate-700 selection:bg-emerald-600 selection:text-white leading-relaxed font-light"
      style={{ fontFamily: "'Outfit', sans-serif" }}
    >
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-slate-200 py-5 px-6 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-emerald-600" />
          <span className="font-black text-lg tracking-tight text-slate-900 uppercase">{lead.name}</span>
        </div>
        <a 
          href={`tel:${lead.phone}`}
          className="bg-emerald-600 hover:bg-emerald-700 text-white py-2.5 px-6 rounded-full text-xs font-bold tracking-wide uppercase transition-all duration-300"
        >
          Book Service
        </a>
      </header>

      {/* Hero */}
      <section className="relative py-24 px-6 max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        <div className="lg:col-span-7 space-y-6 text-left">
          <span className="text-emerald-600 text-xs font-bold tracking-[0.3em] uppercase block">Reliable & Verified</span>
          <h1 className="text-4xl sm:text-6xl font-extrabold text-slate-900 leading-tight tracking-tight uppercase">
            {lead.tagline || "Professional Service You Can Trust"}
          </h1>
          <p className="text-slate-500 text-base sm:text-lg leading-relaxed max-w-xl font-light">
            {lead.description || "High-quality, reliable, and premium local services tailored exactly to your home or office needs. Certified professionals ready to help."}
          </p>
          {lead.rating && (
            <div className="flex items-center gap-1.5 text-xs text-emerald-600 font-semibold">
              <Star className="w-4 h-4 fill-emerald-500 text-emerald-500" />
              <span className="font-bold text-slate-900">{lead.rating}</span>
              <span className="text-slate-400">({lead.review_count} Google reviews)</span>
            </div>
          )}
          <div className="flex gap-4 pt-4">
            <a 
              href="#contact" 
              className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold px-8 py-4 rounded-full text-sm transition-all duration-300 uppercase tracking-wide"
            >
              Get Free Estimate
            </a>
          </div>
        </div>

        {/* Clean Service Image Frame */}
        <div className="lg:col-span-5 relative w-full aspect-square rounded-3xl overflow-hidden border border-slate-200 shadow-2xl">
          <img 
            src="https://images.unsplash.com/photo-1581578731548-c64695cc6952?q=80&w=800"
            alt="Service Cleaning"
            className="w-full h-full object-cover"
          />
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-20 px-6 max-w-5xl mx-auto border-t border-slate-200">
        <div className="text-center mb-12">
          <span className="text-emerald-600 text-xs font-bold uppercase tracking-[0.3em] block mb-2">Our Offerings</span>
          <h2 className="text-3xl font-extrabold text-slate-900 uppercase">Available Services</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {services.map((service, index) => (
            <div key={index} className="bg-white border border-slate-200 p-6 rounded-2xl flex gap-4 shadow-sm hover:shadow-md transition-shadow">
              <CheckCircle className="w-6 h-6 text-emerald-500 shrink-0 mt-1" />
              <div>
                <h4 className="text-base font-bold text-slate-900 mb-1">{service}</h4>
                <p className="text-xs text-slate-500 leading-relaxed">Professional service executed with utmost precision, certified techniques, and absolute care.</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Contact Form */}
      <section id="contact" className="py-20 px-6 max-w-5xl mx-auto border-t border-slate-200">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-7 space-y-6">
            <h3 className="text-3xl font-extrabold text-slate-900 uppercase tracking-tight leading-none">Request Free Quote</h3>
            <p className="text-slate-500 text-sm leading-relaxed">
              No hidden fees. Submit your phone number and we will get back to you within 30 minutes with a free pricing estimate for your requirements.
            </p>
            <div className="space-y-4 pt-4 text-sm">
              <div className="flex items-center gap-3">
                <MapPin className="w-5 h-5 text-emerald-600 shrink-0" />
                <span>{lead.address}</span>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-emerald-600 shrink-0" />
                <span>{lead.phone}</span>
              </div>
            </div>
          </div>
          <div className="lg:col-span-5 bg-white border border-slate-200 p-6 rounded-3xl shadow-xl">
            <ContactForm businessName={lead.name} themeColor="emerald" />
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t border-slate-200 text-center text-xs text-slate-500">
        <p className="mb-2 uppercase tracking-widest font-black text-slate-400">&copy; {new Date().getFullYear()} {lead.name}</p>
        <p>Proudly presented by Asenra Venture Studio Demo Network</p>
      </footer>
    </div>
  );
}

// -------------------------------------------------------------------
// 5. GENERAL / CORPORATE TEMPLATE (Sleek Dark Mode, Modern Agency)
// -------------------------------------------------------------------
export function GeneralTemplate({ lead }: { lead: Lead }) {
  const services = parseServices(lead.services, [
    "Luxury Residential Interior Architecture",
    "Modern Office Workplace Planning",
    "Bespoke Furniture Concept Design"
  ]);

  return (
    <div 
      className="min-h-screen bg-black text-neutral-300 selection:bg-blue-600 selection:text-white leading-relaxed font-light"
      style={{ fontFamily: "'Outfit', sans-serif" }}
    >
      {/* Glow */}
      <div className="absolute top-0 right-1/4 w-[400px] h-[400px] bg-blue-600/[0.03] rounded-full blur-[100px] pointer-events-none" />

      {/* Header */}
      <header className="sticky top-0 z-50 bg-black/85 backdrop-blur-md border-b border-white/5 py-5 px-6 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Globe className="w-5 h-5 text-blue-400" />
          <span className="font-bold text-lg tracking-tight text-white uppercase">{lead.name}</span>
        </div>
        <a 
          href={`tel:${lead.phone}`}
          className="bg-blue-600 hover:bg-blue-700 text-white py-2.5 px-6 rounded-full text-xs font-bold tracking-wide uppercase transition-all duration-300"
        >
          Contact Now
        </a>
      </header>

      {/* Hero */}
      <section className="relative py-24 px-6 max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        <div className="lg:col-span-7 space-y-6 text-left">
          <span className="text-blue-400 text-xs font-bold tracking-[0.3em] uppercase block">Tailored for You</span>
          <h1 className="text-4xl sm:text-6xl font-extrabold text-white leading-tight tracking-tight uppercase">
            {lead.tagline || "Modern Solutions for Your Growth"}
          </h1>
          <p className="text-neutral-400 text-base sm:text-lg leading-relaxed max-w-xl font-light">
            {lead.description || "Premium services, expert consultations, and dedicated support built around your unique business goals."}
          </p>
          {lead.rating && (
            <div className="flex items-center gap-1.5 text-xs text-blue-400">
              <Star className="w-4 h-4 fill-blue-500 text-blue-400" />
              <span className="font-bold text-white">{lead.rating}</span>
              <span className="text-neutral-500">({lead.review_count} Google reviews)</span>
            </div>
          )}
          <div className="flex gap-4 pt-4">
            <a 
              href="#contact" 
              className="bg-blue-600 hover:bg-blue-700 text-white font-bold px-8 py-4 rounded-full text-sm transition-all duration-300 uppercase tracking-wide"
            >
              Get in Touch
            </a>
          </div>
        </div>

        {/* Corporate Image Frame */}
        <div className="lg:col-span-5 relative w-full aspect-square rounded-3xl overflow-hidden border border-white/5 shadow-2xl">
          <img 
            src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=800"
            alt="Business Consulting"
            className="w-full h-full object-cover grayscale-50 hover:grayscale-0 transition-all duration-700"
          />
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20 px-6 max-w-4xl mx-auto border-t border-white/5">
        <div className="text-center mb-12">
          <span className="text-blue-400 text-xs font-bold uppercase tracking-[0.3em] block mb-2">Our Expertise</span>
          <h2 className="text-3xl font-extrabold text-white uppercase">Services Offered</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {services.map((service, index) => (
            <div key={index} className="bg-neutral-900 border border-white/5 p-6 rounded-2xl space-y-4 hover:border-blue-500/20 transition-all">
              <CheckCircle className="w-8 h-8 text-blue-400" />
              <h4 className="text-lg font-bold text-white uppercase">{service}</h4>
              <p className="text-xs text-neutral-400 leading-relaxed">Bespoke dynamic solutions designed specifically to scale operations and output quality.</p>
            </div>
          ))}
        </div>
      </section>

      {/* Booking Form */}
      <section id="contact" className="py-16 px-6 max-w-5xl mx-auto border-t border-white/5">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-7 space-y-6">
            <h3 className="text-3xl font-black text-white uppercase tracking-tight leading-none">Inquire Today</h3>
            <p className="text-neutral-400 text-sm leading-relaxed">
              We look forward to serving you. Submit your name and phone number and we will get back to you shortly.
            </p>
            <div className="space-y-4 pt-4 text-sm font-light">
              <div className="flex items-center gap-3">
                <MapPin className="w-5 h-5 text-blue-400 shrink-0" />
                <span>{lead.address}</span>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-blue-400 shrink-0" />
                <span>{lead.phone}</span>
              </div>
            </div>
          </div>
          <div className="lg:col-span-5">
            <ContactForm businessName={lead.name} themeColor="blue" />
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t border-white/5 text-center text-xs text-neutral-500">
        <p className="mb-2 uppercase tracking-widest font-black text-neutral-400">&copy; {new Date().getFullYear()} {lead.name}</p>
        <p>Proudly presented by Asenra Venture Studio Demo Network</p>
      </footer>
    </div>
  );
}

// -------------------------------------------------------------------
// 6. ARCHITECTURE & INTERIOR TEMPLATE (Ultra-Premium Minimalist, High-Contrast Grid)
// -------------------------------------------------------------------
export function ArchitectureTemplate({ lead }: { lead: Lead }) {
  const services = parseServices(lead.services, [
    "High-End Residential Architecture",
    "Bespoke Interior & Spatial Styling",
    "Commercial Workplace Planning",
    "Turnkey Design & Commissioning"
  ]);

  const projectImages = [
    "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=400", // Living
    "https://images.unsplash.com/photo-1600585154526-990dced4db0d?q=80&w=400", // Exterior
    "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=400", // Kitchen/Bath
    "https://images.unsplash.com/photo-1600607687644-c7171b42498f?q=80&w=400"  // Detail
  ];

  return (
    <div 
      className="min-h-screen bg-[#0a0a0a] text-neutral-200 selection:bg-white selection:text-black leading-relaxed font-light"
      style={{ fontFamily: "'Outfit', sans-serif" }}
    >
      {/* Header */}
      <header className="sticky top-0 z-50 bg-[#0a0a0a]/90 backdrop-blur-md border-b border-white/5 py-6 px-6 sm:px-12 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 border border-white flex items-center justify-center font-bold text-sm tracking-tighter text-white">
            A
          </div>
          <span className="text-sm font-bold tracking-[0.25em] text-white uppercase">{lead.name}</span>
        </div>
        <a 
          href={`tel:${lead.phone}`}
          className="border border-white/20 hover:border-white hover:bg-white hover:text-black text-white py-2.5 px-6 rounded-none text-xs font-bold tracking-widest uppercase transition-all duration-300"
        >
          Inquire
        </a>
      </header>

      {/* Hero */}
      <section className="relative py-20 px-6 sm:px-12 max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        <div className="lg:col-span-6 space-y-8 text-left">
          <span className="text-white/40 text-xs font-bold tracking-[0.4em] uppercase block">Architectural Studio</span>
          <h1 className="text-4xl sm:text-7xl font-extralight text-white leading-tight tracking-tight uppercase">
            {lead.tagline || "Bespoke Structural Narratives"}
          </h1>
          <div className="w-16 h-[1px] bg-white/30" />
          <p className="text-neutral-400 text-sm sm:text-base leading-relaxed max-w-md font-light">
            {lead.description || "We craft high-end spatial realities. From structural engineering to custom interior furnishing, we deliver award-winning designs that stand the test of time."}
          </p>
          {lead.rating && (
            <div className="flex items-center gap-1.5 text-xs text-white/60">
              <Star className="w-3.5 h-3.5 fill-white text-white" />
              <span className="font-bold text-white">{lead.rating}</span>
              <span className="text-neutral-600">({lead.review_count} Google reviews)</span>
            </div>
          )}
          <div className="flex gap-4 pt-4">
            <a 
              href="#projects" 
              className="bg-white hover:bg-neutral-200 text-black font-semibold px-8 py-4 rounded-none text-xs tracking-widest uppercase transition-all duration-300"
            >
              View Projects
            </a>
          </div>
        </div>

        {/* Structural Image Frame */}
        <div className="lg:col-span-6 relative w-full aspect-[4/5] rounded-none overflow-hidden border border-white/10 shadow-2xl bg-neutral-900">
          <img 
            src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=800"
            alt="Modern Structural Architecture"
            className="w-full h-full object-cover scale-102 hover:scale-105 transition-transform duration-700"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-transparent to-transparent" />
        </div>
      </section>

      {/* Projects Grid Section */}
      <section id="projects" className="py-24 px-6 sm:px-12 max-w-6xl mx-auto border-t border-white/5">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end mb-16 gap-4">
          <div>
            <span className="text-white/40 text-xs font-bold uppercase tracking-[0.3em] block mb-2">Portfolio</span>
            <h2 className="text-3xl sm:text-4xl font-extralight text-white uppercase tracking-wider">Bespoke Spaces</h2>
          </div>
          <span className="text-xs text-neutral-500 font-mono">SELECTED WORK / COUTURE DESIGN</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {services.map((service, index) => (
            <div key={index} className="group cursor-pointer space-y-4">
              <div className="relative aspect-[3/2] overflow-hidden border border-white/5 bg-neutral-900">
                <img 
                  src={projectImages[index % projectImages.length]}
                  alt={service}
                  className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700"
                />
              </div>
              <div className="flex justify-between items-start pt-2">
                <div>
                  <h4 className="text-base font-bold text-white uppercase tracking-wide">{service}</h4>
                  <p className="text-xs text-neutral-500 font-light mt-1">High-end architecture and spatial composition tailored for premium scale.</p>
                </div>
                <ArrowUpRight className="w-5 h-5 text-neutral-500 group-hover:text-white transition-colors" />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Inquiry Form */}
      <section id="contact" className="py-24 px-6 sm:px-12 max-w-6xl mx-auto border-t border-white/5">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-7 space-y-6">
            <h3 className="text-3xl sm:text-5xl font-extralight text-white uppercase tracking-tight leading-none">Commission a Project</h3>
            <p className="text-neutral-400 text-sm leading-relaxed font-light max-w-md">
              Ready to construct your vision? Submit your contact details below, and our senior architectural consultants will contact you to discuss your project requirements.
            </p>
            <div className="space-y-4 pt-4 text-sm font-light">
              <div className="flex items-center gap-3">
                <MapPin className="w-5 h-5 text-white/50 shrink-0" />
                <span>{lead.address}</span>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-white/50 shrink-0" />
                <span>{lead.phone}</span>
              </div>
              <div className="flex items-center gap-3">
                <Clock className="w-5 h-5 text-white/50 shrink-0" />
                <span>Studio Hours: Mon - Fri, 9 AM - 6 PM</span>
              </div>
            </div>
          </div>
          <div className="lg:col-span-5 bg-neutral-950 border border-white/10 p-8 rounded-none">
            <ContactForm businessName={lead.name} themeColor="white" />
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-16 border-t border-white/5 text-center text-xs text-neutral-600">
        <p className="mb-2 uppercase tracking-widest font-black text-neutral-500">&copy; {new Date().getFullYear()} {lead.name}</p>
        <p>Proudly presented by Asenra Venture Studio Demo Network</p>
      </footer>
    </div>
  );
}

