import React, { useState, useMemo } from "react";
import { Star, MapPin, Search, Calendar, ChevronRight, SlidersHorizontal, CheckCircle2, RotateCcw, Sparkles } from "lucide-react";

export default function MarketplaceExplorer({ 
  packages, 
  categories, 
  districts, 
  onSelectPackage,
  initialFilters = {}
}) {
  // Search and Filter States
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategories, setSelectedCategories] = useState(
    initialFilters.category ? [initialFilters.category] : []
  );
  const [selectedDistricts, setSelectedDistricts] = useState(
    initialFilters.location ? [initialFilters.location] : []
  );
  const [maxPrice, setMaxPrice] = useState(1000000); // Max LKR 1,000,000
  const [minRating, setMinRating] = useState(0);
  const [eventDate, setEventDate] = useState(initialFilters.date || "");
  const [mobileShowFilters, setMobileShowFilters] = useState(false);

  // Price formatting helper
  const formatPrice = (price) => {
    return new Intl.NumberFormat("en-LK", {
      style: "currency",
      currency: "LKR",
      minimumFractionDigits: 0
    }).format(price).replace("LKR", "Rs.");
  };

  // Reset Filters
  const handleResetFilters = () => {
    setSearchQuery("");
    setSelectedCategories([]);
    setSelectedDistricts([]);
    setMaxPrice(1000000);
    setMinRating(0);
    setEventDate("");
  };

  // Toggle category select
  const handleCategoryToggle = (catId) => {
    setSelectedCategories(prev => 
      prev.includes(catId) ? prev.filter(c => c !== catId) : [...prev, catId]
    );
  };

  // Toggle district select
  const handleDistrictToggle = (dist) => {
    setSelectedDistricts(prev => 
      prev.includes(dist) ? prev.filter(d => d !== dist) : [...prev, dist]
    );
  };

  // Reactive Filter logic using useMemo
  const filteredPackages = useMemo(() => {
    return packages.filter(pkg => {
      // 1. Text Search query matching title, vendorName, or description
      if (searchQuery.trim() !== "") {
        const query = searchQuery.toLowerCase();
        const matchesTitle = pkg.title.toLowerCase().includes(query);
        const matchesVendor = pkg.vendorName.toLowerCase().includes(query);
        const matchesDesc = pkg.description.toLowerCase().includes(query);
        if (!matchesTitle && !matchesVendor && !matchesDesc) return false;
      }

      // 2. Category Filter
      if (selectedCategories.length > 0 && !selectedCategories.includes(pkg.category)) {
        return false;
      }

      // 3. District/Location Filter
      if (selectedDistricts.length > 0 && !selectedDistricts.includes(pkg.location)) {
        return false;
      }

      // 4. Price range filter
      if (pkg.price > maxPrice) {
        return false;
      }

      // 5. Rating filter
      if (pkg.vendorRating < minRating) {
        return false;
      }

      // 6. Date availability filter
      // (If a date is selected, check if it's in the pkg's bookedDates)
      if (eventDate !== "" && pkg.bookedDates.includes(eventDate)) {
        return false;
      }

      return true;
    });
  }, [packages, searchQuery, selectedCategories, selectedDistricts, maxPrice, minRating, eventDate]);

  return (
    <div className="max-w-7xl mx-auto px-4 lg:px-8 py-8">
      {/* Page Title & Breadcrumbs */}
      <div className="mb-8 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <span className="text-xs font-bold text-slate-400 uppercase tracking-widest flex items-center gap-1.5 mb-1.5">
            Marketplace <ChevronRight className="h-3 w-3" /> Explore Packages
          </span>
          <h1 className="text-2xl md:text-4xl font-extrabold text-slate-900 tracking-tight">
            Advanced Marketplace Explorer
          </h1>
          <p className="text-slate-500 text-sm mt-1">
            Compare services, select custom configurations, and book instantly.
          </p>
        </div>

        {/* Counter and Reset buttons */}
        <div className="flex items-center gap-3">
          <span className="text-xs font-bold text-slate-500 bg-slate-100 px-3 py-1.5 rounded-full select-none">
            Found {filteredPackages.length} packages
          </span>
          <button 
            onClick={handleResetFilters}
            className="flex items-center gap-1 text-xs font-bold text-emerald-700 hover:text-emerald-900 bg-emerald-50 hover:bg-emerald-100 px-3.5 py-1.5 rounded-full"
          >
            <RotateCcw className="h-3.5 w-3.5" />
            Reset All
          </button>
        </div>
      </div>

      {/* Main Container Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        
        {/* Mobile Filter Button toggle */}
        <button
          onClick={() => setMobileShowFilters(!mobileShowFilters)}
          className="lg:hidden w-full flex items-center justify-center gap-2 bg-emerald-950 text-white font-extrabold px-6 py-3 rounded-2xl shadow-lg"
        >
          <SlidersHorizontal className="h-4 w-4 text-amber-400" />
          Filter & Sort Options
        </button>

        {/* Column 1: Filter Sidebar (Sticky on Desktop) */}
        <aside className={`lg:sticky lg:top-24 h-fit bg-white border border-slate-100 rounded-3xl p-6 shadow-sm flex flex-col gap-6 ${mobileShowFilters ? "block" : "hidden lg:flex"}`}>
          <div className="flex items-center justify-between border-b border-slate-50 pb-3">
            <span className="font-extrabold text-slate-950 text-base flex items-center gap-2">
              <SlidersHorizontal className="h-4 w-4 text-emerald-700" />
              Advanced Filters
            </span>
          </div>

          {/* Text Search Input inside sidebar */}
          <div className="flex flex-col gap-1.5">
            <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Search Keywords</label>
            <div className="flex items-center bg-slate-50 border border-slate-200/80 rounded-2xl px-3.5 py-2.5 focus-within:border-emerald-600 focus-within:bg-white focus-within:ring-2 focus-within:ring-emerald-100">
              <Search className="h-4 w-4 text-slate-400 mr-2 shrink-0" />
              <input 
                type="text" 
                placeholder="Type keywords..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-transparent text-sm text-slate-700 placeholder-slate-400 focus:outline-none"
              />
            </div>
          </div>

          {/* Category Selector */}
          <div className="flex flex-col gap-2">
            <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Service Category</label>
            <div className="flex flex-col gap-2">
              {categories.map((c) => (
                <label key={c.id} className="flex items-center gap-2.5 text-sm font-semibold text-slate-700 cursor-pointer select-none">
                  <input
                    type="checkbox"
                    checked={selectedCategories.includes(c.id)}
                    onChange={() => handleCategoryToggle(c.id)}
                    className="accent-emerald-600 rounded h-4 w-4"
                  />
                  <span>{c.name}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Location selector */}
          <div className="flex flex-col gap-2">
            <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">District/Location</label>
            <div className="flex flex-col gap-2 max-h-36 overflow-y-auto pr-1">
              {districts.map((d) => (
                <label key={d} className="flex items-center gap-2.5 text-sm font-semibold text-slate-700 cursor-pointer select-none">
                  <input
                    type="checkbox"
                    checked={selectedDistricts.includes(d)}
                    onChange={() => handleDistrictToggle(d)}
                    className="accent-emerald-600 rounded h-4 w-4"
                  />
                  <span>{d}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Price Range Slider */}
          <div className="flex flex-col gap-2">
            <div className="flex justify-between items-center">
              <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Max Price (LKR)</label>
              <span className="text-xs font-extrabold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded-md">
                {formatPrice(maxPrice)}
              </span>
            </div>
            <input
              type="range"
              min="20000"
              max="1000000"
              step="10000"
              value={maxPrice}
              onChange={(e) => setMaxPrice(Number(e.target.value))}
              className="w-full accent-emerald-700 cursor-pointer h-1.5 bg-slate-100 rounded-lg appearance-none"
            />
            <div className="flex justify-between text-[10px] text-slate-400 font-bold">
              <span>Rs. 20K</span>
              <span>Rs. 1M</span>
            </div>
          </div>

          {/* Availability Date Picker */}
          <div className="flex flex-col gap-1.5">
            <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1">
              <Calendar className="h-3 w-3 text-slate-400" />
              Event Date Availability
            </label>
            <input
              type="date"
              value={eventDate}
              onChange={(e) => setEventDate(e.target.value)}
              className="bg-slate-50 border border-slate-200/80 rounded-2xl px-3.5 py-2 text-sm text-slate-700 focus:outline-none focus:border-emerald-600 focus:bg-white"
            />
            <span className="text-[9px] text-slate-400 font-semibold leading-normal">
              Showing packages NOT fully booked on this date.
            </span>
          </div>

          {/* Rating filter */}
          <div className="flex flex-col gap-2">
            <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Minimum Rating</label>
            <div className="grid grid-cols-4 gap-1">
              {[0, 3, 4, 5].map((stars) => (
                <button
                  key={stars}
                  type="button"
                  onClick={() => setMinRating(stars)}
                  className={`py-1.5 rounded-lg text-xs font-bold transition-all border ${minRating === stars ? "bg-emerald-950 text-white border-emerald-950 shadow-sm" : "bg-slate-50 text-slate-600 border-slate-200/50 hover:bg-slate-100"}`}
                >
                  {stars === 0 ? "All" : `${stars}★`}
                </button>
              ))}
            </div>
          </div>
        </aside>

        {/* Column 2: Search Cards Grid */}
        <section className="lg:col-span-3 flex flex-col gap-6">
          {filteredPackages.length === 0 ? (
            <div className="bg-white border border-slate-100 rounded-3xl p-12 text-center shadow-sm max-w-xl mx-auto w-full mt-4 flex flex-col items-center">
              <div className="bg-slate-50 p-5 rounded-full text-slate-400 mb-4">
                <Search className="h-10 w-10 stroke-[1.5]" />
              </div>
              <h3 className="font-extrabold text-lg text-slate-900 mb-1">No Matching Packages Found</h3>
              <p className="text-slate-500 text-sm max-w-xs mx-auto leading-relaxed mb-6">
                Try widening your price range, removing category selections, or searching for alternative event keywords.
              </p>
              <button 
                onClick={handleResetFilters}
                className="bg-emerald-950 text-amber-400 font-bold px-6 py-2.5 rounded-2xl text-xs uppercase shadow hover:scale-105 transition-transform"
              >
                Clear Search & Filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {filteredPackages.map((pkg) => (
                <div
                  key={pkg.id}
                  onClick={() => onSelectPackage(pkg.id)}
                  className="group cursor-pointer bg-white rounded-3xl overflow-hidden border border-slate-100 shadow-sm hover:shadow-xl hover:border-emerald-600/20 hover:-translate-y-1 transition-all duration-300 flex flex-col h-full"
                >
                  {/* Media block */}
                  <div className="relative aspect-[4/3] w-full overflow-hidden bg-slate-100 shrink-0">
                    <img
                      src={pkg.images[0]}
                      alt={pkg.title}
                      className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-500"
                    />
                    
                    {pkg.badge && (
                      <span className="absolute top-3 left-3 bg-emerald-950 text-amber-400 text-[9px] font-extrabold uppercase tracking-wider px-2.5 py-1 rounded-full shadow-md flex items-center gap-0.5">
                        <Sparkles className="h-2.5 w-2.5" />
                        {pkg.badge}
                      </span>
                    )}

                    <span className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm text-slate-800 text-[9px] font-extrabold uppercase px-2.5 py-1 rounded-full shadow-sm">
                      {pkg.category.toUpperCase()}
                    </span>
                  </div>

                  {/* Body elements */}
                  <div className="p-5 flex flex-col flex-1">
                    <h3 className="font-extrabold text-base text-slate-900 group-hover:text-emerald-800 transition-colors leading-snug mb-1.5">
                      {pkg.title}
                    </h3>

                    <p className="text-slate-500 text-[11px] font-semibold mb-3">
                      by <span className="text-slate-700 font-bold">{pkg.vendorName}</span>
                    </p>

                    <div className="flex items-center gap-3 text-[11px] font-bold text-slate-500 border-b border-slate-50 pb-3.5 mb-3.5">
                      <span className="flex items-center gap-0.5 text-amber-500">
                        <Star className="h-3 w-3 fill-amber-500" />
                        {pkg.vendorRating}
                      </span>
                      
                      <span className="flex items-center gap-0.5">
                        <MapPin className="h-3 w-3 text-slate-400" />
                        {pkg.location}
                      </span>
                    </div>

                    <div className="flex items-center justify-between mt-auto">
                      <div>
                        <span className="block text-[9px] text-slate-400 font-bold uppercase">Price</span>
                        <span className="text-base font-extrabold text-emerald-900">
                          {formatPrice(pkg.price)}
                        </span>
                      </div>
                      
                      {pkg.addons && pkg.addons.length > 0 && (
                        <span className="inline-flex items-center gap-0.5 bg-amber-50 border border-amber-100 text-amber-800 text-[9px] font-bold px-2 py-0.5 rounded-full">
                          <CheckCircle2 className="h-2.5 w-2.5 text-amber-600" />
                          Add-ons
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>

      </div>
    </div>
  );
}
