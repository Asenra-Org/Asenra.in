"use client";

import React from "react";
import Link from "next/link";
import { ArrowLeft, Gavel } from "lucide-react";

export default function TermsPage() {
  const sections = [
    {
      title: "Agreement to Terms",
      content: "These Terms of Service constitute a legally binding agreement made between you, whether personally or on behalf of an entity ('you') and Asenra Labs Inc. ('we', 'us', or 'our'), concerning your access to and use of the asenra.in website as well as any other media form, media channel, mobile website or mobile application related, linked, or otherwise connected thereto."
    },
    {
      title: "Intellectual Property Rights",
      content: "Unless otherwise indicated, the Site is our proprietary property and all source code, databases, functionality, software, website designs, audio, video, text, photographs, and graphics on the Site and the trademarks, service marks, and logos contained therein are owned or controlled by us or licensed to us."
    },
    {
      title: "User Representations",
      content: "By using the Site, you represent and warrant that: (1) you have the legal capacity and you agree to comply with these Terms of Service; (2) you are not a minor in the jurisdiction in which you reside; (3) you will not access the Site through automated or non-human means, whether through a bot, script or otherwise."
    },
    {
      title: "Prohibited Activities",
      content: "You may not access or use the Site for any purpose other than that for which we make the Site available. The Site may not be used in connection with any commercial endeavors except those that are specifically endorsed or approved by us."
    },
    {
      title: "Limitation of Liability",
      content: "IN NO EVENT WILL WE OR OUR DIRECTORS, EMPLOYEES, OR AGENTS BE LIABLE TO YOU OR ANY THIRD PARTY FOR ANY DIRECT, INDIRECT, CONSEQUENTIAL, EXEMPLARY, INCIDENTAL, SPECIAL, OR PUNITIVE DAMAGES, INCLUDING LOST PROFIT, LOST REVENUE, LOSS OF DATA, OR OTHER DAMAGES ARISING FROM YOUR USE OF THE SITE."
    }
  ];

  return (
    <main className="min-h-screen bg-black text-white selection:bg-white selection:text-black pb-24">
      {/* Background Ambience */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[30%] h-[30%] bg-white/5 rounded-full blur-[140px]" />
      </div>

      <div className="container mx-auto px-6 relative z-10 pt-12">
        <Link href="/" className="inline-flex items-center gap-2 text-neutral-500 hover:text-white transition-colors mb-12 group uppercase text-[10px] font-black tracking-widest">
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          Gateway
        </Link>

        <section className="max-w-3xl mx-auto">
          <header className="mb-20">
            <div className="w-12 h-12 bg-white/5 rounded-2xl flex items-center justify-center mb-10 border border-white/10">
              <Gavel className="w-6 h-6 text-white opacity-80" />
            </div>
            <h1 className="text-4xl sm:text-6xl font-black tracking-tighter mb-6">
              Terms of <span className="text-silver-matte">Service.</span>
            </h1>
            <p className="text-neutral-500 font-medium italic">Last updated: April 2026</p>
          </header>

          <div className="space-y-16">
            {sections.map((section, i) => (
              <div key={i} className="group">
                <h2 className="text-xs font-black tracking-[0.4em] uppercase text-neutral-400 mb-6 group-hover:text-white transition-colors">
                  {`0${i + 1}. `}{section.title}
                </h2>
                <div className="bg-white/2 border border-white/5 p-8 rounded-3xl hover:border-white/10 transition-colors">
                  <p className="text-neutral-400 leading-relaxed text-sm">
                    {section.content}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
