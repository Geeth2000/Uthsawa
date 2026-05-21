export const MOCK_USERS = [
  {
    id: "usr-admin-1",
    name: "Admin Nadeesha",
    email: "admin@events.lk",
    password: "admin123",
    role: "admin",
  },
  {
    id: "usr-vendor-1",
    name: "Lanka Sounds Team",
    email: "lankasounds@gmail.com",
    password: "vendor123",
    role: "vendor",
    vendorId: "vendor-lanka-sounds",
    vendorName: "Lanka Sounds & Entertainment",
  },
  {
    id: "usr-vendor-2",
    name: "Royal Kitchen Team",
    email: "royalkitchen@gmail.com",
    password: "vendor123",
    role: "vendor",
    vendorId: "vendor-royal-catering",
    vendorName: "Royal Catering Services",
  },
  {
    id: "usr-customer-1",
    name: "Kasun Perera",
    email: "kasun@gmail.com",
    password: "customer123",
    role: "customer",
  },
];

export const DEMO_CREDENTIALS = [
  { role: "Admin", email: "admin@events.lk", password: "admin123" },
  {
    role: "Vendor 1 (Sounds)",
    email: "lankasounds@gmail.com",
    password: "vendor123",
  },
  {
    role: "Vendor 2 (Catering)",
    email: "royalkitchen@gmail.com",
    password: "vendor123",
  },
  { role: "Customer", email: "kasun@gmail.com", password: "customer123" },
];

export const INITIAL_VENDOR_VERIFICATIONS = [
  {
    id: "verify-1",
    businessName: "Colombo Beats Studio",
    ownerName: "Harsha Jayasinghe",
    district: "Colombo",
    submittedAt: "2026-05-20",
    status: "Pending",
  },
  {
    id: "verify-2",
    businessName: "Kandy Bloom Decor",
    ownerName: "Nipuni Senanayake",
    district: "Kandy",
    submittedAt: "2026-05-19",
    status: "Pending",
  },
  {
    id: "verify-3",
    businessName: "Galle Elite Catering",
    ownerName: "Milan de Silva",
    district: "Galle",
    submittedAt: "2026-05-18",
    status: "Pending",
  },
];
