"use client";

import { COLORS } from "@/app/data/products";

export function InstagramIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <circle cx="12" cy="12" r="5" />
      <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
    </svg>
  );
}

export function TikTokIcon() {
  return (
    <svg width="16" height="18" viewBox="0 0 16 18" fill="currentColor">
      <path d="M11.3 0h-2.6v12.3c0 1.4-1.1 2.5-2.5 2.5s-2.5-1.1-2.5-2.5 1.1-2.5 2.5-2.5c.3 0 .5 0 .8.1V7.2c-.3 0-.5-.1-.8-.1C3 7.1.5 9.6.5 12.8S3 18 6.2 18s5.7-2.5 5.7-5.7V5.9c1.1.8 2.4 1.2 3.8 1.2V4.5c-2.2 0-4.4-1.8-4.4-4.5z" />
    </svg>
  );
}

export function YouTubeIcon() {
  return (
    <svg width="20" height="18" viewBox="0 0 24 18" fill="currentColor">
      <path d="M23.5 3.5a3 3 0 00-2.1-2.1C19.5.8 12 .8 12 .8s-7.5 0-9.4.6A3 3 0 00.5 3.5C0 5.4 0 9 0 9s0 3.6.5 5.5a3 3 0 002.1 2.1c1.9.6 9.4.6 9.4.6s7.5 0 9.4-.6a3 3 0 002.1-2.1C24 12.6 24 9 24 9s0-3.6-.5-5.5zM9.6 12.8V5.2L15.8 9l-6.2 3.8z" />
    </svg>
  );
}

export function BagIcon({ count }: { count: number }) {
  return (
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
}
