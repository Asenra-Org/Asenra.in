"use client";

import React, { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { 
  Phone, MapPin, ExternalLink, RefreshCw, 
  CheckCircle, ShieldAlert, Lock, Copy, Check 
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
    // Default secure password for Asenra leads dashboard
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
      
      // Update local state
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

  // 1. PASSWORD GATE SCREEN
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

  // 2. MAIN ADMIN LEADS BOARD
  return (
    <div className="min-h-screen bg-black text-neutral-200 p-6 md:p-12 font-sans selection:bg-white selection:text-black">
      <div className="max-w-6xl mx-auto space-y-8">
        
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
              No leads found. Run the generator script to add new leads!
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-white/5 text-neutral-500 text-xs font-black uppercase tracking-wider">
                    <th className="py-5 px-6">Business</th>
                    <th className="py-5 px-6">Category</th>
                    <th className="py-5 px-6">Contact info</th>
                    <th className="py-5 px-6">Call Status</th>
                    <th className="py-5 px-6 text-right">Demo URL</th>
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
                        <td className="py-5 px-6">
                          <div className="font-bold text-white text-base">{lead.name}</div>
                          <div className="flex items-center gap-1.5 text-xs text-neutral-500 mt-1">
                            <MapPin className="w-3.5 h-3.5" />
                            {lead.address}
                          </div>
                        </td>

                        {/* Category */}
                        <td className="py-5 px-6">
                          <span className="bg-white/5 border border-white/10 text-neutral-400 py-1 px-3 rounded-full text-xs font-semibold uppercase tracking-wider">
                            {lead.category}
                          </span>
                        </td>

                        {/* Contact Info */}
                        <td className="py-5 px-6">
                          <a 
                            href={`tel:${lead.phone}`}
                            className="flex items-center gap-2 hover:text-white font-semibold transition-colors text-neutral-300"
                          >
                            <Phone className="w-4 h-4 text-neutral-500" />
                            {lead.phone}
                          </a>
                        </td>

                        {/* Status Selector */}
                        <td className="py-5 px-6">
                          <div className="relative">
                            <select 
                              value={lead.status || "new"}
                              disabled={updatingId === lead.id}
                              onChange={(e) => handleStatusChange(lead.id, e.target.value)}
                              className={`appearance-none bg-neutral-900 border border-white/10 rounded-xl px-4 py-2 text-xs font-bold uppercase tracking-wider outline-hidden cursor-pointer transition-all ${statusColors[lead.status] || "bg-neutral-800 text-neutral-300"}`}
                            >
                              <option value="new">New Lead</option>
                              <option value="called">Called</option>
                              <option value="interested">Interested</option>
                              <option value="closed">Closed Deal</option>
                            </select>
                          </div>
                        </td>

                        {/* Actions (Demo Links) */}
                        <td className="py-5 px-6 text-right space-x-2">
                          <button 
                            onClick={() => copyToClipboard(lead.slug)}
                            className="inline-flex items-center justify-center p-2 border border-white/10 hover:border-white/20 hover:bg-white/5 rounded-xl text-neutral-400 hover:text-white transition-all cursor-pointer"
                            title="Copy Demo Link"
                          >
                            {copiedSlug === lead.slug ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
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
