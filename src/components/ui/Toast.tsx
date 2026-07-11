"use client";
import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, CheckCircle2, ArrowRight } from 'lucide-react';
import { useToastStore } from '@/store/useToastStore';
import { useCartStore } from '@/store/useCartStore';
import Link from 'next/link';

export function Toast() {
  const { toast, hideToast } = useToastStore();
  const { setIsOpen } = useCartStore();

  useEffect(() => {
    if (toast) {
      const timer = setTimeout(() => {
        hideToast();
      }, 4000);
      return () => clearTimeout(timer);
    }
  }, [toast, hideToast]);

  return (
    <AnimatePresence>
      {toast && (
        <motion.div
          initial={{ opacity: 0, y: -20, x: 20, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, x: 0, scale: 1 }}
          exit={{ opacity: 0, y: -20, scale: 0.95 }}
          transition={{ type: 'spring', stiffness: 350, damping: 25 }}
          className="fixed top-24 right-6 z-[9999] bg-white border border-gray-150 rounded-2xl smooth-shadow p-4 w-full max-w-sm flex flex-col gap-4 pointer-events-auto"
        >
          {/* Top Row: Success Header */}
          <div className="flex justify-between items-start gap-4">
            <div className="flex gap-2.5 items-center text-left">
              <CheckCircle2 className="w-5 h-5 text-green-500 flex-shrink-0" />
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-[#0a0a0a]">Added to Bag</h4>
                <p className="text-[10px] text-gray-400 mt-0.5">Item ready for bespoke fit</p>
              </div>
            </div>
            <button
              onClick={hideToast}
              className="p-1 hover:bg-gray-50 rounded-full transition-colors"
              aria-label="Close notification"
            >
              <X className="w-4 h-4 text-gray-400 hover:text-black" />
            </button>
          </div>

          {/* Middle Row: Product Card Summary */}
          <div className="flex gap-3 items-center bg-[#f8f8f8] p-2.5 rounded-xl border border-gray-100 text-left">
            <div className="w-12 h-16 bg-white rounded-lg overflow-hidden border border-gray-100 flex-shrink-0">
              <img src={toast.image} alt={toast.name} className="w-full h-full object-cover" />
            </div>
            <div className="min-w-0 flex-grow">
              <h5 className="text-xs font-bold uppercase tracking-wide truncate text-[#0a0a0a]">{toast.name}</h5>
              <p className="text-[10px] text-gray-400 mt-1 truncate">Size: {toast.size}</p>
            </div>
          </div>

          {/* Bottom Row: Actions */}
          <div className="grid grid-cols-2 gap-3">
            <button
              onClick={() => {
                hideToast();
                setIsOpen(true);
              }}
              className="py-2.5 text-[10px] font-bold uppercase tracking-wider border border-[#0a0a0a] rounded-lg hover:bg-gray-50 text-[#0a0a0a] transition-all text-center"
            >
              View Bag
            </button>
            <Link
              href="/checkout"
              onClick={hideToast}
              className="py-2.5 text-[10px] font-bold uppercase tracking-wider bg-[#0a0a0a] hover:bg-black/90 text-white rounded-lg flex items-center justify-center gap-1.5 transition-all text-center"
            >
              Checkout <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
