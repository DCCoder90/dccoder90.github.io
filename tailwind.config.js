/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  darkMode: 'class', // enables class-based dark mode
  theme: {
    extend: {
      typography: (theme) => ({
        DEFAULT: {
          css: {
            color: theme('colors.gray.800'),
            a: {
              color: theme('colors.blue.600'),
              '&:hover': {
                color: theme('colors.blue.800'),
              },
            },
            h1: {
              color: theme('colors.gray.900'),
              fontSize: theme('fontSize.4xl'),
            },
            h2: {
              color: theme('colors.gray.900'),
              fontSize: theme('fontSize.3xl'),
            },
            h3: {
              color: theme('colors.gray.900'),
              fontSize: theme('fontSize.2xl'),
            },
            h4: {
              color: theme('colors.gray.900'),
              fontSize: theme('fontSize.xl'),
            },
            h5: {
              color: theme('colors.gray.900'),
              fontSize: theme('fontSize.lg'),
            },
            h6: {
              color: theme('colors.gray.900'),
              fontSize: theme('fontSize.base'),
            },
            strong: {
              color: theme('colors.gray.900'),
            },
            // Add more customizations here
          },
        },
        dark: {
          css: {
            color: theme('colors.gray.300'),
            a: {
              color: theme('colors.blue.400'),
              '&:hover': {
                color: theme('colors.blue.600'),
              },
            },
            h1: {
              color: theme('colors.gray.100'),
              fontSize: theme('fontSize.4xl'),
            },
            h2: {
              color: theme('colors.gray.100'),
              fontSize: theme('fontSize.3xl'),
            },
            h3: {
              color: theme('colors.gray.100'),
              fontSize: theme('fontSize.2xl'),
            },
            h4: {
              color: theme('colors.gray.100'),
              fontSize: theme('fontSize.xl'),
            },
            h5: {
              color: theme('colors.gray.100'),
              fontSize: theme('fontSize.lg'),
            },
            h6: {
              color: theme('colors.gray.100'),
              fontSize: theme('fontSize.base'),
            },
            strong: {
              color: theme('colors.gray.100'),
            },
          },
        },
      }),
    },
  },
  plugins: [require('@tailwindcss/typography')],
}
