"use client";

import Link from "next/link";
import { COLORS, COLLECTIONS } from "@/app/data/products";
import ProductCard from "@/app/components/ProductCard";

export default function ShopPage() {
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
            <Link
              key={c.id}
              href={`/shop/${c.id}`}
              style={{
                fontFamily: "var(--font-body)", fontSize: "0.65rem",
                fontWeight: 500, letterSpacing: "0.14em", textTransform: "uppercase",
                padding: "9px 22px", textDecoration: "none",
                background: "transparent", border: "1px solid var(--border)",
                cursor: "pointer", color: "var(--fg)", transition: "all 0.3s ease",
              }}
              onMouseEnter={e => { e.currentTarget.style.background = COLORS.darkBrown; e.currentTarget.style.color = COLORS.cream; e.currentTarget.style.borderColor = COLORS.darkBrown; }}
              onMouseLeave={e => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = "var(--fg)"; e.currentTarget.style.borderColor = "var(--border)"; }}
            >
              {c.name}
            </Link>
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
            <ProductCard key={p.id} product={p} delay={(i % 6) + 1} />
          ))}
        </div>
      </section>
    </div>
  );
}
