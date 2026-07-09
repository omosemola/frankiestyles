"use client";
import React from 'react';
import Link from 'next/link';

export function HeroSection() {
  return (
    <section 
      className="relative min-h-screen flex items-center justify-center bg-white pt-40 pb-20 overflow-hidden"
    >
      {/* Centered Content Overlay (Standard HTML to guarantee mobile viewport compatibility) */}
      <div className="relative z-10 container mx-auto px-6 text-center flex flex-col items-center justify-center max-w-3xl animate-fade-in">
        <div className="space-y-6 md:space-y-8 select-none">
          <p className="text-xs font-bold uppercase tracking-widest text-gray-400">
            Frankie Styles • Custom Tailoring
          </p>
          <h1 className="text-5xl md:text-8xl font-bold tracking-tight leading-[1.1] uppercase font-bodoni text-[#0a0a0a]">
            PRESTIGE <br />
            REDEFINED
          </h1>
          <p className="text-sm md:text-base text-gray-500 font-light tracking-wide max-w-md mx-auto leading-relaxed">
            Experience native wear at its absolute peak. Impeccable cuts, artisan embroidery, and bespoke silhouettes handcrafted for the modern gentleman.
          </p>
        </div>

        {/* Buttons: Using directstyled Links (no nested button-in-a-tag syntax to prevent mobile touch action blockages) */}
        <div className="flex flex-col sm:flex-row justify-center items-center gap-4 px-6 w-full max-w-md mx-auto pt-10">
          <Link 
            href="/shop" 
            className="w-full sm:w-auto bg-[#0a0a0a] text-white hover:bg-black/90 uppercase tracking-widest text-xs font-semibold py-4 px-8 rounded-lg shadow-md shadow-black/10 text-center flex items-center justify-center min-h-[50px] transition-all duration-300 active:scale-95"
          >
            Shop Collection
          </Link>
          <Link 
            href="/contact" 
            className="w-full sm:w-auto border border-black/20 text-[#0a0a0a] hover:bg-[#0a0a0a] hover:text-white uppercase tracking-widest text-xs font-semibold py-4 px-8 rounded-lg text-center flex items-center justify-center min-h-[50px] transition-all duration-300 active:scale-95"
          >
            Book Fitting
          </Link>
        </div>
      </div>
    </section>
  );
}
