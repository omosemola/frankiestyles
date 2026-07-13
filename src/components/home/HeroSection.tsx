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
        delayChildren: 0.1
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
      className="relative min-h-screen bg-[#faf9f6] flex items-center overflow-hidden"
    >
      {/* Decorative luxury architectural background elements */}
      <div className="absolute right-0 top-0 w-1/3 h-full bg-[#f6f5f0] hidden lg:block" />
      <div className="absolute left-10 top-1/2 -translate-y-1/2 w-[1px] h-[70vh] bg-black/[0.03] hidden xl:block" />
      
      <div className="w-full relative z-10 mx-auto px-6 md:px-12 lg:px-16 xl:px-24 py-20 lg:py-0">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-8 items-center min-h-[85vh] lg:min-h-screen">
          
          {/* Left Panel: Typography & Actions */}
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="lg:col-span-6 xl:col-span-7 flex flex-col justify-center text-left pt-20 lg:pt-16 pr-0 xl:pr-12"
          >
            <motion.div 
              variants={itemVariants}
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-black/[0.04] border border-black/[0.05] w-fit mb-6"
            >
              <Sparkles className="w-3 h-3 text-amber-700 animate-pulse" />
              <span className="text-[10px] font-bold uppercase tracking-widest text-[#0a0a0a]">
                Bespoke Couture Atelier
              </span>
            </motion.div>

            <motion.h1 
              variants={itemVariants}
              className="text-5xl md:text-7xl xl:text-8xl font-bold tracking-tight leading-[1.05] uppercase font-bodoni text-[#0a0a0a] mb-6 select-none"
            >
              Tailored For <br />
              <span className="text-amber-800">Distinction</span>
            </motion.h1>

            <motion.p 
              variants={itemVariants}
              className="text-sm md:text-base text-gray-500 font-light tracking-wide max-w-lg leading-relaxed mb-10"
            >
              Step into the epitome of premium traditional fashion. Impeccable cuts, masterfully structured Agbadas, and refined Kaftans handcrafted for the modern African gentleman who values prestige.
            </motion.p>

            <motion.div 
              variants={itemVariants}
              className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto"
            >
              <Link 
                href="/shop" 
                className="w-full sm:w-auto bg-[#0a0a0a] text-white hover:bg-black/90 uppercase tracking-widest text-xs font-bold py-4 px-8 rounded-xl shadow-lg shadow-black/10 text-center flex items-center justify-center gap-2 min-h-[56px] transition-all duration-300 active:scale-95 group"
              >
                Explore Collection 
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </Link>
              <Link 
                href="/contact" 
                className="w-full sm:w-auto border border-black/20 text-[#0a0a0a] hover:bg-[#0a0a0a] hover:text-white uppercase tracking-widest text-xs font-bold py-4 px-8 rounded-xl text-center flex items-center justify-center min-h-[56px] transition-all duration-300 active:scale-95"
              >
                Book Fitting Session
              </Link>
            </motion.div>

            {/* Scroll Indicator & Socials */}
            <motion.div 
              variants={itemVariants}
              className="hidden lg:flex items-center gap-12 mt-16 pt-8 border-t border-black/[0.06] text-[10px] font-bold uppercase tracking-widest text-gray-400"
            >
              <div className="flex items-center gap-3">
                <span className="w-8 h-[1px] bg-gray-300" />
                <span>Scroll to Explore</span>
              </div>
              <div className="flex gap-4">
                <a href="#" className="hover:text-black transition-colors">Instagram</a>
                <span>/</span>
                <a href="#" className="hover:text-black transition-colors">WhatsApp</a>
              </div>
            </motion.div>
          </motion.div>

          {/* Right Panel: Asymmetric Gallery Collage */}
          <motion.div 
            initial={{ opacity: 0, x: 50, scale: 0.98 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-6 xl:col-span-5 flex items-center justify-center relative pt-10 lg:pt-0"
          >
            {/* Background Canvas frame */}
            <div className="absolute inset-0 bg-[#e8e7e1] rounded-3xl scale-[0.9] blur-3xl opacity-30 -z-10" />

            {/* Main Portrait Plate */}
            <motion.div 
              whileHover={{ scale: 0.99, rotate: -0.5 }}
              transition={{ duration: 0.4 }}
              className="relative w-full max-w-[380px] md:max-w-[420px] aspect-[3/4] rounded-2xl overflow-hidden shadow-2xl border border-black/5 bg-white z-0"
            >
              <img 
                src="/images/royal-banner.jpg" 
                alt="Frankie Styles Luxury Agbada Detailing" 
                className="w-full h-full object-cover transition-transform duration-[3000ms] hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />
            </motion.div>

            {/* Overlapping Floating Portrait Card */}
            <motion.div 
              whileHover={{ scale: 1.05, y: -5, rotate: 1 }}
              transition={{ duration: 0.5, type: "spring", stiffness: 120 }}
              className="absolute -bottom-6 -left-4 md:-left-8 w-1/2 max-w-[200px] aspect-[3/4] rounded-2xl overflow-hidden shadow-2xl border-4 border-white bg-white z-10 hidden sm:block"
            >
              <img 
                src="/images/product-1-front.png" 
                alt="Emerald Prestige Agbada Model" 
                className="w-full h-full object-cover"
              />
            </motion.div>

            {/* Overlay Tailoring details sticker tag */}
            <motion.div
              animate={{ y: [0, -6, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="absolute top-1/4 -right-4 bg-white text-black py-3 px-4 rounded-xl shadow-lg border border-gray-100 flex items-center gap-3 z-20"
            >
              <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
              <div className="text-left">
                <p className="text-[9px] font-bold text-gray-400 uppercase tracking-widest leading-none">Studio status</p>
                <p className="text-xs font-bold leading-tight mt-1">Accepting Bookings</p>
              </div>
            </motion.div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
