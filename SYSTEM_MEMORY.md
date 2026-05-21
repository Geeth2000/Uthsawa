# SYSTEM_MEMORY

Last Updated: 2026-05-21

## Purpose

This file is the project memory source of truth for architecture, recent meaningful changes, and pending tasks.

## Latest Meaningful Change

### What was changed

- Added and initialized SYSTEM_MEMORY.md at project root.
- Recorded current multi-role frontend architecture and data flow.

### Why it was changed

- To enforce persistent development memory, reduce context drift, and prevent inconsistent or hallucinatory changes across sessions.

### Files affected

- SYSTEM_MEMORY.md

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
- Optionally persist auth/session and dashboard state in localStorage for refresh resilience.
- Optionally optimize bundle size (build currently warns about large chunk size).

## Working Rules

- Do not contradict this file without explicitly updating it first.
- Before major edits after context loss, read this file and align implementation decisions with it.
