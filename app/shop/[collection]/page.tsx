"use client";

import { use } from "react";
import Link from "next/link";
import { COLORS, COLLECTIONS } from "@/app/data/products";
import ProductCard from "@/app/components/ProductCard";

export default function CollectionPage({ params }: { params: Promise<{ collection: string }> }) {
  const { collection: collectionId } = use(params);
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
            color: `${COLORS.cream}55`,
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
            <ProductCard key={p.id} product={p} delay={(i % 4) + 1} />
          ))}
        </div>
      </section>

      <div style={{ textAlign: "center", paddingBottom: 70 }}>
        <Link href="/shop" style={{
          fontFamily: "var(--font-body)", fontSize: "0.68rem",
          fontWeight: 500, letterSpacing: "0.18em", textTransform: "uppercase",
          padding: "12px 36px", background: "transparent", color: "var(--fg)",
          border: "1px solid var(--border)", cursor: "pointer", transition: "all 0.3s ease",
          textDecoration: "none", display: "inline-block",
        }}
          onMouseEnter={e => { e.currentTarget.style.background = "var(--fg)"; e.currentTarget.style.color = "var(--bg)"; }}
          onMouseLeave={e => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = "var(--fg)"; }}
        >
          ← Back to Shop
        </Link>
      </div>
    </div>
  );
}
