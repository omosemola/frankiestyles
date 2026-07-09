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
  const yText = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const yImage = useTransform(scrollYProgress, [0, 1], ["0%", "15%"]);
  const opacity = useTransform(scrollYProgress, [0, 1], [1, 0]);

  return (
    <section 
      ref={ref} 
      className="relative h-screen min-h-[700px] flex items-center overflow-hidden bg-gradient-to-b from-[#0a0a0a] via-[#111] to-[#0a0a0a]"
    >
      {/* Studio Lighting Spotlight behind the model */}
      <div className="absolute right-0 top-1/2 -translate-y-1/2 w-[70vw] h-[70vw] max-w-[800px] max-h-[800px] bg-white/[0.03] rounded-full blur-[120px] pointer-events-none z-0" />
      <div className="absolute right-[10%] top-1/2 -translate-y-1/2 w-[35vw] h-[35vw] max-w-[400px] max-h-[400px] bg-white/[0.02] rounded-full blur-[80px] pointer-events-none z-0" />

      <div className="container mx-auto px-6 relative z-10 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Side: Typography & CTAs */}
          <motion.div 
            style={{ y: yText, opacity }}
            initial="hidden"
            animate="visible"
            variants={{
              hidden: { opacity: 0 },
              visible: { opacity: 1, transition: { staggerChildren: 0.15 } }
            }}
            className="lg:col-span-6 text-left text-white space-y-6 md:space-y-8 z-10"
          >
            <motion.p 
              variants={fadeUpVariant} 
              className="text-xs font-bold uppercase tracking-widest text-gray-400"
            >
              Frankie Styles • Custom Tailoring
            </motion.p>
            <motion.h1 
              variants={fadeUpVariant} 
              className="text-5xl md:text-7xl font-bold tracking-tight leading-[1.1] uppercase font-bodoni"
            >
              PRESTIGE <br />
              REDEFINED
            </motion.h1>
            <motion.p 
              variants={fadeUpVariant} 
              className="text-base md:text-lg text-white/70 font-light tracking-wide max-w-lg leading-relaxed"
            >
              Experience native wear at its absolute peak. Impeccable cuts, artisan embroidery, and bespoke silhouettes handcrafted for the modern African gentleman.
            </motion.p>
            <motion.div 
              variants={fadeUpVariant} 
              className="flex flex-col sm:flex-row items-center gap-4 pt-2 w-full sm:w-auto"
            >
              <Link href="/shop" className="w-full sm:w-auto">
                <Button size="lg" className="w-full sm:w-auto bg-white text-black hover:bg-white/90 uppercase tracking-widest text-xs font-semibold py-4 px-8 rounded-lg">
                  Shop Collection
                </Button>
              </Link>
              <Link href="/contact" className="w-full sm:w-auto">
                <Button size="lg" variant="outline" className="w-full sm:w-auto border-white/20 text-white hover:bg-white hover:text-black uppercase tracking-widest text-xs font-semibold py-4 px-8 rounded-lg">
                  Book Fitting
                </Button>
              </Link>
            </motion.div>
          </motion.div>

          {/* Right Side: Floating Model Image (Transparent PNG) */}
          <div className="lg:col-span-6 flex justify-center lg:justify-end items-end h-full select-none">
            <motion.div
              style={{ y: yImage, opacity }}
              initial={{ opacity: 0, y: 100 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
              className="relative w-full max-w-[450px] lg:max-w-[500px] aspect-[3/4] flex items-end overflow-visible mt-12 lg:mt-0"
            >
              {/* Soft Ground Shadow below model */}
              <div className="absolute bottom-[-15px] left-1/2 -translate-x-1/2 w-[80%] h-[30px] bg-black/40 rounded-full blur-[15px] z-0" />
              
              <img 
                src="/images/product-6-black.png" 
                alt="Frankie Styles Elite Model" 
                className="w-full h-auto max-h-[85vh] object-contain relative z-10"
              />
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
}
