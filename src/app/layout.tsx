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
  title: "Frankiestyles | Premium Luxury Fashion",
  description: "Experience the epitome of luxury fashion with Frankiestyles.",
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
