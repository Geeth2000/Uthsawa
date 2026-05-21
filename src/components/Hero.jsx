import React, { useState } from "react";
import { Search, Calendar, MapPin, Sparkles } from "lucide-react";

export default function Hero({ categories, districts, onSearch }) {
  const [selectedCat, setSelectedCat] = useState("");
  const [selectedLoc, setSelectedLoc] = useState("");
  const [selectedDate, setSelectedDate] = useState("");

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    onSearch({
      category: selectedCat,
      location: selectedLoc,
      date: selectedDate
    });
  };

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-emerald-950 via-emerald-900 to-slate-950 text-white py-16 px-4 lg:px-8">
      {/* Decorative Golden Ambient Lights */}
      <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-amber-500/10 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute -bottom-10 -left-10 w-[300px] h-[300px] bg-teal-500/10 rounded-full blur-[80px] pointer-events-none" />
      
      {/* Background Micro sparkles */}
      <div className="absolute inset-0 bg-[radial-gradient(#ffffff08_1px,transparent_1px)] [background-size:20px_20px] pointer-events-none" />

      <div className="max-w-5xl mx-auto text-center relative z-10">
        
        {/* Sparkle badge */}
        <div className="inline-flex items-center gap-1.5 bg-emerald-800/60 border border-emerald-700/50 px-4 py-1.5 rounded-full text-xs font-bold tracking-wide text-amber-400 mb-6 uppercase shadow-sm select-none animate-bounce">
          <Sparkles className="h-3.5 w-3.5" />
          Sri Lanka's Premier Celebration Marketplace
        </div>

        {/* Dynamic Bold Typography */}
        <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight leading-tight max-w-4xl mx-auto mb-6 bg-gradient-to-r from-white via-slate-100 to-amber-200 bg-clip-text text-transparent">
          Plan Your Perfect Sri Lankan Celebration, <br />
          <span className="text-amber-400">Stress-Free.</span>
        </h1>
        
        <p className="text-slate-300 text-sm md:text-lg max-w-2xl mx-auto mb-10 leading-relaxed font-light">
          Discover and book verified local sound systems, stunning stage decorations, mouthwatering buffets, and spectacular lighting packages tailored for your budget.
        </p>

        {/* Integrated Interactive Sticky Search/Filter Bar */}
        <form 
          onSubmit={handleSearchSubmit}
          className="bg-white/10 backdrop-blur-md border border-white/10 p-3 rounded-3xl shadow-2xl max-w-4xl mx-auto flex flex-col md:flex-row items-center gap-3"
        >
          {/* Category Input */}
          <div className="w-full md:w-1/3 flex items-center gap-2 bg-white/5 border border-white/5 rounded-2xl px-4 py-3 focus-within:bg-white/15 focus-within:border-emerald-500 transition-all">
            <Sparkles className="h-5 w-5 text-amber-400 shrink-0" />
            <div className="text-left w-full">
              <label className="block text-[10px] text-slate-300 font-bold uppercase tracking-wider">Service Category</label>
              <select
                value={selectedCat}
                onChange={(e) => setSelectedCat(e.target.value)}
                className="w-full bg-transparent text-sm text-white font-medium focus:outline-none cursor-pointer [&>option]:text-slate-800"
              >
                <option value="">All Categories</option>
                {categories.map((c) => (
                  <option key={c.id} value={c.id}>{c.name}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Location Input */}
          <div className="w-full md:w-1/3 flex items-center gap-2 bg-white/5 border border-white/5 rounded-2xl px-4 py-3 focus-within:bg-white/15 focus-within:border-emerald-500 transition-all">
            <MapPin className="h-5 w-5 text-teal-400 shrink-0" />
            <div className="text-left w-full">
              <label className="block text-[10px] text-slate-300 font-bold uppercase tracking-wider">District</label>
              <select
                value={selectedLoc}
                onChange={(e) => setSelectedLoc(e.target.value)}
                className="w-full bg-transparent text-sm text-white font-medium focus:outline-none cursor-pointer [&>option]:text-slate-800"
              >
                <option value="">Any District</option>
                {districts.map((d) => (
                  <option key={d} value={d}>{d}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Date Picker Input */}
          <div className="w-full md:w-1/3 flex items-center gap-2 bg-white/5 border border-white/5 rounded-2xl px-4 py-3 focus-within:bg-white/15 focus-within:border-emerald-500 transition-all">
            <Calendar className="h-5 w-5 text-emerald-400 shrink-0" />
            <div className="text-left w-full">
              <label className="block text-[10px] text-slate-300 font-bold uppercase tracking-wider">Event Date</label>
              <input
                type="date"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                className="w-full bg-transparent text-sm text-white font-medium focus:outline-none cursor-pointer scheme-dark"
              />
            </div>
          </div>

          {/* Search Action CTA Button */}
          <button 
            type="submit"
            className="w-full md:w-auto bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-emerald-950 font-extrabold text-sm uppercase px-8 py-4 rounded-2xl shadow-lg hover:shadow-amber-500/20 hover:-translate-y-0.5 transition-all duration-300 flex items-center justify-center gap-2"
          >
            <Search className="h-4 w-4 stroke-[3]" />
            Find Services
          </button>
        </form>

        {/* Quick local trust metrics */}
        <div className="mt-12 flex flex-wrap justify-center items-center gap-6 md:gap-16 text-slate-400 text-xs">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-emerald-500" />
            <span>100% Client Escrow Protection</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-emerald-500" />
            <span>Top-Rated Local Sri Lankan Vendors</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-emerald-500" />
            <span>Zero Booking Commission</span>
          </div>
        </div>

      </div>
    </section>
  );
}
