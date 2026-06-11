"use client";

import React, { useEffect, useRef } from "react";
import { Sparkles, Orbit, Cpu, ArrowUpRight } from "lucide-react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export function ProductsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const isMobile = window.innerWidth < 768;
      // Reveal Title
      gsap.from(titleRef.current, {
        scrollTrigger: {
          trigger: titleRef.current,
          start: "top 85%",
        },
        y: 40,
        opacity: 0,
        filter: isMobile ? "none" : "blur(10px)",
        duration: 1.2,
        ease: "power4.out",
      });

      // Reveal Content Card
      gsap.from(contentRef.current, {
        scrollTrigger: {
          trigger: contentRef.current,
          start: "top 80%",
        },
        y: 40,
        opacity: 0,
        duration: 1.2,
        ease: "power3.out",
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>, card: HTMLDivElement) => {
    if (window.innerWidth < 768) return;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    card.style.setProperty("--mouse-x", `${x}px`);
    card.style.setProperty("--mouse-y", `${y}px`);
  };

  return (
    <section 
      ref={sectionRef}
      className="relative min-h-screen py-24 sm:py-32 bg-black overflow-hidden border-t border-white/5"
      id="products"
    >
      {/* Cosmic Background Glows */}
      <div className="absolute top-1/4 left-1/4 w-[400px] h-[400px] bg-red-500/[0.02] rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-zinc-500/[0.02] rounded-full blur-[120px] pointer-events-none" />

      <div className="container mx-auto px-4 relative z-10">
        {/* Header */}
        <div ref={titleRef} className="max-w-3xl mb-16 sm:mb-20">
          <h2 className="text-sm font-bold tracking-[0.3em] text-neutral-500 uppercase mb-4">
            Our Ventures
          </h2>
          <h3 className="text-4xl sm:text-6xl font-black tracking-tighter text-silver-matte leading-[0.9]">
            We Build Proprietary <br />
            <span className="text-white/20">Market Engines.</span>
          </h3>
          <p className="mt-8 text-lg text-neutral-400 max-w-xl leading-relaxed">
            Asenra is not just an agency; we are a Venture Studio. We conceptualize, build, and deploy our own high-impact products to disrupt modern consumer markets.
          </p>
        </div>

        {/* Product Bento Card */}
        <div 
          ref={contentRef}
          onMouseMove={(e) => handleMouseMove(e, e.currentTarget)}
          className="premium-depth-card group relative p-8 md:p-12 rounded-[2.5rem] overflow-hidden border border-white/5 bg-linear-to-br from-neutral-900/40 to-black hover:border-red-500/20 transition-colors duration-500 shadow-2xl"
        >
          <div className="card-sheen" />
          {/* Internal ambient glowing blur */}
          <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-gradient-to-br from-red-500/[0.03] to-zinc-500/[0.03] blur-[80px] -mr-32 -mt-32 pointer-events-none group-hover:scale-110 transition-transform duration-700" />

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Content Column */}
            <div className="lg:col-span-7 flex flex-col justify-center">
              <div className="flex flex-wrap items-center gap-3 mb-6">
                <span className="text-[10px] font-black tracking-widest uppercase bg-red-500/10 border border-red-500/20 text-red-400 px-4 py-1.5 rounded-full shadow-[0_0_20px_rgba(238,0,0,0.15)]">
                  Flagship Product
                </span>
                <span className="text-[10px] font-black tracking-widest uppercase bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 px-4 py-1.5 rounded-full">
                  Live Now
                </span>
              </div>

              <h4 className="text-4xl sm:text-5xl font-black text-white tracking-tight uppercase mb-4 leading-none">
                Astroneo.space
              </h4>
              <p className="text-[10px] font-bold text-red-400/80 uppercase tracking-widest mb-6 italic">
                Advanced Interactive 3D Stellar Engine
              </p>
              
              <p className="text-neutral-400 text-sm md:text-base leading-relaxed mb-8 max-w-2xl font-medium">
                Our first proprietary launch. Astroneo lets you explore any star in the night sky. Search over 8,800+ stars, interact with real-time 3D WebGL models, and discover complete astronomical data (distance, luminosity, coordinates, and spectral classes).
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-10 border-t border-white/5 pt-8">
                <div className="flex items-start gap-3.5">
                  <div className="p-2 bg-red-500/5 border border-red-500/10 rounded-xl text-red-400 shrink-0">
                    <Orbit className="w-5 h-5" />
                  </div>
                  <div>
                    <h5 className="text-sm font-bold text-white uppercase tracking-wider mb-1">Stellar Database</h5>
                    <p className="text-xs text-neutral-500 leading-normal">Search over 8,800+ stars by name, Bayer designation, or catalog ID with instant data retrieval.</p>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <div className="p-2 bg-red-500/5 border border-red-500/10 rounded-xl text-red-400 shrink-0">
                    <Cpu className="w-5 h-5" />
                  </div>
                  <div>
                    <h5 className="text-sm font-bold text-white uppercase tracking-wider mb-1">Interactive 3D Renderers</h5>
                    <p className="text-xs text-neutral-500 leading-normal">View, rotate, and explore high-fidelity 3D WebGL models of stellar objects directly in your browser.</p>
                  </div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <a 
                  href="https://astroneo.space"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-modern-light py-4 px-8 rounded-xl text-sm font-black uppercase tracking-widest flex items-center justify-center gap-3 group/btn cursor-pointer no-underline"
                >
                  Launch Astroneo
                  <ArrowUpRight className="w-4 h-4 transition-transform group-hover/btn:translate-x-1 group-hover/btn:-translate-y-1" />
                </a>
              </div>
            </div>

            {/* Right Interactive Mockup/Art Column */}
            <div className="lg:col-span-5 flex justify-center lg:justify-end">
              <div className="relative w-full max-w-[340px] aspect-square rounded-[2rem] border border-white/5 bg-neutral-950/40 p-8 overflow-hidden flex flex-col items-center justify-center group/panel">
                <div className="absolute inset-0 bg-radial-gradient from-red-500/5 to-transparent opacity-50 pointer-events-none" />
                
                {/* Simulated Product UI HUD */}
                <div className="relative z-10 w-full h-full flex flex-col justify-between items-center text-center">
                  <div className="w-16 h-16 rounded-full bg-gradient-to-b from-red-400/20 to-neutral-900/10 flex items-center justify-center border border-red-400/30 shadow-2xl shadow-red-500/20 animate-pulse">
                    <Sparkles className="w-8 h-8 text-red-400" />
                  </div>

                  <div className="my-6">
                    <span className="text-[10px] text-red-400 font-bold uppercase tracking-[0.3em] block mb-2">STELLAR WebGL ENGINE</span>
                    <h5 className="text-2xl font-black tracking-widest text-white uppercase italic">Active</h5>
                    <div className="flex gap-1.5 justify-center mt-3 items-center">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping" />
                      <span className="text-[9px] font-black uppercase tracking-widest text-neutral-500">Rendering stellar geometry</span>
                    </div>
                  </div>

                  <div className="w-full bg-white/2 border border-white/5 rounded-2xl p-4 backdrop-blur-md">
                    <p className="text-[10px] text-neutral-400 italic leading-relaxed">
                      &quot;Vega (Alpha Lyrae) · Distance: 25.0 ly · Luminosity: 40.1 L☉ · Class: A0V · Radial Velocity: -13.9 km/s&quot;
                    </p>
                  </div>
                </div>

                {/* Ambient Decorative Rings */}
                <div className="absolute inset-6 rounded-full border border-dashed border-red-500/20 animate-spin [animation-duration:40s] pointer-events-none" />
                <div className="absolute inset-16 rounded-full border border-dotted border-zinc-500/20 animate-spin [animation-duration:20s] reverse pointer-events-none" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
