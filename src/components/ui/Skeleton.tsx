import React from 'react';

interface SkeletonProps {
  className?: string;
  variant?: 'text' | 'rectangular' | 'circular';
  width?: string | number;
  height?: string | number;
}

export const Skeleton: React.FC<SkeletonProps> = ({
  className = '',
  variant = 'rectangular',
  width,
  height,
}) => {
  const baseClasses = 'animate-pulse bg-gradient-to-r from-sage-tan/20 via-sage-tan/30 to-sage-tan/20 bg-[length:200%_100%]';

  const variantClasses = {
    text: 'rounded h-4',
    rectangular: 'rounded-lg',
    circular: 'rounded-full',
  };

  const style: React.CSSProperties = {};
  if (width) style.width = typeof width === 'number' ? `${width}px` : width;
  if (height) style.height = typeof height === 'number' ? `${height}px` : height;

  return (
    <div
      className={`${baseClasses} ${variantClasses[variant]} ${className}`}
      style={{
        ...style,
        animation: 'shimmer 2s infinite',
      }}
    />
  );
};

export const PropertyCardSkeleton: React.FC = () => {
  return (
    <div className="bg-cream-light rounded-2xl overflow-hidden shadow-md">
      {/* Image Skeleton */}
      <Skeleton variant="rectangular" height={280} className="w-full" />

      <div className="p-6 space-y-4">
        {/* Badge Skeleton */}
        <Skeleton variant="rectangular" width={100} height={28} />

        {/* Title Skeleton */}
        <Skeleton variant="text" height={32} className="w-3/4" />

        {/* Location Skeleton */}
        <Skeleton variant="text" height={20} className="w-1/2" />

        {/* Features Grid Skeleton */}
        <div className="grid grid-cols-3 gap-4 pt-4 border-t border-sage-tan/20">
          {[1, 2, 3].map((i) => (
            <div key={i} className="space-y-2">
              <Skeleton variant="text" height={16} className="w-full" />
              <Skeleton variant="text" height={20} className="w-3/4" />
            </div>
          ))}
        </div>

        {/* Price & Button Skeleton */}
        <div className="flex items-center justify-between pt-4">
          <div className="space-y-2">
            <Skeleton variant="text" height={12} width={80} />
            <Skeleton variant="text" height={28} width={120} />
          </div>
          <Skeleton variant="rectangular" width={120} height={44} className="rounded-full" />
        </div>
      </div>
    </div>
  );
};
