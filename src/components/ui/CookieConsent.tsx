"use client";

import React, { useEffect, useState, useRef } from "react";
import { gsap } from "gsap";
import { Cookie, XCircle } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

export default function CookieConsent() {
  const [isVisible, setIsVisible] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Force a fresh check on every mount
    setIsMounted(true);
    
    const initializeConsent = setTimeout(() => {
      // We use a newer version key to force it to show after our updates
      const hasConsented = localStorage.getItem("cookie-consent-v5");
      if (!hasConsented) {
        setIsVisible(true);
      }
    }, 1000); // 1s delay gives the main site time to settle

    return () => clearTimeout(initializeConsent);
  }, []);

  useEffect(() => {
    if (isVisible && isMounted && containerRef.current) {
      // Clean start: force initial state before animating
      gsap.fromTo(
        containerRef.current,
        { 
          y: "100%", 
          opacity: 0,
          scale: 0.98
        },
        { 
          y: "0%", 
          opacity: 1, 
          scale: 1,
          duration: 1.5, 
          ease: "expo.out"
        }
      );
    }
  }, [isVisible, isMounted]);

  const handleAccept = () => {
    if (containerRef.current) {
      gsap.to(containerRef.current, {
        y: "100%",
        opacity: 0,
        scale: 0.98,
        duration: 0.8,
        ease: "expo.in",
        onComplete: () => {
          localStorage.setItem("cookie-consent-v5", "accepted");
          setIsVisible(false);
        }
      });
    }
  };

  const handleDecline = () => {
    if (containerRef.current) {
      gsap.to(containerRef.current, {
        y: "100%",
        opacity: 0,
        scale: 0.98,
        duration: 0.8,
        ease: "expo.in",
        onComplete: () => {
          localStorage.setItem("cookie-consent-v5", "declined");
          setIsVisible(false);
        }
      });
    }
  };

  if (!isMounted || !isVisible) return null;

  return (
    <div 
      ref={containerRef}
      className={cn(
        "fixed bottom-0 left-0 right-0 z-[10000] w-full",
        "pointer-events-auto"
      )}
    >
      <div className="relative border-t border-white/10 bg-black/90 backdrop-blur-4xl shadow-[0_-20px_50px_rgba(0,0,0,0.8)]">
        <div className="card-sheen" aria-hidden="true" />
        
        <div className="max-w-7xl mx-auto px-6 py-4 sm:py-6 flex flex-col lg:flex-row items-center justify-between gap-6 relative z-10">
          <div className="flex items-center gap-6">
            <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center border border-white/5 shrink-0 hidden sm:flex">
              <Cookie className="w-5 h-5 text-white" />
            </div>
            <div className="text-center lg:text-left">
              <h4 className="text-sm font-black text-white italic tracking-tight uppercase">
                Cookie Architecture
              </h4>
              <p className="text-[11px] text-neutral-400 leading-relaxed mt-1 max-w-2xl font-medium">
                We utilize elite-grade optimizations to architect a smoother digital experience. By engaging, you consent to our high-performance data specifications.
              </p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-3 w-full lg:w-auto">
            <Link
              href="/privacy"
              className="w-full sm:w-auto px-6 py-2.5 rounded-lg bg-white/5 border border-white/5 text-[10px] font-black text-neutral-400 uppercase tracking-[0.2em] hover:bg-white/10 hover:text-white transition-all text-center"
            >
              Specs
            </Link>
            <button
              onClick={handleAccept}
              className="w-full sm:w-auto px-8 py-2.5 btn-modern-light rounded-lg text-[10px] font-black uppercase tracking-[0.2em] transition-all hover:scale-[1.02] active:scale-[0.98]"
            >
              Constructive Accept
            </button>
            <button 
              onClick={handleDecline}
              className="hidden lg:flex p-2 text-neutral-500 hover:text-white transition-colors"
              aria-label="Close"
            >
              <XCircle className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
