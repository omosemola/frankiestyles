"use client";
import React, { useState, useEffect } from 'react';
import { DUMMY_PRODUCTS, Product } from '@/lib/products';
import { ProductCard } from '@/components/shop/ProductCard';
import { ScrollAnimate } from '@/components/ui/ScrollAnimate';

export function FeaturedProductsSection() {
  const [shuffledProducts, setShuffledProducts] = useState<Product[]>([]);

  useEffect(() => {
    // Shuffle the whole array and take 6 items
    const shuffled = [...DUMMY_PRODUCTS]
      .sort(() => 0.5 - Math.random())
      .slice(0, 6);
    setShuffledProducts(shuffled);
  }, []);

  if (shuffledProducts.length === 0) {
    // Fallback static placeholders matching SSR structure to prevent layout shifts
    return (
      <div className="grid grid-cols-2 md:grid-cols-3 gap-6 md:gap-8 opacity-0">
        {DUMMY_PRODUCTS.slice(0, 6).map((product) => (
          <div key={product.id}>
            <ProductCard product={product} />
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-6 md:gap-8">
      {shuffledProducts.map((product, idx) => (
        <ScrollAnimate key={product.id} delay={idx * 0.1} amount={0.05}>
          <ProductCard product={product} />
        </ScrollAnimate>
      ))}
    </div>
  );
}
