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
    'al-gouna': 'Al Gouna',
    'north-coast': 'North Coast',
    'cairo': 'Cairo',
    'london': 'London',
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
