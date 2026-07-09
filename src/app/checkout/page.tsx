"use client";
import React from 'react';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

// Dynamically load the checkout form component to disable SSR (server-side rendering) 
// since react-paystack evaluations require the browser's "window" object.
const CheckoutForm = dynamic(
  () => import('@/components/shop/CheckoutForm').then((mod) => mod.CheckoutForm),
  {
    ssr: false,
    loading: () => (
      <div className="min-h-screen bg-white flex flex-col items-center justify-center space-y-4">
        <div className="w-12 h-12 rounded-full border-2 border-gray-100 border-t-black animate-spin" />
        <p className="text-xs uppercase tracking-widest text-gray-400 font-semibold animate-pulse">
          Loading Checkout...
        </p>
      </div>
    )
  }
);

export default function CheckoutPage() {
  return (
    <div className="min-h-screen bg-[#f8f8f8] pt-32 pb-24 text-[#0a0a0a]">
      <div className="container mx-auto px-6 max-w-6xl">
        
        {/* Back Link */}
        <Link href="/shop" className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest hover:underline underline-offset-4 mb-10 text-gray-500 hover:text-black transition-colors">
          <ArrowLeft className="w-4 h-4" /> Back to Shop
        </Link>

        <h1 className="text-4xl font-bold tracking-tight uppercase font-bodoni mb-12">
          Checkout Details
        </h1>

        <CheckoutForm />
      </div>
    </div>
  );
}
