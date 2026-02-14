"use client";

import { COLORS } from "@/app/data/products";

export default function MarqueeBanner() {
  const text = "THE #1 HAT IN GOLF\u00A0\u00A0\u00A0\u00A0•\u00A0\u00A0\u00A0\u00A0AUSTIN, TX\u00A0\u00A0\u00A0\u00A0•\u00A0\u00A0\u00A0\u00A0LIMITED DROPS\u00A0\u00A0\u00A0\u00A0•\u00A0\u00A0\u00A0\u00A0FREE SHIPPING OVER $40\u00A0\u00A0\u00A0\u00A0•\u00A0\u00A0\u00A0\u00A0";
  return (
    <div style={{
      background: COLORS.darkBrown,
      color: COLORS.cream,
      padding: "8px 0",
      overflow: "hidden",
      whiteSpace: "nowrap",
      fontSize: "0.62rem",
      fontFamily: "var(--font-body)",
      fontWeight: 500,
      letterSpacing: "0.2em",
    }}>
      <div style={{
        display: "inline-block",
        animation: "marquee 50s linear infinite",
      }}>
        {text.repeat(8)}
      </div>
    </div>
  );
}
