import Link from 'next/link';
import { FaHome, FaSearch } from 'react-icons/fa';
import { Container } from '@/components/ui/Container';
import { Button } from '@/components/ui/Button';

export default function NotFound() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-dark-olive via-charcoal-green to-slate-gray flex items-center justify-center px-4">
      <Container>
        <div className="text-center max-w-2xl mx-auto">
          {/* 404 Number */}
          <div className="mb-8">
            <h1 className="text-9xl md:text-[12rem] font-bold text-sage-tan/30 leading-none">
              404
            </h1>
          </div>

          {/* Message */}
          <h2 className="text-3xl md:text-5xl font-bold text-cream-light mb-6">
            Page Not Found
          </h2>
          <p className="text-cream-light/80 text-lg md:text-xl mb-12 leading-relaxed">
            Sorry, we couldn't find the page you're looking for. The property you're searching for might have been sold or the page may have been moved.
          </p>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link href="/">
              <Button variant="filled" size="lg" icon={<FaHome />}>
                Go Home
              </Button>
            </Link>
            <Link href="/properties">
              <Button variant="outline" size="lg" icon={<FaSearch />}>
                Browse Properties
              </Button>
            </Link>
          </div>

          {/* Quick Links */}
          <div className="mt-16 pt-8 border-t border-cream-light/20">
            <p className="text-cream-light/60 mb-4">Or explore:</p>
            <div className="flex flex-wrap gap-6 justify-center text-sm">
              <Link href="/services" className="text-sage-tan hover:text-cream-light transition-colors">
                Our Services
              </Link>
              <Link href="/about" className="text-sage-tan hover:text-cream-light transition-colors">
                About Us
              </Link>
              <Link href="/contact" className="text-sage-tan hover:text-cream-light transition-colors">
                Contact Us
              </Link>
            </div>
          </div>
        </div>
      </Container>
    </main>
  );
}
