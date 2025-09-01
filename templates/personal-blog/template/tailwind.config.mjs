/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}',
    './public/**/*.html'
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#eff6ff',
          100: '#dbeafe',
          200: '#bfdbfe',
          300: '#93c5fd',
          400: '#60a5fa',
          500: '#3b82f6',
          600: '#2563eb',
          700: '#1d4ed8',
          800: '#1e40af',
          900: '#1e3a8a',
          950: '#172554',
        },
      },
      typography: {
        DEFAULT: {
          css: {
            maxWidth: 'none',
            color: 'rgb(55 65 81)',
            hr: {
              borderColor: 'rgb(229 231 235)',
              marginTop: '3rem',
              marginBottom: '3rem',
            },
            'h1, h2, h3, h4, h5, h6': {
              color: 'rgb(17 24 39)',
            },
            a: {
              color: 'rgb(59 130 246)',
              textDecoration: 'none',
              fontWeight: '500',
              '&:hover': {
                textDecoration: 'underline',
              },
            },
            code: {
              color: 'rgb(99 102 241)',
              backgroundColor: 'rgb(243 244 246)',
              paddingLeft: '4px',
              paddingRight: '4px',
              paddingTop: '2px',
              paddingBottom: '2px',
              borderRadius: '0.375rem',
              fontSize: '0.875em',
            },
            'code::before': {
              content: '""',
            },
            'code::after': {
              content: '""',
            },
            pre: {
              backgroundColor: 'rgb(31 41 55)',
              color: 'rgb(229 231 235)',
              borderRadius: '0.5rem',
              padding: '1rem',
              overflow: 'auto',
            },
            'pre code': {
              backgroundColor: 'transparent',
              color: 'inherit',
              fontSize: 'inherit',
              padding: '0',
            },
            blockquote: {
              borderLeftColor: 'rgb(59 130 246)',
              backgroundColor: 'rgb(249 250 251)',
              padding: '1rem',
              borderRadius: '0.375rem',
            },
          },
        },
        dark: {
          css: {
            color: 'rgb(209 213 219)',
            'h1, h2, h3, h4, h5, h6': {
              color: 'rgb(243 244 246)',
            },
            hr: {
              borderColor: 'rgb(75 85 99)',
            },
            code: {
              color: 'rgb(196 181 253)',
              backgroundColor: 'rgb(55 65 81)',
            },
            blockquote: {
              backgroundColor: 'rgb(31 41 55)',
              borderLeftColor: 'rgb(59 130 246)',
            },
          },
        },
      },
    },
  },
  plugins: [require('@tailwindcss/typography')],
  safelist: [
    'ring-primary-500',
    'ring-primary-400',
    'ring-primary-600',
  ],
};
