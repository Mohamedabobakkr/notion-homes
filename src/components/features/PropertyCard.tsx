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
    <div className="group bg-surface rounded-xl overflow-hidden border border-border-light/50 hover:border-olive-green/30 transition-all duration-500 hover:shadow-xl hover:-translate-y-1 h-full flex flex-col">
      {/* Property Image Carousel */}
      <div className="relative aspect-[4/3] overflow-hidden">
        <img
          src={allImages[currentImageIndex] || `https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=600&h=400&fit=crop&q=80`}
          alt={`${property.title} - Image ${currentImageIndex + 1}`}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />

        {/* Overlay Gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-60" />

        {/* Image Navigation Arrows - Only show if more than 1 image */}
        {allImages.length > 1 && (
          <>
            <button
              onClick={prevImage}
              className="absolute left-3 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white text-olive-dark p-2.5 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 z-20 shadow-lg backdrop-blur-sm transform hover:scale-110"
              aria-label="Previous image"
            >
              <FaChevronLeft className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={nextImage}
              className="absolute right-3 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white text-olive-dark p-2.5 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 z-20 shadow-lg backdrop-blur-sm transform hover:scale-110"
              aria-label="Next image"
            >
              <FaChevronRight className="w-3.5 h-3.5" />
            </button>

            {/* Image Indicators */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-1.5 z-20">
              {allImages.map((_, index) => (
                <button
                  key={index}
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    setCurrentImageIndex(index);
                  }}
                  className={`h-1.5 rounded-full transition-all duration-300 shadow-sm ${index === currentImageIndex
                    ? 'bg-white w-6'
                    : 'bg-white/60 w-1.5 hover:bg-white/80'
                    }`}
                  aria-label={`Go to image ${index + 1}`}
                />
              ))}
            </div>
          </>
        )}

        {/* Badges Container */}
        <div className="absolute top-4 left-4 flex flex-col gap-2 z-20">
          {/* Featured Badge */}
          {property.featured && (
            <div className="bg-olive-green/90 backdrop-blur-sm text-white px-3 py-1 rounded-full shadow-lg border border-white/20">
              <span className="text-xs font-semibold tracking-wide uppercase">Featured</span>
            </div>
          )}
          {/* Status Badge */}
          <div className="bg-white/90 backdrop-blur-sm text-olive-dark px-3 py-1 rounded-full shadow-lg">
            <span className="text-xs font-semibold tracking-wide uppercase">
              {property.status === 'for-sale' ? 'For Sale' : property.status === 'for-rent' ? 'For Rent' : 'For Sale & Rent'}
            </span>
          </div>
        </div>
      </div>

      {/* Property Details */}
      <div className="p-6 flex flex-col flex-grow">
        {/* Type & Location */}
        <div className="flex items-center justify-between mb-3">
          <span className="text-xs font-bold tracking-wider text-olive-muted uppercase">
            {property.type}
          </span>
          <div className="flex items-center gap-1.5 text-warm-gray">
            <FaClock className="text-xs" />
            <span className="text-xs">Just Listed</span>
          </div>
        </div>

        {/* Title */}
        <h3 className="text-xl font-heading font-bold text-olive-dark mb-3 line-clamp-2 leading-tight group-hover:text-olive-green transition-colors">
          {property.title}
        </h3>

        {/* Location */}
        <p className="text-sm text-text-secondary mb-4 line-clamp-1 flex items-center gap-1">
          <span className="w-1.5 h-1.5 rounded-full bg-olive-green/60"></span>
          {property.location.charAt(0).toUpperCase() + property.location.slice(1)}
        </p>

        {/* Features */}
        <div className="flex items-center gap-6 mb-6 py-4 border-t border-b border-border-light/50">
          <div className="flex flex-col items-center gap-1">
            <FaBed className="text-olive-muted text-lg" />
            <span className="text-xs font-medium text-text-secondary">{property.bedrooms} Beds</span>
          </div>
          <div className="w-px h-8 bg-border-light/50"></div>
          <div className="flex flex-col items-center gap-1">
            <FaBath className="text-olive-muted text-lg" />
            <span className="text-xs font-medium text-text-secondary">{property.bathrooms} Baths</span>
          </div>
          <div className="w-px h-8 bg-border-light/50"></div>
          <div className="flex flex-col items-center gap-1">
            <FaRuler className="text-olive-muted text-lg" />
            <span className="text-xs font-medium text-text-secondary">{property.size}m²</span>
          </div>
        </div>

        <div className="mt-auto">
          {/* Price */}
          <div className="mb-4">
            <p className="text-xs text-text-secondary mb-1 font-medium uppercase tracking-wide">Starting from</p>
            <div className="flex flex-col">
              <div className="flex items-baseline gap-1">
                <p className="text-2xl font-heading font-bold text-olive-dark">
                  {formatPrice(property.priceGBP)}
                </p>
                {property.status === 'for-rent' && <span className="text-sm text-text-secondary font-medium">/month</span>}
              </div>
              {property.priceEGP && (
                <p className="text-sm text-olive-muted font-medium mt-0.5">
                  ≈ {new Intl.NumberFormat('en-EG', { style: 'currency', currency: 'EGP', maximumFractionDigits: 0 }).format(property.priceEGP)}
                </p>
              )}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="grid grid-cols-2 gap-3">
            <Link href={`/properties/${property.id}`} className="w-full">
              <Button variant="outline" size="sm" fullWidth className="!border-olive-muted !text-olive-dark hover:!bg-olive-muted hover:!text-white transition-colors">
                Details
              </Button>
            </Link>
            <Link href={`/contact?property=${property.id}`} className="w-full">
              <Button variant="filled" size="sm" fullWidth className="!bg-olive-dark hover:!bg-olive-green shadow-md hover:shadow-lg transition-all">
                Inquire
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
