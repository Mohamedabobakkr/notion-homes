'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { FaBed, FaBath, FaRuler, FaMapMarkerAlt, FaCheck, FaArrowLeft, FaClock } from 'react-icons/fa';
import { Container } from '@/components/ui/Container';
import { Button } from '@/components/ui/Button';
import { PropertyContactForm } from '@/components/features/PropertyContactForm';
import { getPropertyById } from '@/lib/sanity-queries';
import { Property } from '@/types';

export default function PropertyDetailsPage() {
    const params = useParams();
    const [property, setProperty] = useState<Property | null>(null);
    const [loading, setLoading] = useState(true);
    const [activeImage, setActiveImage] = useState(0);

    useEffect(() => {
        async function fetchProperty() {
            if (params.id) {
                setLoading(true);
                const data = await getPropertyById(params.id as string);
                setProperty(data);
                setLoading(false);
            }
        }
        fetchProperty();
    }, [params.id]);

    if (loading) {
        return (
            <main className="pt-32 pb-20 bg-cream-light min-h-screen">
                <Container>
                    <div className="animate-pulse">
                        <div className="h-8 bg-gray-300 w-1/3 mb-8 rounded"></div>
                        <div className="h-96 bg-gray-300 w-full mb-8 rounded-xl"></div>
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                            <div className="lg:col-span-2 space-y-4">
                                <div className="h-6 bg-gray-300 w-3/4 rounded"></div>
                                <div className="h-4 bg-gray-300 w-full rounded"></div>
                                <div className="h-4 bg-gray-300 w-full rounded"></div>
                            </div>
                            <div className="h-64 bg-gray-300 rounded-xl"></div>
                        </div>
                    </div>
                </Container>
            </main>
        );
    }

    if (!property) {
        return (
            <main className="pt-32 pb-20 bg-cream-light min-h-screen flex items-center justify-center">
                <Container>
                    <div className="text-center">
                        <h1 className="text-4xl font-bold text-dark-olive mb-4">Property Not Found</h1>
                        <p className="text-lg text-text-secondary mb-8">
                            The property you are looking for might have been removed or does not exist.
                        </p>
                        <Link href="/">
                            <Button variant="filled">Return Home</Button>
                        </Link>
                    </div>
                </Container>
            </main>
        );
    }

    // Combine main image and gallery images
    const allImages = [
        ...(property.mainImage ? [property.mainImage] : []),
        ...(property.images || [])
    ];

    // Fallback if no images
    if (allImages.length === 0) {
        allImages.push('https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=1200&h=800&fit=crop&q=80');
    }

    const formatPrice = (price: number) => {
        return new Intl.NumberFormat('en-GB', {
            style: 'currency',
            currency: 'GBP',
            maximumFractionDigits: 0,
        }).format(price);
    };

    return (
        <main className="pt-24 pb-20 bg-cream-light min-h-screen">
            <Container>
                {/* Breadcrumb / Back Link */}
                <div className="mb-6">
                    <Link href={property.status === 'for-rent' ? '/rent' : '/buy'} className="inline-flex items-center text-dark-olive hover:text-sage-tan transition-colors">
                        <FaArrowLeft className="mr-2" /> Back to Properties
                    </Link>
                </div>

                {/* Header Section */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-8 gap-4">
                    <div>
                        <div className="flex items-center gap-3 mb-2">
                            <span className="bg-sage-tan text-dark-olive px-3 py-1 rounded-full text-sm font-semibold">
                                {property.status === 'for-rent' ? 'For Rent' : property.status === 'for-sale' ? 'For Sale' : 'For Rent & Sale'}
                            </span>
                            <span className="text-text-secondary flex items-center gap-1 text-sm">
                                <FaClock className="text-sage-tan" />
                                {property.type.charAt(0).toUpperCase() + property.type.slice(1)}
                            </span>
                        </div>
                        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-dark-olive mb-2">
                            {property.title}
                        </h1>
                        <div className="flex items-center text-text-secondary text-lg">
                            <FaMapMarkerAlt className="text-sage-tan mr-2" />
                            {property.location.replace('-', ' ').split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
                        </div>
                    </div>
                    <div className="text-left md:text-right">
                        <p className="text-sm text-text-secondary mb-1">Price</p>
                        <div className="text-3xl font-bold text-dark-olive">
                            {formatPrice(property.priceGBP)}
                            {property.status === 'for-rent' && <span className="text-lg font-normal text-text-secondary">/mo</span>}
                        </div>
                        {property.priceEGP && (
                            <p className="text-text-secondary text-sm mt-1">
                                Approx. EGP {property.priceEGP.toLocaleString()}
                            </p>
                        )}
                    </div>
                </div>

                {/* Image Gallery */}
                <div className="mb-12">
                    {/* Main Image */}
                    <div className="relative h-[400px] md:h-[500px] lg:h-[600px] rounded-2xl overflow-hidden mb-4 shadow-lg">
                        <img
                            src={allImages[activeImage]}
                            alt={property.title}
                            className="w-full h-full object-cover"
                        />
                    </div>

                    {/* Thumbnails */}
                    {allImages.length > 1 && (
                        <div className="flex gap-4 overflow-x-auto pb-4 snap-x">
                            {allImages.map((img, index) => (
                                <button
                                    key={index}
                                    onClick={() => setActiveImage(index)}
                                    className={`relative flex-shrink-0 w-24 h-24 md:w-32 md:h-32 rounded-lg overflow-hidden border-2 transition-all snap-start ${activeImage === index ? 'border-dark-olive opacity-100' : 'border-transparent opacity-70 hover:opacity-100'
                                        }`}
                                >
                                    <img
                                        src={img}
                                        alt={`View ${index + 1}`}
                                        className="w-full h-full object-cover"
                                    />
                                </button>
                            ))}
                        </div>
                    )}
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                    {/* Main Content */}
                    <div className="lg:col-span-2">
                        {/* Key Features */}
                        <div className="bg-white rounded-xl p-6 shadow-sm mb-8 border border-border-light">
                            <h2 className="text-xl font-bold text-dark-olive mb-6">Property Overview</h2>
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                                <div className="flex flex-col items-center text-center p-4 bg-cream-light/50 rounded-lg">
                                    <FaBed className="text-3xl text-sage-tan mb-2" />
                                    <span className="font-bold text-dark-olive text-lg">{property.bedrooms}</span>
                                    <span className="text-text-secondary text-sm">Bedrooms</span>
                                </div>
                                <div className="flex flex-col items-center text-center p-4 bg-cream-light/50 rounded-lg">
                                    <FaBath className="text-3xl text-sage-tan mb-2" />
                                    <span className="font-bold text-dark-olive text-lg">{property.bathrooms}</span>
                                    <span className="text-text-secondary text-sm">Bathrooms</span>
                                </div>
                                <div className="flex flex-col items-center text-center p-4 bg-cream-light/50 rounded-lg">
                                    <FaRuler className="text-3xl text-sage-tan mb-2" />
                                    <span className="font-bold text-dark-olive text-lg">{property.size}</span>
                                    <span className="text-text-secondary text-sm">Square Meters</span>
                                </div>
                                <div className="flex flex-col items-center text-center p-4 bg-cream-light/50 rounded-lg">
                                    <FaClock className="text-3xl text-sage-tan mb-2" />
                                    <span className="font-bold text-dark-olive text-lg">{property.yearBuilt || 'N/A'}</span>
                                    <span className="text-text-secondary text-sm">Year Built</span>
                                </div>
                            </div>
                        </div>

                        {/* Description */}
                        <div className="mb-8">
                            <h2 className="text-2xl font-bold text-dark-olive mb-4">Description</h2>
                            <div className="prose prose-lg text-text-secondary max-w-none whitespace-pre-line">
                                {property.description}
                            </div>
                        </div>

                        {/* Amenities */}
                        {property.amenities && property.amenities.length > 0 && (
                            <div className="mb-8">
                                <h2 className="text-2xl font-bold text-dark-olive mb-4">Amenities</h2>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    {property.amenities.map((amenity, index) => (
                                        <div key={index} className="flex items-center gap-3 text-text-secondary">
                                            <div className="w-6 h-6 rounded-full bg-sage-tan/20 flex items-center justify-center flex-shrink-0">
                                                <FaCheck className="text-dark-olive text-xs" />
                                            </div>
                                            <span>{amenity}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Features List */}
                        {property.features && property.features.length > 0 && (
                            <div className="mb-8">
                                <h2 className="text-2xl font-bold text-dark-olive mb-4">Features</h2>
                                <ul className="list-disc list-inside text-text-secondary space-y-2">
                                    {property.features.map((feature, index) => (
                                        <li key={index}>{feature}</li>
                                    ))}
                                </ul>
                            </div>
                        )}
                    </div>

                    {/* Sidebar - Contact Form */}
                    <div className="lg:col-span-1">
                        <div className="sticky top-32">
                            <PropertyContactForm property={property} />
                        </div>
                    </div>
                </div>
            </Container>
        </main>
    );
}
