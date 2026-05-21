import React, { useState } from "react";
import { Sparkles, DollarSign, Calendar, Star, Bell, Plus, PlusCircle, Check, Trash2, X, ClipboardList, Info } from "lucide-react";

export default function VendorDashboard({ 
  packages, 
  onAddPackage, 
  categories,
  districts,
  bookings = [],
  onUpdateBookingStatus
}) {
  // New Package Form States
  const [showAddForm, setShowAddForm] = useState(false);
  const [newTitle, setNewTitle] = useState("");
  const [newCategory, setNewCategory] = useState("sounds");
  const [newLocation, setNewLocation] = useState("Colombo");
  const [newPrice, setNewPrice] = useState("");
  const [newDesc, setNewDesc] = useState("");
  const [newAddons, setNewAddons] = useState([
    { name: "Extra Speaker Unit", price: 10000 },
    { name: "Smoke Effect Machine", price: 8000 }
  ]);

  // Form helpers
  const [addonNameInput, setAddonNameInput] = useState("");
  const [addonPriceInput, setAddonPriceInput] = useState("");

  const handleAddAddonTemp = () => {
    if (!addonNameInput || !addonPriceInput) return;
    setNewAddons(prev => [...prev, { name: addonNameInput, price: Number(addonPriceInput) }]);
    setAddonNameInput("");
    setAddonPriceInput("");
  };

  const handleRemoveAddonTemp = (index) => {
    setNewAddons(prev => prev.filter((_, i) => i !== index));
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (!newTitle || !newPrice || !newDesc) {
      alert("Please fill in all required fields!");
      return;
    }

    const createdPkg = {
      id: `pkg-${Date.now()}`,
      title: newTitle,
      vendorName: "Lanka Sounds & Entertainment", // Fixed vendor name for demo
      vendorRating: 5.0,
      reviewsCount: 1,
      category: newCategory,
      location: newLocation,
      price: Number(newPrice),
      images: [
        "https://images.unsplash.com/photo-1540039155733-5bb30b53aa14?auto=format&fit=crop&q=80&w=800",
        "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?auto=format&fit=crop&q=80&w=800"
      ],
      badge: "New Release",
      description: newDesc,
      includes: [
        "Standard Sound Console Setup",
        "All wiring, cabling & technicians included",
        "Prompt delivery and retrieval"
      ],
      addons: newAddons.map((ad, i) => ({ id: `add-new-${i}-${Date.now()}`, name: ad.name, price: ad.price })),
      bookedDates: []
    };

    onAddPackage(createdPkg);
    
    // Reset Form
    setNewTitle("");
    setNewPrice("");
    setNewDesc("");
    setNewAddons([
      { name: "Extra Speaker Unit", price: 10000 },
      { name: "Smoke Effect Machine", price: 8000 }
    ]);
    setShowAddForm(false);
    alert("New Event Package added successfully to the marketplace catalog!");
  };

  // Price formatting helper
  const formatPrice = (price) => {
    return new Intl.NumberFormat("en-LK", {
      style: "currency",
      currency: "LKR",
      minimumFractionDigits: 0
    }).format(price).replace("LKR", "Rs.");
  };

  // Vendor bookings and calculations
  const totalEarnings = bookings
    .filter(b => b.status === "Confirmed" || b.status === "Completed")
    .reduce((acc, curr) => acc + curr.totalPrice, 0);

  return (
    <div className="max-w-7xl mx-auto px-4 lg:px-8 py-8">
      {/* Dashboard title banner */}
      <div className="mb-8 flex flex-col md:flex-row md:items-center md:justify-between gap-4 border-b border-slate-100 pb-6">
        <div>
          <span className="text-xs font-bold text-slate-400 uppercase tracking-widest flex items-center gap-1">
            Vendor Console <span className="h-1 w-1 bg-emerald-500 rounded-full" /> Lanka Sounds & Entertainment
          </span>
          <h1 className="text-2xl md:text-4xl font-extrabold text-slate-900 tracking-tight mt-1">
            Vendor Dashboard
          </h1>
          <p className="text-slate-500 text-sm mt-1">
            Manage your services, track event bookings, and view earnings in real-time.
          </p>
        </div>

        {/* Add package quick trigger button */}
        <button
          onClick={() => setShowAddForm(true)}
          className="flex items-center gap-2 bg-emerald-950 hover:bg-emerald-900 text-amber-400 font-extrabold text-xs uppercase px-5 py-3 rounded-2xl shadow-lg transition-transform hover:scale-102 select-none"
        >
          <Plus className="h-4 w-4 stroke-[3]" />
          Create Event Package
        </button>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-10">
        
        {/* Earnings Card */}
        <div className="bg-white border border-slate-100 p-6 rounded-3xl shadow-sm flex items-center justify-between">
          <div className="flex flex-col gap-1">
            <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Gross Earnings</span>
            <span className="text-xl lg:text-2xl font-extrabold text-emerald-950">
              {formatPrice(totalEarnings + 380000)} {/* Added 380k to mock some initial completed jobs */}
            </span>
            <span className="text-[9px] text-emerald-600 font-semibold flex items-center gap-0.5">
              +15% from last month
            </span>
          </div>
          <div className="bg-emerald-50 text-emerald-700 p-4 rounded-2xl">
            <DollarSign className="h-6 w-6" />
          </div>
        </div>

        {/* Active Bookings Card */}
        <div className="bg-white border border-slate-100 p-6 rounded-3xl shadow-sm flex items-center justify-between">
          <div className="flex flex-col gap-1">
            <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Active Bookings</span>
            <span className="text-xl lg:text-2xl font-extrabold text-slate-900">
              {bookings.filter(b => b.status === "Confirmed").length + 2}
            </span>
            <span className="text-[9px] text-slate-400 font-semibold">
              Next gig: tomorrow in Colombo
            </span>
          </div>
          <div className="bg-amber-50 text-amber-700 p-4 rounded-2xl">
            <Calendar className="h-6 w-6" />
          </div>
        </div>

        {/* Pending Requests Card */}
        <div className="bg-white border border-slate-100 p-6 rounded-3xl shadow-sm flex items-center justify-between">
          <div className="flex flex-col gap-1">
            <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Pending Approvals</span>
            <span className="text-xl lg:text-2xl font-extrabold text-rose-600">
              {bookings.filter(b => b.status === "Pending Review").length}
            </span>
            <span className="text-[9px] text-rose-500 font-bold flex items-center gap-0.5">
              Requires immediate action
            </span>
          </div>
          <div className="bg-rose-50 text-rose-700 p-4 rounded-2xl">
            <ClipboardList className="h-6 w-6" />
          </div>
        </div>

        {/* Trust score rating card */}
        <div className="bg-white border border-slate-100 p-6 rounded-3xl shadow-sm flex items-center justify-between">
          <div className="flex flex-col gap-1">
            <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Vendor Trust Score</span>
            <span className="text-xl lg:text-2xl font-extrabold text-slate-900 flex items-center gap-1.5">
              4.9 <Star className="h-4.5 w-4.5 fill-amber-500 text-amber-500" />
            </span>
            <span className="text-[9px] text-slate-400 font-semibold">
              Based on 88 customer reviews
            </span>
          </div>
          <div className="bg-slate-50 text-slate-700 p-4 rounded-2xl">
            <Sparkles className="h-6 w-6 text-amber-500" />
          </div>
        </div>

      </div>

      {/* Main Grid: Left Column Booking Orders, Right Column Active Listings Catalog */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Booking Orders & Customer Requests Queue */}
        <div className="lg:col-span-2 bg-white border border-slate-100 rounded-3xl p-6 shadow-sm flex flex-col gap-5">
          <div className="border-b border-slate-50 pb-3 flex justify-between items-center">
            <span className="font-extrabold text-slate-950 text-base flex items-center gap-2">
              <ClipboardList className="h-4.5 w-4.5 text-emerald-700" />
              Customer Reservation Requests
            </span>
            <span className="text-[10px] bg-slate-100 text-slate-600 font-extrabold px-2.5 py-1 rounded-full">
              {bookings.length} Total orders
            </span>
          </div>

          {/* Bookings items map */}
          <div className="flex flex-col gap-4">
            {bookings.map((booking) => (
              <div 
                key={booking.id}
                className="border border-slate-100 bg-slate-50/50 p-5 rounded-2xl flex flex-col md:flex-row justify-between gap-4"
              >
                <div className="flex flex-col gap-1">
                  <div className="flex items-center gap-2.5 mb-1 flex-wrap">
                    <span className="text-xs font-extrabold text-slate-900 leading-snug">{booking.customerName}</span>
                    <span className={`text-[9px] font-extrabold px-2 py-0.5 rounded-full ${
                      booking.status === "Confirmed" 
                        ? "bg-emerald-50 text-emerald-700 border border-emerald-100" 
                        : "bg-rose-50 text-rose-700 border border-rose-100"
                    }`}>
                      {booking.status}
                    </span>
                  </div>
                  
                  <span className="text-xs font-semibold text-slate-700 leading-snug">
                    {booking.pkgTitle}
                  </span>
                  
                  {booking.addons.length > 0 && (
                    <span className="text-[10px] text-emerald-800 font-medium">
                      + Add-ons: {booking.addons.join(", ")}
                    </span>
                  )}

                  <div className="flex items-center gap-4 text-[10px] font-bold text-slate-400 mt-2">
                    <span>Date: {booking.date}</span>
                    <span>Location: {booking.location}</span>
                  </div>
                </div>

                <div className="flex flex-col md:items-end justify-between gap-2 shrink-0">
                  <span className="text-base font-extrabold text-slate-950">
                    {formatPrice(booking.totalPrice)}
                  </span>

                  {/* Actions buttons */}
                  {booking.status === "Pending Review" && (
                    <div className="flex items-center gap-2 mt-1">
                      <button
                        onClick={() => onUpdateBookingStatus(booking.id, "Confirmed")}
                        className="bg-emerald-950 hover:bg-emerald-900 text-amber-400 font-bold text-[10px] px-3.5 py-1.5 rounded-xl uppercase shadow flex items-center gap-1"
                      >
                        <Check className="h-3 w-3 stroke-[3]" />
                        Confirm
                      </button>
                      <button
                        onClick={() => onUpdateBookingStatus(booking.id, "Declined")}
                        className="bg-white hover:bg-slate-100 text-slate-500 border border-slate-200 font-bold text-[10px] px-3 py-1.5 rounded-xl uppercase"
                      >
                        Decline
                      </button>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Active Listings Catalog Column */}
        <div className="bg-white border border-slate-100 rounded-3xl p-6 shadow-sm flex flex-col gap-4">
          <span className="font-extrabold text-slate-950 text-base border-b border-slate-50 pb-3 flex items-center gap-2">
            <ClipboardList className="h-4.5 w-4.5 text-emerald-700" />
            Your Live Catalog ({packages.filter(p => p.vendorName === "Lanka Sounds & Entertainment").length})
          </span>

          <div className="flex flex-col gap-4 max-h-[420px] overflow-y-auto pr-1">
            {packages
              .filter(p => p.vendorName === "Lanka Sounds & Entertainment")
              .map((pkg) => (
                <div key={pkg.id} className="flex gap-3 border-b border-slate-50 pb-3 last:border-0 last:pb-0">
                  <img
                    src={pkg.images[0]}
                    alt={pkg.title}
                    className="h-14 w-14 rounded-xl object-cover bg-slate-100 shrink-0"
                  />
                  <div className="flex flex-col justify-center flex-1">
                    <h4 className="font-extrabold text-xs text-slate-900 leading-snug line-clamp-1">{pkg.title}</h4>
                    <span className="text-[10px] font-extrabold text-emerald-900 mt-1">{formatPrice(pkg.price)}</span>
                    <span className="text-[9px] font-semibold text-slate-400 uppercase mt-0.5">{pkg.location}</span>
                  </div>
                </div>
              ))}
          </div>
        </div>

      </div>

      {/* Floating Add Package Form Overlay Modal Dialogue */}
      {showAddForm && (
        <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white border border-slate-100 rounded-[36px] shadow-2xl p-6 lg:p-8 max-w-xl w-full relative animate-in zoom-in-95 duration-200 max-h-[90vh] overflow-y-auto">
            
            <div className="flex justify-between items-center border-b border-slate-50 pb-3 mb-5">
              <span className="font-extrabold text-slate-900 text-lg flex items-center gap-2">
                <PlusCircle className="h-5 w-5 text-emerald-700" />
                Create New Event Package
              </span>
              <button 
                onClick={() => setShowAddForm(false)}
                className="text-slate-400 hover:text-slate-600 font-extrabold text-sm"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <form onSubmit={handleFormSubmit} className="flex flex-col gap-4">
              {/* Title */}
              <div className="flex flex-col gap-1">
                <label className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Package Title *</label>
                <input
                  type="text"
                  placeholder="e.g. Premium VIP Sound Rig & Stage"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  className="bg-slate-50 border border-slate-200/80 rounded-2xl px-4 py-3 text-sm focus:outline-none focus:border-emerald-600 focus:bg-white text-slate-800"
                  required
                />
              </div>

              {/* Grid: Category, Location, Base Price */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="flex flex-col gap-1">
                  <label className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Category</label>
                  <select
                    value={newCategory}
                    onChange={(e) => setNewCategory(e.target.value)}
                    className="bg-slate-50 border border-slate-200/80 rounded-2xl px-4 py-3 text-sm focus:outline-none focus:border-emerald-600 focus:bg-white text-slate-800"
                  >
                    {categories.map((c) => (
                      <option key={c.id} value={c.id}>{c.name}</option>
                    ))}
                  </select>
                </div>

                <div className="flex flex-col gap-1">
                  <label className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">District</label>
                  <select
                    value={newLocation}
                    onChange={(e) => setNewLocation(e.target.value)}
                    className="bg-slate-50 border border-slate-200/80 rounded-2xl px-4 py-3 text-sm focus:outline-none focus:border-emerald-600 focus:bg-white text-slate-800"
                  >
                    {districts.map((d) => (
                      <option key={d} value={d}>{d}</option>
                    ))}
                  </select>
                </div>

                <div className="flex flex-col gap-1">
                  <label className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Base Price (LKR) *</label>
                  <input
                    type="number"
                    placeholder="e.g. 185000"
                    value={newPrice}
                    onChange={(e) => setNewPrice(e.target.value)}
                    className="bg-slate-50 border border-slate-200/80 rounded-2xl px-4 py-3 text-sm focus:outline-none focus:border-emerald-600 focus:bg-white text-slate-800 font-semibold"
                    required
                  />
                </div>
              </div>

              {/* Description */}
              <div className="flex flex-col gap-1">
                <label className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Detailed Description *</label>
                <textarea
                  rows="3"
                  placeholder="Describe what's included, equipment details, time limit, and service constraints..."
                  value={newDesc}
                  onChange={(e) => setNewDesc(e.target.value)}
                  className="bg-slate-50 border border-slate-200/80 rounded-2xl px-4 py-3 text-sm focus:outline-none focus:border-emerald-600 focus:bg-white text-slate-800"
                  required
                />
              </div>

              {/* Customize Add-ons Creator inside Form */}
              <div className="border-t border-slate-100 pt-4 flex flex-col gap-3">
                <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Add Custom Add-ons</span>
                
                {/* Temp Addon input form */}
                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    placeholder="Add-on Name (e.g. Laser Lights)"
                    value={addonNameInput}
                    onChange={(e) => setAddonNameInput(e.target.value)}
                    className="w-2/3 bg-slate-50 border border-slate-200/80 rounded-xl px-3 py-2 text-xs focus:outline-none text-slate-800"
                  />
                  <input
                    type="number"
                    placeholder="Price (LKR)"
                    value={addonPriceInput}
                    onChange={(e) => setAddonPriceInput(e.target.value)}
                    className="w-1/3 bg-slate-50 border border-slate-200/80 rounded-xl px-3 py-2 text-xs focus:outline-none text-slate-800 font-semibold"
                  />
                  <button
                    type="button"
                    onClick={handleAddAddonTemp}
                    className="bg-emerald-950 text-amber-400 p-2 rounded-xl"
                  >
                    <Plus className="h-4 w-4 stroke-[3]" />
                  </button>
                </div>

                {/* Addon temp cards */}
                <div className="flex flex-wrap gap-2 mt-1">
                  {newAddons.map((ad, index) => (
                    <div 
                      key={index}
                      className="bg-slate-50 border border-slate-200/50 px-3 py-1.5 rounded-full flex items-center gap-2 text-xs text-slate-600 font-semibold shadow-sm animate-in zoom-in-95"
                    >
                      <span>{ad.name} (+{formatPrice(ad.price)})</span>
                      <button 
                        type="button" 
                        onClick={() => handleRemoveAddonTemp(index)}
                        className="text-rose-500 hover:text-rose-700"
                      >
                        <Trash2 className="h-3.5 w-3.5" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {/* Submit CTA */}
              <button
                type="submit"
                className="w-full bg-gradient-to-r from-emerald-800 to-emerald-900 text-white font-extrabold uppercase text-xs py-4 rounded-2xl shadow-lg hover:shadow-emerald-900/20 mt-4"
              >
                Publish Event Package Catalog
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
