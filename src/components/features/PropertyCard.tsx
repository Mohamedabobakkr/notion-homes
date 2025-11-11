'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { FaBed, FaBath, FaRuler, FaClock, FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import { Property } from '@/types';
import { Button } from '@/components/ui/Button';

interface PropertyCardProps {
  property: Property;
}

export const PropertyCard: React.FC<PropertyCardProps> = ({ property }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Get all images - mainImage first, then gallery images
  const allImages = (() => {
    const images = [];

    // Add main image first
    if (property.mainImage) {
      images.push(property.mainImage);
    }

    // Add gallery images
    if (property.images && property.images.length > 0) {
      images.push(...property.images);
    }

    // Fallback to placeholder if no images
    if (images.length === 0) {
      images.push('https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=600&h=400&fit=crop&q=80');
    }

    return images;
  })();

  const formatPrice = (priceGBP: number) => {
    return new Intl.NumberFormat('en-GB', {
      style: 'currency',
      currency: 'GBP',
      maximumFractionDigits: 0,
    }).format(priceGBP);
  };

  const nextImage = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setCurrentImageIndex((prev) => (prev + 1) % allImages.length);
  };

  const prevImage = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setCurrentImageIndex((prev) => (prev - 1 + allImages.length) % allImages.length);
  };

  return (
    <div className="bg-surface rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300">
      {/* Property Image Carousel */}
      <div className="relative h-56 overflow-hidden group">
        <img
          src={allImages[currentImageIndex] || `https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=600&h=400&fit=crop&q=80`}
          alt={`${property.title} - Image ${currentImageIndex + 1}`}
          className="w-full h-full object-cover transition-transform duration-500"
        />

        {/* Image Navigation Arrows - Only show if more than 1 image */}
        {allImages.length > 1 && (
          <>
            <button
              onClick={prevImage}
              className="absolute left-2 top-1/2 -translate-y-1/2 bg-dark-olive/80 hover:bg-dark-olive text-cream-light p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10"
              aria-label="Previous image"
            >
              <FaChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={nextImage}
              className="absolute right-2 top-1/2 -translate-y-1/2 bg-dark-olive/80 hover:bg-dark-olive text-cream-light p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10"
              aria-label="Next image"
            >
              <FaChevronRight className="w-4 h-4" />
            </button>

            {/* Image Indicators */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-1.5 z-10">
              {allImages.map((_, index) => (
                <button
                  key={index}
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    setCurrentImageIndex(index);
                  }}
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${
                    index === currentImageIndex
                      ? 'bg-cream-light w-6'
                      : 'bg-cream-light/50 hover:bg-cream-light/75'
                  }`}
                  aria-label={`Go to image ${index + 1}`}
                />
              ))}
            </div>
          </>
        )}

        {/* Featured Badge */}
        {property.featured && (
          <div className="absolute top-4 left-4 bg-sage-tan text-dark-olive px-3 py-1 rounded-full shadow-md z-10">
            <span className="text-xs font-semibold">⭐ Featured</span>
          </div>
        )}
      </div>

      {/* Property Details */}
      <div className="p-5">
        {/* Duration/Type Badge */}
        <div className="flex items-center gap-2 mb-3">
          <FaClock className="text-warm-gray text-sm" />
          <span className="text-sm text-text-secondary">
            {property.type.charAt(0).toUpperCase() + property.type.slice(1)}
          </span>
        </div>

        {/* Title */}
        <h3 className="text-xl font-heading font-semibold text-text-primary mb-3 line-clamp-2 leading-tight">
          {property.title}
        </h3>

        {/* Short Description */}
        <p className="text-sm text-text-secondary mb-4 line-clamp-2">
          {property.description}
        </p>

        {/* Features */}
        <div className="flex items-center gap-4 mb-4 text-text-secondary text-sm">
          <div className="flex items-center gap-1.5">
            <FaBed className="text-warm-gray" />
            <span>{property.bedrooms}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <FaBath className="text-warm-gray" />
            <span>{property.bathrooms}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <FaRuler className="text-warm-gray" />
            <span>{property.size}m²</span>
          </div>
        </div>

        {/* Price & Buttons */}
        <div className="pt-4 border-t border-border-light">
          <div className="mb-3">
            <p className="text-xs text-text-secondary mb-1">Starting from</p>
            <p className="text-2xl font-bold text-text-primary">
              {formatPrice(property.priceGBP)}
              {property.status === 'for-rent' && <span className="text-sm font-normal">/mo</span>}
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-2">
            <Link href={`/properties/${property.id}`} className="flex-1">
              <Button variant="outline" size="sm" fullWidth>
                More Info
              </Button>
            </Link>
            <Link href={`/contact?property=${property.id}`} className="flex-1">
              <Button variant="filled" size="sm" fullWidth>
                Inquire
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
