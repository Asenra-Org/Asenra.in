"use client";

import React from "react";
import Link from "next/link";
import { ArrowLeft, Shield } from "lucide-react";

export default function PrivacyPage() {
  const sections = [
    {
      title: "Introduction",
      content: "Asenra respects your privacy and is committed to protecting your personal data. This privacy policy will inform you as to how we look after your personal data when you visit our website and tell you about your privacy rights and how the law protects you."
    },
    {
      title: "The Data We Collect",
      content: "Personal data, or personal information, means any information about an individual from which that person can be identified. We may collect, use, store and transfer different kinds of personal data including Identity Data (name, username), Contact Data (email, telephone), and Technical Data (IP address, browser type, usage patterns)."
    },
    {
      title: "How We Use Your Data",
      content: "We will only use your personal data when the law allows us to. Most commonly, we will use your data to perform the contract we are about to enter into or have entered into with you, where it is necessary for our legitimate interests, or where we need to comply with a legal obligation."
    },
    {
      title: "Data Security",
      content: "We have put in place appropriate security measures to prevent your personal data from being accidentally lost, used or accessed in an unauthorized way, altered or disclosed. We limit access to your personal data to those employees, agents, contractors and other third parties who have a business need to know."
    },
    {
      title: "Contact Us",
      content: "If you have any questions about this privacy policy or our privacy practices, please contact us at care@asenra.in."
    }
  ];

  return (
    <main className="min-h-screen bg-black text-white selection:bg-white selection:text-black pb-24">
      {/* Background Ambience */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-[-10%] right-[-10%] w-[30%] h-[30%] bg-white/5 rounded-full blur-[140px]" />
      </div>

      <div className="container mx-auto px-6 relative z-10 pt-12">
        <Link href="/" className="inline-flex items-center gap-2 text-neutral-500 hover:text-white transition-colors mb-12 group uppercase text-[10px] font-black tracking-widest">
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          Gateway
        </Link>

        <section className="max-w-3xl mx-auto">
          <header className="mb-20">
            <div className="w-12 h-12 bg-white/5 rounded-2xl flex items-center justify-center mb-10 border border-white/10">
              <Shield className="w-6 h-6 text-white opacity-80" />
            </div>
            <h1 className="text-4xl sm:text-6xl font-black tracking-tighter mb-6">
              Privacy <span className="text-silver-matte">Policy.</span>
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
