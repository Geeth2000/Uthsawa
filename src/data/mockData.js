export const CATEGORIES = [
  {
    id: "sounds",
    name: "Sounds & DJ",
    icon: "Music",
    count: 18,
    image:
      "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?auto=format&fit=crop&q=80&w=600",
  },
  {
    id: "lighting",
    name: "Lighting",
    icon: "Sparkles",
    count: 14,
    image:
      "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?auto=format&fit=crop&q=80&w=600",
  },
  {
    id: "deco",
    name: "Stage Decorations",
    icon: "Flower",
    count: 25,
    image:
      "https://images.unsplash.com/photo-1519225495810-7517c24a9463?auto=format&fit=crop&q=80&w=600",
  },
  {
    id: "catering",
    name: "Catering Services",
    icon: "Utensils",
    count: 32,
    image:
      "https://images.unsplash.com/photo-1555244162-803834f70033?auto=format&fit=crop&q=80&w=600",
  },
  {
    id: "costumes",
    name: "Costume Rentals",
    icon: "Shirt",
    count: 11,
    image:
      "https://images.unsplash.com/photo-1595777457583-95e059d581b8?auto=format&fit=crop&q=80&w=600",
  },
];

export const DISTRICTS = [
  "Colombo",
  "Gampaha",
  "Kandy",
  "Kalutara",
  "Galle",
  "Kurunegala",
];

export const PACKAGES = [
  {
    id: "pkg-1",
    title: "Silver Wedding Poruwa & Stage Deco",
    vendorName: "Saman Deco & Florists",
    vendorId: "vendor-saman-deco",
    vendorRating: 4.8,
    reviewsCount: 112,
    category: "deco",
    location: "Colombo",
    price: 150000,
    images: [
      "https://images.unsplash.com/photo-1523438885200-e635ba2c371e?auto=format&fit=crop&q=80&w=800",
      "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&q=80&w=800",
    ],
    badge: "Most Popular",
    description:
      "Make your special day unforgettable with our traditional-meets-modern wedding decoration package. Crafted by master decorators using high-quality artificial and fresh local flowers.",
    includes: [
      "Traditional Wooden Poruwa Setup (Customized backdrops)",
      "Set of 6 Aisle Flower Pillars with fresh local flora",
      "Royal Couple Settee with elegant drapery",
      "Welcome Board Floral Stand",
      "Head Table decoration + Cake structure table deco",
      "Full oil lamp decoration setup",
    ],
    addons: [
      { id: "add-1-1", name: "Traditional Lotus Poruwa Upgrade", price: 25000 },
      { id: "add-1-2", name: "Red Carpet Walkway (50ft)", price: 8000 },
      { id: "add-1-3", name: "Fresh Rose & Lily Arch Upgrade", price: 15000 },
      {
        id: "add-1-4",
        name: "Matching Table Centerpieces (15 Tables)",
        price: 18000,
      },
    ],
    bookedDates: ["2026-05-23", "2026-05-24", "2026-06-06", "2026-06-13"],
  },
  {
    id: "pkg-2",
    title: "Club-Standard Sounds & DJ System",
    vendorName: "Lanka Sounds & Entertainment",
    vendorId: "vendor-lanka-sounds",
    vendorRating: 4.9,
    reviewsCount: 88,
    category: "sounds",
    location: "Colombo",
    price: 95000,
    images: [
      "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?auto=format&fit=crop&q=80&w=800",
      "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?auto=format&fit=crop&q=80&w=800",
      "https://images.unsplash.com/photo-1487180142328-054b783fc471?auto=format&fit=crop&q=80&w=800",
    ],
    badge: "Trending",
    description:
      "Premium high-fidelity audio system perfect for weddings, homecomings, and corporate gigs. Includes an experienced local DJ playing the best baila, pop, and dance beats.",
    includes: [
      "Experienced Professional DJ (6 Hours set)",
      "2x Premium Active FOH Speakers (1000W RMS each)",
      "2x 18-inch High-Power Subwoofers for deep bass",
      "DJ Booth + Professional Pioneer Controller setup",
      "2x Cordless UHF Vocal Microphones",
      "All necessary cabling, amplifiers, and sound technicians",
    ],
    addons: [
      { id: "add-2-1", name: "Smoke Machine with LED Lights", price: 8000 },
      { id: "add-2-2", name: "Extra Pair of Surround Speakers", price: 10000 },
      {
        id: "add-2-3",
        name: "Premium Live Band Mixing Board (32 Ch)",
        price: 12000,
      },
      {
        id: "add-2-4",
        name: "Karaoke Setup with Screen + Lyrics",
        price: 15000,
      },
    ],
    bookedDates: ["2026-05-22", "2026-05-30", "2026-06-07", "2026-06-20"],
  },
  {
    id: "pkg-3",
    title: "Traditional Rice & Curry Feast (100 Pax)",
    vendorName: "Royal Catering Services",
    vendorId: "vendor-royal-catering",
    vendorRating: 4.7,
    reviewsCount: 142,
    category: "catering",
    location: "Kandy",
    price: 240000,
    images: [
      "https://images.unsplash.com/photo-1555244162-803834f70033?auto=format&fit=crop&q=80&w=800",
      "https://images.unsplash.com/photo-1601050690597-df056fb4ce78?auto=format&fit=crop&q=80&w=800",
      "https://images.unsplash.com/photo-1565557623262-b51c2513a641?auto=format&fit=crop&q=80&w=800",
    ],
    badge: "Top Rated",
    description:
      "Premium buffet with rich local flavors. Features fragrant Basmati rice, 5 traditional Sri Lankan curries, custom sambols, papadum, and delicious local desserts.",
    includes: [
      "Fragrant White Basmati + Red Heirloom Country Rice",
      "Traditional Kalu Pol Chicken Curry or Spicy Fish Ambulthiyal",
      "Creamy Dhal (Parippu) Curry + Spicy Potato (Ala) Deviled",
      "Traditional Brinjal Moju (Sweet & sour eggplant)",
      "Fresh Coconut Sambol + Spicy Seeni Sambol + Fried Papadum",
      "Desserts: Creamy Watalappan + Fresh Fruit Salad & Vanilla Ice Cream",
      "Buffet warmers, high-end clay pots, and full banquet serving staff",
    ],
    addons: [
      {
        id: "add-3-1",
        name: "Live String Hopper Action Station (2 hours)",
        price: 35000,
      },
      { id: "add-3-2", name: "Watalappan Live Caramel Station", price: 18000 },
      {
        id: "add-3-3",
        name: "Premium Ice Carving centerpieces (pair)",
        price: 20000,
      },
      {
        id: "add-3-4",
        name: "Welcome Drink (Poli-Sambol Woodapple Nectar)",
        price: 12000,
      },
    ],
    bookedDates: ["2026-05-24", "2026-05-31", "2026-06-13", "2026-06-27"],
  },
  {
    id: "pkg-4",
    title: "Majestic Stage & Dancefloor Lighting",
    vendorName: "Golden Horizon Lighting",
    vendorId: "vendor-golden-horizon",
    vendorRating: 4.8,
    reviewsCount: 65,
    category: "lighting",
    location: "Gampaha",
    price: 85000,
    images: [
      "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?auto=format&fit=crop&q=80&w=800",
      "https://images.unsplash.com/photo-1506157786151-b8491531f063?auto=format&fit=crop&q=80&w=800",
      "https://images.unsplash.com/photo-1540039155733-5bb30b53aa14?auto=format&fit=crop&q=80&w=800",
    ],
    badge: "Best Value",
    description:
      "Transform your venue space with our computer-controlled moving head lighting fixtures, customized color ambient washes, and amazing haze effects for photos.",
    includes: [
      "4x High-Power LED Moving Heads (beams/patterns)",
      "12x Ambient LED PAR Wash Lights for pillars/stage",
      "1x High-Output Haze machine with fan",
      "Professional Light-Jockey controller with pre-programmed scenes",
      "8-foot T-Truss lighting stand setup",
      "2x Dedicated lighting technicians",
    ],
    addons: [
      {
        id: "add-4-1",
        name: "Heavy Dry Ice 'Dancing on Clouds' Fog",
        price: 18000,
      },
      {
        id: "add-4-2",
        name: "Cold Pyro Indoor Fountains (x4 shots)",
        price: 15000,
      },
      {
        id: "add-4-3",
        name: "Custom Monogram/Name Laser Gobo Projection",
        price: 10000,
      },
      {
        id: "add-4-4",
        name: "Extra Ambient Uplighters (10 units)",
        price: 8000,
      },
    ],
    bookedDates: ["2026-05-23", "2026-05-29", "2026-06-14", "2026-06-28"],
  },
  {
    id: "pkg-5",
    title: "Kandyan Mul Anduma & Bridal Costume Set",
    vendorName: "Silverline Bridal Wardrobe",
    vendorId: "vendor-silverline-bridal",
    vendorRating: 4.6,
    reviewsCount: 43,
    category: "costumes",
    location: "Kandy",
    price: 65000,
    images: [
      "https://images.unsplash.com/photo-1595777457583-95e059d581b8?auto=format&fit=crop&q=80&w=800",
      "https://images.unsplash.com/photo-1610030469668-93535c17b6b3?auto=format&fit=crop&q=80&w=800",
      "https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&q=80&w=800",
    ],
    badge: "Unique",
    description:
      "Premium rental of traditional Kandyan wedding costumes. High-quality velvet jackets, silver-threaded Mul Anduma set, and hand-crafted gold-plated traditional bridal jewellery.",
    includes: [
      "Royal Kandyan Mul Anduma Set for the Groom (Velvet jacket, custom drapery)",
      "Premium Silk Bridal Kandyan Saree/Osariya (White/Cream base)",
      "Complete 7-piece traditional gold-plated bridal jewellery set",
      "Helper/Stylist for Groom Mul Anduma draping (on-location service)",
      "Jewellery box and accessories rental (4 days duration)",
    ],
    addons: [
      {
        id: "add-5-1",
        name: "Additional Bridesmaid Saree Rental (each)",
        price: 10000,
      },
      {
        id: "add-5-2",
        name: "Bestman Traditional Groom's Costume Rental",
        price: 15000,
      },
      {
        id: "add-5-3",
        name: "Mul Anduma Traditional Gold Sword Prop",
        price: 5000,
      },
      {
        id: "add-5-4",
        name: "Flower Girl Traditional Dress Rental",
        price: 4000,
      },
    ],
    bookedDates: ["2026-05-24", "2026-05-30", "2026-06-06", "2026-06-20"],
  },
  {
    id: "pkg-6",
    title: "Gala Dinner Mega Sound & Stage Decor Setup",
    vendorName: "Vibe Creators & Audio Masters",
    vendorId: "vendor-vibe-creators",
    vendorRating: 5.0,
    reviewsCount: 37,
    category: "sounds",
    location: "Colombo",
    price: 450000,
    images: [
      "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&q=80&w=800",
      "https://images.unsplash.com/photo-1540039155733-5bb30b53aa14?auto=format&fit=crop&q=80&w=800",
      "https://images.unsplash.com/photo-1505232458729-5634d86d702a?auto=format&fit=crop&q=80&w=800",
    ],
    badge: "Elite Elite",
    description:
      "Our premium package for grand balls, corporate gatherings, and large scale celebrations. Features dual-line array speaker towers, stunning backdrop designs, and automated stage lighting.",
    includes: [
      "Full Line Array Speaker Tower Setup (suitable for up to 600 guests)",
      "40x20 ft Professional Stage with carpeted deck",
      "24x12 ft Grand Flower & LED Panel Backdrop Setup",
      "Premium Digital Sound Mixer with dedicated Audio Engineers",
      "Full venue uplighting & stage spotlight systems",
      "12x Wireless vocal & instrument microphones",
    ],
    addons: [
      {
        id: "add-6-1",
        name: "12x8 ft P3 Premium Outdoor LED Screen",
        price: 60000,
      },
      {
        id: "add-6-2",
        name: "Live Multi-cam 4K streaming setup",
        price: 30000,
      },
      {
        id: "add-6-3",
        name: "Extra Heavy-Duty Backup Generator (150KVA)",
        price: 45000,
      },
      {
        id: "add-6-4",
        name: "Action Fireworks Stage Finale (Indoor safe)",
        price: 25000,
      },
    ],
    bookedDates: ["2026-05-23", "2026-05-24", "2026-06-13", "2026-06-27"],
  },
];

export const MOCK_BOOKINGS = [
  {
    id: "bk-101",
    pkgTitle: "Silver Wedding Poruwa & Stage Deco",
    customerName: "Dr. Ruwan Perera",
    date: "2026-06-06",
    totalPrice: 175000,
    addons: ["Traditional Lotus Poruwa Upgrade"],
    status: "Confirmed",
    location: "Colombo",
  },
  {
    id: "bk-102",
    pkgTitle: "Club-Standard Sounds & DJ System",
    customerName: "Nimasha Fernando",
    date: "2026-05-30",
    totalPrice: 113000,
    addons: [
      "Smoke Machine with LED Lights",
      "Extra Pair of Surround Speakers",
    ],
    status: "Confirmed",
    location: "Colombo",
  },
  {
    id: "bk-103",
    pkgTitle: "Traditional Rice & Curry Feast (100 Pax)",
    customerName: "Sahan Gunawardena",
    date: "2026-06-13",
    totalPrice: 275000,
    addons: ["Live String Hopper Action Station (2 hours)"],
    status: "Pending Review",
    location: "Kandy",
  },
  {
    id: "bk-104",
    pkgTitle: "Majestic Stage & Dancefloor Lighting",
    customerName: "Vishwa Jayasundera",
    date: "2026-05-29",
    totalPrice: 118000,
    addons: [
      "Heavy Dry Ice 'Dancing on Clouds' Fog",
      "Custom Monogram/Name Laser Gobo Projection",
    ],
    status: "Pending Review",
    location: "Gampaha",
  },
];
