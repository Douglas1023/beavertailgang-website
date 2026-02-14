"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
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

function HamburgerIcon({ open }: { open: boolean }) {
  return (
    <div style={{
      width: 20, height: 14,
      position: "relative",
      cursor: "pointer",
      display: "flex", flexDirection: "column",
      justifyContent: "space-between",
    }}>
      <span style={{
        display: "block", width: "100%", height: 1.5,
        background: COLORS.darkBrown, borderRadius: 1,
        transition: "all 0.3s ease",
        transform: open ? "translateY(6.25px) rotate(45deg)" : "none",
      }} />
      <span style={{
        display: "block", width: "100%", height: 1.5,
        background: COLORS.darkBrown, borderRadius: 1,
        transition: "all 0.3s ease",
        opacity: open ? 0 : 1,
      }} />
      <span style={{
        display: "block", width: "100%", height: 1.5,
        background: COLORS.darkBrown, borderRadius: 1,
        transition: "all 0.3s ease",
        transform: open ? "translateY(-6.25px) rotate(-45deg)" : "none",
      }} />
    </div>
  );
}

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();
  const { cartCount } = useCart();
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", h);
    return () => window.removeEventListener("scroll", h);
  }, []);

  // Close menu on route change
  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  // Close menu when scrolling back to top
  useEffect(() => {
    if (!scrolled) setMenuOpen(false);
  }, [scrolled]);

  // Close menu on click outside
  useEffect(() => {
    if (!menuOpen) return;
    const handleClick = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [menuOpen]);

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname.startsWith(href);
  };

  return (
    <div style={{
      position: "sticky", top: 0, zIndex: 100,
      display: "flex", justifyContent: "center",
      padding: scrolled ? "10px 0" : "0",
      transition: "padding 0.6s cubic-bezier(0.16, 1, 0.3, 1)",
    }}>
      <div ref={menuRef} style={{
        width: scrolled ? "min(40vw, 520px)" : "100%",
        minWidth: scrolled ? 360 : "auto",
        transition: "all 0.6s cubic-bezier(0.16, 1, 0.3, 1)",
      }}>
        <nav style={{
          display: "flex", alignItems: "center", justifyContent: "space-between",
          height: scrolled ? 48 : 64,
          padding: scrolled ? "0 24px" : "0 clamp(16px, 3vw, 48px)",
          background: scrolled ? "rgba(160, 112, 60, 0.15)" : "rgba(250,248,244,0.96)",
          backdropFilter: scrolled ? "blur(20px)" : "blur(16px)",
          border: scrolled ? "1px solid rgba(160, 112, 60, 0.2)" : "1px solid transparent",
          borderRadius: scrolled ? 14 : 0,
          boxShadow: scrolled ? "0 4px 24px rgba(0,0,0,0.06)" : "none",
          transition: "all 0.6s cubic-bezier(0.16, 1, 0.3, 1)",
          maxWidth: scrolled ? "none" : 1400,
          margin: "0 auto",
        }}>
          {/* Left — Nav Links (full) / Hamburger (condensed) */}
          <div style={{ display: "flex", alignItems: "center", minWidth: 0 }}>
            {/* Hamburger — visible when scrolled */}
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              style={{
                background: "none", border: "none", cursor: "pointer",
                display: "flex", alignItems: "center",
                padding: 4,
                opacity: scrolled ? 1 : 0,
                width: scrolled ? "auto" : 0,
                overflow: "hidden",
                pointerEvents: scrolled ? "auto" : "none",
                transition: "opacity 0.4s ease, width 0.4s ease",
              }}
            >
              <HamburgerIcon open={menuOpen} />
            </button>

            {/* Nav Links — visible at top */}
            <div style={{
              display: "flex", gap: 32, alignItems: "center",
              opacity: scrolled ? 0 : 1,
              width: scrolled ? 0 : "auto",
              overflow: "hidden",
              pointerEvents: scrolled ? "none" : "auto",
              transition: "opacity 0.3s ease, width 0.4s ease",
            }}>
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
                    transition: "color 0.25s ease",
                    position: "relative",
                    paddingBottom: 2,
                    whiteSpace: "nowrap",
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
          </div>

          {/* Center — Brand name (full) / Logo + BTG (condensed) */}
          <Link href="/" style={{
            textDecoration: "none",
            display: "flex", alignItems: "center", gap: 8,
            whiteSpace: "nowrap",
            position: "absolute",
            left: "50%",
            transform: "translateX(-50%)",
          }}>
            {/* Logo image — visible when scrolled */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/btg-logo.png"
              alt="BeaverTailGang"
              width={26}
              height={26}
              style={{
                objectFit: "contain",
                opacity: scrolled ? 1 : 0,
                width: scrolled ? 26 : 0,
                transition: "opacity 0.4s ease, width 0.4s ease",
              }}
            />
            {/* BTG text — visible when scrolled */}
            <span style={{
              fontFamily: "var(--font-body)", fontSize: "1rem",
              fontWeight: 600, letterSpacing: "0.14em",
              color: COLORS.darkBrown,
              opacity: scrolled ? 1 : 0,
              width: scrolled ? "auto" : 0,
              overflow: "hidden",
              transition: "opacity 0.4s ease, width 0.4s ease",
            }}>
              BTG
            </span>
            {/* BEAVERTAILGANG text — visible at top */}
            <span style={{
              fontFamily: "var(--font-body)", fontSize: "0.82rem",
              fontWeight: 600, letterSpacing: "0.18em", textTransform: "uppercase",
              color: COLORS.darkBrown,
              opacity: scrolled ? 0 : 1,
              width: scrolled ? 0 : "auto",
              overflow: "hidden",
              transition: "opacity 0.3s ease, width 0.4s ease",
            }}>
              BEAVERTAILGANG
            </span>
          </Link>

          {/* Right — Social + Cart */}
          <div style={{ display: "flex", gap: scrolled ? 14 : 20, alignItems: "center", transition: "gap 0.6s ease" }}>
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
        </nav>

        {/* Dropdown menu */}
        <div style={{
          position: "absolute",
          top: "calc(100% + 8px)",
          left: "50%",
          transform: "translateX(-50%)",
          background: "rgba(250,248,244,0.95)",
          backdropFilter: "blur(20px)",
          border: `1px solid ${COLORS.darkBrown}12`,
          borderRadius: 16,
          padding: menuOpen ? "16px 32px" : "0 32px",
          boxShadow: "0 8px 32px rgba(0,0,0,0.08)",
          opacity: menuOpen ? 1 : 0,
          pointerEvents: menuOpen ? "auto" : "none",
          maxHeight: menuOpen ? 300 : 0,
          overflow: "hidden",
          transition: "all 0.35s cubic-bezier(0.16, 1, 0.3, 1)",
          display: "flex", flexDirection: "column", gap: 4,
          whiteSpace: "nowrap",
        }}>
          {navItems.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              onClick={() => setMenuOpen(false)}
              style={{
                textDecoration: "none",
                fontFamily: "var(--font-body)", fontSize: "0.78rem",
                fontWeight: isActive(href) ? 600 : 400,
                letterSpacing: "0.12em", textTransform: "uppercase",
                color: isActive(href) ? COLORS.darkBrown : "var(--fg-muted)",
                padding: "8px 0",
                transition: "color 0.2s ease",
                textAlign: "center",
                borderBottom: `1px solid ${COLORS.darkBrown}08`,
              }}
              onMouseEnter={e => e.currentTarget.style.color = COLORS.caramel}
              onMouseLeave={e => e.currentTarget.style.color = isActive(href) ? COLORS.darkBrown : "var(--fg-muted)"}
            >
              {label}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
