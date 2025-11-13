export type PropertyType = 'villa' | 'apartment' | 'penthouse';
export type PropertyStatus = 'for-sale' | 'for-rent' | 'both';
export type PropertyLocation = 'hurghada' | 'al-gouna' | 'north-coast' | 'cairo' | 'london';

export interface Property {
  id: string;
  title: string;
  description: string;
  type: PropertyType;
  status: PropertyStatus;
  location: PropertyLocation;
  priceGBP: number;
  priceEGP: number;
  bedrooms: number;
  bathrooms: number;
  size: number; // in square meters
  images: string[];
  mainImage: string;
  features: string[];
  amenities: string[];
  yearBuilt?: number;
  featured?: boolean;
  coordinates: {
    lat: number;
    lng: number;
  };
  nearbyPlaces?: {
    beach?: number; // distance in km
    airport?: number;
    restaurants?: number;
  };
}

export interface Testimonial {
  id: string;
  name: string;
  location: string;
  photo: string;
  rating: number;
  text: string;
  propertyId?: string;
}

export interface Service {
  id: string;
  title: string;
  description: string;
  icon: string;
  benefits: string[];
  process: string[];
}

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  photo: string;
  bio: string;
  credentials?: string[];
}

export interface ContactInfo {
  phone: {
    uk: string;
    egypt: string;
  };
  email: string;
  whatsapp: string;
  address: {
    uk: string;
    egypt: string;
  };
  coordinates: {
    uk: { lat: number; lng: number };
    egypt: { lat: number; lng: number };
  };
}

export interface PropertyFilters {
  status?: PropertyStatus[];
  type?: PropertyType[];
  location?: PropertyLocation[];
  priceRange?: {
    min: number;
    max: number;
  };
  bedrooms?: number[];
  amenities?: string[];
}

export interface PropertySort {
  field: 'price' | 'date' | 'featured';
  order: 'asc' | 'desc';
}

export interface InquiryFormData {
  name: string;
  email: string;
  phone: string;
  message: string;
  propertyId?: string;
  propertyInterest?: string;
}

export interface NewsletterFormData {
  email: string;
}

export type FAQCategory = 'general' | 'buying' | 'renting' | 'selling' | 'financing' | 'legal';

export interface FAQ {
  id: string;
  question: string;
  answer: string;
  category: FAQCategory;
  order: number;
  isPublished: boolean;
}
