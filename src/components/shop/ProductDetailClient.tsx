"use client";
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ShoppingBag, ChevronRight, Ruler, ShieldCheck, Truck, RefreshCw, Heart } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Product } from '@/lib/products';
import { useCartStore } from '@/store/useCartStore';
import { useWishlistStore } from '@/store/useWishlistStore';
import { Button } from '@/components/ui/Button';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

interface ProductDetailClientProps {
  product: Product;
}

export function ProductDetailClient({ product }: ProductDetailClientProps) {
  const router = useRouter();
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedSize, setSelectedSize] = useState(product.sizes[0]);
  const [isAdding, setIsAdding] = useState(false);
  const { addItem, setIsOpen } = useCartStore();
  const { toggleItem, hasItem } = useWishlistStore();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const isWishlisted = mounted && hasItem(product.id);

  const handleAddToCart = () => {
    setIsAdding(true);
    
    // Add item to Zustand cart store
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      category: product.category,
      size: selectedSize,
    });

    // Simulate luxury tactile feedback delay, then open CartDrawer
    setTimeout(() => {
      setIsAdding(false);
      setIsOpen(true);
    }, 800);
  };

  return (
    <div className="container mx-auto px-6 pt-40 pb-32 relative">

      {/* Breadcrumbs row */}
      <div className="flex items-center justify-end mb-12 border-b border-gray-100 pb-6">
        <div className="flex items-center gap-2 text-xs text-gray-500 uppercase tracking-widest">
          <Link href="/" className="hover:text-black transition-colors">Home</Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <Link href={`/shop?category=${product.category}`} className="hover:text-black transition-colors">{product.category}</Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <span className="text-[#0a0a0a] font-semibold">{product.name}</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
        {/* Left Side: Photo Gallery */}
        <div className="lg:col-span-7 flex flex-col-reverse md:flex-row gap-4">
          {/* Thumbnails */}
          <div className="flex md:flex-col gap-4 overflow-x-auto md:overflow-visible">
             {product.images.map((img, idx) => (
              <button
                key={idx}
                onClick={() => setSelectedImage(idx)}
                className={cn(
                  "w-20 aspect-[3/4] bg-white rounded-lg overflow-hidden border transition-all flex-shrink-0",
                  selectedImage === idx ? "border-[#0a0a0a] ring-1 ring-[#0a0a0a]" : "border-transparent opacity-60 hover:opacity-100"
                )}
              >
                <img src={img} alt={`${product.name} thumbnail ${idx + 1}`} className="w-full h-full object-contain p-1" />
              </button>
            ))}
          </div>

          {/* Featured Image */}
          <div className="flex-grow aspect-[3/4] bg-white rounded-xl overflow-hidden smooth-shadow relative border border-gray-100">
            <motion.img
              key={selectedImage}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.4 }}
              src={product.images[selectedImage]}
              alt={product.name}
              className="w-full h-full object-contain p-2"
            />
          </div>
        </div>

        {/* Right Side: Product Details */}
        <div className="lg:col-span-5 flex flex-col justify-between">
          <div className="space-y-8">
            {/* Header / Meta */}
            <div>
              <Link 
                href={`/shop?category=${encodeURIComponent(product.category)}`} 
                className="text-xs font-bold text-gray-500 hover:text-black uppercase tracking-widest mb-2 transition-colors duration-300 cursor-pointer hover:underline inline-block"
              >
                {product.category}
              </Link>
              <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-[#0a0a0a] mb-4">
                {product.name}
              </h1>
              <div className="flex items-center gap-3">
                <span className="text-2xl font-semibold text-[#0a0a0a]">₦{product.price.toLocaleString()}</span>
                {product.originalPrice && (
                  <span className="text-lg text-gray-400 line-through">₦{product.originalPrice.toLocaleString()}</span>
                )}
              </div>
            </div>

            {/* Description */}
            <p className="text-gray-600 text-base leading-relaxed font-light">
              {product.description}
            </p>

            {/* Size Selector */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <label className="text-sm font-semibold uppercase tracking-wider text-[#0a0a0a]">Select Size</label>
                <button className="flex items-center gap-1.5 text-xs text-gray-500 hover:text-black transition-colors uppercase tracking-wider font-semibold">
                  <Ruler className="w-4 h-4" /> Size Guide
                </button>
              </div>
              <div className="flex flex-wrap gap-3">
                {product.sizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={cn(
                      "min-w-[60px] h-12 px-4 rounded-lg text-sm font-medium border flex items-center justify-center transition-all",
                      selectedSize === size
                        ? "border-[#0a0a0a] bg-[#0a0a0a] text-white"
                        : "border-gray-200 text-[#0a0a0a] hover:border-[#0a0a0a]"
                    )}
                  >
                    {size}
                  </button>
                ))}
              </div>
              {selectedSize === "Custom Measure" && (
                <p className="text-xs text-amber-600 font-medium mt-2">
                  *Our team will contact you for custom shoulder, chest, and height measurements.
                </p>
              )}
            </div>

            {/* Add to Cart CTA & Wishlist */}
            <div className="flex gap-4">
              <Button
                onClick={handleAddToCart}
                disabled={isAdding}
                className="flex-grow py-5 text-sm uppercase tracking-widest font-semibold flex items-center justify-center gap-2.5 h-16 rounded-xl"
              >
                <ShoppingBag className="w-5 h-5" />
                {isAdding ? "Adding to Bag..." : "Add to Bag"}
              </Button>
              <button
                onClick={() => toggleItem(product)}
                className={cn(
                  "w-16 h-16 rounded-xl border flex items-center justify-center transition-all duration-300 hover:scale-105 active:scale-95 flex-shrink-0 shadow-sm",
                  isWishlisted
                    ? "border-[#0a0a0a] bg-gray-50 text-[#0a0a0a]"
                    : "border-gray-200 text-gray-500 hover:border-black hover:text-black"
                )}
                aria-label={isWishlisted ? "Remove from wishlist" : "Add to wishlist"}
              >
                <Heart className={cn("w-5 h-5", isWishlisted && "fill-[#0a0a0a]")} />
              </button>
            </div>
          </div>

          {/* Premium Badges */}
          <div className="grid grid-cols-3 gap-6 pt-12 border-t border-gray-100 mt-12">
            <div className="flex flex-col items-center text-center space-y-2">
              <Truck className="w-5 h-5 text-gray-600" />
              <h4 className="text-xs font-semibold uppercase tracking-wider text-[#0a0a0a]">Free Delivery</h4>
              <p className="text-[10px] text-gray-400">Nationwide shipping</p>
            </div>
            <div className="flex flex-col items-center text-center space-y-2">
              <ShieldCheck className="w-5 h-5 text-gray-600" />
              <h4 className="text-xs font-semibold uppercase tracking-wider text-[#0a0a0a]">Bespoke Fit</h4>
              <p className="text-[10px] text-gray-400">Tailored perfection</p>
            </div>
            <div className="flex flex-col items-center text-center space-y-2">
              <RefreshCw className="w-5 h-5 text-gray-600" />
              <h4 className="text-xs font-semibold uppercase tracking-wider text-[#0a0a0a]">Easy Exchange</h4>
              <p className="text-[10px] text-gray-400">7-day alterations</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
