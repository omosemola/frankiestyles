"use client";
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Heart } from 'lucide-react';
import { cn } from '@/lib/utils';
import Link from 'next/link';
import { Product } from '@/lib/products';
import { useWishlistStore } from '@/store/useWishlistStore';

interface ProductCardProps {
  product: Product;
  className?: string;
}

export function ProductCard({ product, className }: ProductCardProps) {
  const { toggleItem, hasItem } = useWishlistStore();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const isWishlisted = mounted && hasItem(product.id);

  const handleWishlistClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggleItem(product);
  };

  return (
    <div className={cn("group flex flex-col relative", className)}>
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
        
        {/* Floating Heart Button */}
        <button
          onClick={handleWishlistClick}
          className="absolute top-3 right-3 z-10 w-8 h-8 rounded-full bg-white/95 border border-gray-100 flex items-center justify-center shadow-sm text-gray-400 hover:text-red-500 hover:scale-110 active:scale-95 transition-all duration-300 group/heart"
          aria-label={isWishlisted ? "Remove from wishlist" : "Add to wishlist"}
        >
          <Heart 
            className={cn(
              "w-4 h-4 transition-transform duration-300", 
              isWishlisted ? "text-red-500 fill-red-500 scale-105" : "group-hover/heart:scale-105"
            )} 
          />
        </button>

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
