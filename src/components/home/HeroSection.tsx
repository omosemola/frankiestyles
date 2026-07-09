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
  const yImage = useTransform(scrollYProgress, [0, 1], ["0%", "5%"]);
  const opacityText = useTransform(scrollYProgress, [0, 1], [1, 0]);

  return (
    <section 
      ref={ref} 
      className="relative h-screen min-h-[750px] flex items-center justify-center bg-white overflow-hidden"
    >
      {/* Background Centered Model (Massive Scale) */}
      <motion.div
        style={{ y: yImage, opacity: opacityText }}
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1] }}
        className="absolute inset-0 z-0 flex items-center justify-center pointer-events-none select-none"
      >
        <img 
          src="/images/product-6-black.png" 
          alt="Frankie Styles Elite Model" 
          className="h-[120vh] md:h-[135vh] w-auto object-contain scale-[1.2] md:scale-[1.35] translate-y-[2%] filter contrast-[1.03] brightness-[1.01] drop-shadow-[0_25px_60px_rgba(0,0,0,0.08)]"
        />
        {/* Soft ground shadow under model */}
        <div className="absolute bottom-[1vh] left-1/2 -translate-x-1/2 w-[30%] h-[15px] bg-black/5 rounded-full blur-[10px]" />
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
        className="relative z-10 container mx-auto px-6 text-center flex flex-col items-center justify-center h-full max-w-3xl"
      >
        <div className="space-y-6 md:space-y-8 select-none">
          {/* Subtle white text glow shadow class applied for absolute readability over the black model */}
          <motion.p 
            variants={fadeUpVariant} 
            className="text-xs font-bold uppercase tracking-widest text-[#0a0a0a]"
            style={{ textShadow: '0 0 12px rgba(255,255,255,0.9), 0 0 20px rgba(255,255,255,0.7)' }}
          >
            Frankie Styles • Custom Tailoring
          </motion.p>
          <motion.h1 
            variants={fadeUpVariant} 
            className="text-5xl md:text-8xl font-bold tracking-tight leading-[1.1] uppercase font-bodoni text-[#0a0a0a]"
            style={{ textShadow: '0 0 15px rgba(255,255,255,0.95), 0 0 30px rgba(255,255,255,0.8)' }}
          >
            PRESTIGE <br />
            REDEFINED
          </motion.h1>
          <motion.p 
            variants={fadeUpVariant} 
            className="text-sm md:text-base text-[#0a0a0a] font-medium tracking-wide max-w-md mx-auto leading-relaxed"
            style={{ textShadow: '0 0 12px rgba(255,255,255,0.9), 0 0 20px rgba(255,255,255,0.7)' }}
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
