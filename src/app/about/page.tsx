"use client";
import React from 'react';
import { motion } from 'framer-motion';
import { ScrollAnimate } from '@/components/ui/ScrollAnimate';

export default function AboutPage() {
  const steps = [
    {
      num: "01",
      title: "Private Consultation",
      description: "Book an appointment online or visit our showroom. We discuss fabric textures, embroidery structures, and your style guidelines."
    },
    {
      num: "02",
      title: "Precision Measurement",
      description: "Our master tailor takes exact skeletal and muscle alignments, capturing chest, waist, sleeve drape, and traditional length requirements."
    },
    {
      num: "03",
      title: "Bespoke Stitching",
      description: "Each piece is hand-cut and assembled by expert native tailors, taking up to 48 working hours of manual stitching and embroidery."
    },
    {
      num: "04",
      title: "Perfect Fitting",
      description: "A final fitting is scheduled. We execute micro-alterations until the native attire falls with structural, majestic perfection."
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Editorial Header */}
      <section className="relative h-[80vh] flex items-center justify-center overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <img 
            src="/images/about-banner.jpg" 
            alt="About Frankie Styles" 
            className="w-full h-full object-cover filter brightness-[0.25]"
          />
        </div>

        {/* Header Content */}
        <div className="container mx-auto px-6 text-center text-white relative z-10 space-y-6">
          <motion.p 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-xs font-bold uppercase tracking-widest text-gray-300"
          >
            Our Story & Heritage
          </motion.p>
          <motion.h1 
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.15 }}
            className="text-5xl md:text-7xl font-bold tracking-tight font-bodoni uppercase"
          >
            THE ART OF NATIVE WEAR
          </motion.h1>
          <motion.div 
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="w-20 h-0.5 bg-white mx-auto mt-6"
          />
        </div>
      </section>

      {/* Brand Philosophy Segment */}
      <section className="py-32 bg-white text-[#0a0a0a] overflow-hidden">
        <ScrollAnimate>
          <div className="container mx-auto px-6 max-w-4xl text-center space-y-12">
            <h2 className="text-3xl font-bold uppercase tracking-widest font-bodoni">The Frankie Styles Philosophy</h2>
            <p className="text-lg md:text-xl text-gray-500 leading-relaxed font-light">
              Founded with the singular purpose of dressing classy Nigerian men in elite, bespoke native wears, Frankie Styles combines time-honored traditional tailoring with clean, minimalist modern structures. 
            </p>
            <p className="text-base text-gray-500 leading-relaxed font-light">
              We source only the finest fabrics globally—from breathable Italian linens and structured cashmere-wool blends to authentic Swiss brocades and textured Aso-Oke. Every robe, Senator suit, and Agbada is handcrafted in Lagos, capturing prestige, authority, and modern refinement.
            </p>
          </div>
        </ScrollAnimate>
      </section>

      {/* Fabric Showcase (Split Panel) */}
      <section className="bg-[#f8f8f8] overflow-hidden text-[#0a0a0a]">
        <div className="grid grid-cols-1 lg:grid-cols-2 items-center">
          {/* Image */}
          <ScrollAnimate direction="left" className="w-full bg-[#f8f8f8] flex items-center justify-center p-0 lg:p-12 min-h-0 lg:min-h-[650px] overflow-hidden">
            <img 
              src="/images/about-showcase.jpg" 
              alt="Bespoke embroidery" 
              className="w-full h-auto lg:h-full max-h-[650px] object-contain mx-auto"
            />
          </ScrollAnimate>
          {/* Text */}
          <ScrollAnimate direction="right" className="p-12 md:p-24 flex flex-col justify-center space-y-8 bg-white h-full lg:min-h-[650px]">
            <div className="space-y-4">
              <span className="text-xs font-bold uppercase tracking-widest text-gray-400 block">Master Craftsmanship</span>
              <h3 className="text-3xl font-bold uppercase tracking-wider font-bodoni">Intricate Hand Embroidery</h3>
              <p className="text-gray-500 font-light leading-relaxed">
                True luxury lies in the details. Our tailors spend hours hand-stitching geometric patterns and organic line-work across necklines, cuffs, and pocket fronts. We use premium thread-work that does not fade, ensuring your native attire remains a timeless heirloom.
              </p>
              <div className="w-12 h-0.5 bg-[#0a0a0a]" />
            </div>
          </ScrollAnimate>
        </div>
      </section>

      {/* Bespoke Measurement Steps */}
      <section className="py-32 bg-white text-[#0a0a0a] overflow-hidden">
        <div className="container mx-auto px-6">
          <ScrollAnimate>
            <div className="text-center mb-24">
              <h2 className="text-3xl font-bold uppercase tracking-widest font-bodoni mb-4">THE BESPOKE EXPERIENCE</h2>
              <p className="text-sm text-gray-500 uppercase tracking-widest font-semibold">How we craft your perfect fit</p>
              <div className="w-12 h-0.5 bg-[#0a0a0a] mx-auto mt-6" />
            </div>
          </ScrollAnimate>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 max-w-6xl mx-auto">
            {steps.map((step, idx) => (
              <ScrollAnimate key={step.num} delay={idx * 0.1} amount={0.05}>
                <div className="space-y-4 text-left">
                  <span className="text-4xl font-extrabold text-gray-200 block font-bodoni">{step.num}</span>
                  <h3 className="text-lg font-bold uppercase tracking-wider">{step.title}</h3>
                  <p className="text-sm text-gray-500 leading-relaxed font-light">{step.description}</p>
                </div>
              </ScrollAnimate>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
