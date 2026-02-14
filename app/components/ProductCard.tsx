"use client";

import { useState } from "react";
import { COLORS, type Product } from "@/app/data/products";
import { useCart } from "./CartContext";

export default function ProductCard({ product, delay = 0 }: { product: Product; delay?: number }) {
  const [hovered, setHovered] = useState(false);
  const [selectedSize, setSelectedSize] = useState(product.sizes.length === 1 ? product.sizes[0] : null);
  const [added, setAdded] = useState(false);
  const { addToCart } = useCart();

  const handleAdd = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (selectedSize) {
      addToCart(product, selectedSize);
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
