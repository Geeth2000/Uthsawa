# SYSTEM_MEMORY

Last Updated: 2026-05-21

## Purpose

This file is the project memory source of truth for architecture, recent meaningful changes, and pending tasks.

## Latest Meaningful Change

### What was changed

- Added and initialized SYSTEM_MEMORY.md at project root.
- Recorded current multi-role frontend architecture and data flow.
- Added guest add-to-cart/login interception with session-backed pending cart memory and login toast handling.
- Switched guest add-to-cart/login redirect flow to React Router navigation with sessionStorage-backed package restore.
- Fixed a runtime bug in PackageDetail where the guest add-to-cart handler referenced the wrong add-on state variable and prevented redirect/login behavior.

### Why it was changed

- To enforce persistent development memory, reduce context drift, and prevent inconsistent or hallucinatory changes across sessions.
- To preserve a guest's selected package intent through login and restore it immediately after mock authentication.
- To make the redirect explicit through `/login` while keeping the pending package payload recoverable after auth.
- To ensure the package detail button actually triggers the redirect path and restores the saved package into the cart after successful login.

### Files affected

- SYSTEM_MEMORY.md
- src/App.jsx
- src/components/LoginPage.jsx
- src/components/PackageDetail.jsx
- src/main.jsx
- src/data/mockUsers.js

## Current Architecture Decisions

- App is frontend-only with React state management and no backend/database.
- Main app orchestration is in src/App.jsx.
- Auth is mock/local state-based:
  - currentUser is null for guest.
  - Logged-in user has role: customer, vendor, or admin.
  - Mock users and demo credentials are defined in src/data/mockUsers.js.
- Navigation/rendering strategy is state-driven (currentView), not react-router.
- Cart and master checkout are global via context:
  - Cart state lives in src/context/CartContext.jsx.
  - Multi-vendor split logic is generated during payment success in src/App.jsx.
- Browser routing is enabled via react-router-dom BrowserRouter and useNavigate.
- Guest purchase intent is stored in sessionStorage using:
  - redirect_package
  - login_notice
- The saved package payload is restored into the global cart after successful login and the user is routed to /cart.
- Dashboard routing by role:
  - Customer: customer-dashboard
  - Vendor: vendor-dashboard
  - Admin: admin-dashboard
- Vendor and admin operational data are simulated in local state:
  - vendorIncomingBookings
  - transactions
  - vendorVerifications

## Current Functional Scope

- Guest flow:
  - Browse marketplace views.
  - Login/Register from navbar.
- Customer flow:
  - Browse packages, add to cart, proceed to master checkout.
  - Guest add-to-cart and book-now actions now save the current package, navigate to /login, then restore the saved package into cart after auth.
  - The package detail guest handler now uses the correct selectedAddons state, avoiding the previous runtime error.
  - On successful payment simulation, split orders are generated and reflected in dashboards.
  - Customer Dashboard has Upcoming/Past booking tabs.
- Vendor flow:
  - Sidebar dashboard with metrics.
  - Services tab with Add New Package modal.
  - Incoming Bookings tab with Accept and Mark as Completed actions.
- Admin flow:
  - Overview cards.
  - Vendor Verification table with Verify & Approve.
  - All Transactions list with split-order details.

## Pending Tasks

- Add stricter role-guard behavior for all restricted views (defensive redirects for manual view switching edge cases).
- Optionally optimize bundle size (build currently warns about large chunk size).

## Working Rules

- Do not contradict this file without explicitly updating it first.
- Before major edits after context loss, read this file and align implementation decisions with it.
