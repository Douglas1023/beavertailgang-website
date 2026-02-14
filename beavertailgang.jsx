import { useState, useEffect, useRef } from "react";

// ─── BRAND CONFIG ────────────────────────────────────────
const BRAND = {
  name: "Beaver Tail Gang",
  nameUpper: "BEAVER TAIL GANG",
  tagline: "The #1 Hat in Golf",
  subtitle: "Every drop is designed with purpose. Once it's gone, it's gone.",
  description: "We don't chase trends. We create pieces you'll keep reaching for — round after round.",
  location: "Austin, TX",
  email: "hello@beavertailgang.com",
  instagram: "https://www.instagram.com/beavertailgang/",
  tiktok: "https://www.tiktok.com/@beavertailgang",
};

const COLORS = {
  white: "#FFFFFF",
  caramel: "#A0703C",
  darkBrown: "#2B1D0E",
  gray: "#A8A8A8",
  maroon: "#4A0E1A",
  olive: "#6B5132",
  cream: "#FAF8F4",
  warmBlack: "#1C1610",
};

// ─── PRODUCTS ────────────────────────────────────────────
const COLLECTIONS = [
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
      { id: 3, name: "Classic BTG Snapback — Maroon", price: 38, category: "Snapback", sizes: ["OS"], color: COLORS.maroon },
      { id: 4, name: "Classic BTG Snapback — Gray", price: 38, category: "Snapback", sizes: ["OS"], color: COLORS.gray },
    ],
  },
  {
    id: "rope-hats",
    name: "ROPE HATS",
    tag: "New Drop",
    description: "The rope hat, done right. Premium build, limited colorways.",
    heroColor: COLORS.maroon,
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
    accent: COLORS.maroon,
    products: [
      { id: 9, name: "Collab Trucker — BTG x Austin", price: 45, category: "Trucker", sizes: ["OS"], color: COLORS.olive },
      { id: 10, name: "Vintage Wash Dad Hat — Espresso", price: 36, category: "Dad Hat", sizes: ["OS"], color: "#3E2723" },
      { id: 11, name: "Performance Cap — White/Brown", price: 40, category: "Performance", sizes: ["OS"], color: COLORS.white },
      { id: 12, name: "Bucket Hat — Olive", price: 44, category: "Bucket", sizes: ["S/M", "L/XL"], color: COLORS.olive },
    ],
  },
];

// ─── FONTS & STYLES ──────────────────────────────────────
const fontLink = document.createElement("link");
fontLink.href = "https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,500;0,600;0,700;1,400;1,500&family=Outfit:wght@300;400;500;600;700&family=Dancing+Script:wght@400;500;600;700&display=swap";
fontLink.rel = "stylesheet";
document.head.appendChild(fontLink);

const css = `
  :root {
    --font-display: 'Playfair Display', serif;
    --font-body: 'Outfit', sans-serif;
    --font-script: 'Dancing Script', cursive;
    --bg: ${COLORS.cream};
    --fg: ${COLORS.warmBlack};
    --fg-muted: #7A7168;
    --accent: ${COLORS.caramel};
    --maroon: ${COLORS.maroon};
    --border: #E5DED4;
    --dark: ${COLORS.darkBrown};
  }

  * { margin: 0; padding: 0; box-sizing: border-box; }

  body {
    font-family: var(--font-body);
    background: var(--bg);
    color: var(--fg);
    -webkit-font-smoothing: antialiased;
  }

  ::selection {
    background: ${COLORS.caramel}44;
    color: ${COLORS.darkBrown};
  }

  @keyframes fadeUp {
    from { opacity: 0; transform: translateY(24px); }
    to { opacity: 1; transform: translateY(0); }
  }

  @keyframes fadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
  }

  @keyframes wipe {
    from { width: 0; }
    to { width: 100%; }
  }

  .fade-up {
    animation: fadeUp 0.7s cubic-bezier(0.16, 1, 0.3, 1) forwards;
    opacity: 0;
  }

  .fade-in { animation: fadeIn 0.5s ease forwards; opacity: 0; }
  .d1 { animation-delay: 0.05s; }
  .d2 { animation-delay: 0.12s; }
  .d3 { animation-delay: 0.2s; }
  .d4 { animation-delay: 0.28s; }
  .d5 { animation-delay: 0.36s; }
  .d6 { animation-delay: 0.44s; }
  .d7 { animation-delay: 0.52s; }
  .d8 { animation-delay: 0.6s; }

  @keyframes marquee {
    0% { transform: translateX(0); }
    100% { transform: translateX(-50%); }
  }
`;

const styleEl = document.createElement("style");
styleEl.textContent = css;
document.head.appendChild(styleEl);

// ─── ICONS (inline SVGs) ────────────────────────────────
const InstagramIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
    <circle cx="12" cy="12" r="5" />
    <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
  </svg>
);

const TikTokIcon = () => (
  <svg width="16" height="18" viewBox="0 0 16 18" fill="currentColor">
    <path d="M11.3 0h-2.6v12.3c0 1.4-1.1 2.5-2.5 2.5s-2.5-1.1-2.5-2.5 1.1-2.5 2.5-2.5c.3 0 .5 0 .8.1V7.2c-.3 0-.5-.1-.8-.1C3 7.1.5 9.6.5 12.8S3 18 6.2 18s5.7-2.5 5.7-5.7V5.9c1.1.8 2.4 1.2 3.8 1.2V4.5c-2.2 0-4.4-1.8-4.4-4.5z" />
  </svg>
);

const BagIcon = ({ count }) => (
  <div style={{ position: "relative", display: "flex", alignItems: "center" }}>
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" />
      <line x1="3" y1="6" x2="21" y2="6" />
      <path d="M16 10a4 4 0 01-8 0" />
    </svg>
    {count > 0 && (
      <span style={{
        position: "absolute", top: -6, right: -8,
        background: COLORS.caramel, color: "#fff",
        borderRadius: "50%", width: 16, height: 16,
        display: "flex", alignItems: "center", justifyContent: "center",
        fontSize: "0.55rem", fontWeight: 700, fontFamily: "var(--font-body)",
      }}>{count}</span>
    )}
  </div>
);

// ─── MARQUEE BANNER ──────────────────────────────────────
function MarqueeBanner() {
  const text = "THE #1 HAT IN GOLF  •  AUSTIN, TX  •  LIMITED DROPS  •  FREE SHIPPING OVER $40  •  ";
  return (
    <div style={{
      background: COLORS.darkBrown,
      color: COLORS.cream,
      padding: "8px 0",
      overflow: "hidden",
      whiteSpace: "nowrap",
      fontSize: "0.62rem",
      fontFamily: "var(--font-body)",
      fontWeight: 500,
      letterSpacing: "0.2em",
    }}>
      <div style={{
        display: "inline-block",
        animation: "marquee 25s linear infinite",
      }}>
        {text.repeat(8)}
      </div>
    </div>
  );
}

// ─── NAV ─────────────────────────────────────────────────
function Nav({ currentPage, setPage, cartCount }) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const el = document.querySelector('.btg-scroll');
    if (!el) return;
    const h = () => setScrolled(el.scrollTop > 50);
    el.addEventListener("scroll", h);
    return () => el.removeEventListener("scroll", h);
  }, []);

  const navItems = [
    { key: "home", label: "Home" },
    { key: "shop", label: "Shop" },
    { key: "about", label: "About" },
    { key: "contact", label: "Contact" },
  ];

  return (
    <nav style={{
      position: "sticky", top: 0, zIndex: 100,
      background: scrolled ? "rgba(250,248,244,0.96)" : "rgba(250,248,244,0.96)",
      backdropFilter: "blur(16px)",
      borderBottom: `1px solid ${scrolled ? "var(--border)" : "transparent"}`,
      transition: "all 0.35s ease",
    }}>
      <div style={{
        display: "flex", alignItems: "center", justifyContent: "space-between",
        height: 64, maxWidth: 1400, margin: "0 auto",
        padding: "0 clamp(16px, 3vw, 48px)",
      }}>
        {/* Logo */}
        <button onClick={() => setPage("home")} style={{
          background: "none", border: "none", cursor: "pointer",
          display: "flex", alignItems: "baseline", gap: 0,
        }}>
          <span style={{
            fontFamily: "var(--font-script)", fontSize: "1.6rem",
            color: COLORS.darkBrown, fontWeight: 600,
          }}>Beaver Tail</span>
          <span style={{
            fontFamily: "var(--font-script)", fontSize: "1.2rem",
            color: COLORS.caramel, fontWeight: 500, marginLeft: 4,
          }}>Gang</span>
        </button>

        {/* Nav Links */}
        <div style={{ display: "flex", gap: 32, alignItems: "center" }}>
          {navItems.map(({ key, label }) => (
            <button
              key={key}
              onClick={() => setPage(key)}
              style={{
                background: "none", border: "none", cursor: "pointer",
                fontFamily: "var(--font-body)", fontSize: "0.72rem",
                fontWeight: currentPage === key ? 600 : 400,
                letterSpacing: "0.14em", textTransform: "uppercase",
                color: currentPage === key ? "var(--fg)" : "var(--fg-muted)",
                transition: "all 0.25s ease",
                position: "relative",
                paddingBottom: 2,
              }}
            >
              {label}
              {currentPage === key && (
                <span style={{
                  position: "absolute", bottom: -2, left: 0, right: 0,
                  height: 1.5, background: COLORS.caramel, borderRadius: 1,
                }} />
              )}
            </button>
          ))}

          {/* Social Icons */}
          <a href={BRAND.instagram} target="_blank" rel="noopener noreferrer"
            style={{ color: "var(--fg-muted)", display: "flex", transition: "color 0.2s" }}
            onMouseEnter={e => e.currentTarget.style.color = "var(--fg)"}
            onMouseLeave={e => e.currentTarget.style.color = "var(--fg-muted)"}
          >
            <InstagramIcon />
          </a>
          <a href={BRAND.tiktok} target="_blank" rel="noopener noreferrer"
            style={{ color: "var(--fg-muted)", display: "flex", transition: "color 0.2s" }}
            onMouseEnter={e => e.currentTarget.style.color = "var(--fg)"}
            onMouseLeave={e => e.currentTarget.style.color = "var(--fg-muted)"}
          >
            <TikTokIcon />
          </a>

          {/* Cart */}
          <button onClick={() => setPage("cart")} style={{
            background: "none", border: "none", cursor: "pointer",
            color: "var(--fg-muted)", display: "flex", transition: "color 0.2s",
          }}
            onMouseEnter={e => e.currentTarget.style.color = "var(--fg)"}
            onMouseLeave={e => e.currentTarget.style.color = "var(--fg-muted)"}
          >
            <BagIcon count={cartCount} />
          </button>
        </div>
      </div>
    </nav>
  );
}

// ─── HERO ────────────────────────────────────────────────
function Hero({ setPage }) {
  return (
    <section style={{
      position: "relative",
      minHeight: "82vh",
      background: `linear-gradient(160deg, ${COLORS.warmBlack} 0%, ${COLORS.darkBrown} 55%, ${COLORS.maroon}cc 100%)`,
      display: "flex", alignItems: "center", justifyContent: "center",
      overflow: "hidden",
    }}>
      {/* Texture */}
      <div style={{
        position: "absolute", inset: 0,
        backgroundImage: `
          radial-gradient(circle at 25% 75%, ${COLORS.caramel}18 0%, transparent 50%),
          radial-gradient(circle at 75% 25%, ${COLORS.maroon}20 0%, transparent 45%),
          url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.02'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")
        `,
      }} />

      {/* Decorative lines */}
      <div style={{ position: "absolute", top: "12%", left: "6%", width: 1, height: 140, background: `${COLORS.caramel}15`, transform: "rotate(20deg)" }} />
      <div style={{ position: "absolute", bottom: "15%", right: "8%", width: 1, height: 100, background: `${COLORS.caramel}10`, transform: "rotate(-25deg)" }} />
      <div style={{ position: "absolute", top: "40%", right: "15%", width: 60, height: 60, border: `1px solid ${COLORS.caramel}08`, borderRadius: "50%" }} />

      <div style={{
        position: "relative", zIndex: 2,
        textAlign: "center", padding: "0 24px",
        maxWidth: 800,
      }}>
        <p className="fade-up d1" style={{
          fontFamily: "var(--font-body)", fontSize: "0.68rem",
          letterSpacing: "0.35em", textTransform: "uppercase",
          color: `${COLORS.caramel}99`, marginBottom: 20,
          fontWeight: 500,
        }}>
          {BRAND.location}
        </p>

        {/* Script Logo */}
        <h1 className="fade-up d2" style={{
          fontFamily: "var(--font-script)",
          fontSize: "clamp(3.5rem, 10vw, 7rem)",
          fontWeight: 700,
          color: COLORS.cream,
          lineHeight: 1,
          marginBottom: 8,
        }}>
          Beaver Tail
        </h1>
        <p className="fade-up d3" style={{
          fontFamily: "var(--font-script)",
          fontSize: "clamp(1.8rem, 5vw, 3.2rem)",
          fontWeight: 500,
          color: COLORS.caramel,
          marginBottom: 28,
          marginTop: -8,
        }}>
          Gang
        </p>

        {/* Divider */}
        <div className="fade-up d3" style={{
          width: 50, height: 1, background: `${COLORS.caramel}66`,
          margin: "0 auto 24px",
        }} />

        <p className="fade-up d4" style={{
          fontFamily: "var(--font-display)", fontSize: "1.15rem",
          fontWeight: 500, fontStyle: "italic",
          color: `${COLORS.cream}cc`,
          letterSpacing: "0.08em",
          marginBottom: 12,
        }}>
          {BRAND.tagline}
        </p>

        <p className="fade-up d5" style={{
          fontFamily: "var(--font-body)", fontSize: "0.82rem",
          lineHeight: 1.8, color: `${COLORS.cream}66`,
          maxWidth: 440, margin: "0 auto 36px",
          letterSpacing: "0.02em",
        }}>
          {BRAND.subtitle}
        </p>

        <div className="fade-up d6" style={{ display: "flex", gap: 14, justifyContent: "center", flexWrap: "wrap" }}>
          <button
            onClick={() => setPage("shop")}
            style={{
              fontFamily: "var(--font-body)", fontSize: "0.7rem",
              fontWeight: 600, letterSpacing: "0.22em", textTransform: "uppercase",
              padding: "15px 42px",
              background: COLORS.caramel, color: COLORS.cream,
              border: "none", cursor: "pointer",
              transition: "all 0.3s ease",
            }}
            onMouseEnter={e => { e.target.style.background = COLORS.cream; e.target.style.color = COLORS.darkBrown; }}
            onMouseLeave={e => { e.target.style.background = COLORS.caramel; e.target.style.color = COLORS.cream; }}
          >
            Shop Now
          </button>
          <button
            onClick={() => setPage("about")}
            style={{
              fontFamily: "var(--font-body)", fontSize: "0.7rem",
              fontWeight: 500, letterSpacing: "0.22em", textTransform: "uppercase",
              padding: "15px 42px",
              background: "transparent", color: COLORS.cream,
              border: `1px solid ${COLORS.cream}33`, cursor: "pointer",
              transition: "all 0.3s ease",
            }}
            onMouseEnter={e => e.target.style.borderColor = `${COLORS.cream}88`}
            onMouseLeave={e => e.target.style.borderColor = `${COLORS.cream}33`}
          >
            Our Story
          </button>
        </div>
      </div>

      {/* Bottom gradient */}
      <div style={{
        position: "absolute", bottom: 0, left: 0, right: 0, height: 100,
        background: `linear-gradient(to top, ${COLORS.cream}, transparent)`,
      }} />
    </section>
  );
}

// ─── COLLECTION BANNER ───────────────────────────────────
function CollectionBanner({ collection, index, onClick }) {
  const [hovered, setHovered] = useState(false);
  const isEven = index % 2 === 0;

  return (
    <div
      className={`fade-up d${index + 2}`}
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        position: "relative",
        height: "clamp(280px, 45vh, 440px)",
        background: collection.heroColor,
        cursor: "pointer", overflow: "hidden",
        display: "flex", flexDirection: "column",
        justifyContent: "center",
        padding: `0 clamp(36px, 7vw, 100px)`,
        alignItems: isEven ? "flex-start" : "flex-end",
        transition: "all 0.4s ease",
      }}
    >
      {/* Accent glow */}
      <div style={{
        position: "absolute", inset: 0,
        background: `radial-gradient(ellipse at ${isEven ? '15% 55%' : '85% 45%'}, ${collection.accent}20, transparent 55%)`,
        opacity: hovered ? 1 : 0.4, transition: "opacity 0.5s ease",
      }} />

      {/* Hat silhouette decoration */}
      <div style={{
        position: "absolute",
        [isEven ? "right" : "left"]: "8%",
        top: "50%", transform: "translateY(-50%)",
        width: 180, height: 180,
        border: `1px solid ${collection.accent}12`,
        borderRadius: "50%",
      }} />

      <div style={{ position: "relative", zIndex: 2, textAlign: isEven ? "left" : "right" }}>
        <span style={{
          fontFamily: "var(--font-body)", fontSize: "0.58rem",
          fontWeight: 600, letterSpacing: "0.25em", textTransform: "uppercase",
          color: collection.accent,
          background: `${collection.accent}15`,
          padding: "5px 12px",
          display: "inline-block", marginBottom: 16,
        }}>
          {collection.tag}
        </span>
        <h2 style={{
          fontFamily: "var(--font-display)", fontSize: "clamp(2.2rem, 4.5vw, 4rem)",
          fontWeight: 500, color: COLORS.cream,
          letterSpacing: "0.06em", lineHeight: 1.05,
          marginBottom: 14,
          transform: hovered ? `translateX(${isEven ? 8 : -8}px)` : "translateX(0)",
          transition: "transform 0.5s cubic-bezier(0.16, 1, 0.3, 1)",
        }}>
          {collection.name}
        </h2>
        <p style={{
          fontFamily: "var(--font-body)", fontSize: "0.8rem",
          color: `${COLORS.cream}55`, maxWidth: 380, lineHeight: 1.65,
          marginBottom: 20,
          marginLeft: isEven ? 0 : "auto",
        }}>
          {collection.description}
        </p>
        <span style={{
          fontFamily: "var(--font-body)", fontSize: "0.68rem",
          fontWeight: 600, letterSpacing: "0.18em", textTransform: "uppercase",
          color: COLORS.cream,
          paddingBottom: 3,
          borderBottom: `1.5px solid ${COLORS.caramel}88`,
        }}>
          See Collection
        </span>
      </div>
    </div>
  );
}

// ─── PRODUCT CARD ────────────────────────────────────────
function ProductCard({ product, onAdd, delay = 0 }) {
  const [hovered, setHovered] = useState(false);
  const [selectedSize, setSelectedSize] = useState(product.sizes.length === 1 ? product.sizes[0] : null);
  const [added, setAdded] = useState(false);

  const handleAdd = (e) => {
    e.stopPropagation();
    if (selectedSize) {
      onAdd(product, selectedSize);
      setAdded(true);
      setTimeout(() => setAdded(false), 1200);
    }
  };

  return (
    <div
      className={`fade-up d${delay}`}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{ cursor: "pointer" }}
    >
      {/* Product Swatch */}
      <div style={{
        position: "relative",
        aspectRatio: "4/5",
        background: `linear-gradient(145deg, ${product.color}ee, ${product.color}99, ${product.color}bb)`,
        marginBottom: 14,
        overflow: "hidden",
        transition: "transform 0.4s ease",
        transform: hovered ? "scale(1.01)" : "scale(1)",
      }}>
        {/* Cross-hatch pattern */}
        <div style={{
          position: "absolute", inset: 0,
          backgroundImage: `
            repeating-linear-gradient(45deg, transparent, transparent 40px, rgba(255,255,255,0.015) 40px, rgba(255,255,255,0.015) 41px),
            repeating-linear-gradient(-45deg, transparent, transparent 40px, rgba(255,255,255,0.015) 40px, rgba(255,255,255,0.015) 41px)
          `,
        }} />

        {/* BTG watermark */}
        <div style={{
          position: "absolute", inset: 0,
          display: "flex", alignItems: "center", justifyContent: "center",
          flexDirection: "column", gap: 4,
        }}>
          <span style={{
            fontFamily: "var(--font-script)", fontSize: "1.6rem",
            color: "rgba(255,255,255,0.1)", fontWeight: 600,
          }}>BTG</span>
          <span style={{
            fontFamily: "var(--font-body)", fontSize: "0.5rem",
            letterSpacing: "0.3em", textTransform: "uppercase",
            color: "rgba(255,255,255,0.06)",
          }}>Product Image</span>
        </div>

        {/* Quick add overlay */}
        <div style={{
          position: "absolute", bottom: 0, left: 0, right: 0,
          background: `${COLORS.warmBlack}ee`,
          backdropFilter: "blur(8px)",
          padding: "14px 16px",
          transform: hovered ? "translateY(0)" : "translateY(100%)",
          transition: "transform 0.35s cubic-bezier(0.16, 1, 0.3, 1)",
        }}>
          {product.sizes.length > 1 && (
            <div style={{ display: "flex", gap: 5, marginBottom: 10, flexWrap: "wrap" }}>
              {product.sizes.map(s => (
                <button
                  key={s}
                  onClick={(e) => { e.stopPropagation(); setSelectedSize(s); }}
                  style={{
                    fontFamily: "var(--font-body)", fontSize: "0.6rem",
                    fontWeight: 500, letterSpacing: "0.08em",
                    padding: "5px 14px",
                    background: selectedSize === s ? COLORS.caramel : "transparent",
                    color: selectedSize === s ? "#fff" : `${COLORS.cream}88`,
                    border: `1px solid ${selectedSize === s ? COLORS.caramel : `${COLORS.cream}25`}`,
                    cursor: "pointer", transition: "all 0.2s ease",
                  }}
                >
                  {s}
                </button>
              ))}
            </div>
          )}
          <button
            onClick={handleAdd}
            style={{
              width: "100%",
              fontFamily: "var(--font-body)", fontSize: "0.65rem",
              fontWeight: 600, letterSpacing: "0.16em", textTransform: "uppercase",
              padding: "10px",
              background: added ? "#4a7c59" : (selectedSize ? COLORS.caramel : `${COLORS.cream}12`),
              color: added ? "#fff" : (selectedSize ? "#fff" : `${COLORS.cream}30`),
              border: "none",
              cursor: selectedSize ? "pointer" : "default",
              transition: "all 0.25s ease",
            }}
          >
            {added ? "Added!" : (selectedSize ? "Add to Bag" : "Select Size")}
          </button>
        </div>
      </div>

      <p style={{
        fontFamily: "var(--font-body)", fontSize: "0.62rem",
        letterSpacing: "0.12em", color: COLORS.caramel,
        marginBottom: 4, textTransform: "uppercase", fontWeight: 600,
      }}>
        {product.category}
      </p>
      <h3 style={{
        fontFamily: "var(--font-display)", fontSize: "0.98rem",
        fontWeight: 500, color: "var(--fg)",
        marginBottom: 5, lineHeight: 1.3,
      }}>
        {product.name}
      </h3>
      <p style={{
        fontFamily: "var(--font-body)", fontSize: "0.82rem",
        fontWeight: 500, color: "var(--fg)",
      }}>
        ${product.price}
      </p>
    </div>
  );
}

// ─── PAGES ───────────────────────────────────────────────

function HomePage({ setPage, setActiveCollection, addToCart }) {
  return (
    <div>
      <Hero setPage={setPage} />

      {/* Collections */}
      <section style={{ padding: "80px 0 0" }}>
        <div style={{ textAlign: "center", marginBottom: 50, padding: "0 24px" }}>
          <p className="fade-up" style={{
            fontFamily: "var(--font-body)", fontSize: "0.62rem",
            letterSpacing: "0.3em", textTransform: "uppercase",
            color: "var(--fg-muted)", marginBottom: 10,
          }}>
            Explore
          </p>
          <h2 className="fade-up d1" style={{
            fontFamily: "var(--font-display)", fontSize: "clamp(1.8rem, 3.5vw, 2.8rem)",
            fontWeight: 500, letterSpacing: "0.06em",
          }}>
            OUR COLLECTIONS
          </h2>
        </div>

        {COLLECTIONS.map((col, i) => (
          <CollectionBanner
            key={col.id}
            collection={col}
            index={i}
            onClick={() => { setActiveCollection(col.id); setPage("collection"); }}
          />
        ))}
      </section>

      {/* New Arrivals Grid */}
      <section style={{
        padding: "90px clamp(16px, 3vw, 48px)",
        maxWidth: 1400, margin: "0 auto",
      }}>
        <div style={{
          display: "flex", justifyContent: "space-between",
          alignItems: "flex-end", marginBottom: 44, flexWrap: "wrap", gap: 16,
        }}>
          <div>
            <p className="fade-up" style={{
              fontFamily: "var(--font-body)", fontSize: "0.62rem",
              letterSpacing: "0.3em", textTransform: "uppercase",
              color: "var(--fg-muted)", marginBottom: 10,
            }}>
              Just Dropped
            </p>
            <h2 className="fade-up d1" style={{
              fontFamily: "var(--font-display)", fontSize: "clamp(1.8rem, 3.5vw, 2.8rem)",
              fontWeight: 500, letterSpacing: "0.06em",
            }}>
              NEW ARRIVALS
            </h2>
          </div>
          <button
            onClick={() => setPage("shop")}
            className="fade-up d2"
            style={{
              fontFamily: "var(--font-body)", fontSize: "0.68rem",
              fontWeight: 500, letterSpacing: "0.16em", textTransform: "uppercase",
              padding: "10px 28px",
              background: "transparent", color: "var(--fg)",
              border: "1px solid var(--border)", cursor: "pointer",
              transition: "all 0.3s ease",
            }}
            onMouseEnter={e => { e.target.style.background = "var(--fg)"; e.target.style.color = "var(--bg)"; e.target.style.borderColor = "var(--fg)"; }}
            onMouseLeave={e => { e.target.style.background = "transparent"; e.target.style.color = "var(--fg)"; e.target.style.borderColor = "var(--border)"; }}
          >
            View All →
          </button>
        </div>

        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))",
          gap: "36px 20px",
        }}>
          {COLLECTIONS[1].products.map((p, i) => (
            <ProductCard key={p.id} product={p} onAdd={addToCart} delay={(i % 4) + 2} />
          ))}
        </div>
      </section>

      {/* Brand Statement */}
      <section style={{
        padding: "80px clamp(16px, 3vw, 48px)",
        background: COLORS.darkBrown,
        textAlign: "center",
        position: "relative", overflow: "hidden",
      }}>
        <div style={{
          position: "absolute", inset: 0,
          background: `radial-gradient(ellipse at 50% 50%, ${COLORS.caramel}10, transparent 60%)`,
        }} />
        <div style={{ maxWidth: 620, margin: "0 auto", position: "relative", zIndex: 2 }}>
          <p style={{
            fontFamily: "var(--font-script)", fontSize: "1.2rem",
            color: COLORS.caramel, marginBottom: 20,
          }}>BTG</p>
          <p style={{
            fontFamily: "var(--font-display)", fontSize: "clamp(1.5rem, 3vw, 2.4rem)",
            fontWeight: 400, fontStyle: "italic",
            color: COLORS.cream,
            lineHeight: 1.5, letterSpacing: "0.02em",
          }}>
            {BRAND.description}
          </p>
          <div style={{
            width: 36, height: 1.5, background: COLORS.caramel,
            margin: "28px auto 0", borderRadius: 1,
          }} />
        </div>
      </section>

      {/* DM to be featured */}
      <section style={{
        padding: "60px clamp(16px, 3vw, 48px)",
        textAlign: "center",
      }}>
        <p style={{
          fontFamily: "var(--font-body)", fontSize: "0.62rem",
          letterSpacing: "0.3em", textTransform: "uppercase",
          color: "var(--fg-muted)", marginBottom: 14,
        }}>Community</p>
        <h2 style={{
          fontFamily: "var(--font-display)", fontSize: "clamp(1.6rem, 3vw, 2.4rem)",
          fontWeight: 500, marginBottom: 16,
        }}>
          DM Us to Be Featured
        </h2>
        <p style={{
          fontFamily: "var(--font-body)", fontSize: "0.84rem",
          color: "var(--fg-muted)", maxWidth: 400, margin: "0 auto 24px",
          lineHeight: 1.7,
        }}>
          Tag @beavertailgang or send us your best on-course photos wearing BTG.
        </p>
        <div style={{ display: "flex", gap: 16, justifyContent: "center" }}>
          <a href={BRAND.instagram} target="_blank" rel="noopener noreferrer"
            style={{
              display: "inline-flex", alignItems: "center", gap: 8,
              fontFamily: "var(--font-body)", fontSize: "0.7rem",
              fontWeight: 600, letterSpacing: "0.16em", textTransform: "uppercase",
              padding: "12px 32px",
              background: COLORS.darkBrown, color: COLORS.cream,
              textDecoration: "none",
              transition: "all 0.3s ease",
            }}
            onMouseEnter={e => e.currentTarget.style.background = COLORS.caramel}
            onMouseLeave={e => e.currentTarget.style.background = COLORS.darkBrown}
          >
            <InstagramIcon /> Instagram
          </a>
          <a href={BRAND.tiktok} target="_blank" rel="noopener noreferrer"
            style={{
              display: "inline-flex", alignItems: "center", gap: 8,
              fontFamily: "var(--font-body)", fontSize: "0.7rem",
              fontWeight: 600, letterSpacing: "0.16em", textTransform: "uppercase",
              padding: "12px 32px",
              background: "transparent", color: "var(--fg)",
              textDecoration: "none",
              border: "1px solid var(--border)",
              transition: "all 0.3s ease",
            }}
            onMouseEnter={e => { e.currentTarget.style.background = "var(--fg)"; e.currentTarget.style.color = "var(--bg)"; }}
            onMouseLeave={e => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = "var(--fg)"; }}
          >
            <TikTokIcon /> TikTok
          </a>
        </div>
      </section>

      <Footer setPage={setPage} />
    </div>
  );
}

function ShopPage({ setPage, setActiveCollection, addToCart }) {
  const allProducts = COLLECTIONS.flatMap(c => c.products);

  return (
    <div>
      <section style={{
        padding: "50px clamp(16px, 3vw, 48px) 36px",
        maxWidth: 1400, margin: "0 auto",
      }}>
        <p className="fade-up" style={{
          fontFamily: "var(--font-body)", fontSize: "0.62rem",
          letterSpacing: "0.3em", textTransform: "uppercase",
          color: "var(--fg-muted)", marginBottom: 10,
        }}>Browse</p>
        <h1 className="fade-up d1" style={{
          fontFamily: "var(--font-display)", fontSize: "clamp(2.2rem, 4.5vw, 3.6rem)",
          fontWeight: 500, letterSpacing: "0.05em", marginBottom: 36,
        }}>
          SHOP ALL
        </h1>

        <div className="fade-up d2" style={{
          display: "flex", gap: 12, marginBottom: 44, flexWrap: "wrap",
        }}>
          {COLLECTIONS.map(c => (
            <button
              key={c.id}
              onClick={() => { setActiveCollection(c.id); setPage("collection"); }}
              style={{
                fontFamily: "var(--font-body)", fontSize: "0.65rem",
                fontWeight: 500, letterSpacing: "0.14em", textTransform: "uppercase",
                padding: "9px 22px",
                background: "transparent", border: "1px solid var(--border)",
                cursor: "pointer", color: "var(--fg)", transition: "all 0.3s ease",
              }}
              onMouseEnter={e => { e.target.style.background = COLORS.darkBrown; e.target.style.color = COLORS.cream; e.target.style.borderColor = COLORS.darkBrown; }}
              onMouseLeave={e => { e.target.style.background = "transparent"; e.target.style.color = "var(--fg)"; e.target.style.borderColor = "var(--border)"; }}
            >
              {c.name}
            </button>
          ))}
        </div>
      </section>

      <section style={{
        padding: "0 clamp(16px, 3vw, 48px) 90px",
        maxWidth: 1400, margin: "0 auto",
      }}>
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))",
          gap: "36px 20px",
        }}>
          {allProducts.map((p, i) => (
            <ProductCard key={p.id} product={p} onAdd={addToCart} delay={(i % 6) + 1} />
          ))}
        </div>
      </section>
      <Footer setPage={setPage} />
    </div>
  );
}

function CollectionPage({ collectionId, addToCart, setPage }) {
  const collection = COLLECTIONS.find(c => c.id === collectionId) || COLLECTIONS[0];

  return (
    <div>
      <section style={{
        position: "relative",
        height: "44vh", minHeight: 320,
        background: `linear-gradient(150deg, ${collection.heroColor}, ${collection.heroColor}dd)`,
        display: "flex", alignItems: "center", justifyContent: "center",
        overflow: "hidden",
      }}>
        <div style={{
          position: "absolute", inset: 0,
          background: `radial-gradient(ellipse at 50% 50%, ${collection.accent}18, transparent 55%)`,
        }} />
        <div style={{ position: "relative", zIndex: 2, textAlign: "center" }}>
          <span className="fade-up" style={{
            fontFamily: "var(--font-body)", fontSize: "0.58rem",
            fontWeight: 600, letterSpacing: "0.25em", textTransform: "uppercase",
            color: collection.accent,
            background: `${collection.accent}15`, padding: "5px 14px",
            display: "inline-block", marginBottom: 18,
          }}>{collection.tag}</span>
          <h1 className="fade-up d1" style={{
            fontFamily: "var(--font-display)", fontSize: "clamp(2.6rem, 6vw, 5rem)",
            fontWeight: 500, color: COLORS.cream,
            letterSpacing: "0.06em", lineHeight: 1,
          }}>
            {collection.name}
          </h1>
          <p className="fade-up d2" style={{
            fontFamily: "var(--font-body)", fontSize: "0.82rem",
            color: `${COLORS.cream}55`, marginTop: 18,
            maxWidth: 380, margin: "18px auto 0",
          }}>{collection.description}</p>
        </div>
        <div style={{
          position: "absolute", bottom: 0, left: 0, right: 0, height: 70,
          background: `linear-gradient(to top, ${COLORS.cream}, transparent)`,
        }} />
      </section>

      <section style={{
        padding: "50px clamp(16px, 3vw, 48px) 90px",
        maxWidth: 1400, margin: "0 auto",
      }}>
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))",
          gap: "36px 20px",
        }}>
          {collection.products.map((p, i) => (
            <ProductCard key={p.id} product={p} onAdd={addToCart} delay={(i % 4) + 1} />
          ))}
        </div>
      </section>

      <div style={{ textAlign: "center", paddingBottom: 70 }}>
        <button onClick={() => setPage("shop")} style={{
          fontFamily: "var(--font-body)", fontSize: "0.68rem",
          fontWeight: 500, letterSpacing: "0.18em", textTransform: "uppercase",
          padding: "12px 36px", background: "transparent", color: "var(--fg)",
          border: "1px solid var(--border)", cursor: "pointer", transition: "all 0.3s ease",
        }}
          onMouseEnter={e => { e.target.style.background = "var(--fg)"; e.target.style.color = "var(--bg)"; }}
          onMouseLeave={e => { e.target.style.background = "transparent"; e.target.style.color = "var(--fg)"; }}
        >
          ← Back to Shop
        </button>
      </div>
      <Footer setPage={setPage} />
    </div>
  );
}

function AboutPage({ setPage }) {
  return (
    <div>
      <section style={{
        padding: "70px clamp(16px, 3vw, 48px)",
        maxWidth: 760, margin: "0 auto",
      }}>
        <p className="fade-up" style={{
          fontFamily: "var(--font-body)", fontSize: "0.62rem",
          letterSpacing: "0.3em", textTransform: "uppercase",
          color: "var(--fg-muted)", marginBottom: 10,
        }}>Our Story</p>
        <h1 className="fade-up d1" style={{
          fontFamily: "var(--font-display)", fontSize: "clamp(2.2rem, 4.5vw, 3.6rem)",
          fontWeight: 500, letterSpacing: "0.05em", marginBottom: 44,
        }}>ABOUT BTG</h1>

        <div className="fade-up d2" style={{
          fontFamily: "var(--font-body)", fontSize: "0.9rem",
          lineHeight: 1.85, color: "var(--fg-muted)",
          display: "flex", flexDirection: "column", gap: 24,
        }}>
          <p>
            BeaverTailGang started with one idea: make the best golf hat out there. Not the most hyped. Not the trendiest. Just the one you grab every single round without thinking twice.
          </p>
          <p>
            Based in Austin, Texas, BTG runs on limited drops. When a colorway sells out, it's done — no restocks, no exceptions. That's not a gimmick. It's how we keep things intentional.
          </p>
          <p>
            Our community of 11,000+ golfers isn't built on algorithms. It's built on people who play the game, wear the hat, and tag us from courses all over the country. DM us to get featured — that's always been the move.
          </p>
          <p>
            Every piece we make is designed with purpose. We don't chase trends. We create what we'd want to wear on the course — and we think you will too.
          </p>

          <div style={{
            display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
            gap: 36, marginTop: 36, paddingTop: 36,
            borderTop: "1px solid var(--border)",
          }}>
            {[
              { title: "LIMITED DROPS", desc: "Once it's gone, it's gone. Every hat is intentionally scarce." },
              { title: "BUILT FOR THE COURSE", desc: "Premium materials, clean fits, designed to perform." },
              { title: "AUSTIN, TX", desc: "Independent brand, rooted in Texas golf culture." },
              { title: "COMMUNITY FIRST", desc: "11K+ strong. DM us to be featured." },
            ].map((v, i) => (
              <div key={i}>
                <h3 style={{
                  fontFamily: "var(--font-display)", fontSize: "0.92rem",
                  fontWeight: 600, letterSpacing: "0.08em",
                  marginBottom: 8, color: "var(--fg)",
                }}>{v.title}</h3>
                <p style={{ fontSize: "0.8rem", lineHeight: 1.65 }}>{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      <Footer setPage={setPage} />
    </div>
  );
}

function ContactPage({ setPage }) {
  const [sent, setSent] = useState(false);

  return (
    <div>
      <section style={{
        padding: "70px clamp(16px, 3vw, 48px)",
        maxWidth: 660, margin: "0 auto",
      }}>
        <p className="fade-up" style={{
          fontFamily: "var(--font-body)", fontSize: "0.62rem",
          letterSpacing: "0.3em", textTransform: "uppercase",
          color: "var(--fg-muted)", marginBottom: 10,
        }}>Get in Touch</p>
        <h1 className="fade-up d1" style={{
          fontFamily: "var(--font-display)", fontSize: "clamp(2.2rem, 4.5vw, 3.6rem)",
          fontWeight: 500, letterSpacing: "0.05em", marginBottom: 16,
        }}>CONTACT</h1>
        <p className="fade-up d2" style={{
          fontFamily: "var(--font-body)", fontSize: "0.86rem",
          color: "var(--fg-muted)", lineHeight: 1.7, marginBottom: 44,
        }}>
          Questions, collabs, wholesale, or just want to say what's up? Hit us.
        </p>

        {!sent ? (
          <div className="fade-up d3" style={{ display: "flex", flexDirection: "column", gap: 22 }}>
            {[
              { label: "NAME", type: "text", ph: "Your name" },
              { label: "EMAIL", type: "email", ph: "your@email.com" },
            ].map(f => (
              <div key={f.label}>
                <label style={{
                  fontFamily: "var(--font-body)", fontSize: "0.6rem",
                  fontWeight: 600, letterSpacing: "0.15em",
                  color: "var(--fg-muted)", display: "block", marginBottom: 7,
                }}>{f.label}</label>
                <input type={f.type} placeholder={f.ph} style={{
                  width: "100%", padding: "12px 0",
                  fontFamily: "var(--font-body)", fontSize: "0.86rem",
                  border: "none", borderBottom: "1px solid var(--border)",
                  background: "transparent", color: "var(--fg)",
                  outline: "none", transition: "border-color 0.3s",
                }}
                  onFocus={e => e.target.style.borderBottomColor = COLORS.caramel}
                  onBlur={e => e.target.style.borderBottomColor = "var(--border)"}
                />
              </div>
            ))}
            <div>
              <label style={{
                fontFamily: "var(--font-body)", fontSize: "0.6rem",
                fontWeight: 600, letterSpacing: "0.15em",
                color: "var(--fg-muted)", display: "block", marginBottom: 7,
              }}>MESSAGE</label>
              <textarea placeholder="What's on your mind?" rows={4} style={{
                width: "100%", padding: "12px 0",
                fontFamily: "var(--font-body)", fontSize: "0.86rem",
                border: "none", borderBottom: "1px solid var(--border)",
                background: "transparent", color: "var(--fg)",
                outline: "none", resize: "vertical", transition: "border-color 0.3s",
              }}
                onFocus={e => e.target.style.borderBottomColor = COLORS.caramel}
                onBlur={e => e.target.style.borderBottomColor = "var(--border)"}
              />
            </div>
            <button onClick={() => setSent(true)} style={{
              alignSelf: "flex-start",
              fontFamily: "var(--font-body)", fontSize: "0.68rem",
              fontWeight: 600, letterSpacing: "0.2em", textTransform: "uppercase",
              padding: "14px 44px", marginTop: 8,
              background: COLORS.darkBrown, color: COLORS.cream,
              border: "none", cursor: "pointer", transition: "all 0.3s ease",
            }}
              onMouseEnter={e => e.target.style.background = COLORS.caramel}
              onMouseLeave={e => e.target.style.background = COLORS.darkBrown}
            >
              Send Message
            </button>
          </div>
        ) : (
          <div className="fade-up" style={{ textAlign: "center", padding: "50px 0" }}>
            <p style={{ fontFamily: "var(--font-script)", fontSize: "2rem", color: COLORS.caramel, marginBottom: 10 }}>Sent!</p>
            <p style={{ fontFamily: "var(--font-body)", fontSize: "0.84rem", color: "var(--fg-muted)" }}>
              We'll get back to you soon. Appreciate you reaching out.
            </p>
          </div>
        )}

        <div className="fade-up d4" style={{
          marginTop: 70, paddingTop: 36,
          borderTop: "1px solid var(--border)",
          display: "flex", gap: 44, flexWrap: "wrap",
        }}>
          {[
            { label: "EMAIL", value: BRAND.email },
            { label: "LOCATION", value: BRAND.location },
            { label: "INSTAGRAM", value: "@beavertailgang" },
            { label: "TIKTOK", value: "@beavertailgang" },
          ].map(({ label, value }) => (
            <div key={label}>
              <p style={{
                fontFamily: "var(--font-body)", fontSize: "0.6rem",
                fontWeight: 600, letterSpacing: "0.15em",
                color: "var(--fg-muted)", marginBottom: 6,
              }}>{label}</p>
              <p style={{ fontFamily: "var(--font-body)", fontSize: "0.84rem" }}>{value}</p>
            </div>
          ))}
        </div>
      </section>
      <Footer setPage={setPage} />
    </div>
  );
}

function CartPage({ cart, removeFromCart, setPage }) {
  const total = cart.reduce((s, i) => s + i.product.price * i.qty, 0);

  return (
    <div>
      <section style={{
        padding: "70px clamp(16px, 3vw, 48px)",
        maxWidth: 760, margin: "0 auto",
      }}>
        <h1 className="fade-up" style={{
          fontFamily: "var(--font-display)", fontSize: "clamp(2.2rem, 4.5vw, 3.6rem)",
          fontWeight: 500, letterSpacing: "0.05em", marginBottom: 44,
        }}>YOUR BAG</h1>

        {cart.length === 0 ? (
          <div className="fade-up d1" style={{ textAlign: "center", padding: "50px 0" }}>
            <p style={{ fontFamily: "var(--font-body)", fontSize: "0.86rem", color: "var(--fg-muted)", marginBottom: 26 }}>
              Your bag is empty.
            </p>
            <button onClick={() => setPage("shop")} style={{
              fontFamily: "var(--font-body)", fontSize: "0.68rem",
              fontWeight: 600, letterSpacing: "0.2em", textTransform: "uppercase",
              padding: "14px 44px",
              background: COLORS.darkBrown, color: COLORS.cream,
              border: "none", cursor: "pointer",
            }}>Continue Shopping</button>
          </div>
        ) : (
          <div className="fade-up d1">
            {cart.map((item, i) => (
              <div key={i} style={{
                display: "flex", alignItems: "center", gap: 18,
                padding: "20px 0", borderBottom: "1px solid var(--border)",
              }}>
                <div style={{
                  width: 72, height: 90,
                  background: `linear-gradient(135deg, ${item.product.color}ee, ${item.product.color}88)`,
                  flexShrink: 0, display: "flex", alignItems: "center", justifyContent: "center",
                }}>
                  <span style={{ fontFamily: "var(--font-script)", fontSize: "0.7rem", color: "rgba(255,255,255,0.15)" }}>BTG</span>
                </div>
                <div style={{ flex: 1 }}>
                  <p style={{ fontFamily: "var(--font-display)", fontSize: "0.95rem", fontWeight: 500, marginBottom: 3 }}>
                    {item.product.name}
                  </p>
                  <p style={{ fontFamily: "var(--font-body)", fontSize: "0.72rem", color: "var(--fg-muted)" }}>
                    Size: {item.size} — Qty: {item.qty}
                  </p>
                </div>
                <p style={{ fontFamily: "var(--font-body)", fontSize: "0.86rem", fontWeight: 500, marginRight: 14 }}>
                  ${item.product.price * item.qty}
                </p>
                <button onClick={() => removeFromCart(i)} style={{
                  background: "none", border: "none", cursor: "pointer",
                  fontFamily: "var(--font-body)", fontSize: "0.72rem", color: "var(--fg-muted)",
                  padding: "4px 8px", transition: "color 0.2s",
                }}
                  onMouseEnter={e => e.target.style.color = COLORS.maroon}
                  onMouseLeave={e => e.target.style.color = "var(--fg-muted)"}
                >✕</button>
              </div>
            ))}

            <div style={{
              display: "flex", justifyContent: "space-between", alignItems: "center",
              padding: "26px 0",
            }}>
              <p style={{
                fontFamily: "var(--font-body)", fontSize: "0.7rem",
                letterSpacing: "0.15em", textTransform: "uppercase", color: "var(--fg-muted)",
              }}>Subtotal</p>
              <p style={{ fontFamily: "var(--font-display)", fontSize: "1.4rem", fontWeight: 500 }}>
                ${total}
              </p>
            </div>

            <button style={{
              width: "100%",
              fontFamily: "var(--font-body)", fontSize: "0.7rem",
              fontWeight: 600, letterSpacing: "0.2em", textTransform: "uppercase",
              padding: "16px",
              background: COLORS.darkBrown, color: COLORS.cream,
              border: "none", cursor: "pointer", transition: "all 0.3s ease",
            }}
              onMouseEnter={e => e.target.style.background = COLORS.caramel}
              onMouseLeave={e => e.target.style.background = COLORS.darkBrown}
            >Checkout</button>

            <p style={{
              textAlign: "center", marginTop: 12,
              fontFamily: "var(--font-body)", fontSize: "0.7rem", color: "var(--fg-muted)",
            }}>Shipping calculated at checkout • Free over $40</p>
          </div>
        )}
      </section>
      <Footer setPage={setPage} />
    </div>
  );
}

// ─── FOOTER ──────────────────────────────────────────────
function Footer({ setPage }) {
  return (
    <footer style={{
      padding: "50px clamp(16px, 3vw, 48px) 32px",
      borderTop: "1px solid var(--border)",
      maxWidth: 1400, margin: "0 auto",
    }}>
      <div style={{
        display: "flex", justifyContent: "space-between",
        flexWrap: "wrap", gap: 36, marginBottom: 36,
      }}>
        <div>
          <div style={{ display: "flex", alignItems: "baseline", gap: 0, marginBottom: 10 }}>
            <span style={{ fontFamily: "var(--font-script)", fontSize: "1.4rem", color: COLORS.darkBrown, fontWeight: 600 }}>
              Beaver Tail
            </span>
            <span style={{ fontFamily: "var(--font-script)", fontSize: "1rem", color: COLORS.caramel, marginLeft: 4 }}>
              Gang
            </span>
          </div>
          <p style={{
            fontFamily: "var(--font-body)", fontSize: "0.78rem",
            color: "var(--fg-muted)", lineHeight: 1.6, maxWidth: 260,
          }}>
            The #1 Hat in Golf.<br />Austin, TX.
          </p>
          <div style={{ display: "flex", gap: 14, marginTop: 14 }}>
            <a href={BRAND.instagram} target="_blank" rel="noopener noreferrer"
              style={{ color: "var(--fg-muted)", transition: "color 0.2s" }}
              onMouseEnter={e => e.currentTarget.style.color = COLORS.caramel}
              onMouseLeave={e => e.currentTarget.style.color = "var(--fg-muted)"}
            ><InstagramIcon /></a>
            <a href={BRAND.tiktok} target="_blank" rel="noopener noreferrer"
              style={{ color: "var(--fg-muted)", transition: "color 0.2s" }}
              onMouseEnter={e => e.currentTarget.style.color = COLORS.caramel}
              onMouseLeave={e => e.currentTarget.style.color = "var(--fg-muted)"}
            ><TikTokIcon /></a>
          </div>
        </div>

        <div style={{ display: "flex", gap: 44, flexWrap: "wrap" }}>
          <div>
            <p style={{
              fontFamily: "var(--font-body)", fontSize: "0.6rem",
              fontWeight: 600, letterSpacing: "0.15em",
              color: "var(--fg-muted)", marginBottom: 14,
            }}>SHOP</p>
            {COLLECTIONS.map(c => (
              <button key={c.id} onClick={() => setPage("shop")} style={{
                display: "block", background: "none", border: "none",
                fontFamily: "var(--font-body)", fontSize: "0.78rem",
                color: "var(--fg-muted)", cursor: "pointer",
                marginBottom: 7, padding: 0, transition: "color 0.2s",
              }}
                onMouseEnter={e => e.target.style.color = COLORS.caramel}
                onMouseLeave={e => e.target.style.color = "var(--fg-muted)"}
              >{c.name}</button>
            ))}
          </div>
          <div>
            <p style={{
              fontFamily: "var(--font-body)", fontSize: "0.6rem",
              fontWeight: 600, letterSpacing: "0.15em",
              color: "var(--fg-muted)", marginBottom: 14,
            }}>INFO</p>
            {["About", "Contact", "Shipping", "Returns"].map(l => (
              <button key={l} onClick={() => setPage(l.toLowerCase())} style={{
                display: "block", background: "none", border: "none",
                fontFamily: "var(--font-body)", fontSize: "0.78rem",
                color: "var(--fg-muted)", cursor: "pointer",
                marginBottom: 7, padding: 0, transition: "color 0.2s",
              }}
                onMouseEnter={e => e.target.style.color = COLORS.caramel}
                onMouseLeave={e => e.target.style.color = "var(--fg-muted)"}
              >{l}</button>
            ))}
          </div>
        </div>
      </div>

      <div style={{
        borderTop: "1px solid var(--border)", paddingTop: 20,
        display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: 10,
      }}>
        <p style={{ fontFamily: "var(--font-body)", fontSize: "0.66rem", color: "var(--fg-muted)" }}>
          © 2026 BeaverTailGang. All rights reserved.
        </p>
        <p style={{ fontFamily: "var(--font-body)", fontSize: "0.66rem", color: "var(--fg-muted)" }}>
          Austin, TX
        </p>
      </div>
    </footer>
  );
}

// ─── APP ─────────────────────────────────────────────────
export default function App() {
  const [page, setPage] = useState("home");
  const [activeCollection, setActiveCollection] = useState(null);
  const [cart, setCart] = useState([]);
  const scrollRef = useRef(null);

  const nav = (p) => {
    setPage(p);
    if (scrollRef.current) scrollRef.current.scrollTop = 0;
  };

  const addToCart = (product, size) => {
    setCart(prev => {
      const idx = prev.findIndex(i => i.product.id === product.id && i.size === size);
      if (idx >= 0) {
        const u = [...prev];
        u[idx] = { ...u[idx], qty: u[idx].qty + 1 };
        return u;
      }
      return [...prev, { product, size, qty: 1 }];
    });
  };

  const removeFromCart = (i) => setCart(p => p.filter((_, idx) => idx !== i));
  const cartCount = cart.reduce((s, i) => s + i.qty, 0);

  return (
    <div style={{ width: "100%", height: "100vh", overflow: "hidden", background: "var(--bg)" }}>
      <div ref={scrollRef} className="btg-scroll" style={{ width: "100%", height: "100%", overflowY: "auto", overflowX: "hidden" }}>
        <MarqueeBanner />
        <Nav currentPage={page} setPage={nav} cartCount={cartCount} />

        {page === "home" && <HomePage setPage={nav} setActiveCollection={setActiveCollection} addToCart={addToCart} />}
        {page === "shop" && <ShopPage setPage={nav} setActiveCollection={setActiveCollection} addToCart={addToCart} />}
        {page === "collection" && <CollectionPage collectionId={activeCollection} addToCart={addToCart} setPage={nav} />}
        {page === "about" && <AboutPage setPage={nav} />}
        {page === "contact" && <ContactPage setPage={nav} />}
        {page === "cart" && <CartPage cart={cart} removeFromCart={removeFromCart} setPage={nav} />}
      </div>
    </div>
  );
}
