"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { COLORS, BRAND } from "@/app/data/products";
import { InstagramIcon, TikTokIcon, BagIcon } from "./Icons";
import { useCart } from "./CartContext";

const navItems = [
  { href: "/", label: "Home" },
  { href: "/shop", label: "Shop" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const { cartCount } = useCart();

  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", h);
    return () => window.removeEventListener("scroll", h);
  }, []);

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname.startsWith(href);
  };

  return (
    <nav style={{
      position: "sticky", top: 0, zIndex: 100,
      background: "rgba(250,248,244,0.96)",
      backdropFilter: "blur(16px)",
      borderBottom: `1px solid ${scrolled ? "var(--border)" : "transparent"}`,
      transition: "all 0.35s ease",
    }}>
      <div style={{
        display: "grid",
        gridTemplateColumns: "1fr auto 1fr",
        alignItems: "center",
        height: 64, maxWidth: 1400, margin: "0 auto",
        padding: "0 clamp(16px, 3vw, 48px)",
      }}>
        {/* Left — Nav Links */}
        <div style={{ display: "flex", gap: 32, alignItems: "center" }}>
          {navItems.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              style={{
                textDecoration: "none",
                fontFamily: "var(--font-body)", fontSize: "0.72rem",
                fontWeight: isActive(href) ? 600 : 400,
                letterSpacing: "0.14em", textTransform: "uppercase",
                color: isActive(href) ? "var(--fg)" : "var(--fg-muted)",
                transition: "all 0.25s ease",
                position: "relative",
                paddingBottom: 2,
              }}
            >
              {label}
              {isActive(href) && (
                <span style={{
                  position: "absolute", bottom: -2, left: 0, right: 0,
                  height: 1.5, background: COLORS.caramel, borderRadius: 1,
                }} />
              )}
            </Link>
          ))}
        </div>

        {/* Center — Logo */}
        <div style={{
          display: "flex", alignItems: "center", justifyContent: "center",
          position: "relative",
          height: 44,
        }}>
          {/* Full name — visible at top */}
          <Link href="/" style={{
            textDecoration: "none",
            fontFamily: "var(--font-body)", fontSize: "0.82rem",
            fontWeight: 600, letterSpacing: "0.18em", textTransform: "uppercase",
            color: COLORS.darkBrown,
            opacity: scrolled ? 0 : 1,
            transform: scrolled ? "translateY(-6px)" : "translateY(0)",
            transition: "all 0.4s ease",
            position: "absolute",
            whiteSpace: "nowrap",
            pointerEvents: scrolled ? "none" : "auto",
          }}>
            BEAVERTAILGANG
          </Link>
          {/* Logo + BTG — visible on scroll */}
          <Link href="/" style={{
            textDecoration: "none",
            display: "flex", alignItems: "center", gap: 8,
            opacity: scrolled ? 1 : 0,
            transform: scrolled ? "translateY(0)" : "translateY(6px)",
            transition: "all 0.4s ease",
            pointerEvents: scrolled ? "auto" : "none",
          }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/btg-logo.png"
              alt="BeaverTailGang"
              width={28}
              height={28}
              style={{ objectFit: "contain" }}
            />
            <span style={{
              fontFamily: "var(--font-body)", fontSize: "1.5rem",
              fontWeight: 600, letterSpacing: "0.16em",
              color: COLORS.darkBrown,
            }}>
              BTG
            </span>
          </Link>
        </div>

        {/* Right — Social + Cart */}
        <div style={{ display: "flex", gap: 20, alignItems: "center", justifyContent: "flex-end" }}>
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
          <Link href="/cart" style={{
            color: "var(--fg-muted)", display: "flex", transition: "color 0.2s",
          }}
            onMouseEnter={e => e.currentTarget.style.color = "var(--fg)"}
            onMouseLeave={e => e.currentTarget.style.color = "var(--fg-muted)"}
          >
            <BagIcon count={cartCount} />
          </Link>
        </div>
      </div>
    </nav>
  );
}
