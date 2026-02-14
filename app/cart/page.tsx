"use client";

import Link from "next/link";
import { COLORS } from "@/app/data/products";
import { useCart } from "@/app/components/CartContext";

export default function CartPage() {
  const { cart, removeFromCart } = useCart();
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
            <Link href="/shop" style={{
              fontFamily: "var(--font-body)", fontSize: "0.68rem",
              fontWeight: 600, letterSpacing: "0.2em", textTransform: "uppercase",
              padding: "14px 44px", textDecoration: "none",
              background: COLORS.darkBrown, color: COLORS.cream,
              border: "none", display: "inline-block",
            }}>Continue Shopping</Link>
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
                  onMouseEnter={e => e.currentTarget.style.color = COLORS.caramel}
                  onMouseLeave={e => e.currentTarget.style.color = "var(--fg-muted)"}
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
              onMouseEnter={e => e.currentTarget.style.background = COLORS.caramel}
              onMouseLeave={e => e.currentTarget.style.background = COLORS.darkBrown}
            >Checkout</button>

            <p style={{
              textAlign: "center", marginTop: 12,
              fontFamily: "var(--font-body)", fontSize: "0.7rem", color: "var(--fg-muted)",
            }}>Shipping calculated at checkout • Free over $40</p>
          </div>
        )}
      </section>
    </div>
  );
}
