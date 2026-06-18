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

// Dynamic theme configuration mapping to support user-selected accents
export interface ThemeConfig {
  text: string;           // text accent color (e.g. text-[#c5a880])
  textHover: string;      // text hover color (e.g. group-hover:text-[#c5a880])
  border: string;         // border color (e.g. border-[#c5a880]/20)
  borderHover: string;    // border hover color (e.g. hover:border-[#c5a880]/40)
  bg: string;             // background color (e.g. bg-[#c5a880])
  bgHover: string;        // background hover color (e.g. hover:bg-[#b0946f])
  glow: string;           // rgba value for shadows (e.g. rgba(197,168,128,0.15))
  glowClass: string;      // hover shadow class (e.g. hover:shadow-[0_0_30px_rgba(197,168,128,0.15)])
  btn: string;            // button gradient or color class (e.g. bg-[#c5a880] ...)
  textShine: string;      // shine text class (e.g. text-shine-gold)
  icon: string;           // icon color class (e.g. text-[#c5a880])
  accent: string;         // hex color representation
}

export function getThemeConfig(themeColor: string = "gold"): ThemeConfig {
  const normalized = (themeColor || "gold").toLowerCase();
  
  const configs: Record<string, ThemeConfig> = {
    gold: {
      text: "text-[#c5a880]",
      textHover: "group-hover:text-[#c5a880]",
      border: "border-[#c5a880]/20",
      borderHover: "hover:border-[#c5a880]/40",
      bg: "bg-[#c5a880]",
      bgHover: "hover:bg-[#b0946f]",
      glow: "rgba(197, 168, 128, 0.15)",
      glowClass: "hover:shadow-[0_0_30px_rgba(197,168,128,0.15)]",
      btn: "bg-gradient-to-r from-[#bf953f] via-[#fcf6ba] to-[#b38728] hover:from-[#b38728] hover:to-[#bf953f] text-black font-extrabold btn-shine-effect shadow-[0_4px_15px_rgba(197,168,128,0.3)]",
      textShine: "text-shine-gold",
      icon: "text-[#c5a880]",
      accent: "#c5a880"
    },
    white: {
      text: "text-white",
      textHover: "group-hover:text-white",
      border: "border-white/10",
      borderHover: "hover:border-white/30",
      bg: "bg-white",
      bgHover: "hover:bg-neutral-200",
      glow: "rgba(255, 255, 255, 0.08)",
      glowClass: "hover:shadow-[0_0_30px_rgba(255,255,255,0.08)]",
      btn: "bg-white hover:bg-neutral-100 text-black font-bold btn-shine-effect shadow-[0_4px_15px_rgba(255,255,255,0.15)]",
      textShine: "text-shine-silver",
      icon: "text-white/70",
      accent: "#ffffff"
    },
    rose: {
      text: "text-rose-400",
      textHover: "group-hover:text-rose-400",
      border: "border-rose-400/20",
      borderHover: "hover:border-rose-400/40",
      bg: "bg-rose-400",
      bgHover: "hover:bg-rose-500",
      glow: "rgba(244, 63, 94, 0.12)",
      glowClass: "hover:shadow-[0_0_30px_rgba(244, 63, 94, 0.12)]",
      btn: "bg-gradient-to-r from-rose-400 to-pink-500 hover:from-pink-500 hover:to-rose-400 text-white font-bold btn-shine-effect shadow-[0_4px_15px_rgba(244,63,94,0.3)]",
      textShine: "text-shine-rose",
      icon: "text-rose-400",
      accent: "#f43f5e"
    },
    emerald: {
      text: "text-emerald-400",
      textHover: "group-hover:text-emerald-400",
      border: "border-emerald-500/20",
      borderHover: "hover:border-emerald-500/40",
      bg: "bg-emerald-600",
      bgHover: "hover:bg-emerald-700",
      glow: "rgba(16, 185, 129, 0.12)",
      glowClass: "hover:shadow-[0_0_30px_rgba(16,185,129,0.12)]",
      btn: "bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-teal-600 hover:to-emerald-500 text-white font-bold btn-shine-effect shadow-[0_4px_15px_rgba(16,185,129,0.3)]",
      textShine: "text-shine-emerald",
      icon: "text-emerald-400",
      accent: "#10b981"
    },
    blue: {
      text: "text-blue-400",
      textHover: "group-hover:text-blue-400",
      border: "border-blue-500/20",
      borderHover: "hover:border-blue-500/40",
      bg: "bg-blue-600",
      bgHover: "hover:bg-blue-700",
      glow: "rgba(37, 99, 235, 0.12)",
      glowClass: "hover:shadow-[0_0_30px_rgba(37, 99, 235, 0.12)]",
      btn: "bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-indigo-600 hover:to-blue-500 text-white font-bold btn-shine-effect shadow-[0_4px_15px_rgba(37,99,235,0.3)]",
      textShine: "text-shine-blue",
      icon: "text-blue-400",
      accent: "#2563eb"
    },
    crimson: {
      text: "text-[#EE0000]",
      textHover: "group-hover:text-[#EE0000]",
      border: "border-[#EE0000]/20",
      borderHover: "hover:border-[#EE0000]/40",
      bg: "bg-[#EE0000]",
      bgHover: "hover:bg-[#cc0000]",
      glow: "rgba(238, 0, 0, 0.15)",
      glowClass: "hover:shadow-[0_0_30px_rgba(238, 0, 0, 0.15)]",
      btn: "bg-gradient-to-r from-[#EE0000] to-red-600 hover:from-red-600 hover:to-[#EE0000] text-white font-bold btn-shine-effect shadow-[0_4px_15px_rgba(238,0,0,0.3)]",
      textShine: "text-shine-crimson",
      icon: "text-[#EE0000]",
      accent: "#EE0000"
    }
  };

  return configs[normalized] || configs.gold;
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

  const cfg = getThemeConfig(themeColor);

  if (submitted) {
    return (
      <div className="bg-white/5 backdrop-blur-xl border border-white/10 p-8 rounded-2xl text-center shadow-2xl">
        <CheckCircle className="w-12 h-12 text-emerald-400 mx-auto mb-4 animate-bounce" />
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
          className="w-full bg-black/60 border border-white/10 rounded-xl px-4 py-3 text-white text-sm outline-hidden focus:border-white/40 focus:ring-1 focus:ring-white/20 transition-all"
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
          className="w-full bg-black/60 border border-white/10 rounded-xl px-4 py-3 text-white text-sm outline-hidden focus:border-white/40 focus:ring-1 focus:ring-white/20 transition-all"
          placeholder="+91 XXXXX XXXXX"
        />
      </div>
      <button 
        type="submit" 
        className={`w-full py-3.5 rounded-xl font-bold text-sm transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer ${cfg.btn}`}
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
    "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?q=80&w=400", // Coffee pouring
    "https://images.unsplash.com/photo-1509440159596-0249088772ff?q=80&w=400", // Bakery/croissants
    "https://images.unsplash.com/photo-1544787219-7f47ccb76574?q=80&w=400", // Table setup
    "https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?q=80&w=400"  // Cozy corner
  ];

  const prices = ["₹290", "₹340", "₹380", "₹420"];
  const descriptions = [
    "Hand-selected single origin beans, brewed slowly for a complex, aromatic cup.",
    "Butter-layered pastry, baked fresh daily by our master pastry chefs.",
    "24-hour slow steeped house blend, served over ice for a rich, smooth finish.",
    "Bespoke seasonal sweet creations crafted with premium global ingredients."
  ];

  const cfg = getThemeConfig(lead.color_theme);

  return (
    <div 
      className="min-h-screen bg-[#0b0a09] text-[#eae5db] selection:bg-[#c5a880] selection:text-[#0b0a09] leading-relaxed relative overflow-hidden"
      style={{ fontFamily: "'Outfit', sans-serif" }}
    >
      {/* Background Decorative Gold Orbs */}
      <div className={`absolute top-1/4 left-1/4 w-[300px] sm:w-[400px] h-[300px] sm:h-[400px] rounded-full blur-[100px] pointer-events-none opacity-20`} style={{ backgroundColor: cfg.accent }} />
      <div className={`absolute bottom-1/4 right-1/4 w-[300px] sm:w-[400px] h-[300px] sm:h-[400px] rounded-full blur-[120px] pointer-events-none opacity-10`} style={{ backgroundColor: cfg.accent }} />

      {/* Header */}
      <header className="sticky top-0 z-50 bg-[#0b0a09]/95 backdrop-blur-md border-b border-[#221f1c] py-5 px-4 sm:px-12 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className={`w-5 h-5 rounded-full border flex items-center justify-center`} style={{ borderColor: cfg.accent }}>
            <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: cfg.accent }} />
          </div>
          <span 
            className="text-xs sm:text-sm font-black tracking-[0.25em] text-[#eae5db] uppercase truncate max-w-[150px] sm:max-w-none"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            {lead.name}
          </span>
        </div>
        <a 
          href="#reserve"
          className={`border hover:bg-white/10 py-2.5 px-4 sm:px-6 rounded-none text-[10px] sm:text-xs font-bold tracking-widest uppercase transition-all duration-300 btn-shine-effect`}
          style={{ borderColor: `${cfg.accent}60`, color: cfg.accent }}
        >
          Reserve Table
        </a>
      </header>

      {/* Hero */}
      <section className="relative py-12 sm:py-20 px-4 sm:px-12 max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
        <div className="lg:col-span-7 space-y-6 sm:space-y-8 text-left">
          <span className={`text-xs font-bold tracking-[0.3em] uppercase block`} style={{ color: cfg.accent }}>Bespoke Gastronomy</span>
          <h1 
            className="text-3xl sm:text-5xl lg:text-7xl font-extralight text-white leading-tight tracking-tight uppercase break-words"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            <span className={cfg.textShine}>{lead.tagline || "Artisanal Brews & Slow Living"}</span>
          </h1>
          <div className="w-16 h-[1px] bg-white/20" />
          <p className="text-[#bbb09c] text-sm sm:text-base leading-relaxed max-w-xl font-light">
            {lead.description || "Every cup is a ritual. We source organic, high-altitude coffee beans directly from fair-trade estates and bake signature French pastries daily in our micro-bakery."}
          </p>
          {lead.rating && (
            <div className="flex items-center gap-1.5 text-xs">
              <Star className="w-3.5 h-3.5 fill-current" style={{ color: cfg.accent }} />
              <span className="font-bold text-white">{lead.rating}</span>
              <span className="text-neutral-500">({lead.review_count} Google reviews)</span>
            </div>
          )}
          <div className="flex gap-4 pt-2">
            <a 
              href="#menu" 
              className={`font-semibold px-6 sm:px-8 py-3.5 sm:py-4 rounded-none text-[10px] sm:text-xs tracking-widest uppercase transition-all duration-300 btn-shine-effect shadow-md`}
              style={{ backgroundColor: cfg.accent, color: '#0b0a09' }}
            >
              Explore Menu
            </a>
          </div>
        </div>
        
        {/* Editorial Image Frame */}
        <div className="lg:col-span-5 relative w-full aspect-[4/5] rounded-none overflow-hidden border border-[#221f1c] shadow-2xl bg-neutral-900">
          <img 
            src="https://images.unsplash.com/photo-1554118811-1e0d58224f24?q=80&w=800"
            alt="Signature Cafe Interior"
            className="w-full h-full object-cover scale-102 hover:scale-105 transition-transform duration-700"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
        </div>
      </section>

      {/* Menu / Highlights Section */}
      <section id="menu" className="py-16 sm:py-24 px-4 sm:px-12 max-w-5xl mx-auto border-t border-[#221f1c]">
        <div className="text-center mb-12 sm:mb-20">
          <span className="text-xs font-bold uppercase tracking-[0.3em] block mb-2" style={{ color: cfg.accent }}>Carte du Jour</span>
          <h2 
            className="text-2xl sm:text-4xl lg:text-5xl font-extralight text-white uppercase tracking-wider"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            The Signature Menu
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
          {services.map((service, index) => (
            <div key={index} className={`group relative bg-[#13110f]/60 border p-6 rounded-2xl transition-all duration-500 backdrop-blur-md ${cfg.glowClass}`} style={{ borderColor: `${cfg.accent}15` }}>
              <div className="flex justify-between items-baseline gap-2 mb-2">
                <h4 
                  className={`text-base sm:text-lg font-bold text-white uppercase tracking-wide transition-colors`}
                  style={{ fontFamily: "'Playfair Display', serif" }}
                >
                  {service}
                </h4>
                <span className="text-xs sm:text-sm font-bold font-mono" style={{ color: cfg.accent }}>{prices[index % prices.length]}</span>
              </div>
              <p className="text-xs text-[#bbb09c] font-light leading-relaxed">
                {descriptions[index % descriptions.length]}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Culinary Collage Grid */}
      <section className="py-12 border-t border-[#221f1c] bg-[#080706]">
        <div className="max-w-6xl mx-auto px-4 sm:px-12 grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {cafeImages.map((img, idx) => (
            <div key={idx} className="aspect-[4/5] overflow-hidden border border-[#221f1c] rounded-xl hover:border-white/20 transition-all duration-500 hover:shadow-lg">
              <img 
                src={img} 
                alt="Cafe Details" 
                className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-500 hover:scale-105"
              />
            </div>
          ))}
        </div>
      </section>

      {/* Booking Form */}
      <section id="reserve" className="py-16 sm:py-24 px-4 sm:px-12 max-w-6xl mx-auto border-t border-[#221f1c]">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          <div className="lg:col-span-7 space-y-6">
            <h3 
              className="text-2xl sm:text-4xl lg:text-5xl font-extralight text-white uppercase tracking-tight leading-none"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              Reserve A Table
            </h3>
            <p className="text-[#bbb09c] text-sm leading-relaxed font-light max-w-md">
              Join us for a slow afternoon. Submit your contact details below, and our host team will call you to confirm your table reservations.
            </p>
            <div className="space-y-4 pt-2 text-sm font-light">
              <div className="flex items-center gap-3">
                <MapPin className="w-5 h-5 shrink-0" style={{ color: `${cfg.accent}80` }} />
                <span className="text-xs sm:text-sm">{lead.address}</span>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="w-5 h-5 shrink-0" style={{ color: `${cfg.accent}80` }} />
                <span className="text-xs sm:text-sm">{lead.phone}</span>
              </div>
              <div className="flex items-center gap-3">
                <Clock className="w-5 h-5 shrink-0" style={{ color: `${cfg.accent}80` }} />
                <span className="text-xs sm:text-sm">Open Daily: 8:00 AM - 10:00 PM</span>
              </div>
            </div>
          </div>
          <div className={`lg:col-span-5 bg-[#0e0d0b]/80 border p-6 sm:p-8 rounded-3xl backdrop-blur-xl ${cfg.glowClass}`} style={{ borderColor: `${cfg.accent}20` }}>
            <ContactForm businessName={lead.name} themeColor={lead.color_theme} />
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t border-[#221f1c] text-center text-xs text-[#554e42]">
        <p className="mb-2 uppercase tracking-widest font-black text-[#554e42]/80">&copy; {new Date().getFullYear()} {lead.name}</p>
        <p>Proudly presented by Asenra Venture Studio Demo Network</p>
      </footer>
    </div>
  );
}

// -------------------------------------------------------------------
// 2. GYM / FITNESS TEMPLATE (Elite Dark Mode, Luxury Accents)
// -------------------------------------------------------------------
export function GymTemplate({ lead }: { lead: Lead }) {
  const services = parseServices(lead.services, [
    "High-Performance Free Weights",
    "Olympic Lifting Platforms",
    "Metabolic Conditioning (HIIT)",
    "Elite Performance Coaching"
  ]);

  const gymImages = [
    "https://images.unsplash.com/photo-1541534741688-6078c6bfb5c5?q=80&w=400", // Cardio/Sprinting
    "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?q=80&w=400", // Barbell lift
    "https://images.unsplash.com/photo-1549719386-74dfcbf7dbed?q=80&w=400", // Boxing/Focus
    "https://images.unsplash.com/photo-1518611012118-696072aa579a?q=80&w=400"  // Athletic stretching
  ];

  const cfg = getThemeConfig(lead.color_theme);

  return (
    <div 
      className="min-h-screen bg-[#080706] text-[#eaeaea] selection:bg-white selection:text-black leading-tight relative overflow-hidden"
      style={{ fontFamily: "'Outfit', sans-serif" }}
    >
      {/* Background Luxury Glows */}
      <div className="absolute top-0 left-10 w-[300px] sm:w-[500px] h-[300px] sm:h-[500px] rounded-full blur-[130px] pointer-events-none opacity-20" style={{ backgroundColor: cfg.accent }} />
      <div className="absolute top-1/2 right-10 w-[300px] sm:w-[400px] h-[300px] sm:h-[400px] rounded-full blur-[120px] pointer-events-none opacity-10" style={{ backgroundColor: cfg.accent }} />

      {/* Header */}
      <header className="sticky top-0 z-50 bg-[#080706]/90 backdrop-blur-md border-b py-5 px-4 sm:px-12 flex items-center justify-between" style={{ borderColor: `${cfg.accent}15` }}>
        <div className="flex items-center gap-2">
          <Dumbbell className="w-5 h-5" style={{ color: cfg.accent }} />
          <span 
            className="text-base sm:text-lg font-black tracking-tighter text-white uppercase italic truncate max-w-[150px] sm:max-w-none"
            style={{ fontFamily: "'Syne', sans-serif" }}
          >
            {lead.name}
          </span>
        </div>
        <a 
          href="#pass"
          className={`py-2.5 px-4 sm:px-6 rounded-none text-[10px] sm:text-xs font-black tracking-widest uppercase transition-all duration-300 shadow-lg btn-shine-effect`}
          style={{ backgroundColor: cfg.accent, color: "#000000" }}
        >
          Get Free Pass
        </a>
      </header>

      {/* Hero */}
      <section className="relative py-12 sm:py-20 px-4 sm:px-12 max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
        <div className="lg:col-span-7 space-y-6 sm:space-y-8 text-left">
          <span className={`text-xs font-mono font-bold tracking-[0.3em] uppercase block`} style={{ color: cfg.accent }}>
            // ELITE STRENGTH ZONE
          </span>
          <h1 
            className="text-4xl sm:text-6xl lg:text-8xl font-black text-white leading-none uppercase italic tracking-tighter break-words"
            style={{ fontFamily: "'Syne', sans-serif" }}
          >
            <span className={cfg.textShine}>{lead.tagline || "Break Your Limits."}</span>
          </h1>
          <div className="w-16 h-[2px]" style={{ backgroundColor: cfg.accent }} />
          <p className="text-neutral-400 text-sm sm:text-base leading-relaxed max-w-xl font-light">
            {lead.description || "Transform your athletic output. We supply high-end strength platforms, hand-selected biomechanically correct weight stacks, and elite coaching designed to build raw power."}
          </p>
          {lead.rating && (
            <div className="flex items-center gap-2 text-xs font-mono">
              <Star className="w-3.5 h-3.5 fill-current" style={{ color: cfg.accent }} />
              <span className="font-bold text-white">{lead.rating}</span>
              <span className="text-neutral-600">/</span>
              <span className="text-neutral-400">{lead.review_count} Reviews</span>
            </div>
          )}
          <div className="flex gap-4 pt-2">
            <a 
              href="#pass" 
              className="bg-white hover:bg-neutral-200 text-black font-extrabold px-6 sm:px-8 py-3.5 sm:py-4 rounded-none text-[10px] sm:text-xs tracking-widest uppercase transition-all duration-300 btn-shine-effect shadow-md"
            >
              Start Training
            </a>
          </div>
        </div>

        {/* Hero Athletic Image */}
        <div className="lg:col-span-5 relative w-full aspect-[4/5] rounded-none overflow-hidden border shadow-2xl bg-neutral-900" style={{ borderColor: `${cfg.accent}15` }}>
          <img 
            src="https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=800"
            alt="Elite Athlete Training"
            className="w-full h-full object-cover scale-102 hover:scale-105 transition-transform duration-700 grayscale contrast-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
        </div>
      </section>

      {/* Services Section */}
      <section className="py-16 sm:py-24 px-4 sm:px-12 max-w-6xl mx-auto border-t border-white/5">
        <div className="text-center mb-12 sm:mb-20">
          <span className="text-xs font-mono font-bold tracking-[0.3em] block mb-2" style={{ color: cfg.accent }}>// CAPABILITIES</span>
          <h2 
            className="text-2xl sm:text-4xl lg:text-5xl font-black text-white uppercase italic tracking-tighter"
            style={{ fontFamily: "'Syne', sans-serif" }}
          >
            The Training Pillars
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {services.map((service, index) => (
            <div key={index} className={`group relative bg-[#0e0d0b]/80 border p-6 sm:p-8 rounded-2xl transition-all duration-500 backdrop-blur-md ${cfg.glowClass}`} style={{ borderColor: `${cfg.accent}15` }}>
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none rounded-2xl" style={{ backgroundColor: `${cfg.accent}05` }} />
              
              <span className="font-mono text-xs mb-6 font-bold block" style={{ color: cfg.accent }}>0{index + 1} /</span>
              <h4 
                className="text-base sm:text-lg font-bold text-white uppercase italic tracking-tight mb-4 group-hover:text-white transition-colors"
                style={{ fontFamily: "'Syne', sans-serif" }}
              >
                {service}
              </h4>
              <p className="text-xs text-neutral-400 font-light leading-relaxed">
                Engineered to push your physical envelope under professional athletic guidelines.
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Kinetic Photo Grid */}
      <section className="py-12 border-t border-white/5 bg-[#030303]">
        <div className="max-w-6xl mx-auto px-4 sm:px-12 grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {gymImages.map((img, idx) => (
            <div key={idx} className="aspect-[4/5] overflow-hidden border rounded-xl transition-all duration-500 hover:shadow-lg" style={{ borderColor: `${cfg.accent}15` }}>
              <img 
                src={img} 
                alt="Gym Training Facility" 
                className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-500 hover:scale-105"
              />
            </div>
          ))}
        </div>
      </section>

      {/* Booking Form */}
      <section id="pass" className="py-16 sm:py-24 px-4 sm:px-12 max-w-6xl mx-auto border-t border-white/5">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          <div className="lg:col-span-7 space-y-6">
            <h3 
              className="text-2xl sm:text-4xl lg:text-5xl font-black text-white uppercase italic tracking-tighter leading-none"
              style={{ fontFamily: "'Syne', sans-serif" }}
            >
              Get Free Day Access
            </h3>
            <p className="text-neutral-400 text-sm leading-relaxed font-light max-w-md">
              Secure your training slot. Submit your name and number below, and our performance coordinators will call you to activate your guest pass.
            </p>
            <div className="space-y-4 pt-2 text-sm font-light">
              <div className="flex items-center gap-3">
                <MapPin className="w-5 h-5 shrink-0" style={{ color: `${cfg.accent}80` }} />
                <span className="text-xs sm:text-sm">{lead.address}</span>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="w-5 h-5 shrink-0" style={{ color: `${cfg.accent}80` }} />
                <span className="text-xs sm:text-sm">{lead.phone}</span>
              </div>
              <div className="flex items-center gap-3">
                <Clock className="w-5 h-5 shrink-0" style={{ color: `${cfg.accent}80` }} />
                <span className="text-xs sm:text-sm">Open 24/7 for Members</span>
              </div>
            </div>
          </div>
          <div className={`lg:col-span-5 bg-[#0e0d0b]/90 border p-6 sm:p-8 rounded-3xl backdrop-blur-xl ${cfg.glowClass}`} style={{ borderColor: `${cfg.accent}25` }}>
            <ContactForm businessName={lead.name} themeColor={lead.color_theme} />
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-16 border-t text-center text-xs text-neutral-600" style={{ borderColor: `${cfg.accent}15` }}>
        <p className="mb-2 uppercase tracking-widest font-black text-neutral-500">&copy; {new Date().getFullYear()} {lead.name}</p>
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

  const cfg = getThemeConfig(lead.color_theme);

  return (
    <div 
      className="min-h-screen bg-[#faf8f5] text-[#2c2623] leading-relaxed font-light relative overflow-hidden"
      style={{ 
        fontFamily: "'Outfit', sans-serif",
        // Fallback styling for selection colors matching theme
        selectionColor: '#ffffff',
        selectionBackgroundColor: cfg.accent
      } as React.CSSProperties}
    >
      {/* Background Decorative Rose Glows */}
      <div className="absolute top-1/4 right-10 w-[300px] sm:w-[400px] h-[300px] sm:h-[400px] rounded-full blur-[100px] pointer-events-none opacity-10" style={{ backgroundColor: cfg.accent }} />
      <div className="absolute bottom-1/4 left-10 w-[300px] sm:w-[400px] h-[300px] sm:h-[400px] rounded-full blur-[120px] pointer-events-none opacity-5" style={{ backgroundColor: cfg.accent }} />

      {/* Header */}
      <header className="sticky top-0 z-50 bg-[#faf8f5]/90 backdrop-blur-md border-b border-[#ebdcd0] py-5 px-4 sm:px-6 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Scissors className="w-5 h-5" style={{ color: cfg.accent }} />
          <span 
            className="text-base sm:text-lg tracking-[0.2em] text-black uppercase truncate max-w-[150px] sm:max-w-none"
            style={{ fontFamily: "'Italiana', serif" }}
          >
            {lead.name}
          </span>
        </div>
        <a 
          href={`tel:${lead.phone}`}
          className="border py-2.5 px-4 sm:px-6 rounded-full text-[10px] sm:text-xs font-bold tracking-widest uppercase transition-all duration-300 btn-shine-effect shadow-xs"
          style={{ borderColor: `${cfg.accent}40`, color: cfg.accent }}
        >
          Book Appointment
        </a>
      </header>

      {/* Hero */}
      <section className="relative py-12 sm:py-24 px-4 sm:px-6 max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
        <div className="lg:col-span-7 space-y-6 text-left">
          <span className="text-xs font-bold tracking-[0.3em] uppercase block" style={{ color: cfg.accent }}>Exclusive Salon & Spa</span>
          <h1 
            className="text-4xl sm:text-6xl lg:text-7xl font-extralight text-black leading-tight tracking-wide uppercase break-words"
            style={{ fontFamily: "'Italiana', serif" }}
          >
            {lead.tagline ? (
              <span className={cfg.textShine}>{lead.tagline}</span>
            ) : (
              <>Refined <span className={`${cfg.textShine} font-normal`}>Beauty & Glamour</span></>
            )}
          </h1>
          <p className="text-zinc-600 text-sm sm:text-base leading-relaxed max-w-xl font-light">
            {lead.description || "A luxury salon experience built around custom treatments, premium hair care, and relaxing spa sessions designed for you."}
          </p>
          {lead.rating && (
            <div className="flex items-center gap-1.5 text-xs font-medium">
              <Star className="w-4 h-4 fill-current" style={{ color: cfg.accent }} />
              <span className="font-bold text-black">{lead.rating}</span>
              <span className="text-neutral-400">({lead.review_count} Google reviews)</span>
            </div>
          )}
          <div className="flex gap-4 pt-2">
            <a 
              href="#services" 
              className={`font-semibold px-6 sm:px-8 py-3.5 sm:py-4 rounded-full text-[10px] sm:text-xs tracking-widest uppercase transition-all duration-300 btn-shine-effect shadow-md ${cfg.btn}`}
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
      <section id="services" className="py-16 sm:py-20 px-4 sm:px-6 max-w-4xl mx-auto border-t border-[#ebdcd0]">
        <div className="text-center mb-12 sm:mb-16">
          <span className="text-xs font-bold uppercase tracking-[0.3em] block mb-2" style={{ color: cfg.accent }}>Treatments</span>
          <h2 
            className="text-2xl sm:text-4xl font-light text-black uppercase tracking-wider"
            style={{ fontFamily: "'Italiana', serif" }}
          >
            Signature Catalog
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
          {services.map((service, index) => (
            <div 
              key={index} 
              className={`group bg-white/70 border p-6 rounded-2xl transition-all duration-500 hover:shadow-lg backdrop-blur-md ${cfg.glowClass}`}
              style={{ 
                borderColor: `${cfg.accent}15`,
                ['--hover-color' as any]: cfg.accent 
              } as React.CSSProperties}
            >
              <div className="flex justify-between items-center mb-2">
                <h4 className="text-sm sm:text-base font-bold text-black group-hover:text-[var(--hover-color)] transition-colors">{service}</h4>
                <span className="font-bold text-xs sm:text-sm font-mono" style={{ color: cfg.accent }}>Couture</span>
              </div>
              <p className="text-xs text-zinc-500 leading-relaxed">Premium treatment custom-tailored to your style and wellness preferences.</p>
            </div>
          ))}
        </div>
      </section>

      {/* Booking Form */}
      <section id="contact" className="py-16 sm:py-20 px-4 sm:px-6 max-w-5xl mx-auto border-t border-[#ebdcd0]">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          <div className="lg:col-span-7 space-y-6">
            <h3 
              className="text-3xl sm:text-4xl font-light text-black uppercase tracking-wider leading-none"
              style={{ fontFamily: "'Italiana', serif" }}
            >
              Book Appointment
            </h3>
            <p className="text-zinc-600 text-sm leading-relaxed font-light">
              Pamper yourself with the treatment you deserve. Select your date, submit details, and our premium stylist team will call you to confirm.
            </p>
            <div className="space-y-4 pt-2 text-sm font-light">
              <div className="flex items-center gap-3">
                <MapPin className="w-5 h-5 shrink-0" style={{ color: cfg.accent }} />
                <span className="text-xs sm:text-sm">{lead.address}</span>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="w-5 h-5 shrink-0" style={{ color: cfg.accent }} />
                <span className="text-xs sm:text-sm">{lead.phone}</span>
              </div>
            </div>
          </div>
          <div 
            className={`lg:col-span-5 bg-white/80 border p-6 sm:p-8 rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-500 backdrop-blur-md ${cfg.glowClass}`}
            style={{ borderColor: `${cfg.accent}20` }}
          >
            <ContactForm businessName={lead.name} themeColor={lead.color_theme} />
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t border-[#ebdcd0] text-center text-xs text-zinc-500">
        <p className="mb-2 uppercase tracking-widest font-black text-zinc-400">&copy; {new Date().getFullYear()} {lead.name}</p>
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

  const cfg = getThemeConfig(lead.color_theme);

  return (
    <div 
      className="min-h-screen bg-slate-50 text-slate-700 leading-relaxed font-light relative overflow-hidden"
      style={{ 
        fontFamily: "'Outfit', sans-serif",
        selectionColor: '#ffffff',
        selectionBackgroundColor: cfg.accent
      } as React.CSSProperties}
    >
      {/* Background Decorative Emerald Glows */}
      <div className="absolute top-1/4 left-1/4 w-[300px] sm:w-[400px] h-[300px] sm:h-[400px] rounded-full blur-[100px] pointer-events-none opacity-5" style={{ backgroundColor: cfg.accent }} />
      <div className="absolute bottom-1/4 right-1/4 w-[300px] sm:w-[400px] h-[300px] sm:h-[400px] rounded-full blur-[120px] pointer-events-none opacity-5" style={{ backgroundColor: cfg.accent }} />

      {/* Header */}
      <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-slate-200 py-5 px-4 sm:px-6 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Sparkles className="w-5 h-5" style={{ color: cfg.accent }} />
          <span className="font-black text-base sm:text-lg tracking-tight text-slate-900 uppercase truncate max-w-[150px] sm:max-w-none">{lead.name}</span>
        </div>
        <a 
          href={`tel:${lead.phone}`}
          className={`py-2.5 px-4 sm:px-6 rounded-full text-[10px] sm:text-xs font-bold tracking-wide uppercase transition-all duration-300 btn-shine-effect shadow-md`}
          style={{ backgroundColor: cfg.accent, color: "#ffffff" }}
        >
          Book Service
        </a>
      </header>

      {/* Hero */}
      <section className="relative py-12 sm:py-24 px-4 sm:px-12 max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
        <div className="lg:col-span-7 space-y-6 text-left">
          <span className="text-xs font-bold tracking-[0.3em] uppercase block" style={{ color: cfg.accent }}>Reliable & Verified</span>
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 leading-tight tracking-tight uppercase break-words">
            <span className={cfg.textShine}>{lead.tagline || "Professional Service You Can Trust"}</span>
          </h1>
          <p className="text-slate-500 text-sm sm:text-base leading-relaxed max-w-xl font-light">
            {lead.description || "High-quality, reliable, and premium local services tailored exactly to your home or office needs. Certified professionals ready to help."}
          </p>
          {lead.rating && (
            <div className="flex items-center gap-1.5 text-xs font-semibold" style={{ color: cfg.accent }}>
              <Star className="w-4 h-4 fill-current" />
              <span className="font-bold text-slate-900">{lead.rating}</span>
              <span className="text-slate-400">({lead.review_count} Google reviews)</span>
            </div>
          )}
          <div className="flex gap-4 pt-2">
            <a 
              href="#contact" 
              className="font-bold px-6 sm:px-8 py-3.5 sm:py-4 rounded-full text-xs sm:text-sm transition-all duration-300 uppercase tracking-wide btn-shine-effect shadow-md"
              style={{ backgroundColor: cfg.accent, color: "#ffffff" }}
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
      <section className="py-16 sm:py-20 px-4 sm:px-12 max-w-5xl mx-auto border-t border-slate-200">
        <div className="text-center mb-12">
          <span className="text-xs font-bold uppercase tracking-[0.3em] block mb-2" style={{ color: cfg.accent }}>Our Offerings</span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 uppercase">Available Services</h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-8">
          {services.map((service, index) => (
            <div key={index} className="group bg-white border border-slate-200 p-6 rounded-2xl flex gap-4 transition-all duration-500 hover:shadow-lg">
              <CheckCircle className="w-6 h-6 shrink-0 mt-1 group-hover:scale-110 transition-transform" style={{ color: cfg.accent }} />
              <div>
                <h4 className="text-sm sm:text-base font-bold text-slate-900 mb-1 transition-colors">{service}</h4>
                <p className="text-xs text-slate-500 leading-relaxed">Professional service executed with utmost precision, certified techniques, and absolute care.</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Contact Form */}
      <section id="contact" className="py-16 sm:py-20 px-4 sm:px-12 max-w-5xl mx-auto border-t border-slate-200">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          <div className="lg:col-span-7 space-y-6">
            <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 uppercase tracking-tight leading-none">Request Free Quote</h3>
            <p className="text-slate-500 text-sm leading-relaxed">
              No hidden fees. Submit your phone number and we will get back to you within 30 minutes with a free pricing estimate for your requirements.
            </p>
            <div className="space-y-4 pt-2 text-sm">
              <div className="flex items-center gap-3">
                <MapPin className="w-5 h-5 shrink-0" style={{ color: cfg.accent }} />
                <span className="text-xs sm:text-sm">{lead.address}</span>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="w-5 h-5 shrink-0" style={{ color: cfg.accent }} />
                <span className="text-xs sm:text-sm">{lead.phone}</span>
              </div>
            </div>
          </div>
          <div className="lg:col-span-5 bg-white/95 border border-slate-200/80 p-6 sm:p-8 rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-500 backdrop-blur-md">
            <ContactForm businessName={lead.name} themeColor={lead.color_theme} />
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

  const cfg = getThemeConfig(lead.color_theme);

  return (
    <div 
      className="min-h-screen bg-black text-neutral-300 leading-relaxed font-light relative overflow-hidden"
      style={{ 
        fontFamily: "'Outfit', sans-serif",
        selectionColor: '#ffffff',
        selectionBackgroundColor: cfg.accent
      } as React.CSSProperties}
    >
      {/* Background Decorative Blue Glows */}
      <div className="absolute top-0 right-1/4 w-[300px] sm:w-[500px] h-[300px] sm:h-[500px] rounded-full blur-[120px] pointer-events-none opacity-20" style={{ backgroundColor: cfg.accent }} />
      <div className="absolute bottom-1/4 left-1/4 w-[300px] sm:w-[400px] h-[300px] sm:h-[400px] rounded-full blur-[100px] pointer-events-none opacity-10" style={{ backgroundColor: cfg.accent }} />

      {/* Header */}
      <header className="sticky top-0 z-50 bg-black/85 backdrop-blur-md border-b border-white/5 py-5 px-4 sm:px-6 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Globe className="w-5 h-5" style={{ color: cfg.accent }} />
          <span className="font-bold text-base sm:text-lg tracking-tight text-white uppercase truncate max-w-[150px] sm:max-w-none">{lead.name}</span>
        </div>
        <a 
          href={`tel:${lead.phone}`}
          className={`py-2.5 px-4 sm:px-6 rounded-full text-[10px] sm:text-xs font-bold tracking-wide uppercase transition-all duration-300 btn-shine-effect shadow-md`}
          style={{ backgroundColor: cfg.accent, color: "#ffffff" }}
        >
          Contact Now
        </a>
      </header>

      {/* Hero */}
      <section className="relative py-12 sm:py-24 px-4 sm:px-12 max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
        <div className="lg:col-span-7 space-y-6 text-left">
          <span className="text-xs font-bold tracking-[0.3em] uppercase block" style={{ color: cfg.accent }}>Tailored for You</span>
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-white leading-tight tracking-tight uppercase break-words">
            <span className={cfg.textShine}>{lead.tagline || "Modern Solutions for Your Growth"}</span>
          </h1>
          <p className="text-neutral-400 text-sm sm:text-base leading-relaxed max-w-xl font-light">
            {lead.description || "Premium services, expert consultations, and dedicated support built around your unique business goals."}
          </p>
          {lead.rating && (
            <div className="flex items-center gap-1.5 text-xs" style={{ color: cfg.accent }}>
              <Star className="w-4 h-4 fill-current" />
              <span className="font-bold text-white">{lead.rating}</span>
              <span className="text-neutral-500">({lead.review_count} Google reviews)</span>
            </div>
          )}
          <div className="flex gap-4 pt-2">
            <a 
              href="#contact" 
              className="font-bold px-6 sm:px-8 py-3.5 sm:py-4 rounded-full text-xs sm:text-sm transition-all duration-300 uppercase tracking-wide btn-shine-effect shadow-md"
              style={{ backgroundColor: cfg.accent, color: "#ffffff" }}
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
      <section className="py-16 sm:py-20 px-4 sm:px-12 max-w-4xl mx-auto border-t border-white/5">
        <div className="text-center mb-12">
          <span className="text-xs font-bold uppercase tracking-[0.3em] block mb-2" style={{ color: cfg.accent }}>Our Expertise</span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white uppercase">Services Offered</h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {services.map((service, index) => (
            <div key={index} className={`group bg-neutral-900/80 border border-white/5 p-6 rounded-2xl space-y-4 hover:border-white/10 transition-all duration-500 backdrop-blur-md ${cfg.glowClass}`}>
              <CheckCircle className="w-8 h-8 group-hover:scale-110 transition-transform" style={{ color: cfg.accent }} />
              <h4 className="text-base sm:text-lg font-bold text-white uppercase transition-colors">{service}</h4>
              <p className="text-xs text-neutral-400 leading-relaxed">Bespoke dynamic solutions designed specifically to scale operations and output quality.</p>
            </div>
          ))}
        </div>
      </section>

      {/* Booking Form */}
      <section id="contact" className="py-16 sm:py-20 px-4 sm:px-12 max-w-5xl mx-auto border-t border-white/5">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          <div className="lg:col-span-7 space-y-6">
            <h3 className="text-2xl sm:text-3xl font-black text-white uppercase tracking-tight leading-none">Inquire Today</h3>
            <p className="text-neutral-400 text-sm leading-relaxed font-light">
              We look forward to serving you. Submit your name and phone number and we will get back to you shortly.
            </p>
            <div className="space-y-4 pt-2 text-sm font-light">
              <div className="flex items-center gap-3">
                <MapPin className="w-5 h-5 shrink-0" style={{ color: cfg.accent }} />
                <span className="text-xs sm:text-sm">{lead.address}</span>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="w-5 h-5 shrink-0" style={{ color: cfg.accent }} />
                <span className="text-xs sm:text-sm">{lead.phone}</span>
              </div>
            </div>
          </div>
          <div className={`lg:col-span-5 bg-neutral-900/90 border p-6 sm:p-8 rounded-3xl backdrop-blur-xl ${cfg.glowClass}`} style={{ borderColor: `${cfg.accent}20` }}>
            <ContactForm businessName={lead.name} themeColor={lead.color_theme} />
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

  const cfg = getThemeConfig(lead.color_theme);

  return (
    <div 
      className="min-h-screen bg-[#0a0a0a] text-neutral-200 leading-relaxed font-light relative overflow-hidden"
      style={{ 
        fontFamily: "'Outfit', sans-serif",
        selectionColor: '#000000',
        selectionBackgroundColor: cfg.accent
      } as React.CSSProperties}
    >
      {/* Background Decorative Silver Glows */}
      <div className="absolute top-1/4 left-1/3 w-[300px] sm:w-[500px] h-[300px] sm:h-[500px] rounded-full blur-[120px] pointer-events-none opacity-10" style={{ backgroundColor: cfg.accent }} />
      <div className="absolute bottom-1/4 right-1/3 w-[300px] sm:w-[400px] h-[300px] sm:h-[400px] rounded-full blur-[100px] pointer-events-none opacity-5" style={{ backgroundColor: cfg.accent }} />

      {/* Header */}
      <header className="sticky top-0 z-50 bg-[#0a0a0a]/90 backdrop-blur-md border-b border-white/5 py-6 px-4 sm:px-12 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 border flex items-center justify-center font-bold text-sm tracking-tighter" style={{ borderColor: cfg.accent, color: cfg.accent }}>
            A
          </div>
          <span className="text-xs sm:text-sm font-bold tracking-[0.25em] text-white uppercase truncate max-w-[150px] sm:max-w-none">{lead.name}</span>
        </div>
        <a 
          href={`tel:${lead.phone}`}
          className="border hover:bg-white/5 text-white py-2.5 px-4 sm:px-6 rounded-none text-[10px] sm:text-xs font-bold tracking-widest uppercase transition-all duration-300 btn-shine-effect shadow-xs"
          style={{ borderColor: `${cfg.accent}40`, color: cfg.accent }}
        >
          Inquire
        </a>
      </header>

      {/* Hero */}
      <section className="relative py-12 sm:py-20 px-4 sm:px-12 max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
        <div className="lg:col-span-6 space-y-6 sm:space-y-8 text-left">
          <span className="text-xs font-bold tracking-[0.4em] uppercase block" style={{ color: cfg.accent }}>Architectural Studio</span>
          <h1 className="text-3xl sm:text-5xl lg:text-7xl font-extralight text-white leading-tight tracking-tight uppercase break-words">
            <span className={cfg.textShine}>{lead.tagline || "Bespoke Structural Narratives"}</span>
          </h1>
          <div className="w-16 h-[1px]" style={{ backgroundColor: `${cfg.accent}30` }} />
          <p className="text-neutral-400 text-sm sm:text-base leading-relaxed max-w-md font-light">
            {lead.description || "We craft high-end spatial realities. From structural engineering to custom interior furnishing, we deliver award-winning designs that stand the test of time."}
          </p>
          {lead.rating && (
            <div className="flex items-center gap-1.5 text-xs text-neutral-400">
              <Star className="w-3.5 h-3.5 fill-current" style={{ color: cfg.accent }} />
              <span className="font-bold text-white">{lead.rating}</span>
              <span className="text-neutral-600">({lead.review_count} Google reviews)</span>
            </div>
          )}
          <div className="flex gap-4 pt-2">
            <a 
              href="#projects" 
              className={`font-semibold px-6 sm:px-8 py-3.5 sm:py-4 rounded-none text-[10px] sm:text-xs tracking-widest uppercase transition-all duration-300 btn-shine-effect shadow-md ${cfg.btn}`}
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
      <section id="projects" className="py-16 sm:py-24 px-4 sm:px-12 max-w-6xl mx-auto border-t border-white/5">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end mb-12 sm:mb-16 gap-4">
          <div>
            <span className="text-xs font-bold uppercase tracking-[0.3em] block mb-2" style={{ color: cfg.accent }}>Portfolio</span>
            <h2 className="text-2xl sm:text-4xl font-extralight text-white uppercase tracking-wider">Bespoke Spaces</h2>
          </div>
          <span className="text-xs text-neutral-500 font-mono">SELECTED WORK / COUTURE DESIGN</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-12">
          {services.map((service, index) => (
            <div key={index} className="group cursor-pointer space-y-4">
              <div 
                className={`relative aspect-[3/2] overflow-hidden border rounded-xl bg-neutral-900 transition-all duration-500 ${cfg.glowClass}`}
                style={{ 
                  borderColor: `${cfg.accent}15`,
                  ['--hover-color' as any]: cfg.accent 
                } as React.CSSProperties}
              >
                <img 
                  src={projectImages[index % projectImages.length]}
                  alt={service}
                  className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-103 transition-all duration-700"
                />
              </div>
              <div className="flex justify-between items-start pt-2">
                <div>
                  <h4 
                    className="text-sm sm:text-base font-bold text-white uppercase tracking-wide transition-colors group-hover:text-[var(--hover-color)]"
                    style={{ ['--hover-color' as any]: cfg.accent } as React.CSSProperties}
                  >
                    {service}
                  </h4>
                  <p className="text-xs text-neutral-500 font-light mt-1">High-end architecture and spatial composition tailored for premium scale.</p>
                </div>
                <ArrowUpRight 
                  className="w-5 h-5 text-neutral-500 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-[var(--hover-color)]"
                  style={{ ['--hover-color' as any]: cfg.accent } as React.CSSProperties}
                />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Inquiry Form */}
      <section id="contact" className="py-16 sm:py-24 px-4 sm:px-12 max-w-6xl mx-auto border-t border-white/5">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          <div className="lg:col-span-7 space-y-6">
            <h3 className="text-2xl sm:text-4xl lg:text-5xl font-extralight text-white uppercase tracking-tight leading-none">Commission a Project</h3>
            <p className="text-neutral-400 text-sm leading-relaxed font-light max-w-md">
              Ready to construct your vision? Submit your contact details below, and our senior architectural consultants will contact you to discuss your project requirements.
            </p>
            <div className="space-y-4 pt-2 text-sm font-light">
              <div className="flex items-center gap-3">
                <MapPin className="w-5 h-5 shrink-0" style={{ color: cfg.accent }} />
                <span className="text-xs sm:text-sm">{lead.address}</span>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="w-5 h-5 shrink-0" style={{ color: cfg.accent }} />
                <span className="text-xs sm:text-sm">{lead.phone}</span>
              </div>
              <div className="flex items-center gap-3">
                <Clock className="w-5 h-5 shrink-0" style={{ color: cfg.accent }} />
                <span className="text-xs sm:text-sm">Studio Hours: Mon - Fri, 9 AM - 6 PM</span>
              </div>
            </div>
          </div>
          <div className={`lg:col-span-5 bg-neutral-950 border p-6 sm:p-8 rounded-2xl transition-all duration-500 ${cfg.glowClass}`} style={{ borderColor: `${cfg.accent}10` }}>
            <ContactForm businessName={lead.name} themeColor={lead.color_theme} />
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
