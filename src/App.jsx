import React, { useMemo, useState } from "react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import CategoryGrid from "./components/CategoryGrid";
import FeaturedPackages from "./components/FeaturedPackages";
import MarketplaceExplorer from "./components/MarketplaceExplorer";
import PackageDetail from "./components/PackageDetail";
import VendorDashboard from "./components/VendorDashboard";
import CartView from "./components/CartView";
import MasterCheckout from "./components/MasterCheckout";
import BookingSuccess from "./components/BookingSuccess";
import LoginPage from "./components/LoginPage";
import RegisterPage from "./components/RegisterPage";
import CustomerDashboard from "./components/CustomerDashboard";
import AdminDashboard from "./components/AdminDashboard";
import { useCart } from "./context/CartContext";
import {
  CATEGORIES,
  DISTRICTS,
  PACKAGES,
  MOCK_BOOKINGS,
} from "./data/mockData";
import { INITIAL_VENDOR_VERIFICATIONS, MOCK_USERS } from "./data/mockUsers";

const PENDING_CART_KEY = "uthsawa_pending_cart_action";
const LOGIN_NOTICE_KEY = "uthsawa_login_notice";

const mapMockBookingsToCustomer = (bookings) =>
  bookings.map((b) => ({
    id: b.id,
    title: b.pkgTitle,
    eventDate: b.date,
    location: b.location,
    totalPaid: b.totalPrice,
    status: b.status === "Pending Review" ? "Pending" : b.status,
    statusText: `${b.pkgTitle} - ${b.status}`,
  }));

export default function App() {
  const { addToCart, cartItems, groupedByVendor, masterTotal } = useCart();

  const [appUsers, setAppUsers] = useState(MOCK_USERS);
  const [currentUser, setCurrentUser] = useState(null);
  const [currentView, setCurrentView] = useState("home");
  const [selectedLocation, setSelectedLocation] = useState("Colombo");
  const [packages, setPackages] = useState(PACKAGES);
  const [selectedPkgId, setSelectedPkgId] = useState(null);
  const [explorerFilters, setExplorerFilters] = useState({});
  const [loginError, setLoginError] = useState("");
  const [vendorVerifications, setVendorVerifications] = useState(
    INITIAL_VENDOR_VERIFICATIONS,
  );

  const [customerBookings, setCustomerBookings] = useState(
    mapMockBookingsToCustomer(MOCK_BOOKINGS),
  );

  const [vendorIncomingBookings, setVendorIncomingBookings] = useState([
    {
      id: "in-1",
      vendorId: "vendor-lanka-sounds",
      customerName: "Nimasha Fernando",
      subOrderLabel: "Sub-Order #990 for Lanka Sounds & Entertainment",
      amount: 113000,
      status: "Accepted",
    },
    {
      id: "in-2",
      vendorId: "vendor-royal-catering",
      customerName: "Sahan Gunawardena",
      subOrderLabel: "Sub-Order #991 for Royal Catering Services",
      amount: 275000,
      status: "Pending",
    },
  ]);

  const [transactions, setTransactions] = useState([]);

  const activePackage = packages.find((p) => p.id === selectedPkgId);

  const handleNavigate = (view) => {
    if (view === "dashboard") {
      if (!currentUser) {
        setCurrentView("login");
      } else if (currentUser.role === "admin") {
        setCurrentView("admin-dashboard");
      } else if (currentUser.role === "vendor") {
        setCurrentView("vendor-dashboard");
      } else {
        setCurrentView("customer-dashboard");
      }
    } else {
      setCurrentView(view);
    }

    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleHeroSearch = (filters) => {
    setExplorerFilters(filters);
    handleNavigate("explorer");
  };

  const handleSelectCategory = (catId) => {
    setExplorerFilters({ category: catId });
    handleNavigate("explorer");
  };

  const handleSelectPackage = (pkgId) => {
    setSelectedPkgId(pkgId);
    handleNavigate("detail");
  };

  const handleAddPackage = (newPkg) => {
    setPackages((prev) => [newPkg, ...prev]);
  };

  const handleGuestCartAction = (pendingAction) => {
    sessionStorage.setItem(PENDING_CART_KEY, JSON.stringify(pendingAction));
    sessionStorage.setItem(
      LOGIN_NOTICE_KEY,
      "Please login to add this package to your cart and proceed.",
    );
  };

  const handleLogin = ({ email, password }) => {
    const user = appUsers.find(
      (u) =>
        u.email.toLowerCase() === email.toLowerCase() &&
        u.password === password,
    );

    if (!user) {
      setLoginError(
        "Invalid email or password. Use demo credentials listed on the right.",
      );
      return;
    }

    setLoginError("");
    setCurrentUser(user);

    const pendingRaw = sessionStorage.getItem(PENDING_CART_KEY);
    if (pendingRaw) {
      try {
        const pendingAction = JSON.parse(pendingRaw);
        addToCart({
          packageId: pendingAction.packageId,
          title: pendingAction.title,
          price: pendingAction.price,
          selectedAddOns: pendingAction.selectedAddOns || [],
          vendorName: pendingAction.vendorName,
          vendorId: pendingAction.vendorId,
        });

        sessionStorage.removeItem(PENDING_CART_KEY);
        sessionStorage.removeItem(LOGIN_NOTICE_KEY);
        setCurrentView(pendingAction.redirectTo || "cart");
        return;
      } catch {
        sessionStorage.removeItem(PENDING_CART_KEY);
        sessionStorage.removeItem(LOGIN_NOTICE_KEY);
      }
    }

    if (user.role === "admin") {
      setCurrentView("admin-dashboard");
    } else if (user.role === "vendor") {
      setCurrentView("vendor-dashboard");
    } else {
      setCurrentView("home");
    }
  };

  const handleRegister = ({ name, email, password, role }) => {
    const exists = appUsers.some(
      (u) => u.email.toLowerCase() === email.toLowerCase(),
    );
    if (exists) {
      setLoginError("Email already exists. Please login instead.");
      setCurrentView("login");
      return;
    }

    const newUser = {
      id: `usr-${Date.now()}`,
      name,
      email,
      password,
      role,
      vendorId:
        role === "vendor"
          ? `vendor-${name
              .toLowerCase()
              .replace(/[^a-z0-9\s-]/g, "")
              .trim()
              .replace(/\s+/g, "-")}`
          : undefined,
      vendorName: role === "vendor" ? `${name} Events` : undefined,
    };

    setAppUsers((prev) => [newUser, ...prev]);

    if (role === "vendor") {
      setVendorVerifications((prev) => [
        {
          id: `verify-${Date.now()}`,
          businessName: `${name} Events`,
          ownerName: name,
          district: selectedLocation,
          submittedAt: "2026-05-21",
          status: "Pending",
        },
        ...prev,
      ]);
    }

    setCurrentUser(newUser);
    if (role === "vendor") {
      setCurrentView("vendor-dashboard");
    } else {
      setCurrentView("home");
    }
  };

  const handleLogout = () => {
    setCurrentUser(null);
    sessionStorage.removeItem(PENDING_CART_KEY);
    sessionStorage.removeItem(LOGIN_NOTICE_KEY);
    setCurrentView("home");
  };

  const handleMasterPaymentSuccess = () => {
    const vendorGroups = Object.values(groupedByVendor);

    const splitOrders = vendorGroups.map((group, index) => {
      const splitAmount = group.items.reduce(
        (sum, item) =>
          sum +
          item.price +
          item.selectedAddOns.reduce(
            (addonSum, addon) => addonSum + addon.price,
            0,
          ),
        0,
      );

      return {
        subOrderId: 1001 + index,
        vendorId: group.vendorId,
        vendorName: group.vendorName,
        amount: splitAmount,
      };
    });

    const txId = `${Math.floor(10000 + Math.random() * 90000)}`;

    setTransactions((prev) => [
      {
        id: txId,
        customerName: currentUser?.name || "Guest Customer",
        paidAt: "2026-05-21",
        masterTotal,
        splitOrders,
      },
      ...prev,
    ]);

    setVendorIncomingBookings((prev) => [
      ...splitOrders.map((split) => ({
        id: `in-${Date.now()}-${split.subOrderId}`,
        vendorId: split.vendorId,
        customerName: currentUser?.name || "Guest Customer",
        subOrderLabel: `Sub-Order #${split.subOrderId} for ${split.vendorName}`,
        amount: split.amount,
        status: "Pending",
      })),
      ...prev,
    ]);

    setCustomerBookings((prev) => [
      ...cartItems.map((item) => ({
        id: `cust-${Date.now()}-${item.itemId}`,
        title: item.title,
        eventDate: "2026-06-20",
        location: selectedLocation,
        totalPaid:
          item.price +
          item.selectedAddOns.reduce((sum, addon) => sum + addon.price, 0),
        status: "Confirmed",
        statusText: `${item.title} by ${item.vendorName} - Confirmed`,
      })),
      ...prev,
    ]);

    setCurrentView("success");
  };

  const handleUpdateIncomingBooking = (incomingId, status) => {
    setVendorIncomingBookings((prev) =>
      prev.map((booking) =>
        booking.id === incomingId ? { ...booking, status } : booking,
      ),
    );
  };

  const handleApproveVendor = (verificationId) => {
    setVendorVerifications((prev) =>
      prev.map((v) =>
        v.id === verificationId ? { ...v, status: "Approved" } : v,
      ),
    );
  };

  const currentVendorIncoming = useMemo(() => {
    if (!currentUser || currentUser.role !== "vendor") return [];
    return vendorIncomingBookings.filter(
      (b) => b.vendorId === currentUser.vendorId,
    );
  }, [vendorIncomingBookings, currentUser]);

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      <Navbar
        currentUser={currentUser}
        selectedLocation={selectedLocation}
        setSelectedLocation={setSelectedLocation}
        districts={DISTRICTS}
        onNavigate={handleNavigate}
        cartCount={cartItems.length}
        onLogout={handleLogout}
      />

      <main className="flex-grow">
        {currentView === "login" && (
          <LoginPage
            onLogin={handleLogin}
            onGoRegister={() => handleNavigate("register")}
            error={loginError}
          />
        )}

        {currentView === "register" && (
          <RegisterPage
            onRegister={handleRegister}
            onGoLogin={() => handleNavigate("login")}
          />
        )}

        {currentView === "home" && (
          <div className="animate-in fade-in duration-300">
            <Hero
              categories={CATEGORIES}
              districts={DISTRICTS}
              onSearch={handleHeroSearch}
            />
            <CategoryGrid
              categories={CATEGORIES}
              onSelectCategory={handleSelectCategory}
            />
            <FeaturedPackages
              packages={packages}
              onSelectPackage={handleSelectPackage}
            />
          </div>
        )}

        {currentView === "explorer" && (
          <MarketplaceExplorer
            packages={packages}
            categories={CATEGORIES}
            districts={DISTRICTS}
            onSelectPackage={handleSelectPackage}
            initialFilters={explorerFilters}
          />
        )}

        {currentView === "detail" && activePackage && (
          <PackageDetail
            pkg={activePackage}
            onBackToExplorer={() => handleNavigate("explorer")}
            onNavigate={handleNavigate}
            onAddToCart={addToCart}
            currentUser={currentUser}
            onGuestCartAction={handleGuestCartAction}
          />
        )}

        {currentView === "cart" && (
          <CartView
            onBack={() => handleNavigate("explorer")}
            onProceed={() => {
              if (currentUser?.role !== "customer") {
                handleNavigate("login");
                return;
              }
              handleNavigate("checkout");
            }}
          />
        )}

        {currentView === "checkout" && (
          <MasterCheckout
            onBackToCart={() => handleNavigate("cart")}
            onPaymentSuccess={handleMasterPaymentSuccess}
          />
        )}

        {currentView === "success" && (
          <BookingSuccess onReturnHome={() => handleNavigate("home")} />
        )}

        {currentView === "customer-dashboard" &&
          currentUser?.role === "customer" && (
            <CustomerDashboard
              bookings={customerBookings}
              currentUser={currentUser}
            />
          )}

        {currentView === "vendor-dashboard" &&
          currentUser?.role === "vendor" && (
            <VendorDashboard
              currentUser={currentUser}
              packages={packages}
              categories={CATEGORIES}
              districts={DISTRICTS}
              onAddPackage={handleAddPackage}
              incomingBookings={currentVendorIncoming}
              onUpdateIncomingBooking={handleUpdateIncomingBooking}
            />
          )}

        {currentView === "admin-dashboard" && currentUser?.role === "admin" && (
          <AdminDashboard
            users={appUsers}
            vendorVerifications={vendorVerifications}
            onApproveVendor={handleApproveVendor}
            transactions={transactions}
          />
        )}
      </main>

      <footer className="bg-slate-900 border-t border-slate-800 text-slate-400 py-10 px-4 lg:px-8 mt-16">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <p className="font-extrabold text-white">Uthsawa Marketplace</p>
            <p className="text-xs text-slate-500 mt-1">
              Frontend-only multi-role prototype for Sri Lankan event services.
            </p>
          </div>
          <p className="text-xs text-slate-500">© 2026 Uthsawa Inc.</p>
        </div>
      </footer>
    </div>
  );
}
