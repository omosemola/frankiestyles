"use client";
import React, { Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { CheckCircle, Calendar, ShieldCheck, ShoppingBag } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import Link from 'next/link';

function SuccessContent() {
  const searchParams = useSearchParams();
  const reference = searchParams.get('reference') || 'N/A';

  return (
    <div className="max-w-xl bg-white p-8 md:p-12 rounded-2xl smooth-shadow text-center space-y-8">
      {/* Success Mark */}
      <div className="flex justify-center">
        <div className="bg-green-50 p-4 rounded-full">
          <CheckCircle className="w-16 h-16 text-green-500" />
        </div>
      </div>

      {/* Headings */}
      <div className="space-y-3">
        <h1 className="text-3xl md:text-4xl font-bold tracking-tight uppercase font-bodoni text-[#0a0a0a]">Order Confirmed</h1>
        <p className="text-sm text-gray-500 max-w-sm mx-auto leading-relaxed">
          Your payment was processed successfully. Thank you for choosing Frankie Styles for your native wears.
        </p>
      </div>

      {/* Order Reference Box */}
      <div className="bg-[#f8f8f8] p-5 rounded-xl border border-gray-100 text-left space-y-3 text-xs font-semibold">
        <div className="flex justify-between">
          <span className="text-gray-400 uppercase tracking-wider">Payment Reference</span>
          <span className="text-black font-mono select-all">{reference}</span>
        </div>
        <div className="flex justify-between border-t border-gray-100 pt-3">
          <span className="text-gray-400 uppercase tracking-wider">Status</span>
          <span className="text-green-600 font-bold uppercase tracking-wider">Paid</span>
        </div>
      </div>

      {/* Bespoke Custom Tailoring Notice */}
      <div className="flex gap-3 items-start text-left bg-blue-50/50 p-4 rounded-xl text-xs text-blue-700">
        <Calendar className="w-5 h-5 flex-shrink-0 mt-0.5" />
        <div>
          <h4 className="font-bold uppercase tracking-wider">Bespoke Order Process</h4>
          <p className="font-light mt-1 leading-relaxed">
            Our tailors are already reviewing your order. If you selected a "Custom Measure" size, expect a call or WhatsApp message within 24 hours to schedule fittings or guide you through measurements.
          </p>
        </div>
      </div>

      {/* CTAs */}
      <div className="flex flex-col sm:flex-row gap-4 pt-4">
        <Link href="/shop" className="flex-grow">
          <Button variant="default" className="w-full py-4 text-xs font-bold uppercase tracking-widest h-14 rounded-xl flex items-center justify-center gap-2">
            <ShoppingBag className="w-4 h-4" /> Continue Shopping
          </Button>
        </Link>
        <Link href="/contact" className="flex-grow">
          <Button variant="outline" className="w-full py-4 text-xs font-bold uppercase tracking-widest h-14 rounded-xl">
            Book Fitting Studio
          </Button>
        </Link>
      </div>

      <div className="flex items-center gap-1.5 justify-center text-[10px] text-gray-400 pt-4 border-t border-gray-50">
        <ShieldCheck className="w-4 h-4 text-green-500" />
        <span>Paystack Secured Transaction Confirmation</span>
      </div>
    </div>
  );
}

export default function OrderSuccessPage() {
  return (
    <div className="min-h-screen bg-[#f8f8f8] pt-32 pb-24 flex items-center justify-center px-6">
      <Suspense fallback={
        <div className="text-center space-y-4">
          <div className="w-12 h-12 rounded-full border-2 border-gray-100 border-t-black animate-spin mx-auto" />
          <p className="text-xs uppercase tracking-widest text-gray-400 font-semibold animate-pulse">Loading receipt...</p>
        </div>
      }>
        <SuccessContent />
      </Suspense>
    </div>
  );
}
