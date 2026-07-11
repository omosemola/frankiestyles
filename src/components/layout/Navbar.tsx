"use client";
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from 'framer-motion';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ShoppingBag, Heart, Menu, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useCartStore } from '@/store/useCartStore';
import { useWishlistStore } from '@/store/useWishlistStore';

export function Navbar() {
  const pathname = usePathname();
  const { scrollY } = useScroll();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { setIsOpen: setCartOpen, getTotalItems } = useCartStore();
  const { items: wishlistItems, setIsOpen: setWishlistOpen } = useWishlistStore();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useMotionValueEvent(scrollY, "change", (latest) => {
    setScrolled(latest > 50);
  });

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'Shop', href: '/shop' },
    { name: 'Categories', href: '/categories' },
    { name: 'About', href: '/about' },
    { name: 'Contact', href: '/contact' },
  ];

  // About page has a dark hero section at the top
  const hasDarkHero = pathname === '/about';
  // Use light text/logo (dark theme) ONLY if page has a dark hero AND user hasn't scrolled down
  const isDarkTheme = mounted && hasDarkHero && !scrolled;

  return (
    <>
      <header
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-[600ms] ease-in-out",
          isDarkTheme
            ? "bg-transparent text-white"
            : (mounted && scrolled)
              ? "bg-white/90 backdrop-blur-md text-[#0a0a0a] border-b border-gray-100 shadow-sm"
              : "bg-transparent text-[#0a0a0a]"
        )}
      >
        <div className="w-full relative">
          {/* Container for navigation items and right toolbar icons */}
          <div className="container mx-auto pl-0 pr-6 py-6 md:py-0 md:h-32 flex items-center justify-between relative">
            {/* Logo: In normal flow on mobile, absolute positioned on desktop */}
            <div className="md:absolute md:left-0 top-1/2 md:-translate-y-1/2 flex items-center z-10">
              <Link href="/" className="flex items-center">
                {/* Logo scales up and switches color based on scroll */}
                <img
                  src="/images/logo.png"
                  alt="Frankie Styles Logo"
                  className={cn(
                    "h-36 md:h-44 w-auto object-contain transition-all duration-[1000ms]",
                    isDarkTheme ? "invert brightness-0" : ""
                  )}
                />
              </Link>
            </div>

            {/* Left side empty spacer (balances the layout for centering the nav menu on desktop) */}
            <div className="w-48 hidden md:block flex-shrink-0" />

            <nav className="hidden md:flex items-center space-x-8">
              {navLinks.map((item) => (
                <Link key={item.name} href={item.href} className="text-sm font-semibold hover:opacity-70 transition-opacity tracking-wide uppercase">
                  {item.name}
                </Link>
              ))}
            </nav>

            <div className="flex items-center space-x-6 z-10">
              <button
                aria-label="Wishlist"
                onClick={() => setWishlistOpen(true)}
                className="hover:opacity-70 transition-opacity relative"
              >
                <Heart className="w-6 h-6" />
                {mounted && wishlistItems.length > 0 && (
                  <span className={cn(
                    "absolute -top-1.5 -right-2 text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center transition-colors duration-500",
                    !isDarkTheme ? "bg-[#0a0a0a] text-white" : "bg-white text-[#0a0a0a]"
                  )}>
                    {wishlistItems.length}
                  </span>
                )}
              </button>
              <button
                aria-label="Cart"
                onClick={() => setCartOpen(true)}
                className="hover:opacity-70 transition-opacity relative"
              >
                <ShoppingBag className="w-6 h-6" />
                {mounted && getTotalItems() > 0 && (
                  <span className={cn(
                    "absolute -top-1.5 -right-2 text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center transition-colors duration-500",
                    !isDarkTheme ? "bg-[#0a0a0a] text-white" : "bg-white text-[#0a0a0a]"
                  )}>
                    {getTotalItems()}
                  </span>
                )}
              </button>
              <button
                aria-label="Menu"
                onClick={() => setMobileMenuOpen(true)}
                className="md:hidden hover:opacity-70 transition-opacity"
              >
                <Menu className="w-6 h-6" />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Fullscreen Navigation Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: '-100%' }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: '-100%' }}
            transition={{ type: 'tween', duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-0 z-50 bg-[#0a0a0a] text-white flex flex-col justify-between p-8"
          >
            {/* Mobile Menu Header */}
            <div className="flex justify-between items-center h-24">
              <Link href="/" onClick={() => setMobileMenuOpen(false)}>
                <img
                  src="/images/logo.png"
                  alt="Frankie Styles Logo"
                  className="h-36 w-auto object-contain invert brightness-0"
                />
              </Link>
              <button
                onClick={() => setMobileMenuOpen(false)}
                className="p-2 hover:bg-white/10 rounded-full transition-colors"
                aria-label="Close menu"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Mobile Nav Links */}
            <nav className="flex flex-col space-y-6 text-center my-auto">
              {navLinks.map((item, idx) => (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.05 + 0.1 }}
                  key={item.name}
                >
                  <Link
                    href={item.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className="text-3xl font-bold tracking-widest uppercase hover:text-gray-400 transition-colors"
                  >
                    {item.name}
                  </Link>
                </motion.div>
              ))}
            </nav>

            {/* Footer / Extra info in mobile drawer */}
            <div className="text-center text-xs text-gray-500 tracking-widest uppercase">
              © {new Date().getFullYear()} Frankie Styles. Kaftan Et Al.
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
