"use client";
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Ruler, Sparkles, Check } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { cn } from '@/lib/utils';

interface MeasurementModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialTab?: 'standard' | 'custom';
  category?: string;
  onApplyCustom: (measurements: {
    chest: string;
    shoulder: string;
    sleeve: string;
    waist?: string;
    trouserLength?: string;
    topLength?: string;
  }) => void;
}

export function MeasurementModal({ isOpen, onClose, initialTab = 'standard', category, onApplyCustom }: MeasurementModalProps) {
  const [activeTab, setActiveTab] = useState<'standard' | 'custom'>(initialTab);
  const [focusedField, setFocusedField] = useState<string>('chest');

  const isJalabiya = category === "Jalabiya";

  // Custom Sizing Inputs
  const [chest, setChest] = useState('40');
  const [shoulder, setShoulder] = useState('18');
  const [sleeve, setSleeve] = useState('25');
  const [waist, setWaist] = useState('34');
  const [trouserLength, setTrouserLength] = useState('42');
  const [topLength, setTopLength] = useState('38');

  // Sync tab with initial prop when opened
  useEffect(() => {
    if (isOpen) {
      setActiveTab(initialTab);
    }
  }, [isOpen, initialTab]);

  // Handle escape key to close
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  if (!isOpen) return null;

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    onApplyCustom({
      chest,
      shoulder,
      sleeve,
      topLength,
      ...(isJalabiya ? {} : { waist, trouserLength })
    });
    onClose();
  };

  // Measuring instruction database
  const GUIDES: Record<string, { title: string; desc: string; tip: string }> = {
    chest: {
      title: "Chest Circumference",
      desc: "Measure around the fullest part of your chest, keeping the tape horizontal and flat against your back. Take a deep breath to ensure a comfortable fit.",
      tip: "Ideal fit: Leave two fingers space under the tape."
    },
    shoulder: {
      title: "Shoulder Width",
      desc: "Measure from the edge of one shoulder bone, straight across the curvature of your upper back, to the edge of the other shoulder bone.",
      tip: "Keep shoulders relaxed and back straight."
    },
    sleeve: {
      title: "Sleeve Length",
      desc: "Measure from your shoulder joint (where the arm meets the body) down along your arm to your wrist bone.",
      tip: "For short-sleeves, measure to your elbow joint instead."
    },
    waist: {
      title: "Waist Circumference",
      desc: "Measure around your natural waistline, where you typically wear your trousers or native sokoto pants.",
      tip: "Do not pull the measuring tape too tight; keep it breathing-room relaxed."
    },
    trouserLength: {
      title: "Trouser / Sokoto Length",
      desc: "Measure from your waistline (where your belt sits) straight down to the ankle bone or your desired bottom cuff hemline.",
      tip: "We recommend measuring while wearing shoes for the perfect drape."
    },
    topLength: {
      title: isJalabiya ? "Jalabiya Length" : "Top / Buba Length",
      desc: isJalabiya 
        ? "Measure from the base of your neck (highest shoulder point) straight down your chest to your ankles or desired robe hemline."
        : "Measure from the base of your neck (highest shoulder point) straight down your chest to your mid-thigh or knee level, depending on style.",
      tip: isJalabiya
        ? "A standard Jalabiya robe should reach just above the ankles."
        : "A standard Kaftan falls just above the knees."
    }
  };

  const currentGuide = GUIDES[focusedField] || GUIDES.chest;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        {/* Backdrop overlay */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        />

        {/* Modal Card wrapper */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ type: 'spring', duration: 0.5 }}
          className="bg-white text-black w-full max-w-4xl rounded-2xl overflow-hidden shadow-2xl z-10 flex flex-col max-h-[90vh] md:max-h-[85vh] relative"
        >
          {/* Header Panel */}
          <div className="flex justify-between items-center px-6 py-5 border-b border-gray-100 flex-shrink-0">
            <div className="flex items-center gap-2">
              <Ruler className="w-5 h-5 text-gray-500" />
              <h2 className="text-lg font-bold uppercase tracking-wider font-bodoni">Sizing & Fitting Assistant</h2>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Sizing Tabs Selector */}
          <div className="flex border-b border-gray-100 flex-shrink-0">
            <button
              onClick={() => setActiveTab('standard')}
              className={cn(
                "flex-1 py-4 text-xs font-bold uppercase tracking-wider transition-all border-b-2",
                activeTab === 'standard'
                  ? "border-black text-black bg-gray-50"
                  : "border-transparent text-gray-400 hover:text-black"
              )}
            >
              Standard Size Chart
            </button>
            <button
              onClick={() => setActiveTab('custom')}
              className={cn(
                "flex-1 py-4 text-xs font-bold uppercase tracking-wider transition-all border-b-2 flex justify-center items-center gap-2",
                activeTab === 'custom'
                  ? "border-black text-black bg-gray-50"
                  : "border-transparent text-gray-400 hover:text-black"
              )}
            >
              <Sparkles className="w-3.5 h-3.5" /> Bespoke Custom Fitter
            </button>
          </div>

          {/* Scrollable Contents Grid */}
          <div className="overflow-y-auto flex-grow p-6 md:p-8">
            {activeTab === 'standard' ? (
              <div className="space-y-6">
                <p className="text-sm text-gray-500 text-left">
                  Find your perfect match in our standard luxury fits. Our garments are structured to provide drape and room.
                </p>
                <div className="overflow-x-auto rounded-xl border border-gray-150">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="bg-gray-50 border-b border-gray-100 text-xs font-bold uppercase tracking-wider text-gray-500">
                        <th className="py-4 px-6">Size Tag</th>
                        <th className="py-4 px-6">Chest (in)</th>
                        <th className="py-4 px-6">Shoulder (in)</th>
                        {!isJalabiya && <th className="py-4 px-6">Trouser Waist (in)</th>}
                        <th className="py-4 px-6">Height Fit</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100 text-sm font-medium">
                      <tr className="hover:bg-gray-50/50">
                        <td className="py-4 px-6 font-bold">M</td>
                        <td className="py-4 px-6">38 – 40"</td>
                        <td className="py-4 px-6">17.5 – 18.0"</td>
                        {!isJalabiya && <td className="py-4 px-6">30 – 32"</td>}
                        <td className="py-4 px-6">5'6" – 5'8"</td>
                      </tr>
                      <tr className="hover:bg-gray-50/50">
                        <td className="py-4 px-6 font-bold">L</td>
                        <td className="py-4 px-6">41 – 43"</td>
                        <td className="py-4 px-6">18.0 – 18.5"</td>
                        {!isJalabiya && <td className="py-4 px-6">33 – 35"</td>}
                        <td className="py-4 px-6">5'8" – 5'10"</td>
                      </tr>
                      <tr className="hover:bg-gray-50/50">
                        <td className="py-4 px-6 font-bold">XL</td>
                        <td className="py-4 px-6">44 – 46"</td>
                        <td className="py-4 px-6">18.5 – 19.0"</td>
                        {!isJalabiya && <td className="py-4 px-6">36 – 38"</td>}
                        <td className="py-4 px-6">5'10" – 6'0"</td>
                      </tr>
                      <tr className="hover:bg-gray-50/50">
                        <td className="py-4 px-6 font-bold">XXL</td>
                        <td className="py-4 px-6">47 – 49"</td>
                        <td className="py-4 px-6">19.0 – 20.0"</td>
                        {!isJalabiya && <td className="py-4 px-6">39 – 41"</td>}
                        <td className="py-4 px-6">6'0" – 6'2"</td>
                      </tr>
                      <tr className="hover:bg-gray-50/50">
                        <td className="py-4 px-6 font-bold">XXXL</td>
                        <td className="py-4 px-6">50 – 52"</td>
                        <td className="py-4 px-6">20.0 – 21.0"</td>
                        {!isJalabiya && <td className="py-4 px-6">42 – 44"</td>}
                        <td className="py-4 px-6">6'2"+</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <div className="bg-gray-50 p-4 rounded-xl text-xs text-gray-500 leading-relaxed text-left border border-gray-100">
                  <span className="font-bold text-black uppercase block mb-1">Standard Fit Details:</span>
                  All standard items include customized waistbands (drawstrings + premium elastic) and tailored hems that support minor adjustments by any local tailor or through our atelier return services.
                </div>
              </div>
            ) : (
              <form onSubmit={handleSave} className="grid grid-cols-1 md:grid-cols-12 gap-8 text-left">
                {/* Form Input Panel */}
                <div className="md:col-span-7 space-y-6">
                  <div className="border-b border-gray-100 pb-3">
                    <h3 className="text-base font-bold uppercase tracking-wider">Custom Measurements (Inches)</h3>
                    <p className="text-xs text-gray-400 mt-1">Select an input field to view its measuring guidelines.</p>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-6">
                    {/* Chest Field */}
                    <div className="space-y-2">
                      <label className="text-[10px] font-bold uppercase tracking-wider text-gray-400">Chest</label>
                      <Input
                        type="number"
                        min="30"
                        max="70"
                        required
                        value={chest}
                        onChange={(e) => setChest(e.target.value)}
                        onFocus={() => setFocusedField('chest')}
                        className="bg-gray-50 border-transparent focus:border-black focus:bg-white h-12"
                      />
                    </div>
                    {/* Shoulder Field */}
                    <div className="space-y-2">
                      <label className="text-[10px] font-bold uppercase tracking-wider text-gray-400">Shoulder Width</label>
                      <Input
                        type="number"
                        min="13"
                        max="30"
                        required
                        value={shoulder}
                        onChange={(e) => setShoulder(e.target.value)}
                        onFocus={() => setFocusedField('shoulder')}
                        className="bg-gray-50 border-transparent focus:border-black focus:bg-white h-12"
                      />
                    </div>
                    {/* Sleeve Field */}
                    <div className="space-y-2">
                      <label className="text-[10px] font-bold uppercase tracking-wider text-gray-400">Sleeve Length</label>
                      <Input
                        type="number"
                        min="10"
                        max="40"
                        required
                        value={sleeve}
                        onChange={(e) => setSleeve(e.target.value)}
                        onFocus={() => setFocusedField('sleeve')}
                        className="bg-gray-50 border-transparent focus:border-black focus:bg-white h-12"
                      />
                    </div>
                    {/* Waist Field */}
                    {!isJalabiya && (
                      <div className="space-y-2">
                        <label className="text-[10px] font-bold uppercase tracking-wider text-gray-400">Trouser Waist</label>
                        <Input
                          type="number"
                          min="24"
                          max="70"
                          required={!isJalabiya}
                          value={waist}
                          onChange={(e) => setWaist(e.target.value)}
                          onFocus={() => setFocusedField('waist')}
                          className="bg-gray-50 border-transparent focus:border-black focus:bg-white h-12"
                        />
                      </div>
                    )}
                    {/* Trouser Length */}
                    {!isJalabiya && (
                      <div className="space-y-2">
                        <label className="text-[10px] font-bold uppercase tracking-wider text-gray-400">Trouser Length</label>
                        <Input
                          type="number"
                          min="30"
                          max="60"
                          required={!isJalabiya}
                          value={trouserLength}
                          onChange={(e) => setTrouserLength(e.target.value)}
                          onFocus={() => setFocusedField('trouserLength')}
                          className="bg-gray-50 border-transparent focus:border-black focus:bg-white h-12"
                        />
                      </div>
                    )}
                    {/* Top Length / Gown Length */}
                    <div className="space-y-2">
                      <label className="text-[10px] font-bold uppercase tracking-wider text-gray-400">
                        {isJalabiya ? "Length" : "Top / Shirt Length"}
                      </label>
                      <Input
                        type="number"
                        min={isJalabiya ? "45" : "25"}
                        max={isJalabiya ? "70" : "60"}
                        required
                        value={topLength}
                        onChange={(e) => setTopLength(e.target.value)}
                        onFocus={() => setFocusedField('topLength')}
                        className="bg-gray-50 border-transparent focus:border-black focus:bg-white h-12"
                      />
                    </div>
                  </div>

                  <Button
                    type="submit"
                    className="w-full py-4 text-xs font-semibold uppercase tracking-widest h-14 rounded-xl flex items-center justify-center gap-2 bg-black hover:bg-black/90 text-white mt-8"
                  >
                    <Check className="w-4 h-4" /> Save & Apply Custom Dimensions
                  </Button>
                </div>

                {/* Right Interactive Instruction Card */}
                <div className="md:col-span-5 flex flex-col justify-between">
                  <div className="bg-[#f8f8f8] p-6 rounded-2xl border border-gray-100 flex-grow flex flex-col justify-center text-left">
                    <div className="w-10 h-10 rounded-full bg-black text-white flex items-center justify-center font-bold text-sm mb-4">
                      {focusedField === 'chest' && "1"}
                      {focusedField === 'shoulder' && "2"}
                      {focusedField === 'sleeve' && "3"}
                      {focusedField === 'waist' && "4"}
                      {focusedField === 'trouserLength' && "5"}
                      {focusedField === 'topLength' && "6"}
                    </div>
                    <h4 className="text-base font-bold uppercase tracking-wide mb-3">{currentGuide.title}</h4>
                    <p className="text-xs text-gray-500 leading-relaxed mb-6">
                      {currentGuide.desc}
                    </p>
                    <div className="bg-white/80 p-3 rounded-lg border border-dashed border-gray-200 text-[10px] text-gray-600">
                      <span className="font-bold text-black uppercase block mb-0.5">Professional Tip:</span>
                      {currentGuide.tip}
                    </div>
                  </div>
                </div>
              </form>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
