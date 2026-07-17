"use client";
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, Phone, MapPin, Clock, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { ScrollAnimate } from '@/components/ui/ScrollAnimate';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { cn } from '@/lib/utils';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faInstagram, faTiktok, faWhatsapp } from '@fortawesome/free-brands-svg-icons';
import { createConsultationAction } from '@/actions/consultation';

library.add(faInstagram, faTiktok, faWhatsapp);

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
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const todayStr = new Date().toISOString().split('T')[0];

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedDate = e.target.value;
    if (selectedDate) {
      const day = new Date(selectedDate).getDay();
      if (day === 0) {
        alert("Our Lekki showroom is closed on Sundays. Please select a Monday to Saturday slot for your consultation.");
        setFormData({ ...formData, date: '' });
        return;
      }
    }
    setFormData({ ...formData, date: selectedDate });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);
    try {
      const result = await createConsultationAction(formData);
      if (result.success) {
        setSubmitted(true);
        setFormData({
          name: '',
          email: '',
          phone: '',
          service: 'Bespoke Kaftan',
          date: '',
          notes: ''
        });
      } else {
        setError(result.error || "Submission failed. Please try again.");
      }
    } catch (err) {
      setError("An unexpected error occurred. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="py-24 bg-white border-t border-gray-150 overflow-hidden text-[#0a0a0a]">
      <div className="container mx-auto px-6 max-w-6xl">
        <SectionHeader 
          title="Book a Consultation" 
          description="Experience our premium tailoring. Fill out the request form below to schedule a private fitting or virtual consultation."
          useSerif={true}
        />

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
                    <a href="https://wa.me/2348066913548" target="_blank" rel="noopener noreferrer" className="text-sm font-medium mt-1 hover:underline text-black">
                      +234 (0) 806 691 3548
                    </a>
                  </div>
                </div>
                <div className="flex gap-4 items-start text-left">
                  <Mail className="w-5 h-5 text-gray-400 flex-shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-xs font-bold uppercase tracking-wider text-gray-400">Email Relations</h4>
                    <a href="mailto:frankiestyles4u@gmail.com" className="text-sm font-medium mt-1 hover:underline text-black">
                      frankiestyles4u@gmail.com
                    </a>
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
                           <option>Bespoke Dry Lace Set</option>
                           <option>Bespoke Agbada Set</option>
                           <option>ISI AGU traditional attire</option>
                           <option>Bespoke Jalabiya Set</option>
                           <option>Bespoke Ready To Wear</option>
                        </select>
                      </div>
                    </div>

                    <div className="space-y-2 text-left">
                      <label className="text-[10px] font-bold uppercase tracking-wider text-gray-400">Preferred Date</label>
                      <Input 
                        type="date" 
                        required 
                        min={todayStr}
                        value={formData.date}
                        onChange={handleDateChange}
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

                    {error && (
                      <p className="text-red-500 text-xs font-semibold text-left">{error}</p>
                    )}

                    <Button 
                      type="submit" 
                      disabled={isSubmitting}
                      className="w-full py-4 text-xs font-semibold uppercase tracking-widest h-12 rounded-xl"
                    >
                      {isSubmitting ? "Submitting..." : "Request Consultation"}
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
                href="https://wa.me/2348066913548" 
                target="_blank" 
                rel="noopener noreferrer"
                className="transition-transform hover:scale-110 active:scale-95 text-[#25d366]"
                title="Message us on WhatsApp"
              >
                <FontAwesomeIcon icon={"fa-brands fa-whatsapp" as any} className="w-12 h-12" />
              </a>
            </div>
          </ScrollAnimate>
        </div>
      </div>
    </section>
  );
}
