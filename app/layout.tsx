import type { Metadata } from "next";
import "./globals.css";
import { CartProvider } from "./components/CartContext";

import Nav from "./components/Nav";
import Footer from "./components/Footer";

export const metadata: Metadata = {
  title: "BeaverTailGang — The #1 Hat in Golf",
  description: "Limited drop golf hats from Austin, TX. Once it's gone, it's gone. Snapbacks, rope hats, truckers, dad hats, and buckets.",
  openGraph: {
    title: "BeaverTailGang — The #1 Hat in Golf",
    description: "Limited drop golf hats from Austin, TX. Once it's gone, it's gone.",
    images: [{ url: "/BTG-OG.png" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "BeaverTailGang — The #1 Hat in Golf",
    description: "Limited drop golf hats from Austin, TX. Once it's gone, it's gone.",
    images: ["/BTG-OG.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,500;0,600;0,700;1,400;1,500&family=Outfit:wght@300;400;500;600;700&family=Dancing+Script:wght@400;500;600;700&family=Special+Elite&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <CartProvider>
          <Nav />
          <main>{children}</main>
          <Footer />
        </CartProvider>
      </body>
    </html>
  );
}
