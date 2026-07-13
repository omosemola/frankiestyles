"use client";
import React from 'react';
import { motion } from 'framer-motion';

interface SectionHeaderProps {
  title: string;
  description?: string;
  className?: string;
  useSerif?: boolean;
}

export function SectionHeader({ title, description, className = '', useSerif = false }: SectionHeaderProps) {
  return (
    <div className={`text-center mb-12 flex flex-col items-center justify-center overflow-hidden ${className}`}>
      {/* Heading animating letter-spacing and scale outwards */}
      <motion.h2
        initial={{ letterSpacing: "0.02em", opacity: 0, scale: 0.98 }}
        whileInView={{ letterSpacing: "0.25em", opacity: 1, scale: 1 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 1.4, ease: [0.19, 1, 0.22, 1] }}
        className={`text-3xl font-bold uppercase text-[#0a0a0a] mb-4 select-none ${useSerif ? 'font-bodoni' : ''}`}
      >
        {title}
      </motion.h2>

      {/* Underline animating scaleX outwards from center */}
      <motion.div
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 1.1, delay: 0.15, ease: [0.19, 1, 0.22, 1] }}
        className="w-12 h-[1.5px] bg-[#0a0a0a] origin-center"
      />

      {/* Optional Description fading in */}
      {description && (
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.8, delay: 0.3, ease: [0.19, 1, 0.22, 1] }}
          className="text-sm text-gray-500 max-w-lg mx-auto mt-6 leading-relaxed"
        >
          {description}
        </motion.p>
      )}
    </div>
  );
}
