import React from "react";
import * as Icons from "lucide-react";

export default function CategoryGrid({ categories, onSelectCategory }) {
  
  // Dynamic icon retriever helper
  const getIcon = (iconName) => {
    const IconComponent = Icons[iconName];
    return IconComponent ? <IconComponent className="h-6 w-6" /> : <Icons.HelpCircle className="h-6 w-6" />;
  };

  return (
    <div className="py-16 px-4 lg:px-8 max-w-7xl mx-auto">
      {/* Section Title */}
      <div className="text-center md:text-left mb-10">
        <h2 className="text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
          Browse by Category
        </h2>
        <p className="text-slate-500 text-sm mt-1">
          Hand-picked curated professional event service providers in Sri Lanka.
        </p>
      </div>

      {/* Grid container */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4 lg:gap-6">
        {categories.map((cat) => (
          <div
            key={cat.id}
            onClick={() => onSelectCategory(cat.id)}
            className="group cursor-pointer relative overflow-hidden bg-white border border-slate-100 rounded-3xl p-6 shadow-sm hover:shadow-xl hover:border-emerald-600/30 hover:-translate-y-1 transition-all duration-300 flex flex-col items-center text-center select-none"
          >
            {/* Background Accent glow */}
            <div className="absolute inset-0 bg-gradient-to-b from-transparent to-slate-50/50 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
            
            {/* Overlay Category image thumbnail (with absolute positioning & blurred blend) */}
            <div className="absolute top-0 right-0 w-24 h-24 -mr-6 -mt-6 bg-emerald-500/5 rounded-full blur-2xl group-hover:bg-emerald-500/10 transition-all duration-300 pointer-events-none" />

            {/* Icon Container */}
            <div className="mb-4 bg-emerald-50 text-emerald-700 p-4 rounded-2xl group-hover:bg-emerald-950 group-hover:text-amber-400 shadow-sm transition-all duration-300">
              {getIcon(cat.icon)}
            </div>

            {/* Title & Count */}
            <h3 className="font-extrabold text-sm text-slate-800 tracking-tight group-hover:text-emerald-950">
              {cat.name}
            </h3>
            <span className="text-[11px] font-semibold text-slate-400 mt-1 bg-slate-100 px-2.5 py-0.5 rounded-full group-hover:bg-amber-100 group-hover:text-amber-800">
              {cat.count} Packages
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
