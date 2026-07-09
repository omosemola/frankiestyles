"use client";
import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Button } from '@/components/ui/Button';
import { fadeUpVariant } from '@/lib/animations';
import Link from 'next/link';

export function HeroSection() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"]
  });
  
  // Parallax transitions
  const yText = useTransform(scrollYProgress, [0, 1], ["0%", "15%"]);
  const opacityText = useTransform(scrollYProgress, [0, 1], [1, 0]);

  return (
    <section 
      ref={ref} 
      className="relative h-screen min-h-[750px] flex items-center justify-center bg-white overflow-hidden"
    >
      {/* Top Tagline (Repositioned slightly lower) */}
      <motion.div
        style={{ y: yText, opacity: opacityText }}
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2, delay: 0.1 }}
        className="absolute top-36 md:top-40 left-0 right-0 z-20 text-center pointer-events-none select-none"
      >
        <p className="text-xs font-bold uppercase tracking-widest text-[#0a0a0a]">
          Frankie Styles • Custom Tailoring
        </p>
      </motion.div>

      {/* Foreground Centered Content Overlay (Text and Buttons) */}
      <motion.div 
        style={{ y: yText, opacity: opacityText }}
        initial="hidden"
        animate="visible"
        variants={{
          hidden: { opacity: 0 },
          visible: { opacity: 1, transition: { staggerChildren: 0.15 } }
        }}
        className="relative z-10 container mx-auto px-6 text-center flex flex-col items-center justify-center h-full max-w-3xl pt-24"
      >
        <div className="space-y-6 md:space-y-8 select-none">
          <motion.h1 
            variants={fadeUpVariant} 
            className="text-5xl md:text-8xl font-bold tracking-tight leading-[1.1] uppercase font-bodoni text-[#0a0a0a]"
          >
            PRESTIGE <br />
            REDEFINED
          </motion.h1>
          <motion.p 
            variants={fadeUpVariant} 
            className="text-sm md:text-base text-[#0a0a0a] font-medium tracking-wide max-w-md mx-auto leading-relaxed"
          >
            Experience native wear at its absolute peak. Impeccable cuts, artisan embroidery, and bespoke silhouettes handcrafted for the modern gentleman.
          </motion.p>
        </div>

        <motion.div 
          variants={fadeUpVariant} 
          className="flex flex-col sm:flex-row justify-center items-center gap-4 px-6 w-full max-w-md mx-auto pt-10"
        >
          <Link href="/shop" className="w-full sm:w-auto">
            <Button size="lg" className="w-full sm:w-auto bg-black text-white hover:bg-black/90 uppercase tracking-widest text-xs font-semibold py-4 px-8 rounded-lg shadow-lg shadow-black/10">
              Shop Collection
            </Button>
          </Link>
          <Link href="/contact" className="w-full sm:w-auto">
            <Button size="lg" variant="outline" className="w-full sm:w-auto border-black text-black bg-white/80 backdrop-blur-sm hover:bg-black hover:text-white uppercase tracking-widest text-xs font-semibold py-4 px-8 rounded-lg">
              Book Fitting
            </Button>
          </Link>
        </motion.div>
      </motion.div>
    </section>
  );
}
