"use client";
import React from 'react';
import { motion } from 'framer-motion';
import { Heart, Search, ShoppingBag } from 'lucide-react';
import { cn } from '@/lib/utils';
import Link from 'next/link';
import { Product } from '@/lib/products';

interface ProductCardProps {
  product: Product;
  className?: string;
}

export function ProductCard({ product, className }: ProductCardProps) {
  return (
    <div className={cn("group flex flex-col cursor-pointer", className)}>
      {/* Image Container */}
      <div className="relative aspect-[3/4] bg-[#f8f8f8] rounded-xl overflow-hidden mb-4 smooth-shadow">
        <img 
          src={product.image} 
          alt={product.name} 
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
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

        {/* Hover Actions */}
        <div className="absolute right-3 top-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300 translate-x-4 group-hover:translate-x-0 flex flex-col gap-2">
          <button className="bg-white text-black p-2 rounded-full shadow-md hover:bg-black hover:text-white transition-colors">
            <Heart className="w-4 h-4" />
          </button>
          <button className="bg-white text-black p-2 rounded-full shadow-md hover:bg-black hover:text-white transition-colors">
            <Search className="w-4 h-4" />
          </button>
        </div>

        {/* Quick Add */}
        <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-full group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-300">
          <button className="w-full bg-black/90 backdrop-blur-sm text-white py-3 rounded-lg text-sm font-semibold uppercase tracking-widest hover:bg-black transition-colors flex items-center justify-center gap-2">
            <ShoppingBag className="w-4 h-4" /> Quick Add
          </button>
        </div>
      </div>

      {/* Details */}
      <div className="text-center px-2">
        <p className="text-xs text-gray-500 uppercase tracking-widest mb-1">{product.category}</p>
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
