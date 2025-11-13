'use client';

import { useState, useMemo, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { motion } from 'framer-motion';
import { FaFilter } from 'react-icons/fa';
import { Container } from '@/components/ui/Container';
import { Button } from '@/components/ui/Button';
import { Checkbox } from '@/components/ui/Checkbox';
import { PropertyCard } from '@/components/features/PropertyCard';
import { PropertyCardSkeleton } from '@/components/ui/Skeleton';
import { getAllProperties } from '@/lib/sanity-queries';
import { Property, PropertyFilters, PropertySort, PropertyType, PropertyLocation } from '@/types';

function RentContent() {
  const searchParams = useSearchParams();
  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState<PropertyFilters>({});
  const [sortBy, setSortBy] = useState<PropertySort>({ field: 'featured', order: 'desc' });
  const [showFilters, setShowFilters] = useState(false);

  // Initialize filters from URL parameters
  useEffect(() => {
    const locationParam = searchParams.get('location');
    const typeParam = searchParams.get('type');

    const initialFilters: PropertyFilters = {};

    if (locationParam && ['hurghada', 'al-gouna', 'north-coast', 'cairo', 'london'].includes(locationParam)) {
      initialFilters.location = [locationParam as PropertyLocation];
    }

    if (typeParam && ['villa', 'apartment', 'penthouse'].includes(typeParam)) {
      initialFilters.type = [typeParam as PropertyType];
    }

    if (Object.keys(initialFilters).length > 0) {
      setFilters(initialFilters);
    }
  }, [searchParams]);

  // Fetch properties from Sanity
  useEffect(() => {
    async function fetchProperties() {
      setLoading(true);
      const data = await getAllProperties();
      // Filter for-rent properties only (including 'both')
      const forRentProperties = data.filter(p => p.status === 'for-rent' || p.status === 'both');
      setProperties(forRentProperties);
      setLoading(false);
    }
    fetchProperties();
  }, []);

  // Filter and sort properties
  const filteredAndSortedProperties = useMemo(() => {
    let result = [...properties];

    // Apply filters
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

  if (loading) {
    return (
      <main className="pt-32 pb-20 bg-dark-olive">
        <Container>
          {/* Page Header Skeleton */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mb-12 text-center"
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-cream-light mb-6">
              Properties <span className="text-cream-light">For Rent</span>
            </h1>
            <p className="text-cream-light text-lg md:text-xl max-w-3xl mx-auto">
              Loading properties...
            </p>
          </motion.div>

          {/* Skeleton Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <PropertyCardSkeleton key={i} />
            ))}
          </div>
        </Container>
      </main>
    );
  }

  return (
    <main className="pt-32 pb-20 bg-dark-olive">
      <Container>
        {/* Page Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8 md:mb-12 text-center px-4"
        >
          <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold text-cream-light mb-4 md:mb-6">
            Properties <span className="text-cream-light">For Rent</span>
          </h1>
          <p className="text-base md:text-lg lg:text-xl text-cream-light max-w-3xl mx-auto">
            Find your perfect rental property across Egypt and London's most desirable locations.
          </p>
        </motion.div>

        {/* Filters and Controls */}
        <div className="mb-8 px-4">
          <div className="bg-charcoal-green rounded-xl shadow-md p-4 md:p-6">
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
                className="px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-sage-tan"
                style={{
                  backgroundColor: '#F5F3EF',
                  borderColor: '#C8B898',
                  color: '#1A1A1A',
                  borderWidth: '2px'
                }}
              >
                <option value="featured-desc" style={{ color: '#1A1A1A' }}>Featured First</option>
                <option value="price-asc" style={{ color: '#1A1A1A' }}>Price: Low to High</option>
                <option value="price-desc" style={{ color: '#1A1A1A' }}>Price: High to Low</option>
              </select>
            </div>

            {/* Desktop Filters */}
            <div className={`grid grid-cols-1 lg:grid-cols-4 gap-6 ${showFilters || 'hidden lg:grid'}`}>
              {/* Type Filter */}
              <div>
                <h3 className="font-bold text-dark-olive mb-4">Property Type</h3>
                <div className="space-y-3">
                  {(['villa', 'apartment', 'penthouse'] as PropertyType[]).map(type => (
                    <Checkbox
                      key={type}
                      checked={filters.type?.includes(type) || false}
                      onChange={() => toggleFilter('type', type)}
                      label={type.charAt(0).toUpperCase() + type.slice(1)}
                    />
                  ))}
                </div>
              </div>

              {/* Location Filter */}
              <div>
                <h3 className="font-bold text-dark-olive mb-4">Location</h3>
                <div className="space-y-3">
                  {(['hurghada', 'al-gouna', 'north-coast', 'cairo', 'london'] as PropertyLocation[]).map(loc => (
                    <Checkbox
                      key={loc}
                      checked={filters.location?.includes(loc) || false}
                      onChange={() => toggleFilter('location', loc)}
                      label={loc.replace('-', ' ').split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
                    />
                  ))}
                </div>
              </div>

              {/* Bedrooms Filter */}
              <div>
                <h3 className="font-bold text-dark-olive mb-4">Bedrooms</h3>
                <div className="space-y-3">
                  {[1, 2, 3, 4, 5].map(beds => (
                    <Checkbox
                      key={beds}
                      checked={filters.bedrooms?.includes(beds) || false}
                      onChange={() => toggleFilter('bedrooms', beds)}
                      label={`${beds}+ Beds`}
                    />
                  ))}
                </div>
              </div>

              {/* Sort (Desktop) */}
              <div className="hidden lg:block">
                <h3 className="font-bold text-dark-olive mb-3">Sort By</h3>
                <select
                  value={`${sortBy.field}-${sortBy.order}`}
                  onChange={(e) => {
                    const [field, order] = e.target.value.split('-');
                    setSortBy({ field: field as any, order: order as any });
                  }}
                  className="w-full px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-sage-tan"
                  style={{
                    backgroundColor: '#F5F3EF',
                    borderColor: '#C8B898',
                    color: '#1A1A1A',
                    borderWidth: '2px'
                  }}
                >
                  <option value="featured-desc" style={{ color: '#1A1A1A' }}>Featured First</option>
                  <option value="price-asc" style={{ color: '#1A1A1A' }}>Price: Low to High</option>
                  <option value="price-desc" style={{ color: '#1A1A1A' }}>Price: High to Low</option>
                </select>
              </div>
            </div>

            {/* Clear Filters */}
            {Object.keys(filters).length > 0 && (
              <div className="mt-6 text-center">
                <button
                  onClick={() => setFilters({})}
                  className="text-sage-tan hover:text-cream-light font-medium underline transition-colors"
                >
                  Clear all filters
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Results Count */}
        <div className="mb-6 text-cream-light px-4">
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
                <PropertyCard property={property} />
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <p className="text-xl text-cream-light mb-4">No properties found matching your criteria.</p>
            <Button onClick={() => setFilters({})}>Clear Filters</Button>
          </div>
        )}
      </Container>
    </main>
  );
}

export default function RentPage() {
  return (
    <Suspense fallback={
      <main className="pt-32 pb-20 bg-dark-olive">
        <Container>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mb-12 text-center"
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-cream-light mb-6">
              Properties <span className="text-cream-light">For Rent</span>
            </h1>
            <p className="text-cream-light text-lg md:text-xl max-w-3xl mx-auto">
              Loading properties...
            </p>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <PropertyCardSkeleton key={i} />
            ))}
          </div>
        </Container>
      </main>
    }>
      <RentContent />
    </Suspense>
  );
}
