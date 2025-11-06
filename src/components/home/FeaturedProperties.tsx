'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Container } from '@/components/ui/Container';
import { Button } from '@/components/ui/Button';
import { PropertyCard } from '@/components/features/PropertyCard';
import { getFeaturedProperties } from '@/data/properties';
import { toggleFavorite, isFavorite } from '@/lib/utils';

export const FeaturedProperties: React.FC = () => {
  const featuredProperties = getFeaturedProperties();
  const [favorites, setFavorites] = useState<string[]>([]);

  const handleFavoriteToggle = (propertyId: string) => {
    const updatedFavorites = toggleFavorite(propertyId);
    setFavorites(updatedFavorites);
  };

  return (
    <section className="section-padding-lg bg-cream-light">
      <Container>
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <p className="text-teal-primary text-lg mb-4 tracking-wider uppercase font-medium">
            Handpicked Selection
          </p>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-teal-dark mb-6">
            Featured Properties
          </h2>
          <p className="text-teal-primary/80 text-lg md:text-xl max-w-3xl mx-auto">
            Discover our carefully curated collection of luxury properties across Egypt's
            most prestigious locations.
          </p>
        </motion.div>

        {/* Properties Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {featuredProperties.map((property, index) => (
            <motion.div
              key={property.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <PropertyCard
                property={property}
                onFavoriteToggle={handleFavoriteToggle}
                isFavorite={isFavorite(property.id)}
              />
            </motion.div>
          ))}
        </div>

        {/* View All Button */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center"
        >
          <Link href="/properties">
            <Button size="lg" variant="primary">
              View All Properties
            </Button>
          </Link>
        </motion.div>
      </Container>
    </section>
  );
};
