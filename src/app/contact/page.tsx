"use client";
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, Phone, MapPin, Calendar, Clock, ChevronDown, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { ScrollAnimate } from '@/components/ui/ScrollAnimate';
import { cn } from '@/lib/utils';

interface FAQItem {
  q: string;
  a: string;
}

const FAQS: FAQItem[] = [
  {
    q: "How do custom measurements work?",
    a: "If you select the 'Custom Measure' size option on any product, our tailoring team will reach out to you via Phone/WhatsApp within 24 hours to guide you through taking your measurements, or to book an in-person measurement session at our showroom."
  },
  {
    q: "Do you ship worldwide?",
    a: "Yes, we ship nationwide within Nigeria (1-3 business days) and internationally via DHL/FedEx (5-7 business days) to the United Kingdom, United States, Canada, and across the globe."
  },
  {
    q: "Can I choose custom fabrics and embroidery designs?",
    a: "Absolutely. During a private consultation (in-person or virtual), you can browse our catalog of imported silks, brocades, and cashmeres, and work directly with our designer to sketch custom embroidery patterns."
  },
  {
    q: "What is your return and alterations policy?",
    a: "As custom native wear is tailored specifically to your dimensions, we do not accept standard returns. However, we offer free sizing adjustments and alterations within 7 days of delivery to ensure a perfect fit."
  }
];

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    service: 'Bespoke Kaftan',
    date: '',
    notes: ''
  });
  const [submitted, setSubmitted] = useState(false);
  const [activeFaq, setActiveFaq] = useState<number | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate successful form submission
    setSubmitted(true);
    setTimeout(() => {
      setFormData({
        name: '',
        email: '',
        phone: '',
        service: 'Bespoke Kaftan',
        date: '',
        notes: ''
      });
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-white pt-32 pb-24 text-[#0a0a0a]">
      
      {/* Header */}
      <div className="container mx-auto px-6 text-center mb-20">
        <motion.p 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-3"
        >
          Book an Appointment
        </motion.p>
        <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-[#0a0a0a] uppercase font-bodoni">
          CLIENT RELATIONS
        </h1>
        <div className="w-20 h-0.5 bg-[#0a0a0a] mx-auto mt-6" />
      </div>

      <div className="container mx-auto px-6 max-w-6xl overflow-hidden">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
          
          {/* Left Side: Booking Form */}
          <ScrollAnimate direction="left" className="lg:col-span-7" amount={0.05}>
            <div className="bg-[#f8f8f8] p-8 md:p-12 rounded-2xl smooth-shadow">
              <h2 className="text-2xl font-bold uppercase tracking-wider mb-2 font-bodoni">Private Consultation</h2>
              <p className="text-sm text-gray-500 mb-8 leading-relaxed">
                Book a bespoke consultation session with our design specialists for custom measurements, fabric selection, and styling advice.
              </p>

              <AnimatePresence mode="wait">
                {submitted ? (
                  <motion.div 
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    className="py-12 flex flex-col items-center justify-center text-center space-y-4"
                  >
                    <CheckCircle className="w-16 h-16 text-green-500" />
                    <h3 className="text-xl font-bold uppercase tracking-wider">Appointment Requested</h3>
                    <p className="text-sm text-gray-500 max-w-sm">
                      Thank you. A Frankie Styles tailoring representative will contact you shortly to confirm your consultation.
                    </p>
                    <Button variant="outline" size="sm" onClick={() => setSubmitted(false)}>
                      Submit Another Request
                    </Button>
                  </motion.div>
                ) : (
                  <motion.form 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onSubmit={handleSubmit} 
                    className="space-y-6"
                  >
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className="text-xs font-bold uppercase tracking-wider text-gray-400">Full Name</label>
                        <Input 
                          type="text" 
                          required 
                          placeholder="John Doe" 
                          value={formData.name}
                          onChange={e => setFormData({ ...formData, name: e.target.value })}
                          className="bg-white border-transparent focus:border-black h-12"
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-xs font-bold uppercase tracking-wider text-gray-400">Phone Number</label>
                        <Input 
                          type="tel" 
                          required 
                          placeholder="+234..." 
                          value={formData.phone}
                          onChange={e => setFormData({ ...formData, phone: e.target.value })}
                          className="bg-white border-transparent focus:border-black h-12"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className="text-xs font-bold uppercase tracking-wider text-gray-400">Email Address</label>
                        <Input 
                          type="email" 
                          required 
                          placeholder="john@example.com" 
                          value={formData.email}
                          onChange={e => setFormData({ ...formData, email: e.target.value })}
                          className="bg-white border-transparent focus:border-black h-12"
                        />
                      </div>
                      <div className="space-y-2 flex flex-col">
                        <label className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-2">Service Needed</label>
                        <select 
                          value={formData.service}
                          onChange={e => setFormData({ ...formData, service: e.target.value })}
                          className="w-full h-12 px-4 rounded-lg border border-transparent bg-white text-sm font-semibold uppercase tracking-wider hover:border-black focus:outline-none focus:border-black transition-colors"
                        >
                          <option>Bespoke Kaftan</option>
                          <option>Bespoke Agbada Set</option>
                          <option>IGBO traditional attire</option>
                          <option>Bespoke Jalabiya Set</option>
                          <option>Bespoke Two Pieces</option>
                        </select>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="text-xs font-bold uppercase tracking-wider text-gray-400">Preferred Consultation Date</label>
                      <Input 
                        type="date" 
                        required 
                        value={formData.date}
                        onChange={e => setFormData({ ...formData, date: e.target.value })}
                        className="bg-white border-transparent focus:border-black h-12"
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="text-xs font-bold uppercase tracking-wider text-gray-400">Special Notes / Tailoring Details</label>
                      <textarea 
                        rows={4}
                        placeholder="List any design requests, specific sizes, or customization preferences..."
                        value={formData.notes}
                        onChange={e => setFormData({ ...formData, notes: e.target.value })}
                        className="w-full p-4 rounded-lg border border-transparent bg-white text-sm focus:outline-none focus:border-black transition-colors"
                      />
                    </div>

                    <Button type="submit" className="w-full py-4 text-sm font-semibold uppercase tracking-widest h-14 rounded-xl">
                      Request Consultation
                    </Button>
                  </motion.form>
                )}
              </AnimatePresence>
            </div>

            {/* Colored Social Icons Row */}
            <div className="mt-8 flex justify-center items-center gap-6">
              {/* Instagram */}
              <a 
                href="https://instagram.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-11 h-11 rounded-full bg-white shadow-md border border-gray-150 flex items-center justify-center transition-transform hover:scale-110 active:scale-95"
                title="Follow us on Instagram"
              >
                <svg className="w-5 h-5 text-[#e1306c] fill-current" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.051.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
                </svg>
              </a>
              {/* TikTok */}
              <a 
                href="https://tiktok.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-11 h-11 rounded-full bg-white shadow-md border border-gray-150 flex items-center justify-center transition-transform hover:scale-110 active:scale-95"
                title="Follow us on TikTok"
              >
                <svg className="w-5 h-5 text-[#000000] fill-current" viewBox="0 0 24 24">
                  <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.06-2.89-.54-4.06-1.42-.45-.34-.84-.75-1.18-1.21-.02 1.78.01 3.56-.01 5.34-.04 2.3-.96 4.67-2.73 6.15-2.07 1.83-5.26 2.1-7.61.85-2.68-1.3-4.14-4.57-3.41-7.53.51-2.28 2.26-4.27 4.54-4.83.37-.1.76-.15 1.15-.17v4.07c-.45.06-.9.23-1.25.53-.78.61-1.07 1.69-.73 2.62.33.99 1.39 1.65 2.44 1.48 1.05-.13 1.85-.99 1.94-2.05.08-1.44.02-2.88.03-4.32.01-4.2.01-8.4 0-12.6z" />
                </svg>
              </a>
              {/* WhatsApp */}
              <a 
                href="https://wa.me/2348000000000" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-11 h-11 rounded-full bg-white shadow-md border border-gray-150 flex items-center justify-center transition-transform hover:scale-110 active:scale-95"
                title="Message us on WhatsApp"
              >
                <svg className="w-5 h-5 text-[#25d366] fill-current" viewBox="0 0 24 24">
                  <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.733-1.455L0 24zm6.59-4.846c1.6.95 3.167 1.456 4.743 1.458 5.4 0 9.792-4.39 9.795-9.794.002-2.618-1.01-5.08-2.848-6.92C16.486 2.058 14.028 1.04 11.41 1.04c-5.4 0-9.79 4.39-9.793 9.796-.001 1.707.46 3.376 1.332 4.887l-1.001 3.655 3.738-.98 1.97 1.17zm11.365-7.39c-.27-.135-1.597-.788-1.846-.879-.25-.09-.43-.135-.61.135-.18.27-.696.879-.854 1.06-.157.18-.314.202-.584.067-.27-.135-1.138-.419-2.17-1.339-.8-.713-1.34-1.594-1.497-1.864-.157-.27-.017-.417.118-.552.122-.122.27-.315.405-.472.135-.157.18-.27.27-.45.09-.18.045-.337-.022-.472-.067-.135-.61-1.472-.836-2.015-.22-.53-.44-.457-.61-.466-.157-.008-.337-.009-.517-.009-.18 0-.472.067-.72.337-.25.27-.954.933-.954 2.277 0 1.343.978 2.64 1.113 2.82.135.18 1.925 2.94 4.66 4.12.65.28 1.157.447 1.55.573.653.208 1.248.178 1.717.108.523-.078 1.598-.653 1.822-1.282.225-.63.225-1.17.157-1.282-.067-.113-.25-.18-.52-.315z" />
                </svg>
              </a>
            </div>
          </ScrollAnimate>

          {/* Right Side: Details & FAQs */}
          <div className="lg:col-span-5 flex flex-col justify-between space-y-16">
            
            {/* Atelier Contacts */}
            <ScrollAnimate direction="right" amount={0.05}>
              <div className="space-y-6">
                <h2 className="text-xl font-bold uppercase tracking-wider font-bodoni">The Atelier</h2>
                
                <div className="space-y-4">
                  <div className="flex gap-4 items-start text-left">
                    <MapPin className="w-5 h-5 text-gray-400 flex-shrink-0 mt-0.5" />
                    <div>
                      <h4 className="text-xs font-bold uppercase tracking-wider text-gray-400">Showroom Address</h4>
                      <p className="text-sm font-medium mt-1 leading-relaxed">
                        12b Admiralty Way, Lekki Phase 1, Lagos, Nigeria
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-4 items-start text-left">
                    <Phone className="w-5 h-5 text-gray-400 flex-shrink-0 mt-0.5" />
                    <div>
                      <h4 className="text-xs font-bold uppercase tracking-wider text-gray-400">WhatsApp / Call</h4>
                      <p className="text-sm font-medium mt-1">+234 (0) 809 123 4567</p>
                    </div>
                  </div>
                  <div className="flex gap-4 items-start text-left">
                    <Mail className="w-5 h-5 text-gray-400 flex-shrink-0 mt-0.5" />
                    <div>
                      <h4 className="text-xs font-bold uppercase tracking-wider text-gray-400">Email Relations</h4>
                      <p className="text-sm font-medium mt-1">tailoring@frankiestyles.com</p>
                    </div>
                  </div>
                  <div className="flex gap-4 items-start text-left">
                    <Clock className="w-5 h-5 text-gray-400 flex-shrink-0 mt-0.5" />
                    <div>
                      <h4 className="text-xs font-bold uppercase tracking-wider text-gray-400">Studio Hours</h4>
                      <p className="text-sm font-medium mt-1">Monday – Saturday: 9:00 AM – 6:00 PM</p>
                    </div>
                  </div>
                </div>
              </div>
            </ScrollAnimate>

            {/* Accordion FAQs */}
            <ScrollAnimate direction="right" delay={0.15} amount={0.05}>
              <div className="space-y-6">
                <h2 className="text-xl font-bold uppercase tracking-wider font-bodoni text-left">Common Inquiries</h2>
                
                <div className="space-y-4">
                  {FAQS.map((faq, idx) => (
                    <div key={idx} className="border-b border-gray-100 pb-4">
                      <button
                        onClick={() => setActiveFaq(activeFaq === idx ? null : idx)}
                        className="w-full flex items-center justify-between text-left py-2 group"
                      >
                        <span className="text-sm font-bold uppercase tracking-wider group-hover:text-gray-500 transition-colors">
                          {faq.q}
                        </span>
                        <ChevronDown className={cn(
                          "w-4 h-4 text-gray-400 transition-transform duration-300",
                          activeFaq === idx ? "rotate-180" : ""
                        )} />
                      </button>

                      <AnimatePresence>
                        {activeFaq === idx && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.3 }}
                            className="overflow-hidden"
                          >
                            <p className="text-sm text-gray-500 leading-relaxed font-light mt-2">
                              {faq.a}
                            </p>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  ))}
                </div>
              </div>
            </ScrollAnimate>

          </div>

        </div>
      </div>
    </div>
  );
}
