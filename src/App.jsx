import React, { useState } from "react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import CategoryGrid from "./components/CategoryGrid";
import FeaturedPackages from "./components/FeaturedPackages";
import MarketplaceExplorer from "./components/MarketplaceExplorer";
import PackageDetail from "./components/PackageDetail";
import VendorDashboard from "./components/VendorDashboard";

// Mock Data
import { CATEGORIES, DISTRICTS, PACKAGES, MOCK_BOOKINGS } from "./data/mockData";

export default function App() {
  // Global App States
  const [currentRole, setCurrentRole] = useState("customer"); // "customer" | "vendor"
  const [currentView, setCurrentView] = useState("home"); // "home" | "explorer" | "detail" | "vendor-dashboard"
  const [selectedLocation, setSelectedLocation] = useState("Colombo");
  
  // Dynamic Catalog State (allows adding new packages via Vendor Dashboard!)
  const [packages, setPackages] = useState(PACKAGES);
  
  // Dynamic Bookings State (allows real-time confirmation/declining!)
  const [bookings, setBookings] = useState(MOCK_BOOKINGS);
  
  // Selected detail package
  const [selectedPkgId, setSelectedPkgId] = useState(null);
  
  // Pre-filled Explorer Filter state from Hero quick search
  const [explorerFilters, setExplorerFilters] = useState({});

  // Navigation controller helper
  const handleNavigate = (view) => {
    setCurrentView(view);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Select a category from homepage grid -> redirects to Explorer with filter
  const handleSelectCategory = (catId) => {
    setExplorerFilters({ category: catId });
    handleNavigate("explorer");
  };

  // Hero Quick Search query submit
  const handleHeroSearch = (filters) => {
    setExplorerFilters(filters);
    handleNavigate("explorer");
  };

  // Select package card -> opens detail page
  const handleSelectPackage = (pkgId) => {
    setSelectedPkgId(pkgId);
    handleNavigate("detail");
  };

  // Vendor Action: Add new custom package
  const handleAddPackage = (newPkg) => {
    setPackages(prev => [newPkg, ...prev]);
  };

  // Vendor Action: Accept or Decline incoming reservation
  const handleUpdateBookingStatus = (bookingId, newStatus) => {
    setBookings(prev => 
      prev.map(b => b.id === bookingId ? { ...b, status: newStatus } : b)
    );
  };

  // Retrieve active package details for detail page view
  const activePackage = packages.find(p => p.id === selectedPkgId);

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      {/* Global Navbar */}
      <Navbar
        currentRole={currentRole}
        setCurrentRole={(role) => {
          setCurrentRole(role);
          if (role === "vendor") {
            handleNavigate("vendor-dashboard");
          } else {
            handleNavigate("home");
          }
        }}
        selectedLocation={selectedLocation}
        setSelectedLocation={setSelectedLocation}
        districts={DISTRICTS}
        onNavigate={handleNavigate}
        currentView={currentView}
      />

      {/* Main View Router */}
      <main className="flex-grow">
        {currentRole === "customer" ? (
          /* ========================================================
             CUSTOMER VIEWS
             ======================================================== */
          <>
            {/* View A: Homepage & Discovery View */}
            {currentView === "home" && (
              <div className="animate-in fade-in duration-300">
                <Hero 
                  categories={CATEGORIES} 
                  districts={DISTRICTS} 
                  onSearch={handleHeroSearch} 
                />
                
                <CategoryGrid 
                  categories={CATEGORIES} 
                  onSelectCategory={handleSelectCategory} 
                />
                
                <FeaturedPackages 
                  packages={packages} 
                  onSelectPackage={handleSelectPackage} 
                />
              </div>
            )}

            {/* View B: Advanced Marketplace Explorer */}
            {currentView === "explorer" && (
              <div className="animate-in fade-in duration-300">
                <MarketplaceExplorer
                  packages={packages}
                  categories={CATEGORIES}
                  districts={DISTRICTS}
                  onSelectPackage={handleSelectPackage}
                  initialFilters={explorerFilters}
                />
              </div>
            )}

            {/* View C: Package Detail View */}
            {currentView === "detail" && activePackage && (
              <div className="animate-in fade-in duration-300">
                <PackageDetail
                  pkg={activePackage}
                  onBackToExplorer={() => handleNavigate("explorer")}
                  onNavigate={handleNavigate}
                />
              </div>
            )}
          </>
        ) : (
          /* ========================================================
             VENDOR VIEWS
             ======================================================== */
          <>
            {currentView === "vendor-dashboard" && (
              <div className="animate-in fade-in duration-300">
                <VendorDashboard
                  packages={packages}
                  onAddPackage={handleAddPackage}
                  categories={CATEGORIES}
                  districts={DISTRICTS}
                  bookings={bookings}
                  onUpdateBookingStatus={handleUpdateBookingStatus}
                />
              </div>
            )}
          </>
        )}
      </main>

      {/* Global Celebratory Footer */}
      <footer className="bg-slate-900 border-t border-slate-800 text-slate-400 py-12 px-4 lg:px-8 mt-16 select-none">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Column 1: Brand details */}
          <div className="flex flex-col gap-3">
            <span className="font-extrabold text-xl tracking-tight text-white">Uthsawa</span>
            <p className="text-slate-400 text-xs leading-relaxed font-light">
              Sri Lanka's premier decentralized marketplace for celebration services, wedding Poruwas, DJs, line arrays, ambient lighting, and traditional banquets.
            </p>
            <span className="text-[10px] text-slate-500 mt-2 font-semibold">
              © 2026 Uthsawa Inc. All Celebrations Reserved.
            </span>
          </div>

          {/* Column 2: Quick links */}
          <div className="flex flex-col gap-2.5">
            <span className="text-white text-xs font-bold uppercase tracking-wider mb-1">Customer Hub</span>
            <a href="#" onClick={(e) => { e.preventDefault(); handleNavigate("home"); }} className="text-xs hover:text-white transition-colors">Homepage Discovery</a>
            <a href="#" onClick={(e) => { e.preventDefault(); handleNavigate("explorer"); }} className="text-xs hover:text-white transition-colors">Marketplace Explorer</a>
            <a href="#" className="text-xs hover:text-white transition-colors">Featured Packages</a>
            <a href="#" className="text-xs hover:text-white transition-colors">Trust & Escrow Policies</a>
          </div>

          {/* Column 3: Vendor links */}
          <div className="flex flex-col gap-2.5">
            <span className="text-white text-xs font-bold uppercase tracking-wider mb-1">For Event Suppliers</span>
            <a href="#" onClick={(e) => { e.preventDefault(); setCurrentRole("vendor"); handleNavigate("vendor-dashboard"); }} className="text-xs hover:text-white transition-colors">Supplier Dashboard Console</a>
            <a href="#" className="text-xs hover:text-white transition-colors">Join as a Sri Lankan Vendor</a>
            <a href="#" className="text-xs hover:text-white transition-colors">Service Standards Agreement</a>
            <a href="#" className="text-xs hover:text-white transition-colors">Payout Schedule</a>
          </div>

          {/* Column 4: Contact/Local Info */}
          <div className="flex flex-col gap-2.5 text-xs">
            <span className="text-white text-xs font-bold uppercase tracking-wider mb-1">Ceylon Head Office</span>
            <span className="leading-relaxed font-light">
              108, Galle Road,<br />
              Kollupitiya, Colombo 03,<br />
              Sri Lanka
            </span>
            <span className="text-amber-400 font-bold mt-1">support@uthsawa.lk</span>
            <span className="text-slate-500 font-medium">+94 11 234 5678</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
