/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx,css}",
  ],
  theme: {
    extend: {
      keyframes: {
        // Flicker animation for the neon glow effect
        flicker: {
          '0%, 19.999%': { opacity: '0.8', filter: 'brightness(1.5)' },
          '20%, 20.999%': { opacity: '0.4', filter: 'brightness(1.1)' },
          '21%, 21.999%': { opacity: '0.9', filter: 'brightness(1.6)' },
          '22%, 24.999%': { opacity: '0.5', filter: 'brightness(1.2)' },
          '25%, 39.999%': { opacity: '0.8', filter: 'brightness(1.5)' },
          '40%, 40.999%': { opacity: '0.6', filter: 'brightness(1.3)' },
          '41%, 41.999%': { opacity: '1', filter: 'brightness(1.8)' },
          '42%, 50%': { opacity: '0.7', filter: 'brightness(1.4)' },
          '51%, 52%': { opacity: '0.9', filter: 'brightness(1.6)' },
          '53%, 100%': { opacity: '0.8', filter: 'brightness(1.5)' },
        },
        // A simpler flicker animation option using drop-shadow
        flicker_alt: {
          '0%, 100%': { filter: 'drop-shadow(0 0 8px rgba(236, 72, 153, 0.7))' },
          '50%': { filter: 'drop-shadow(0 0 16px rgba(236, 72, 153, 0.9))' }
        },
        // Slide-in and fade-up animation
        'slide-in-up-fade': {
          '0%': { opacity: '0', transform: 'translateY(40px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
      animation: {
        // Your main flicker animation from the previous output
        flicker: 'flicker 2s infinite',
        // The alternative flicker animation
        flicker_alt: 'flicker_alt 2s ease-in-out infinite',
        // The slide-in animation
        'slide-in-up-fade': 'slide-in-up-fade 0.7s cubic-bezier(0.250, 0.460, 0.450, 0.940) both',
      },
    },
  },
  plugins: [],
};