'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { FaBed, FaBath, FaRuler, FaMapMarkerAlt, FaHeart, FaRegHeart } from 'react-icons/fa';
import { Property } from '@/types';
import { Card } from '@/components/ui/Card';

interface PropertyCardProps {
  property: Property;
  onFavoriteToggle?: (id: string) => void;
  isFavorite?: boolean;
}

export const PropertyCard: React.FC<PropertyCardProps> = ({
  property,
  onFavoriteToggle,
  isFavorite = false,
}) => {
  const formatPrice = (priceGBP: number) => {
    return new Intl.NumberFormat('en-GB', {
      style: 'currency',
      currency: 'GBP',
      maximumFractionDigits: 0,
    }).format(priceGBP);
  };

  const getStatusBadge = () => {
    const badges = {
      'for-sale': 'For Sale',
      'for-rent': 'For Rent',
      'both': 'Sale & Rent',
    };
    return badges[property.status];
  };

  const getStatusColor = () => {
    const colors = {
      'for-sale': 'bg-navy-900',
      'for-rent': 'bg-gold-600',
      'both': 'bg-green-600',
    };
    return colors[property.status];
  };

  return (
    <Card className="group overflow-hidden">
      <Link href={`/properties/${property.id}`}>
        <div className="relative h-64 overflow-hidden">
          {/* Property Image */}
          <div className="w-full h-full bg-sand-200">
            <div className="w-full h-full flex items-center justify-center text-sand-200">
              {/* Placeholder for image */}
              <span className="text-6xl">🏠</span>
            </div>
          </div>

          {/* Overlay on hover */}
          <div className="absolute inset-0 bg-navy-900/0 group-hover:bg-navy-900/20 transition-all duration-300" />

          {/* Status Badge */}
          <div className={`absolute top-4 left-4 px-3 py-1 ${getStatusColor()} text-white text-sm font-medium rounded-full`}>
            {getStatusBadge()}
          </div>

          {/* Featured Badge */}
          {property.featured && (
            <div className="absolute top-4 right-4 px-3 py-1 bg-gold-500 text-white text-sm font-medium rounded-full">
              Featured
            </div>
          )}

          {/* Favorite Button */}
          {onFavoriteToggle && (
            <button
              onClick={(e) => {
                e.preventDefault();
                onFavoriteToggle(property.id);
              }}
              className="absolute bottom-4 right-4 w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-transform"
            >
              {isFavorite ? (
                <FaHeart className="text-red-500 text-lg" />
              ) : (
                <FaRegHeart className="text-charcoal-900 text-lg" />
              )}
            </button>
          )}
        </div>

        {/* Property Details */}
        <div className="p-6">
          {/* Location */}
          <div className="flex items-center gap-2 text-charcoal-800 text-sm mb-2">
            <FaMapMarkerAlt />
            <span className="capitalize">{property.location.replace('-', ' ')}</span>
          </div>

          {/* Title */}
          <h3 className="text-xl font-bold text-navy-900 mb-3 group-hover:text-gold-600 transition-colors line-clamp-2 font-heading">
            {property.title}
          </h3>

          {/* Features */}
          <div className="flex items-center gap-6 mb-4 text-charcoal-800">
            <div className="flex items-center gap-2">
              <FaBed className="text-gold-600" />
              <span className="text-sm">{property.bedrooms}</span>
            </div>
            <div className="flex items-center gap-2">
              <FaBath className="text-gold-600" />
              <span className="text-sm">{property.bathrooms}</span>
            </div>
            <div className="flex items-center gap-2">
              <FaRuler className="text-gold-600" />
              <span className="text-sm">{property.size}m²</span>
            </div>
          </div>

          {/* Price */}
          <div className="flex items-center justify-between pt-4 border-t border-sand-200">
            <div>
              <p className="text-2xl font-bold text-navy-900">
                {formatPrice(property.priceGBP)}
                {property.status === 'for-rent' && <span className="text-sm font-normal">/month</span>}
              </p>
            </div>
            <motion.div
              className="text-gold-600 font-medium group-hover:translate-x-2 transition-transform"
            >
              View Details →
            </motion.div>
          </div>
        </div>
      </Link>
    </Card>
  );
};
