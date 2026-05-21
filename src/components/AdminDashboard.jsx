import React, { useMemo, useState } from "react";
import {
  BadgeCheck,
  Building2,
  CircleDollarSign,
  ListChecks,
  ShieldCheck,
  Users,
} from "lucide-react";

const formatPrice = (price) =>
  new Intl.NumberFormat("en-LK", {
    style: "currency",
    currency: "LKR",
    minimumFractionDigits: 0,
  })
    .format(price)
    .replace("LKR", "Rs.");

export default function AdminDashboard({
  users,
  vendorVerifications,
  onApproveVendor,
  transactions,
}) {
  const [tab, setTab] = useState("verification");

  const totalUsers = users.length;
  const totalActiveVendors = users.filter((u) => u.role === "vendor").length;

  const platformCommission = useMemo(() => {
    return transactions.reduce((sum, tx) => sum + tx.masterTotal * 0.08, 0);
  }, [transactions]);

  return (
    <div className="max-w-7xl mx-auto px-4 lg:px-8 py-8">
      <section className="rounded-[36px] border border-slate-200 bg-gradient-to-br from-white via-slate-50 to-slate-100 p-6 lg:p-8 shadow-sm mb-7">
        <p className="text-xs uppercase tracking-[0.2em] font-bold text-slate-500">
          Admin Control Room
        </p>
        <h1 className="text-2xl lg:text-4xl font-black text-slate-900 mt-1 tracking-tight">
          Marketplace Command Center
        </h1>
        <p className="text-sm text-slate-500 mt-2">
          System-wide visibility for users, vendor onboarding, and payment
          splits.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
          <div className="rounded-2xl border border-slate-200 bg-white p-4">
            <p className="text-[11px] uppercase tracking-widest text-slate-400 font-bold">
              Total Users
            </p>
            <p className="text-2xl font-black text-slate-900 mt-1 inline-flex items-center gap-2">
              <Users className="h-5 w-5 text-slate-500" />
              {totalUsers}
            </p>
          </div>
          <div className="rounded-2xl border border-slate-200 bg-white p-4">
            <p className="text-[11px] uppercase tracking-widest text-slate-400 font-bold">
              Total Active Vendors
            </p>
            <p className="text-2xl font-black text-slate-900 mt-1 inline-flex items-center gap-2">
              <Building2 className="h-5 w-5 text-slate-500" />
              {totalActiveVendors}
            </p>
          </div>
          <div className="rounded-2xl border border-slate-200 bg-white p-4">
            <p className="text-[11px] uppercase tracking-widest text-slate-400 font-bold">
              Platform Commission Earned
            </p>
            <p className="text-2xl font-black text-emerald-900 mt-1 inline-flex items-center gap-2">
              <CircleDollarSign className="h-5 w-5 text-emerald-700" />
              {formatPrice(platformCommission)}
            </p>
          </div>
        </div>
      </section>

      <section className="rounded-[32px] border border-slate-100 bg-white p-6 lg:p-8 shadow-sm">
        <div className="rounded-full bg-slate-100 p-1 inline-flex gap-1 mb-6">
          <button
            onClick={() => setTab("verification")}
            className={`px-4 py-2 rounded-full text-xs font-extrabold uppercase tracking-wider ${tab === "verification" ? "bg-white text-slate-900" : "text-slate-500"}`}
          >
            Vendor Verification
          </button>
          <button
            onClick={() => setTab("transactions")}
            className={`px-4 py-2 rounded-full text-xs font-extrabold uppercase tracking-wider ${tab === "transactions" ? "bg-white text-slate-900" : "text-slate-500"}`}
          >
            All Transactions
          </button>
        </div>

        {tab === "verification" && (
          <div className="overflow-x-auto rounded-2xl border border-slate-100">
            <table className="min-w-full text-sm">
              <thead className="bg-slate-50 text-slate-500 text-xs uppercase tracking-wider">
                <tr>
                  <th className="text-left px-4 py-3">Business</th>
                  <th className="text-left px-4 py-3">Owner</th>
                  <th className="text-left px-4 py-3">District</th>
                  <th className="text-left px-4 py-3">Submitted</th>
                  <th className="text-left px-4 py-3">Status</th>
                  <th className="text-right px-4 py-3">Action</th>
                </tr>
              </thead>
              <tbody>
                {vendorVerifications.map((item) => (
                  <tr key={item.id} className="border-t border-slate-100">
                    <td className="px-4 py-3 font-bold text-slate-800">
                      {item.businessName}
                    </td>
                    <td className="px-4 py-3 text-slate-600">
                      {item.ownerName}
                    </td>
                    <td className="px-4 py-3 text-slate-600">
                      {item.district}
                    </td>
                    <td className="px-4 py-3 text-slate-600">
                      {item.submittedAt}
                    </td>
                    <td className="px-4 py-3">
                      <span
                        className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-[11px] font-bold ${item.status === "Approved" ? "bg-emerald-50 text-emerald-700" : "bg-amber-50 text-amber-700"}`}
                      >
                        <ShieldCheck className="h-3 w-3" />
                        {item.status}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-right">
                      {item.status !== "Approved" && (
                        <button
                          onClick={() => onApproveVendor(item.id)}
                          className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-slate-900 text-white text-xs font-extrabold uppercase tracking-wider"
                        >
                          <BadgeCheck className="h-3.5 w-3.5" />
                          Verify & Approve
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {tab === "transactions" && (
          <div className="space-y-4">
            {transactions.length === 0 && (
              <div className="rounded-2xl border border-dashed border-slate-200 p-10 text-center text-slate-400 text-sm font-semibold">
                No completed master checkouts yet.
              </div>
            )}

            {transactions.map((tx) => (
              <article
                key={tx.id}
                className="rounded-2xl border border-slate-100 bg-slate-50 p-4 lg:p-5"
              >
                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-3">
                  <div>
                    <p className="text-sm font-black text-slate-900 inline-flex items-center gap-2">
                      <ListChecks className="h-4 w-4 text-slate-500" />
                      Master Checkout #{tx.id}
                    </p>
                    <p className="text-xs text-slate-500 mt-1">
                      Customer: {tx.customerName} | Date: {tx.paidAt}
                    </p>
                  </div>
                  <p className="text-sm font-black text-emerald-900">
                    {formatPrice(tx.masterTotal)}
                  </p>
                </div>

                <div className="mt-3 grid grid-cols-1 md:grid-cols-2 gap-2">
                  {tx.splitOrders.map((split) => (
                    <div
                      key={split.subOrderId}
                      className="rounded-xl border border-emerald-100 bg-white px-3 py-2 text-xs"
                    >
                      <p className="font-bold text-slate-800">
                        Sub-Order #{split.subOrderId} - {split.vendorName}
                      </p>
                      <p className="text-emerald-800 font-black mt-0.5">
                        {formatPrice(split.amount)}
                      </p>
                    </div>
                  ))}
                </div>
              </article>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
