import { notFound } from 'next/navigation';
import { FaBed, FaBath, FaRuler, FaMapMarkerAlt, FaCheckCircle, FaShare } from 'react-icons/fa';
import { Container } from '@/components/ui/Container';
import { Card } from '@/components/ui/Card';
import { PropertyCard } from '@/components/features/PropertyCard';
import { PropertyImageGallery } from '@/components/features/PropertyImageGallery';
import { PropertyContactForm } from '@/components/features/PropertyContactForm';
import { getPropertyById, getAllProperties } from '@/lib/sanity-queries';
import { formatPrice, getLocationLabel, getPropertyTypeLabel } from '@/lib/utils';

interface Props {
  params: Promise<{ id: string }>;
}

export default async function PropertyPage({ params }: Props) {
  const { id } = await params;
  const property = await getPropertyById(id);

  if (!property) {
    notFound();
  }

  // Get similar properties
  const allProperties = await getAllProperties();
  const similarProperties = allProperties
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
            <PropertyImageGallery property={property} />

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
            {property.features && property.features.length > 0 && (
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
            )}

            {/* Amenities */}
            {property.amenities && property.amenities.length > 0 && (
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
            )}

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
            <div className="sticky top-32">
              <PropertyContactForm property={property} />
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
