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
import { MeasurementModal } from '@/components/shop/MeasurementModal';
import { BespokeSizingGuide } from '@/components/shop/BespokeSizingGuide';

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
  
  // Custom Sizing States
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

  // Inline Bespoke Form States
  const [inlineMeasurements, setInlineMeasurements] = useState({
    chest: '',
    shoulder: '',
    sleeve: '',
    waist: '',
    trouserLength: '',
    topLength: '',
  });
  const [formError, setFormError] = useState<string | null>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  const isWishlisted = mounted && hasItem(product.id);

  const handleAddToCart = () => {
    setIsAdding(true);
    const isJalabiya = product.category === "Jalabiya";
    
    if (selectedSize === "Custom Measure") {
      const { chest, shoulder, sleeve, waist, trouserLength, topLength } = inlineMeasurements;
      const hasRequired = isJalabiya 
        ? (chest && shoulder && sleeve)
        : (chest && shoulder && sleeve && waist && trouserLength && topLength);
        
      if (!hasRequired) {
        setFormError("Please fill in all custom measurements to customize your bespoke fit.");
        setIsAdding(false);
        return;
      }
      setFormError(null);
      const sizeString = isJalabiya 
        ? `Custom (C:${chest}" S:${shoulder}" Sl:${sleeve}")`
        : `Custom (C:${chest}" S:${shoulder}" Sl:${sleeve}" W:${waist}" TL:${trouserLength}" L:${topLength}")`;
      
      addItem({
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.image,
        category: product.category,
        size: sizeString,
      });
    } else {
      addItem({
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.image,
        category: product.category,
        size: selectedSize,
      });
    }

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
                          setSelectedSize("Custom Measure");
                        } else {
                          setSelectedSize(size);
                          setCustomMeasurements(null);
                          setFormError(null);
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

              {/* Inline Custom Measurements Form */}
              {selectedSize === "Custom Measure" && (
                <div className="border border-gray-150 rounded-2xl p-6 bg-gray-50/30 space-y-6 mt-6">
                  <div>
                    <h3 className="text-xs font-bold uppercase tracking-widest text-black">Bespoke Fit Configuration</h3>
                    <p className="text-[10px] text-gray-400 mt-1 uppercase tracking-wider">
                      Please enter your measurements in inches below.
                    </p>
                  </div>
                  
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {(product.category === "Jalabiya"
                      ? [
                          { label: 'Chest', key: 'chest' },
                          { label: 'Shoulder', key: 'shoulder' },
                          { label: 'Sleeve', key: 'sleeve' }
                        ]
                      : [
                          { label: 'Chest', key: 'chest' },
                          { label: 'Shoulder', key: 'shoulder' },
                          { label: 'Sleeve', key: 'sleeve' },
                          { label: 'Waist', key: 'waist' },
                          { label: 'Trouser Length', key: 'trouserLength' },
                          { label: 'Top Length', key: 'topLength' }
                        ]
                    ).map((field) => (
                      <div key={field.key} className="space-y-1">
                        <label className="block text-[10px] font-bold uppercase tracking-wider text-gray-400">
                          {field.label}
                        </label>
                        <div className="relative">
                          <input
                            type="number"
                            step="0.5"
                            min="0"
                            placeholder="e.g. 40"
                            value={inlineMeasurements[field.key as keyof typeof inlineMeasurements]}
                            onChange={(e) => {
                              setInlineMeasurements({
                                ...inlineMeasurements,
                                [field.key]: e.target.value
                              });
                              if (formError) setFormError(null);
                            }}
                            className="w-full h-11 bg-white border border-gray-200 text-black text-xs font-semibold px-3 rounded-lg outline-none focus:border-black transition-all pr-8"
                          />
                          <span className="absolute right-3 top-1/2 -translate-y-1/2 text-[10px] font-bold text-gray-400">in</span>
                        </div>
                      </div>
                    ))}
                  </div>

                  <BespokeSizingGuide />

                  {formError && (
                    <div className="p-3 bg-red-50 border border-red-100 rounded-lg text-xs font-medium text-red-600">
                      {formError}
                    </div>
                  )}
                </div>
              )}
            </div>


            {/* Add to Cart CTA & Wishlist */}
            <div className="flex gap-4 items-center flex-grow">
              <div className="animated-link-wrapper-demo flex-grow h-16">
                <div className="animated-link-effect-demo">
                  <div />
                </div>
                <button
                  onClick={handleAddToCart}
                  disabled={isAdding}
                  className="animated-link-demo w-full h-full text-xs uppercase tracking-widest font-bold flex items-center justify-center gap-2.5 transition-all duration-300 active:scale-95 disabled:opacity-80"
                >
                  <ShoppingBag className="w-5 h-5" />
                  {isAdding ? "Adding to Bag..." : "Add to Bag"}
                </button>
              </div>
              
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


    </div>
  );
}
