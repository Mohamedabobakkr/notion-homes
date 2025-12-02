'use client';

import React from 'react';
import Link from 'next/link';
import { FaBed, FaBath, FaRuler, FaArrowRight } from 'react-icons/fa';
import { Property } from '@/types';

interface FeaturedPropertyCardProps {
    property: Property;
}

export const FeaturedPropertyCard: React.FC<FeaturedPropertyCardProps> = ({ property }) => {
    const formatPrice = (priceGBP: number) => {
        return new Intl.NumberFormat('en-GB', {
            style: 'currency',
            currency: 'GBP',
            maximumFractionDigits: 0,
        }).format(priceGBP);
    };

    // Use main image or fallback
    const image = property.mainImage || 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=600&h=400&fit=crop&q=80';

    return (
        <Link href={`/properties/${property.id}`} className="block h-full group cursor-pointer">
            <div className="relative h-[500px] w-full rounded-[2rem] overflow-hidden shadow-lg transition-all duration-700 hover:shadow-2xl hover:-translate-y-2">
                {/* Background Image with Zoom Effect */}
                <div className="absolute inset-0">
                    <img
                        src={image}
                        alt={property.title}
                        className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                    />
                    {/* Gradient Overlay - Cinematic & Stronger for Readability */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/50 to-transparent opacity-90 transition-opacity duration-500" />
                </div>

                {/* Top Badges */}
                <div className="absolute top-6 left-6 flex flex-col gap-3 z-10">
                    <span className="inline-flex items-center px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 !text-white text-xs font-medium tracking-widest uppercase shadow-sm">
                        {property.status === 'for-sale' ? 'For Sale' : property.status === 'for-rent' ? 'For Rent' : 'Sale & Rent'}
                    </span>
                    {property.featured && (
                        <span className="inline-flex items-center px-4 py-1.5 rounded-full bg-olive-green/90 backdrop-blur-md border border-white/10 !text-white text-xs font-medium tracking-widest uppercase shadow-lg">
                            Featured
                        </span>
                    )}
                </div>

                {/* Content Container */}
                <div className="absolute bottom-0 left-0 right-0 p-8 z-10 flex flex-col gap-4 transform transition-transform duration-500">

                    {/* Location & Price */}
                    <div className="flex justify-between items-end border-b border-white/30 pb-4 mb-2">
                        <div>
                            <p className="!text-white/90 text-xs font-medium tracking-[0.2em] uppercase mb-2 drop-shadow-lg" style={{ color: 'white' }}>
                                {property.location}
                            </p>
                            <h3 className="text-2xl md:text-3xl font-heading font-medium !text-white leading-tight drop-shadow-xl" style={{ color: 'white' }}>
                                {property.title}
                            </h3>
                        </div>
                    </div>

                    {/* Price & Details Row */}
                    <div className="flex items-center justify-between">
                        <div className="flex flex-col">
                            <span className="!text-white/80 text-xs uppercase tracking-wider mb-1 drop-shadow-md" style={{ color: 'rgba(255, 255, 255, 0.8)' }}>Starting From</span>
                            <span className="text-2xl font-heading !text-white font-medium drop-shadow-lg" style={{ color: 'white' }}>
                                {formatPrice(property.priceGBP)}
                                {property.status === 'for-rent' && <span className="text-sm !text-white/80 font-light ml-1">/mo</span>}
                            </span>
                            {property.priceEGP && (
                                <span className="text-sm !text-white/70 font-light mt-0.5">
                                    ≈ {new Intl.NumberFormat('en-EG', { style: 'currency', currency: 'EGP', maximumFractionDigits: 0 }).format(property.priceEGP)}
                                </span>
                            )}
                        </div>

                        {/* Circular Action Button */}
                        <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-md border border-white/40 flex items-center justify-center !text-white group-hover:bg-white group-hover:!text-olive-dark transition-all duration-500 shadow-lg">
                            <FaArrowRight className="w-4 h-4 -rotate-45 group-hover:rotate-0 transition-transform duration-500" />
                        </div>
                    </div>

                    {/* Hidden Details - Reveal on Hover */}
                    <div className="grid grid-cols-3 gap-4 pt-2 max-h-0 opacity-0 group-hover:max-h-20 group-hover:opacity-100 transition-all duration-700 ease-out overflow-hidden">
                        <div className="flex flex-col gap-1">
                            <div className="flex items-center gap-2 drop-shadow-md">
                                <FaBed className="text-sm !text-white" style={{ color: 'white' }} />
                                <span className="text-sm font-medium !text-white" style={{ color: 'white' }}>{property.bedrooms} Beds</span>
                            </div>
                        </div>
                        <div className="flex flex-col gap-1">
                            <div className="flex items-center gap-2 drop-shadow-md">
                                <FaBath className="text-sm !text-white" style={{ color: 'white' }} />
                                <span className="text-sm font-medium !text-white" style={{ color: 'white' }}>{property.bathrooms} Baths</span>
                            </div>
                        </div>
                        <div className="flex flex-col gap-1">
                            <div className="flex items-center gap-2 drop-shadow-md">
                                <FaRuler className="text-sm !text-white" style={{ color: 'white' }} />
                                <span className="text-sm font-medium !text-white" style={{ color: 'white' }}>{property.size}m²</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Link>
    );
};
