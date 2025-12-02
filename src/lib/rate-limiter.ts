import { NextResponse } from 'next/server';

interface RateLimitEntry {
  count: number;
  resetTime: number;
}

// In-memory store for rate limiting
// In production, consider using Redis or a distributed cache
const rateLimitStore = new Map<string, RateLimitEntry>();

// Cleanup old entries every 10 minutes
setInterval(() => {
  const now = Date.now();
  for (const [key, value] of rateLimitStore.entries()) {
    if (value.resetTime < now) {
      rateLimitStore.delete(key);
    }
  }
}, 10 * 60 * 1000);

interface RateLimiterOptions {
  maxRequests?: number; // Maximum requests per window
  windowMs?: number; // Time window in milliseconds
  message?: string; // Custom error message
}

/**
 * Rate limiter middleware for API routes
 * Prevents abuse by limiting requests per IP address
 *
 * @param request - Next.js request object
 * @param options - Rate limiter configuration
 * @returns NextResponse if rate limit exceeded, null otherwise
 */
export function rateLimit(
  request: Request,
  options: RateLimiterOptions = {}
): NextResponse | null {
  const {
    maxRequests = 10, // Default: 10 requests
    windowMs = 60 * 1000, // Default: 1 minute
    message = 'Too many requests, please try again later.',
  } = options;

  // Get client IP address
  const ip = getClientIp(request);
  const key = `rate-limit:${ip}`;
  const now = Date.now();

  const entry = rateLimitStore.get(key);

  if (!entry || entry.resetTime < now) {
    // Create new entry or reset expired entry
    rateLimitStore.set(key, {
      count: 1,
      resetTime: now + windowMs,
    });
    return null;
  }

  if (entry.count >= maxRequests) {
    // Rate limit exceeded
    return NextResponse.json(
      {
        error: message,
        retryAfter: Math.ceil((entry.resetTime - now) / 1000),
      },
      {
        status: 429,
        headers: {
          'Retry-After': Math.ceil((entry.resetTime - now) / 1000).toString(),
          'X-RateLimit-Limit': maxRequests.toString(),
          'X-RateLimit-Remaining': '0',
          'X-RateLimit-Reset': new Date(entry.resetTime).toISOString(),
        },
      }
    );
  }

  // Increment counter
  entry.count++;
  rateLimitStore.set(key, entry);

  return null;
}

/**
 * Extracts client IP address from request
 */
function getClientIp(request: Request): string {
  // Check common headers for IP address (proxies, load balancers)
  const forwardedFor = request.headers.get('x-forwarded-for');
  if (forwardedFor) {
    return forwardedFor.split(',')[0].trim();
  }

  const realIp = request.headers.get('x-real-ip');
  if (realIp) {
    return realIp;
  }

  // Fallback to a default value if no IP is found
  return 'unknown';
}

/**
 * Get current rate limit status for debugging
 */
export function getRateLimitStatus(request: Request): {
  count: number;
  resetTime: number;
  remaining: number;
} | null {
  const ip = getClientIp(request);
  const key = `rate-limit:${ip}`;
  const entry = rateLimitStore.get(key);

  if (!entry) {
    return null;
  }

  return {
    count: entry.count,
    resetTime: entry.resetTime,
    remaining: Math.max(0, 10 - entry.count),
  };
}
