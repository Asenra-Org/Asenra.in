"use client";

import React, { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { 
  Phone, MapPin, ExternalLink, RefreshCw, 
  CheckCircle, ShieldAlert, Lock, Copy, Check,
  Star, Mail, Compass
} from "lucide-react";

interface Lead {
  id: string;
  name: string;
  phone: string;
  email: string;
  address: string;
  city: string;
  state: string;
  maps_link: string;
  rating: number;
  review_count: number;
  category: string;
  industry: string;
  tagline: string;
  description: string;
  services: string;
  color_theme: string;
  status: string;
  slug: string;
}

export default function AdminLeads() {
  const [password, setPassword] = useState("");
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [copiedSlug, setCopiedSlug] = useState<string | null>(null);
  const [updatingId, setUpdatingId] = useState<string | null>(null);

  // Check sessionStorage for previous login
  useEffect(() => {
    const auth = sessionStorage.getItem("asenra_admin_auth");
    if (auth === "true") {
      setIsAuthorized(true);
      fetchLeads();
    }
  }, []);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === "asenra2026") {
      sessionStorage.setItem("asenra_admin_auth", "true");
      setIsAuthorized(true);
      fetchLeads();
    } else {
      setError("Incorrect password. Please try again.");
    }
  };

  const fetchLeads = async () => {
    setLoading(true);
    setError("");
    try {
      const { data, error } = await supabase
        .from("leads")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;
      setLeads(data || []);
    } catch (err: any) {
      setError(err.message || "Failed to fetch leads.");
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = async (id: string, newStatus: string) => {
    setUpdatingId(id);
    try {
      const { error } = await supabase
        .from("leads")
        .update({ status: newStatus })
        .eq("id", id);

      if (error) throw error;
      
      setLeads(leads.map(lead => lead.id === id ? { ...lead, status: newStatus } : lead));
    } catch (err: any) {
      alert("Failed to update status: " + err.message);
    } finally {
      setUpdatingId(null);
    }
  };

  const copyToClipboard = (slug: string) => {
    const url = `${window.location.origin}/demos/${slug}`;
    navigator.clipboard.writeText(url);
    setCopiedSlug(slug);
    setTimeout(() => setCopiedSlug(null), 2000);
  };

  const handleWhatsAppClick = (lead: Lead) => {
    // Clean phone number: remove non-digits
    let cleanPhone = lead.phone.replace(/[^\d]/g, "");
    
    // If it's a local 10 digit number in India, prepend '91'
    if (cleanPhone.length === 10) {
      cleanPhone = `91${cleanPhone}`;
    }
    
    // Always use the production asenra.in URL for client outreach messages
    const demoUrl = `https://asenra.in/demos/${lead.slug}`;
    let message = "";
    
    if (lead.category === "cafe") {
      message = `Hello! I came across your cafe *${lead.name}* on Google Maps.\n\nWe designed a premium custom demo website showcasing your menu and taking online table reservations:\n👉 ${demoUrl}\n\nWe can customize this with your real photos, logo, and menu details. Let me know if you would like to take this live!\n\nBest regards,\nAsenra Team`;
    } else if (lead.category === "gym") {
      message = `Hello! I came across your fitness center *${lead.name}* on Google Maps.\n\nWe designed a premium, high-energy custom demo landing page showing your classes, trainers, and membership plans:\n👉 ${demoUrl}\n\nWe can customize this with your gym photos and plans. Let me know if you would like to take this live!\n\nBest regards,\nAsenra Team`;
    } else if (lead.category === "salon") {
      message = `Hello! I came across your salon *${lead.name}* on Google Maps.\n\nWe designed a premium, luxury minimalist demo website showing your styling packages and online appointment booking:\n👉 ${demoUrl}\n\nWe can customize this with your brand colors, photos, and team. Let me know if you would like to take this live!\n\nBest regards,\nAsenra Team`;
    } else if (lead.category === "services") {
      message = `Hello! I came across your business *${lead.name}* on Google Maps.\n\nWe designed a premium, clean service-booking demo website showcasing your services, reviews, and booking form:\n👉 ${demoUrl}\n\nWe can customize this with your actual list of services and contact details. Let me know if you would like to take this live!\n\nBest regards,\nAsenra Team`;
    } else {
      message = `Hello! I came across your business *${lead.name}* on Google Maps.\n\nWe designed a premium, mobile-optimized custom demo website specifically for you:\n👉 ${demoUrl}\n\nWe can customize this with your real details, logo, and brand theme. Let me know if you would like to take this live!\n\nBest regards,\nAsenra Team`;
    }
    
    const encodedText = encodeURIComponent(message);
    const waUrl = `https://wa.me/${cleanPhone}?text=${encodedText}`;
    window.open(waUrl, "_blank");
  };

  if (!isAuthorized) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center p-6 selection:bg-white selection:text-black">
        <div className="w-full max-w-md bg-neutral-950 border border-white/5 rounded-3xl p-8 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-[3px] bg-linear-to-r from-neutral-800 via-white to-neutral-800" />
          
          <div className="text-center mb-8">
            <div className="inline-flex p-3 bg-white/5 border border-white/10 rounded-2xl text-white mb-4">
              <Lock className="w-6 h-6" />
            </div>
            <h1 className="text-2xl font-black text-white uppercase tracking-wider mb-2">Asenra Leads Portal</h1>
            <p className="text-xs text-neutral-500 uppercase tracking-widest font-semibold">Authorized Personnel Only</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-neutral-400 uppercase tracking-wider mb-2">Enter Access Password</label>
              <input 
                type="password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-black border border-white/10 rounded-xl px-4 py-3.5 text-white text-sm outline-hidden focus:border-white transition-all text-center tracking-widest"
                placeholder="••••••••"
                required
              />
            </div>
            
            {error && (
              <p className="text-xs text-red-500 font-semibold text-center bg-red-500/5 border border-red-500/10 py-2.5 rounded-lg">
                {error}
              </p>
            )}

            <button 
              type="submit" 
              className="w-full bg-white hover:bg-neutral-200 text-black py-3.5 rounded-xl font-black text-sm uppercase tracking-widest transition-all cursor-pointer shadow-lg"
            >
              Verify & Enter
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-neutral-200 p-6 md:p-12 font-sans selection:bg-white selection:text-black">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-white/5 pb-6">
          <div>
            <h1 className="text-3xl font-black text-white uppercase tracking-tight">Leads Dashboard</h1>
            <p className="text-sm text-neutral-400">Daily business prospecting & customized demo manager</p>
          </div>
          <button 
            onClick={fetchLeads}
            disabled={loading}
            className="flex items-center gap-2 border border-white/10 hover:bg-white/5 disabled:opacity-50 text-white font-bold py-2.5 px-5 rounded-xl text-xs uppercase tracking-wider transition-all cursor-pointer"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${loading ? "animate-spin" : ""}`} />
            Refresh Leads
          </button>
        </div>

        {/* Leads Table Card */}
        <div className="bg-neutral-950 border border-white/5 rounded-3xl overflow-hidden shadow-2xl">
          {loading ? (
            <div className="py-20 text-center text-neutral-500 text-sm uppercase tracking-widest">
              <RefreshCw className="w-6 h-6 animate-spin mx-auto mb-4 text-neutral-400" />
              Fetching leads from Supabase...
            </div>
          ) : error ? (
            <div className="py-16 text-center text-red-500 p-6">
              <ShieldAlert className="w-10 h-10 mx-auto mb-4" />
              <p className="font-bold mb-2">Error Loading Leads</p>
              <p className="text-xs text-neutral-400">{error}</p>
            </div>
          ) : leads.length === 0 ? (
            <div className="py-20 text-center text-neutral-500 text-sm uppercase tracking-widest">
              No leads found. Run the automation script to add new leads!
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse min-w-[1000px]">
                <thead>
                  <tr className="border-b border-white/5 text-neutral-500 text-xs font-black uppercase tracking-wider">
                    <th className="py-5 px-6">Business & Location</th>
                    <th className="py-5 px-6">Industry & Services</th>
                    <th className="py-5 px-6">Reputation</th>
                    <th className="py-5 px-6">Contact info</th>
                    <th className="py-5 px-6">Status</th>
                    <th className="py-5 px-6 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5 text-sm">
                  {leads.map((lead) => {
                    const statusColors: Record<string, string> = {
                      new: "bg-neutral-800 text-neutral-300",
                      called: "bg-amber-500/10 text-amber-400 border border-amber-500/20",
                      interested: "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20",
                      closed: "bg-blue-500/10 text-blue-400 border border-blue-500/20"
                    };

                    return (
                      <tr key={lead.id} className="hover:bg-white/[0.01] transition-colors">
                        {/* Name & Address */}
                        <td className="py-5 px-6 max-w-[280px]">
                          <div className="font-bold text-white text-base leading-snug">{lead.name}</div>
                          <div className="flex items-start gap-1.5 text-xs text-neutral-500 mt-2 leading-relaxed">
                            <MapPin className="w-3.5 h-3.5 shrink-0 mt-0.5" />
                            <span>{lead.address}, {lead.city}, {lead.state}</span>
                          </div>
                        </td>

                        {/* Industry & Services */}
                        <td className="py-5 px-6 max-w-[250px]">
                          <div className="inline-block bg-white/5 border border-white/10 text-neutral-400 py-0.5 px-2.5 rounded-full text-[10px] font-bold uppercase tracking-wider mb-2">
                            {lead.industry || lead.category}
                          </div>
                          {lead.services && (
                            <div className="text-xs text-neutral-500 truncate" title={lead.services}>
                              {lead.services}
                            </div>
                          )}
                        </td>

                        {/* Reputation (Google Maps Rating) */}
                        <td className="py-5 px-6">
                          {lead.rating ? (
                            <div className="space-y-1">
                              <div className="flex items-center gap-1 font-bold text-white">
                                <Star className="w-4 h-4 fill-amber-500 text-amber-500" />
                                {lead.rating}
                              </div>
                              <div className="text-xs text-neutral-500">{lead.review_count} reviews</div>
                            </div>
                          ) : (
                            <span className="text-neutral-600 text-xs">N/A</span>
                          )}
                        </td>

                        {/* Contact Info */}
                        <td className="py-5 px-6">
                          <div className="space-y-1.5">
                            <a 
                              href={`tel:${lead.phone}`}
                              className="flex items-center gap-2 hover:text-white font-semibold transition-colors text-neutral-300 text-xs"
                            >
                              <Phone className="w-3.5 h-3.5 text-neutral-500 shrink-0" />
                              {lead.phone}
                            </a>
                            {lead.email && (
                              <a 
                                href={`mailto:${lead.email}`}
                                className="flex items-center gap-2 hover:text-white transition-colors text-neutral-400 text-xs"
                              >
                                <Mail className="w-3.5 h-3.5 text-neutral-500 shrink-0" />
                                <span className="truncate max-w-[150px]">{lead.email}</span>
                              </a>
                            )}
                          </div>
                        </td>

                        {/* Status Selector */}
                        <td className="py-5 px-6">
                          <div className="relative">
                            <select 
                              value={lead.status || "new"}
                              disabled={updatingId === lead.id}
                              onChange={(e) => handleStatusChange(lead.id, e.target.value)}
                              className={`appearance-none bg-neutral-900 border border-white/10 rounded-xl px-3.5 py-2 text-xs font-bold uppercase tracking-wider outline-hidden cursor-pointer transition-all ${statusColors[lead.status] || "bg-neutral-800 text-neutral-300"}`}
                            >
                              <option value="new">New Lead</option>
                              <option value="called">Called</option>
                              <option value="interested">Interested</option>
                              <option value="closed">Closed Deal</option>
                            </select>
                          </div>
                        </td>

                        {/* Actions */}
                        <td className="py-5 px-6 text-right space-x-1.5">
                          {lead.maps_link && (
                            <a 
                              href={lead.maps_link}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center justify-center p-2 border border-white/10 hover:border-white/20 hover:bg-white/5 rounded-xl text-neutral-500 hover:text-white transition-all"
                              title="Open Google Maps Profile"
                            >
                              <Compass className="w-4 h-4" />
                            </a>
                          )}
                          
                          <button 
                            onClick={() => copyToClipboard(lead.slug)}
                            className="inline-flex items-center justify-center p-2 border border-white/10 hover:border-white/20 hover:bg-white/5 rounded-xl text-neutral-500 hover:text-white transition-all cursor-pointer"
                            title="Copy Demo Link"
                          >
                            {copiedSlug === lead.slug ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                          </button>
                          
                          <button 
                            onClick={() => handleWhatsAppClick(lead)}
                            className="inline-flex items-center justify-center p-2 border border-emerald-500/20 hover:border-emerald-500/40 bg-emerald-500/5 hover:bg-emerald-500/10 rounded-xl text-emerald-400 hover:text-emerald-300 transition-all cursor-pointer"
                            title="Send Demo via WhatsApp"
                          >
                            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L0 24l6.335-1.662c1.746.953 3.71 1.455 5.703 1.455h.004c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                            </svg>
                          </button>
                          
                          <a 
                            href={`/demos/${lead.slug}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center justify-center p-2 border border-white/10 hover:border-white/20 hover:bg-white/5 rounded-xl text-neutral-400 hover:text-white transition-all no-underline"
                            title="Open Live Demo"
                          >
                            <ExternalLink className="w-4 h-4" />
                          </a>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
