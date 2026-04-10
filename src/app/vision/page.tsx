"use client";

import React from "react";
import Link from "next/link";
import { ArrowLeft, Eye, Target, Compass, Rocket } from "lucide-react";

export default function VisionPage() {
  const visionPillars = [
    {
      title: "Digital Sovereignty",
      icon: Target,
      content: "We believe Indian small businesses deserve the same caliber of technology as global tech giants. Our mission is to provide the digital infrastructure that allows local brands to own their presence and scale without limits."
    },
    {
      title: "Aesthetic Excellence",
      icon: Eye,
      content: "Software shouldn't just work—it should inspire. We bring high-end, cinematic design to every project, ensuring that every brand, regardless of scale, commands authority in the digital space."
    },
    {
      title: "Autonomous Future",
      icon: Compass,
      content: "Efficiency is no longer optional. We're bridging the gap between small business operations and advanced AI automation, building systems that think, learn, and grow alongside our clients."
    },
    {
      title: "The 10-Year View",
      icon: Rocket,
      content: "Asenra isn't a project factory. We are a long-term partner. We're building the future of the Indian digital economy, one codebase at a time, with a vision that spans decades, not quarters."
    }
  ];

  return (
    <main className="min-h-screen bg-black text-white selection:bg-white selection:text-black pb-24 overflow-hidden">
      {/* Background Ambience */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-[-10%] w-[50%] h-[50%] bg-white/[0.03] rounded-full blur-[140px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-white/[0.02] rounded-full blur-[120px]" />
      </div>

      <div className="container mx-auto px-6 relative z-10 pt-12">
        <Link href="/" className="inline-flex items-center gap-2 text-neutral-500 hover:text-white transition-colors mb-12 group uppercase text-[10px] font-black tracking-widest">
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          Gateway
        </Link>

        {/* Hero Section */}
        <section className="mb-32">
          <h1 className="text-sm font-bold tracking-[0.4em] text-neutral-500 uppercase mb-8">
            The North Star
          </h1>
          <h2 className="text-6xl sm:text-9xl font-black tracking-tighter leading-[0.85] mb-12">
            Engineering a <br />
            <span className="text-silver-matte">Digital India.</span>
          </h2>
          <p className="text-2xl text-neutral-400 max-w-3xl leading-relaxed font-medium">
            We aren&apos;t just building websites. We are architecting the operating systems for the next generation of the world&apos;s most vibrant economy.
          </p>
        </section>

        {/* Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-32">
          {visionPillars.map((pillar, i) => (
            <div key={i} className="premium-depth-card p-12 rounded-[40px] group hover:border-white/20 transition-all border border-white/5 relative overflow-hidden">
               <div className="card-sheen" />
               <div className="relative z-10">
                 <div className="w-14 h-14 bg-white/5 rounded-2xl flex items-center justify-center mb-8 group-hover:bg-white/10 transition-colors border border-white/10">
                   <pillar.icon className="w-7 h-7 text-white opacity-90" />
                 </div>
                 <h3 className="text-2xl font-black mb-6">{pillar.title}</h3>
                 <p className="text-neutral-400 leading-relaxed text-lg">
                   {pillar.content}
                 </p>
               </div>
            </div>
          ))}
        </div>

        {/* Closing Statement */}
        <section className="text-center py-20 border-t border-white/5">
           <p className="text-neutral-600 font-black italic tracking-[0.3em] uppercase text-xs mb-8">
             Operations Pan-India · Shipping Globally
           </p>
           <h3 className="text-3xl sm:text-5xl font-black tracking-tighter text-white mb-12 max-w-2xl mx-auto">
             Ready to build the future <br /> with us?
           </h3>
           <Link 
             href="/hiring" 
             className="inline-flex items-center gap-4 px-12 py-6 bg-white text-black font-black uppercase tracking-widest italic rounded-full hover:scale-105 active:scale-95 transition-all text-sm"
           >
             Join the Mission
             <ArrowLeft className="w-5 h-5 rotate-180" />
           </Link>
        </section>
      </div>

      {/* Massive Watermark */}
      <div className="fixed -bottom-24 left-1/2 -translate-x-1/2 pointer-events-none opacity-[0.02] select-none whitespace-nowrap">
         <span className="text-[30vw] font-black tracking-tighter uppercase leading-none">
           Vision 26
         </span>
      </div>
    </main>
  );
}
