import React from "react";
import { Star, MapPin, Sparkles, CheckCircle2 } from "lucide-react";

export default function FeaturedPackages({ packages, onSelectPackage }) {
  
  // Format price helper
  const formatPrice = (price) => {
    return new Intl.NumberFormat("en-LK", {
      style: "currency",
      currency: "LKR",
      minimumFractionDigits: 0
    }).format(price).replace("LKR", "Rs.");
  };

  return (
    <div className="bg-slate-50 py-16 px-4 lg:px-8 border-t border-slate-100">
      <div className="max-w-7xl mx-auto">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-10 text-center md:text-left">
          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full">
              Hand-picked Masterpieces
            </span>
            <h2 className="text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight mt-2">
              Featured Premium Packages
            </h2>
            <p className="text-slate-500 text-sm mt-1">
              Top preset arrangements designed by professional event suppliers for effortless planning.
            </p>
          </div>
        </div>

        {/* 3-Column Package Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {packages.slice(0, 3).map((pkg) => (
            <div
              key={pkg.id}
              onClick={() => onSelectPackage(pkg.id)}
              className="group cursor-pointer bg-white rounded-[32px] overflow-hidden border border-slate-100 shadow-sm hover:shadow-2xl hover:border-emerald-600/20 hover:-translate-y-1.5 transition-all duration-300 flex flex-col h-full"
            >
              {/* Media image container with absolute badges */}
              <div className="relative aspect-[4/3] w-full overflow-hidden bg-slate-100 shrink-0">
                <img
                  src={pkg.images[0]}
                  alt={pkg.title}
                  className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-500"
                />
                
                {/* Dark Gradient Overlay for readability */}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/40 via-transparent to-transparent opacity-60 pointer-events-none" />

                {/* Left Top Badge: Verified Tag */}
                {pkg.badge && (
                  <span className="absolute top-4 left-4 bg-emerald-950 text-amber-400 text-[10px] font-extrabold uppercase tracking-wider px-3 py-1.5 rounded-full shadow-lg flex items-center gap-1">
                    <Sparkles className="h-3 w-3" />
                    {pkg.badge}
                  </span>
                )}

                {/* Right Top Badge: Category */}
                <span className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm text-slate-800 text-[10px] font-extrabold uppercase tracking-widest px-3 py-1.5 rounded-full shadow-sm">
                  {pkg.category.toUpperCase()}
                </span>
              </div>

              {/* Package Meta Info */}
              <div className="p-6 flex flex-col flex-1">
                {/* Title */}
                <h3 className="font-extrabold text-lg text-slate-950 group-hover:text-emerald-800 transition-colors leading-snug mb-2">
                  {pkg.title}
                </h3>

                {/* Vendor Brand Name */}
                <p className="text-slate-500 text-xs font-semibold mb-4 flex items-center gap-1.5">
                  by <span className="text-slate-800 font-bold">{pkg.vendorName}</span>
                </p>

                {/* Ratings & Location Badges */}
                <div className="flex items-center gap-4 text-xs font-bold text-slate-500 border-b border-slate-100 pb-4 mb-4">
                  <span className="flex items-center gap-1 text-amber-500">
                    <Star className="h-3.5 w-3.5 fill-amber-500" />
                    {pkg.vendorRating} <span className="text-slate-400 font-medium">({pkg.reviewsCount})</span>
                  </span>
                  
                  <span className="flex items-center gap-1">
                    <MapPin className="h-3.5 w-3.5 text-slate-400" />
                    {pkg.location}
                  </span>
                </div>

                {/* Price and Addon tag section */}
                <div className="flex items-center justify-between mt-auto">
                  <div>
                    <span className="block text-[10px] text-slate-400 font-bold uppercase tracking-wider">Starting Price</span>
                    <span className="text-xl font-extrabold text-emerald-900">
                      {formatPrice(pkg.price)}
                    </span>
                  </div>
                  
                  {pkg.addons && pkg.addons.length > 0 && (
                    <span className="inline-flex items-center gap-1 bg-amber-50 border border-amber-100 text-amber-800 text-[10px] font-extrabold px-2.5 py-1 rounded-full">
                      <CheckCircle2 className="h-3 w-3 text-amber-600" />
                      Add-ons Available
                    </span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}
