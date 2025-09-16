// tailwind.config.js

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/**/*.{js,ts,jsx,tsx,css}", // This path is correct
  ],
  theme: {
    extend: {
      // Your flicker animation is correct
      keyframes: {
        flicker: {
          '0%, 100%': { filter: 'drop-shadow(0 0 8px rgba(236, 72, 153, 0.7))' },
          '50%': { filter: 'drop-shadow(0 0 16px rgba(236, 72, 153, 0.9))' }
        }
      },
      animation: {
        flicker: 'flicker 2s ease-in-out infinite',
      }
    },
  },
  plugins: [],
}