"use client";
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ShoppingBag, ChevronRight, Ruler, ShieldCheck, Truck, RefreshCw, Heart, Mail } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Product } from '@/lib/products';
import { useCartStore } from '@/store/useCartStore';
import { useWishlistStore } from '@/store/useWishlistStore';
import { Button } from '@/components/ui/Button';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { MeasurementModal } from '@/components/shop/MeasurementModal';

interface ProductDetailClientProps {
  product: Product;
}

interface FlyingJet {
  id: number;
  startX: number;
  startY: number;
  endX: number;
  endY: number;
}

export function ProductDetailClient({ product }: ProductDetailClientProps) {
  const router = useRouter();
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedSize, setSelectedSize] = useState(product.sizes[0]);
  const [isAdding, setIsAdding] = useState(false);
  const { addItem, setIsOpen } = useCartStore();
  const { toggleItem, hasItem } = useWishlistStore();
  const [mounted, setMounted] = useState(false);
  const [flyingJets, setFlyingJets] = useState<FlyingJet[]>([]);

  // Sizing Modal States
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalTab, setModalTab] = useState<'standard' | 'custom'>('standard');
  const [customMeasurements, setCustomMeasurements] = useState<{
    chest: string;
    shoulder: string;
    sleeve: string;
    waist: string;
    trouserLength: string;
    topLength: string;
  } | null>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  const isWishlisted = mounted && hasItem(product.id);

  const handleAddToCart = (e: React.MouseEvent<HTMLButtonElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const cartButton = document.querySelector('[aria-label="Cart"]');
    
    // Find absolute coordinates relative to viewport
    let endX = window.innerWidth - 80;
    let endY = 40;
    if (cartButton) {
      const cartRect = cartButton.getBoundingClientRect();
      endX = cartRect.left + cartRect.width / 2;
      endY = cartRect.top + cartRect.height / 2;
    }
    const startX = rect.left + rect.width / 2;
    const startY = rect.top + rect.height / 2;

    const newJet = {
      id: Date.now(),
      startX,
      startY,
      endX,
      endY
    };

    setIsAdding(true);
    setFlyingJets(prev => [...prev, newJet]);
    
    // Add item to Zustand cart store
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      category: product.category,
      size: selectedSize,
    });
  };

  const handleJetComplete = (jetId: number) => {
    setFlyingJets(prev => prev.filter(j => j.id !== jetId));
    setIsAdding(false);
    setIsOpen(true);
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
            <div className="space-y-4 text-left">
              <div className="flex justify-between items-center">
                <span className="text-xs font-bold uppercase tracking-wider text-gray-400">Select Size</span>
                <button 
                  onClick={() => { setModalTab('standard'); setIsModalOpen(true); }}
                  className="flex items-center gap-1.5 text-xs text-gray-500 hover:text-black transition-colors uppercase tracking-wider font-semibold"
                >
                  <Ruler className="w-4 h-4" /> Size Guide
                </button>
              </div>
              <div className="flex flex-wrap gap-3">
                {product.sizes.map((size) => {
                  const isActive = selectedSize === size || (size === "Custom Measure" && selectedSize.startsWith("Custom"));
                  return (
                    <button
                      key={size}
                      onClick={() => {
                        if (size === "Custom Measure") {
                          setModalTab('custom');
                          setIsModalOpen(true);
                        } else {
                          setSelectedSize(size);
                          setCustomMeasurements(null);
                        }
                      }}
                      className={cn(
                        "min-w-[60px] h-12 px-4 rounded-lg text-sm font-medium border flex items-center justify-center transition-all",
                        isActive
                          ? "border-[#0a0a0a] bg-[#0a0a0a] text-white"
                          : "border-gray-200 text-[#0a0a0a] hover:border-[#0a0a0a]"
                      )}
                    >
                      {size}
                    </button>
                  );
                })}
              </div>
              
              {/* Custom Sizing Fit Summary */}
              {customMeasurements && selectedSize.startsWith("Custom") ? (
                <div className="bg-gray-50 border border-gray-150 p-4 rounded-xl text-left mt-4 flex justify-between items-center">
                  <div className="space-y-1">
                    <p className="text-[10px] font-bold uppercase tracking-wider text-gray-400">Custom Applied Fit</p>
                    <p className="text-xs font-semibold text-[#0a0a0a] leading-relaxed">
                      Chest: {customMeasurements.chest}" • Shoulder: {customMeasurements.shoulder}" • Sleeve: {customMeasurements.sleeve}" • Waist: {customMeasurements.waist}" • Trouser: {customMeasurements.trouserLength}" • Top: {customMeasurements.topLength}"
                    </p>
                  </div>
                  <button
                    onClick={() => { setModalTab('custom'); setIsModalOpen(true); }}
                    className="text-[10px] font-bold uppercase tracking-widest text-[#0a0a0a] hover:underline underline-offset-4 flex-shrink-0 ml-4"
                  >
                    Edit Fit
                  </button>
                </div>
              ) : selectedSize === "Custom Measure" ? (
                <p className="text-xs text-amber-600 font-medium mt-2">
                  *Our team will contact you for custom shoulder, chest, and height measurements.
                </p>
              ) : null}
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


      <MeasurementModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        initialTab={modalTab}
        onApplyCustom={(measurements) => {
          setCustomMeasurements(measurements);
          const sizeString = `Custom (C:${measurements.chest}" S:${measurements.shoulder}" Sl:${measurements.sleeve}" W:${measurements.waist}" TL:${measurements.trouserLength}" L:${measurements.topLength}")`;
          setSelectedSize(sizeString);
        }}
      />

      {/* Jet flying envelope overlay */}
      {mounted && flyingJets.map((jet) => (
        <motion.div
          key={jet.id}
          initial={{
            position: "fixed",
            left: jet.startX,
            top: jet.startY,
            x: "-50%",
            y: "-50%",
            scale: 0.1,
            rotate: -35,
            opacity: 1,
            zIndex: 9999
          }}
          animate={{
            left: [jet.startX, (jet.startX + jet.endX) / 2, jet.endX],
            top: [jet.startY, Math.min(jet.startY, jet.endY) - 220, jet.endY],
            scale: [0.1, 1.3, 0.25],
            rotate: [-35, -75, 45, 90],
            opacity: [1, 1, 1, 0]
          }}
          transition={{
            duration: 0.9,
            ease: [0.25, 1, 0.50, 1]
          }}
          onAnimationComplete={() => handleJetComplete(jet.id)}
          className="fixed pointer-events-none w-12 h-12 flex items-center justify-center"
        >
          <div className="relative bg-amber-800 text-white rounded-xl p-2.5 shadow-2xl border border-amber-600 flex items-center justify-center animate-pulse">
            <Mail className="w-5 h-5" />
            {/* Jet engine visual flare */}
            <span className="absolute -left-1.5 w-3 h-3 rounded-full bg-orange-500 blur-sm animate-ping" />
            <span className="absolute -left-3 w-2 h-2 rounded-full bg-yellow-400 blur-[1px] animate-ping" />
            
            {/* Contrail / Sparkle particles trailing behind */}
            <div className="absolute right-full top-1/2 -translate-y-1/2 flex items-center gap-1.5 pr-2 pointer-events-none">
              <span className="w-2 h-2 rounded-full bg-amber-400 opacity-60 animate-ping" />
              <span className="w-1.5 h-1.5 rounded-full bg-white opacity-40 animate-pulse" />
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
}
