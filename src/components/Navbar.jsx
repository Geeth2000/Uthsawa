import React, { useState } from "react";
import {
  ChevronDown,
  LogOut,
  MapPin,
  Shield,
  ShoppingCart,
  Sparkles,
  UserRound,
} from "lucide-react";

const roleBadgeClasses = {
  admin: "bg-slate-900 text-white",
  vendor: "bg-amber-100 text-amber-900",
  customer: "bg-emerald-100 text-emerald-900",
};

export default function Navbar({
  currentUser,
  selectedLocation,
  setSelectedLocation,
  districts,
  onNavigate,
  cartCount = 0,
  onLogout,
}) {
  const [showLocationDropdown, setShowLocationDropdown] = useState(false);

  return (
    <nav className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-slate-100 shadow-sm px-4 lg:px-8 py-3">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
        <button
          onClick={() => onNavigate("home")}
          className="flex items-center gap-2 cursor-pointer select-none group"
        >
          <div className="bg-emerald-950 p-2 rounded-xl text-amber-500 shadow-inner">
            <Sparkles className="h-5 w-5" />
          </div>
          <div>
            <span className="font-extrabold text-xl lg:text-2xl tracking-tight text-emerald-950">
              Uthsawa
            </span>
            <span className="block text-[10px] text-amber-600 font-bold tracking-widest uppercase -mt-1">
              Sri Lanka
            </span>
          </div>
        </button>

        <div className="flex items-center gap-2 lg:gap-3">
          <div className="relative hidden md:block">
            <button
              onClick={() => setShowLocationDropdown((prev) => !prev)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full hover:bg-slate-50 text-slate-700 text-sm font-semibold border border-slate-200/50"
            >
              <MapPin className="h-4 w-4 text-emerald-600" />
              <span>{selectedLocation}</span>
              <ChevronDown
                className={`h-3 w-3 text-slate-400 transition-transform ${showLocationDropdown ? "rotate-180" : ""}`}
              />
            </button>

            {showLocationDropdown && (
              <div className="absolute right-0 mt-2 w-48 bg-white border border-slate-100 rounded-2xl shadow-xl py-2 z-50">
                {districts.map((district) => (
                  <button
                    key={district}
                    onClick={() => {
                      setSelectedLocation(district);
                      setShowLocationDropdown(false);
                    }}
                    className={`w-full text-left px-4 py-2 text-sm hover:bg-slate-50 ${selectedLocation === district ? "text-emerald-700 font-bold" : "text-slate-600"}`}
                  >
                    {district}
                  </button>
                ))}
              </div>
            )}
          </div>

          {!currentUser && (
            <>
              <button
                onClick={() => onNavigate("login")}
                className="rounded-xl px-3 py-2 text-xs font-extrabold uppercase tracking-wider text-slate-700 bg-slate-100"
              >
                Login / Register
              </button>
            </>
          )}

          {currentUser && (
            <>
              {currentUser.role === "customer" && (
                <button
                  onClick={() => onNavigate("cart")}
                  className="relative p-2 text-slate-500 hover:text-slate-700 rounded-full hover:bg-slate-50"
                >
                  <ShoppingCart className="h-5 w-5" />
                  {cartCount > 0 && (
                    <span className="absolute -top-1 -right-1 min-w-5 h-5 px-1 rounded-full bg-emerald-900 text-amber-300 text-[10px] font-extrabold flex items-center justify-center">
                      {cartCount}
                    </span>
                  )}
                </button>
              )}

              <div className="hidden lg:flex items-center gap-2 rounded-full bg-slate-100 pl-2 pr-3 py-1.5">
                <div className="h-7 w-7 rounded-full bg-emerald-900 text-white font-bold text-xs flex items-center justify-center">
                  {currentUser.name?.slice(0, 1)?.toUpperCase() || "U"}
                </div>
                <div>
                  <p className="text-[11px] font-black text-slate-800 leading-tight">
                    {currentUser.name}
                  </p>
                  <span
                    className={`inline-flex px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${roleBadgeClasses[currentUser.role]}`}
                  >
                    {currentUser.role}
                  </span>
                </div>
              </div>

              <button
                onClick={() => onNavigate("dashboard")}
                className="rounded-xl px-3 py-2 text-xs font-extrabold uppercase tracking-wider text-slate-800 bg-slate-100 inline-flex items-center gap-1"
              >
                <Shield className="h-3.5 w-3.5" />
                Go to Dashboard
              </button>

              <button
                onClick={onLogout}
                className="rounded-xl px-3 py-2 text-xs font-extrabold uppercase tracking-wider text-rose-700 bg-rose-50 inline-flex items-center gap-1"
              >
                <LogOut className="h-3.5 w-3.5" />
                Logout
              </button>
            </>
          )}

          {!currentUser && (
            <div className="h-8 w-8 rounded-full bg-slate-100 text-slate-500 flex items-center justify-center">
              <UserRound className="h-4 w-4" />
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}
