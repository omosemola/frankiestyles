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
  
  // Parallax transitions for a subtle depth effect on scroll
  const yText = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);
  const yImage = useTransform(scrollYProgress, [0, 1], ["0%", "10%"]);
  const opacity = useTransform(scrollYProgress, [0, 1], [1, 0]);

  return (
    <section 
      ref={ref} 
      className="relative h-screen min-h-[750px] flex flex-col items-center justify-between bg-white pt-40 pb-16 overflow-hidden"
    >
      {/* Centered Typography */}
      <motion.div 
        style={{ y: yText, opacity }}
        initial="hidden"
        animate="visible"
        variants={{
          hidden: { opacity: 0 },
          visible: { opacity: 1, transition: { staggerChildren: 0.15 } }
        }}
        className="relative z-10 container mx-auto px-6 text-center space-y-4 md:space-y-6 max-w-3xl"
      >
        <motion.p 
          variants={fadeUpVariant} 
          className="text-xs font-bold uppercase tracking-widest text-gray-400"
        >
          Frankie Styles • Custom Tailoring
        </motion.p>
        <motion.h1 
          variants={fadeUpVariant} 
          className="text-5xl md:text-7xl font-bold tracking-tight leading-[1.1] uppercase font-bodoni text-[#0a0a0a]"
        >
          PRESTIGE REDEFINED
        </motion.h1>
        <motion.p 
          variants={fadeUpVariant} 
          className="text-sm md:text-base text-gray-500 font-light tracking-wide max-w-lg mx-auto leading-relaxed"
        >
          Experience native wear at its absolute peak. Impeccable cuts, artisan embroidery, and bespoke silhouettes handcrafted for the modern gentleman.
        </motion.p>
      </motion.div>

      {/* Centered Model Image */}
      <div className="flex-grow flex items-center justify-center w-full max-w-[380px] md:max-w-[420px] aspect-[3/4] select-none my-6 relative">
        <motion.div
          style={{ y: yImage, opacity }}
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
          className="w-full h-full flex items-end justify-center relative"
        >
          {/* Subtle ground shadow */}
          <div className="absolute bottom-[-10px] left-1/2 -translate-x-1/2 w-[70%] h-[15px] bg-black/5 rounded-full blur-[8px] z-0" />
          
          <img 
            src="/images/product-6-black.png" 
            alt="Frankie Styles Elite Model" 
            className="h-full w-auto max-h-[50vh] object-contain relative z-10"
          />
        </motion.div>
      </div>

      {/* Centered CTAs */}
      <motion.div 
        style={{ opacity }}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.4 }}
        className="relative z-10 w-full flex flex-col sm:flex-row justify-center items-center gap-4 px-6 max-w-md mx-auto"
      >
        <Link href="/shop" className="w-full sm:w-auto">
          <Button size="lg" className="w-full sm:w-auto bg-black text-white hover:bg-black/90 uppercase tracking-widest text-xs font-semibold py-4 px-8 rounded-lg">
            Shop Collection
          </Button>
        </Link>
        <Link href="/contact" className="w-full sm:w-auto">
          <Button size="lg" variant="outline" className="w-full sm:w-auto border-black/20 text-black hover:bg-black hover:text-white uppercase tracking-widest text-xs font-semibold py-4 px-8 rounded-lg">
            Book Fitting
          </Button>
        </Link>
      </motion.div>
    </section>
  );
}
