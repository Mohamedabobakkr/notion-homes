'use client';

import React from 'react';
import Link from 'next/link';
import { Container } from '@/components/ui/Container';
import { Button } from '@/components/ui/Button';

export const HeroSection: React.FC = () => {
  return (
    <section className="py-16 md:py-24">
      <Container>
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div>
            {/* Tagline */}
            <p className="text-olive-green text-sm md:text-base font-medium tracking-wide mb-6 font-accent">
              The most trusted property agency in Egypt
            </p>

            {/* Main Heading */}
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-heading text-text-primary mb-6 leading-tight">
              Discover Your Egyptian Sanctuary
            </h1>

            {/* Description */}
            <p className="text-lg text-text-primary/70 mb-8 leading-relaxed">
              Discover luxury properties across Hurghada, El Gouna, North Coast and Cairo.
              Your trusted UK-based bridge to Egyptian real estate investment and vacation homes.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/properties">
                <Button variant="filled" size="lg">
                  Browse Properties
                </Button>
              </Link>
              <Link href="/contact">
                <Button variant="outline" size="lg">
                  Schedule Consultation
                </Button>
              </Link>
            </div>

            {/* Trust Indicators */}
            <div className="mt-12 pt-8 border-t border-border-light">
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
                {[
                  { value: '500+', label: 'Properties Sold' },
                  { value: '1000+', label: 'Happy Clients' },
                  { value: '15+', label: 'Years Experience' },
                  { value: '4', label: 'Prime Locations' },
                ].map((stat) => (
                  <div key={stat.label} className="text-center">
                    <div className="text-3xl font-bold text-text-primary mb-1">
                      {stat.value}
                    </div>
                    <div className="text-xs text-text-secondary">
                      {stat.label}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Image */}
          <div className="relative">
            <div className="aspect-[4/3] rounded-2xl overflow-hidden shadow-lg">
              {/* Hero Image - Beautiful Egyptian coastal property */}
              <img
                src="https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf?w=800&h=600&fit=crop&q=80"
                alt="Luxury Egyptian coastal property"
                className="w-full h-full object-cover"
              />
            </div>
            {/* Floating Badge */}
            <div className="absolute -bottom-6 -left-6 bg-cream-card rounded-xl shadow-md p-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-olive-green rounded-lg flex items-center justify-center text-2xl">
                  ⭐
                </div>
                <div>
                  <div className="font-bold text-text-primary">Rated 4.9/5</div>
                  <div className="text-xs text-text-secondary">By 1000+ clients</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
};
