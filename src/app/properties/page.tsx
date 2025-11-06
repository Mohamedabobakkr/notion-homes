'use client';

import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { FaFilter, FaSort } from 'react-icons/fa';
import { Container } from '@/components/ui/Container';
import { Button } from '@/components/ui/Button';
import { PropertyCard } from '@/components/features/PropertyCard';
import { properties } from '@/data/properties';
import { PropertyFilters, PropertySort, PropertyType, PropertyStatus, PropertyLocation } from '@/types';
import { toggleFavorite, isFavorite } from '@/lib/utils';

export default function PropertiesPage() {
  const [filters, setFilters] = useState<PropertyFilters>({});
  const [sortBy, setSortBy] = useState<PropertySort>({ field: 'featured', order: 'desc' });
  const [showFilters, setShowFilters] = useState(false);
  const [favorites, setFavorites] = useState<string[]>([]);

  // Filter and sort properties
  const filteredAndSortedProperties = useMemo(() => {
    let result = [...properties];

    // Apply filters
    if (filters.status && filters.status.length > 0) {
      result = result.filter(p =>
        filters.status!.includes(p.status) || p.status === 'both'
      );
    }

    if (filters.type && filters.type.length > 0) {
      result = result.filter(p => filters.type!.includes(p.type));
    }

    if (filters.location && filters.location.length > 0) {
      result = result.filter(p => filters.location!.includes(p.location));
    }

    if (filters.bedrooms && filters.bedrooms.length > 0) {
      result = result.filter(p => filters.bedrooms!.includes(p.bedrooms));
    }

    if (filters.priceRange) {
      result = result.filter(p =>
        p.priceGBP >= (filters.priceRange!.min || 0) &&
        p.priceGBP <= (filters.priceRange!.max || Infinity)
      );
    }

    // Apply sorting
    result.sort((a, b) => {
      let comparison = 0;

      switch (sortBy.field) {
        case 'price':
          comparison = a.priceGBP - b.priceGBP;
          break;
        case 'featured':
          comparison = (b.featured ? 1 : 0) - (a.featured ? 1 : 0);
          break;
        default:
          comparison = 0;
      }

      return sortBy.order === 'desc' ? -comparison : comparison;
    });

    return result;
  }, [properties, filters, sortBy]);

  const handleFavoriteToggle = (propertyId: string) => {
    const updatedFavorites = toggleFavorite(propertyId);
    setFavorites(updatedFavorites);
  };

  const toggleFilter = (
    filterType: keyof PropertyFilters,
    value: any
  ) => {
    setFilters(prev => {
      const currentValues = (prev[filterType] as any[]) || [];
      const newValues = currentValues.includes(value)
        ? currentValues.filter(v => v !== value)
        : [...currentValues, value];

      return {
        ...prev,
        [filterType]: newValues.length > 0 ? newValues : undefined,
      };
    });
  };

  return (
    <main className="pt-32 pb-20 bg-sand-50">
      <Container>
        {/* Page Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12 text-center"
        >
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-navy-900 mb-6">
            Browse <span className="text-gold-600">Our Properties</span>
          </h1>
          <p className="text-charcoal-800 text-lg md:text-xl max-w-3xl mx-auto">
            Explore our extensive collection of luxury properties across Egypt's most desirable locations.
          </p>
        </motion.div>

        {/* Filters and Controls */}
        <div className="mb-8">
          <div className="bg-white rounded-xl shadow-md p-6">
            {/* Mobile Filter Toggle */}
            <div className="flex items-center justify-between mb-6 lg:hidden">
              <Button
                onClick={() => setShowFilters(!showFilters)}
                variant="outline"
                icon={<FaFilter />}
              >
                Filters
              </Button>
              <select
                value={`${sortBy.field}-${sortBy.order}`}
                onChange={(e) => {
                  const [field, order] = e.target.value.split('-');
                  setSortBy({ field: field as any, order: order as any });
                }}
                className="px-4 py-2 border border-sand-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gold-500"
              >
                <option value="featured-desc">Featured First</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
              </select>
            </div>

            {/* Desktop Filters */}
            <div className={`grid grid-cols-1 lg:grid-cols-5 gap-6 ${showFilters || 'hidden lg:grid'}`}>
              {/* Status Filter */}
              <div>
                <h3 className="font-bold text-navy-900 mb-3">Status</h3>
                <div className="space-y-2">
                  {(['for-sale', 'for-rent'] as PropertyStatus[]).map(status => (
                    <label key={status} className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={filters.status?.includes(status)}
                        onChange={() => toggleFilter('status', status)}
                        className="rounded text-gold-600 focus:ring-gold-500"
                      />
                      <span className="text-sm capitalize">{status.replace('-', ' ')}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Type Filter */}
              <div>
                <h3 className="font-bold text-navy-900 mb-3">Property Type</h3>
                <div className="space-y-2">
                  {(['villa', 'apartment', 'penthouse'] as PropertyType[]).map(type => (
                    <label key={type} className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={filters.type?.includes(type)}
                        onChange={() => toggleFilter('type', type)}
                        className="rounded text-gold-600 focus:ring-gold-500"
                      />
                      <span className="text-sm capitalize">{type}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Location Filter */}
              <div>
                <h3 className="font-bold text-navy-900 mb-3">Location</h3>
                <div className="space-y-2">
                  {(['hurghada', 'al-gouna', 'north-coast', 'cairo'] as PropertyLocation[]).map(loc => (
                    <label key={loc} className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={filters.location?.includes(loc)}
                        onChange={() => toggleFilter('location', loc)}
                        className="rounded text-gold-600 focus:ring-gold-500"
                      />
                      <span className="text-sm capitalize">{loc.replace('-', ' ')}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Bedrooms Filter */}
              <div>
                <h3 className="font-bold text-navy-900 mb-3">Bedrooms</h3>
                <div className="space-y-2">
                  {[1, 2, 3, 4, 5].map(beds => (
                    <label key={beds} className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={filters.bedrooms?.includes(beds)}
                        onChange={() => toggleFilter('bedrooms', beds)}
                        className="rounded text-gold-600 focus:ring-gold-500"
                      />
                      <span className="text-sm">{beds}+ Beds</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Sort (Desktop) */}
              <div className="hidden lg:block">
                <h3 className="font-bold text-navy-900 mb-3">Sort By</h3>
                <select
                  value={`${sortBy.field}-${sortBy.order}`}
                  onChange={(e) => {
                    const [field, order] = e.target.value.split('-');
                    setSortBy({ field: field as any, order: order as any });
                  }}
                  className="w-full px-4 py-2 border border-sand-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gold-500"
                >
                  <option value="featured-desc">Featured First</option>
                  <option value="price-asc">Price: Low to High</option>
                  <option value="price-desc">Price: High to Low</option>
                </select>
              </div>
            </div>

            {/* Clear Filters */}
            {Object.keys(filters).length > 0 && (
              <div className="mt-6 text-center">
                <button
                  onClick={() => setFilters({})}
                  className="text-gold-600 hover:text-gold-700 font-medium"
                >
                  Clear all filters
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Results Count */}
        <div className="mb-6 text-charcoal-800">
          Showing {filteredAndSortedProperties.length} {filteredAndSortedProperties.length === 1 ? 'property' : 'properties'}
        </div>

        {/* Properties Grid */}
        {filteredAndSortedProperties.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredAndSortedProperties.map((property, index) => (
              <motion.div
                key={property.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
              >
                <PropertyCard
                  property={property}
                  onFavoriteToggle={handleFavoriteToggle}
                  isFavorite={isFavorite(property.id)}
                />
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <p className="text-xl text-charcoal-800 mb-4">No properties found matching your criteria.</p>
            <Button onClick={() => setFilters({})}>Clear Filters</Button>
          </div>
        )}
      </Container>
    </main>
  );
}
