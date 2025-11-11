'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import { FaHome, FaRedo } from 'react-icons/fa';
import { Container } from '@/components/ui/Container';
import { Button } from '@/components/ui/Button';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error('Error:', error);
  }, [error]);

  return (
    <main className="min-h-screen bg-gradient-to-br from-dark-olive via-charcoal-green to-slate-gray flex items-center justify-center px-4">
      <Container>
        <div className="text-center max-w-2xl mx-auto">
          {/* Error Icon */}
          <div className="mb-8">
            <div className="w-24 h-24 mx-auto bg-sage-tan/20 rounded-full flex items-center justify-center">
              <svg
                className="w-12 h-12 text-sage-tan"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                />
              </svg>
            </div>
          </div>

          {/* Message */}
          <h2 className="text-3xl md:text-5xl font-bold text-cream-light mb-6">
            Something went wrong!
          </h2>
          <p className="text-cream-light/80 text-lg md:text-xl mb-12 leading-relaxed">
            We encountered an unexpected error. Don't worry, our team has been notified and we're working on a fix.
          </p>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button
              variant="filled"
              size="lg"
              icon={<FaRedo />}
              onClick={reset}
            >
              Try Again
            </Button>
            <Link href="/">
              <Button variant="outline" size="lg" icon={<FaHome />}>
                Go Home
              </Button>
            </Link>
          </div>

          {/* Error Details (only in development) */}
          {process.env.NODE_ENV === 'development' && (
            <div className="mt-12 p-6 bg-cream-light/10 rounded-lg text-left">
              <p className="text-sage-tan font-semibold mb-2">Error Details (Development Only):</p>
              <p className="text-cream-light/70 text-sm font-mono break-all">
                {error.message}
              </p>
            </div>
          )}

          {/* Quick Links */}
          <div className="mt-16 pt-8 border-t border-cream-light/20">
            <p className="text-cream-light/60 mb-4">Need help?</p>
            <div className="flex flex-wrap gap-6 justify-center text-sm">
              <Link href="/contact" className="text-sage-tan hover:text-cream-light transition-colors">
                Contact Support
              </Link>
              <Link href="/properties" className="text-sage-tan hover:text-cream-light transition-colors">
                Browse Properties
              </Link>
            </div>
          </div>
        </div>
      </Container>
    </main>
  );
}
