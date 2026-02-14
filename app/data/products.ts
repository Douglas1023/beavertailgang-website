// ─── BRAND CONFIG ────────────────────────────────────────
export const BRAND = {
  name: "BeaverTailGang",
  nameUpper: "BEAVERTAILGANG",
  tagline: "The #1 Hat in Golf",
  subtitle: "Every drop is designed with purpose. Once it's gone, it's gone.",
  description: "We don't chase trends. We create pieces you'll keep reaching for — round after round.",
  location: "Austin, TX",
  email: "hello@beavertailgang.com",
  instagram: "https://www.instagram.com/beavertailgang/",
  tiktok: "https://www.tiktok.com/@beavertailgang",
};

export const COLORS = {
  white: "#FFFFFF",
  caramel: "#A0703C",
  darkBrown: "#2B1D0E",
  gray: "#A8A8A8",
  olive: "#6B5132",
  cream: "#FAF8F4",
  warmBlack: "#1C1610",
};

export interface Product {
  id: number;
  name: string;
  price: number;
  category: string;
  sizes: string[];
  color: string;
}

export interface Collection {
  id: string;
  name: string;
  tag: string;
  description: string;
  heroColor: string;
  accent: string;
  products: Product[];
}

export const COLLECTIONS: Collection[] = [
  {
    id: "snapbacks",
    name: "SNAPBACKS",
    tag: "Core",
    description: "The hat that started it all. Clean lines, perfect fit, unmistakable on the course.",
    heroColor: COLORS.darkBrown,
    accent: COLORS.caramel,
    products: [
      { id: 1, name: "Classic BTG Snapback — Caramel", price: 38, category: "Snapback", sizes: ["OS"], color: COLORS.caramel },
      { id: 2, name: "Classic BTG Snapback — Onyx", price: 38, category: "Snapback", sizes: ["OS"], color: COLORS.warmBlack },
      { id: 3, name: "Classic BTG Snapback — Dark Brown", price: 38, category: "Snapback", sizes: ["OS"], color: COLORS.darkBrown },
      { id: 4, name: "Classic BTG Snapback — Gray", price: 38, category: "Snapback", sizes: ["OS"], color: COLORS.gray },
    ],
  },
  {
    id: "rope-hats",
    name: "ROPE HATS",
    tag: "New Drop",
    description: "The rope hat, done right. Premium build, limited colorways.",
    heroColor: COLORS.darkBrown,
    accent: COLORS.olive,
    products: [
      { id: 5, name: "Rope Hat — Cream / Brown", price: 42, category: "Rope Hat", sizes: ["OS"], color: "#E8DCCA" },
      { id: 6, name: "Rope Hat — Forest", price: 42, category: "Rope Hat", sizes: ["OS"], color: "#2D4A28" },
      { id: 7, name: "Rope Hat — Midnight", price: 42, category: "Rope Hat", sizes: ["OS"], color: "#1A1A2E" },
      { id: 8, name: "Rope Hat — Sand", price: 42, category: "Rope Hat", sizes: ["OS"], color: "#C4A87A" },
    ],
  },
  {
    id: "limited-drops",
    name: "LIMITED DROPS",
    tag: "Limited",
    description: "Once it's gone, it's gone. No restocks. No exceptions.",
    heroColor: COLORS.warmBlack,
    accent: COLORS.caramel,
    products: [
      { id: 9, name: "Collab Trucker — BTG x Austin", price: 45, category: "Trucker", sizes: ["OS"], color: COLORS.olive },
      { id: 10, name: "Vintage Wash Dad Hat — Espresso", price: 36, category: "Dad Hat", sizes: ["OS"], color: "#3E2723" },
      { id: 11, name: "Performance Cap — White/Brown", price: 40, category: "Performance", sizes: ["OS"], color: COLORS.white },
      { id: 12, name: "Bucket Hat — Olive", price: 44, category: "Bucket", sizes: ["S/M", "L/XL"], color: COLORS.olive },
    ],
  },
];
