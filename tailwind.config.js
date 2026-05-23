/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        paper: {
          DEFAULT: '#F2EDE3',
          2: '#E8E0D0',
        },
        ink: {
          DEFAULT: '#1C1A17',
          2: '#2A2722',
        },
        muted: '#6B655A',
        coral: '#E84E1B',
      },
      fontFamily: {
        sans:    ['"Space Grotesk"', 'system-ui', 'sans-serif'],
        display: ['Anton', 'Impact', 'sans-serif'],
        mono:    ['"JetBrains Mono"', 'monospace'],
        serif:   ['"Instrument Serif"', 'Georgia', 'serif'],
      },
      borderRadius: {
        sm:   '8px',
        md:   '14px',
        lg:   '20px',
        pill: '100px',
      },
      transitionTimingFunction: {
        std:  'cubic-bezier(0.4, 0.0, 0.2, 1)',
        slow: 'cubic-bezier(0.2, 0.0, 0.0, 1)',
      },
      transitionDuration: {
        fast: '160ms',
        std:  '240ms',
        slow: '600ms',
      },
    },
  },
  plugins: [],
};
