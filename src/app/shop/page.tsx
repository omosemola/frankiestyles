"use client";
import React, { useState, useMemo, useEffect, Suspense } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { SlidersHorizontal, ChevronDown } from 'lucide-react';
import { useSearchParams } from 'next/navigation';
import { Product } from '@/lib/products';
import { ProductCard } from '@/components/shop/ProductCard';
import { getProducts } from '@/actions/products';

type SortOption = 'default' | 'price-asc' | 'price-desc';

function ShopContent() {
  const searchParams = useSearchParams();
  const categoryParam = searchParams.get('category');

  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [sortBy, setSortBy] = useState<SortOption>('default');
  const [isSortOpen, setIsSortOpen] = useState(false);

  // Load products from database
  useEffect(() => {
    async function loadProducts() {
      try {
        const data = await getProducts();
        setProducts(data);
      } catch (err) {
        console.error("Failed to load products:", err);
      } finally {
        setLoading(false);
      }
    }
    loadProducts();
  }, []);

  // Sync state if category changes in URL
  useEffect(() => {
    if (categoryParam) {
      // Decode URL category parameter correctly (e.g. 'Senator+Wears' to 'Senator Wears')
      const decodedCategory = decodeURIComponent(categoryParam).replace(/\+/g, ' ');
      setSelectedCategory(decodedCategory);
    }
  }, [categoryParam]);

  // Categories list extracted from product catalog + 'All'
  const categories = useMemo(() => {
    const cats = new Set(products.map(p => p.category));
    return ['All', ...Array.from(cats)];
  }, [products]);

  // Filtered and sorted products
  const filteredProducts = useMemo(() => {
    let result = [...products];

    // Filter
    if (selectedCategory !== 'All') {
      result = result.filter(p => p.category === selectedCategory);
    }

    // Sort
    if (sortBy === 'price-asc') {
      result.sort((a, b) => a.price - b.price);
    } else if (sortBy === 'price-desc') {
      result.sort((a, b) => b.price - a.price);
    }

    return result;
  }, [products, selectedCategory, sortBy]);

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex flex-col items-center justify-center space-y-4">
        <div className="w-12 h-12 rounded-full border-2 border-gray-100 border-t-black animate-spin" />
        <p className="text-xs uppercase tracking-widest text-gray-400 font-semibold animate-pulse">Loading items...</p>
      </div>
    );
  }

  const sortLabel = {
    'default': 'Newest',
    'price-asc': 'Price: Low to High',
    'price-desc': 'Price: High to Low'
  }[sortBy];

  return (
    <div className="min-h-screen bg-white pt-32 pb-24">
      {/* Header Banner */}
      <div className="container mx-auto px-6 text-center mb-16">
        <motion.p 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-3"
        >
          Frankie Styles Collections
        </motion.p>
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="text-5xl md:text-7xl font-bold tracking-tight text-[#0a0a0a]"
        >
          THE CATALOGUE
        </motion.h1>
        <motion.div 
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="w-20 h-0.5 bg-[#0a0a0a] mx-auto mt-6"
        />
      </div>

      {/* Filter and Sort Toolbar */}
      <div className="container mx-auto px-6 mb-12">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-6 border-b border-gray-100">
          
          {/* Category Filters (Nice Buttons) */}
          <div className="flex flex-wrap gap-2.5">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-5 py-2.5 rounded-full text-xs font-semibold uppercase tracking-wider transition-all duration-300 ${
                  selectedCategory === category
                    ? 'bg-[#0a0a0a] text-white shadow-md shadow-black/10'
                    : 'bg-white text-gray-500 border border-gray-200 hover:border-black hover:text-black'
                }`}
              >
                {category}
              </button>
            ))}
          </div>

          {/* Sort Dropdown */}
          <div className="relative self-end md:self-auto">
            <button
              onClick={() => setIsSortOpen(!isSortOpen)}
              className="flex items-center gap-2 px-5 py-2.5 rounded-full border border-gray-200 text-xs font-semibold uppercase tracking-wider text-[#0a0a0a] hover:border-black transition-colors"
            >
              <SlidersHorizontal className="w-4 h-4" />
              <span>Sort By: {sortLabel}</span>
              <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-300 ${isSortOpen ? 'rotate-180' : ''}`} />
            </button>

            <AnimatePresence>
              {isSortOpen && (
                <>
                  <div className="fixed inset-0 z-10" onClick={() => setIsSortOpen(false)} />
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    transition={{ duration: 0.2 }}
                    className="absolute right-0 mt-2 w-48 bg-white border border-gray-100 rounded-xl shadow-xl z-20 overflow-hidden"
                  >
                    {(['default', 'price-asc', 'price-desc'] as SortOption[]).map((option) => (
                      <button
                        key={option}
                        onClick={() => {
                          setSortBy(option);
                          setIsSortOpen(false);
                        }}
                        className={`w-full text-left px-5 py-3 text-xs uppercase tracking-wider font-semibold hover:bg-gray-50 transition-colors ${
                          sortBy === option ? 'text-black bg-gray-50/50' : 'text-gray-500'
                        }`}
                      >
                        {option === 'default' && 'Newest'}
                        {option === 'price-asc' && 'Price: Low to High'}
                        {option === 'price-desc' && 'Price: High to Low'}
                      </button>
                    ))}
                  </motion.div>
                </>
              )}
            </AnimatePresence>
          </div>

        </div>

        {/* Catalog Count */}
        <div className="text-left mt-6">
          <p className="text-xs text-gray-400 font-medium uppercase tracking-wider">
            Showing {filteredProducts.length} {filteredProducts.length === 1 ? 'Product' : 'Products'}
          </p>
        </div>
      </div>

      {/* Grid Catalog */}
      <div className="container mx-auto px-6">
        <motion.div 
          layout
          className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8"
        >
          <AnimatePresence mode="popLayout">
            {filteredProducts.map((product) => (
              <motion.div
                key={product.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
              >
                <ProductCard product={product} />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {filteredProducts.length === 0 && (
          <div className="py-24 text-center">
            <p className="text-gray-400 font-medium">No items found in this category.</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default function ShopPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-white flex flex-col items-center justify-center space-y-4">
        <div className="w-12 h-12 rounded-full border-2 border-gray-100 border-t-black animate-spin" />
        <p className="text-xs uppercase tracking-widest text-gray-400 font-semibold animate-pulse">Loading catalogue...</p>
      </div>
    }>
      <ShopContent />
    </Suspense>
  );
}
