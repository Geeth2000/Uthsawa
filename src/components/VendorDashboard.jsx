import React, { useMemo, useState } from "react";
import {
  BadgeCheck,
  CalendarClock,
  CircleDollarSign,
  ClipboardList,
  LayoutGrid,
  PackagePlus,
  Plus,
  X,
} from "lucide-react";

const formatPrice = (price) =>
  new Intl.NumberFormat("en-LK", {
    style: "currency",
    currency: "LKR",
    minimumFractionDigits: 0,
  })
    .format(price)
    .replace("LKR", "Rs.");

export default function VendorDashboard({
  currentUser,
  packages,
  categories,
  districts,
  onAddPackage,
  incomingBookings,
  onUpdateIncomingBooking,
}) {
  const [activeTab, setActiveTab] = useState("services");
  const [showAddModal, setShowAddModal] = useState(false);
  const [newTitle, setNewTitle] = useState("");
  const [newCategory, setNewCategory] = useState("sounds");
  const [newLocation, setNewLocation] = useState("Colombo");
  const [newPrice, setNewPrice] = useState("");

  const vendorPackages = useMemo(() => {
    return packages.filter((pkg) => pkg.vendorId === currentUser?.vendorId);
  }, [packages, currentUser]);

  const totalEarnings = incomingBookings
    .filter((b) => b.status === "Completed")
    .reduce((sum, booking) => sum + booking.amount, 0);

  const activeBookings = incomingBookings.filter(
    (b) => b.status !== "Completed",
  ).length;

  const handleSubmit = (e) => {
    e.preventDefault();

    const createdPkg = {
      id: `pkg-${Date.now()}`,
      title: newTitle,
      vendorName: currentUser.vendorName,
      vendorId: currentUser.vendorId,
      vendorRating: 4.9,
      reviewsCount: 1,
      category: newCategory,
      location: newLocation,
      price: Number(newPrice),
      images: [
        "https://images.unsplash.com/photo-1540039155733-5bb30b53aa14?auto=format&fit=crop&q=80&w=800",
        "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?auto=format&fit=crop&q=80&w=800",
      ],
      badge: "Vendor New",
      description:
        "Newly published service package from your vendor dashboard.",
      includes: ["On-site team", "Setup and teardown", "Vendor support"],
      addons: [
        { id: `ad-${Date.now()}`, name: "Priority setup", price: 10000 },
      ],
      bookedDates: [],
    };

    onAddPackage(createdPkg);
    setNewTitle("");
    setNewPrice("");
    setNewCategory("sounds");
    setNewLocation("Colombo");
    setShowAddModal(false);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 lg:px-8 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-7">
        <aside className="lg:col-span-3 rounded-[28px] border border-slate-100 bg-white p-4 shadow-sm h-fit">
          <div className="rounded-2xl bg-gradient-to-br from-emerald-900 to-emerald-700 p-4 text-white mb-4">
            <p className="text-[11px] uppercase tracking-wider text-emerald-100 font-bold">
              Vendor Console
            </p>
            <p className="text-lg font-black mt-1">{currentUser?.vendorName}</p>
            <p className="text-xs mt-1 text-emerald-100">
              {currentUser?.email}
            </p>
          </div>

          <nav className="space-y-2">
            <button
              onClick={() => setActiveTab("services")}
              className={`w-full rounded-xl px-3 py-2 text-left text-sm font-bold flex items-center gap-2 ${activeTab === "services" ? "bg-slate-900 text-white" : "bg-slate-50 text-slate-700"}`}
            >
              <LayoutGrid className="h-4 w-4" />
              My Services / Packages
            </button>
            <button
              onClick={() => setActiveTab("incoming")}
              className={`w-full rounded-xl px-3 py-2 text-left text-sm font-bold flex items-center gap-2 ${activeTab === "incoming" ? "bg-slate-900 text-white" : "bg-slate-50 text-slate-700"}`}
            >
              <ClipboardList className="h-4 w-4" />
              Incoming Bookings
            </button>
          </nav>
        </aside>

        <section className="lg:col-span-9 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="rounded-2xl border border-slate-100 bg-white p-4 shadow-sm">
              <p className="text-[11px] uppercase tracking-widest text-slate-400 font-bold">
                Total Earnings
              </p>
              <p className="text-2xl font-black text-emerald-900 mt-1 inline-flex items-center gap-2">
                <CircleDollarSign className="h-5 w-5 text-emerald-700" />
                {formatPrice(totalEarnings)}
              </p>
            </div>
            <div className="rounded-2xl border border-slate-100 bg-white p-4 shadow-sm">
              <p className="text-[11px] uppercase tracking-widest text-slate-400 font-bold">
                Active Bookings
              </p>
              <p className="text-2xl font-black text-slate-900 mt-1 inline-flex items-center gap-2">
                <CalendarClock className="h-5 w-5 text-slate-600" />
                {activeBookings}
              </p>
            </div>
            <div className="rounded-2xl border border-slate-100 bg-white p-4 shadow-sm">
              <p className="text-[11px] uppercase tracking-widest text-slate-400 font-bold">
                Total Packages
              </p>
              <p className="text-2xl font-black text-slate-900 mt-1 inline-flex items-center gap-2">
                <LayoutGrid className="h-5 w-5 text-slate-600" />
                {vendorPackages.length}
              </p>
            </div>
          </div>

          {activeTab === "services" && (
            <div className="rounded-[28px] border border-slate-100 bg-white p-5 lg:p-6 shadow-sm">
              <div className="flex flex-wrap items-center justify-between gap-3 mb-5">
                <h2 className="text-xl font-black text-slate-900">
                  My Services / Packages
                </h2>
                <button
                  onClick={() => setShowAddModal(true)}
                  className="rounded-xl px-4 py-2 bg-emerald-900 text-amber-300 text-xs font-extrabold uppercase tracking-wider inline-flex items-center gap-1.5"
                >
                  <PackagePlus className="h-4 w-4" />
                  Add New Package
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {vendorPackages.map((pkg) => (
                  <article
                    key={pkg.id}
                    className="rounded-2xl border border-slate-100 bg-slate-50 p-4"
                  >
                    <p className="text-sm font-black text-slate-900">
                      {pkg.title}
                    </p>
                    <p className="text-xs text-slate-500 mt-1">
                      {pkg.location} | {pkg.category}
                    </p>
                    <p className="text-sm font-black text-emerald-900 mt-2">
                      {formatPrice(pkg.price)}
                    </p>
                  </article>
                ))}
              </div>
            </div>
          )}

          {activeTab === "incoming" && (
            <div className="rounded-[28px] border border-slate-100 bg-white p-5 lg:p-6 shadow-sm">
              <h2 className="text-xl font-black text-slate-900 mb-5">
                Incoming Bookings
              </h2>

              <div className="space-y-3">
                {incomingBookings.length === 0 && (
                  <div className="rounded-2xl border border-dashed border-slate-200 p-10 text-center text-slate-400 text-sm font-semibold">
                    No incoming split-orders assigned yet.
                  </div>
                )}

                {incomingBookings.map((booking) => (
                  <article
                    key={booking.id}
                    className="rounded-2xl border border-slate-100 bg-slate-50 p-4"
                  >
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
                      <div>
                        <p className="text-sm font-black text-slate-900">
                          {booking.subOrderLabel}
                        </p>
                        <p className="text-xs text-slate-500 mt-1">
                          Customer: {booking.customerName}
                        </p>
                        <p className="text-xs text-emerald-800 font-bold mt-1">
                          {formatPrice(booking.amount)}
                        </p>
                      </div>

                      <div className="flex items-center gap-2">
                        {booking.status === "Pending" && (
                          <button
                            onClick={() =>
                              onUpdateIncomingBooking(booking.id, "Accepted")
                            }
                            className="rounded-lg px-3 py-2 bg-slate-900 text-white text-[11px] font-extrabold uppercase"
                          >
                            Accept Booking
                          </button>
                        )}

                        {booking.status !== "Completed" && (
                          <button
                            onClick={() =>
                              onUpdateIncomingBooking(booking.id, "Completed")
                            }
                            className="rounded-lg px-3 py-2 bg-emerald-700 text-white text-[11px] font-extrabold uppercase"
                          >
                            Mark as Completed
                          </button>
                        )}

                        <span
                          className={`rounded-full px-2 py-1 text-[10px] font-bold inline-flex items-center gap-1 ${booking.status === "Completed" ? "bg-emerald-50 text-emerald-700" : booking.status === "Accepted" ? "bg-amber-50 text-amber-700" : "bg-slate-100 text-slate-600"}`}
                        >
                          <BadgeCheck className="h-3 w-3" />
                          {booking.status}
                        </span>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          )}
        </section>
      </div>

      {showAddModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="w-full max-w-xl rounded-[28px] border border-slate-100 bg-white p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-black text-slate-900">
                Add New Package
              </h3>
              <button
                onClick={() => setShowAddModal(false)}
                className="text-slate-400 hover:text-slate-600"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-3">
              <input
                type="text"
                required
                value={newTitle}
                onChange={(e) => setNewTitle(e.target.value)}
                placeholder="Package title"
                className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-sm"
              />
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                <select
                  value={newCategory}
                  onChange={(e) => setNewCategory(e.target.value)}
                  className="rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-sm"
                >
                  {categories.map((cat) => (
                    <option key={cat.id} value={cat.id}>
                      {cat.name}
                    </option>
                  ))}
                </select>
                <select
                  value={newLocation}
                  onChange={(e) => setNewLocation(e.target.value)}
                  className="rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-sm"
                >
                  {districts.map((d) => (
                    <option key={d} value={d}>
                      {d}
                    </option>
                  ))}
                </select>
                <input
                  type="number"
                  required
                  value={newPrice}
                  onChange={(e) => setNewPrice(e.target.value)}
                  placeholder="Price"
                  className="rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-sm"
                />
              </div>

              <button
                type="submit"
                className="mt-2 rounded-xl px-4 py-2 bg-emerald-900 text-amber-300 text-xs font-extrabold uppercase tracking-wider inline-flex items-center gap-1.5"
              >
                <Plus className="h-4 w-4" />
                Publish Package
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
