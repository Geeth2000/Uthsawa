import React, { useState } from "react";
import { Sparkles, MapPin, Search, ChevronDown, User, Store, Bell } from "lucide-react";

export default function Navbar({ 
  currentRole, 
  setCurrentRole, 
  selectedLocation, 
  setSelectedLocation, 
  districts,
  onNavigate,
  currentView
}) {
  const [showLocationDropdown, setShowLocationDropdown] = useState(false);

  return (
    <nav className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-slate-100 shadow-sm px-4 lg:px-8 py-3">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
        
        {/* Brand Logo */}
        <div 
          onClick={() => onNavigate("home")} 
          className="flex items-center gap-2 cursor-pointer select-none group"
        >
          <div className="bg-emerald-950 p-2 rounded-xl text-amber-500 shadow-inner group-hover:scale-105 transition-transform duration-300">
            <Sparkles className="h-5 w-5 animate-pulse" />
          </div>
          <div>
            <span className="font-extrabold text-xl lg:text-2xl tracking-tight text-emerald-950">
              Uthsawa
            </span>
            <span className="block text-[10px] text-amber-600 font-bold tracking-widest uppercase -mt-1">
              Sri Lanka
            </span>
          </div>
        </div>

        {/* Search Bar Placeholder (Customer View only) */}
        {currentRole === "customer" && (
          <div className="hidden md:flex items-center flex-1 max-w-md bg-slate-50 border border-slate-200/80 rounded-full px-4 py-1.5 focus-within:border-emerald-600 focus-within:bg-white focus-within:ring-2 focus-within:ring-emerald-100 transition-all duration-300">
            <Search className="h-4 w-4 text-slate-400 mr-2" />
            <input 
              type="text" 
              placeholder="Search sounds, decorators, buffets..." 
              className="w-full bg-transparent text-sm text-slate-700 placeholder-slate-400 focus:outline-none"
              onClick={() => currentView !== "explorer" && onNavigate("explorer")}
            />
          </div>
        )}

        {/* Right Controls */}
        <div className="flex items-center gap-3 lg:gap-6">
          
          {/* Location Selector (Customer View only) */}
          {currentRole === "customer" && (
            <div className="relative">
              <button 
                onClick={() => setShowLocationDropdown(!showLocationDropdown)}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-full hover:bg-slate-50 text-slate-700 text-sm font-semibold border border-slate-200/50 hover:border-slate-300 transition-all"
              >
                <MapPin className="h-4 w-4 text-emerald-600" />
                <span>{selectedLocation}</span>
                <ChevronDown className={`h-3 w-3 text-slate-400 transition-transform duration-300 ${showLocationDropdown ? "rotate-180" : ""}`} />
              </button>
              
              {showLocationDropdown && (
                <div className="absolute right-0 mt-2 w-48 bg-white border border-slate-100 rounded-2xl shadow-xl py-2 z-50 animate-in fade-in slide-in-from-top-2 duration-200">
                  <div className="px-3 py-1 text-xs font-bold text-slate-400 uppercase tracking-wider border-b border-slate-50 mb-1">
                    Select District
                  </div>
                  {districts.map((district) => (
                    <button
                      key={district}
                      onClick={() => {
                        setSelectedLocation(district);
                        setShowLocationDropdown(false);
                      }}
                      className={`w-full text-left px-4 py-2 text-sm transition-colors hover:bg-slate-50 ${selectedLocation === district ? "text-emerald-700 font-bold bg-emerald-50/50" : "text-slate-600"}`}
                    >
                      {district}
                    </button>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Persona Swifter Button Slider */}
          <div className="bg-slate-100 p-0.5 rounded-full flex items-center shadow-inner relative w-[160px] h-[34px]">
            {/* Background Sliding Pill */}
            <div 
              className={`absolute top-0.5 bottom-0.5 rounded-full bg-white shadow-sm border border-slate-200/50 transition-all duration-300 w-[78px] ${
                currentRole === "vendor" ? "translate-x-[79px]" : "translate-x-0"
              }`}
            />
            {/* Buttons */}
            <button
              onClick={() => {
                setCurrentRole("customer");
                onNavigate("home");
              }}
              className={`relative z-10 w-[79px] text-center text-xs font-bold transition-colors ${
                currentRole === "customer" ? "text-emerald-950" : "text-slate-400 hover:text-slate-600"
              }`}
            >
              <span className="flex items-center justify-center gap-1">
                <User className="h-3 w-3" />
                Customer
              </span>
            </button>
            <button
              onClick={() => {
                setCurrentRole("vendor");
                onNavigate("vendor-dashboard");
              }}
              className={`relative z-10 w-[79px] text-center text-xs font-bold transition-colors ${
                currentRole === "vendor" ? "text-emerald-950" : "text-slate-400 hover:text-slate-600"
              }`}
            >
              <span className="flex items-center justify-center gap-1">
                <Store className="h-3 w-3" />
                Vendor
              </span>
            </button>
          </div>

          {/* Notification Alert (Bell icon) */}
          <button className="relative p-2 text-slate-400 hover:text-slate-600 rounded-full hover:bg-slate-50 transition-all">
            <Bell className="h-5 w-5" />
            <span className="absolute top-1 right-1 h-2 w-2 rounded-full bg-amber-500 border border-white animate-pulse" />
          </button>

          {/* User Profile Avatar Mockup */}
          <div className="h-8 w-8 rounded-full bg-gradient-to-tr from-emerald-800 to-emerald-600 border border-emerald-900 text-white font-bold text-xs flex items-center justify-center shadow-sm select-none">
            {currentRole === "customer" ? "RP" : "LS"}
          </div>

        </div>

      </div>
    </nav>
  );
}
