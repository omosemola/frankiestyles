"use client";
import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';

export function SignatureStyles() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 overflow-hidden py-2">
      {/* Left Card: Slide in from Left */}
      <motion.div
        initial={{ opacity: 0, x: -30 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: false, margin: "-40px" }}
        transition={{ duration: 0.8, ease: [0.16, 1, 1, 1] }}
        className="w-full"
      >
        <Link
          href="/shop?category=Agbadas"
          className="relative aspect-[16/9] overflow-hidden group rounded-lg cursor-pointer block smooth-shadow"
        >
          <img
            src="/images/kaftans-banner.jpg"
            className="object-cover w-full h-full transition-transform duration-1000 group-hover:scale-105"
            alt="Agbadas Category"
          />
          <div className="absolute inset-0 bg-[#0a0a0a]/20 transition-colors duration-500 group-hover:bg-[#0a0a0a]/40 flex items-center justify-center">
            <h3 className="text-2xl md:text-3xl font-bold text-white uppercase tracking-widest font-bodoni">Agbadas</h3>
          </div>
        </Link>
      </motion.div>

      {/* Right Card: Slide in from Right */}
      <motion.div
        initial={{ opacity: 0, x: 30 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: false, margin: "-40px" }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="w-full"
      >
        <Link
          href="/shop?category=Senator+Wears"
          className="relative aspect-[16/9] overflow-hidden group rounded-lg cursor-pointer block smooth-shadow"
        >
          <img
            src="/images/senator-banner.jpg"
            className="object-cover w-full h-full transition-transform duration-1000 group-hover:scale-105"
            alt="Senator Wears Category"
          />
          <div className="absolute inset-0 bg-[#0a0a0a]/20 transition-colors duration-500 group-hover:bg-[#0a0a0a]/40 flex items-center justify-center">
            <h3 className="text-2xl md:text-3xl font-bold text-white uppercase tracking-widest font-bodoni">Senator Wears</h3>
          </div>
        </Link>
      </motion.div>
    </div>
  );
}
