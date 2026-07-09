import React from 'react';
import { Button } from '@/components/ui/Button';

interface BannerSectionProps {
  title: string;
  description: string;
  image: string;
  buttonText: string;
  align?: 'left' | 'right' | 'center';
}

export function BannerSection({ title, description, image, buttonText, align = 'center' }: BannerSectionProps) {
  return (
    <section className="relative h-[70vh] min-h-[500px] flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-[#0a0a0a]/30 z-10" />
        <img 
          src={image} 
          alt={title} 
          className="w-full h-full object-cover transition-transform duration-1000 hover:scale-105"
        />
      </div>
      <div className={`relative z-10 container mx-auto px-6 flex ${align === 'left' ? 'justify-start text-left' : align === 'right' ? 'justify-end text-right' : 'justify-center text-center'} text-white`}>
        <div className="max-w-xl space-y-6 bg-[#0a0a0a]/20 backdrop-blur-sm p-10 rounded-xl border border-white/10">
          <h2 className="text-3xl md:text-5xl font-bold tracking-wider uppercase">{title}</h2>
          <p className="text-white/80 leading-relaxed font-light">{description}</p>
          <Button className="bg-white text-black hover:bg-white/90 px-8 py-3 h-auto">{buttonText}</Button>
        </div>
      </div>
    </section>
  );
}
