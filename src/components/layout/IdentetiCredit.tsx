import React from 'react';

/**
 * "Site by Identeti" footer credit. The Identeti logo (public/identeti-logo.png,
 * 334×80, transparent) is a CSS mask filled with currentColor and sized in em,
 * so it takes the colour and size of the line it sits in. Its small capitals
 * (51 of its 80 px) match the line's capitals at 0.72em; the tall "I." rises
 * above. The link's name is the visually hidden "Identeti".
 */
const logo: React.CSSProperties = {
  display: 'block',
  height: '1.129em',
  width: '4.715em',
  backgroundColor: 'currentColor',
  WebkitMaskImage: 'url(/identeti-logo.png)',
  maskImage: 'url(/identeti-logo.png)',
  WebkitMaskSize: 'contain',
  maskSize: 'contain',
  WebkitMaskRepeat: 'no-repeat',
  maskRepeat: 'no-repeat',
  WebkitMaskPosition: 'center',
  maskPosition: 'center',
  forcedColorAdjust: 'none',
};

export const IdentetiCredit: React.FC<{ className?: string }> = ({ className }) => (
  <p className={className}>
    Site by{' '}
    <a
      href="https://identeti.com"
      target="_blank"
      rel="noopener"
      className="inline-flex min-h-[44px] items-center transition-colors hover:text-dark-olive focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-current"
    >
      <span className="sr-only">Identeti</span>
      <span aria-hidden="true" style={logo} />
    </a>
  </p>
);
