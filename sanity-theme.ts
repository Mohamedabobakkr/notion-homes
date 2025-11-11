import { buildLegacyTheme } from 'sanity'

// Light theme with good contrast
export const lightTheme = buildLegacyTheme({
  // White backgrounds
  '--white': '#fff',
  '--black': '#1a1a1a',

  // Gray tones
  '--gray-base': '#666',

  // Brand colors
  '--brand-primary': '#8B9778',

  // Default button
  '--default-button-color': '#666',
  '--default-button-primary-color': '#8B9778',

  // State colors
  '--state-info-color': '#8B9778',
  '--state-success-color': '#8B9778',
  '--state-warning-color': '#C8B99C',
  '--state-danger-color': '#d00',

  // Main navigation
  '--main-navigation-color': '#1a1a1a',
  '--main-navigation-color--inverted': '#fff',

  // Focus color
  '--focus-color': '#8B9778',
})
