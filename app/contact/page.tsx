"use client";

import { useState } from "react";
import { COLORS, BRAND } from "@/app/data/products";

export default function ContactPage() {
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
          Questions, collabs, or just want to say what&apos;s up? Hit us.
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
                  onFocus={e => e.currentTarget.style.borderBottomColor = COLORS.caramel}
                  onBlur={e => e.currentTarget.style.borderBottomColor = "var(--border)"}
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
                onFocus={e => e.currentTarget.style.borderBottomColor = COLORS.caramel}
                onBlur={e => e.currentTarget.style.borderBottomColor = "var(--border)"}
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
              onMouseEnter={e => e.currentTarget.style.background = COLORS.caramel}
              onMouseLeave={e => e.currentTarget.style.background = COLORS.darkBrown}
            >
              Send Message
            </button>
          </div>
        ) : (
          <div className="fade-up" style={{ textAlign: "center", padding: "50px 0" }}>
            <p style={{ fontFamily: "var(--font-script)", fontSize: "2rem", color: COLORS.caramel, marginBottom: 10 }}>Sent!</p>
            <p style={{ fontFamily: "var(--font-body)", fontSize: "0.84rem", color: "var(--fg-muted)" }}>
              We&apos;ll get back to you soon. Appreciate you reaching out.
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
            { label: "YOUTUBE", value: "@beavertailgang" },
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
    </div>
  );
}
