import React from 'react';
import { HeroSection } from '@/components/home/HeroSection';
import { FeaturedProperties } from '@/components/home/FeaturedProperties';
import { ServicesSection } from '@/components/home/ServicesSection';
import { TestimonialsSection } from '@/components/home/TestimonialsSection';
import { CTASection } from '@/components/home/CTASection';

export default function Home() {
  return (
    <main>
      <HeroSection />
      <FeaturedProperties />
      <ServicesSection />
      <TestimonialsSection />
      <CTASection />
    </main>
  );
}
