import React, { useState } from "react";
import { Star, MapPin, ChevronLeft, ChevronRight, Check, Sparkles, Calendar, PlusCircle, CheckCircle, ShieldAlert } from "lucide-react";

export default function PackageDetail({ pkg, onBackToExplorer, onNavigate }) {
  // Gallery Carousel State
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  // Customize Add-ons state
  const [selectedAddons, setSelectedAddons] = useState([]);
  
  // Date selection state
  const [selectedDate, setSelectedDate] = useState("");
  
  // Booking Modal State
  const [showBookingModal, setShowBookingModal] = useState(false);
  const [bookingConfirmed, setBookingConfirmed] = useState(false);

  // Price formatting helper
  const formatPrice = (price) => {
    return new Intl.NumberFormat("en-LK", {
      style: "currency",
      currency: "LKR",
      minimumFractionDigits: 0
    }).format(price).replace("LKR", "Rs.");
  };

  // Toggle addons
  const handleAddonToggle = (addon) => {
    if (selectedAddons.some(a => a.id === addon.id)) {
      setSelectedAddons(prev => prev.filter(a => a.id !== addon.id));
    } else {
      setSelectedAddons(prev => [...prev, addon]);
    }
  };

  // Calculate dynamic pricing
  const addonsTotal = selectedAddons.reduce((acc, curr) => acc + curr.price, 0);
  const grandTotal = pkg.price + addonsTotal;

  // Next & Prev Image Helpers
  const nextImage = () => {
    setActiveImageIndex(prev => (prev === pkg.images.length - 1 ? 0 : prev + 1));
  };
  const prevImage = () => {
    setActiveImageIndex(prev => (prev === 0 ? pkg.images.length - 1 : prev - 1));
  };

  // Visual Calendar Setup
  // Generate a mock list of 30 days representing next month (e.g. June 2026)
  const generateMockCalendarDays = () => {
    const days = [];
    const startDate = new Date(2026, 5, 1); // June 2026
    for (let i = 1; i <= 30; i++) {
      const dateString = `2026-06-${String(i).padStart(2, '0')}`;
      const isBooked = pkg.bookedDates.includes(dateString);
      days.push({
        dayNum: i,
        dateStr: dateString,
        isBooked,
        dayOfWeek: new Date(2026, 5, i).getDay() // 0 = Sun, 6 = Sat
      });
    }
    return days;
  };
  const calendarDays = generateMockCalendarDays();

  // Booking action handler
  const handleBookNowSubmit = (e) => {
    e.preventDefault();
    if (!selectedDate) return;
    setBookingConfirmed(true);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 lg:px-8 py-8">
      {/* Back button */}
      <button 
        onClick={onBackToExplorer}
        className="flex items-center gap-1.5 text-xs font-bold text-slate-500 hover:text-slate-800 bg-white border border-slate-200/50 hover:border-slate-300 px-4 py-2 rounded-full mb-6 shadow-sm select-none"
      >
        <ChevronLeft className="h-4 w-4" />
        Back to Explorer
      </button>

      {/* Grid Layout: Left Column Details & Gallery, Right Column Sticky Customize */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        
        {/* Left Side: Gallery Carousel + Package Description */}
        <div className="lg:col-span-2 flex flex-col gap-8">
          
          {/* Carousel Widget */}
          <div className="relative bg-slate-900 rounded-[32px] overflow-hidden aspect-[16/9] shadow-md group">
            <img 
              src={pkg.images[activeImageIndex]} 
              alt={`${pkg.title} scene`}
              className="object-cover w-full h-full opacity-90 transition-all duration-300"
            />
            
            {/* Dark overlay gradients */}
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-transparent to-transparent pointer-events-none" />

            {/* Left & Right navigation triggers */}
            <button 
              onClick={prevImage}
              className="absolute left-4 top-1/2 -translate-y-1/2 p-2.5 rounded-full bg-white/20 hover:bg-white/40 text-white backdrop-blur-md transition-all shadow opacity-0 group-hover:opacity-100"
            >
              <ChevronLeft className="h-5 w-5 stroke-[3]" />
            </button>
            <button 
              onClick={nextImage}
              className="absolute right-4 top-1/2 -translate-y-1/2 p-2.5 rounded-full bg-white/20 hover:bg-white/40 text-white backdrop-blur-md transition-all shadow opacity-0 group-hover:opacity-100"
            >
              <ChevronRight className="h-5 w-5 stroke-[3]" />
            </button>

            {/* Indicator Dots */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-1.5 z-10">
              {pkg.images.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setActiveImageIndex(index)}
                  className={`h-2 rounded-full transition-all ${index === activeImageIndex ? "w-6 bg-amber-400" : "w-2 bg-white/50"}`}
                />
              ))}
            </div>

            {/* Float category badge */}
            <span className="absolute bottom-4 left-4 bg-emerald-950/80 backdrop-blur-sm text-amber-400 text-[10px] font-extrabold uppercase tracking-widest px-3 py-1.5 rounded-full shadow-lg">
              {pkg.category.toUpperCase()}
            </span>
          </div>

          {/* Description & Metadata Header */}
          <div className="bg-white border border-slate-100 rounded-[32px] p-6 lg:p-8 shadow-sm">
            <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
              <span className="text-xs font-bold uppercase tracking-widest text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full flex items-center gap-1">
                <Sparkles className="h-3.5 w-3.5" />
                Verified Supplier
              </span>
              <div className="flex items-center gap-4 text-xs font-bold text-slate-500">
                <span className="flex items-center gap-1 text-amber-500">
                  <Star className="h-4 w-4 fill-amber-500" />
                  {pkg.vendorRating} <span className="text-slate-400 font-medium">({pkg.reviewsCount} reviews)</span>
                </span>
                <span className="flex items-center gap-1">
                  <MapPin className="h-4 w-4 text-slate-400" />
                  {pkg.location}
                </span>
              </div>
            </div>

            <h1 className="text-2xl lg:text-3.5xl font-extrabold text-slate-900 tracking-tight mb-4">
              {pkg.title}
            </h1>
            <p className="text-slate-600 text-sm font-semibold mb-6">
              by <span className="text-emerald-950 font-bold hover:underline cursor-pointer">{pkg.vendorName}</span>
            </p>

            <div className="border-t border-slate-50 pt-6">
              <h2 className="text-base font-extrabold text-slate-950 mb-3">Service Details</h2>
              <p className="text-slate-600 text-sm leading-relaxed mb-6 font-light">
                {pkg.description}
              </p>
            </div>

            {/* Checklist of What's Included */}
            <div className="border-t border-slate-50 pt-6">
              <h2 className="text-base font-extrabold text-slate-950 mb-4">What's Included in Base Package</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {pkg.includes.map((item, index) => (
                  <div key={index} className="flex items-start gap-2.5 text-xs text-slate-600 leading-normal">
                    <Check className="h-4.5 w-4.5 text-emerald-600 bg-emerald-50 p-0.5 rounded-full shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Interactive Date availability panel with visual calendar grid */}
          <div className="bg-white border border-slate-100 rounded-[32px] p-6 lg:p-8 shadow-sm">
            <h2 className="text-base font-extrabold text-slate-950 mb-1 flex items-center gap-2">
              <Calendar className="h-4 w-4 text-emerald-700" />
              Check Calendar & Booking Availability
            </h2>
            <p className="text-slate-400 text-xs font-semibold mb-6">
              Select an available green day in June 2026 to proceed with reservation.
            </p>

            <div className="max-w-md mx-auto bg-slate-50 border border-slate-100 rounded-3xl p-5">
              <div className="text-center font-bold text-sm text-slate-700 uppercase tracking-widest border-b border-slate-200/50 pb-3.5 mb-4">
                June 2026
              </div>

              {/* Day headers */}
              <div className="grid grid-cols-7 gap-1 text-center font-extrabold text-[10px] text-slate-400 uppercase tracking-wide mb-2">
                <span>Sun</span>
                <span>Mon</span>
                <span>Tue</span>
                <span>Wed</span>
                <span>Thu</span>
                <span>Fri</span>
                <span>Sat</span>
              </div>

              {/* Days grid */}
              <div className="grid grid-cols-7 gap-1">
                {/* Pad first week of June 2026 (Starts on a Monday = DayOfWeek = 1, so Sun=0 is empty) */}
                <div className="h-9 w-9 bg-transparent" />
                
                {calendarDays.map((day) => {
                  return (
                    <button
                      key={day.dayNum}
                      disabled={day.isBooked}
                      onClick={() => setSelectedDate(day.dateStr)}
                      className={`h-9 w-9 text-xs rounded-xl flex items-center justify-center font-bold transition-all relative ${
                        day.isBooked
                          ? "bg-rose-50 text-rose-300 cursor-not-allowed line-through"
                          : selectedDate === day.dateStr
                          ? "bg-emerald-950 text-amber-400 font-extrabold shadow-md scale-105"
                          : "bg-white hover:bg-emerald-50 text-slate-700 border border-slate-200/50 hover:border-emerald-600/30"
                      }`}
                    >
                      {day.dayNum}
                      {/* Fully Booked mini warning dots */}
                      {day.isBooked && (
                        <span className="absolute bottom-1 h-1 w-1 rounded-full bg-rose-400" />
                      )}
                    </button>
                  );
                })}
              </div>

              {/* Legend keys */}
              <div className="mt-5 pt-4 border-t border-slate-200/50 flex justify-center items-center gap-6 text-[10px] text-slate-500 font-bold">
                <div className="flex items-center gap-1.5">
                  <div className="h-3 w-3 bg-white border border-slate-200 rounded" />
                  <span>Available</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <div className="h-3 w-3 bg-rose-50 border border-rose-100 rounded line-through" />
                  <span>Booked</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <div className="h-3 w-3 bg-emerald-950 rounded" />
                  <span>Selected</span>
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* Right Side: Customize Add-ons & Live Order Checklist Card */}
        <div className="lg:sticky lg:top-24 flex flex-col gap-6">
          
          {/* Customise Your Package Panel */}
          <div className="bg-white border border-slate-100 rounded-[32px] p-6 shadow-sm flex flex-col gap-5">
            <h2 className="text-base font-extrabold text-slate-950 border-b border-slate-50 pb-3 flex items-center gap-2">
              <PlusCircle className="h-4.5 w-4.5 text-emerald-700" />
              Customise Your Package
            </h2>
            
            {/* Addons List */}
            <div className="flex flex-col gap-3">
              {pkg.addons.map((addon) => {
                const isSelected = selectedAddons.some(a => a.id === addon.id);
                return (
                  <button
                    key={addon.id}
                    onClick={() => handleAddonToggle(addon)}
                    className={`w-full text-left p-3.5 rounded-2xl border transition-all flex items-center justify-between select-none ${
                      isSelected 
                        ? "bg-emerald-50/50 border-emerald-600 text-emerald-950 font-bold" 
                        : "bg-slate-50 border-slate-200/50 text-slate-600 hover:bg-slate-100 hover:border-slate-300"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className={`h-5 w-5 rounded-md border flex items-center justify-center shrink-0 ${
                        isSelected ? "bg-emerald-600 border-emerald-600 text-white" : "border-slate-300 bg-white"
                      }`}>
                        {isSelected && <Check className="h-3.5 w-3.5 stroke-[3]" />}
                      </div>
                      <span className="text-xs font-semibold">{addon.name}</span>
                    </div>
                    <span className="text-xs font-extrabold text-slate-900">
                      +{formatPrice(addon.price)}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Live Order Receipt summary */}
            <div className="bg-slate-50 rounded-2xl p-4 border border-slate-100/50 flex flex-col gap-2.5">
              <div className="flex justify-between items-center text-xs font-bold text-slate-500">
                <span>Base Package</span>
                <span>{formatPrice(pkg.price)}</span>
              </div>
              
              {selectedAddons.map((addon) => (
                <div key={addon.id} className="flex justify-between items-center text-xs text-emerald-800 font-semibold animate-in slide-in-from-bottom-1 duration-150">
                  <span>+ {addon.name}</span>
                  <span>{formatPrice(addon.price)}</span>
                </div>
              ))}

              <div className="border-t border-slate-200/60 pt-3 mt-1 flex justify-between items-center text-slate-900">
                <span className="text-xs font-bold uppercase tracking-wider">Total Summary</span>
                <span className="text-lg font-extrabold text-emerald-950">
                  {formatPrice(grandTotal)}
                </span>
              </div>
            </div>

            {/* Booking CTA Button Trigger */}
            <button
              onClick={() => {
                if (!selectedDate) {
                  alert("Please choose an available event date from the calendar!");
                  return;
                }
                setShowBookingModal(true);
              }}
              className={`w-full font-extrabold uppercase text-xs tracking-wider py-4 rounded-2xl shadow-md transition-all ${
                selectedDate 
                  ? "bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-emerald-950 hover:shadow-amber-500/20 hover:-translate-y-0.5"
                  : "bg-slate-200 text-slate-400 cursor-not-allowed"
              }`}
            >
              {selectedDate ? `Reserve Date: ${selectedDate}` : "Select Date to Book"}
            </button>
            
            {!selectedDate && (
              <span className="text-[10px] text-center text-slate-400 font-bold block -mt-1 leading-normal">
                Choose a date in the calendar to unlock booking button.
              </span>
            )}
          </div>
        </div>

      </div>

      {/* Checkout Summary Modal Dialog */}
      {showBookingModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white border border-slate-100 rounded-[36px] shadow-2xl p-6 lg:p-8 max-w-md w-full relative animate-in zoom-in-95 duration-200">
            
            {/* Booking Confirmed State */}
            {bookingConfirmed ? (
              <div className="text-center py-6 flex flex-col items-center">
                <div className="bg-emerald-50 text-emerald-700 p-4 rounded-full mb-4 animate-bounce">
                  <CheckCircle className="h-12 w-12" />
                </div>
                <h3 className="text-xl font-extrabold text-slate-950 mb-2">Celebration Reserved!</h3>
                <p className="text-slate-500 text-xs leading-relaxed mb-6 max-w-xs mx-auto">
                  Your reservation request for <span className="text-emerald-900 font-bold">{pkg.title}</span> on <span className="text-slate-800 font-bold">{selectedDate}</span> has been sent successfully to <span className="text-slate-800 font-bold">{pkg.vendorName}</span>.
                </p>

                <div className="w-full bg-slate-50 border border-slate-100 rounded-3xl p-4 flex flex-col gap-2.5 mb-6 text-left">
                  <div className="flex justify-between items-center text-xs font-bold text-slate-400 uppercase">
                    <span>Reference ID</span>
                    <span>#UT-{Math.floor(100000 + Math.random() * 900000)}</span>
                  </div>
                  <div className="flex justify-between items-center text-xs text-slate-600 font-bold">
                    <span>Total Deposit Due</span>
                    <span className="text-emerald-800 font-extrabold">{formatPrice(grandTotal * 0.1)} (10%)</span>
                  </div>
                  <div className="flex justify-between items-center text-[10px] text-slate-400 font-semibold leading-normal">
                    <span>Vendor will call you at:</span>
                    <span>+94 77 123 4567</span>
                  </div>
                </div>

                <div className="flex items-center gap-3 w-full">
                  <button
                    onClick={() => {
                      setShowBookingModal(false);
                      setBookingConfirmed(false);
                      setSelectedDate("");
                      setSelectedAddons([]);
                      onBackToExplorer();
                    }}
                    className="w-full bg-emerald-950 text-amber-400 font-extrabold uppercase text-xs py-3.5 rounded-2xl shadow hover:scale-102 transition-all"
                  >
                    Explore More
                  </button>
                  
                  <button
                    onClick={() => {
                      setShowBookingModal(false);
                      setBookingConfirmed(false);
                      onNavigate("vendor-dashboard");
                    }}
                    className="w-full bg-slate-100 hover:bg-slate-200 text-slate-700 font-extrabold uppercase text-xs py-3.5 rounded-2xl transition-all"
                  >
                    View Vendor Hub
                  </button>
                </div>
              </div>
            ) : (
              // Order Summary Form
              <form onSubmit={handleBookNowSubmit} className="flex flex-col gap-5">
                <div className="flex justify-between items-center border-b border-slate-50 pb-3">
                  <span className="font-extrabold text-slate-900 text-base">Booking Summary</span>
                  <button 
                    type="button"
                    onClick={() => setShowBookingModal(false)}
                    className="text-slate-400 hover:text-slate-600 font-extrabold text-sm"
                  >
                    Close
                  </button>
                </div>

                <div className="flex flex-col gap-1.5">
                  <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Event Package</span>
                  <span className="text-sm font-extrabold text-emerald-900 leading-snug">{pkg.title}</span>
                  <span className="text-xs text-slate-500 font-semibold">by {pkg.vendorName}</span>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="flex flex-col gap-1">
                    <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Event Date</span>
                    <span className="text-xs font-bold text-slate-700 bg-slate-50 border border-slate-100 px-3 py-1.5 rounded-xl">{selectedDate}</span>
                  </div>
                  <div className="flex flex-col gap-1">
                    <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">District Location</span>
                    <span className="text-xs font-bold text-slate-700 bg-slate-50 border border-slate-100 px-3 py-1.5 rounded-xl">{pkg.location}</span>
                  </div>
                </div>

                {/* Billing Summary Receipt */}
                <div className="border-t border-slate-100 pt-4 flex flex-col gap-2.5">
                  <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Pricing Breakdown</span>
                  <div className="flex justify-between items-center text-xs font-semibold text-slate-600">
                    <span>Base package rate</span>
                    <span>{formatPrice(pkg.price)}</span>
                  </div>
                  
                  {selectedAddons.map((addon) => (
                    <div key={addon.id} className="flex justify-between items-center text-xs font-semibold text-emerald-800">
                      <span>+ {addon.name}</span>
                      <span>{formatPrice(addon.price)}</span>
                    </div>
                  ))}

                  <div className="border-t border-slate-100 pt-3 mt-1 flex justify-between items-center text-slate-900 font-extrabold text-sm">
                    <span>Grand Total</span>
                    <span className="text-emerald-950 text-base">{formatPrice(grandTotal)}</span>
                  </div>
                </div>

                {/* Trust alert */}
                <div className="bg-amber-50 border border-amber-100 p-3 rounded-2xl flex items-start gap-2.5 text-[10px] text-amber-800 leading-normal font-medium">
                  <ShieldAlert className="h-4.5 w-4.5 text-amber-600 shrink-0 mt-0.5" />
                  <span>
                    No immediate payment is charged. The vendor will contact you within 2 hours to align on details and finalize deposit arrangements.
                  </span>
                </div>

                {/* Checkout CTA */}
                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-emerald-800 to-emerald-900 hover:from-emerald-900 hover:to-emerald-950 text-white font-extrabold uppercase text-xs py-4 rounded-2xl shadow-lg hover:shadow-emerald-950/15"
                >
                  Confirm Reservation Request
                </button>
              </form>
            )}

          </div>
        </div>
      )}

    </div>
  );
}
