"use client";
import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';

interface CategoryCard {
  name: string;
  count: number;
  image: string;
  href: string;
  description: string;
}

const CATEGORIES: CategoryCard[] = [
  {
    name: "Kaftans",
    count: 5,
    image: "https://images.unsplash.com/photo-1617137968427-85924c800a22?q=80&w=1974&auto=format&fit=crop",
    href: "/shop?category=Kaftans",
    description: "Intricately embroidered loose robes designed for comfortable prestige."
  },
  {
    name: "Senator Wears",
    count: 5,
    image: "/images/senator-banner.jpg",
    href: "/shop?category=Senator+Wears",
    description: "Sharp, bespoke two-piece suits conveying corporate elegance and traditional values."
  },
  {
    name: "Agbadas",
    count: 6,
    image: "/images/kaftans-banner.jpg",
    href: "/shop?category=Agbadas",
    description: "Grand 3-piece traditional robes reserved for ceremonies and royal entries."
  },
  {
    name: "Accessories",
    count: 4,
    image: "https://images.unsplash.com/photo-1588850561407-ed78c282e89b?q=80&w=2000&auto=format&fit=crop",
    href: "/shop?category=Accessories",
    description: "Hand-crafted caps and traditional items to complete your majestic outfit."
  }
];

export default function CategoriesPage() {
  return (
    <div className="min-h-screen bg-[#f8f8f8] pt-32 pb-24">
      {/* Header */}
      <div className="container mx-auto px-6 text-center mb-20">
        <motion.p 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-3"
        >
          Frankie Styles Signature
        </motion.p>
        <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-[#0a0a0a]">
          SIGNATURE STYLES
        </h1>
        <div className="w-20 h-0.5 bg-[#0a0a0a] mx-auto mt-6" />
      </div>

      {/* Categories Grid */}
      <div className="container mx-auto px-6 max-w-6xl">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {CATEGORIES.map((cat, idx) => (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, amount: 0.1 }}
              transition={{ duration: 0.8, delay: idx * 0.1, ease: [0.16, 1, 0.3, 1] }}
              key={cat.name}
              className="relative aspect-[4/3] rounded-xl overflow-hidden group cursor-pointer smooth-shadow bg-white"
            >
              {/* Entire Card Link Overlay */}
              <Link href={cat.href} className="absolute inset-0 z-20 block" />

              {/* Image */}
              <img 
                src={cat.image} 
                alt={cat.name} 
                className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
              />
              
              {/* Dark Overlay */}
              <div className="absolute inset-0 bg-black/40 group-hover:bg-black/50 transition-colors duration-500 z-0" />

              {/* Text content */}
              <div className="absolute inset-0 p-8 flex flex-col justify-end text-white z-10">
                <p className="text-xs font-bold uppercase tracking-widest text-gray-300 mb-2">
                  {cat.count} Items
                </p>
                <h2 className="text-3xl font-bold uppercase tracking-wider mb-2 font-bodoni">
                  {cat.name}
                </h2>
                <p className="text-sm font-light text-gray-200 max-w-sm mb-6 leading-relaxed opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  {cat.description}
                </p>
                <Link 
                  href={cat.href}
                  className="inline-flex items-center text-xs font-bold uppercase tracking-widest hover:underline underline-offset-4"
                >
                  Explore Collection →
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
