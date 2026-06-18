"use client";

import React, { useState } from "react";
import { 
  Coffee, Utensils, Clock, Phone, MapPin, 
  Dumbbell, Trophy, Users, Shield, Calendar,
  Sparkles, Heart, Scissors, Star, CheckCircle,
  Mail, Send, Globe, ChevronRight, HelpCircle
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

  const btnBg = {
    gold: "bg-amber-500 hover:bg-amber-600 text-black",
    red: "bg-red-600 hover:bg-red-700 text-white",
    rose: "bg-rose-500 hover:bg-rose-600 text-white",
    emerald: "bg-emerald-600 hover:bg-emerald-700 text-white",
    blue: "bg-blue-600 hover:bg-blue-700 text-white"
  }[themeColor] || "bg-neutral-100 hover:bg-neutral-200 text-black";

  const focusBorder = {
    gold: "focus:border-amber-500 focus:ring-amber-500/20",
    red: "focus:border-red-600 focus:ring-red-600/20",
    rose: "focus:border-rose-500 focus:ring-rose-500/20",
    emerald: "focus:border-emerald-600 focus:ring-emerald-600/20",
    blue: "focus:border-blue-600 focus:ring-blue-600/20"
  }[themeColor] || "focus:border-neutral-500 focus:ring-neutral-500/20";

  if (submitted) {
    return (
      <div className="bg-neutral-900/60 backdrop-blur-md border border-white/10 p-8 rounded-2xl text-center">
        <CheckCircle className="w-12 h-12 text-emerald-500 mx-auto mb-4" />
        <h4 className="text-xl font-bold text-white mb-2">Thank You!</h4>
        <p className="text-neutral-400 text-sm">
          Your request has been sent to {businessName}. We will get back to you shortly.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="bg-neutral-900/60 backdrop-blur-md border border-white/10 p-6 rounded-2xl space-y-4">
      <h4 className="text-lg font-bold text-white mb-2">Get in Touch</h4>
      <div>
        <label className="block text-xs font-semibold text-neutral-400 uppercase mb-1">Your Name</label>
        <input 
          type="text" 
          required
          value={name}
          onChange={(e) => setName(e.target.value)}
          className={`w-full bg-neutral-950/80 border border-white/10 rounded-xl px-4 py-3 text-white text-sm outline-hidden transition-all ${focusBorder}`}
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
          className={`w-full bg-neutral-950/80 border border-white/10 rounded-xl px-4 py-3 text-white text-sm outline-hidden transition-all ${focusBorder}`}
          placeholder="+91 XXXXX XXXXX"
        />
      </div>
      <button 
        type="submit" 
        className={`w-full py-3.5 rounded-xl font-bold text-sm transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer shadow-lg`}
        style={{ backgroundColor: themeColor === 'gold' ? '#F59E0B' : themeColor === 'red' ? '#DC2626' : themeColor === 'rose' ? '#F43F5E' : themeColor === 'emerald' ? '#059669' : '#2563EB', color: themeColor === 'gold' ? '#000000' : '#FFFFFF' }}
      >
        Submit Request
        <Send className="w-4 h-4" />
      </button>
    </form>
  );
}

// -------------------------------------------------------------------
// 1. CAFE TEMPLATE
// -------------------------------------------------------------------
export function CafeTemplate({ lead }: { lead: Lead }) {
  const accentColor = "#F59E0B"; // Gold / Amber

  return (
    <div className="min-h-screen bg-black text-neutral-200 font-sans selection:bg-amber-500 selection:text-black">
      {/* Decorative Ornaments */}
      <div className="absolute top-0 left-0 w-full h-[600px] bg-radial-gradient from-amber-500/[0.04] to-transparent pointer-events-none" />

      {/* Header */}
      <header className="sticky top-0 z-50 bg-black/80 backdrop-blur-md border-b border-white/5 py-4 px-6 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="p-1.5 bg-amber-500/10 border border-amber-500/20 rounded-lg text-amber-500">
            <Coffee className="w-5 h-5" />
          </div>
          <span className="font-serif text-lg font-black tracking-wider text-white uppercase">{lead.name}</span>
        </div>
        <a 
          href={`tel:${lead.phone}`}
          className="bg-amber-500 hover:bg-amber-600 text-black py-2.5 px-5 rounded-lg text-xs font-black tracking-wider uppercase flex items-center gap-2 transition-all duration-300"
        >
          <Phone className="w-3.5 h-3.5" />
          Order Now
        </a>
      </header>

      {/* Hero */}
      <section className="relative py-20 px-6 max-w-4xl mx-auto text-center">
        <h1 className="font-serif text-4xl sm:text-6xl font-black text-white leading-tight tracking-tight uppercase mb-6">
          {lead.tagline || "Artisanal Coffee & Cozy Ambient Spaces"}
        </h1>
        <p className="text-neutral-400 text-base sm:text-lg mb-10 max-w-2xl mx-auto leading-relaxed">
          {lead.description || "Welcome to our sanctuary. We source the finest single-origin coffee beans and prepare handcrafted foods to elevate your daily routine."}
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <a 
            href="#menu" 
            className="w-full sm:w-auto bg-white hover:bg-neutral-200 text-black font-bold px-8 py-4 rounded-xl text-sm transition-all duration-300 uppercase tracking-wider"
          >
            View Our Menu
          </a>
          <a 
            href="#contact" 
            className="w-full sm:w-auto border border-white/10 hover:bg-white/5 text-white font-bold px-8 py-4 rounded-xl text-sm transition-all duration-300 uppercase tracking-wider flex items-center justify-center gap-2"
          >
            <Clock className="w-4 h-4 text-amber-500" />
            Book a Table
          </a>
        </div>
      </section>

      {/* Special Highlights Section */}
      <section id="menu" className="py-16 px-6 max-w-4xl mx-auto border-t border-white/5">
        <div className="text-center mb-12">
          <h2 className="font-serif text-sm font-bold text-amber-500 uppercase tracking-[0.2em] mb-2">Our Specialty</h2>
          <h3 className="text-2xl sm:text-4xl font-black text-white uppercase tracking-tight">Handcrafted Menu</h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-neutral-900/40 border border-white/5 p-6 rounded-2xl flex items-start gap-4 hover:border-amber-500/20 transition-all">
            <div className="p-3 bg-amber-500/5 rounded-xl text-amber-500 shrink-0">
              <Coffee className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-lg font-bold text-white mb-1">Single-Origin Espresso</h4>
              <p className="text-xs text-neutral-400 leading-relaxed">Perfectly extracted coffee shots made from high-altitude shade-grown Arabica beans.</p>
            </div>
          </div>

          <div className="bg-neutral-900/40 border border-white/5 p-6 rounded-2xl flex items-start gap-4 hover:border-amber-500/20 transition-all">
            <div className="p-3 bg-amber-500/5 rounded-xl text-amber-500 shrink-0">
              <Utensils className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-lg font-bold text-white mb-1">Handcrafted Croissants</h4>
              <p className="text-xs text-neutral-400 leading-relaxed">Baked fresh daily in-house using pure French butter. Flaky, light, and delicious.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Booking / Contact Section */}
      <section id="contact" className="py-16 px-6 max-w-4xl mx-auto border-t border-white/5">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 items-center">
          <div className="md:col-span-7 space-y-6">
            <h3 className="font-serif text-3xl font-black text-white uppercase tracking-tight leading-none">Visit Us Today</h3>
            <p className="text-neutral-400 text-sm leading-relaxed">
              We look forward to serving you. Come in to work, read, or catch up with friends in our premium ambient space.
            </p>
            <div className="space-y-4 pt-4">
              <div className="flex items-center gap-3">
                <MapPin className="w-5 h-5 text-amber-500 shrink-0" />
                <span className="text-sm font-semibold">{lead.address}</span>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-amber-500 shrink-0" />
                <span className="text-sm font-semibold">{lead.phone}</span>
              </div>
              <div className="flex items-center gap-3">
                <Clock className="w-5 h-5 text-amber-500 shrink-0" />
                <span className="text-sm font-semibold">Open Daily: 8:00 AM - 10:00 PM</span>
              </div>
            </div>
          </div>
          <div className="md:col-span-5">
            <ContactForm businessName={lead.name} themeColor="gold" />
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
// 2. GYM / FITNESS TEMPLATE
// -------------------------------------------------------------------
export function GymTemplate({ lead }: { lead: Lead }) {
  const accentColor = "#DC2626"; // Red

  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-200 font-sans selection:bg-red-600 selection:text-white">
      {/* Red ambient glows */}
      <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-red-600/[0.04] rounded-full blur-[100px] pointer-events-none" />

      {/* Header */}
      <header className="sticky top-0 z-50 bg-neutral-950/80 backdrop-blur-md border-b border-white/5 py-4 px-6 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="p-1.5 bg-red-600/15 border border-red-600/30 rounded-lg text-red-500">
            <Dumbbell className="w-5 h-5" />
          </div>
          <span className="font-black text-xl tracking-tighter text-white uppercase italic">{lead.name}</span>
        </div>
        <a 
          href={`tel:${lead.phone}`}
          className="bg-red-600 hover:bg-red-700 text-white py-2.5 px-5 rounded-lg text-xs font-black tracking-wider uppercase flex items-center gap-2 transition-all duration-300 italic"
        >
          <Phone className="w-3.5 h-3.5" />
          Join Club
        </a>
      </header>

      {/* Hero */}
      <section className="relative py-24 px-6 max-w-4xl mx-auto text-center">
        <h1 className="text-5xl sm:text-7xl font-black text-white leading-none tracking-tighter uppercase italic mb-6">
          {lead.tagline || "No Excuses. Just Results."}
        </h1>
        <p className="text-neutral-400 text-base sm:text-lg mb-10 max-w-2xl mx-auto leading-relaxed">
          {lead.description || "Transform your life with state-of-the-art strength zones, functional training zones, and community support built for ultimate athletic growth."}
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <a 
            href="#contact" 
            className="w-full sm:w-auto bg-red-600 hover:bg-red-700 text-white font-bold px-8 py-4 rounded-xl text-sm transition-all duration-300 uppercase tracking-wider italic"
          >
            Claim Free Day Pass
          </a>
          <a 
            href="#features" 
            className="w-full sm:w-auto border border-white/10 hover:bg-white/5 text-white font-bold px-8 py-4 rounded-xl text-sm transition-all duration-300 uppercase tracking-wider flex items-center justify-center gap-2"
          >
            <Trophy className="w-4 h-4 text-red-500" />
            Explore Club
          </a>
        </div>
      </section>

      {/* Features Grid */}
      <section id="features" className="py-16 px-6 max-w-4xl mx-auto border-t border-white/5">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-neutral-900/30 border border-white/5 p-6 rounded-2xl space-y-3 hover:border-red-600/30 transition-all">
            <Trophy className="w-8 h-8 text-red-500" />
            <h4 className="text-lg font-bold text-white uppercase italic">Elite Coaching</h4>
            <p className="text-xs text-neutral-400 leading-relaxed">Certified personal trainers focused on setting realistic goals and achieving permanent body transformation.</p>
          </div>

          <div className="bg-neutral-900/30 border border-white/5 p-6 rounded-2xl space-y-3 hover:border-red-600/30 transition-all">
            <Dumbbell className="w-8 h-8 text-red-500" />
            <h4 className="text-lg font-bold text-white uppercase italic">Premium Zones</h4>
            <p className="text-xs text-neutral-400 leading-relaxed">Fully equipped strength racks, heavy lifting platforms, and cardio zones with high-end machinery.</p>
          </div>

          <div className="bg-neutral-900/30 border border-white/5 p-6 rounded-2xl space-y-3 hover:border-red-600/30 transition-all">
            <Users className="w-8 h-8 text-red-500" />
            <h4 className="text-lg font-bold text-white uppercase italic">Strong Community</h4>
            <p className="text-xs text-neutral-400 leading-relaxed">Group classes, functional HIIT workouts, and challenges designed to keep you motivated and accountable.</p>
          </div>
        </div>
      </section>

      {/* Booking Form */}
      <section id="contact" className="py-16 px-6 max-w-4xl mx-auto border-t border-white/5">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 items-center">
          <div className="md:col-span-7 space-y-6">
            <h3 className="text-3xl font-black text-white uppercase italic tracking-tighter leading-none">Ready to Train?</h3>
            <p className="text-neutral-400 text-sm leading-relaxed">
              Fill out the form to secure your free day pass. Take the first step towards your fitness goals today. Our team is ready to guide you.
            </p>
            <div className="space-y-4 pt-4">
              <div className="flex items-center gap-3">
                <MapPin className="w-5 h-5 text-red-500 shrink-0" />
                <span className="text-sm font-semibold">{lead.address}</span>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-red-500 shrink-0" />
                <span className="text-sm font-semibold">{lead.phone}</span>
              </div>
            </div>
          </div>
          <div className="md:col-span-5">
            <ContactForm businessName={lead.name} themeColor="red" />
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
// 3. SALON / BEAUTY TEMPLATE
// -------------------------------------------------------------------
export function SalonTemplate({ lead }: { lead: Lead }) {
  const accentColor = "#F43F5E"; // Rose

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-300 font-sans selection:bg-rose-500 selection:text-white">
      {/* Elegance Rose Light Glow */}
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-rose-500/[0.03] rounded-full blur-[120px] pointer-events-none" />

      {/* Header */}
      <header className="sticky top-0 z-50 bg-zinc-950/80 backdrop-blur-md border-b border-white/5 py-4 px-6 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="p-1.5 bg-rose-500/10 border border-rose-500/20 rounded-lg text-rose-400">
            <Scissors className="w-5 h-5" />
          </div>
          <span className="font-light text-lg tracking-[0.2em] text-white uppercase">{lead.name}</span>
        </div>
        <a 
          href={`tel:${lead.phone}`}
          className="bg-rose-500 hover:bg-rose-600 text-white py-2.5 px-5 rounded-lg text-xs font-bold tracking-widest uppercase flex items-center gap-2 transition-all duration-300"
        >
          <Calendar className="w-3.5 h-3.5" />
          Book Appointment
        </a>
      </header>

      {/* Hero */}
      <section className="relative py-24 px-6 max-w-4xl mx-auto text-center">
        <h1 className="text-4xl sm:text-6xl font-extralight text-white leading-tight tracking-wide uppercase mb-6">
          Elevate Your <span className="font-bold text-rose-400">Natural Glow</span>
        </h1>
        <p className="text-zinc-400 text-base sm:text-lg mb-10 max-w-2xl mx-auto leading-relaxed font-light">
          {lead.tagline || lead.description || "A luxury salon experience built around custom treatments, premium hair care, and relaxing spa sessions designed for you."}
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <a 
            href="#services" 
            className="w-full sm:w-auto bg-white hover:bg-zinc-200 text-black font-semibold px-8 py-4 rounded-xl text-sm transition-all duration-300 uppercase tracking-widest"
          >
            Our Services
          </a>
          <a 
            href="#contact" 
            className="w-full sm:w-auto border border-white/10 hover:bg-white/5 text-white font-semibold px-8 py-4 rounded-xl text-sm transition-all duration-300 uppercase tracking-widest"
          >
            Get Free Consultation
          </a>
        </div>
      </section>

      {/* Service list */}
      <section id="services" className="py-16 px-6 max-w-4xl mx-auto border-t border-white/5">
        <div className="text-center mb-12">
          <h2 className="text-xs font-bold text-rose-400 uppercase tracking-[0.3em] mb-2">Treatments</h2>
          <h3 className="text-2xl sm:text-3xl font-light text-white uppercase tracking-wider">Premium Service Catalog</h3>
        </div>

        <div className="space-y-4">
          <div className="flex justify-between items-center border-b border-zinc-800 pb-4">
            <div>
              <h4 className="text-base font-bold text-white">Signature Haircuts & Styling</h4>
              <p className="text-xs text-zinc-500">Includes consultation, wash, massage, and professional blowout.</p>
            </div>
            <span className="text-rose-400 font-bold text-sm">Consultation Required</span>
          </div>

          <div className="flex justify-between items-center border-b border-zinc-800 pb-4">
            <div>
              <h4 className="text-base font-bold text-white">Revitalizing Face Cleansing</h4>
              <p className="text-xs text-zinc-500">Premium organic products custom selected for your skin type.</p>
            </div>
            <span className="text-rose-400 font-bold text-sm">Custom Session</span>
          </div>

          <div className="flex justify-between items-center border-b border-zinc-800 pb-4">
            <div>
              <h4 className="text-base font-bold text-white">Luxury Bridal Makeup & Styling</h4>
              <p className="text-xs text-zinc-500">Complete styling packages tailored to perfection for your big day.</p>
            </div>
            <span className="text-rose-400 font-bold text-sm">Elite Service</span>
          </div>
        </div>
      </section>

      {/* Booking Form */}
      <section id="contact" className="py-16 px-6 max-w-4xl mx-auto border-t border-white/5">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 items-center">
          <div className="md:col-span-7 space-y-6">
            <h3 className="text-3xl font-light text-white uppercase tracking-wider leading-none">Schedule Appointment</h3>
            <p className="text-zinc-400 text-sm leading-relaxed font-light">
              Pamper yourself with the treatment you deserve. Select your date, submit details, and our premium stylist team will call you to confirm.
            </p>
            <div className="space-y-4 pt-4">
              <div className="flex items-center gap-3">
                <MapPin className="w-5 h-5 text-rose-400 shrink-0" />
                <span className="text-sm font-semibold">{lead.address}</span>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-rose-400 shrink-0" />
                <span className="text-sm font-semibold">{lead.phone}</span>
              </div>
            </div>
          </div>
          <div className="md:col-span-5">
            <ContactForm businessName={lead.name} themeColor="rose" />
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t border-zinc-900 text-center text-xs text-zinc-600">
        <p className="mb-2 uppercase tracking-widest font-black text-zinc-500">&copy; {new Date().getFullYear()} {lead.name}</p>
        <p>Proudly presented by Asenra Venture Studio Demo Network</p>
      </footer>
    </div>
  );
}

// -------------------------------------------------------------------
// 4. CLEANING / GENERAL SERVICE TEMPLATE
// -------------------------------------------------------------------
export function ServicesTemplate({ lead }: { lead: Lead }) {
  const accentColor = "#059669"; // Emerald

  return (
    <div className="min-h-screen bg-slate-950 text-slate-300 font-sans selection:bg-emerald-600 selection:text-white">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-slate-950/80 backdrop-blur-md border-b border-slate-800 py-4 px-6 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="p-1.5 bg-emerald-600/10 border border-emerald-600/20 rounded-lg text-emerald-400">
            <Sparkles className="w-5 h-5" />
          </div>
          <span className="font-extrabold text-lg tracking-tight text-white uppercase">{lead.name}</span>
        </div>
        <a 
          href={`tel:${lead.phone}`}
          className="bg-emerald-600 hover:bg-emerald-700 text-white py-2.5 px-5 rounded-lg text-xs font-bold tracking-wide uppercase flex items-center gap-2 transition-all duration-300"
        >
          <Phone className="w-3.5 h-3.5" />
          Call Service
        </a>
      </header>

      {/* Hero */}
      <section className="relative py-24 px-6 max-w-4xl mx-auto text-center">
        <h1 className="text-4xl sm:text-6xl font-black text-white leading-tight tracking-tight uppercase mb-6">
          {lead.tagline || "Professional Service You Can Trust"}
        </h1>
        <p className="text-slate-400 text-base sm:text-lg mb-10 max-w-2xl mx-auto leading-relaxed">
          {lead.description || "High-quality, reliable, and premium local services tailored exactly to your home or office needs. Certified professionals ready to help."}
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <a 
            href="#contact" 
            className="w-full sm:w-auto bg-emerald-600 hover:bg-emerald-700 text-white font-bold px-8 py-4 rounded-xl text-sm transition-all duration-300 uppercase tracking-wide"
          >
            Get a Free Quote
          </a>
          <a 
            href="#benefits" 
            className="w-full sm:w-auto border border-slate-800 hover:bg-white/5 text-white font-bold px-8 py-4 rounded-xl text-sm transition-all duration-300 uppercase tracking-wide flex items-center justify-center gap-2"
          >
            <CheckCircle className="w-4 h-4 text-emerald-400" />
            Our Quality Guarantee
          </a>
        </div>
      </section>

      {/* Trust Grid */}
      <section id="benefits" className="py-16 px-6 max-w-4xl mx-auto border-t border-slate-800">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-slate-900/40 border border-slate-800 p-6 rounded-2xl flex gap-4">
            <CheckCircle className="w-6 h-6 text-emerald-400 shrink-0 mt-1" />
            <div>
              <h4 className="text-base font-bold text-white mb-1">Fully Certified Professionals</h4>
              <p className="text-xs text-slate-400 leading-relaxed">Every team member undergoes complete background checks and is fully trained to deliver high standards.</p>
            </div>
          </div>

          <div className="bg-slate-900/40 border border-slate-800 p-6 rounded-2xl flex gap-4">
            <Shield className="w-6 h-6 text-emerald-400 shrink-0 mt-1" />
            <div>
              <h4 className="text-base font-bold text-white mb-1">100% Satisfaction Guaranteed</h4>
              <p className="text-xs text-slate-400 leading-relaxed">If you aren't completely happy with our work, we will come back and fix it free of charge.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Form */}
      <section id="contact" className="py-16 px-6 max-w-4xl mx-auto border-t border-slate-800">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 items-center">
          <div className="md:col-span-7 space-y-6">
            <h3 className="text-3xl font-black text-white uppercase tracking-tight leading-none">Request Free Quote</h3>
            <p className="text-slate-400 text-sm leading-relaxed">
              No hidden fees. Submit your phone number and we will get back to you within 30 minutes with a free pricing estimate for your requirements.
            </p>
            <div className="space-y-4 pt-4">
              <div className="flex items-center gap-3">
                <MapPin className="w-5 h-5 text-emerald-400 shrink-0" />
                <span className="text-sm font-semibold">{lead.address}</span>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-emerald-400 shrink-0" />
                <span className="text-sm font-semibold">{lead.phone}</span>
              </div>
            </div>
          </div>
          <div className="md:col-span-5">
            <ContactForm businessName={lead.name} themeColor="emerald" />
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t border-slate-800 text-center text-xs text-slate-600">
        <p className="mb-2 uppercase tracking-widest font-black text-slate-500">&copy; {new Date().getFullYear()} {lead.name}</p>
        <p>Proudly presented by Asenra Venture Studio Demo Network</p>
      </footer>
    </div>
  );
}

// -------------------------------------------------------------------
// 5. GENERAL CORPORATE TEMPLATE
// -------------------------------------------------------------------
export function GeneralTemplate({ lead }: { lead: Lead }) {
  const accentColor = "#2563EB"; // Blue

  return (
    <div className="min-h-screen bg-black text-neutral-300 font-sans selection:bg-blue-600 selection:text-white">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-black/80 backdrop-blur-md border-b border-white/5 py-4 px-6 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="p-1.5 bg-blue-600/10 border border-blue-600/20 rounded-lg text-blue-400">
            <Globe className="w-5 h-5" />
          </div>
          <span className="font-bold text-lg tracking-tight text-white uppercase">{lead.name}</span>
        </div>
        <a 
          href={`tel:${lead.phone}`}
          className="bg-blue-600 hover:bg-blue-700 text-white py-2.5 px-5 rounded-lg text-xs font-bold tracking-wide uppercase flex items-center gap-2 transition-all duration-300"
        >
          <Phone className="w-3.5 h-3.5" />
          Contact Us
        </a>
      </header>

      {/* Hero */}
      <section className="relative py-24 px-6 max-w-4xl mx-auto text-center">
        <h1 className="text-4xl sm:text-6xl font-extrabold text-white leading-tight tracking-tight uppercase mb-6">
          {lead.tagline || "Modern Solutions for Your Growth"}
        </h1>
        <p className="text-neutral-400 text-base sm:text-lg mb-10 max-w-2xl mx-auto leading-relaxed">
          {lead.description || "Discover premium services, expert consultations, and dedicated support built around your business goals."}
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <a 
            href="#contact" 
            className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-white font-bold px-8 py-4 rounded-xl text-sm transition-all duration-300 uppercase tracking-wide"
          >
            Learn More
          </a>
        </div>
      </section>

      {/* Booking Form */}
      <section id="contact" className="py-16 px-6 max-w-4xl mx-auto border-t border-white/5">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 items-center">
          <div className="md:col-span-7 space-y-6">
            <h3 className="text-3xl font-black text-white uppercase tracking-tight leading-none">Connect With Us</h3>
            <p className="text-neutral-400 text-sm leading-relaxed">
              Have questions? Submit your details and our team will get in touch to discuss how we can help.
            </p>
            <div className="space-y-4 pt-4">
              <div className="flex items-center gap-3">
                <MapPin className="w-5 h-5 text-blue-500 shrink-0" />
                <span className="text-sm font-semibold">{lead.address}</span>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-blue-500 shrink-0" />
                <span className="text-sm font-semibold">{lead.phone}</span>
              </div>
            </div>
          </div>
          <div className="md:col-span-5">
            <ContactForm businessName={lead.name} themeColor="blue" />
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t border-white/5 text-center text-xs text-neutral-600">
        <p className="mb-2 uppercase tracking-widest font-black text-neutral-500">&copy; {new Date().getFullYear()} {lead.name}</p>
        <p>Proudly presented by Asenra Venture Studio Demo Network</p>
      </footer>
    </div>
  );
}
