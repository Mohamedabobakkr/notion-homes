import React from 'react';

/**
 * "Site by Identeti" footer credit. The wordmark is drawn in currentColor
 * and sized in em, so it takes the colour and size of the line it sits in.
 * The link's name is the visually hidden "Identeti".
 */
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
      <svg
        viewBox="0 0 5462.86 800"
        aria-hidden="true"
        focusable="false"
        className="block h-[0.72em] w-[4.92em]"
      >
        <path
          fill="currentColor"
          d="M0 800V639.7H196.9V160.3H0V0H562.8V160.3H365.9V639.7H562.8V800ZM700 800V0H952.6Q1120.6 0 1208.6 102.2Q1296.6 204.4 1296.6 400Q1296.6 595 1208.6 697.5Q1120.6 800 952.6 800ZM868.9 642.6H952.6Q1040.5 642.6 1084.1 582.7Q1127.6 522.7 1127.6 400Q1127.6 277 1084.1 217.2Q1040.5 157.4 952.6 157.4H868.9ZM1439.2 800V0H1962.1V146.5H1608.2V330.4H1912.1V472H1608.2V653.5H1952.1V800ZM2094.1 800V0H2359.4L2514.1 672.2H2531.9L2521.9 367.9V0H2668.7V800H2403.4L2248.7 127.8H2230.9L2240.9 432.1V800ZM2996.9 800V160.3H2770.2V0H3392.6V160.3H3165.9V800ZM3539.2 800V0H4062.1V146.5H3708.2V330.4H4012.1V472H3708.2V653.5H4052.1V800ZM4396.9 800V160.3H4170.2V0H4792.6V160.3H4565.9V800ZM4900 800V639.7H5096.9V160.3H4900V0H5462.8V160.3H5265.9V639.7H5462.8V800Z"
        />
      </svg>
    </a>
  </p>
);
