/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{html,js,svelte,ts}'],
  theme: {
    extend: {
      animation: {
        slideIn: 'slideIn 500ms forwards',
        slideOut: 'slideOut 500ms forwards',
        wiggle: 'wiggle 500ms linear infinite',
        rotate: 'rotate 500ms forwards',
        fadeIn: 'fadeIn 500ms ease normal forwards',
        fadeOut: 'fadeOut 500ms ease normal forwards',
      },
      keyframes: {
        slideIn: {
          '0%': { transform: 'translateY(40px)' },
          '100%': { transform: 'translateY(0px)' },
        },
        slideOut: {
          '0%': { transform: 'translateY(0px)' },
          '20%': { transform: 'translateY(20px)' },
          '100%': { transform: 'translateY(-40px)', visibility: 'hidden' },
        },
        wiggle: {
          '0%, 100%': { transform: 'rotate(-5deg)' },
          '50%': { transform: 'rotate(5deg)' },
        },
        rotate: {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(45deg)' },
        },
        fadeIn: {
          '0%': { opacity: 0 },
          '100%': { opacity: 1 },
        },
        fadeOut: {
          '0%': { opacity: 1 },
          '100%': { opacity: 0, visibility: 'hidden' },
        },
      }
    },
  },
  plugins: [],
}
