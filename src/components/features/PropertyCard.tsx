'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { FaBed, FaBath, FaRuler, FaMapMarkerAlt, FaHeart, FaRegHeart } from 'react-icons/fa';
import { Property } from '@/types';

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
      'for-sale': 'bg-slate-gray',
      'for-rent': 'bg-slate-gray-light',
      'both': 'bg-sage-tan',
    };
    return colors[property.status];
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      whileHover={{ y: -16 }}
      transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
      className="group"
    >
      <Link href={`/properties/${property.id}`}>
        <div className="bg-charcoal-green rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500">
          <div className="relative h-72 overflow-hidden">
            {/* Property Image */}
            <div className="w-full h-full bg-gradient-to-br from-slate-gray to-dark-olive transform group-hover:scale-110 transition-transform duration-700">
              <div className="w-full h-full flex items-center justify-center text-6xl">
                🏠
              </div>
            </div>

            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-dark-olive/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

            {/* Status Badge */}
            <div className={`absolute top-6 left-6 px-5 py-2 ${getStatusColor()} text-cream-light text-sm font-bold rounded-full shadow-lg backdrop-blur-sm`}>
              {getStatusBadge()}
            </div>

            {/* Featured Badge */}
            {property.featured && (
              <div className="absolute top-6 right-6 px-5 py-2 bg-gradient-to-r from-slate-gray-light to-slate-gray text-cream-light text-sm font-bold rounded-full shadow-lg backdrop-blur-sm">
                ⭐ Featured
              </div>
            )}

            {/* Favorite Button */}
            {onFavoriteToggle && (
              <motion.button
                onClick={(e) => {
                  e.preventDefault();
                  onFavoriteToggle(property.id);
                }}
                whileHover={{ scale: 1.15 }}
                whileTap={{ scale: 0.9 }}
                className="absolute bottom-6 right-6 w-14 h-14 glass-dark rounded-full flex items-center justify-center shadow-xl hover:bg-slate-gray/50 transition-colors"
              >
                {isFavorite ? (
                  <FaHeart className="text-red-400 text-xl" />
                ) : (
                  <FaRegHeart className="text-cream-light text-xl" />
                )}
              </motion.button>
            )}
          </div>

          {/* Property Details */}
          <div className="p-7">
            {/* Location */}
            <div className="flex items-center gap-2 text-cream-light text-sm font-semibold mb-3">
              <FaMapMarkerAlt className="text-base" />
              <span className="capitalize">{property.location.replace('-', ' ')}</span>
            </div>

            {/* Title */}
            <h3 className="text-2xl font-bold text-cream-light mb-4 group-hover:text-cream-light transition-colors line-clamp-2 leading-tight">
              {property.title}
            </h3>

            {/* Features */}
            <div className="flex items-center gap-6 mb-6 text-cream-light">
              <div className="flex items-center gap-2.5">
                <div className="w-10 h-10 rounded-xl bg-slate-gray flex items-center justify-center">
                  <FaBed className="text-sage-tan text-lg" />
                </div>
                <span className="text-cream-light font-semibold">{property.bedrooms}</span>
              </div>
              <div className="flex items-center gap-2.5">
                <div className="w-10 h-10 rounded-xl bg-slate-gray flex items-center justify-center">
                  <FaBath className="text-sage-tan text-lg" />
                </div>
                <span className="text-cream-light font-semibold">{property.bathrooms}</span>
              </div>
              <div className="flex items-center gap-2.5">
                <div className="w-10 h-10 rounded-xl bg-slate-gray flex items-center justify-center">
                  <FaRuler className="text-sage-tan text-lg" />
                </div>
                <span className="text-cream-light font-semibold">{property.size}m²</span>
              </div>
            </div>

            {/* Price & CTA */}
            <div className="flex items-center justify-between pt-6 border-t-2 border-slate-gray">
              <div>
                <p className="text-xs text-cream-light font-medium mb-1">Starting from</p>
                <p className="text-3xl font-extrabold text-cream-light">
                  {formatPrice(property.priceGBP)}
                  {property.status === 'for-rent' && <span className="text-sm font-normal text-cream-light">/mo</span>}
                </p>
              </div>
              <motion.div
                className="flex items-center gap-2 text-cream-light font-bold group-hover:gap-4 transition-all"
              >
                <span>View</span>
                <span className="text-xl group-hover:translate-x-1 transition-transform">→</span>
              </motion.div>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
};
