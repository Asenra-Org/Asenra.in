"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { YouFormModal } from "@/components/ui/YouFormModal";
import {
  Laptop,
  Smartphone,
  RefreshCw,
  Play,
  ArrowRight,
  Lock,
  CheckCircle2,
  AlertCircle,
  Terminal,
  Sliders,
  Eye,
  Settings,
  ShieldAlert,
  ChevronRight,
  Globe,
  TrendingUp,
  Cpu,
  Zap,
} from "lucide-react";

// Types and mock data
type Industry = "real-estate" | "ecommerce" | "saas" | "services";

interface IndustryConfig {
  accentColor: string;
  gradient: string;
  headline: string;
  subheadline: string;
  originalSpeed: number;
  originalCro: string;
  gaps: string[];
  features: string[];
  ctaText: string;
}

const industryConfigs: Record<Industry, IndustryConfig> = {
  "real-estate": {
    accentColor: "from-amber-500 to-yellow-600",
    gradient: "from-amber-500/20 via-transparent to-transparent",
    headline: "Architecting Elite Digital Properties.",
    subheadline: "Cinematic property galleries, instant WhatsApp bookings, and automated lead routing designed to close ultra-luxury listings.",
    originalSpeed: 42,
    originalCro: "0.8%",
    gaps: [
      "Extremely slow image and video rendering on mobile devices",
      "Missing local schema markup and semantic SEO structure",
      "Unoptimized lead qualification forms leading to cold inquiries"
    ],
    features: [
      "Sub-second HDR property asset loading",
      "One-click WhatsApp tour scheduling API",
      "Geotargeted landing pages for luxury zip codes"
    ],
    ctaText: "Schedule Private Showing"
  },
  ecommerce: {
    accentColor: "from-purple-500 to-indigo-600",
    gradient: "from-purple-500/20 via-transparent to-transparent",
    headline: "Engineered for Hyper-Conversion.",
    subheadline: "Zero-latency checkout, dynamic cart animations, and autonomous personalization pipelines that turn traffic into recurring revenue.",
    originalSpeed: 38,
    originalCro: "1.2%",
    gaps: [
      "High checkout abandonment due to multi-step friction",
      "Overhead from bloated legacy tracking scripts",
      "Weak mobile product page layout and tap-target collisions"
    ],
    features: [
      "Sub-100ms global Edge checkout speed",
      "Subtle micro-animations for cart action triggers",
      "Direct Google & Apple Pay native integration API"
    ],
    ctaText: "Unlock Premium Pricing"
  },
  saas: {
    accentColor: "from-blue-500 to-cyan-600",
    gradient: "from-blue-500/20 via-transparent to-transparent",
    headline: "The Code Behind Market Domination.",
    subheadline: "Ultra-scalable React web apps, custom API pipelines, and interactive onboarding flows built to scale with your user base.",
    originalSpeed: 49,
    originalCro: "1.5%",
    gaps: [
      "Slow initial time-to-interactive for demo pages",
      "Poor accessibility compliance (WCAG 2.2) blocking enterprise contracts",
      "Absence of structured schema data for technical search keywords"
    ],
    features: [
      "Server-side pre-rendered interactive sandbox dashboards",
      "Automated keyboard-navigable responsive layouts",
      "Preloaded API docs with dynamic sandbox playground"
    ],
    ctaText: "Start Enterprise Trial"
  },
  services: {
    accentColor: "from-emerald-500 to-teal-600",
    gradient: "from-emerald-500/20 via-transparent to-transparent",
    headline: "Precision Systems for High-Value Clients.",
    subheadline: "Bespoke digital portals, secure client intake pipelines, and automated calendar integrations built for high-trust consultation.",
    originalSpeed: 45,
    originalCro: "0.9%",
    gaps: [
      "Static and uninspiring 'Contact Us' forms",
      "No credibility/social proof validation at scroll checkpoints",
      "Poor mobile performance leading to high bounce rates"
    ],
    features: [
      "Sleek dynamic booking scheduler integration",
      "Interactive case-study carousels",
      "Encrypted secure document upload vault portal"
    ],
    ctaText: "Book Elite Consultation"
  }
};

export default function AcquisitionPage() {
  const [step, setStep] = useState<"input" | "loading" | "result">("input");
  const [companyName, setCompanyName] = useState("");
  const [website, setWebsite] = useState("");
  const [industry, setIndustry] = useState<Industry>("ecommerce");
  
  // Terminal animation states
  const [logs, setLogs] = useState<string[]>([]);
  const [progress, setProgress] = useState(0);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [device, setDevice] = useState<"desktop" | "mobile">("desktop");
  
  const terminalEndRef = useRef<HTMLDivElement>(null);

  const simulateLogs = [
    `[SYS] Initializing Asenra Agent Engine...`,
    `[SYS] Scanning DOM hierarchy and assets...`,
    `[AUDIT] Analyzing Core Web Vitals on server...`,
    `[WARN] Found low Performance Index: ${industryConfigs[industry].originalSpeed}%`,
    `[WARN] Detected layout shifts (CLS) on primary viewports`,
    `[AUDIT] Running CRO & Heuristic friction audits...`,
    `[WARN] Found unoptimized lead-capture funnel (CRO: ${industryConfigs[industry].originalCro})`,
    `[SYS] Injecting Asenra High-End Styling System...`,
    `[SYS] Building custom industry components...`,
    `[SYS] Generating live sandbox environment...`,
    `[SUCCESS] System ready. Launching live preview...`
  ];

  useEffect(() => {
    if (step === "loading") {
      setLogs([]);
      setProgress(0);
      let logIndex = 0;
      
      const logInterval = setInterval(() => {
        if (logIndex < simulateLogs.length) {
          setLogs((prev) => [...prev, simulateLogs[logIndex]]);
          logIndex++;
          setProgress((prev) => Math.min(prev + 10, 100));
        } else {
          clearInterval(logInterval);
          setTimeout(() => {
            setStep("result");
          }, 800);
        }
      }, 500);

      return () => clearInterval(logInterval);
    }
  }, [step, industry]);

  useEffect(() => {
    if (terminalEndRef.current) {
      terminalEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [logs]);

  const handleStart = (e: React.FormEvent) => {
    e.preventDefault();
    if (!companyName.trim()) return;
    setStep("loading");
  };

  const currentConfig = industryConfigs[industry];

  return (
    <div className="min-h-screen bg-black text-white relative font-sans overflow-x-hidden selection:bg-white/20">
      {/* Background Grids & Ambient Beams */}
      <div 
        className="fixed inset-0 z-0 opacity-20 pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(rgba(255, 255, 255, 0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 255, 255, 0.05) 1px, transparent 1px)`,
          backgroundSize: "60px 60px",
        }}
      />
      <div className="fixed top-[-10%] left-[-10%] w-[50%] h-[50%] rounded-full bg-indigo-500/10 blur-[120px] pointer-events-none z-0" />
      <div className="fixed bottom-[-10%] right-[-10%] w-[50%] h-[50%] rounded-full bg-purple-500/10 blur-[120px] pointer-events-none z-0" />

      <div className="max-w-7xl mx-auto px-6 py-12 relative z-10">
        
        {/* Navigation */}
        <div className="flex items-center justify-between mb-16">
          <Link href="/" className="group inline-flex items-center gap-2 text-zinc-500 hover:text-white transition-all duration-300">
            <span className="w-8 h-8 rounded-full border border-zinc-800 flex items-center justify-center group-hover:border-zinc-400 group-hover:-translate-x-1 transition-all">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
              </svg>
            </span>
            <span className="text-sm font-bold uppercase tracking-widest">Back to Hub</span>
          </Link>
          
          <div className="flex items-center gap-3">
            <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-xs font-black uppercase tracking-[0.2em] text-zinc-400">Live Demo Engine v1.2</span>
          </div>
        </div>

        {/* 1. INPUT STEP */}
        {step === "input" && (
          <div className="max-w-3xl mx-auto py-12">
            <div className="text-center mb-12">
              <h1 className="text-5xl md:text-7xl font-black tracking-tighter mb-6 leading-none">
                Interactive <br />
                <span className="bg-gradient-to-r from-zinc-200 via-white to-zinc-500 bg-clip-text text-transparent">Demo & Tech Audit.</span>
              </h1>
              <p className="text-zinc-400 text-lg md:text-xl font-medium max-w-xl mx-auto leading-relaxed">
                Generate a custom, high-end landing page layout and run a conversion audit tailored specifically to your business niche instantly.
              </p>
            </div>

            <form onSubmit={handleStart} className="space-y-6 bg-zinc-900/40 backdrop-blur-md border border-white/10 p-8 md:p-12 rounded-[2.5rem] shadow-2xl relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-b from-white/[0.02] to-transparent pointer-events-none" />
              
              <div className="space-y-2">
                <label className="block text-xs font-black uppercase tracking-widest text-zinc-400">Company / Product Name</label>
                <input 
                  type="text" 
                  required
                  placeholder="e.g. Acme Corporation" 
                  value={companyName}
                  onChange={(e) => setCompanyName(e.target.value)}
                  className="w-full bg-black/60 border border-white/10 rounded-2xl px-6 py-4 text-white placeholder-zinc-600 focus:outline-none focus:border-white/30 transition-all font-semibold"
                />
              </div>

              <div className="space-y-2">
                <label className="block text-xs font-black uppercase tracking-widest text-zinc-400">Existing Website URL (Optional)</label>
                <input 
                  type="url" 
                  placeholder="https://example.com" 
                  value={website}
                  onChange={(e) => setWebsite(e.target.value)}
                  className="w-full bg-black/60 border border-white/10 rounded-2xl px-6 py-4 text-white placeholder-zinc-600 focus:outline-none focus:border-white/30 transition-all font-semibold"
                />
              </div>

              <div className="space-y-4">
                <label className="block text-xs font-black uppercase tracking-widest text-zinc-400">Industry / Domain</label>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {(["ecommerce", "real-estate", "saas", "services"] as Industry[]).map((ind) => (
                    <button
                      key={ind}
                      type="button"
                      onClick={() => setIndustry(ind)}
                      className={`p-4 rounded-2xl border text-center transition-all cursor-pointer flex flex-col items-center gap-2 justify-center capitalize font-semibold ${
                        industry === ind 
                          ? "bg-white text-black border-white" 
                          : "bg-black/40 border-white/10 text-zinc-400 hover:border-white/30 hover:text-white"
                      }`}
                    >
                      {ind === "ecommerce" && <Zap className="w-5 h-5" />}
                      {ind === "real-estate" && <Globe className="w-5 h-5" />}
                      {ind === "saas" && <Cpu className="w-5 h-5" />}
                      {ind === "services" && <TrendingUp className="w-5 h-5" />}
                      <span className="text-xs tracking-wide">{ind === "real-estate" ? "Real Estate" : ind === "ecommerce" ? "E-commerce" : ind === "saas" ? "SaaS" : "Services"}</span>
                    </button>
                  ))}
                </div>
              </div>

              <button
                type="submit"
                className="w-full bg-white text-black font-black uppercase tracking-tighter py-5 rounded-2xl hover:scale-[1.02] hover:shadow-[0_0_40px_rgba(255,255,255,0.2)] transition-all active:scale-[0.98] flex items-center justify-center gap-3 cursor-pointer mt-8"
              >
                <span>Generate Audit & Demo Layout</span>
                <ArrowRight className="w-5 h-5" />
              </button>
            </form>
          </div>
        )}

        {/* 2. LOADING STEP */}
        {step === "loading" && (
          <div className="max-w-3xl mx-auto py-12">
            <div className="mb-8 text-center">
              <h2 className="text-3xl font-black uppercase tracking-tight mb-2">Analyzing digital footprint...</h2>
              <p className="text-zinc-500 font-medium text-sm">Please wait while the AI agent structures the digital architecture.</p>
            </div>

            <div className="bg-zinc-900/40 backdrop-blur-md border border-white/10 rounded-[2.5rem] p-6 md:p-8 shadow-2xl relative overflow-hidden">
              {/* Progress Bar */}
              <div className="w-full h-1 bg-white/5 rounded-full overflow-hidden mb-6">
                <div 
                  className="h-full bg-white transition-all duration-300"
                  style={{ width: `${progress}%` }}
                />
              </div>

              {/* Terminal Screen */}
              <div className="bg-black/80 rounded-2xl border border-white/5 p-6 h-80 overflow-y-auto font-mono text-xs text-zinc-400 flex flex-col gap-2 shadow-inner">
                {logs.map((log, index) => {
                  let colorClass = "text-zinc-400";
                  if (log.startsWith("[SYS]")) colorClass = "text-blue-400";
                  else if (log.startsWith("[WARN]")) colorClass = "text-amber-400";
                  else if (log.startsWith("[SUCCESS]")) colorClass = "text-emerald-400 font-bold";
                  else if (log.startsWith("[AUDIT]")) colorClass = "text-purple-400";
                  
                  return (
                    <div key={index} className={`${colorClass} flex gap-2 items-start`}>
                      <span className="text-zinc-700 select-none">&gt;</span>
                      <span>{log}</span>
                    </div>
                  );
                })}
                <div ref={terminalEndRef} />
              </div>
            </div>
          </div>
        )}

        {/* 3. RESULT STATE */}
        {step === "result" && (
          <div className="space-y-12">
            {/* Intro banner */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 pb-6 border-b border-white/10">
              <div>
                <h1 className="text-4xl font-black tracking-tight">{companyName}</h1>
                <p className="text-zinc-500 font-medium text-sm mt-1 capitalize">Live Audit & Generated Layout for {industry === "real-estate" ? "Real Estate" : industry === "ecommerce" ? "E-commerce" : industry === "saas" ? "SaaS" : "Services"}</p>
              </div>
              <button 
                onClick={() => setStep("input")}
                className="flex items-center gap-2 px-5 py-2.5 rounded-xl border border-white/10 hover:border-white/30 text-sm font-semibold bg-white/5 hover:bg-white/10 transition-all cursor-pointer"
              >
                <RefreshCw className="w-4 h-4" />
                <span>Reset Audit</span>
              </button>
            </div>

            {/* Split Screen Layout */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              
              {/* Left Column: Tech Audit report card */}
              <div className="lg:col-span-4 space-y-6">
                <div className="bg-zinc-900/40 backdrop-blur-md border border-white/10 rounded-[2rem] p-6 shadow-2xl space-y-6 relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-b from-white/[0.01] to-transparent pointer-events-none" />
                  
                  <div className="flex items-center gap-2.5">
                    <Terminal className="w-5 h-5 text-indigo-400" />
                    <h3 className="text-xs font-black uppercase tracking-widest text-zinc-400">Technical Gap Analysis</h3>
                  </div>

                  {/* Audit Metric comparisons */}
                  <div className="space-y-4 pt-2">
                    <div className="bg-black/50 border border-white/5 p-4 rounded-2xl flex items-center justify-between">
                      <div>
                        <span className="text-[10px] font-black uppercase tracking-wider text-zinc-500 block mb-1">Performance Index</span>
                        <div className="flex items-baseline gap-2">
                          <span className="text-2xl font-black text-rose-500">{currentConfig.originalSpeed}%</span>
                          <span className="text-zinc-600 text-xs font-medium">vs</span>
                          <span className="text-2xl font-black text-emerald-400">99%</span>
                        </div>
                      </div>
                      <div className="w-10 h-10 rounded-xl bg-rose-500/10 border border-rose-500/20 flex items-center justify-center text-rose-400">
                        <Zap className="w-5 h-5" />
                      </div>
                    </div>

                    <div className="bg-black/50 border border-white/5 p-4 rounded-2xl flex items-center justify-between">
                      <div>
                        <span className="text-[10px] font-black uppercase tracking-wider text-zinc-500 block mb-1">Conversion (CRO)</span>
                        <div className="flex items-baseline gap-2">
                          <span className="text-2xl font-black text-rose-500">{currentConfig.originalCro}</span>
                          <span className="text-zinc-600 text-xs font-medium">vs</span>
                          <span className="text-2xl font-black text-emerald-400">3.8%+</span>
                        </div>
                      </div>
                      <div className="w-10 h-10 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-400">
                        <TrendingUp className="w-5 h-5" />
                      </div>
                    </div>
                  </div>

                  {/* Critical Bottlenecks identified */}
                  <div className="space-y-3">
                    <span className="text-[10px] font-black uppercase tracking-widest text-rose-400 flex items-center gap-1.5">
                      <ShieldAlert className="w-3.5 h-3.5" />
                      <span>Critical Gaps Identified</span>
                    </span>
                    <ul className="space-y-3">
                      {currentConfig.gaps.map((gap, index) => (
                        <li key={index} className="flex gap-3 text-xs text-zinc-300 items-start">
                          <AlertCircle className="w-4 h-4 text-rose-500 shrink-0 mt-0.5" />
                          <span>{gap}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Asenra Infrastructure Fixes */}
                  <div className="space-y-3 pt-2">
                    <span className="text-[10px] font-black uppercase tracking-widest text-emerald-400 flex items-center gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>Asenra Architect Recommendations</span>
                    </span>
                    <ul className="space-y-3">
                      {currentConfig.features.map((feature, index) => (
                        <li key={index} className="flex gap-3 text-xs text-zinc-300 items-start">
                          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Call-to-action bottom card */}
                <div className="bg-gradient-to-b from-zinc-800/80 to-zinc-950/80 border border-white/20 p-6 rounded-[2rem] shadow-2xl relative overflow-hidden space-y-4">
                  <div className="absolute inset-0 bg-gradient-to-tr from-indigo-500/10 via-transparent to-transparent pointer-events-none" />
                  <h4 className="text-xl font-bold tracking-tight text-white leading-tight">Claim This Audited Code & Launch</h4>
                  <p className="text-zinc-400 text-xs leading-relaxed">
                    Deploy this optimized template immediately. Integrate custom backends, custom database structures, and premium animations under our Venture Studio.
                  </p>
                  <button 
                    onClick={() => setIsFormOpen(true)}
                    className="w-full py-4 rounded-xl bg-white text-black text-xs font-black uppercase tracking-widest hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <span>Secure Live Project Portal</span>
                    <Lock className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Right Column: Live Mock Sandbox Preview */}
              <div className="lg:col-span-8 space-y-6">
                
                {/* Device Bar Controls */}
                <div className="bg-zinc-900/60 border border-white/10 rounded-2xl p-2.5 flex items-center justify-between">
                  <div className="flex gap-2">
                    <button 
                      onClick={() => setDevice("desktop")}
                      className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 cursor-pointer ${
                        device === "desktop" ? "bg-white text-black" : "text-zinc-400 hover:text-white bg-transparent"
                      }`}
                    >
                      <Laptop className="w-4 h-4" />
                      <span className="hidden sm:inline">Desktop View</span>
                    </button>
                    <button 
                      onClick={() => setDevice("mobile")}
                      className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 cursor-pointer ${
                        device === "mobile" ? "bg-white text-black" : "text-zinc-400 hover:text-white bg-transparent"
                      }`}
                    >
                      <Smartphone className="w-4 h-4" />
                      <span className="hidden sm:inline">Mobile View</span>
                    </button>
                  </div>

                  {/* Browser URL Input Sim */}
                  <div className="flex-1 max-w-md mx-6 hidden md:block">
                    <div className="bg-black/60 border border-white/5 rounded-xl px-4 py-1.5 text-center text-xs font-mono text-zinc-500 overflow-hidden text-ellipsis whitespace-nowrap">
                      https://asenra.in/sandbox/preview/{companyName.toLowerCase().replace(/[^a-z0-9]/g, "-")}
                    </div>
                  </div>

                  <div className="flex items-center gap-2 text-zinc-500 pr-2">
                    <span className="text-[10px] font-black uppercase tracking-widest hidden sm:inline">Mock sandbox</span>
                    <div className="w-2 h-2 rounded-full bg-indigo-500 animate-pulse" />
                  </div>
                </div>

                {/* Device Shell Screen wrapper */}
                <div className="w-full flex justify-center items-start">
                  <div 
                    className={`bg-zinc-950 border border-white/10 rounded-[2rem] overflow-hidden shadow-2xl relative transition-all duration-500 flex flex-col ${
                      device === "mobile" 
                        ? "w-[390px] h-[700px] border-8 border-zinc-800" 
                        : "w-full min-h-[500px]"
                    }`}
                  >
                    
                    {/* Simulated mobile status bar */}
                    {device === "mobile" && (
                      <div className="bg-black text-zinc-500 px-6 py-2 flex justify-between items-center text-[10px] font-bold border-b border-white/5 select-none">
                        <span>9:41</span>
                        <div className="flex gap-1.5 items-center">
                          <span className="w-3.5 h-2.5 rounded-sm border border-zinc-500 relative flex items-center justify-start p-0.5"><span className="w-1.5 h-1 bg-zinc-500 rounded-[1px]" /></span>
                        </div>
                      </div>
                    )}

                    {/* MOCK GENERATED WEBSITE INTERFACE */}
                    <div className="flex-1 bg-black text-white relative font-sans overflow-y-auto">
                      {/* Highlighted accent glow background */}
                      <div className={`absolute top-0 right-0 left-0 h-96 bg-gradient-to-b ${currentConfig.gradient} pointer-events-none`} />

                      {/* Header */}
                      <header className="relative z-10 px-6 py-4 flex justify-between items-center border-b border-white/5 bg-black/40 backdrop-blur-md">
                        <span className="font-black text-sm uppercase tracking-wider">{companyName}</span>
                        <button className="px-3.5 py-1.5 rounded-lg bg-white/10 text-white text-[10px] font-black uppercase tracking-widest hover:bg-white/20 transition-all">
                          Menu
                        </button>
                      </header>

                      {/* Content Section */}
                      <div className="px-6 py-12 md:py-20 relative z-10 text-left max-w-xl">
                        
                        {/* Tag */}
                        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-[9px] font-black uppercase tracking-wider text-zinc-400 mb-6">
                          <div className={`w-1.5 h-1.5 rounded-full bg-gradient-to-r ${currentConfig.accentColor}`} />
                          <span>Dynamic Prototype</span>
                        </div>

                        {/* Title */}
                        <h2 className="text-3xl md:text-5xl font-black tracking-tight mb-4 leading-none text-white">
                          {currentConfig.headline}
                        </h2>

                        {/* Sub */}
                        <p className="text-zinc-400 text-sm md:text-base mb-8 leading-relaxed">
                          {currentConfig.subheadline}
                        </p>

                        {/* Direct Form Trigger Button in the Sandbox */}
                        <button
                          onClick={() => setIsFormOpen(true)}
                          className={`inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-gradient-to-r ${currentConfig.accentColor} text-white font-black text-xs uppercase tracking-widest hover:scale-105 transition-all shadow-lg shadow-black/55 cursor-pointer`}
                        >
                          <span>{currentConfig.ctaText}</span>
                          <ChevronRight className="w-4 h-4" />
                        </button>
                      </div>

                      {/* Feature Grid inside prototype */}
                      <div className="px-6 pb-12 relative z-10">
                        <h4 className="text-[10px] font-black uppercase tracking-widest text-zinc-500 mb-6">Engineered Features</h4>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          {currentConfig.features.map((feat, idx) => (
                            <div key={idx} className="bg-white/[0.02] border border-white/5 rounded-2xl p-5 hover:bg-white/[0.04] transition-all">
                              <div className={`w-8 h-8 rounded-lg bg-gradient-to-r ${currentConfig.accentColor} opacity-80 flex items-center justify-center text-white mb-4 text-[10px] font-bold`}>
                                0{idx + 1}
                              </div>
                              <h5 className="font-bold text-sm text-white mb-1">{feat.split(" ").slice(0, 3).join(" ")}</h5>
                              <p className="text-zinc-400 text-xs leading-relaxed">{feat}</p>
                            </div>
                          ))}
                        </div>
                      </div>

                    </div>
                  </div>
                </div>

              </div>

            </div>
          </div>
        )}

      </div>

      {/* Consultation/Lead Capture Modal */}
      <YouFormModal 
        isOpen={isFormOpen} 
        onClose={() => setIsFormOpen(false)} 
        formId="vt3flmg8" 
      />
    </div>
  );
}
