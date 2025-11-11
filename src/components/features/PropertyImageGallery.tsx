'use client';

import { useState } from 'react';
import { Property } from '@/types';

interface PropertyImageGalleryProps {
  property: Property;
}

export const PropertyImageGallery: React.FC<PropertyImageGalleryProps> = ({ property }) => {
  const [selectedImage, setSelectedImage] = useState(0);

  const allImages = (() => {
    const images = [];
    if (property.mainImage) {
      images.push(property.mainImage);
    }
    if (property.images && property.images.length > 0) {
      images.push(...property.images);
    }
    if (images.length === 0) {
      images.push('https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=1200&h=800&fit=crop&q=80');
    }
    return images;
  })();

  return (
    <div className="mb-8">
      {/* Main Image */}
      <div className="mb-4 h-[500px] bg-slate-gray rounded-xl overflow-hidden">
        <img
          src={allImages[selectedImage]}
          alt={property.title}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Thumbnail Gallery */}
      {allImages.length > 1 && (
        <div className="grid grid-cols-4 md:grid-cols-6 gap-3">
          {allImages.map((image, index) => (
            <button
              key={index}
              onClick={() => setSelectedImage(index)}
              className={`h-24 bg-slate-gray rounded-lg overflow-hidden transition-all ${
                selectedImage === index
                  ? 'ring-4 ring-sage-tan scale-105'
                  : 'hover:ring-2 hover:ring-sage-tan/50'
              }`}
            >
              <img
                src={image}
                alt={`${property.title} - ${index + 1}`}
                className="w-full h-full object-cover"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
};
