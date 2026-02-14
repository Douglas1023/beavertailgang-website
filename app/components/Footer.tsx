"use client";

import Link from "next/link";
import Image from "next/image";
import { COLORS, BRAND, COLLECTIONS } from "@/app/data/products";
import { InstagramIcon, TikTokIcon } from "./Icons";

export default function Footer() {
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
          <Link href="/" style={{ textDecoration: "none", display: "flex", alignItems: "center", gap: 8, marginBottom: 10 }}>
            <Image
              src="/btg-logo.png"
              alt="BeaverTailGang"
              width={100}
              height={36}
              style={{ objectFit: "contain", height: "auto" }}
            />
          </Link>
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
              <Link key={c.id} href={`/shop/${c.id}`} style={{
                display: "block", textDecoration: "none",
                fontFamily: "var(--font-body)", fontSize: "0.78rem",
                color: "var(--fg-muted)", marginBottom: 7, transition: "color 0.2s",
              }}
                onMouseEnter={e => e.currentTarget.style.color = COLORS.caramel}
                onMouseLeave={e => e.currentTarget.style.color = "var(--fg-muted)"}
              >{c.name}</Link>
            ))}
          </div>
          <div>
            <p style={{
              fontFamily: "var(--font-body)", fontSize: "0.6rem",
              fontWeight: 600, letterSpacing: "0.15em",
              color: "var(--fg-muted)", marginBottom: 14,
            }}>INFO</p>
            {[
              { label: "About", href: "/about" },
              { label: "Contact", href: "/contact" },
            ].map(({ label, href }) => (
              <Link key={label} href={href} style={{
                display: "block", textDecoration: "none",
                fontFamily: "var(--font-body)", fontSize: "0.78rem",
                color: "var(--fg-muted)", marginBottom: 7, transition: "color 0.2s",
              }}
                onMouseEnter={e => e.currentTarget.style.color = COLORS.caramel}
                onMouseLeave={e => e.currentTarget.style.color = "var(--fg-muted)"}
              >{label}</Link>
            ))}
          </div>
        </div>
      </div>

      <div style={{
        borderTop: "1px solid var(--border)", paddingTop: 20,
        display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: 10,
      }}>
        <p style={{ fontFamily: "var(--font-body)", fontSize: "0.66rem", color: "var(--fg-muted)" }}>
          &copy; 2026 BeaverTailGang. All rights reserved.
        </p>
        <p style={{ fontFamily: "var(--font-body)", fontSize: "0.66rem", color: "var(--fg-muted)" }}>
          Austin, TX
        </p>
      </div>
    </footer>
  );
}
