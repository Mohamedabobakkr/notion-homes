import { NextResponse } from 'next/server';

/**
 * CSRF Protection Middleware
 * Validates request origin to prevent Cross-Site Request Forgery attacks
 *
 * This implements origin-based CSRF protection suitable for API routes
 * that are accessed from the same domain.
 */
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
    const originHost = new URL(origin).host;
    if (originHost === host) {
      return null; // Valid same-origin request
    }
  }

  // Check referer as fallback
  const referer = request.headers.get('referer');
  if (referer) {
    const refererHost = new URL(referer).host;
    if (refererHost === host) {
      return null; // Valid same-origin request
    }
  }

  // In development, allow localhost variations
  if (process.env.NODE_ENV === 'development') {
    if (
      origin?.includes('localhost') ||
      referer?.includes('localhost') ||
      host?.includes('localhost')
    ) {
      return null;
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
