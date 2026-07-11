import type { Metadata } from "next";
import { Manrope, Poppins, Bodoni_Moda } from "next/font/google";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { CartDrawer } from "@/components/shop/CartDrawer";
import { WishlistDrawer } from "@/components/shop/WishlistDrawer";
import "./globals.css";

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
  display: "swap",
});

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const bodoni = Bodoni_Moda({
  variable: "--font-bodoni",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Frankie Styles | Premium Luxury Bespoke Fashion",
    template: "%s | Frankie Styles"
  },
  description: "Experience the epitome of luxury native fashion with Frankie Styles. Handcrafted Kaftans, Agbadas, and Two-Piece sets tailored to perfection.",
  openGraph: {
    title: "Frankie Styles | Premium Luxury Bespoke Fashion",
    description: "Experience the epitome of luxury native fashion with Frankie Styles. Handcrafted Kaftans, Agbadas, and Two-Piece sets tailored to perfection.",
    type: "website",
    url: "https://frankiestyles.com",
    siteName: "Frankie Styles",
    images: [
      {
        url: "/images/royal-banner.jpg",
        width: 1200,
        height: 630,
        alt: "Frankie Styles Luxury Traditional Wear",
      }
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Frankie Styles | Premium Luxury Bespoke Fashion",
    description: "Experience the epitome of luxury native fashion with Frankie Styles. Handcrafted Kaftans, Agbadas, and Two-Piece sets tailored to perfection.",
    images: ["/images/royal-banner.jpg"],
  },
  metadataBase: new URL("https://frankiestyles.com"),
};

export default function RootLayout({
  children,
  }: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${manrope.variable} ${poppins.variable} ${bodoni.variable}`}>
      <body className="antialiased min-h-screen flex flex-col bg-[var(--background)]">
        <Navbar />
        <main className="flex-grow">
          {children}
        </main>
        <CartDrawer />
        <WishlistDrawer />
        <Footer />
      </body>
    </html>
  );
}
