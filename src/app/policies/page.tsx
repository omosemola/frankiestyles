"use client";
import React, { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { ShieldCheck, Truck, RotateCcw, FileText } from 'lucide-react';

const TABS = [
  {
    id: 'shipping',
    label: 'Shipping Policy',
    icon: Truck,
    content: (
      <div className="space-y-6">
        <h2 className="text-2xl font-bold uppercase tracking-wider font-bodoni text-[#0a0a0a]">Shipping Policy</h2>
        <div className="w-12 h-0.5 bg-[#0a0a0a] mb-6" />
        <div className="space-y-4 text-sm text-gray-600 leading-relaxed font-light">
          <p>
            At Frankie Styles, each bespoke garment is crafted with surgical precision. Because we custom-tailor every native wear and Agbada to your exact sizing parameters, please allow <strong>7 to 14 business days</strong> for design, embroidery, and workshop production.
          </p>
          <h4 className="font-bold text-[#0a0a0a] mt-4 uppercase text-xs tracking-wider">Domestic Deliveries (Nigeria)</h4>
          <p>
            • <strong>Lagos Metropolitan Area:</strong> 1–2 business days after production completes. Standard shipping is free. Priority same-day courier dispatch is available on special request.
          </p>
          <p>
            • <strong>Other Nigerian States (Abuja, Port Harcourt, Enugu, etc.):</strong> 3–5 business days after production. Dispatched via reliable nationwide logistics partners (GIG Logistics, DHL).
          </p>
          <h4 className="font-bold text-[#0a0a0a] mt-4 uppercase text-xs tracking-wider">International Shipping</h4>
          <p>
            We ship globally to the United States, Canada, United Kingdom, and rest of Europe via <strong>DHL Express Courier</strong>. International transit takes 5–8 business days after dispatch. Customs duties, local taxes, or import fees are the responsibility of the importing client.
          </p>
        </div>
      </div>
    )
  },
  {
    id: 'refunds',
    label: 'Refund & Alterations',
    icon: RotateCcw,
    content: (
      <div className="space-y-6">
        <h2 className="text-2xl font-bold uppercase tracking-wider font-bodoni text-[#0a0a0a]">Refund & Alterations</h2>
        <div className="w-12 h-0.5 bg-[#0a0a0a] mb-6" />
        <div className="space-y-4 text-sm text-gray-600 leading-relaxed font-light">
          <p>
            Our core mission is the achievement of the perfect fit. Since every native attire is custom-tailored to individual measurements, all commissions are bespoke, unique to you.
          </p>
          <h4 className="font-bold text-[#0a0a0a] mt-4 uppercase text-xs tracking-wider">Complimentary Alterations</h4>
          <p>
            We offer <strong>complimentary fitting adjustments</strong> within <strong>14 days</strong> of receiving your garment. If your kaftan, senator, or agbada requires micro-alterations (sleeve length, chest adjustments, or pant cuffing), please contact us at <a href="mailto:frankiestyles4u@gmail.com" className="font-bold text-black underline">frankiestyles4u@gmail.com</a> to arrange a fitting session in our Lekki studio or to ship the item back.
          </p>
          <h4 className="font-bold text-[#0a0a0a] mt-4 uppercase text-xs tracking-wider">Return & Cancellation Policy</h4>
          <p>
            Because custom-cut garments cannot be resold, we do not accept returns or issue full cash refunds for change of mind. Refunds are only issued in the extremely rare event of an uncorrectable fabric defect or sizing deviation that cannot be resolved through our complimentary alteration sessions.
          </p>
        </div>
      </div>
    )
  },
  {
    id: 'privacy',
    label: 'Privacy Policy',
    icon: ShieldCheck,
    content: (
      <div className="space-y-6">
        <h2 className="text-2xl font-bold uppercase tracking-wider font-bodoni text-[#0a0a0a]">Privacy Policy</h2>
        <div className="w-12 h-0.5 bg-[#0a0a0a] mb-6" />
        <div className="space-y-4 text-sm text-gray-600 leading-relaxed font-light">
          <p>
            Frankie Styles respects your personal data. This privacy statement explains the collection, storage, and processing of user information.
          </p>
          <h4 className="font-bold text-[#0a0a0a] mt-4 uppercase text-xs tracking-wider">Information We Collect</h4>
          <p>
            • <strong>Client Measurement Profile:</strong> We store chest, shoulder, waist, and sleeve parameters solely to construct your bespoke clothing and fast-track subsequent orders.
          </p>
          <p>
            • <strong>Contact Details:</strong> Billing address, email address, phone numbers are collected to dispatch packages, update you on order progress, and deliver payment notifications.
          </p>
          <h4 className="font-bold text-[#0a0a0a] mt-4 uppercase text-xs tracking-wider">Payment Processing Security</h4>
          <p>
            All credit card and bank transactions are handled securely through <strong>Paystack</strong>. Frankie Styles does not store or process card details on our local database servers.
          </p>
        </div>
      </div>
    )
  },
  {
    id: 'terms',
    label: 'Terms of Service',
    icon: FileText,
    content: (
      <div className="space-y-6">
        <h2 className="text-2xl font-bold uppercase tracking-wider font-bodoni text-[#0a0a0a]">Terms of Service</h2>
        <div className="w-12 h-0.5 bg-[#0a0a0a] mb-6" />
        <div className="space-y-4 text-sm text-gray-600 leading-relaxed font-light">
          <p>
            By visiting our website and commissioning custom tailoring from Frankie Styles, you agree to follow our Terms of Service.
          </p>
          <h4 className="font-bold text-[#0a0a0a] mt-4 uppercase text-xs tracking-wider">Sizing Responsibility</h4>
          <p>
            It is the client's responsibility to select correct measurements (using our standard chest-sizing drop-down during online checkout) or request a private measuring consultation to guarantee fit correctness.
          </p>
          <h4 className="font-bold text-[#0a0a0a] mt-4 uppercase text-xs tracking-wider">Embroidery Variations</h4>
          <p>
            Our native garments showcase handcrafted embroidery. Due to the individual manual stitching process of our Lagos artisans, tiny creative variations in stitch details are standard hallmarks of authentic custom tailoring and are not classified as defects.
          </p>
        </div>
      </div>
    )
  }
];

function PolicyPageContent() {
  const searchParams = useSearchParams();
  const [activeTab, setActiveTab] = useState('shipping');

  useEffect(() => {
    const tabParam = searchParams.get('tab');
    if (tabParam && TABS.some(t => t.id === tabParam)) {
      setActiveTab(tabParam);
    }
  }, [searchParams]);

  const activeContent = TABS.find(t => t.id === activeTab) || TABS[0];

  return (
    <div className="container mx-auto px-6 max-w-5xl">
      <div className="grid grid-cols-1 md:grid-cols-12 gap-12">
        {/* Left Side: Tabs Navigation */}
        <div className="md:col-span-4 space-y-2">
          {TABS.map((tab) => {
            const Icon = tab.icon;
            const isSelected = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`w-full flex items-center gap-4 px-6 py-4 rounded-xl text-sm font-semibold uppercase tracking-wider transition-all duration-300 ${
                  isSelected 
                    ? 'bg-[#0a0a0a] text-white shadow-lg shadow-black/10' 
                    : 'bg-[#f8f8f8] text-gray-400 hover:text-black hover:bg-gray-100'
                }`}
              >
                <Icon className="w-5 h-5 flex-shrink-0" />
                <span className="text-left">{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Right Side: Tab Content Panel */}
        <div className="md:col-span-8 bg-white p-8 md:p-12 rounded-2xl border border-gray-100 smooth-shadow min-h-[400px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            >
              {activeContent.content}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}

export default function PoliciesPage() {
  return (
    <div className="min-h-screen bg-[#fcfcfc] pt-36 pb-24 text-[#0a0a0a]">
      {/* Header */}
      <div className="container mx-auto px-6 text-center mb-16">
        <span className="text-xs font-bold uppercase tracking-widest text-gray-400">Atelier Guidelines</span>
        <h1 className="text-4xl md:text-6xl font-bold uppercase tracking-widest font-bodoni mt-2">POLICIES & SERVICE</h1>
        <div className="w-16 h-0.5 bg-[#0a0a0a] mx-auto mt-6" />
      </div>

      <Suspense fallback={
        <div className="min-h-[400px] flex items-center justify-center">
          <div className="w-8 h-8 rounded-full border-2 border-gray-100 border-t-black animate-spin" />
        </div>
      }>
        <PolicyPageContent />
      </Suspense>
    </div>
  );
}
