import { client } from './sanity';
import { Property, PropertyStatus } from '@/types';

// GROQ query for all properties
const propertiesQuery = `*[_type == "property"] | order(_createdAt desc) {
  "id": _id,
  title,
  description,
  type,
  status,
  location,
  priceGBP,
  priceEGP,
  bedrooms,
  bathrooms,
  size,
  "mainImage": mainImage.asset->url,
  "images": images[].asset->url,
  features,
  amenities,
  yearBuilt,
  featured,
  coordinates,
  nearbyPlaces
}`;

// GROQ query for a single property
const propertyQuery = `*[_type == "property" && _id == $id][0] {
  "id": _id,
  title,
  description,
  type,
  status,
  location,
  priceGBP,
  priceEGP,
  bedrooms,
  bathrooms,
  size,
  "mainImage": mainImage.asset->url,
  "images": images[].asset->url,
  features,
  amenities,
  yearBuilt,
  featured,
  coordinates,
  nearbyPlaces
}`;

// GROQ query for featured properties
const featuredPropertiesQuery = `*[_type == "property" && featured == true] | order(_createdAt desc) {
  "id": _id,
  title,
  description,
  type,
  status,
  location,
  priceGBP,
  priceEGP,
  bedrooms,
  bathrooms,
  size,
  "mainImage": mainImage.asset->url,
  "images": images[].asset->url,
  features,
  amenities,
  yearBuilt,
  featured,
  coordinates,
  nearbyPlaces
}`;

// Fetch all properties
export async function getAllProperties(): Promise<Property[]> {
  try {
    const properties = await client.fetch<Property[]>(propertiesQuery);
    return properties;
  } catch (error) {
    console.error('Error fetching properties:', error);
    return [];
  }
}

// Fetch a single property by ID
export async function getPropertyById(id: string): Promise<Property | null> {
  try {
    const property = await client.fetch<Property>(propertyQuery, { id });
    return property;
  } catch (error) {
    console.error('Error fetching property:', error);
    return null;
  }
}

// Fetch featured properties
export async function getFeaturedProperties(): Promise<Property[]> {
  try {
    const properties = await client.fetch<Property[]>(featuredPropertiesQuery);
    return properties;
  } catch (error) {
    console.error('Error fetching featured properties:', error);
    return [];
  }
}

// Fetch properties by status
export async function getPropertiesByStatus(status: PropertyStatus): Promise<Property[]> {
  try {
    const query = `*[_type == "property" && (status == $status || status == "both")] | order(_createdAt desc) {
      "id": _id,
      title,
      description,
      type,
      status,
      location,
      priceGBP,
      priceEGP,
      bedrooms,
      bathrooms,
      size,
      "mainImage": mainImage.asset->url,
      "images": images[].asset->url,
      features,
      amenities,
      yearBuilt,
      featured,
      coordinates,
      nearbyPlaces
    }`;

    const properties = await client.fetch<Property[]>(query, { status });
    return properties;
  } catch (error) {
    console.error('Error fetching properties by status:', error);
    return [];
  }
}
