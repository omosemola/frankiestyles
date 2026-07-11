"use client";
import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import Link from 'next/link';
import { Product } from '@/lib/products';

interface ProductCardProps {
  product: Product;
  className?: string;
}

export function ProductCard({ product, className }: ProductCardProps) {
  return (
    <div className={cn("group flex flex-col", className)}>
      {/* Image Container wrapped in Link to enable image clicks on mobile */}
      <Link 
        href={`/product/${product.id}`} 
        className="relative aspect-[3/4] bg-white border border-gray-150 rounded-xl overflow-hidden mb-4 smooth-shadow block"
      >
        <img 
          src={product.image} 
          alt={product.name} 
          className="w-full h-full object-contain p-2 transition-transform duration-700 group-hover:scale-105"
        />
        
        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-2">
          {product.isNew && (
            <span className="bg-black text-white text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded-sm">
              New
            </span>
          )}
          {product.originalPrice && (
            <span className="bg-red-600 text-white text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded-sm">
              Sale
            </span>
          )}
        </div>
      </Link>

      {/* Details */}
      <div className="text-center px-2">
        <Link 
          href={`/shop?category=${encodeURIComponent(product.category)}`} 
          className="text-xs text-gray-500 hover:text-black uppercase tracking-widest mb-1 transition-colors block"
        >
          {product.category}
        </Link>
        <Link href={`/product/${product.id}`} className="block text-sm font-semibold text-[#0a0a0a] uppercase tracking-wide hover:underline underline-offset-4 mb-2">
          {product.name}
        </Link>
        <div className="flex items-center justify-center gap-2 text-sm">
          {product.originalPrice && (
            <span className="text-gray-400 line-through">₦{product.originalPrice.toLocaleString()}</span>
          )}
          <span className="font-medium text-[#0a0a0a]">₦{product.price.toLocaleString()}</span>
        </div>
      </div>
    </div>
  );
}
