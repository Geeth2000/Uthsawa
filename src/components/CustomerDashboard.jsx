import React, { useMemo, useState } from "react";
import { CalendarDays, CircleCheckBig, Clock3, Wallet } from "lucide-react";

const formatPrice = (price) =>
  new Intl.NumberFormat("en-LK", {
    style: "currency",
    currency: "LKR",
    minimumFractionDigits: 0,
  })
    .format(price)
    .replace("LKR", "Rs.");

export default function CustomerDashboard({ bookings = [], currentUser }) {
  const [tab, setTab] = useState("upcoming");

  const now = new Date("2026-05-21");

  const categorized = useMemo(() => {
    const upcoming = [];
    const past = [];

    bookings.forEach((booking) => {
      const eventDate = booking.eventDate
        ? new Date(booking.eventDate)
        : new Date("2026-05-20");
      if (eventDate >= now) {
        upcoming.push(booking);
      } else {
        past.push(booking);
      }
    });

    return { upcoming, past };
  }, [bookings]);

  const activeList =
    tab === "upcoming" ? categorized.upcoming : categorized.past;
  const totalPaid = bookings.reduce((sum, b) => sum + b.totalPaid, 0);

  return (
    <div className="max-w-7xl mx-auto px-4 lg:px-8 py-8">
      <div className="rounded-[32px] border border-slate-100 bg-white p-6 lg:p-8 shadow-sm mb-7">
        <p className="text-xs uppercase tracking-[0.2em] font-bold text-emerald-700">
          Customer Center
        </p>
        <h1 className="text-2xl lg:text-4xl font-black text-slate-900 mt-1 tracking-tight">
          Hello, {currentUser?.name}
        </h1>
        <p className="text-sm text-slate-500 mt-2">
          Manage your multi-vendor bookings and payment history.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
          <div className="rounded-2xl border border-slate-100 bg-slate-50 p-4">
            <p className="text-[11px] uppercase tracking-widest text-slate-400 font-bold">
              Total Bookings
            </p>
            <p className="text-2xl font-black text-slate-900 mt-1">
              {bookings.length}
            </p>
          </div>
          <div className="rounded-2xl border border-slate-100 bg-slate-50 p-4">
            <p className="text-[11px] uppercase tracking-widest text-slate-400 font-bold">
              Upcoming Events
            </p>
            <p className="text-2xl font-black text-emerald-900 mt-1">
              {categorized.upcoming.length}
            </p>
          </div>
          <div className="rounded-2xl border border-slate-100 bg-slate-50 p-4">
            <p className="text-[11px] uppercase tracking-widest text-slate-400 font-bold">
              Total Paid
            </p>
            <p className="text-2xl font-black text-amber-700 mt-1">
              {formatPrice(totalPaid)}
            </p>
          </div>
        </div>
      </div>

      <section className="rounded-[32px] border border-slate-100 bg-white p-6 lg:p-8 shadow-sm">
        <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
          <h2 className="text-xl font-black text-slate-900">My Bookings</h2>
          <div className="rounded-full bg-slate-100 p-1 inline-flex gap-1">
            <button
              onClick={() => setTab("upcoming")}
              className={`px-4 py-2 rounded-full text-xs font-extrabold uppercase tracking-wider ${tab === "upcoming" ? "bg-white text-emerald-900" : "text-slate-500"}`}
            >
              Upcoming Events
            </button>
            <button
              onClick={() => setTab("past")}
              className={`px-4 py-2 rounded-full text-xs font-extrabold uppercase tracking-wider ${tab === "past" ? "bg-white text-emerald-900" : "text-slate-500"}`}
            >
              Past Events
            </button>
          </div>
        </div>

        <div className="space-y-4">
          {activeList.length === 0 && (
            <div className="rounded-2xl border border-dashed border-slate-200 p-10 text-center text-slate-400 text-sm font-semibold">
              No bookings in this section yet.
            </div>
          )}

          {activeList.map((booking) => (
            <article
              key={booking.id}
              className="rounded-2xl border border-slate-100 bg-slate-50/60 p-4 lg:p-5"
            >
              <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                <div>
                  <p className="text-sm font-black text-slate-900">
                    {booking.title}
                  </p>
                  <p className="text-xs text-slate-500 mt-1">
                    {booking.eventDate} in {booking.location}
                  </p>
                  <p className="text-xs text-emerald-800 font-bold mt-2">
                    {booking.statusText}
                  </p>
                </div>

                <div className="grid grid-cols-3 gap-3 w-full lg:w-auto">
                  <div className="rounded-xl bg-white border border-slate-100 px-3 py-2">
                    <p className="text-[10px] uppercase tracking-wider text-slate-400 font-bold flex items-center gap-1">
                      <Wallet className="h-3 w-3" /> Paid
                    </p>
                    <p className="text-xs font-black text-slate-800 mt-1">
                      {formatPrice(booking.totalPaid)}
                    </p>
                  </div>
                  <div className="rounded-xl bg-white border border-slate-100 px-3 py-2">
                    <p className="text-[10px] uppercase tracking-wider text-slate-400 font-bold flex items-center gap-1">
                      <CalendarDays className="h-3 w-3" /> Event
                    </p>
                    <p className="text-xs font-black text-slate-800 mt-1">
                      {booking.eventDate}
                    </p>
                  </div>
                  <div className="rounded-xl bg-white border border-slate-100 px-3 py-2">
                    <p className="text-[10px] uppercase tracking-wider text-slate-400 font-bold flex items-center gap-1">
                      {tab === "upcoming" ? (
                        <Clock3 className="h-3 w-3" />
                      ) : (
                        <CircleCheckBig className="h-3 w-3" />
                      )}{" "}
                      Status
                    </p>
                    <p className="text-xs font-black text-emerald-800 mt-1">
                      {booking.status}
                    </p>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}
