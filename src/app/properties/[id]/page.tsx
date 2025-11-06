import React from 'react';
import { notFound } from 'next/navigation';
import { FaBed, FaBath, FaRuler, FaMapMarkerAlt, FaCalendar, FaCheckCircle, FaWhatsapp, FaPhone, FaEnvelope, FaShare } from 'react-icons/fa';
import { Container } from '@/components/ui/Container';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { PropertyCard } from '@/components/features/PropertyCard';
import { CurrencyConverter } from '@/components/features/CurrencyConverter';
import { properties } from '@/data/properties';
import { contactInfo } from '@/data/contact';
import { formatPrice, getLocationLabel, getPropertyTypeLabel } from '@/lib/utils';

interface Props {
  params: Promise<{ id: string }>;
}

export default async function PropertyPage({ params }: Props) {
  const { id } = await params;
  const property = properties.find(p => p.id === id);

  if (!property) {
    notFound();
  }

  // Get similar properties
  const similarProperties = properties
    .filter(p =>
      p.id !== property.id &&
      (p.type === property.type || p.location === property.location)
    )
    .slice(0, 3);

  return (
    <main className="pt-28 pb-20 bg-dark-olive">
      <Container>
        {/* Breadcrumb */}
        <div className="mb-8 text-sm text-cream-light">
          <a href="/" className="hover:text-cream-light">Home</a>
          {' / '}
          <a href="/properties" className="hover:text-cream-light">Properties</a>
          {' / '}
          <span className="text-cream-light font-medium">{property.title}</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Image Gallery */}
            <div className="mb-8">
              <div className="grid grid-cols-2 gap-4">
                <div className="col-span-2 h-96 bg-slate-gray rounded-xl overflow-hidden">
                  <div className="w-full h-full flex items-center justify-center">
                    <span className="text-9xl">🏠</span>
                  </div>
                </div>
                {property.images.slice(1, 5).map((_, index) => (
                  <div key={index} className="h-48 bg-slate-gray rounded-xl overflow-hidden">
                    <div className="w-full h-full flex items-center justify-center">
                      <span className="text-5xl">🏠</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Property Header */}
            <div className="mb-8">
              <div className="flex items-start justify-between gap-4 mb-4">
                <div>
                  <div className="flex items-center gap-3 mb-2">
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                      property.status === 'for-sale' ? 'bg-slate-gray text-cream-light' :
                      property.status === 'for-rent' ? 'bg-sage-tan text-dark-olive' :
                      'bg-charcoal-green text-cream-light'
                    }`}>
                      {property.status === 'for-sale' ? 'For Sale' :
                       property.status === 'for-rent' ? 'For Rent' : 'Sale & Rent'}
                    </span>
                    {property.featured && (
                      <span className="px-3 py-1 bg-sage-tan text-dark-olive rounded-full text-sm font-medium">
                        Featured
                      </span>
                    )}
                  </div>
                  <h1 className="text-3xl md:text-4xl font-bold text-cream-light mb-3">
                    {property.title}
                  </h1>
                  <div className="flex items-center gap-2 text-cream-light">
                    <FaMapMarkerAlt className="text-sage-tan" />
                    <span className="text-lg">{getLocationLabel(property.location)}</span>
                  </div>
                </div>
                <button className="p-3 hover:bg-slate-gray rounded-full transition-colors">
                  <FaShare className="text-xl text-sage-tan" />
                </button>
              </div>

              <div className="flex items-center gap-8 text-cream-light text-lg">
                <div className="flex items-center gap-2">
                  <FaBed className="text-sage-tan text-xl" />
                  <span>{property.bedrooms} Bedrooms</span>
                </div>
                <div className="flex items-center gap-2">
                  <FaBath className="text-sage-tan text-xl" />
                  <span>{property.bathrooms} Bathrooms</span>
                </div>
                <div className="flex items-center gap-2">
                  <FaRuler className="text-sage-tan text-xl" />
                  <span>{property.size}m²</span>
                </div>
              </div>
            </div>

            {/* Price */}
            <Card className="mb-8 p-6 !bg-gradient-to-br from-slate-gray to-charcoal-green text-cream-light">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-cream-light mb-2">Price</p>
                  <p className="text-4xl font-bold text-cream-light">
                    {formatPrice(property.priceGBP)}
                    {property.status === 'for-rent' && <span className="text-xl"> /month</span>}
                  </p>
                  <p className="text-cream-light mt-2">
                    ≈ {formatPrice(property.priceGBP, 'EGP')}
                  </p>
                </div>
              </div>
            </Card>

            {/* Description */}
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-cream-light mb-4">Description</h2>
              <p className="text-cream-light leading-relaxed text-lg">
                {property.description}
              </p>
            </div>

            {/* Property Details */}
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-cream-light mb-4">Property Details</h2>
              <Card className="p-6 !bg-charcoal-green">
                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <p className="text-cream-light mb-1">Property Type</p>
                    <p className="font-bold text-cream-light capitalize">{getPropertyTypeLabel(property.type)}</p>
                  </div>
                  <div>
                    <p className="text-cream-light mb-1">Size</p>
                    <p className="font-bold text-cream-light">{property.size}m²</p>
                  </div>
                  <div>
                    <p className="text-cream-light mb-1">Bedrooms</p>
                    <p className="font-bold text-cream-light">{property.bedrooms}</p>
                  </div>
                  <div>
                    <p className="text-cream-light mb-1">Bathrooms</p>
                    <p className="font-bold text-cream-light">{property.bathrooms}</p>
                  </div>
                  {property.yearBuilt && (
                    <div>
                      <p className="text-cream-light mb-1">Year Built</p>
                      <p className="font-bold text-cream-light">{property.yearBuilt}</p>
                    </div>
                  )}
                  <div>
                    <p className="text-cream-light mb-1">Location</p>
                    <p className="font-bold text-cream-light">{getLocationLabel(property.location)}</p>
                  </div>
                </div>
              </Card>
            </div>

            {/* Features */}
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-cream-light mb-4">Key Features</h2>
              <Card className="p-6 !bg-charcoal-green">
                <div className="grid grid-cols-2 gap-4">
                  {property.features.map((feature, index) => (
                    <div key={index} className="flex items-center gap-3">
                      <FaCheckCircle className="text-sage-tan flex-shrink-0" />
                      <span className="text-cream-light">{feature}</span>
                    </div>
                  ))}
                </div>
              </Card>
            </div>

            {/* Amenities */}
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-cream-light mb-4">Amenities</h2>
              <Card className="p-6 !bg-charcoal-green">
                <div className="grid grid-cols-2 gap-4">
                  {property.amenities.map((amenity, index) => (
                    <div key={index} className="flex items-center gap-3">
                      <FaCheckCircle className="text-sage-tan flex-shrink-0" />
                      <span className="text-cream-light">{amenity}</span>
                    </div>
                  ))}
                </div>
              </Card>
            </div>

            {/* Location Map Placeholder */}
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-cream-light mb-4">Location</h2>
              <div className="h-96 bg-slate-gray rounded-xl flex items-center justify-center">
                <div className="text-center">
                  <FaMapMarkerAlt className="text-6xl text-sage-tan mx-auto mb-4" />
                  <p className="text-cream-light text-lg">Interactive map would be displayed here</p>
                  <p className="text-sm text-cream-light">Showing {getLocationLabel(property.location)}</p>
                </div>
              </div>
              {property.nearbyPlaces && (
                <div className="mt-4 grid grid-cols-3 gap-4">
                  {property.nearbyPlaces.beach && (
                    <div className="text-center p-4 bg-charcoal-green rounded-lg">
                      <p className="text-sm text-cream-light">Beach</p>
                      <p className="font-bold text-cream-light">{property.nearbyPlaces.beach}km</p>
                    </div>
                  )}
                  {property.nearbyPlaces.airport && (
                    <div className="text-center p-4 bg-charcoal-green rounded-lg">
                      <p className="text-sm text-cream-light">Airport</p>
                      <p className="font-bold text-cream-light">{property.nearbyPlaces.airport}km</p>
                    </div>
                  )}
                  {property.nearbyPlaces.restaurants && (
                    <div className="text-center p-4 bg-charcoal-green rounded-lg">
                      <p className="text-sm text-cream-light">Restaurants</p>
                      <p className="font-bold text-cream-light">{property.nearbyPlaces.restaurants}km</p>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-32 space-y-6">
              {/* Contact Card */}
              <Card className="p-6 !bg-charcoal-green">
                <h3 className="text-xl font-bold text-cream-light mb-6">Contact Us About This Property</h3>
                <div className="space-y-4">
                  <a
                    href={`https://wa.me/${contactInfo.whatsapp.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(`Hi, I'm interested in ${property.title} (ID: ${property.id})`)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Button fullWidth variant="primary" icon={<FaWhatsapp />}>
                      WhatsApp Inquiry
                    </Button>
                  </a>
                  <a href={`tel:${contactInfo.phone.uk.replace(/\s/g, '')}`}>
                    <Button fullWidth variant="secondary" icon={<FaPhone />}>
                      Call Us
                    </Button>
                  </a>
                  <a href={`mailto:${contactInfo.email}?subject=Inquiry about ${property.title}`}>
                    <Button fullWidth variant="outline" icon={<FaEnvelope />}>
                      Email Us
                    </Button>
                  </a>
                </div>

                <div className="mt-6 pt-6 border-t border-slate-gray text-sm text-cream-light">
                  <p className="mb-2"><strong>UK Office:</strong> {contactInfo.phone.uk}</p>
                  <p><strong>Egypt Office:</strong> {contactInfo.phone.egypt}</p>
                </div>
              </Card>

              {/* Currency Converter */}
              <CurrencyConverter />
            </div>
          </div>
        </div>

        {/* Similar Properties */}
        {similarProperties.length > 0 && (
          <div className="mt-20">
            <h2 className="text-3xl font-bold text-cream-light mb-8 text-center">
              Similar Properties
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {similarProperties.map(prop => (
                <PropertyCard key={prop.id} property={prop} />
              ))}
            </div>
          </div>
        )}
      </Container>
    </main>
  );
}
