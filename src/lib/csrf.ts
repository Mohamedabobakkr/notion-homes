import { NextResponse } from 'next/server';

/**
 * CSRF Protection Middleware
 * Validates request origin to prevent Cross-Site Request Forgery attacks
 *
 * This implements origin-based CSRF protection suitable for API routes
 * that are accessed from the same domain.
 */

// Allowed production domains (both www and non-www)
const ALLOWED_DOMAINS = [
  'notionhomes.co.uk',
  'www.notionhomes.co.uk',
];

// Helper function to extract domain without www prefix for comparison
function normalizeDomain(domain: string): string {
  return domain.replace(/^www\./, '');
}

// Helper function to check if a host is in the allowed domains list
function isAllowedDomain(hostToCheck: string): boolean {
  const normalizedHost = normalizeDomain(hostToCheck);
  return ALLOWED_DOMAINS.some(domain =>
    normalizeDomain(domain) === normalizedHost || domain === hostToCheck
  );
}

export function validateCsrf(request: Request): NextResponse | null {
  // Only check POST, PUT, DELETE, PATCH methods
  const method = request.method;
  if (!['POST', 'PUT', 'DELETE', 'PATCH'].includes(method)) {
    return null;
  }

  const origin = request.headers.get('origin');
  const host = request.headers.get('host');

  // Allow requests from the same origin
  if (origin) {
    try {
      const originHost = new URL(origin).host;
      // Check if origin matches host exactly
      if (originHost === host) {
        return null; // Valid same-origin request
      }
      // Check if both are allowed production domains (handles www vs non-www mismatch)
      if (host && isAllowedDomain(originHost) && isAllowedDomain(host)) {
        return null; // Valid request from allowed domain
      }
    } catch {
      // Invalid URL in origin header
    }
  }

  // Check referer as fallback
  const referer = request.headers.get('referer');
  if (referer) {
    try {
      const refererHost = new URL(referer).host;
      // Check if referer matches host exactly
      if (refererHost === host) {
        return null; // Valid same-origin request
      }
      // Check if both are allowed production domains
      if (host && isAllowedDomain(refererHost) && isAllowedDomain(host)) {
        return null; // Valid request from allowed domain
      }
    } catch {
      // Invalid URL in referer header
    }
  }

  // In development, allow localhost variations (strict check to prevent bypass)
  if (process.env.NODE_ENV === 'development') {
    try {
      const isLocalhostOrigin = origin && (
        new URL(origin).hostname === 'localhost' ||
        new URL(origin).hostname === '127.0.0.1' ||
        new URL(origin).hostname.endsWith('.localhost')
      );
      const isLocalhostReferer = referer && (
        new URL(referer).hostname === 'localhost' ||
        new URL(referer).hostname === '127.0.0.1' ||
        new URL(referer).hostname.endsWith('.localhost')
      );
      const isLocalhostHost = host && (
        host.startsWith('localhost:') ||
        host === 'localhost' ||
        host.startsWith('127.0.0.1:') ||
        host === '127.0.0.1'
      );

      if (isLocalhostOrigin || isLocalhostReferer || isLocalhostHost) {
        return null;
      }
    } catch {
      // Invalid URL format, continue to CSRF rejection
    }
  }

  // CSRF validation failed
  return NextResponse.json(
    {
      error: 'Invalid request origin. CSRF validation failed.',
    },
    {
      status: 403,
      headers: {
        'X-Content-Type-Options': 'nosniff',
      },
    }
  );
}

/**
 * Validates that Content-Type is application/json for API routes
 * Prevents CSRF attacks via form submissions
 */
export function validateContentType(request: Request): NextResponse | null {
  const method = request.method;
  if (!['POST', 'PUT', 'PATCH'].includes(method)) {
    return null;
  }

  const contentType = request.headers.get('content-type');
  if (!contentType || !contentType.includes('application/json')) {
    return NextResponse.json(
      {
        error: 'Invalid Content-Type. Expected application/json.',
      },
      {
        status: 415,
      }
    );
  }

  return null;
}
