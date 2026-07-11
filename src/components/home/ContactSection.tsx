"use client";
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, Phone, MapPin, Clock, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { ScrollAnimate } from '@/components/ui/ScrollAnimate';
import { cn } from '@/lib/utils';

export function ContactSection() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    service: 'Bespoke Kaftan',
    date: '',
    notes: ''
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
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
    <section className="py-24 bg-white border-t border-gray-150 overflow-hidden text-[#0a0a0a]">
      <div className="container mx-auto px-6 max-w-6xl">
        <ScrollAnimate direction="up" className="text-center mb-16">
          <h2 className="text-3xl font-bold tracking-widest uppercase mb-4 text-[#0a0a0a] font-bodoni">Book a Consultation</h2>
          <div className="w-12 h-0.5 bg-[#0a0a0a] mx-auto mb-6"></div>
          <p className="text-sm text-gray-500 max-w-lg mx-auto">
            Experience our premium tailoring. Fill out the request form below to schedule a private fitting or virtual consultation.
          </p>
        </ScrollAnimate>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left Side: Showroom & Contacts */}
          <ScrollAnimate direction="left" className="lg:col-span-5 space-y-10" amount={0.05}>
            <div>
              <h3 className="text-xl font-bold uppercase tracking-wider mb-6 font-bodoni text-left">The Atelier</h3>
              
              <div className="space-y-6">
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

          {/* Right Side: Form */}
          <ScrollAnimate direction="right" className="lg:col-span-7" amount={0.05}>
            <div className="bg-[#f8f8f8] p-8 md:p-10 rounded-2xl smooth-shadow">
              <AnimatePresence mode="wait">
                {submitted ? (
                  <motion.div 
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    className="py-12 flex flex-col items-center justify-center text-center space-y-4"
                  >
                    <CheckCircle className="w-16 h-16 text-green-500 animate-pulse" />
                    <h3 className="text-lg font-bold uppercase tracking-wider">Appointment Requested</h3>
                    <p className="text-xs text-gray-500 max-w-sm">
                      Thank you. A Frankie Styles tailoring representative will contact you shortly to confirm your consultation.
                    </p>
                    <Button variant="outline" size="sm" onClick={() => setSubmitted(false)} className="mt-4">
                      Submit Another Request
                    </Button>
                  </motion.div>
                ) : (
                  <motion.form 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onSubmit={handleSubmit} 
                    className="space-y-5"
                  >
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                      <div className="space-y-2 text-left">
                        <label className="text-[10px] font-bold uppercase tracking-wider text-gray-400">Full Name</label>
                        <Input 
                          type="text" 
                          required 
                          placeholder="John Doe" 
                          value={formData.name}
                          onChange={e => setFormData({ ...formData, name: e.target.value })}
                          className="bg-white border-transparent focus:border-black h-11"
                        />
                      </div>
                      <div className="space-y-2 text-left">
                        <label className="text-[10px] font-bold uppercase tracking-wider text-gray-400">Phone Number</label>
                        <Input 
                          type="tel" 
                          required 
                          placeholder="+234..." 
                          value={formData.phone}
                          onChange={e => setFormData({ ...formData, phone: e.target.value })}
                          className="bg-white border-transparent focus:border-black h-11"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                      <div className="space-y-2 text-left">
                        <label className="text-[10px] font-bold uppercase tracking-wider text-gray-400">Email Address</label>
                        <Input 
                          type="email" 
                          required 
                          placeholder="john@example.com" 
                          value={formData.email}
                          onChange={e => setFormData({ ...formData, email: e.target.value })}
                          className="bg-white border-transparent focus:border-black h-11"
                        />
                      </div>
                      <div className="space-y-2 text-left flex flex-col">
                        <label className="text-[10px] font-bold uppercase tracking-wider text-gray-400 mb-2">Service Needed</label>
                        <select 
                          value={formData.service}
                          onChange={e => setFormData({ ...formData, service: e.target.value })}
                          className="w-full h-11 px-4 rounded-lg border border-transparent bg-white text-xs font-semibold uppercase tracking-wider hover:border-black focus:outline-none focus:border-black transition-colors"
                        >
                          <option>Bespoke Kaftan</option>
                          <option>Bespoke Senator Suit</option>
                          <option>Bespoke Agbada Set</option>
                          <option>IGBO traditional attire</option>
                          <option>Bespoke Jalabiya Set</option>
                        </select>
                      </div>
                    </div>

                    <div className="space-y-2 text-left">
                      <label className="text-[10px] font-bold uppercase tracking-wider text-gray-400">Preferred Date</label>
                      <Input 
                        type="date" 
                        required 
                        value={formData.date}
                        onChange={e => setFormData({ ...formData, date: e.target.value })}
                        className="bg-white border-transparent focus:border-black h-11"
                      />
                    </div>

                    <div className="space-y-2 text-left">
                      <label className="text-[10px] font-bold uppercase tracking-wider text-gray-400">Special Notes</label>
                      <textarea 
                        rows={3}
                        placeholder="Any design requests, specific sizes, or customization preferences..."
                        value={formData.notes}
                        onChange={e => setFormData({ ...formData, notes: e.target.value })}
                        className="w-full p-4 rounded-lg border border-transparent bg-white text-xs focus:outline-none focus:border-black transition-colors resize-none"
                      />
                    </div>

                    <Button type="submit" className="w-full py-4 text-xs font-semibold uppercase tracking-widest h-12 rounded-xl">
                      Request Consultation
                    </Button>
                  </motion.form>
                )}
              </AnimatePresence>
            </div>
          </ScrollAnimate>
        </div>
      </div>
    </section>
  );
}
