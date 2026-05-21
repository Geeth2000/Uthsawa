import React, { useMemo } from "react";
import { BadgeCheck, CheckCircle2, Sparkles } from "lucide-react";
import { useCart } from "../context/CartContext";

const formatPrice = (price) =>
  new Intl.NumberFormat("en-LK", {
    style: "currency",
    currency: "LKR",
    minimumFractionDigits: 0,
  })
    .format(price)
    .replace("LKR", "Rs.");

export default function BookingSuccess({ onReturnHome }) {
  const { groupedByVendor, clearCart } = useCart();
  const vendors = useMemo(
    () => Object.values(groupedByVendor),
    [groupedByVendor],
  );

  const subOrders = vendors.map((vendor, index) => {
    const amount = vendor.items.reduce(
      (sum, item) =>
        sum +
        item.price +
        item.selectedAddOns.reduce(
          (addOnSum, addOn) => addOnSum + addOn.price,
          0,
        ),
      0,
    );

    return {
      orderId: 1001 + index,
      vendorName: vendor.vendorName,
      amount,
    };
  });

  return (
    <div className="max-w-6xl mx-auto px-4 lg:px-8 py-10">
      <div className="rounded-[40px] border border-emerald-100 bg-gradient-to-br from-white via-emerald-50/50 to-amber-50/60 shadow-xl p-8 lg:p-12">
        <div className="text-center mb-10">
          <div className="mx-auto h-24 w-24 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center shadow-inner mb-5">
            <CheckCircle2 className="h-14 w-14" />
          </div>
          <h1 className="text-3xl lg:text-4xl font-black text-slate-900 tracking-tight mb-2">
            Booking Confirmed
          </h1>
          <p className="text-sm lg:text-base text-slate-600 max-w-2xl mx-auto">
            Your single secure payment was successfully processed, and our
            frontend split engine generated vendor-wise sub-orders instantly.
          </p>
        </div>

        <div className="rounded-3xl border border-slate-200 bg-white/90 backdrop-blur-sm p-5 lg:p-7">
          <h2 className="text-lg font-black text-slate-900 flex items-center gap-2 mb-5">
            <Sparkles className="h-5 w-5 text-amber-500" />
            Split-Order Summary
          </h2>

          <div className="space-y-3">
            {subOrders.map((order) => (
              <div
                key={order.orderId}
                className="rounded-2xl border border-emerald-100 bg-emerald-50/50 p-4 flex flex-col md:flex-row md:items-center md:justify-between gap-2"
              >
                <p className="text-sm font-bold text-slate-800">
                  Sub-Order #{order.orderId} for {order.vendorName}
                </p>
                <p className="inline-flex items-center gap-2 text-sm font-black text-emerald-900">
                  <BadgeCheck className="h-4 w-4" />
                  Confirmed ({formatPrice(order.amount)})
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-8 text-center">
          <button
            onClick={() => {
              clearCart();
              onReturnHome();
            }}
            className="inline-flex items-center justify-center rounded-2xl bg-emerald-900 text-amber-300 py-3.5 px-7 text-xs font-extrabold uppercase tracking-wider"
          >
            Return to Marketplace
          </button>
        </div>
      </div>
    </div>
  );
}
