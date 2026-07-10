"use client";
import React from 'react';
import { motion } from 'framer-motion';

interface ScrollAnimateProps {
  children: React.ReactNode;
  direction?: 'up' | 'down' | 'left' | 'right' | 'none';
  duration?: number;
  delay?: number;
  distance?: number;
  className?: string;
  amount?: 'some' | 'all' | number;
}

export function ScrollAnimate({
  children,
  direction = 'up',
  duration = 0.8,
  delay = 0,
  distance = 30,
  className = '',
  amount = 0.1
}: ScrollAnimateProps) {
  const getVariants = () => {
    const x = direction === 'left' ? -distance : direction === 'right' ? distance : 0;
    const y = direction === 'up' ? distance : direction === 'down' ? -distance : 0;
    
    return {
      hidden: {
        opacity: 0,
        x,
        y
      },
      visible: {
        opacity: 1,
        x: 0,
        y: 0,
        transition: {
          duration,
          delay,
          ease: [0.16, 1, 0.3, 1] as any // clean custom cubic bezier
        }
      }
    };
  };

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: false, amount }}
      variants={getVariants()}
      className={className}
    >
      {children}
    </motion.div>
  );
}
