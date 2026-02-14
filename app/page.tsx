"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { COLORS, BRAND, COLLECTIONS } from "@/app/data/products";
import { InstagramIcon, TikTokIcon } from "@/app/components/Icons";
import ProductCard from "@/app/components/ProductCard";

// ─── HERO ────────────────────────────────────────────────
function Hero() {
  return (
    <section style={{
      position: "relative",
      minHeight: "82vh",
      background: COLORS.cream,
      display: "flex", alignItems: "center", justifyContent: "center",
      overflow: "hidden",
    }}>
      {/* Subtle texture */}
      <div style={{
        position: "absolute", inset: 0,
        backgroundImage: `radial-gradient(circle at 50% 40%, ${COLORS.caramel}08 0%, transparent 60%)`,
      }} />

      <div style={{
        position: "relative", zIndex: 2,
        textAlign: "center", padding: "0 24px",
        maxWidth: 800,
      }}>
        <div className="fade-up d1" style={{ marginBottom: 28 }}>
          <Image
            src="/btg-full-logo.png"
            alt="BeaverTailGang"
            width={380}
            height={460}
            style={{ objectFit: "contain", margin: "0 auto" }}
            priority
          />
        </div>

        <div className="fade-up d2" style={{
          width: 50, height: 1, background: `${COLORS.caramel}88`,
          margin: "0 auto 24px",
        }} />

        <p className="fade-up d3" style={{
          fontFamily: "var(--font-display)", fontSize: "1.15rem",
          fontWeight: 500, fontStyle: "italic",
          color: COLORS.darkBrown,
          letterSpacing: "0.08em",
          marginBottom: 12,
        }}>
          {BRAND.tagline}
        </p>

        <p className="fade-up d4" style={{
          fontFamily: "var(--font-body)", fontSize: "0.82rem",
          lineHeight: 1.8, color: "var(--fg-muted)",
          maxWidth: 440, margin: "0 auto 36px",
          letterSpacing: "0.02em",
        }}>
          {BRAND.subtitle}
        </p>

        <div className="fade-up d5" style={{ display: "flex", gap: 14, justifyContent: "center", flexWrap: "wrap" }}>
          <Link
            href="/shop"
            style={{
              fontFamily: "var(--font-body)", fontSize: "0.7rem",
              fontWeight: 600, letterSpacing: "0.22em", textTransform: "uppercase",
              padding: "15px 42px", textDecoration: "none",
              background: COLORS.darkBrown, color: COLORS.cream,
              border: "none", cursor: "pointer",
              transition: "all 0.3s ease", display: "inline-block",
            }}
            onMouseEnter={e => { e.currentTarget.style.background = COLORS.caramel; }}
            onMouseLeave={e => { e.currentTarget.style.background = COLORS.darkBrown; }}
          >
            Shop Now
          </Link>
          <Link
            href="/about"
            style={{
              fontFamily: "var(--font-body)", fontSize: "0.7rem",
              fontWeight: 500, letterSpacing: "0.22em", textTransform: "uppercase",
              padding: "15px 42px", textDecoration: "none",
              background: "transparent", color: COLORS.darkBrown,
              border: `1px solid ${COLORS.darkBrown}33`, cursor: "pointer",
              transition: "all 0.3s ease", display: "inline-block",
            }}
            onMouseEnter={e => e.currentTarget.style.borderColor = COLORS.darkBrown}
            onMouseLeave={e => e.currentTarget.style.borderColor = `${COLORS.darkBrown}33`}
          >
            Our Story
          </Link>
        </div>
      </div>
    </section>
  );
}

// ─── COLLECTION BANNER ───────────────────────────────────
function CollectionBanner({ collection, index, isLight = false }: { collection: typeof COLLECTIONS[0]; index: number; isLight?: boolean }) {
  const [hovered, setHovered] = useState(false);
  const isEven = index % 2 === 0;

  const bgColor = isLight ? COLORS.cream : collection.heroColor;
  const textColor = isLight ? COLORS.darkBrown : COLORS.cream;
  const mutedTextColor = isLight ? "var(--fg-muted)" : `${COLORS.cream}55`;
  const accentColor = isLight ? COLORS.caramel : collection.accent;
  const glowColor = isLight ? COLORS.caramel : collection.accent;
  const circleColor = isLight ? `${COLORS.caramel}18` : `${collection.accent}12`;
  const linkColor = isLight ? COLORS.darkBrown : COLORS.cream;
  const borderColor = isLight ? COLORS.caramel : `${COLORS.caramel}88`;

  return (
    <Link
      href={`/shop/${collection.id}`}
      className={`fade-up d${index + 2}`}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        position: "relative",
        height: "clamp(280px, 45vh, 440px)",
        background: bgColor,
        cursor: "pointer", overflow: "hidden",
        display: "flex", flexDirection: "column",
        justifyContent: "center",
        padding: `0 clamp(36px, 7vw, 100px)`,
        alignItems: isEven ? "flex-start" : "flex-end",
        transition: "all 0.4s ease",
        textDecoration: "none",
        border: isLight ? "1px solid var(--border)" : "none",
      }}
    >
      {/* Accent glow */}
      <div style={{
        position: "absolute", inset: 0,
        background: `radial-gradient(ellipse at ${isEven ? '15% 55%' : '85% 45%'}, ${glowColor}20, transparent 55%)`,
        opacity: hovered ? 1 : 0.4, transition: "opacity 0.5s ease",
      }} />

      {/* Circle decoration */}
      <div style={{
        position: "absolute",
        ...(isEven ? { right: "8%" } : { left: "8%" }),
        top: "50%", transform: "translateY(-50%)",
        width: 180, height: 180,
        border: `1px solid ${circleColor}`,
        borderRadius: "50%",
      }} />

      <div style={{ position: "relative", zIndex: 2, textAlign: isEven ? "left" : "right" }}>
        <span style={{
          fontFamily: "var(--font-body)", fontSize: "0.58rem",
          fontWeight: 600, letterSpacing: "0.25em", textTransform: "uppercase",
          color: accentColor,
          background: `${accentColor}15`,
          padding: "5px 12px",
          display: "inline-block", marginBottom: 16,
        }}>
          {collection.tag}
        </span>
        <h2 style={{
          fontFamily: "var(--font-display)", fontSize: "clamp(2.2rem, 4.5vw, 4rem)",
          fontWeight: 500, color: textColor,
          letterSpacing: "0.06em", lineHeight: 1.05,
          marginBottom: 14,
          transform: hovered ? `translateX(${isEven ? 8 : -8}px)` : "translateX(0)",
          transition: "transform 0.5s cubic-bezier(0.16, 1, 0.3, 1)",
        }}>
          {collection.name}
        </h2>
        <p style={{
          fontFamily: "var(--font-body)", fontSize: "0.8rem",
          color: mutedTextColor, maxWidth: 380, lineHeight: 1.65,
          marginBottom: 20,
          marginLeft: isEven ? 0 : "auto",
        }}>
          {collection.description}
        </p>
        <span style={{
          fontFamily: "var(--font-body)", fontSize: "0.68rem",
          fontWeight: 600, letterSpacing: "0.18em", textTransform: "uppercase",
          color: linkColor,
          paddingBottom: 3,
          borderBottom: `1.5px solid ${borderColor}`,
        }}>
          See Collection
        </span>
      </div>
    </Link>
  );
}

// ─── HOME PAGE ───────────────────────────────────────────
export default function HomePage() {
  return (
    <div>
      <Hero />

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

        <div style={{ display: "flex", flexDirection: "column", gap: 70 }}>
          {COLLECTIONS.map((col, i) => (
            <CollectionBanner key={col.id} collection={col} index={i} isLight={i === 1} />
          ))}
        </div>
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
          <Link
            href="/shop"
            className="fade-up d2"
            style={{
              fontFamily: "var(--font-body)", fontSize: "0.68rem",
              fontWeight: 500, letterSpacing: "0.16em", textTransform: "uppercase",
              padding: "10px 28px", textDecoration: "none",
              background: "transparent", color: "var(--fg)",
              border: "1px solid var(--border)", cursor: "pointer",
              transition: "all 0.3s ease",
            }}
            onMouseEnter={e => { e.currentTarget.style.background = "var(--fg)"; e.currentTarget.style.color = "var(--bg)"; e.currentTarget.style.borderColor = "var(--fg)"; }}
            onMouseLeave={e => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = "var(--fg)"; e.currentTarget.style.borderColor = "var(--border)"; }}
          >
            View All →
          </Link>
        </div>

        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))",
          gap: "36px 20px",
        }}>
          {COLLECTIONS[1].products.map((p, i) => (
            <ProductCard key={p.id} product={p} delay={(i % 4) + 2} />
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

      {/* Community CTA */}
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
    </div>
  );
}
