import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Calendar,
  Check,
  ChevronLeft,
  ChevronRight,
  MapPin,
  PlusCircle,
  ShoppingCart,
  Sparkles,
  Star,
} from "lucide-react";

export default function PackageDetail({
  pkg,
  onBackToExplorer,
  onNavigate,
  onAddToCart,
  currentUser,
}) {
  const navigate = useNavigate();
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [selectedAddons, setSelectedAddons] = useState([]);
  const [selectedDate, setSelectedDate] = useState("");
  const [addedToCart, setAddedToCart] = useState(false);

  const formatPrice = (price) => {
    return new Intl.NumberFormat("en-LK", {
      style: "currency",
      currency: "LKR",
      minimumFractionDigits: 0,
    })
      .format(price)
      .replace("LKR", "Rs.");
  };

  const handleAddonToggle = (addon) => {
    if (selectedAddons.some((a) => a.id === addon.id)) {
      setSelectedAddons((prev) => prev.filter((a) => a.id !== addon.id));
    } else {
      setSelectedAddons((prev) => [...prev, addon]);
    }
  };

  const addonsTotal = selectedAddons.reduce((acc, curr) => acc + curr.price, 0);
  const grandTotal = pkg.price + addonsTotal;

  const nextImage = () => {
    setActiveImageIndex((prev) =>
      prev === pkg.images.length - 1 ? 0 : prev + 1,
    );
  };

  const prevImage = () => {
    setActiveImageIndex((prev) =>
      prev === 0 ? pkg.images.length - 1 : prev - 1,
    );
  };

  const generateMockCalendarDays = () => {
    const days = [];
    for (let i = 1; i <= 30; i++) {
      const dateString = `2026-06-${String(i).padStart(2, "0")}`;
      const isBooked = pkg.bookedDates.includes(dateString);
      days.push({
        dayNum: i,
        dateStr: dateString,
        isBooked,
      });
    }
    return days;
  };

  const calendarDays = generateMockCalendarDays();

  const handleAddToMasterCart = () => {
    if (!currentUser) {
      const currentPackage = {
        packageId: pkg.id,
        title: pkg.title,
        price: pkg.price,
        selectedAddons,
        vendorName: pkg.vendorName,
        vendorId: pkg.vendorId,
        redirectTo: "cart",
      };

      sessionStorage.setItem(
        "redirect_package",
        JSON.stringify(currentPackage),
      );
      sessionStorage.setItem(
        "login_notice",
        "Please login to add this package to your cart and proceed.",
      );
      navigate("/login");
      return;
    }

    onAddToCart({
      packageId: pkg.id,
      title: pkg.title,
      price: pkg.price,
      selectedAddOns: selectedAddons,
      vendorName: pkg.vendorName,
      vendorId: pkg.vendorId,
    });

    setAddedToCart(true);
    setTimeout(() => setAddedToCart(false), 1200);
  };

  const handleBookNow = () => {
    if (!currentUser) {
      const currentPackage = {
        packageId: pkg.id,
        title: pkg.title,
        price: pkg.price,
        selectedAddons,
        vendorName: pkg.vendorName,
        vendorId: pkg.vendorId,
        redirectTo: "cart",
      };

      sessionStorage.setItem(
        "redirect_package",
        JSON.stringify(currentPackage),
      );
      sessionStorage.setItem(
        "login_notice",
        "Please login to add this package to your cart and proceed.",
      );
      navigate("/login");
      return;
    }

    onAddToCart({
      packageId: pkg.id,
      title: pkg.title,
      price: pkg.price,
      selectedAddOns,
      vendorName: pkg.vendorName,
      vendorId: pkg.vendorId,
    });

    onNavigate("cart");
  };

  return (
    <div className="max-w-7xl mx-auto px-4 lg:px-8 py-8">
      <button
        onClick={onBackToExplorer}
        className="flex items-center gap-1.5 text-xs font-bold text-slate-500 hover:text-slate-800 bg-white border border-slate-200/50 hover:border-slate-300 px-4 py-2 rounded-full mb-6 shadow-sm select-none"
      >
        <ChevronLeft className="h-4 w-4" />
        Back to Explorer
      </button>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        <div className="lg:col-span-2 flex flex-col gap-8">
          <div className="relative bg-slate-900 rounded-[32px] overflow-hidden aspect-[16/9] shadow-md group">
            <img
              src={pkg.images[activeImageIndex]}
              alt={`${pkg.title} scene`}
              className="object-cover w-full h-full opacity-90 transition-all duration-300"
            />

            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-transparent to-transparent pointer-events-none" />

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

            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-1.5 z-10">
              {pkg.images.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setActiveImageIndex(index)}
                  className={`h-2 rounded-full transition-all ${index === activeImageIndex ? "w-6 bg-amber-400" : "w-2 bg-white/50"}`}
                />
              ))}
            </div>

            <span className="absolute bottom-4 left-4 bg-emerald-950/80 backdrop-blur-sm text-amber-400 text-[10px] font-extrabold uppercase tracking-widest px-3 py-1.5 rounded-full shadow-lg">
              {pkg.category.toUpperCase()}
            </span>
          </div>

          <div className="bg-white border border-slate-100 rounded-[32px] p-6 lg:p-8 shadow-sm">
            <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
              <span className="text-xs font-bold uppercase tracking-widest text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full flex items-center gap-1">
                <Sparkles className="h-3.5 w-3.5" />
                Verified Supplier
              </span>
              <div className="flex items-center gap-4 text-xs font-bold text-slate-500">
                <span className="flex items-center gap-1 text-amber-500">
                  <Star className="h-4 w-4 fill-amber-500" />
                  {pkg.vendorRating}{" "}
                  <span className="text-slate-400 font-medium">
                    ({pkg.reviewsCount} reviews)
                  </span>
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
              by{" "}
              <span className="text-emerald-950 font-bold">
                {pkg.vendorName}
              </span>
            </p>

            <div className="border-t border-slate-50 pt-6">
              <h2 className="text-base font-extrabold text-slate-950 mb-3">
                Service Details
              </h2>
              <p className="text-slate-600 text-sm leading-relaxed mb-6 font-light">
                {pkg.description}
              </p>
            </div>

            <div className="border-t border-slate-50 pt-6">
              <h2 className="text-base font-extrabold text-slate-950 mb-4">
                What's Included in Base Package
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {pkg.includes.map((item, index) => (
                  <div
                    key={index}
                    className="flex items-start gap-2.5 text-xs text-slate-600 leading-normal"
                  >
                    <Check className="h-4.5 w-4.5 text-emerald-600 bg-emerald-50 p-0.5 rounded-full shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="bg-white border border-slate-100 rounded-[32px] p-6 lg:p-8 shadow-sm">
            <h2 className="text-base font-extrabold text-slate-950 mb-1 flex items-center gap-2">
              <Calendar className="h-4 w-4 text-emerald-700" />
              Check Calendar & Booking Availability
            </h2>
            <p className="text-slate-400 text-xs font-semibold mb-6">
              Optional demo-only event date selection for the booking
              experience.
            </p>

            <div className="max-w-md mx-auto bg-slate-50 border border-slate-100 rounded-3xl p-5">
              <div className="text-center font-bold text-sm text-slate-700 uppercase tracking-widest border-b border-slate-200/50 pb-3.5 mb-4">
                June 2026
              </div>

              <div className="grid grid-cols-7 gap-1 text-center font-extrabold text-[10px] text-slate-400 uppercase tracking-wide mb-2">
                <span>Sun</span>
                <span>Mon</span>
                <span>Tue</span>
                <span>Wed</span>
                <span>Thu</span>
                <span>Fri</span>
                <span>Sat</span>
              </div>

              <div className="grid grid-cols-7 gap-1">
                <div className="h-9 w-9 bg-transparent" />

                {calendarDays.map((day) => (
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
                    {day.isBooked && (
                      <span className="absolute bottom-1 h-1 w-1 rounded-full bg-rose-400" />
                    )}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="lg:sticky lg:top-24 flex flex-col gap-6">
          <div className="bg-white border border-slate-100 rounded-[32px] p-6 shadow-sm flex flex-col gap-5">
            <h2 className="text-base font-extrabold text-slate-950 border-b border-slate-50 pb-3 flex items-center gap-2">
              <PlusCircle className="h-4.5 w-4.5 text-emerald-700" />
              Customise Your Package
            </h2>

            <div className="flex flex-col gap-3">
              {pkg.addons.map((addon) => {
                const isSelected = selectedAddons.some(
                  (a) => a.id === addon.id,
                );
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
                      <div
                        className={`h-5 w-5 rounded-md border flex items-center justify-center shrink-0 ${
                          isSelected
                            ? "bg-emerald-600 border-emerald-600 text-white"
                            : "border-slate-300 bg-white"
                        }`}
                      >
                        {isSelected && (
                          <Check className="h-3.5 w-3.5 stroke-[3]" />
                        )}
                      </div>
                      <span className="text-xs font-semibold">
                        {addon.name}
                      </span>
                    </div>
                    <span className="text-xs font-extrabold text-slate-900">
                      +{formatPrice(addon.price)}
                    </span>
                  </button>
                );
              })}
            </div>

            <div className="bg-slate-50 rounded-2xl p-4 border border-slate-100/50 flex flex-col gap-2.5">
              <div className="flex justify-between items-center text-xs font-bold text-slate-500">
                <span>Base Package</span>
                <span>{formatPrice(pkg.price)}</span>
              </div>

              {selectedAddons.map((addon) => (
                <div
                  key={addon.id}
                  className="flex justify-between items-center text-xs text-emerald-800 font-semibold"
                >
                  <span>+ {addon.name}</span>
                  <span>{formatPrice(addon.price)}</span>
                </div>
              ))}

              <div className="border-t border-slate-200/60 pt-3 mt-1 flex justify-between items-center text-slate-900">
                <span className="text-xs font-bold uppercase tracking-wider">
                  Total Summary
                </span>
                <span className="text-lg font-extrabold text-emerald-950">
                  {formatPrice(grandTotal)}
                </span>
              </div>
            </div>

            <button
              onClick={handleAddToMasterCart}
              className="w-full font-extrabold uppercase text-xs tracking-wider py-4 rounded-2xl shadow-md transition-all bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-emerald-950 hover:-translate-y-0.5"
            >
              {addedToCart ? "Added to Master Cart" : "Add to Master Cart"}
            </button>

            <button
              onClick={handleBookNow}
              className="w-full font-extrabold uppercase text-xs tracking-wider py-3.5 rounded-2xl transition-all bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 flex items-center justify-center gap-2"
            >
              Book Now
            </button>

            <button
              onClick={() => onNavigate("cart")}
              className="w-full font-extrabold uppercase text-xs tracking-wider py-3.5 rounded-2xl transition-all bg-emerald-900 text-amber-300 flex items-center justify-center gap-2"
            >
              <ShoppingCart className="h-4 w-4" />
              Open Cart & Checkout
            </button>

            {selectedDate && (
              <span className="text-[11px] text-slate-500 font-semibold text-center">
                Selected date: {selectedDate}
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
