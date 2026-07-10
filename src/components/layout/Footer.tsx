import React from 'react';
import Link from 'next/link';

export function Footer() {
  return (
    <footer className="bg-[#0a0a0a] text-white pt-20 pb-10 border-t border-white/10">
      <div className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-12">
        <div className="flex flex-col items-center md:items-start mb-8 md:mb-0">
          <h2 className="text-2xl font-bold tracking-widest uppercase">Frankiestyles</h2>
          <p className="mt-4 text-gray-400 text-sm max-w-sm text-center md:text-left">
            Experience the epitome of luxury fashion. Curated collections for the modern aesthete.
          </p>
        </div>
        
        <div>
          <h3 className="text-sm font-semibold tracking-wider uppercase mb-6">Quick Links</h3>
          <ul className="space-y-4 text-sm text-white/60">
            <li><Link href="/shop" className="hover:text-white transition-colors">Shop</Link></li>
            <li><Link href="/categories" className="hover:text-white transition-colors">Categories</Link></li>
            <li><Link href="/about" className="hover:text-white transition-colors">About Us</Link></li>
            <li><Link href="/contact" className="hover:text-white transition-colors">Contact</Link></li>
          </ul>
        </div>
        
        <div>
          <h3 className="text-sm font-semibold tracking-wider uppercase mb-6">Customer Care</h3>
          <ul className="space-y-4 text-sm text-white/60">
            <li><Link href="/policies?tab=shipping" className="hover:text-white transition-colors">Shipping Policy</Link></li>
            <li><Link href="/policies?tab=refunds" className="hover:text-white transition-colors">Refund Policy</Link></li>
            <li><Link href="/contact" className="hover:text-white transition-colors">FAQ</Link></li>
            <li><Link href="/policies?tab=terms" className="hover:text-white transition-colors">Terms & Conditions</Link></li>
          </ul>
        </div>

        <div>
          <h3 className="text-sm font-semibold tracking-wider uppercase mb-6">Newsletter</h3>
          <p className="text-sm text-white/60 mb-4">Subscribe for exclusive offers and updates.</p>
          <form className="flex border-b border-white/20 pb-2">
            <input type="email" placeholder="Email Address" className="bg-transparent w-full text-sm outline-none placeholder:text-white/40 focus:placeholder:text-white/20" />
            <button type="submit" className="text-sm font-medium uppercase hover:text-white/70 transition-colors">Join</button>
          </form>
        </div>
      </div>
      
      <div className="container mx-auto px-6 mt-20 pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between text-xs text-white/40">
        <p>&copy; {new Date().getFullYear()} Frankiestyles. All rights reserved.</p>
        <div className="flex space-x-6 mt-4 md:mt-0">
          <Link href="/policies?tab=privacy" className="hover:text-white transition-colors">Privacy Policy</Link>
          <Link href="/policies?tab=terms" className="hover:text-white transition-colors">Terms of Service</Link>
        </div>
      </div>
    </footer>
  );
}
