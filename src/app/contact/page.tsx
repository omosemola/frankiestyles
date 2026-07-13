"use client";
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, Phone, MapPin, Calendar, Clock, ChevronDown, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { ScrollAnimate } from '@/components/ui/ScrollAnimate';
import { cn } from '@/lib/utils';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faInstagram, faTiktok, faWhatsapp } from '@fortawesome/free-brands-svg-icons';

library.add(faInstagram, faTiktok, faWhatsapp);

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
                          <option>ISI AGWU traditional attire</option>
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
            <div className="mt-8 flex justify-center items-center gap-10">
              {/* Instagram */}
              <a 
                href="https://instagram.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="transition-transform hover:scale-110 active:scale-95 text-[#e1306c]"
                title="Follow us on Instagram"
              >
                <FontAwesomeIcon icon={"fa-brands fa-instagram" as any} className="w-12 h-12" />
              </a>
              {/* TikTok */}
              <a 
                href="https://tiktok.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="transition-transform hover:scale-110 active:scale-95 text-[#000000]"
                title="Follow us on TikTok"
              >
                <FontAwesomeIcon icon={"fa-brands fa-tiktok" as any} className="w-12 h-12" />
              </a>
              {/* WhatsApp */}
              <a 
                href="https://wa.me/2348000000000" 
                target="_blank" 
                rel="noopener noreferrer"
                className="transition-transform hover:scale-110 active:scale-95 text-[#25d366]"
                title="Message us on WhatsApp"
              >
                <FontAwesomeIcon icon={"fa-brands fa-whatsapp" as any} className="w-12 h-12" />
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
