import React from "react";
import {
  ArrowLeft,
  CircleX,
  Package2,
  ShoppingCart,
  Sparkles,
  Store,
  WalletCards,
} from "lucide-react";
import { useCart } from "../context/CartContext";

const formatPrice = (price) =>
  new Intl.NumberFormat("en-LK", {
    style: "currency",
    currency: "LKR",
    minimumFractionDigits: 0,
  })
    .format(price)
    .replace("LKR", "Rs.");

export default function CartView({ onBack, onProceed }) {
  const {
    cartItems,
    groupedByVendor,
    removeFromCart,
    subtotal,
    addonsTotal,
    masterTotal,
  } = useCart();
  const vendors = Object.values(groupedByVendor);

  if (cartItems.length === 0) {
    return (
      <div className="max-w-5xl mx-auto px-4 lg:px-8 py-10">
        <div className="rounded-[36px] bg-white border border-slate-100 p-8 lg:p-12 shadow-sm text-center">
          <div className="mx-auto h-20 w-20 rounded-full bg-slate-100 text-slate-400 flex items-center justify-center mb-5">
            <ShoppingCart className="h-10 w-10" />
          </div>
          <h1 className="text-2xl font-black text-slate-900 tracking-tight mb-2">
            Your Master Cart Is Empty
          </h1>
          <p className="text-sm text-slate-500 max-w-md mx-auto mb-8">
            Start by adding services from different Sri Lankan vendors. You can
            complete all payments in one secure checkout.
          </p>
          <button
            onClick={onBack}
            className="inline-flex items-center gap-2 px-5 py-3 rounded-2xl bg-emerald-900 text-amber-300 font-extrabold text-xs uppercase tracking-wider"
          >
            <ArrowLeft className="h-4 w-4" />
            Continue Exploring
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 lg:px-8 py-8">
      <div className="flex items-center justify-between gap-4 mb-7">
        <button
          onClick={onBack}
          className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full border border-slate-200 bg-white text-xs font-bold text-slate-600 hover:text-slate-900"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Marketplace
        </button>

        <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-slate-100 text-xs font-extrabold text-slate-700 uppercase tracking-wider">
          <Package2 className="h-3.5 w-3.5 text-emerald-700" />
          {cartItems.length} Services Selected
        </span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        <section className="lg:col-span-2 rounded-[32px] border border-slate-100 bg-white p-6 lg:p-8 shadow-sm">
          <h1 className="text-2xl lg:text-3xl font-black text-slate-900 tracking-tight mb-2 flex items-center gap-2">
            <ShoppingCart className="h-7 w-7 text-emerald-800" />
            Multi-Vendor Cart
          </h1>
          <p className="text-xs lg:text-sm text-slate-500 mb-7">
            Review your services grouped by vendor before moving to one master
            checkout.
          </p>

          <div className="space-y-6">
            {vendors.map((vendor) => (
              <div
                key={vendor.vendorId}
                className="rounded-2xl border border-slate-200/70 overflow-hidden"
              >
                <div className="px-4 py-3 bg-slate-50 border-b border-slate-200/70 flex items-center justify-between gap-3">
                  <span className="text-xs lg:text-sm font-extrabold text-slate-700 uppercase tracking-wider flex items-center gap-1.5">
                    <Store className="h-3.5 w-3.5 text-emerald-700" />
                    Services from: {vendor.vendorName}
                  </span>
                  <span className="text-[11px] font-bold text-slate-400">
                    Vendor ID: {vendor.vendorId}
                  </span>
                </div>

                <div className="divide-y divide-slate-100">
                  {vendor.items.map((item) => {
                    const addOnTotal = item.selectedAddOns.reduce(
                      (sum, addOn) => sum + addOn.price,
                      0,
                    );

                    return (
                      <div key={item.itemId} className="p-4 lg:p-5">
                        <div className="flex items-start justify-between gap-4">
                          <div>
                            <h3 className="text-sm lg:text-base font-extrabold text-slate-900">
                              {item.title}
                            </h3>
                            <p className="text-xs text-slate-500 mt-1">
                              Base Price:{" "}
                              <span className="font-bold text-slate-700">
                                {formatPrice(item.price)}
                              </span>
                            </p>

                            {item.selectedAddOns.length > 0 ? (
                              <ul className="mt-3 space-y-1.5">
                                {item.selectedAddOns.map((addOn) => (
                                  <li
                                    key={addOn.id}
                                    className="text-xs text-emerald-800 font-semibold flex items-center justify-between gap-3"
                                  >
                                    <span>+ {addOn.name}</span>
                                    <span>{formatPrice(addOn.price)}</span>
                                  </li>
                                ))}
                              </ul>
                            ) : (
                              <p className="mt-3 text-xs text-slate-400">
                                No add-ons selected.
                              </p>
                            )}
                          </div>

                          <div className="text-right">
                            <p className="text-sm font-black text-emerald-900">
                              {formatPrice(item.price + addOnTotal)}
                            </p>
                            <button
                              onClick={() => removeFromCart(item.itemId)}
                              className="mt-3 inline-flex items-center gap-1 text-xs font-bold text-rose-600 hover:text-rose-700"
                            >
                              <CircleX className="h-3.5 w-3.5" />
                              Remove
                            </button>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </section>

        <aside className="lg:sticky lg:top-24 rounded-[32px] border border-emerald-100 bg-gradient-to-b from-white to-emerald-50/40 p-6 shadow-sm">
          <h2 className="text-lg font-black text-slate-900 tracking-tight mb-4 flex items-center gap-2">
            <WalletCards className="h-5 w-5 text-emerald-700" />
            Order Summary
          </h2>

          <div className="space-y-2.5 text-sm">
            <div className="flex items-center justify-between text-slate-600 font-semibold">
              <span>Base Packages</span>
              <span>{formatPrice(subtotal)}</span>
            </div>
            <div className="flex items-center justify-between text-slate-600 font-semibold">
              <span>Selected Add-ons</span>
              <span>{formatPrice(addonsTotal)}</span>
            </div>
            <div className="border-t border-emerald-100 pt-3 mt-3 flex items-center justify-between">
              <span className="text-xs font-extrabold tracking-widest uppercase text-slate-500">
                Master Total
              </span>
              <span className="text-2xl font-black text-emerald-900">
                {formatPrice(masterTotal)}
              </span>
            </div>
          </div>

          <button
            onClick={onProceed}
            className="mt-6 w-full rounded-2xl bg-gradient-to-r from-emerald-900 via-emerald-800 to-emerald-900 text-amber-300 py-4 px-4 font-extrabold text-xs uppercase tracking-wider shadow-lg hover:shadow-emerald-900/30 hover:-translate-y-0.5 transition-all"
          >
            <span className="inline-flex items-center justify-center gap-2">
              <Sparkles className="h-4 w-4" />
              Proceed to Single Master Checkout
            </span>
          </button>
          <p className="text-[11px] text-slate-500 mt-3 leading-relaxed">
            One secure payment now, then automatic vendor-level split
            processing.
          </p>
        </aside>
      </div>
    </div>
  );
}
