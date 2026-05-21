import React, { useEffect, useMemo, useState } from "react";
import {
  ArrowLeft,
  CreditCard,
  LoaderCircle,
  LockKeyhole,
  ShieldCheck,
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

export default function MasterCheckout({ onBackToCart, onPaymentSuccess }) {
  const { cartItems, groupedByVendor, masterTotal } = useCart();
  const [cardNumber, setCardNumber] = useState("4242 4242 4242 4242");
  const [expiry, setExpiry] = useState("12/29");
  const [cvv, setCvv] = useState("123");
  const [isProcessing, setIsProcessing] = useState(false);

  const vendors = useMemo(
    () => Object.values(groupedByVendor),
    [groupedByVendor],
  );

  useEffect(() => {
    if (cartItems.length === 0) {
      onBackToCart();
    }
  }, [cartItems.length, onBackToCart]);

  const handleSubmitPayment = (e) => {
    e.preventDefault();

    if (!cardNumber || !expiry || !cvv) {
      return;
    }

    setIsProcessing(true);

    setTimeout(() => {
      onPaymentSuccess();
      setIsProcessing(false);
    }, 2000);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 lg:px-8 py-8">
      <button
        onClick={onBackToCart}
        className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full border border-slate-200 bg-white text-xs font-bold text-slate-600 hover:text-slate-900 mb-7"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to Cart
      </button>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        <section className="lg:col-span-2 rounded-[32px] border border-slate-100 bg-white p-6 lg:p-8 shadow-sm">
          <h1 className="text-2xl lg:text-3xl font-black text-slate-900 tracking-tight mb-2 flex items-center gap-2">
            <CreditCard className="h-7 w-7 text-emerald-800" />
            Secure Master Checkout
          </h1>
          <p className="text-sm text-slate-500 mb-7">
            Complete one payment for all selected vendors across Sri Lanka.
          </p>

          <form onSubmit={handleSubmitPayment} className="space-y-5">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
                Card Number
              </label>
              <input
                value={cardNumber}
                onChange={(e) => setCardNumber(e.target.value)}
                inputMode="numeric"
                maxLength={19}
                placeholder="1234 5678 9012 3456"
                className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-semibold text-slate-700 focus:outline-none focus:border-emerald-600 focus:bg-white"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
                  Expiry (MM/YY)
                </label>
                <input
                  value={expiry}
                  onChange={(e) => setExpiry(e.target.value)}
                  maxLength={5}
                  placeholder="09/30"
                  className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-semibold text-slate-700 focus:outline-none focus:border-emerald-600 focus:bg-white"
                />
              </div>
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
                  CVV
                </label>
                <input
                  value={cvv}
                  onChange={(e) => setCvv(e.target.value)}
                  inputMode="numeric"
                  maxLength={4}
                  placeholder="123"
                  className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-semibold text-slate-700 focus:outline-none focus:border-emerald-600 focus:bg-white"
                />
              </div>
            </div>

            <div className="rounded-2xl border border-emerald-100 bg-emerald-50/60 p-4 text-xs text-emerald-900 font-semibold flex items-start gap-2">
              <ShieldCheck className="h-4 w-4 mt-0.5 shrink-0" />
              Sri Lankan payment simulation mode: Visa/Master secure gateway
              tokenization is mocked entirely in frontend for demo.
            </div>

            <button
              type="submit"
              disabled={isProcessing}
              className="w-full rounded-2xl bg-gradient-to-r from-emerald-900 via-emerald-800 to-emerald-900 py-4 px-4 text-amber-300 font-extrabold text-xs uppercase tracking-wider shadow-lg disabled:opacity-80"
            >
              {isProcessing ? (
                <span className="inline-flex items-center justify-center gap-2">
                  <LoaderCircle className="h-4 w-4 animate-spin" />
                  Processing Secure Payment...
                </span>
              ) : (
                <span className="inline-flex items-center justify-center gap-2">
                  <LockKeyhole className="h-4 w-4" />
                  Pay {formatPrice(masterTotal)} via Secure Gateway
                </span>
              )}
            </button>
          </form>
        </section>

        <aside className="lg:sticky lg:top-24 rounded-[32px] border border-slate-100 bg-white p-6 shadow-sm">
          <h2 className="text-base font-black text-slate-900 mb-4">
            Vendor Split Preview
          </h2>
          <div className="space-y-3">
            {vendors.map((vendor) => {
              const vendorTotal = vendor.items.reduce(
                (sum, item) =>
                  sum +
                  item.price +
                  item.selectedAddOns.reduce(
                    (addOnSum, addOn) => addOnSum + addOn.price,
                    0,
                  ),
                0,
              );

              return (
                <div
                  key={vendor.vendorId}
                  className="rounded-xl border border-slate-100 bg-slate-50 p-3"
                >
                  <p className="text-xs font-bold text-slate-700">
                    {vendor.vendorName}
                  </p>
                  <p className="text-xs text-slate-500 mt-1">
                    {vendor.items.length} service(s)
                  </p>
                  <p className="text-sm font-black text-emerald-900 mt-1.5">
                    {formatPrice(vendorTotal)}
                  </p>
                </div>
              );
            })}
          </div>
        </aside>
      </div>
    </div>
  );
}
