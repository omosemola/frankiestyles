"use client";
import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Button } from '@/components/ui/Button';
import { fadeUpVariant } from '@/lib/animations';

export function HeroSection() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"]
  });
  
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const opacity = useTransform(scrollYProgress, [0, 1], [1, 0]);

  return (
    <section ref={ref} className="relative h-screen min-h-[600px] flex items-center justify-center overflow-hidden">
      <motion.div 
        style={{ y, opacity }}
        className="absolute inset-0 z-0"
      >
        <div className="absolute inset-0 bg-[#0a0a0a]/40 z-10" /> 
        <img 
          src="https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=2070&auto=format&fit=crop" 
          alt="Luxury Fashion Hero" 
          className="w-full h-full object-cover"
        />
      </motion.div>

      <div className="relative z-10 container mx-auto px-6 text-center text-white">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={{
            hidden: { opacity: 0 },
            visible: { opacity: 1, transition: { staggerChildren: 0.2 } }
          }}
          className="max-w-3xl mx-auto space-y-8"
        >
          <motion.h1 variants={fadeUpVariant} className="text-5xl md:text-7xl font-bold tracking-tight">
            ELEVATE YOUR STYLE
          </motion.h1>
          <motion.p variants={fadeUpVariant} className="text-lg md:text-xl text-white/80 font-light tracking-wide">
            Discover the new Fall/Winter collection. A symphony of minimalist aesthetics and premium craftsmanship.
          </motion.p>
          <motion.div variants={fadeUpVariant} className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <Button size="lg" className="w-full sm:w-auto bg-white text-black hover:bg-white/90">
              Shop Collection
            </Button>
            <Button size="lg" variant="outline" className="w-full sm:w-auto border-white text-white hover:bg-white hover:text-black">
              Explore Lookbook
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
