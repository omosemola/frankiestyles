"use client";
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { HelpCircle, ChevronDown, ChevronUp } from 'lucide-react';

interface GuideStep {
  name: string;
  instruction: string;
  tip: string;
}

const GUIDE_STEPS: GuideStep[] = [
  {
    name: "Chest Circumference",
    instruction: "Wrap the measuring tape around the fullest part of your chest, keeping it level under your arms and across your back.",
    tip: "Do not puff out your chest; stand relaxed and breathe normally for an accurate fit."
  },
  {
    name: "Shoulder Width",
    instruction: "Measure across your upper back from the outer edge of one shoulder bone to the outer edge of the other shoulder bone.",
    tip: "Follow the natural curve across the top of your shoulders."
  },
  {
    name: "Sleeve Length",
    instruction: "Measure from the shoulder seam (the tip of your shoulder) down your arm to your wrist bone.",
    tip: "Slightly bend your elbow to ensure comfort when moving."
  },
  {
    name: "Waist",
    instruction: "Measure around your natural waistline, which is just above your belly button or where you normally wear your trousers.",
    tip: "Keep one finger between the tape and your body to ensure a comfortable fit."
  },
  {
    name: "Trouser Length",
    instruction: "Measure from the waistline down the outside of your leg to your ankle bone.",
    tip: "Wear your regular shoes during measurement to ensure correct trouser drape."
  },
  {
    name: "Top/Shirt Length",
    instruction: "Measure from the base of your neck (highest point of the shoulder) down the front to your desired length.",
    tip: "For Kaftans and Senators, this usually falls around the mid-thigh or just above the knee."
  }
];

export function BespokeSizingGuide() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeStep, setActiveStep] = useState<number | null>(null);

  return (
    <div className="border border-gray-150 rounded-xl bg-gray-50/50 overflow-hidden transition-all duration-300">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full px-5 py-4 flex items-center justify-between text-xs font-bold uppercase tracking-wider text-[#0a0a0a] hover:bg-gray-50 transition-colors"
      >
        <span className="flex items-center gap-2">
          <HelpCircle className="w-4 h-4 text-gray-500" />
          How to Measure Guide
        </span>
        {isOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0 }}
            animate={{ height: 'auto' }}
            exit={{ height: 0 }}
            className="overflow-hidden border-t border-gray-150"
          >
            <div className="p-5 space-y-3">
              <p className="text-[11px] text-gray-400 font-medium uppercase tracking-wider mb-2">
                Follow these guidelines to record accurate measurements in inches:
              </p>
              <div className="space-y-2">
                {GUIDE_STEPS.map((step, idx) => {
                  const isActive = activeStep === idx;
                  return (
                    <div 
                      key={step.name} 
                      className="border border-gray-100 rounded-lg bg-white overflow-hidden"
                    >
                      <button
                        onClick={() => setActiveStep(isActive ? null : idx)}
                        className="w-full px-4 py-3 flex items-center justify-between text-xs font-semibold text-gray-700 hover:text-black hover:bg-gray-50/50 transition-colors"
                      >
                        <span>{idx + 1}. {step.name}</span>
                        <span className="text-[10px] text-gray-400 uppercase tracking-widest">
                          {isActive ? "Hide Details" : "Show Details"}
                        </span>
                      </button>
                      
                      <AnimatePresence>
                        {isActive && (
                          <motion.div
                            initial={{ height: 0 }}
                            animate={{ height: 'auto' }}
                            exit={{ height: 0 }}
                            className="overflow-hidden border-t border-gray-50 bg-gray-50/30"
                          >
                            <div className="p-4 space-y-2 text-xs leading-relaxed text-gray-600">
                              <p>{step.instruction}</p>
                              <div className="bg-amber-50/50 border border-amber-100 p-2.5 rounded text-[11px] text-amber-800 leading-normal">
                                <strong>Tailor's Tip:</strong> {step.tip}
                              </div>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  );
                })}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
