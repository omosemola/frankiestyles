"use client";
import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/Button';
import { fadeUpVariant } from '@/lib/animations';
import Link from 'next/link';

export function HeroSection() {
  return (
    <section 
      className="relative min-h-screen flex items-center justify-center bg-white pt-40 pb-20 overflow-hidden"
    >
      {/* Foreground Centered Content Overlay (Text and Buttons) */}
      <motion.div 
        initial="hidden"
        animate="visible"
        variants={{
          hidden: { opacity: 0 },
          visible: { opacity: 1, transition: { staggerChildren: 0.15 } }
        }}
        className="relative z-10 container mx-auto px-6 text-center flex flex-col items-center justify-center max-w-3xl"
      >
        <div className="space-y-6 md:space-y-8 select-none">
          <motion.p 
            variants={fadeUpVariant}
            className="text-xs font-bold uppercase tracking-widest text-gray-400"
          >
            Frankie Styles • Custom Tailoring
          </motion.p>
          <motion.h1 
            variants={fadeUpVariant} 
            className="text-5xl md:text-8xl font-bold tracking-tight leading-[1.1] uppercase font-bodoni text-[#0a0a0a]"
          >
            PRESTIGE <br />
            REDEFINED
          </motion.h1>
          <motion.p 
            variants={fadeUpVariant} 
            className="text-sm md:text-base text-gray-500 font-light tracking-wide max-w-md mx-auto leading-relaxed"
          >
            Experience native wear at its absolute peak. Impeccable cuts, artisan embroidery, and bespoke silhouettes handcrafted for the modern gentleman.
          </motion.p>
        </div>

        <motion.div 
          variants={fadeUpVariant} 
          className="flex flex-col sm:flex-row justify-center items-center gap-4 px-6 w-full max-w-md mx-auto pt-10"
        >
          <Link href="/shop" className="w-full sm:w-auto">
            <Button size="lg" className="w-full sm:w-auto bg-black text-white hover:bg-black/90 uppercase tracking-widest text-xs font-semibold py-4 px-8 rounded-lg shadow-md shadow-black/10">
              Shop Collection
            </Button>
          </Link>
          <Link href="/contact" className="w-full sm:w-auto">
            <Button size="lg" variant="outline" className="w-full sm:w-auto border-black/20 text-black hover:bg-black hover:text-white uppercase tracking-widest text-xs font-semibold py-4 px-8 rounded-lg">
              Book Fitting
            </Button>
          </Link>
        </motion.div>
      </motion.div>
    </section>
  );
}
