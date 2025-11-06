// Utility functions for the application

export const formatPrice = (priceGBP: number, currency: 'GBP' | 'EGP' = 'GBP'): string => {
  const EXCHANGE_RATE = 60;
  const amount = currency === 'GBP' ? priceGBP : priceGBP * EXCHANGE_RATE;

  return new Intl.NumberFormat('en-GB', {
    style: 'currency',
    currency: currency,
    maximumFractionDigits: 0,
  }).format(amount);
};

export const formatNumber = (num: number): string => {
  return new Intl.NumberFormat('en-GB').format(num);
};

export const slugify = (text: string): string => {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim();
};

export const truncateText = (text: string, maxLength: number): string => {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength).trim() + '...';
};

export const getLocationLabel = (location: string): string => {
  const labels: Record<string, string> = {
    'hurghada': 'Hurghada',
    'al-gouna': 'El Gouna',
    'north-coast': 'North Coast',
    'cairo': 'Cairo',
  };
  return labels[location] || location;
};

export const getPropertyTypeLabel = (type: string): string => {
  const labels: Record<string, string> = {
    'villa': 'Villa',
    'apartment': 'Apartment',
    'penthouse': 'Penthouse',
  };
  return labels[type] || type;
};

// Session storage utilities for favorites
export const getFavorites = (): string[] => {
  if (typeof window === 'undefined') return [];
  const favorites = sessionStorage.getItem('favorites');
  return favorites ? JSON.parse(favorites) : [];
};

export const saveFavorites = (favorites: string[]): void => {
  if (typeof window === 'undefined') return;
  sessionStorage.setItem('favorites', JSON.stringify(favorites));
};

export const toggleFavorite = (propertyId: string): string[] => {
  const favorites = getFavorites();
  const index = favorites.indexOf(propertyId);

  if (index > -1) {
    favorites.splice(index, 1);
  } else {
    favorites.push(propertyId);
  }

  saveFavorites(favorites);
  return favorites;
};

export const isFavorite = (propertyId: string): boolean => {
  const favorites = getFavorites();
  return favorites.includes(propertyId);
};
