"use client";
import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight, Sparkles } from 'lucide-react';

export function HeroSection() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.16, 1, 0.3, 1] as any
      }
    }
  };

  return (
    <section 
      className="relative min-h-screen w-full flex items-center justify-center bg-black overflow-hidden"
    >
      {/* Background Video */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover z-0 opacity-70"
      >
        <source src="/videos/herosection-vid.mp4" type="video/mp4" />
      </video>

      {/* Luxury Vignette and Dark Overlays to ensure contrast */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/50 to-[#0a0a0a] z-10" />
      <div className="absolute inset-0 bg-black/10 backdrop-blur-[0.5px] z-10" />

      {/* Content wrapper */}
      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="relative z-20 container mx-auto px-6 text-center flex flex-col items-center justify-center max-w-4xl pt-24"
      >
        {/* Brand Pre-header */}
        <motion.div 
          variants={itemVariants}
          className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/[0.08] border border-white/[0.1] backdrop-blur-md w-fit mb-6"
        >
          <Sparkles className="w-3.5 h-3.5 text-amber-400 animate-pulse" />
          <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/90">
            Bespoke Couture Atelier
          </span>
        </motion.div>

        {/* Brand Name Header */}
        <motion.h1 
          variants={itemVariants}
          className="text-white font-black uppercase tracking-[0.3em] text-3xl md:text-5xl lg:text-6xl font-bodoni mb-4 leading-none select-none"
        >
          FRANKIE STYLES
        </motion.h1>

        {/* Sub-header */}
        <motion.h2 
          variants={itemVariants}
          className="text-amber-400 font-semibold uppercase tracking-[0.25em] text-xs md:text-sm lg:text-base font-bodoni mb-16 select-none"
        >
          KAFTAN ET ALL
        </motion.h2>

        {/* Subtitle Description */}
        <motion.p 
          variants={itemVariants}
          className="text-gray-300 text-sm md:text-base font-light tracking-wide max-w-lg mx-auto leading-relaxed mb-12"
        >
          Experience African native wear at its absolute peak. Impeccable cuts, custom premium embroidery, and bespoke silhouettes handcrafted for the modern gentleman.
        </motion.p>

        {/* Call to Actions */}
        <motion.div 
          variants={itemVariants}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full sm:w-auto px-6"
        >
          <Link 
            href="/shop" 
            className="w-full sm:w-auto bg-white text-black hover:bg-white/95 uppercase tracking-widest text-xs font-bold py-4 px-8 rounded-xl shadow-xl shadow-black/30 text-center flex items-center justify-center gap-2 min-h-[56px] transition-all duration-300 active:scale-95 group"
          >
            Shop Collection 
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </Link>
          <Link 
            href="/contact" 
            className="w-full sm:w-auto border border-white/30 hover:border-white text-white hover:bg-white hover:text-black uppercase tracking-widest text-xs font-bold py-4 px-8 rounded-xl text-center flex items-center justify-center min-h-[56px] transition-all duration-300 active:scale-95"
          >
            Book Fitting Session
          </Link>
        </motion.div>
      </motion.div>

      {/* Animated Scroll Down Indicator */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2.5 text-[9px] uppercase tracking-[0.25em] text-gray-400 font-bold z-20 select-none">
        <span>Scroll Down</span>
        <div className="w-[1px] h-12 bg-gradient-to-b from-gray-400 to-transparent animate-pulse" />
      </div>
    </section>
  );
}
